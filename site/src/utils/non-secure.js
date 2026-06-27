/**
 * Non-cryptographic random ID generator (nanoid/non-secure replacement)
 *
 * This is a workaround for missing nanoid/non-secure export in the installed nanoid package.
 * Used by Astro's Starlight theme for generating unique IDs for UI elements.
 *
 * SECURITY WARNING: Uses Math.random() which is NOT cryptographically secure.
 * This implementation is ONLY suitable for:
 * - UI component IDs
 * - Temporary client-side identifiers
 * - Non-security-critical use cases
 *
 * DO NOT USE for:
 * - Session tokens, API keys, or authentication tokens
 * - Any security-sensitive purposes requiring cryptographic randomness
 * - Data that needs to be unpredictable for security reasons
 *
 * @param {number} size - Length of the generated ID (default: 21 characters)
 * @returns {string} A random alphanumeric string of the specified length
 */
export default function nonSecure(size = 21) {
  let id = '';
  // Character set: uppercase, lowercase letters and digits (62 characters total)
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Build ID by selecting random characters
  for (let i = 0; i < size; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return id;
}
