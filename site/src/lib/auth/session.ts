import type { AstroCookies } from 'astro';

export const PREMIUM_ENTITLEMENT = 'premium';
const USER_ID_COOKIE = 'claiire_user_id';
const USER_EMAIL_COOKIE = 'claiire_user_email';
const ENTITLEMENTS_COOKIE = 'claiire_entitlements';

export interface MemberSession {
  userId: string | null;
  email: string | null;
  entitlements: string[];
  isAuthenticated: boolean;
  hasPremium: boolean;
}

interface SessionOverrides {
  userId?: string | null;
  email?: string | null;
}

function parseEntitlements(rawValue: string | undefined): string[] {
  if (!rawValue) return [];

  return rawValue
    .split(',')
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export function getMemberSession(cookies: AstroCookies, overrides: SessionOverrides = {}): MemberSession {
  const userId = overrides.userId ?? cookies.get(USER_ID_COOKIE)?.value ?? null;
  const email = overrides.email ?? cookies.get(USER_EMAIL_COOKIE)?.value ?? null;
  const entitlements = parseEntitlements(cookies.get(ENTITLEMENTS_COOKIE)?.value);

  return {
    userId,
    email,
    entitlements,
    isAuthenticated: Boolean(userId),
    hasPremium: entitlements.includes(PREMIUM_ENTITLEMENT),
  };
}

export function getPublicFallbackPath(pathname: string): string {
  if (pathname === '/membres' || pathname === '/membres/') {
    return '/formations/';
  }

  if (pathname.startsWith('/membres/formations/')) {
    return pathname.replace('/membres', '') || '/formations/';
  }

  return '/formations/';
}
