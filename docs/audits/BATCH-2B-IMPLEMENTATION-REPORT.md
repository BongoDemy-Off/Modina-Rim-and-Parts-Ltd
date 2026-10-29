# Modina Batch 2B — Premium Mobile-First Page Polishing

28 October 2026, Asia/Dhaka. Local public frontend only.

**Implementation and scoped local verification complete. Ready for ChatGPT and owner/client visual review; this is not production-readiness approval.**

## 1. Executive summary

Implemented the approved six public-page groups while retaining the red/light identity, distinctive Home showcase, two-row narrow navbar, dark CTA bands, existing fonts, photographs, copy, product records and routing configuration. Task heroes are more compact without reducing the accepted secondary-page heading scale. Search can open an exact product; Careers and editorial pages have task jumps; FAQ and skip navigation expose clear keyboard semantics; the branded introduction is short and skippable; hero/video motion has user controls.

This batch does not supply delivery, downloads, uploads, verified business claims, replacement media, CMS or backend capabilities. Client visual approval and frontend freeze have not been declared.

## 2. Audit issue disposition

| ID | Implemented behavior / disposition |
|---|---|
| PUB-017 | **Implemented; subjective visual acceptance remains.** Compact task/legal heroes, clearer catalogue/form entry and vacancy/editorial jumps. Measured composition improvement, not a WCAG defect or reason to remove all whitespace. |
| PUB-028 | **Resolved locally, timing qualification below.** Rim/split-panel identity retained; 650ms presentation and 350ms split exit, immediate Skip, Escape, reduced-motion bypass and session reuse. Decorative completion is independent of remote loading. Actual browser removal: 1.24–1.40s. |
| PUB-029 | **Resolved in scoped browser/controller checks.** Home Pause/Play, manual controls, focus/hover/visibility suspension and static reduced-motion start. Home/About native video controls preserve pause choices and handle autoplay rejection. Native document-visibility and physical media-control limits remain below. |
| PUB-033 | **Resolved locally.** Exact product query behavior implemented and 49/49 focused checks passed; production rerun recorded below. |
| PUB-038 | **Recommendation implemented locally.** First-focus skip link, measured sticky offsets, catalogue H2, FAQ question headings, coherent timeline/caption semantics and missing-detail H1s. Native assistive-technology review remains a later gate; original recommendation classification retained. |
| PUB-032 | **FAQ remainder resolved locally.** Stable question/panel relationships, expanded state, hidden/exiting-panel isolation and polite result count. Previously accepted filter pressed states retained; this does not reopen or relabel their prior disposition. |
| PUB-016 | **Composition remainder implemented; client visual review remains.** Accepted Batch 2A typography roles are preserved. |
| PUB-030 | **Still partial.** New controls are named; outstanding original image/social naming findings are not closed. |

Preserve earlier resolved/partial dispositions. PUB-004/005 demo/delivery/download findings, PUB-010 newsletter remainder, PUB-012 translation gaps, PUB-018/019 metadata/status, PUB-021 certificate validation, PUB-024 featured editorial mismatch, PUB-034 media resilience, PUB-035 counts and PUB-036 approved document enlargement remain outside this batch. Visual improvement does not validate credentials or content.

## 3. Six implementation groups

1. **Products/Contact:** compact task heroes, repaired stat cells, visible catalogue H2, actual sticky-aware pagination destination, exact-product URL opening, preserved enquiry prefill, mobile form insets and safe drawer actions.
2. **Downloads/Careers:** compact resource entry, practical search height, list anchor/pagination, padded benefit cards, retained benefits-before-vacancies order, View Open Roles jump, wrapping metadata and scrollable short-height drawer content. Existing demo/file outcomes remain unchanged.
3. **Home/shared:** original showcase and approved header retained; mobile label/control composition, Pause/Play, reduced-motion counters/transforms, controlled video playback, short branded intro, first-focus skip navigation, measured header offsets, form-focus clearance for floating controls and footer clearance.
4. **Company:** About/Mission/Sustainability retain their storytelling and section order. Local spacing/card insets are tightened, short stat values stay together, mobile milestones gain readable item widths and named keyboard scrolling, pillar metadata wraps.
5. **Quality/media:** ordered process steps and keyboard-accessible timeline, readable mobile item widths, certificate metadata insets and milestone headings, retained full-document frames and masonry, bounded Close/image/caption lightbox layout.
6. **Editorial/support:** compact listing/legal heroes, retained featured-first order with list jumps, bounded article media frames and reading transitions, FAQ semantics, earlier policy content, and clear missing-article/NotFound recovery. Editorial/legal text and known content discrepancies remain unchanged.

