import type { AstroCookies } from 'astro';

import { getMemberSession, PREMIUM_ENTITLEMENT } from './session';

export type MemberAccessSource =
  | 'apple'
  | 'google'
  | 'revenuecat'
  | 'polar'
  | 'manual'
  | 'env'
  | 'cookie'
  | 'bypass'
  | 'none';

export type MemberAccessStorage =
  | 'clerk_private_metadata'
  | 'env'
  | 'cookie'
  | 'bypass'
  | 'none';

export interface MemberAccess {
  isPremium: boolean;
  entitlements: string[];
  source: MemberAccessSource;
  storage: MemberAccessStorage;
  grantedAt: string | null;
  expiresAt: string | null;
  note: string | null;
}

export interface ClerkMemberAccessRecord {
  premium: boolean;
  source: Exclude<MemberAccessSource, 'env' | 'cookie' | 'bypass' | 'none'> | 'manual';
  grantedAt: string | null;
  expiresAt: string | null;
  note: string | null;
  updatedAt: string;
}

interface ResolveMemberAccessOptions {
  cookies: AstroCookies;
  userId?: string | null;
  email?: string | null;
  clerkPrivateMetadata?: unknown;
}

function isPremiumBypassEnabled() {
  return process.env.CLAIIRE_PREMIUM_BYPASS === 'true';
}

function readPremiumUserIds() {
  return new Set(
    (process.env.CLAIIRE_PREMIUM_USER_IDS ?? '')
      .split(',')
      .map((value) => value.trim())
      .filter(Boolean),
  );
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function normalizeDate(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') {
    return null;
  }

  const normalized = new Date(value);
  return Number.isNaN(normalized.getTime()) ? null : normalized.toISOString();
}

function isExpired(expiresAt: string | null) {
  return Boolean(expiresAt && new Date(expiresAt).getTime() <= Date.now());
}

function toEntitlements(isPremium: boolean) {
  return isPremium ? [PREMIUM_ENTITLEMENT] : [];
}

function normalizeSource(value: unknown): MemberAccessSource {
  switch (value) {
    case 'apple':
    case 'google':
    case 'revenuecat':
    case 'polar':
    case 'manual':
    case 'env':
    case 'cookie':
    case 'bypass':
      return value;
    default:
      return 'none';
  }
}

export function getDefaultMemberAccess(): MemberAccess {
  return {
    isPremium: false,
    entitlements: [],
    source: 'none',
    storage: 'none',
    grantedAt: null,
    expiresAt: null,
    note: null,
  };
}

export function buildClerkMemberAccessRecord(
  input: Omit<ClerkMemberAccessRecord, 'updatedAt'>,
): ClerkMemberAccessRecord {
  return {
    premium: input.premium,
    source: input.source,
    grantedAt: normalizeDate(input.grantedAt) ?? (input.premium ? new Date().toISOString() : null),
    expiresAt: normalizeDate(input.expiresAt),
    note: typeof input.note === 'string' && input.note.trim() !== '' ? input.note.trim() : null,
    updatedAt: new Date().toISOString(),
  };
}

export function readClerkMemberAccess(privateMetadata: unknown): MemberAccess | null {
  if (!isRecord(privateMetadata)) {
    return null;
  }

  const claiire = privateMetadata.claiire;
  if (!isRecord(claiire)) {
    return null;
  }

  const memberAccess = claiire.memberAccess;
  if (!isRecord(memberAccess)) {
    return null;
  }

  const source = normalizeSource(memberAccess.source);
  const expiresAt = normalizeDate(memberAccess.expiresAt);
  const grantedAt = normalizeDate(memberAccess.grantedAt);
  const note =
    typeof memberAccess.note === 'string' && memberAccess.note.trim() !== ''
      ? memberAccess.note.trim()
      : null;
  const premium = memberAccess.premium === true && !isExpired(expiresAt);

  return {
    isPremium: premium,
    entitlements: toEntitlements(premium),
    source,
    storage: 'clerk_private_metadata',
    grantedAt,
    expiresAt,
    note,
  };
}

export async function resolveMemberAccess(
  options: ResolveMemberAccessOptions,
): Promise<MemberAccess> {
  if (isPremiumBypassEnabled()) {
    return {
      isPremium: true,
      entitlements: [PREMIUM_ENTITLEMENT],
      source: 'bypass',
      storage: 'bypass',
      grantedAt: null,
      expiresAt: null,
      note: 'CLAIIRE_PREMIUM_BYPASS=true',
    };
  }

  const clerkAccess = readClerkMemberAccess(options.clerkPrivateMetadata);
  if (clerkAccess) {
    return clerkAccess;
  }

  const premiumUserIds = readPremiumUserIds();
  const normalizedUserId = options.userId?.trim();

  if (normalizedUserId && premiumUserIds.has(normalizedUserId)) {
    return {
      isPremium: true,
      entitlements: [PREMIUM_ENTITLEMENT],
      source: 'env',
      storage: 'env',
      grantedAt: null,
      expiresAt: null,
      note: 'Matched CLAIIRE_PREMIUM_USER_IDS',
    };
  }

  const session = getMemberSession(options.cookies, {
    userId: normalizedUserId ?? undefined,
    email: options.email?.trim() ?? undefined,
  });

  if (session.hasPremium) {
    return {
      isPremium: true,
      entitlements: [PREMIUM_ENTITLEMENT],
      source: 'cookie',
      storage: 'cookie',
      grantedAt: null,
      expiresAt: null,
      note: 'Legacy cookie entitlement',
    };
  }

  return getDefaultMemberAccess();
}
