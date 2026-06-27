/**
 * Custom Node.js module loader for nanoid/non-secure workaround
 *
 * This loader intercepts imports of 'nanoid/non-secure' and redirects them to our custom implementation.
 * This is necessary because some dependencies try to import nanoid/non-secure which doesn't exist
 * in the installed nanoid package version, causing runtime errors.
 *
 * @param {string} specifier - The module specifier being resolved
 * @param {object} context - Resolution context from Node.js
 * @param {function} nextResolve - The next resolver in the chain
 * @returns {Promise<object>} Resolution result with URL and shortCircuit flag
 */
export async function resolve(specifier, context, nextResolve) {
  // Intercept nanoid/non-secure imports and redirect to our custom implementation
  if (specifier === 'nanoid/non-secure') {
    return {
      url: new URL('./src/utils/non-secure.js', import.meta.url).href,
      shortCircuit: true, // Skip remaining resolvers in the chain
    };
  }
  // Pass through all other imports to the default resolver
  return nextResolve(specifier);
}
