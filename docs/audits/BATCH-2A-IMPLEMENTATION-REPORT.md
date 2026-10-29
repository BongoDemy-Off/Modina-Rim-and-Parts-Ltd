# Batch 2A — public design-system implementation

27 October 2026, Asia/Dhaka. Local workspace: Modina-Rim-and-Parts-Ltd.

**Status: Batch 2A complete — ready for review.**

## 1. Executive summary

Applied the approved public design-system corrections across all 19 public page components and the shared Footer. Added contextual presentation roles to the existing CSS system, without introducing a component framework or dependency. Secondary heroes now share the 40–72px scale; product names wrap without truncation; catalogue copy remains compact; long-form pages have readable typography and deliberate reading widths. Buttons, fields, filters, metadata, cards and text colors share documented conventions.

Preserved Home's distinctive hero, brand-red primary actions, dark CTA bands, black/red artwork, gallery masonry, timelines, route/query contracts, accepted Batch 1A interactions and PublicModal lifecycle. No page sections were reordered. This is frontend work, not production-readiness approval.

The starting baseline was `main` at `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e`, with eight modified tracked files and 417 untracked files. The [658-file baseline](evidence/batch-2a/baseline.json) and recoverable source copies were recorded before editing.

## 2. Audit issue disposition

| Original issue | Batch 2A disposition |
|---|---|
| PUB-013 | Corrected readable public text/control colors, field boundaries, faded timeline labels and dark/light foreground contexts. Retained decorative contrast exceptions are explicitly assessed; this is not WCAG certification. |
| PUB-014 | Applied contextual body, compact-copy, metadata, card, editorial and legal typography. Product names are no longer line-clamped. Documented compact exceptions remain. |
| PUB-016 | Shared secondary/article title roles, container conventions, section spacing and reading widths applied across public pages. Detailed page composition remains Batch 2B. |
| PUB-031 | Enlarged Home selector hit areas, named testimonial selectors, exposed pressed state and moved the hero indicator row clear of the existing trust strip. Original product indicators remain unchanged. |
| PUB-039 | Reconciled through the approved exception policy: existing dark bands/artwork remain; their foreground roles are readable. No wholesale light-theme conversion. |
| PUB-030 | **Partial:** Home testimonial control names addressed. Unrelated image descriptions and footer/social destinations remain deferred. |
| PUB-032 | **Partial:** remaining News/Blog/Downloads/FAQ filter pressed states added; existing Product/Gallery/Careers states retained. FAQ expanded/controlled relationships remain Batch 2B. |
| PUB-015, PUB-037 | Accepted fixes preserved; Contact now reuses the public field presentation and both forms use stronger shared boundaries/focus presentation. |
| PUB-006–009, PUB-011, PUB-040 | Existing Batch 1A behavior preserved and included in regression verification. |
| PUB-010, PUB-012, PUB-017–029, PUB-033–036, PUB-038, PUB-041–043; PUB-001–005 | No blanket closure. Existing semantic/content/media/service/performance requirements remain assigned to the frontend-first roadmap. |

The original register, audits, roadmap, inventories and Batch 1A reports/evidence were not edited or deleted. In particular, PUB-004/005 are not resolved by visual polish.

## 3. Exact application files changed by this batch

These are changes against the captured working-tree baseline, not merely against HEAD:

