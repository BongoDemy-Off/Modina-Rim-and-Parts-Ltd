# Batch 1A implementation report

Date: 27 October 2026, Asia/Dhaka. Authority: local repository and the approved **Modina Batch 1A — Final Implementation Plan**. This report concerns the local public frontend; it is not a production-readiness or accessibility-conformance certification.

## A. Summary

Desktop dropdowns now have keyboard-operable disclosure buttons. Products have permanently visible Details buttons; Gallery images and Careers roles have semantic buttons. Product details, the Gallery lightbox, the Careers drawer, and the existing modal mobile menu share a small native-dialog lifecycle component with focus containment, dismissal, restoration, background isolation, and scroll-lock cleanup.

Contact and Careers labels are associated with their fields. Careers fields use the existing public bordered/rounded style. Product enquiries use the actual Product Inquiry subject and exact catalogue name without overwriting edited subject/message values. Public rounded utilities now work without changing Admin styles.

## B. Audit issue mapping

| Issue | Resolution / boundary |
|---|---|
| PUB-006 | Implemented: desktop disclosure buttons, Enter/Space, Tab traversal, Escape/return focus, outside/blur/route dismissal, pointer hover. Ordinary navigation semantics retained. |
| PUB-007 | Implemented: explicit product Details and Careers View Role buttons; semantic Gallery image buttons. No nested interactive card controls. |
| PUB-008 | Implemented for all four approved overlays: native modal semantics, names, content-specific initial focus, containment, background isolation, scroll-lock ownership and focus restoration. |
| PUB-009 | Implemented: Escape and native cancel handling coordinated with Motion exits; mobile-menu route/breakpoint cleanup. |
| PUB-010 | **Partially resolved:** all six Contact and all four Careers fields now have associated labels. Unrelated newsletter findings remain outside this batch. |
| PUB-011 | Implemented: valid Product Inquiry subject and exact product context; pristine values follow query/history changes, edited values survive same-mounted-route changes. |
| PUB-015 | Implemented for public controls: corrected cascade ownership; shared button shapes and explicit square controls preserved. Admin reset behavior retained. |
| PUB-032 | **Partially resolved:** Gallery/Careers filter pressed states, mobile disclosure expanded states, carousel indicator pressed states. FAQ and other-page filters remain outside scope. |
| PUB-037 | Implemented: Careers fields match the existing public bordered, rounded, minimum-56px field treatment with visible focus and 16px input text. |
| PUB-040 | Implemented: product Details is visible without hover and independently operable. |

PUB-030/031 are not claimed resolved: the register's unrelated images, footer social links, and homepage controls were not changed. Existing 32px product indicators remain 32px. Indicator buttons use `aria-pressed`, not unsupported `aria-selected`.

## C. Modified application files

| File | Purpose |
|---|---|
| `src/components/PublicModal.tsx` — new | Native dialog, shell-owned exit completion with per-overlay duration, coordinated React/Motion/browser lifecycle, reduced motion, shared scroll-lock ownership, backdrop handling, focus containment/restoration, route/unmount cleanup. |
| `src/components/Navbar.tsx` | Accessible disclosures, stable identifiers/state, inert exiting disclosure links, labelled search, nonmodal search Escape/focus return, native mobile menu with preserved presentation and breakpoint handling. |
| `src/components/ProductImageCarousel.tsx` | Programmatic pressed state on existing indicator buttons; wide touchscreens retain visible arrows while fine-pointer desktop hover presentation remains. |
| `src/layouts/Layout.tsx` | Public CSS boundary and focusable main fallback landmark. |
| `src/pages/Products.tsx` | Explicit visible Details action and accessible product modal; remove competing page-level Escape/scroll effects. |
| `src/pages/Gallery.tsx` | Semantic image buttons, filter state and accessible lightbox; close action moved inside viewport-safe content flow. |
| `src/pages/Careers.tsx` | Semantic role action, filter state, accessible drawer, associated labels and existing-design field styling. |
| `src/pages/Contact.tsx` | Associated labels and exact, edit-aware product enquiry prefill. Existing submission outcome unchanged. |
| `src/index.css` | Public radius ownership, narrowly scoped native-dialog reset and public field styling. |

