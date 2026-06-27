import type { APIContext } from 'astro';

import { clerkClient } from '@clerk/astro/server';

import {
  buildClerkMemberAccessRecord,
  readClerkMemberAccess,
  type ClerkMemberAccessRecord,
} from './member-access';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function mergePrivateMetadata(
  currentPrivateMetadata: unknown,
  nextRecord: ClerkMemberAccessRecord,
): Record<string, unknown> {
  const privateMetadata = isRecord(currentPrivateMetadata) ? currentPrivateMetadata : {};
  const claiire = isRecord(privateMetadata.claiire) ? privateMetadata.claiire : {};

  return {
    ...privateMetadata,
    claiire: {
      ...claiire,
      memberAccess: nextRecord,
    },
  };
}

export async function getClerkPrivateMetadata(context: APIContext, userId: string) {
  const user = await clerkClient(context).users.getUser(userId);
  return user.privateMetadata;
}

export async function setClerkMemberAccess(
  context: APIContext,
  userId: string,
  input: Omit<ClerkMemberAccessRecord, 'updatedAt'>,
) {
  const client = clerkClient(context);
  const user = await client.users.getUser(userId);
  const nextRecord = buildClerkMemberAccessRecord(input);

  await client.users.updateUserMetadata(userId, {
    privateMetadata: mergePrivateMetadata(user.privateMetadata, nextRecord),
  });

  return readClerkMemberAccess({
    claiire: {
      memberAccess: nextRecord,
    },
  });
}