| File | Purpose |
|---|---|
| `src/index.css` | Public-only roles, colors, spacing, buttons, fields, filters, reading widths, motion/hover treatment and safe text wrapping |
| `src/components/Footer.tsx` | Readable supporting copy and metadata; existing content/actions retained |
| `src/pages/Products.tsx` | Hero, full product names, compact descriptions, metadata, filter/action presentation |
| `src/pages/Contact.tsx` | Hero, typography, shared fields and readable contact presentation |
| `src/pages/Careers.tsx` | Hero, role cards, fields, filter/action presentation |
| `src/pages/Downloads.tsx` | Hero, cards, metadata, filters, button sizing and decorative-year semantics |
| `src/pages/Home.tsx` | Contextual supporting roles, body buttons, selector hit areas/names/state, indicator clearance, dark-art caption context |
| `src/pages/About.tsx` | Hero, body/card/section roles, readable timeline labels, decorative lettering semantics |
| `src/pages/Mission.tsx` | Hero, body/section/card roles, containers, spacing and dark-context presentation |
| `src/pages/Sustainability.tsx` | Hero and narrow-width exception, body/card roles, containers and spacing |
| `src/pages/Quality.tsx` | Hero, body/cards, compact process descriptions and readable process labels |
| `src/pages/Certificates.tsx` | Hero, body/cards, readable solid timeline years and shared presentation |
| `src/pages/Gallery.tsx` | Hero, filter presentation, 12px media corners and dark lightbox foreground context |
| `src/pages/News.tsx` | Hero, editorial cards/copy, filters, metadata and action presentation |
| `src/pages/NewsDetail.tsx` | Wrapping article title, body typography, breadcrumbs and reading width |
| `src/pages/Blog.tsx` | Hero, editorial cards/copy, filters, metadata and action presentation |
| `src/pages/BlogDetail.tsx` | Wrapping article title, body typography, breadcrumbs and reading width |
| `src/pages/FAQ.tsx` | Hero, filter states, metadata, reading width and answer typography |
| `src/pages/Privacy.tsx` | Hero, readable legal copy, contextual policy headings and reading width |
| `src/pages/Terms.tsx` | Same legal-page presentation conventions |
| `src/pages/NotFound.tsx` | Wrapping title/body, body buttons and decorative 404 semantics |

No new application component was necessary. Navbar, ProductImageCarousel, Layout and PublicModal retain their accepted pre-batch bytes; their existing modifications remain in the working tree.

## 4. Tokens and reusable presentation roles

All additions are scoped beneath `.public-site`. The original global stylesheet prefix, `@theme`, font registrations and Admin cascade remain unchanged; see [content-preservation.json](evidence/batch-2a/content-preservation.json).

| Role | Implementation |
|---|---|
| Muted/control colors | `--public-muted: #475569`; `--public-control-border: #6B7280`; existing brand dark red for small accent text; darker semantic green text |
| Secondary hero | `clamp(2.5rem, 6vw, 4.5rem)` with 1.15 leading; Bengali leading 1.4 |
| Article title | 32–56px fluid role with safe wrapping |
| Section/card titles | Section 32–48px; compact card 20–24px, selected from rendered content rather than a blanket 24–28px assignment |
| Long/compact copy | Body 18–20px, 1.65 leading; compact copy 16px, 1.6 leading; Bengali body/copy leading 1.8 |
| Metadata | 14px shared role; compact navigation/artwork exceptions retained |
| Spacing | Existing 64–120px standard and 40–80px compact section scales; premium container reused; reading caps 48rem/56rem |
| Cards | Existing 12px geometry and diffuse shadow tokens; flexible names/content/footer placement; no universal fixed card height |
| Body buttons | Minimum 56px, 8px radius, 16px label, height can grow with wrapping; direct action icons 20px |
| Fields | Shared 56px minimum, 8px radius, 16px text, readable border/placeholder and visible 2px focus |
| Filters/actions | Minimum 44px filter/inline action height, consistent selected state and dark-red accent treatment |
| Motion | Shared CSS transitions remain restrained; hover lifts suppressed for coarse pointers and reduced motion. Existing page animation timers are not rewritten. |

Added safe inherited overflow wrapping within the public boundary after enlarged-text checks exposed long contact strings. No content was hidden or clipped to obtain a passing width measurement.

## 5. Preserved and justified exceptions

- Home's original heading scale/composition, hero artwork, dark CTA bands and black/red category images remain.
- At 320px, the default 40px SUSTAINABILITY title left an orphan `TY`. Only that title receives `clamp(2.125rem, 11vw, 2.5rem)` below 390px: 35.2px at 320px, returning to 40px above approximately 364px. Existing glyph entrances remain.
- Product/card titles use 20–24px and product/download descriptions use compact 16px where the rendered cards need it. Full product names remain available without truncation.
- Header geometry, 6px Menu radius, compact telephone/navigation controls, circular controls, existing 32px product indicators and explicit square controls remain.
- Home progress targets are at least 24px wide × 44px high, accompanied by existing 48px previous/next controls; testimonials use 44px targets. The progress label remains compact. Indicator clearance changes only the control row position.
- Faint decorative numerals/lettering remain visually intact and are marked decorative where appropriate. Meaningful timeline years remain readable. Automated decorative contrast flags are retained in the assessment.
- No cropping policy, image ratio, factory/person identity, product record, certification claim or translation content was replaced.

