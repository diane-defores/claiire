import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';
import { collectExistingPaths, resolveLegacyPath } from './internal-links.mjs';

const rootDir = process.cwd();
const existingPaths = collectExistingPaths(rootDir);
const docFiles = globSync('src/content/docs/**/*.{md,mdx}', { cwd: rootDir, nodir: true });

let updatedFiles = 0;
let replacedLinks = 0;

for (const file of docFiles) {
  const absolutePath = path.join(rootDir, file);
  const original = fs.readFileSync(absolutePath, 'utf8');

  const updated = original.replace(/\]\((\/[^)\s]+)\)/gu, (fullMatch, rawTarget) => {
    const [pathOnly = rawTarget] = rawTarget.split(/(?=[?#])/u);
    const redirect = resolveLegacyPath(pathOnly, existingPaths, { allowFallback: false });

    if (!redirect || redirect === pathOnly) {
      return fullMatch;
    }

    replacedLinks += 1;
    return fullMatch.replace(rawTarget, rawTarget.replace(pathOnly, redirect));
  });

  if (updated === original) {
    continue;
  }

  fs.writeFileSync(absolutePath, updated);
  updatedFiles += 1;
}

console.log(`Updated ${replacedLinks} links across ${updatedFiles} files.`);