| Page pattern | Material change and visual rationale | Review evidence |
|---|---|---|
| Products | Search/catalogue begin earlier; cards keep existing photographs and image controls. Localized catalogue H2 clarifies the transition. Drawer URL behavior carries exact search intent. | `before-products-*` ↔ `group1-review-products-*`; matched drawer pair. |
| Contact | Shorter entry and 24px phone form padding bring the first field closer without shrinking labels. Form focus clears floating controls on compact screens. | `before-contact-*` ↔ `group1-review-contact-*`; dark CTA/footer pairs. |
| Downloads | Resource heading and 44px search make discovery explicit; compact entry exposes the first resource card. Category scrolling stays intentional. | `before-downloads-*` ↔ `group2-review-downloads-*`. |
| Careers | Padded benefits and wrapping metadata prevent cramped borders; View Open Roles gives a direct jump while keeping section order. Drawer flex sizing supports short screens. | `before-careers-*` ↔ `group2-review-careers-*`; short-height receipt. |
| Home | Earlier mobile artwork and separate control rows preserve the showcase and CTAs. Desktop split stays intact; no rigid first-screen fit. | Corrected Home baseline ↔ `group3-review-home-*`; tablet and Bengali-wide pairs. |
| About | Mobile timeline has readable 200px items, ordered semantics and a named keyboard scroller; paragraph gutters and native video controls improve reading/access. | `group4-review-about-*`; matched timeline pair. |
| Mission | Stat values stay whole; value cards retain their asymmetric grid and stretch-aligned metadata with practical insets. | `group4-review-mission-*`; matched values pair. |
| Sustainability | Story order/photos remain; story insets and wrapping pillar metadata improve narrow layouts. | `group4-review-sustainability-*`; pillar pair and final story inset supplement. |
| Quality | Ordered, named process scroller replaces misleading pointer cues; readable item widths retain intentional horizontal motion. | `group5-review-quality-*`; matched process pair. |
| Certificates | Mobile milestone reading and document-card insets improve; full document frames and all credential text remain. | `group5-review-certificates-*`; matched card pair. |
| Gallery | Existing masonry retained; lightbox uses bounded image and caption rows with reachable Close. Long captions become keyboard-scrollable only when needed. | `group5-review-gallery-*`; matched lightbox pair and long-caption receipt. |
| News / Blog | Compact listing entry, intact featured-first composition and list jumps reduce navigation effort. | `before-news/blog-*` ↔ `group6-review-news/blog-*`. |
| News detail / Blog detail | Mobile 16:9 images and capped desktop media reduce avoidable reading delay; existing article width/text remain. Existing missing-detail messages become H1 recovery headings. | `group6-review-news-1/blog-1/blog-featured/news-invalid/blog-invalid-*`. |
| FAQ | Compact entry and preserved single-open cards; question H2/button relationships and hidden panels improve the content outline without changing answers. | `group6-review-faq-*`; matched expanded pair. |
| Privacy / Terms | Reduced decorative entry spacing puts the policy introduction earlier; legal text/numbered sections remain. | `before-privacy/terms-*` ↔ `group6-review-privacy/terms-*`. |
| NotFound | Bounded spacing keeps existing H1, Return Home and View Products recovery readable on narrow/short screens. | `group6-review-audit-missing-page-*`. |

All screenshot paths above are under [the indexed evidence directory](evidence/batch-2b/README.md). Image/content credibility limitations visible in these captures are recorded in section 13, not silently repaired.

## 4. Exact application files changed

Against the captured working tree, 28 original application files changed and three public helpers were added (31 total):

