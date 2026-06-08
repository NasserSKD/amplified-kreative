import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith('.html')).sort();
const canonicalRoutes = new Set([
  '/', '/services/', '/pricing/', '/about/', '/portfolio/', '/contact-us/',
  '/branding-graphic-design/', '/video-production/', '/website-design-development/',
  '/digital-marketing/', '/audio-production/', '/photography/', '/printing-3/'
]);
const failures = [];
const warnings = [];
const referencedAssets = new Set();
const seenTitles = new Map();
const seenDescriptions = new Map();
const seenCanonicals = new Map();

function matches(source, expression) {
  return [...source.matchAll(expression)];
}

for (const file of htmlFiles) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const ids = matches(source, /\sid=["']([^"']+)["']/g).map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const h1Count = matches(source, /<h1(?:\s|>)/g).length;
  const mainCount = matches(source, /<main(?:\s|>)/g).length;
  const title = source.match(/<title>([^<]+)<\/title>/)?.[1];
  const description = source.match(/<meta name="description" content="([^"]+)">/)?.[1];
  const canonical = source.match(/<link rel="canonical" href="([^"]+)">/)?.[1];
  const noindex = /<meta name="robots" content="noindex">/.test(source);

  if (h1Count !== 1) failures.push(`${file}: expected one h1, found ${h1Count}`);
  if (mainCount !== 1) failures.push(`${file}: expected one main landmark, found ${mainCount}`);
  if (duplicateIds.length) failures.push(`${file}: duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);

  if (!noindex) {
    if (!title) failures.push(`${file}: missing title`);
    if (!description) failures.push(`${file}: missing meta description`);
    if (!canonical) failures.push(`${file}: missing canonical URL`);
    if (!/property="og:title"/.test(source)) failures.push(`${file}: missing Open Graph title`);
    if (!/property="og:url"/.test(source)) failures.push(`${file}: missing Open Graph URL`);
    if (!/property="og:image"/.test(source)) failures.push(`${file}: missing Open Graph image`);
    if (!/name="twitter:card"/.test(source)) failures.push(`${file}: missing Twitter card metadata`);
    if (!/application\/ld\+json/.test(source)) failures.push(`${file}: missing structured data`);
    for (const [value, label, collection] of [
      [title, 'title', seenTitles],
      [description, 'description', seenDescriptions],
      [canonical, 'canonical URL', seenCanonicals]
    ]) {
      if (!value) continue;
      if (collection.has(value)) failures.push(`${file}: duplicate ${label} also used by ${collection.get(value)}`);
      collection.set(value, file);
    }
    for (const match of matches(source, /<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
      try { JSON.parse(match[1]); } catch { failures.push(`${file}: invalid JSON-LD`); }
    }
  }

  for (const match of matches(source, /<img\b([^>]*)>/g)) {
    if (!/\balt="[^"]*"/.test(match[1])) failures.push(`${file}: image missing alt text`);
  }

  for (const match of matches(source, /(?:href|src)=["']([^"'#]+)["']/g)) {
    const target = match[1].split('?')[0];
    if (target.startsWith('assets/')) referencedAssets.add(target);
    if (/^(https?:|mailto:|tel:|data:)/.test(target)) continue;
    if (target.endsWith('.html')) failures.push(`${file}: public link exposes HTML filename: ${target}`);
    if (target.startsWith('/')) {
      if (!canonicalRoutes.has(target) && !fs.existsSync(path.join(root, target))) {
        failures.push(`${file}: unresolved root path: ${target}`);
      }
      continue;
    }
    if (!fs.existsSync(path.join(root, target))) failures.push(`${file}: missing local target: ${target}`);
  }
}

for (const file of fs.readdirSync(root).filter((name) => /\.(?:html|js|css|json)$/.test(name))) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of matches(source, /assets\/[A-Za-z0-9_./-]+/g)) referencedAssets.add(match[0]);
}
for (const directory of ['docs']) {
  for (const file of fs.readdirSync(path.join(root, directory)).filter((name) => /\.(?:json|md)$/.test(name))) {
    const source = fs.readFileSync(path.join(root, directory, file), 'utf8');
    for (const match of matches(source, /assets\/[A-Za-z0-9_./-]+/g)) referencedAssets.add(match[0]);
  }
}

const allAssets = [];
function collectAssets(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectAssets(fullPath);
    else allAssets.push(path.relative(root, fullPath));
  }
}
collectAssets(path.join(root, 'assets'));
for (const asset of allAssets) {
  if (!referencedAssets.has(asset)) warnings.push(`Unreferenced asset: ${asset}`);
}

if (warnings.length) console.warn(warnings.join('\n'));
if (failures.length) {
  console.error(`\nAudit failed with ${failures.length} issue(s):\n${failures.join('\n')}`);
  process.exit(1);
}
console.log(`Audit passed for ${htmlFiles.length} HTML files and ${referencedAssets.size} referenced assets.`);