## 6. Before/after visual evidence

[Batch evidence directory](evidence/batch-2a/) contains baseline captures, each implementation group, focused corrections and final regression captures. `before-results.json`, `group1-results.json`, `group2-results.json`, `group2-final-results.json`, `group3-results.json` and `footer-final-results.json` enumerate capture coverage and visibility observations.

| Review | Before | After / verification |
|---|---|---|
| Products mobile hero | [Before](evidence/batch-2a/before-products-390-en-hero.png) | [After](evidence/batch-2a/group1-products-390-en-hero.png) |
| Products desktop cards | [Before](evidence/batch-2a/before-products-1440-en-content.png) | [After](evidence/batch-2a/group1-products-1440-en-content.png) |
| Contact fields | [Before](evidence/batch-2a/before-contact-390-en-content.png) | [After](evidence/batch-2a/group1-contact-390-en-content.png) |
| Bengali About hero | [Before](evidence/batch-2a/before-about-390-bn-hero.png) | [After](evidence/batch-2a/group2-about-390-bn-hero.png) |
| Company body copy | [Before hero/context](evidence/batch-2a/before-about-390-en-hero.png) | [Settled body](evidence/batch-2a/group2-final-about-390-en-content.png) |
| Article reading width | [Before](evidence/batch-2a/before-blog-1-1440-en-content.png) | [After](evidence/batch-2a/group3-blog-1-1440-en-content.png) |
| Legal copy | [Before](evidence/batch-2a/before-terms-1440-en-hero.png) | [Settled body](evidence/batch-2a/group3-terms-1440-en-content.png) |
| Long mobile title | [Initial 40px defect](evidence/batch-2a/sustainability-320-initial.png) | [Corrected](evidence/batch-2a/sustainability-320-final-en.png) |
| Home selector clearance | Existing composition preserved | [Settled control proof](evidence/batch-2a/contracts-complete-home-controls-en.png) |
| Shared Footer | Existing structure preserved | [Mobile](evidence/batch-2a/footer-final-contact-390-en-content.png) |

Inspected rendered products/cards, form fields and drawer, Home, Bengali About, company copy, Quality/Certificates, Gallery, editorial pages, FAQ, legal/missing pages and Footer. Assessed hierarchy, wrapping, alignment, spacing, card/button dimensions, colors, focus and Bengali glyph leading. No production animation was globally disabled and no opacity was forced. Some early full-section attempts still contained unfinished entrances; these are retained and are not evidence of empty content or completed whole-page visual QA. Representative viewport captures, rather than every timed slide/pixel, are the visual evidence.

## 7. Mobile and desktop results

| Check | Actual outcome / receipt |
|---|---|
| Group 1 | 48 layout states, zero document-overflow failures; targeted interaction retry 9/9, exit 0 |
| Group 2 | 84 layout states plus 28 recapture states, zero document-overflow failures; Gallery checks 2/2 |
| Group 3 | 66 layout states, zero document-overflow failures |
| Shared Footer | Four final capture states, zero document-overflow failures |
| Public route matrix | **352/352**: 22 established URLs × 320/360/375/390/430/768/1024/1440 × EN/BN; zero page exceptions. [Results](evidence/batch-2a/sweep-results.json) |
| Long heading | 24 focused EN/BN states including 320/360/390/430 and breakpoint-adjacent widths; one-line SUSTAINABILITY title without document overflow. [Results](evidence/batch-2a/contracts-complete-results.json) |

The 352-state sweep verifies the final geometry. Subsequent dark-context markers change foreground colors/decoration semantics only; the final repeated interaction and settled-overlay checks cover those changes.

Intentional category/timeline scrollers remain. Fresh-session preloader behavior is retained, including its existing separate Batch 2B concerns. No physical Android/iOS claim is made.

## 8. English/Bengali and enlargement