- Shared: `src/App.tsx`, `src/index.css`, `src/layouts/Layout.tsx`, `src/i18n/en.json`, `src/i18n/bn.json`.
- Components: `src/components/BackToTop.tsx`, `src/components/Chatbot.tsx`, `src/components/Navbar.tsx`, `src/components/Preloader.tsx`.
- New: `src/components/PublicScroller.tsx`, `src/components/PublicVideo.tsx`, `src/hooks/usePublicLayout.ts`.
- Pages: `src/pages/About.tsx`, `src/pages/Blog.tsx`, `src/pages/BlogDetail.tsx`, `src/pages/Careers.tsx`, `src/pages/Certificates.tsx`, `src/pages/Contact.tsx`, `src/pages/Downloads.tsx`, `src/pages/FAQ.tsx`, `src/pages/Gallery.tsx`, `src/pages/Home.tsx`, `src/pages/Mission.tsx`, `src/pages/News.tsx`, `src/pages/NewsDetail.tsx`, `src/pages/NotFound.tsx`, `src/pages/Privacy.tsx`, `src/pages/Products.tsx`, `src/pages/Quality.tsx`, `src/pages/Sustainability.tsx`, `src/pages/Terms.tsx`.

The accepted pre-existing Footer, ProductImageCarousel and PublicModal bytes are retained. All new stylesheet rules are scoped to public surfaces; the original stylesheet prefix is unchanged. No dependency or design-system package was added.

## 5. Before/after visual findings

Evidence lives in [batch-2b](evidence/batch-2b/). The independent baseline source/asset copies and [baseline manifest](evidence/batch-2b/baseline.json) preserve the actual starting working tree. The baseline visual run completed 88 EN/BN route/viewport observations.

- Products search moves from approximately y=669 to y=522 at 390px. The catalogue heading and beginning of the first image are now visible in the same initial viewport.
- Contact's first field moves from approximately y=915 to y=691 at 390px. Text size and form content are retained.
- Careers benefit copy no longer reaches the card border; the vacancy jump provides direct access without moving the benefits section.
- Short desktop stat values no longer split into individual digit/letter lines.
- Wider mobile timeline items reduce fragmented reading while preserving intentional horizontal scrolling.
- Article and legal entry composition reduces avoidable delay before reading; source images and text remain unchanged.

The [visual evidence index](evidence/batch-2b/README.md) links matched before/after views for all six groups, timeline/card sections, product/gallery overlays, expanded FAQ, dark CTA and footer. Final `group1-review` through `group6-review` receipts contain 88 route/locale/viewport observations. The separate [section/overlay receipt](evidence/batch-2b/details-final-results.json) contains 40 settled matched captures. Supplements cover five tablet pages before/after, four wide Bengali pages before/after, ten EN/BN mobile story insets and the final footer pair.

Home's image comes earlier on mobile while its main CTAs, horizontal product label and Pause/Play retain separate readable rows. Selectors can remain below the first phone viewport: fitting every control into a rigid height would weaken the branded composition. The desktop split showcase remains intact. Mobile footer clearance prevents the floating controls covering the final links; desktop retains its original bottom spacing.

The initial baseline fixture accidentally nested public assets. Initial `before-home-*` screenshots are invalid for comparison; corrected `before-home-corrected-*` captures use the verified [25/25 original public asset bytes](evidence/batch-2b/baseline-public-assets.json). Early `group1`, `group2-final`, `partial-*` and unfinished Home captures remain as incomplete evidence. A section capture with an unfinished next-row entrance was recaptured after walking the entire section. Blank Motion bands are not classified as actual design whitespace.

Capture readiness combines fonts, loaded selected images, visible ancestor opacity, stable target geometry and repeated viewport checks. Raw browser pixels preserve production animation. Sections are walked into view, settled and returned to the same anchor; automatic hero rotation is explicitly paused and the same slide selected. No global animation suppression or forced opacity is used. Cropping/spacing decisions remain owner/client review decisions, not automatic approval from DOM assertions.

## 6. Product query and history behavior

`/products?category=Hardware&product=21` opens the existing Wasar record. The optional product parameter is an exact existing decimal ID; malformed/unknown IDs leave a usable catalogue. A valid product resolves category conflicts through replacement, prepares its underlying category/page, and opens the accepted drawer.