No other application file is authorized or intentionally changed. New regression fixtures, scripts, logs, screenshots and hashes are confined to `docs/audits/evidence/batch-1a/`; this report is the only new report outside that evidence directory.

## D. Before and after

| Feature | Before | After |
|---|---|---|
| Desktop navigation | Mouse-only DIV triggers | Named disclosure buttons with accurate expanded state and keyboard traversal/dismissal |
| Product cards | Click-only card; Details span hidden without hover | Explicit always-visible Details button; separate image controls |
| Gallery / Careers | Click-only card wrappers | Named semantic actions, visible keyboard focus |
| Modal overlays | Focus could remain/escape into background; inconsistent Escape and scroll locking | Native top-layer modality plus coordinated lifecycle, focus entry/containment/return and cleanup |
| Mobile menu | Background opener retained focus | First navigation control receives focus; same partial drawer/backdrop and header design |
| Forms | Visible labels without associations | Stable unique IDs and `htmlFor` relationships in both locale modes |
| Careers fields | Underline-only fields | Existing public rounded/bordered convention with accessible focus |
| Product enquiry | Subject state matched no option; General Inquiry displayed | Existing Product Inquiry option selected; exact product message retained |
| Query changes | Generated message could overwrite edits | Independently protect edited subject and message; normal pristine Contact defaults without valid product context |
| Radius | Unlayered global rule defeated public rounded utilities | Intended public radii restored, including circles, rounded variants and deliberate squares |
| Wide touchscreen carousel | Width-based desktop classes hid arrows even without hover support | Arrows stay visible on touch; hover-only treatment is restricted to fine pointers with hover support |

**Intentional trade-offs:** Product card bodies are no longer implicit actions; their visible Details button is the action. This avoids a transparent overlay interfering with carousel interaction or text selection. Gallery Close is in normal lightbox content flow rather than positioned above the image container, preserving access at narrow/short sizes. No new draft storage was added: Contact retains existing reset-on-remount behavior after leaving the route.

## E. Test evidence

Raw results, including unsuccessful attempts, are retained in [Batch 1A evidence](evidence/batch-1a/). The machine-readable [validation summary](evidence/batch-1a/validation-summary.json) distinguishes the complete sweep from later retries.

| Check | Actual outcome | Evidence |
|---|---|---|
| Final TypeScript check | **Exit 0**; `tsc --noEmit`, not ESLint | `typecheck-complete.txt` |
| Final production build | **Exit 0**; existing chunk-size warning remains | `build-complete.txt` |
| Complete final-bundle sweep | **60/64 cases passed**; four navigation timeouts; runner subsequently required owned-process cleanup during teardown | `regression-complete-results.json`, `regression-complete-run.txt`, `owned-process-cleanup.txt` |
| First targeted retry | **2/3 passed**, exit 1; Bengali 390px Products/Gallery passed; Bengali 320px disclosure pointer action timed out | `regression-navigation-retry-results.json` |
| Last targeted retry | **2/2 passed**, exit 0; Bengali 320px keyboard disclosure/menu cleanup and public/Admin radius isolation | `regression-final-targeted-results.json` |
| Additional final-bundle local checks | **4/4 passed**, exit 0: wide-touch carousel visibility/independence, settled desktop Careers containment/Close, collapsed disclosure tab order, label activation and immediate menu breakpoint cleanup; external requests blocked for this isolated functional check | `local-checks-results.json`, `local-checks-complete-run.txt` |
| Final lifecycle fixture | Both normal/reduced-motion groups passed, exit 0; six rapid cycles each, immediate Escape, duplicate native cancel, native close, backdrop, focus fallback, route/unmount | `lifecycle-results.json`, `lifecycle-complete-run.txt` |