The route matrix includes 176 states per language. Preserved the font registry, locale synchronization, regular Bengali faces, grapheme-aware About rendering and disabled synthetic Bengali bold. The 24 long-title checks passed in both locale states.

Native browser text-only 200% enlargement could not be verified in this headless environment: six browser zoom shortcuts changed neither DPR nor viewport. A supplemental **200% root-font-size approximation** initially widened the 390px mobile layout; safe wrapping corrected all eight sampled states (Products/Contact/About/Privacy, both languages) to 390px viewport/document width. This is not native zoom certification. Native-reader approval, actual translation completion and language-of-parts work remain outstanding.

## 9. Accessibility checks

- Complete regression covered keyboard disclosures, independent card/carousel controls, named dialogs, focus containment/background isolation/restoration, Escape/backdrop/route cleanup, labels, native validity, enquiry prefill and history.
- Ten main axe states passed the targeted name/label/dialog/state/nesting assertions. Their raw contrast counts include unfinished entrances and must not be represented as settled findings.
- Final settled-overlay verification: **10/10 targeted states passed; zero contrast nodes; 16 repeated unnamed-link nodes remain**. [Receipt](evidence/batch-2a/settled-a11y-results.json).
- The 44-state public contrast review recorded **16 decorative flags and zero unresolved meaningful text/control flags**. [Assessment](evidence/batch-2a/contrast-assessment.json) retains each node and the exception rationale. It is not a zero-violation or WCAG-conformance claim.
- Manual color checks include dark muted text on light surfaces, dark red on pale backgrounds, readable field borders, white on primary red and visible focus. Dark overlays/art captions use their separate foreground context.
- Genuine emulated-touch retry: **4/4**, exit 0, with recorded `pointerType: touch`; maximum actual readiness polling was 1,755ms after explicit font/entry readiness. [Results](evidence/batch-2a/touch-results.json).

Native screen-reader speech, physical touch comfort and an independent browser engine were not tested. Chrome was the working engine; Edge would not constitute a second independent engine.

## 10. Regression, build and retained failures

| Verification | Result |
|---|---|
| TypeScript | `npm.cmd run lint`: exit 0; this is `tsc --noEmit`, not ESLint. `typecheck-release.txt` |
| Production build | Exit 0; `build-release.txt` and `build-workspace-final.txt`; existing large-chunk warning remains |
| Git diff | Exit 0, with existing LF/CRLF notices only; `diff-check.txt` |
| Earlier complete Batch 1A sweep | 64/64, exit 0; `final-regression-results.json`, `final-owned.json` |
| Final repeated Batch 1A sweep | **64/64, complete sweep, exit 0**; `release-final-regression-results.json`, `release-final-owned.json` |
| Native lifecycle fixture | Both normal/reduced-motion groups passed, exit 0; `lifecycle-results.json`, `lifecycle-ownership.json` |
| Rapid interrupted reopen | 20 normal + 20 reduced-motion cycles passed, exit 0; `race-results.json`, `race-ownership.json` |
| Touch | Final 4/4, exit 0; retained initial 1/4 attempt separately |
| Content/contract preservation | All 20 changed TSX components retain visible text, non-presentation literals, handlers and destinations; original global CSS prefix unchanged |

| Output | Before kB / gzip kB | Final kB / gzip kB |
|---|---:|---:|
| Public entry JS | 1115.62 / 286.32 | 1119.14 / 286.49 |
| Public CSS | 89.54 / 15.76 | 94.09 / 16.60 |
| Admin JS | 638.66 / 154.17 | 638.66 / 154.17 |
| Admin CSS | 3.63 / 1.35 | 3.63 / 1.35 |

Combined public JS/CSS gzip estimate increased about **1.01kB (0.33%)**. Investigation attributes this to presentation class strings and scoped CSS; no dependency, font or image was added. Admin CSS output is unchanged; its JS filename changes with shared entry references. No material bundle-loading regression was established. This is not a measured mobile LCP/INP or Lighthouse improvement.

Retained unsuccessful attempts include screenshot timeouts during concurrent runs, animation-readiness timeouts, and the first touch run. A real remaining timeline-color reference was caught by TypeScript/runtime checking after an opacity constant was removed; corrected to a solid year color and rebuilt. An initial contrast pass stopped on that error; it is not counted as completed. A later settled scan exposed the dark Gallery caption mismatch, which was corrected through its public dark context.

