import type { APIRoute } from 'astro';

import { getDefaultMemberAccess } from '../../lib/auth/member-access';

export const GET: APIRoute = async ({ locals }) => {
  const memberSession = locals.memberSession;
  const memberAccess = locals.memberAccess ?? getDefaultMemberAccess();

  return new Response(
    JSON.stringify({
      signedIn: memberSession?.isAuthenticated ?? false,
      userId: memberSession?.userId ?? null,
      email: memberSession?.email ?? null,
      entitlements: memberAccess.entitlements,
      premium: memberAccess.isPremium,
      source: memberAccess.source,
      storage: memberAccess.storage,
      grantedAt: memberAccess.grantedAt,
      expiresAt: memberAccess.expiresAt,
      note: memberAccess.note,
    }),
    {
      headers: {
        'cache-control': 'private, no-store',
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
};
