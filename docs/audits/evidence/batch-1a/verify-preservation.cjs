const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { execFileSync } = require('node:child_process');
const baseline = JSON.parse(fs.readFileSync(path.join(__dirname, 'baseline.json'), 'utf8').replace(/^\uFEFF/, ''));
const changed = [], missing = [];
for (const entry of baseline.files) {
  if (!fs.existsSync(entry.path)) { missing.push(entry.path); continue; }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(entry.path)).digest('hex').toUpperCase();
  if (actual !== entry.sha256) changed.push(entry.path);
}
const allowed = ['src/components/Navbar.tsx', 'src/components/ProductImageCarousel.tsx', 'src/index.css', 'src/layouts/Layout.tsx', 'src/pages/Careers.tsx', 'src/pages/Contact.tsx', 'src/pages/Gallery.tsx', 'src/pages/Products.tsx'];
const result = {
  baselineFiles: baseline.files.length,
  preExistingUntracked: baseline.untracked.length,
  preservedUntracked: baseline.untracked.filter(f => !changed.includes(f) && !missing.includes(f)).length,
  unchanged: baseline.files.length - changed.length - missing.length,
  changed, missing, unexpectedChanges: changed.filter(f => !allowed.includes(f)),
  protectedAdminFiles: baseline.files.filter(f => f.path.startsWith('src/admin/')).length,
  protectedFilesChanged: changed.filter(f => f.startsWith('src/admin/') || f.startsWith('public/') || f.startsWith('src/assets/') || ['package.json', 'package-lock.json', 'src/lib/data.ts'].includes(f))
};
const untracked = execFileSync('git.exe', ['ls-files', '--others', '--exclude-standard'], { encoding: 'utf8' }).trim().split(/\r?\n/);
result.newFiles = untracked.filter(f => !baseline.untracked.includes(f));
result.unexpectedNewFiles = result.newFiles.filter(f => f !== 'src/components/PublicModal.tsx'
  && f !== 'docs/audits/BATCH-1A-IMPLEMENTATION-REPORT.md'
  && !f.startsWith('docs/audits/evidence/batch-1a/'));
fs.writeFileSync(path.join(__dirname, 'preservation-results.json'), JSON.stringify(result, null, 2));
console.log(JSON.stringify(result, null, 2));
if (missing.length || result.unexpectedChanges.length || result.unexpectedNewFiles.length || result.protectedFilesChanged.length || result.preservedUntracked !== 163) process.exitCode = 1;