All **64 scenario names have passing evidence across the final sweep and retained retries**. This is **not a claim that one complete 64-case sweep passed**. The last Bengali 320px retry used keyboard disclosure activation; its preceding pointer timeout remains a visual/manual QA limitation. A clean complete rerun on a stable browser and physical-device checks remain release gates.

- Baseline: `main`, `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e`; 163 pre-existing untracked files; no tracked changes.
- Existing baseline TypeScript/build checks passed during plan grounding. Final implementation command logs are `typecheck-complete.txt` and `build-complete.txt`; earlier logs remain historical evidence.
- Production browser target: `http://127.0.0.1:4181`; installed Chrome via bundled Playwright. The isolated lifecycle fixture uses the same source component, React StrictMode and existing Motion through a local Vite server at port 4183. It is not imported into the application or production build.
- Regression matrix covers Products, Gallery, Careers, Contact and navigation at 320/390/430/768/1024/1440 in English and Bengali; keyboard, pointer, emulated-touch contexts, direct loading, SPA transitions, and real Back/Forward navigation.
- Additional checks cover product 9/9/3 pagination, filtering/search/reset, all 21 product enquiry URLs, unknown/empty/default context, native validity without submission, edited-value preservation, carousel independence, modal lifecycle races, native cancellation, backdrop behavior, hidden-trigger fallback, breakpoints and Admin computed-style isolation.
- The broader public smoke collected 44 initial states (22 URLs at 320/1440), including missing/detail states, plus a fresh-session preloader completion check. This is layout/render evidence, not exhaustive interaction coverage for those unrelated pages.
- Ten final WCAG-tagged axe states, combining the final sweep and the two Bengali 390px retries, found no targeted label, select-name, button-name, dialog-name, nested-interactive or invalid-state failures. They retained **37 contrast nodes and 8 unnamed-link nodes** across repeated scans, not 45 distinct defects. These remain documented existing findings. The earlier first complete attempt separately recorded 38/8 nodes.
- The final main sweep recorded zero JavaScript `pageerror` events and **75 external `net::ERR_FAILED` resource-console entries**. The earlier main attempt recorded 113. Do not interpret either as a clean network/console pass or a production-host outage finding.

### Screenshot references and visibility qualification

Fresh before screenshots: `before-{products,gallery,careers,contact}-{390,1440}.png`. After screenshots: `after-{route}-{390,1440}-{en,bn}.png`, corresponding open-overlay captures `after-{products,gallery,careers}-open-{390,1440}-{en,bn}.png`, and `after-menu-390-{en,bn}.png`.

Representative product drawer, Gallery lightbox, Careers form, mobile menu and mobile product-card captures were visually inspected. Captures use scrolled viewport sections and waits; production animation opacity was never forced and production animations were not globally disabled. These images do not establish settled visibility for every below-fold Motion section. Existing random photos, including the Gallery beach/factory-caption mismatch and SKU-001 identity mismatch, remain deliberately visible and unchanged.

### Failures investigated / testing limitations

- An initial scroll-lock implementation reserved a new 6px gutter on overlay-scrollbar systems. Corrected to reserve a stable gutter only where the page already had a scrollbar gap; responsive modal geometry reruns exercise the correction.
- A 1024px touch-oriented check confirmed that the pre-existing desktop-width arrow rule hid carousel arrows on wide touchscreens. Corrected with a public component-scoped fine-pointer/hover media query; no image, carousel data or gesture model changed.
- An immediate breakpoint change while the mobile menu was entering could hide its panel before nested Motion presence completed, stranding native modality. The menu now unmounts when desktop navigation takes over, guaranteeing immediate cleanup. The shared shell also owns exit completion so nested carousel/disclosure presence cannot keep a closed-state dialog open; nominal drawer/lightbox exit durations remain respected.
- Early runner assertions measured scroll before trigger focus, treated a normal header-height transition as a defect, used an ambiguous Quality locator, assumed a browser-specific serialized infinite radius, or awaited every remote resource's load. Preserve these logs as failed attempts; they are not independent application defects.
- Some automated pointer actions and early fixture runs timed out. Vite reloads during evidence writes disrupted a fixture attempt; the isolated fixture was moved to a single server with HMR disabled. Production animations remain enabled.
- `focused.cjs` did not complete an all-green run: successive attempts retained pointer/label/animation timeouts and an overly specific outline-width assertion. Its files are failure/partial-progress evidence. Final native lifecycle, local functional checks and the main/retry matrix have separate passing receipts; do not relabel the focused runner as passed.
- This Windows host can stall after browser assertions complete during Playwright teardown. The final runner helper bounds graceful shutdown and can terminate only the explicitly owned browser process tree. Earlier saved-result runners required targeted process termination. Watchdog use is reported separately from assertion outcomes.
- Physical Android/iOS devices, native screen-reader speech, native text zoom and an independent browser engine were not verified. English/Bengali state coverage is not translation completion or native-reader approval.
- No real enquiry, application, newsletter, telephone call, email or AI message was sent. Browser runners block non-GET/HEAD/OPTIONS requests.

