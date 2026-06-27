import type { APIRoute } from 'astro';

import { syncMemberAccessFromRevenueCat } from '../../../lib/billing/member-access-sync';
import { verifyRevenueCatWebhookAuthorization } from '../../../lib/billing/webhook-security';

export const POST: APIRoute = async (context) => {
  try {
    verifyRevenueCatWebhookAuthorization(
      context.request.headers,
      process.env.REVENUECAT_WEBHOOK_AUTH,
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'unauthorized',
        message: error instanceof Error ? error.message : 'Unauthorized',
      }),
      {
        status: 401,
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    );
  }

  const payload = await context.request.json();
  const event = payload?.event;

  if (!event || typeof event !== 'object') {
    return new Response(
      JSON.stringify({
        error: 'invalid_payload',
      }),
      {
        status: 400,
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    );
  }

  const result = await syncMemberAccessFromRevenueCat(context, event);

  return new Response(
    JSON.stringify({
      ok: true,
      provider: 'revenuecat',
      ...result,
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
};
