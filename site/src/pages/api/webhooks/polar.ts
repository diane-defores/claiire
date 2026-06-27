import type { APIRoute } from 'astro';

import { syncMemberAccessFromPolar } from '../../../lib/billing/member-access-sync';
import { verifyPolarWebhookSignature } from '../../../lib/billing/webhook-security';

export const POST: APIRoute = async (context) => {
  const secret = process.env.POLAR_WEBHOOK_SECRET;

  if (!secret) {
    return new Response(
      JSON.stringify({
        error: 'missing_secret',
      }),
      {
        status: 500,
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    );
  }

  const rawPayload = await context.request.text();

  try {
    verifyPolarWebhookSignature(rawPayload, context.request.headers, secret);
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

  const payload = JSON.parse(rawPayload);

  if (payload?.type !== 'customer.state_changed') {
    return new Response(
      JSON.stringify({
        ok: true,
        provider: 'polar',
        ignored: true,
        reason: 'unsupported_event_type',
        type: payload?.type ?? null,
      }),
      {
        headers: {
          'content-type': 'application/json; charset=utf-8',
        },
      },
    );
  }

  const result = await syncMemberAccessFromPolar(context, payload);

  return new Response(
    JSON.stringify({
      ok: true,
      provider: 'polar',
      ...result,
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
};
