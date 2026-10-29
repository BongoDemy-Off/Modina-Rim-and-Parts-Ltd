const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '../../../..');
const read = name => JSON.parse(fs.readFileSync(path.join(__dirname, name), 'utf8').replace(/^\uFEFF/, ''));
const summarize = (name, key = 'cases') => {
  const r = read(name), cases = key ? r[key] : r;
  return { receipt: name, total: cases.length, passed: cases.filter(c => c.passed).length, completed: r.completed, errors: r.errors?.length || 0 };
};
const checks = [
  ['production-regression-results.json', 'cases', 64], ['production-query-checks.json', 'cases', 49],
  ['sweep-results.json', 'states', 352], ['lifecycle-results.json', null, 2],
  ['race-results.json', null, 2], ['touch-results.json', 'cases', 4],
  ['layout-release-checks.json', 'cases', 15], ['intro-final-checks.json', 'cases', 4],
  ['motion-final-checks.json', 'cases', 7], ['video-release-checks.json', 'cases', 4],
  ['text-corrected-checks.json', 'cases', 20], ['home-touch-final-checks.json', 'cases', 4],
  ['short-careers-final-checks.json', 'cases', 3], ['caption-final-checks.json', 'cases', 2],
  ['accessibility-final-checks.json', 'cases', 10],
].map(([file, key, expected]) => ({ ...summarize(file, key), expected }));
const races = read('race-results.json');
const preservation = read('preservation-results.json');
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.resolve(root, p))).digest('hex');
const hashFailures = ['final-application-hashes.json', 'tested-build-hashes.json'].flatMap(file => read(file).filter(r => hash(r.path) !== r.sha256).map(r => r.path));
const status = cp.execFileSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], { cwd: root, encoding: 'utf8' });
fs.writeFileSync(path.join(__dirname, 'git-status-final.txt'), status);
const lines = status.trimEnd().split(/\r?\n/);
const commands = read('command-results.json');
const rerun = read('race-rerun-command.json');
const a11y = read('settled-a11y-results.json');
const summary = {
  generated: new Date().toISOString(), checks,
  rapidCycles: races.reduce((n, r) => n + r.cycles.filter(c => c.passed).length, 0),
  settledAccessibility: { states: a11y.states.length, violations: a11y.states.flatMap(s => s.violations.map(v => ({ state: s.state, id: v.id, nodes: v.nodes.length }))) },
  commands, rapidRerun: rerun,
  preservation: { originalFiles: preservation.originalFiles, unchanged: preservation.unchanged.length, authorizedChanged: preservation.changed.length, newApplicationFiles: preservation.newApplicationFiles, missing: preservation.missing, unexpected: preservation.unexpected, passed: preservation.passed },
  hashFailures,
  git: { trackedModified: lines.filter(l => !l.startsWith('??')).length, untracked: lines.filter(l => l.startsWith('??')).length, head: preservation.head, staged: preservation.staged },
  limits: ['Chrome only; no independent browser engine or real device', 'Native screen-reader speech, physical software keyboard and native zoom unverified', 'Root-font approximation is not native text enlargement', 'Hidden-document motion condition used explicitly marked synthetic fallback', 'Four original unnamed footer social links remain; no full WCAG conformance claim', 'No service delivery, backend, credentials, media provenance or production-readiness validation'],
};
summary.passed = checks.every(c => c.total === c.expected && c.passed === c.expected && !c.errors && c.completed !== false) && summary.rapidCycles === 40 && summary.settledAccessibility.states === 10 && preservation.passed && !hashFailures.length && rerun.exitCode === 0 && commands.filter(c => c.name !== 'race-final-run').every(c => c.exitCode === 0);
fs.writeFileSync(path.join(__dirname, 'validation-summary.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ passed: summary.passed, checks: checks.map(c => `${c.receipt}: ${c.passed}/${c.total}`), rapidCycles: summary.rapidCycles, preservation: summary.preservation, git: summary.git, hashFailures }, null, 2));
if (!summary.passed) process.exitCode = 1;
