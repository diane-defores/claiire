import { createHmac, timingSafeEqual } from 'node:crypto';

const POLAR_WEBHOOK_TOLERANCE_SECONDS = 5 * 60;

function normalizePolarSecret(secret: string) {
  return secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret;
}

function parsePolarTimestamp(rawValue: string) {
  const timestamp = Number.parseInt(rawValue, 10);

  if (!Number.isFinite(timestamp)) {
    throw new Error('Invalid Polar webhook timestamp');
  }

  const now = Math.floor(Date.now() / 1000);

  if (now - timestamp > POLAR_WEBHOOK_TOLERANCE_SECONDS) {
    throw new Error('Polar webhook timestamp too old');
  }

  if (timestamp > now + POLAR_WEBHOOK_TOLERANCE_SECONDS) {
    throw new Error('Polar webhook timestamp too new');
  }

  return timestamp;
}

export function verifyPolarWebhookSignature(payload: string, headers: Headers, secret: string) {
  const webhookId = headers.get('webhook-id');
  const webhookTimestamp = headers.get('webhook-timestamp');
  const webhookSignature = headers.get('webhook-signature');

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    throw new Error('Missing Polar webhook signature headers');
  }

  const timestamp = parsePolarTimestamp(webhookTimestamp);
  const signingContent = `${webhookId}.${timestamp}.${payload}`;
  const expectedSignature = createHmac('sha256', Buffer.from(normalizePolarSecret(secret), 'base64'))
    .update(signingContent)
    .digest('base64');

  const expectedBuffer = Buffer.from(expectedSignature);

  for (const versionedSignature of webhookSignature.split(' ')) {
    const [version, signature] = versionedSignature.split(',');

    if (version !== 'v1' || !signature) {
      continue;
    }

    const actualBuffer = Buffer.from(signature);

    if (
      actualBuffer.length === expectedBuffer.length &&
      timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return;
    }
  }

  throw new Error('Invalid Polar webhook signature');
}

export function verifyRevenueCatWebhookAuthorization(headers: Headers, expectedValue?: string) {
  if (!expectedValue) {
    return;
  }

  const receivedValue = headers.get('authorization');

  if (receivedValue !== expectedValue) {
    throw new Error('Invalid RevenueCat webhook authorization');
  }
}
