# Batch 1A evidence

These are local regression tools and evidence, not application imports or a new installed test framework. They use the existing pinned axe script in the parent evidence directory, bundled Playwright 1.62.1, installed Chrome, and existing project dependencies. No package was installed. Paths are host-specific.

- `baseline.json`: branch/commit, all initial Git entries and SHA-256 hashes for 404 original files, including 163 untracked files.
- `preservation-results.json`: final comparison; only eight expected tracked application files changed; original untracked files and protected assets/Admin/package/data files preserved.
- `before-*.png`, `before-observations.json`: fresh viewport screenshots and representative Admin computed styles before implementation.
- `regression-final-results.json`: complete 64-case matrix attempt (61 passed, three failed); ten axe scans, geometry and console records. Later retries do not erase these failures.
- `regression-complete-results.json`: last final-bundle full sweep, 60/64 passed with four navigation timeouts. `regression-navigation-retry-results.json` (2/3) and `regression-final-targeted-results.json` (2/2) are retained separately. `validation-summary.json` records passing scenario evidence across runs without claiming a single all-green sweep.
- `regression-*-results.json`, `regression-*-run.txt`: retained retries, including harness mistakes, animation/interaction timeouts and targeted successes. A filename containing “verified” is not a claim that every case passed; inspect `passed` and the command outcome.
- `lifecycle-results.json`, `lifecycle-complete-run.txt`, `lifecycle-teardown.json`: final source primitive tested in normal/reduced motion under React StrictMode, immediate Escape, repeated native cancellation, six rapid close/reopen cycles per mode, unexpected native closure, backdrop movement, hidden opener, route change and unmount.
- `public-smoke-results.json`: 44 direct public URL/width states and fresh-session preloader completion. Collection completed; initial runner teardown required owned-process cleanup.
- `focused-*.txt`, `focused-results.json`: additional touch, label, history, styles and breakpoint attempts; failed/time-out attempts remain evidence and are not passes.
- `local-checks-results.json`: additional final-bundle interaction checks with external requests blocked, explicitly excluding visual-comparison claims.
- `build-complete.txt`, `typecheck-complete.txt`: final existing build and TypeScript command logs, both exit 0. `lint` means `tsc --noEmit`.
- `git-status-final.txt`: complete final status including pre-existing and new untracked artifacts.

## Reproduction

Start the production preview on `127.0.0.1:4181` after `npm.cmd run build`. For the lifecycle fixture only, start a single Vite dev server on port 4183 with `DISABLE_HMR=true`; evidence writes otherwise trigger reloads. Do not run two Vite dev servers against the same optimized-dependency cache.

```powershell
node docs/audits/evidence/batch-1a/regression.cjs
node docs/audits/evidence/batch-1a/lifecycle.cjs
node docs/audits/evidence/batch-1a/local-checks.cjs
node docs/audits/evidence/batch-1a/verify-preservation.cjs
```

The regression runner accepts `BATCH_1A_URL`, `BATCH_1A_RESULT`, and an optional `BATCH_1A_FILTER` regular expression. Preserve old results before rerunning. Some browser teardown attempts stall on this Windows host. `browser-cleanup.cjs` bounds the wait and acts only on the browser PID returned by the current runner's BrowserServer; it does not enumerate or close the user's normal browser. Watchdog use is saved separately.

Screenshots show scrolled viewport sections, not whole-page settled-motion proof. No production animation opacity was forced. Timeouts, initial mid-animation geometry, missing remote assets and old unrelated contrast/naming issues must not be turned into new application-defect or all-pass claims. See the implementation report for final conclusions and open review gates.