Navbar selection pushes navigation; normalization and Close replace the current query entry. Close removes only the selected-product parameter and preserves useful category/page context. Back/Forward follows URL state. Query-specific modal instances coordinate route changes without changing PublicModal. Catalogue focus returns after native modal cleanup; normal card openings retain their existing behavior. Contact's product-name enquiry contract remains unchanged.

[49/49 focused checks](evidence/batch-2b/query-checks.json) cover 21 direct opens/closes, 21 navbar selections, refresh/category conflict, five invalid IDs, history, same-route selection and enquiry context. The [production-build rerun](evidence/batch-2b/production-query-checks.json) independently passed **49/49**, exit 0. The initial focus race is preserved in `query-first-run.txt` and failure images; the corrected complete run exited 0.

## 7. Branded introduction

The client-required rim and split panels remain. Narrow screens stack the panels to give company branding its full available width; larger screens retain the side-by-side identity. Skip is immediately available, Escape completes the intro, covered public controls are inert, and focus returns to main content when it was inside the intro. Reduced motion bypasses it and records the session key; internal navigation does not replay it.

The first implementation awaited animation promises and measured 2–3 seconds in this browser. The correction starts in a layout effect and uses an independent 1,000ms decorative completion deadline, preserving 650ms presentation plus 350ms split exit. It never waits for image/font/network success and does not suppress application errors. [Four final intro checks](evidence/batch-2b/intro-final-checks.json) passed, exit 0. Mounted-to-removed measurements were **1,401.3ms at 320px and 1,235ms at 1440px**. The immediate Skip DOM, unclipped 320px branding, focus handling, reduced-motion bypass and internal-route non-replay passed. Browser scheduling adds time beyond the one-second deadline; exact one-second wall-clock removal is not claimed. The complete sequence is retained for owner/client review.

## 8. Hero and video motion

The hero retains the five-second interval and manual Previous/Next/selection controls. Pause persists through manual selection; keyboard entry stops rotation until Play; hover suspends it; hidden/offscreen conditions suspend advancement. Reduced motion starts static. [Seven motion checks](evidence/batch-2b/motion-final-checks.json) passed, exit 0. Instrumentation recorded one created interval and three actual callback gaps of approximately 5,002/5,006/5,008ms. Headless Chrome did not produce a native hidden-document transition in the tab test; that condition was verified using the receipt's explicitly marked synthetic visibility fallback. This is not native background-tab/device proof.

Both existing video assets use native controls, muted inline playback, metadata preload and visibility-aware autoplay. Reduced motion starts paused. Explicit pause survives visibility changes; rejected autoplay is caught and does not produce repeated attempts or break the page. [Video checks](evidence/batch-2b/video-release-checks.json) passed 4/4, exit 0. Pause-event/controller tests are browser automation, not physical native-control testing.

