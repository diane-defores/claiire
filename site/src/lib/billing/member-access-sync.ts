import type { APIContext } from 'astro';

import { setClerkMemberAccess } from '../auth/clerk-member-access';
import type { ClerkMemberAccessRecord } from '../auth/member-access';

interface RevenueCatEvent {
  type?: string;
  app_user_id?: string | null;
  original_app_user_id?: string | null;
  entitlement_ids?: string[] | null;
  entitlement_id?: string | null;
  expiration_at_ms?: number | null;
  grace_period_expiration_at_ms?: number | null;
  purchased_at_ms?: number | null;
  event_timestamp_ms?: number | null;
  environment?: string | null;
  product_id?: string | null;
  aliases?: string[] | null;
}

interface PolarCustomerStatePayload {
  type?: string;
  data?: {
    external_id?: string | null;
    active_subscriptions?: Array<Record<string, unknown>> | null;
    granted_benefits?: Array<Record<string, unknown>> | null;
  } | null;
}

function toIsoDate(value: unknown) {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return null;
  }

  return new Date(value).toISOString();
}

function isFutureDate(value: string | null) {
  return Boolean(value && new Date(value).getTime() > Date.now());
}

function getRevenueCatPremiumEntitlementIds() {
  return new Set(
    (process.env.REVENUECAT_PREMIUM_ENTITLEMENT_IDS ?? process.env.REVENUECAT_PREMIUM_ENTITLEMENT_ID ?? 'premium')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

function getRevenueCatUserId(event: RevenueCatEvent) {
  return (
    event.app_user_id?.trim() ||
    event.original_app_user_id?.trim() ||
    event.aliases?.find((alias) => typeof alias === 'string' && alias.trim() !== '')?.trim() ||
    null
  );
}

function getRevenueCatEntitlementIds(event: RevenueCatEvent) {
  const ids = Array.isArray(event.entitlement_ids) ? event.entitlement_ids : [];

  if (ids.length > 0) {
    return ids.filter((value): value is string => typeof value === 'string' && value.trim() !== '');
  }

  if (typeof event.entitlement_id === 'string' && event.entitlement_id.trim() !== '') {
    return [event.entitlement_id.trim()];
  }

  return [];
}

function isRevenueCatPremiumEvent(event: RevenueCatEvent) {
  const premiumEntitlementIds = getRevenueCatPremiumEntitlementIds();
  const eventEntitlementIds = getRevenueCatEntitlementIds(event);

  if (eventEntitlementIds.length === 0) {
    return false;
  }

  return eventEntitlementIds.some((entitlementId) => premiumEntitlementIds.has(entitlementId));
}

function buildRevenueCatRecord(event: RevenueCatEvent): Omit<ClerkMemberAccessRecord, 'updatedAt'> | null {
  const expirationAt = toIsoDate(event.expiration_at_ms);
  const gracePeriodExpirationAt = toIsoDate(event.grace_period_expiration_at_ms);
  const grantedAt = toIsoDate(event.purchased_at_ms) ?? toIsoDate(event.event_timestamp_ms);
  const activeUntil = gracePeriodExpirationAt ?? expirationAt;

  switch (event.type) {
    case 'EXPIRATION':
    case 'SUBSCRIPTION_PAUSED':
      return {
        premium: false,
        source: 'revenuecat',
        grantedAt,
        expiresAt: activeUntil,
        note: `RevenueCat ${event.type ?? 'unknown'} (${event.environment ?? 'unknown'})`,
      };
    case 'CANCELLATION':
    case 'BILLING_ISSUE':
      return {
        premium: isFutureDate(activeUntil),
        source: 'revenuecat',
        grantedAt,
        expiresAt: activeUntil,
        note: `RevenueCat ${event.type ?? 'unknown'} (${event.environment ?? 'unknown'})`,
      };
    case 'TEST':
      return null;
    default:
      return {
        premium: true,
        source: 'revenuecat',
        grantedAt,
        expiresAt: activeUntil,
        note: `RevenueCat ${event.type ?? 'unknown'} ${event.product_id ?? ''}`.trim(),
      };
  }
}

function getPolarUserId(payload: PolarCustomerStatePayload) {
  return payload.data?.external_id?.trim() || null;
}

function getLatestPolarExpiration(payload: PolarCustomerStatePayload) {
  const activeSubscriptions = Array.isArray(payload.data?.active_subscriptions)
    ? payload.data?.active_subscriptions
    : [];

  const candidateDates = activeSubscriptions
    .flatMap((subscription) => [
      typeof subscription.current_period_end === 'string' ? subscription.current_period_end : null,
      typeof subscription.ends_at === 'string' ? subscription.ends_at : null,
      typeof subscription.currentPeriodEnd === 'string' ? subscription.currentPeriodEnd : null,
      typeof subscription.endsAt === 'string' ? subscription.endsAt : null,
    ])
    .filter((value): value is string => Boolean(value))
    .map((value) => new Date(value))
    .filter((value) => !Number.isNaN(value.getTime()))
    .sort((left, right) => right.getTime() - left.getTime());

  return candidateDates[0]?.toISOString() ?? null;
}

function buildPolarRecord(payload: PolarCustomerStatePayload): Omit<ClerkMemberAccessRecord, 'updatedAt'> {
  const activeSubscriptions = Array.isArray(payload.data?.active_subscriptions)
    ? payload.data?.active_subscriptions
    : [];
  const grantedBenefits = Array.isArray(payload.data?.granted_benefits)
    ? payload.data?.granted_benefits
    : [];
  const premium = activeSubscriptions.length > 0 || grantedBenefits.length > 0;

  return {
    premium,
    source: 'polar',
    grantedAt: premium ? new Date().toISOString() : null,
    expiresAt: getLatestPolarExpiration(payload),
    note: `Polar customer.state_changed (subscriptions=${activeSubscriptions.length}, benefits=${grantedBenefits.length})`,
  };
}

export async function syncMemberAccessFromRevenueCat(
  context: APIContext,
  event: RevenueCatEvent,
) {
  if (!isRevenueCatPremiumEvent(event)) {
    return {
      ignored: true,
      reason: 'non_premium_entitlement',
    };
  }

  const userId = getRevenueCatUserId(event);

  if (!userId) {
    return {
      ignored: true,
      reason: 'missing_user_id',
    };
  }

  const record = buildRevenueCatRecord(event);

  if (!record) {
    return {
      ignored: true,
      reason: 'ignored_event_type',
      userId,
    };
  }

  const memberAccess = await setClerkMemberAccess(context, userId, record);

  return {
    ignored: false,
    userId,
    memberAccess,
  };
}

export async function syncMemberAccessFromPolar(
  context: APIContext,
  payload: PolarCustomerStatePayload,
) {
  const userId = getPolarUserId(payload);

  if (!userId) {
    return {
      ignored: true,
      reason: 'missing_external_id',
    };
  }

  const memberAccess = await setClerkMemberAccess(context, userId, buildPolarRecord(payload));

  return {
    ignored: false,
    userId,
    memberAccess,
  };
}
