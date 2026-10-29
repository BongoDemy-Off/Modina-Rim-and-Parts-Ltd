# Batch 1A acceptance check

27 October 2026, Asia/Dhaka. Local repository is authoritative. [Acceptance evidence](evidence/batch-1a-acceptance/) contains retained failures, scripts, logs, screenshots and machine-readable receipts.

## 1. Recommendation — CONDITIONAL PASS

Local Batch 1A acceptance passes after one confirmed modal correction: **64/64 in one completed final sweep, exit 0**, with normal browser/server cleanup. The condition concerns the reference deployments: both serve their homepage but return host-generated 404s on nested-route reloads/direct requests. Public-host verification therefore remains incomplete. This is not production-release approval or WCAG certification.

## 2. Exact Git changes inspected

Starting branch: `main`, tracking `origin/main`. Commit: `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e`. Eight tracked files were already modified, and 277 files were untracked. The complete starting status and SHA-256 inventory are in `baseline.json`.

Inspected the complete tracked diff and the new component:

```text
src/components/Navbar.tsx
src/components/ProductImageCarousel.tsx
src/index.css
src/layouts/Layout.tsx
src/pages/Careers.tsx
src/pages/Contact.tsx
src/pages/Gallery.tsx
src/pages/Products.tsx
src/components/PublicModal.tsx (already untracked at acceptance start)
```

The eight tracked modifications remain byte-identical to the acceptance baseline. **Only PublicModal.tsx changed during acceptance.** New documentation/evidence is confined to this report and its acceptance evidence directory.

## 3. Source review and necessary stabilization

Reviewed native/React/Motion lifecycle coordination, guarded opening, Escape/cancel/close, backdrop origin, focus containment/return/fallback, route/unmount cleanup, scroll locking, independent card/carousel controls, ordinary navigation disclosures, breakpoint cleanup, edit-aware enquiry prefill and public/Admin CSS boundaries.

A diagnostic reproduced a real interrupted-exit defect on normal-motion rapid cycle 8: the dialog remained `open` and `:modal`, both scroll locks remained `hidden`, but its shell opacity was **0**. This could strand the page behind an invisible modal. See `race-before-fix-results.json` and `race-failure.png`.

The existing Motion animation controls now explicitly restart the shell when reopening. Drawer/lightbox child animations, exit durations and reduced-motion handling remain. No global animation override was introduced. After correction, **20 normal + 20 reduced-motion rapid cycles passed**. Lifecycle groups also passed native `requestClose()` cancellation, duplicate cancellation, unexpected native close, backdrop drag/dismissal, hidden-opener fallback, route departure and unmount. Native show/close totals balanced: 13/13 normal, 19/19 reduced; no fixture page exceptions.

The original component is preserved as `public-modal-before-acceptance.tsx`; [the exact correction](evidence/batch-1a-acceptance/public-modal-stabilization.diff) is reviewable. This stabilizes PUB-008/009. Existing PUB-006/007/011/015/037/040 resolutions were verified; PUB-010/032 remain partial within their previously documented boundaries.

## 4. Original four timeouts

All four original failures were `goto` waits for DOMContentLoaded, before feature assertions. The old logs contain no resource trace, so their exact historical cause cannot be reconstructed.

| Original scenario | Original limit | Final disposition / navigation time |
|---|---:|---|
| Bengali 320 navigation | 8 s | Passed; initial Products load 477 ms; subsequent return 1,858 ms |
| Bengali 390 Products | 8 s | Passed; 545 ms |
| Bengali 390 Gallery | 8 s | Passed; 582 ms |
| Radius/Admin isolation | 10 s | Passed; Products 2,691 ms, Admin 546 ms |

The final runner records pending resources at 8 seconds and uses explicit navigation/action limits separately. **No navigation reached that diagnostic threshold; maximum was 2,740 ms.** Passing results therefore did not depend on merely extending the old timeout. Server readiness and ownership are explicit, and target readiness checks include animated ancestors.

## 5. Bengali 320 pointer/touch result

**Passed with real Playwright touchscreen input**, not keyboard substitution. Captured pointer events report `pointerType: touch`. Company was hittable at x49/y263, 255×56 px; tapping expanded/collapsed it accurately. Links became accessible, and the main sweep followed About through a touch action. Close, Escape, backdrop dismissal, focus return and desktop breakpoint cleanup left no lock/trap.

The old pointer retry only recorded waiting for visibility/stability; it does not establish a locator or application root cause. The current scenario is independently reproducible. [Settled Bengali 320 screenshot](evidence/batch-1a-acceptance/touch-settled-320-bn.png) and `touch-results.json` provide evidence. Four focused touch cases passed across English/Bengali, 320/390, normal/reduced motion.

## 6. Regression completion and retained failures

Installed Chrome **156.0.8078.48**, bundled Playwright and bundled Node **24.19.0**; no dependencies installed. Production preview was owned by the runner on port 4191; isolated source fixtures used port 4193 with HMR disabled.

- [Final sweep](evidence/batch-1a-acceptance/final-regression-results.json): **64/64, exit 0**, completed 17:39 Asia/Dhaka; 10 axe states. Browser close completed normally in 68.12 s; owned preview stopped. Receipt: `final-owned.json`.
- Lifecycle: both motion groups passed, exit 0 (`lifecycle-results.json`). Rapid stress: 40/40 cycles, exit 0 (`race-results.json`). Focused touch: 4/4, exit 0 (`touch-results.json`).
- An additional 10-state settled accessibility check passed its targeted assertions, exit 0 (`settled-a11y-results.json`, `a11y-ownership.json`).