## F. Visual preservation

Brand red `#E52525`/dark red `#B31515`, fonts, hero designs, content, photographs, product records/categories, existing route/query contracts, header composition and responsive grid breakpoints were retained. Original image arrows/indicators and filters/pagination remain separate controls. Approved animations remain in normal mode; the edited overlays respect reduced-motion preferences.

Public-only radius selectors also cover native top-layer dialogs through retained DOM ancestry and an explicit public marker on each dialog root. The old reset continues to apply outside the public boundary. No Admin component or Admin stylesheet was edited.

## G. Remaining issues / production-release blockers

**Batch 1B production-release blockers, requiring separate authorization:**

1. **PUB-004:** Contact/Careers still use their existing local fake-success handlers. No delivery service, persistence or receipt acknowledgement was implemented. Their success wording remains misleading for production use.
2. **PUB-005:** Advertised download actions still lack approved functioning document targets. No files or download behavior were invented.

Other original register findings remain outside this batch, including PUB-001/002/003 product/credibility imagery, PUB-012 translation gaps, PUB-013 contrast, PUB-030 unrelated image/social naming, remaining PUB-032 states, PUB-033 global-search exact-item intent, certificate/contact/claim decisions, and loading/performance work. Refer to the preserved register for the complete backlog. No Batch 1B work has begun.

## H. Regression risks

Native dialogs and scroll locking need release testing on real mobile Safari/Chrome, software-keyboard and browser-bar changes, and native assistive technology. The lifecycle fixture covers the shared primitive under StrictMode, including rapid re-entry, but does not replace physical-device testing. Remote media availability affects screenshots and load completion. Existing Motion entrance/capture limitations prevent a claim of comprehensive pixel-equivalent whole-page coverage.

The global CSS file changed, so preservation was checked both structurally (Admin hashes) and through representative computed styles. This does not claim exhaustive testing of every Admin screen. The four main-sweep timeouts and the Bengali 320px pointer-action timeout remain in the evidence; a single all-green final full sweep was not obtained. Existing fake-success and download presentation remain release blockers regardless of Batch 1A interaction improvements.

## I. Git status and preservation

The initial manifest is [baseline.json](evidence/batch-1a/baseline.json). [Preservation results](evidence/batch-1a/preservation-results.json) verify all 163 original untracked files unchanged, all 136 Admin source files preserved, and no changes to assets, public files, product data, package manifest or lockfile. Exactly eight previously tracked application files changed; PublicModal is one new application file.

Complete final Git status, including pre-existing artifacts and every new evidence file, is recorded in [git-status-final.txt](evidence/batch-1a/git-status-final.txt). No commit, staging, push, deployment or monorepo migration was performed. Admin/CMS/backend and all product photos are unchanged.

Final inventory: eight modified tracked application files; 277 untracked files in total, comprising the 163 preserved originals and 114 Batch 1A additions (one application component, this report, and 112 evidence/test files). No unexpected new path or missing baseline file was found.
