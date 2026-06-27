import { collectBrokenInternalLinks } from './internal-links.mjs';

const { broken } = collectBrokenInternalLinks(process.cwd(), { allowFallback: false });
const unresolved = broken.filter((entry) => !entry.resolved);

if (unresolved.length === 0) {
  console.log('All internal Markdown links resolve to published pages.');
  process.exit(0);
}

console.error(`Found ${unresolved.length} unresolved internal links:\n`);

for (const entry of unresolved) {
  console.error(`${entry.file}: ${entry.rawTarget}`);
}

process.exit(1);