Unsuccessful attempts remain distinct: an initial no-server attempt was aborted; the first completed acceptance sweep was 62/64 because its desktop fixture waited for hover-only arrows before hovering. Corrected interaction order then passed both desktop cases and the complete final sweep. An early lifecycle assertion sampled before the asynchronous native close event; it was replaced by an event-outcome condition. The separate rapid-opacity failure was a genuine component defect and was fixed, not suppressed. No failed attempt is relabelled as passing.

## 7. External-resource classification

The old **75 ERR_FAILED console entries lack URLs**; no one-to-one historical attribution is possible. New instrumentation removes query strings and records origin, resource type, method and failure details.

| Observation | Classification |
|---|---|
| Google Analytics `/g/collect` POST fetches on `www.google-analytics.com` and `www.google.com` | Initial guard deliberately aborted these and reproduced ERR_FAILED. Final collection requests received local 204 responses; no telemetry sent. Cancellation entries remain during navigation. |
| `maps.googleapis.com/$rpc/google.internal.maps.mapsjs.v1.MapsJsInternalService/GetViewportInfo`, POST/XHR | Intentionally blocked by the write guard: 6 blocked calls, 5 request-failure callbacks and 6 resource-console errors in the final sweep. This does not demonstrate a production Maps outage. |
| Google Maps embed document GET / analytics fetch ERR_ABORTED | Cancellation observations; not evidence of broken application asset URLs. |
| Local application assets / third-party font and photo GETs | No local asset HTTP errors or failed font/photo/script GETs observed in the completed local sweep. No external-network restriction was established. |
| Both public hosts: `/products`, `/gallery` document GET | **Real user-facing 404 responses.** Home is HTTP 200; Home → Products works through SPA navigation; reload returns the platform 404. Hosting fallback is a likely explanation, not a verified configuration diagnosis. No deployment changes made. |

The final sweep recorded **0 JavaScript page exceptions and 6 resource-console errors**; it is not a zero-error network claim. Public receipts: `host-status.json`, `host-routing.json`, `external-resources.json`. Additional SPA resource sampling was partial: Products capture encountered a detached element during route transition, and offscreen Gallery images did not all complete in the observation window. Those captures are not counted as passing asset checks. Public/local revision parity was not established.

## 8. Accessibility and responsive acceptance

The full sweep covers Products, Gallery, Careers, Contact and navigation at **320/390/430/768/1024/1440**, both languages. Keyboard, pointer/touch, direct loading and SPA navigation passed. Checks include modal focus/background exclusion/restoration, reachable Close controls, carousel independence, visible Details, native field labels/validity, all 21 enquiry contexts, edited values and actual Back/Forward navigation. No document overflow or lingering lock was found. Narrow header height remains 112 px.

Computed radii passed: public filters/shared buttons 8 px, menu 6 px, circular carousel/chat controls, explicit squares 0. Fifteen representative Admin buttons matched the prior radius/background/height/class/text snapshot. Admin source/CSS was not edited.

Neither set of 10 axe scans found targeted dialog-name, button-name, label/select-name, nested-interactive or invalid-state violations. Contrast/link-name categories remain open: main scans recorded 53/8 nodes, settled checks 58/16, across repeated states, **not unique defect counts**. Their visibility-dependent counts are not treated as a new conformance determination. Footer/FAQ/contrast/localization backlog was not changed.

Representative Product/Gallery/Careers captures and the settled Bengali menu were visually inspected. Tests did not force global opacity or disable production animations. Host-root screenshots include preloader states and were not used for design comparisons. Physical Android/iOS, screen-reader speech and another browser engine remain unverified.

## 9. Final command results

| Command | Actual result | Evidence |
|---|---|---|
| `npm.cmd run lint` | Exit 0; TypeScript `tsc --noEmit`, not ESLint | `typecheck.txt` |
| `npm.cmd run build` | Exit 0; existing >500 kB chunk warning | `build.txt` |
| `git diff --check` | Exit 0; LF/CRLF notices only | `diff-check.txt` |

These checks ran after the application correction. Later changes were evidence/documentation only.

## 10. Outstanding issues and release blockers

**PUB-004 fake-success/form delivery and PUB-005 nonfunctional downloads remain Batch 1B production-release blockers.** No real form/application was submitted. Public-host direct-route failures need separate hosting authorization and verification. Existing photo/identity, footer, FAQ, contrast, localization and other register backlog remain. No broad audit or redesign was started.

## 11. Full Git preservation

[Full final Git status](evidence/batch-1a-acceptance/git-status-final.txt) and `preservation-results.json` record every path. Of 518 baseline files, **517 remain byte-identical**; the sole intentional change is PublicModal, whose original backup matches its baseline SHA-256. All 277 original untracked paths still exist; 276 are byte-identical and the modal's original content is separately preserved. No baseline file is missing and no unexpected new path was found.

Final status: **8 unstaged tracked modifications, 396 untracked files** (277 baseline + 119 acceptance additions); no staged changes. Branch and commit are unchanged.

The eight tracked application modifications, all original reports/evidence, Admin/CMS/backend source, product data/media, manifests and lockfiles were preserved. No reset, cleanup, staging, commit, push, deployment, dependency installation or migration occurred. Acceptance-owned servers stopped; unrelated processes were not terminated.

## 12. Batch 1B recommendation

The tested local Batch 1A interaction work has no remaining reproduced in-scope failure. ChatGPT may review this conditional acceptance and separately authorize Batch 1B. Keep release blocked on form/download readiness, deployed direct-route loading and outstanding release verification. **Batch 1B has not begun.**
