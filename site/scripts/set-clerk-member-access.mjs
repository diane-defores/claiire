function readFlag(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] ?? null;
}

function parseBoolean(value, fallback = false) {
  if (value == null) return fallback;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new Error(`Boolean attendu pour la valeur "${value}"`);
}

function normalizeDate(value) {
  if (!value || value === 'none' || value === 'null') return null;
  const normalized = new Date(value);
  if (Number.isNaN(normalized.getTime())) {
    throw new Error(`Date invalide: ${value}`);
  }
  return normalized.toISOString();
}

function isRecord(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

const userId = readFlag('--user') ?? readFlag('--user-id');
const premium = parseBoolean(readFlag('--premium'), true);
const source = readFlag('--source') ?? 'manual';
const note = readFlag('--note');
const expiresAt = normalizeDate(readFlag('--expires-at'));

if (!userId) {
  throw new Error('Utilise --user <clerk_user_id>');
}

if (!process.env.CLERK_SECRET_KEY) {
  throw new Error('CLERK_SECRET_KEY manquant');
}

const apiUrl = `https://api.clerk.com/v1/users/${userId}`;
const headers = {
  Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
  'Content-Type': 'application/json',
};

const currentUserResponse = await fetch(apiUrl, { headers });
if (!currentUserResponse.ok) {
  throw new Error(`Impossible de lire l'utilisateur Clerk (${currentUserResponse.status})`);
}

const currentUser = await currentUserResponse.json();
const currentPrivateMetadata = isRecord(currentUser.private_metadata) ? currentUser.private_metadata : {};
const currentClaiire = isRecord(currentPrivateMetadata.claiire) ? currentPrivateMetadata.claiire : {};

const record = {
  premium,
  source,
  grantedAt: premium ? new Date().toISOString() : null,
  expiresAt,
  note: typeof note === 'string' && note.trim() !== '' ? note.trim() : null,
  updatedAt: new Date().toISOString(),
};

const nextPrivateMetadata = {
  ...currentPrivateMetadata,
  claiire: {
    ...currentClaiire,
    memberAccess: record,
  },
};

const updateResponse = await fetch(`${apiUrl}/metadata`, {
  method: 'PATCH',
  headers,
  body: JSON.stringify({
    private_metadata: nextPrivateMetadata,
  }),
});

if (!updateResponse.ok) {
  throw new Error(`Impossible de mettre a jour l'acces membre (${updateResponse.status})`);
}

console.log(JSON.stringify({ userId, memberAccess: record }, null, 2));