The uncached route sweep was deliberately stopped and retained as partial evidence; the complete 352-state sweep used byte-preserving webfont response caching in the test harness. Readiness retries wait for fonts and actual computed styles rather than forcing production opacity/animations. Some Windows browser-close promises remained pending after disconnection; bounded teardown and owned-process cleanup are recorded separately from assertion results. Do not relabel partial/failed attempts as green runs.

All browser QA blocked or locally fulfilled telemetry and non-read requests. Console/resource receipts distinguish intentionally blocked/cancelled third-party activity from application exceptions. No real form, application, subscription, telephone call, email, AI message or business transaction was sent.

## 11. Admin/CMS and source preservation

[Preservation results](evidence/batch-2a/preservation-results.json) verify all 658 original paths remain: **637 byte-identical and 21 intentionally changed application files**. All **417 original untracked files** remain byte-identical, including PublicModal and accepted SPA routing files. All **136 Admin source files**, original reports/evidence, product data, source/public assets, manifests and lockfile remain unchanged.

The strict computed comparison of 15 representative Admin buttons is part of the complete regression. Additional proof compares the original global stylesheet prefix and all changed TSX visible text, data literals, event handlers and link/image destinations. [Content proof](evidence/batch-2a/content-preservation.json).

No Admin/CMS/backend implementation, migration, integration, dependency installation, reset, staging, commit, push, deployment or hosting change occurred. All servers used loopback addresses and were owned test processes.

## 12. Unresolved findings and visual risks

- Placeholder/mismatched photographs, certificate/entity/document approval, contact-number conflicts, stock/commercial/manufacturing claims and editorial inconsistencies remain unchanged. Styling does not validate those facts.
- Contact/Careers fake-success handlers, unavailable downloads/newsletter and unconditional chat availability remain Batch 2C requirements. No API or delivery capability was added.
- Incomplete translations, image/social naming, FAQ expansion semantics, exact-item global search, heading/skip-link improvements and individual mobile task access remain in their assigned batches.
- Timed page entrances, autoplay/pause behavior, preloader clipping/delay, eager bundle/media cost and production metadata/status handling remain open. Native-device/browser/reader and native 200% zoom verification remain required later.
- Larger readable copy naturally increases some page/card heights. Page-specific compression/reordering was intentionally not performed. Some early transparent captures cannot support full settled visual comparisons.
- The frontend is not approved for production or for a hosted preview by this work. Deployment/direct-route behavior requires separate authorization and real-host verification.

## 13. Full Git status

Branch and HEAD are unchanged; the index has no staged changes. The complete path-by-path status, including every pre-existing and new untracked path, is saved in [git-status-final.txt](evidence/batch-2a/git-status-final.txt).

<!-- git-summary -->Final status: **24 unstaged tracked modifications; 1225 untracked files; no staged changes**. This includes the three preserved pre-existing application modifications outside the 21-file Batch 2A delta.<!-- /git-summary -->

New task artifacts are restricted to this report and `docs/audits/evidence/batch-2a/`. Original audit and Batch 1A documents were preserved. The final workspace build also passed. Tailwind scans audit text and added an unused six-byte `.grow` alias after report generation, changing chunk names. Normalized JS/HTML and all existing CSS rules match the tested build; exact byte identity is not claimed. See `build-equivalence.json` and `validation-summary.json`.

## 14. Batch 2B recommendation

Review this Batch 2A result, then separately authorize mobile-first page polishing: prioritize Products/Contact task access, then Downloads/Careers and navigation; review company/media/editorial/legal compositions with their readable type in place. Address FAQ semantics, skip/heading structure, exact-item search and motion/preloader controls without discarding this system or the accepted Batch 1A foundation.

Collect genuine product photography, translations, approved contact/certificate/document facts and claim evidence alongside that work. Honest demo behavior remains Batch 2C; image replacement remains Batch 3A/3B; backend/CMS/integrations/monorepo/security/production readiness remain post-approval.

**Batch 2B has not started.**

BATCH 2A IMPLEMENTATION COMPLETE — READY FOR CHATGPT REVIEW.
