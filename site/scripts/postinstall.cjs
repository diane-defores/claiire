/**
 * Postinstall script for claiire
 *
 * Creates a nanoid/non-secure workaround required by Starlight.
 * Uses Math.random() — NOT cryptographically secure, only for UI IDs.
 */

const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'node_modules', 'nanoid', 'non-secure');
const file = path.join(dir, 'index.js');

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(file)) {
  fs.writeFileSync(
    file,
    `// Workaround: nanoid non-secure shim for Starlight compatibility
let urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
function nanoid(size = 21) {
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
}
module.exports = { nanoid, urlAlphabet };
`
  );
  console.log('Created nanoid/non-secure shim.');
} else {
  console.log('nanoid/non-secure shim already exists, skipping.');
}