Implementation follows the user-control principles in [W3C WAI's carousel tutorial](https://www.w3.org/WAI/tutorials/carousels/). This is not an accessibility-conformance claim.

## 9. English/Bengali and mobile responsiveness

Existing translation entries, locale synchronization, Bengali font registration/synthesis rules and grapheme handling are preserved; only new UI labels are added. Existing English passages in Bengali mode remain a content limitation.

The [final production sweep](evidence/batch-2b/sweep-results.json) passed **352/352 states**, exit 0: 22 public route observations × EN/BN × 320/360/375/390/430/768/1024/1440px. No unexpected document overflow or application page error was recorded. These are DOM/layout observations; selected settled screenshots supply the visual review.

The [15/15 focused layout run](evidence/batch-2b/layout-release-checks.json) covers skip/FAQ/jumps, 667×375 / 844×390 / 320×568 product/gallery overlays, keyboard timelines and four sampled 200% root-font approximations. The separate [20/20 enlarged-text run](evidence/batch-2b/text-corrected-checks.json) covers EN/BN and a long Bengali heading fixture. Its initial five overflow failures led to content-driven wrapping stat cells; accepted heading sizes and complete values are retained.

[Four hero touch checks](evidence/batch-2b/home-touch-final-checks.json), [three short Careers drawer checks](evidence/batch-2b/short-careers-final-checks.json) and [two long-caption keyboard checks](evidence/batch-2b/caption-final-checks.json) passed, each exit 0. Submit was reached without submitting. These are CSS viewport/root-font and browser touch tests, not physical devices, native text zoom or software-keyboard certification.

## 10. Keyboard and accessibility

Skip navigation, FAQ relationships and result feedback, named new controls, genuine existing modal semantics, sticky-aware anchors and focus restoration are implemented. The shared modal lifecycle was not rewritten. [Ten settled accepted-suite scans](evidence/batch-2b/settled-a11y-results.json) passed targeted accessibility assertions, exit 0: EN/BN product, gallery and Careers open states have no reported violations; Contact and menu states each retain four original unnamed footer social links (`link-name`, 16 repeated node observations across four scans). These are the same four controls, not 16 distinct controls.

The [additional scoped receipt](evidence/batch-2b/accessibility-final-checks.json) passed eight axe scans of Home carousel, FAQ and About/Quality scrollers across EN/BN with zero violations in those scopes, plus two missing-article H1 checks. The 64-case regression also includes ten axe scans; those scan sets overlap and are not counted as unique coverage. Automated name/state/contrast rules are not full manual contrast or screen-reader certification. Existing unresolved social/image naming, translation and content findings remain open.

## 11. Regression and build results

The [command receipts](evidence/batch-2b/command-results.json) record actual process exits. Final production interaction regression passed **64/64**, exit 0, including product search/filter/pagination/enquiry, public modals, navigation and Admin computed-style comparison. Lifecycle passed both normal/reduced-motion groups, exit 0; accepted touch passed 4/4, exit 0. Production query passed 49/49 and responsive sweep passed 352/352, both exit 0. The [rapid-reopen rerun](evidence/batch-2b/race-results.json) passed **40/40 cycles** (20 normal, 20 reduced), [exit 0](evidence/batch-2b/race-rerun-command.json).

| Suite | Actual final result | Receipt |
|---|---|---|
| Accepted interaction regression | 64/64; exit 0 | `production-regression-results.json` |
| Responsive production sweep | 352/352; exit 0; no overflow/page errors | `sweep-results.json` |
| Accepted modal lifecycle | 2/2 normal/reduced groups; exit 0 | `lifecycle-results.json` |
| Accepted rapid reopen | 40/40 cycles across normal/reduced motion; corrected rerun exit 0 | `race-results.json`, `race-rerun-command.json` |
| Accepted touch | 4/4; exit 0 | `touch-results.json` |
| Exact-product query production rerun | 49/49; exit 0 | `production-query-checks.json` |
| Intro / hero motion / video | 4/4, 7/7, 4/4; exit 0 each | `intro-final-checks.json`, `motion-final-checks.json`, `video-release-checks.json` |
| Focused layout / enlarged text | 15/15 and 20/20; exit 0 each | `layout-release-checks.json`, `text-corrected-checks.json` |
| Extra hero touch / short Careers / long captions | 4/4, 3/3, 2/2; exit 0 each | `home-touch-final-checks.json`, `short-careers-final-checks.json`, `caption-final-checks.json` |
| Settled accepted-suite accessibility | 10 states; targeted assertions pass; original `link-name` remains | `settled-a11y-results.json` |
| Additional scoped accessibility | 8 scoped axe scans + 2 recovery heading checks; 10/10, exit 0 | `accessibility-final-checks.json` |

These suites overlap. Counts are not added into a misleading single total or treated as proof of complete WCAG coverage. Receipt paths are relative to [batch-2b evidence](evidence/batch-2b/README.md).

`npm.cmd run lint` (the repository's `tsc --noEmit`) exited **0**. `npm.cmd run build` exited **0**, built in 19.97s. Public JS is 1,127.50kB (gzip 289.85kB), CSS 100.83kB (gzip 18.02kB); Admin JS/CSS remain 638.66/3.63kB with unchanged gzip sizes. The existing >500kB chunk warning remains; this batch makes no performance or production-readiness claim. The [tested build hashes](evidence/batch-2b/tested-build-hashes.json) identify the actual production artifacts.

`git diff --check` exited **0** (existing line-ending notices only). Final preservation command exited **0**. No application edit followed the tested build; the source/build hash comparison is included in the final validation summary.

Regression logged 15 generic resource console errors: resource instrumentation ties them to blocked Google Maps POST requests. Analytics and navigation-cancelled map embed requests were also blocked/cancelled. No application `pageerror` was recorded. These blocked requests do not demonstrate functioning maps/services. Browser shutdown sometimes disconnected without resolving its close promise; runners recorded bounded 8/15s teardown and stopped their own preview servers. Assertion completion and teardown are distinct in receipts.

Failures are retained separately. Initial concurrent/live-reload captures timed out. The first query focus failure and first intro timing failure required real corrections. Enlarged-text failures required wrapping stat cells. A fixed-duration motion observation saw only two timer callbacks; its replacement waits for three actual callbacks and records timestamps rather than assuming elapsed wall time proves rotation coverage. The first final rapid-reopen attempt exited 1 on a 6s fixture-navigation timeout before assertions; its rerun extends navigation readiness to 30s only, preserving all 40 cycle assertions.

Accordingly, the original `final-qa.ps1` aggregate exit was **1** because it retains that first fixture timeout; it is not relabelled as a passing command. The isolated corrected rapid suite exited **0**, and the [consolidated validation](evidence/batch-2b/validation-summary.json) exited **0** after checking every required result, the explicit rerun receipt, preservation and tested source/build hashes. No assertion was removed to obtain that result.

## 12. Preservation verification

Starting state: main at `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e`; 241 tracked files, 24 existing tracked modifications, 1,225 untracked files; nothing staged.

The current [preservation proof](evidence/batch-2b/preservation-results.json) verifies all 1,466 original paths remain: 1,438 byte-identical and 28 authorized application changes; no unexpected change or missing file. All original untracked files remain unchanged, including prior reports/evidence, PublicModal and routing additions. Original content arrays and translation entries remain equal; original CSS prefix is unchanged.

All 31 original `src/assets` files, 25 original public files, 136 Admin source files, product data, fonts, package/lock/configuration and hosting rules are preserved. Existing content-array values and translation entries remain equal; only UI-only Scroll/Loading labels were replaced/removed and new localized control labels added. No reset/clean, staging, commit, push, deployment, migration, dependency installation, API/database or delivery integration occurred. Automation locally blocks or fulfills analytics and non-read requests; no real business transaction is sent.

## 13. Known risks and unverified conditions

Owner/client review remains necessary for subjective spacing, article framing and company composition. Placeholder/mismatched photographs and unverified certificates/business claims remain source-controlled content, not verified by this polish. For example, the existing Gallery beach image is still captioned Factory Floor Overview; existing ISO/quantity claims and the featured editorial mismatch remain unvalidated. These are known risks for a supervised demonstration, not credible new evidence of manufacturing operations.

Chrome 156.0.8078.49 and Node v24.15.0 were used. Bundled alternative engine executables were absent; none was installed. Native screen-reader speech, physical Android/iOS touch/software keyboards, mobile browser chrome changes, native 200% zoom and independent engine coverage remain unverified. Root-font enlargement and emulated short/landscape viewports provide useful bounded evidence only. Browser/window teardown and synthetic visibility limitations are reported separately from assertions.

## 14. Deferred work

Batch 2C owns truthful demo-only Contact/Careers outcomes, unavailable download/specification/newsletter actions and chatbot availability wording. Batch 3A/3B and owner work own image identity/provenance, actual media/documents, certificate/contact/count/claim approval and translations. Backend/CMS/security/persistence/integrations, monorepo migration, deployment and production readiness remain after client approval and documented frontend freeze.

## 15. Full Git status

See [full path-by-path status](evidence/batch-2b/git-status-final.txt). Final state: **30 modified tracked files, 2,103 untracked files, no staged files**, same `main` HEAD `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e`. This includes the original 24 tracked modifications and all 1,225 original untracked files, plus this batch's new public helpers/report/evidence and recoverable baseline copies. Git totals are not this batch's application-change count: section 4 lists the exact 31-file application delta against the captured starting working tree.

## 16. Batch 2C recommendation

After reviewing this batch's completed visual/test receipts, authorize only the separately scoped honest demonstration states. Do not start integrations, imagery replacement or backend work automatically. Present the site as a frontend prototype and explain incomplete service-dependent actions during supervised client review.

**BATCH 2B IMPLEMENTATION COMPLETE — READY FOR CHATGPT REVIEW.**
