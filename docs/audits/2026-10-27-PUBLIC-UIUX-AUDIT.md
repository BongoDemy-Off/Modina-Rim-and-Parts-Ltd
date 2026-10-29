# Modina Rim & Parts Ltd. — comprehensive public UI/UX audit

**Audit date:** 27 October 2026, Asia/Dhaka. **Scope:** public frontend only. **Authority:** local workspace, commit `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e`, branch `main`. **Status:** audit and recommendations only; no UI implementation, asset replacement, dependency change, commit, push, PR or deployment.

## A. Executive summary

The approved red-and-white direction is worth preserving. The shared layout, responsive grids, product filtering and narrow-phone two-row header provide a useful foundation. All 22 sampled public URLs rendered at the eight requested widths without horizontal **document** overflow. The build and existing TypeScript check passed.

The largest obstacles are trust and task completion, followed by accessibility and loading cost. Eighteen of the 21 products fall back to unrelated random photographs. The first product's name says bearing/racer while its photograph depicts a vehicle frame. Download buttons promise documents but do nothing, and form handlers can display success without delivering an enquiry or job application. Desktop dropdowns and clickable item cards cannot be opened by keyboard. Blocking overlays do not contain focus. Bengali mode changes the document language but leaves most page content in English.

The certificate scan inspected names **Modina Metal Industries** and shows a recertification date before this audit date, while the site presents current certification under **Modina Rim & Parts Ltd.** This is a discrepancy requiring current client/issuer evidence, **not a conclusion that the company lacks valid certification**. Telephone numbers also disagree across the interface. Testimonials, manufacturing specifications and other claims require client approval rather than automatic rewriting.

There is no evidence requiring a wholesale redesign or replacement of the approved mobile navbar. Start with a small public interaction/accessibility batch while the owner gathers authentic photos, contact details, documents and claim approvals. Then improve media, typography, localization and measured loading. Full-stack/monorepo migration is a later, separately authorized project and should not delay these corrections.

The [issue register](ISSUE-REGISTER.md) contains **43 individually identified findings/review items**. Its priorities are high/medium/low; no P0 was established. Some entries are static discrepancies, client-verification requirements or design recommendations, explicitly labelled as such. They must not all be represented as reproduced runtime defects.

## B. Audit coverage and evidence

### What was inspected and executed

| Evidence area | Actual coverage | Practical limitation |
|---|---|---|
| Source | `DESIGN.md` in full; README, package manifest, Vite/TypeScript config, router, theme/global CSS, public layout, all 19 public route patterns, all public pages, shared public components, public constants, locale setup/translations, HTML/robots/sitemap, referenced assets; relevant existing architecture report | Admin/CMS/auth/backend/database implementation not audited; package names do not establish a running backend |
| English rendering | **176 route/viewport states:** 22 URLs × 320,360,375,390,430,768,1024,1440 CSS px | Same touch/mobile-emulation context at desktop width; this is browser emulation, not physical-device proof |
| Screenshots | Each sampled URL captured full-page at390 and1440 English; extra320 Home/Products/Contact/Gallery/Certificates; focused menu/search/drawer/lightbox/form/error states | Reveal/lazy content was scrolled into view; assets may remain pending. Screenshot CSS animation completion was requested, but many below-fold Motion sections remained transparent in captured full-page frames. Moving slides are representative samples, not all timed states |
| Bengali |22 initial states at390 px, screenshots, html lang/dir and font readiness checked | Does not establish native-reader approval or complete translated-state accessibility |
| Intermediate/landscape |40 layout states across Home/Products/Contact/Gallery:639,640,767,769,1023,1279,1280,1920 and667×375/844×390 | Original quick sweep sampled header transitions, so intermediate height readings are not settled layout defects |
| Interactions |Product search, empty reset, categories, pagination attempts, carousel, drawer and Escape, enquiry prefill; mobile menu/search; Gallery filter/lightbox/scroll/Escape; Downloads click; FAQ toggle; Careers filter/drawer/labels; Contact native validity; chat open in landscape; pointer desktop dropdown |No real form, newsletter, call, email or AI message submitted. Some focused retries timed out and remain explicitly logged |
| Keyboard |Desktop trigger semantics, item-card semantics, Product focus escape into background, menu opener focus, Escape comparisons |Native screen readers, exhaustive tab order for every route/locale and physical keyboard/assistive devices not tested |
| Automation |axe-core 4.10.3 WCAG A/AA tagged scans for all22 English390 px initial states; DOM geometry, controls, images, metadata |Closed-state automated scans do not cover all open overlays; no conformance claim |
| Performance |Existing production build/typecheck, asset sizes/hashes, synthetic CDP-throttled cold Home/Products/Contact |No Lighthouse score, field INP or CrUX/RUM data; single samples, local preview compression differs from production |
| References |GitHub reference opened read-only; Vercel homepage browser GET200; Netlify browser navigation failed with ERR_CONNECTION_CLOSED |No revision equivalence assumed. Web reader could not open either deployment; Vercel browser capture still included preloader. Full deployed-route testing not done |

The browser used **Chrome/Chromium 156.0.8078.48** through bundled **Playwright 1.62.1**. Bundled Chromium/Firefox/WebKit executables were absent. Installed Chrome provided the working engine. Edge is installed but is also Chromium; it would not satisfy an independent second-engine check. No browser package was installed.

The public preloader was bypassed with its existing session key for steady-state screenshots. A separate fresh 320 px context captured it and confirmed removal after a subsequent four-second wait. English locale was fixed explicitly in the main sweep; Bengali in the locale sweep. Browser guards blocked non-GET/HEAD/OPTIONS requests. No credentials or environment values were printed.

**Visual-coverage qualification:** full-page captures preserve page geometry but do not prove complete visible below-fold content: many Motion entrances remained at opacity 0 in the capture environment. A slower-scroll recapture attempted to improve this and still recorded hidden sections on Home; it was stopped after two viewport states. Initial Home captures are preserved under evidence/initial-motion-captures/. Do not interpret blank screenshot bands as actual empty sections or claim every below-fold section received settled visual QA. Initial views, selected interaction screens, DOM measurements and source inspection remain the evidence basis; full settled-motion visual coverage is a follow-up gate.

See [route matrix](PUBLIC-ROUTE-MATRIX.md), [responsive matrix](RESPONSIVE-QA-MATRIX.md), [evidence index](evidence/README.md), [command ledger](COMMAND-LOG.md), and raw JSON/scripts. A script that produced data but needed process cleanup is not labelled an entirely successful end-to-end run. Initial locator mistakes, unavailable-browser attempts and timeouts are retained.

## C. Baseline technical condition

| Item | Observed local condition |
|---|---|
| Repository |Root single React/Vite application; public and lazily loaded Admin route trees share the app package. No npm workspaces/apps/packages layout |
| Git |`main`; `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e` — Complete and freeze admin frontend prototype |
| Pre-existing work |One untracked `TASK_5B_PRODUCTION_ARCHITECTURE_AUDIT.md`; preserved. Its historical “clean” statement is not the current audit's baseline |
| Runtime |Node 24.15.0; npm 11.12.1 |
| Installed framework |React/React DOM 19.2.4; Vite 6.4.1; React Router DOM 7.13.1; TypeScript 5.8.3; Tailwind 4.2.1; Motion 12.34.3; Lucide React 0.546.0; i18next 26.0.8 |
| Package ranges |React^19.0.0; Vite^6.2.0; router^7.13.1; Tailwind^4.1.14; Motion^12.23.24. Installed versions above are actual resolved packages, not upgrade advice |
| Styling |Tailwind v4 `@theme` in src/index.css; red#E52525/dark#B31515, light backgrounds, Manrope, shared type/section/card/button/shadow utilities; per-page overrides remain |
| Localization |i18next localStorage/navigator detection; EN/BN resources; useLocaleSync updates html lang/dir and font tokens; Bengali Unicode regular/italic faces and synthesis control |
| Content |Hardcoded `src/lib/data.ts` plus per-page arrays. Public content does not fetch a live CMS/API. Product image fallback is generated in ProductImageCarousel. Public editing/publishing readiness is not inferred from the excluded Admin prototype |
| Existing scripts |dev: Vite port3000; build: vite build; preview: vite preview; lint: tsc --noEmit; clean: rm -rf dist. **Clean was not run**. No existing test/Lighthouse/axe scripts |
| Typecheck |`npm.cmd run lint` exited0. This is TypeScript checking, not ESLint |
| Build |`npm.cmd run build` exited0,2458 modules,37.26s, chunk-size warning. No package/lock/config changes |

Tracked files and the pre-existing untracked report were SHA-256 snapshotted before audit writes. Final integrity verification is recorded in [preservation-verification.json](evidence/preservation-verification.json) and [git-final.txt](evidence/git-final.txt). Generated `dist/` is allowed build output; new scripts/reports/images are confined to `docs/audits/`. No application source implementation was performed.

## D. Page-by-page audit

All pages below received source review and browser rendering; this does not imply all interactions or content records were exhaustively exercised. The [route matrix](PUBLIC-ROUTE-MATRIX.md) supplies per-route sections, controls, states, screenshots, accessibility results, asset status and remaining checks.

| Page / route | What works / should remain | Important findings and remaining state |
|---|---|---|
|Home `/`|Clear catalogue/contact links; brand red/light canvas; responsive text/image stacking; usable44/48px major actions|Hero rotates without pause and ignores reduced-motion; catalogue button inert; stock testimonials/claims need approval; oversized JS, fixed preloader, tiny unnamed testimonial selectors. Supporting local images/video need provenance |
|About `/about`|Translated story and grapheme-aware Bengali hero; stacked content; real local media paths|Four informative images lack alt; two named leaders use random scenes; timeline contrast; video controls; untranslated fragments; client confirms leadership/statistics |
|Mission `/mission`|Clear mission/values sections and responsive stacking|English-only body in Bengali mode; random leadership photo; small body/long spacing; factual quote/capability approval |
|Sustainability `/sustainability`|Consistent section structure and responsive pillar cards|Random environment/people/community/CSR imagery, one missing alt, unverified impact figures and certification wording; translated content absent |
|Products `/products`|Search/category/empty reset, query category support, separate image controls, responsive1/2/3-column grid, body scroll lock and Escape close|18 random-image products; SKU1 mismatch; keyboard card/modal failures; Details hidden on touch; wrong enquiry subject; generic spec download;3 actual categories versus4 stated. Review each product in CSV |
|Quality `/quality`|Structured six-step process and local certificate paths; intentional timeline inner scroller|Very small/faded timeline text, keyboard-focusable scrolling gap reported by axe; certificate truth and readability; document media about5.2MB; no actual current certification verification |
|Certificates `/certificates`|Three real local scan files, containing rather than cropping document pages|Entity/date discrepancy;220px dimmed thumbnails cannot be enlarged; timeline contrast; large scan bytes. No determination of current legal validity |
|Downloads `/downloads`|Search empty state, filter/list layout, document metadata|11 metadata records have no document URL; clicked Download inert; featured Download Now inert; Certificates filter has no records; commercial/internal-file publication needs approval |
|News `/news`|Readable listing structure; category/search empty state works|Featured April catalogue story opens March ISO story;8 records versus12+ claim; random photos; list/detail item7 person conflict; cards use12px excerpts |
|News `/news/1`|Valid visible article and body; local route rendering works|Empty browser title, duplicate description, random hero photo. Nonnumeric invalid and9999 states render recovery links but no H1/route metadata. Item7 was inspected statically only |
|Blog `/blog`|Featured and regular article structure, categories/search empty state|Random photo content; missing featured alt; small card copy; English body in Bengali mode |
|Blog `/blog/1`, `/blog/featured`|Both numeric and literal featured route patterns work visibly|Both sampled details render empty document title and duplicate description. Invalid/9999 recovery states lack route metadata/H1. Other full post bodies were not each rendered |
|Contact `/contact`|Product message prefill;16px inputs; native required/email validation; map iframe has a title|Subject becomes General Inquiry; all six label relationships missing; select unnamed; static success handler; conflicting contact numbers; two explicit office placeholders; phone/email plain text. No form sent or map-location accuracy verified |
|Gallery `/gallery`|Responsive masonry, horizontal filter scroller; Machinery filter returns2 cards|15 random photos under factual factory captions; keyboard card trigger absent; lightbox lacks focus/background/Escape handling and next/previous workflow; beach shown as Factory Floor |
|Careers `/careers`|Four vacancy cards; Quality filter returns1; drawer and16px form fields render|Card keyboard trigger missing; unlabeled name/email/phone; Escape/focus handling absent; underline field style differs; static Application Received message. No application sent or vacancy facts verified |
|FAQ `/faq`|18 questions, search empty state and visual open/close work|No aria-expanded/controls, selected category state inconsistent, tiny/low-contrast labels. Answers include commercial claims needing client approval |
|Privacy `/privacy`|Numbered content, limited reading container and recovery navigation|15px body versus baseline18–20; oversized introductory hero/scroll cue; English only; generic initial metadata. Legal adequacy and actual data practices not evaluated |
|Terms `/terms`|Same long-form structure/reading container|Same readability/localization/design gaps. Commercial/legal wording requires owner/legal review, not speculative audit edits |
|Wildcard `*`|Visible missing-page H1 with home/catalog recovery|Generic indexable metadata; local SPA fallback200; deployed HTTP404 behaviour not checked |

Shared Navbar, Footer, global Search, Logo, Preloader, Chatbot and BackToTop were inspected. Footer structure and global2px focus-visible rule are strengths. Social links point to `#`, newsletter Join has no behaviour, and contact values are plain text. Global search finds a product but lands at its whole category. Chat was opened without sending; its unconditional “Online” label is not evidence of an available service. Vite's browser AI-key substitution is an existing public integration boundary risk, not an invitation to audit or implement backend security. No secret value was inspected.

## E. Design consistency analysis

The [comparison matrix](DESIGN-SYSTEM-GAP-ANALYSIS.md) covers heroes/subtitles, breadcrumbs, widths, spacing, cards/products, category controls, button/link variants, icons, radius, shadow, fields, header offsets and images.

The most concrete styling defect is `src/index.css:128`: unlayered `button { border-radius: inherit; }` overrides Tailwind's layered rounded utilities. Computed filter/Menu/carousel/chat buttons have0px radius. This explains square buttons despite rounded class names; it is not an aesthetic opinion. Shared `.btn-primary/.btn-secondary` rules later in CSS still provide8px radii.

Other measurable gaps include12–16px card/body roles versus the18–20px body baseline;144px secondary-page desktop heroes versus72px design maximum; mixed container/padding conventions;10–12px metadata; duplicate card/form patterns; and slow entrance animations beyond200–350ms. Dark CTA bands and black/red category art conflict with DESIGN but already belong to the approved UI. The owner should explicitly approve exceptions before broad visual changes.

Recommend minimal public primitives using existing tokens: containers/reading width, a few hero variants, section heading, buttons/links, cards/media frames, filters, fields and one accessible overlay. Avoid a new framework, package, font substitution or indiscriminate red hover treatment.

## F. Mobile-first responsive assessment

The [responsive matrix](RESPONSIVE-QA-MATRIX.md) records each of the176 main states. Default document widths matched viewport widths at320,360,375,390,430,768,1024,1440. All22 Bengali390 px samples also matched. Intentional category/stat/timeline scrollers are preserved; their off-screen children do not establish a document-overflow failure.

The approved two-row navbar keeps the full tap-to-call number, search and Menu at narrow widths. Keep it. Main mobile concerns are task delay from secondary-page heroes, invisible Details affordance, modal focus/background behaviour, tiny homepage progress hit areas, long untranslated content and broken-photo resilience. First Product filter is roughly y689 and first card y860 at390 px; Contact form begins roughly y974. These are reviewable UX measurements, not proof that all whitespace is wrong.

A computed-font/line-height doubling approximation at390 px produced417px scroll width. This raises a text-enlargement risk, but native200% text zoom was not executed and a WCAG failure is not asserted from that approximation. Standard320 px reflow measurements succeeded. Real software keyboards, changing mobile browser bars, physical touch comfort and iOS/Android safe-area behaviour remain unverified. [W3C reflow guidance](https://www.w3.org/WAI/WCAG 22/Understanding/reflow.html) benchmarks320CSSpx without loss of information/functionality; document width alone is not sufficient proof.

## G. Accessibility assessment

**Target:** WCAG 2.2AA. **No conformance claim.** axe4.10.3 initial-state scans reported361 violation nodes over22 pages, including repeated shared footer nodes. They are not361 independent bugs. All22 scans report contrast and unnamed footer links. Representative confirmed issues:

| Issue | Actual evidence / criterion |
|---|---|
|Keyboard dropdown/card triggers|DIVs with no role/tabindex/keyboard activation;2.1.1,4.1.2 (PUB-006/007)|
|Overlay focus|Product Shift+Tab reaches background; mobile menu keeps background opener focus; no dialog role/name;2.4.3/4.1.2 (PUB-008)|
|Labels|Contact labels.length0; select-name; Careers unlabeled fields;1.3.1/3.3.2/4.1.2 (PUB-010)|
|Contrast|Product SKU#94a3b8/white2.56:1 at12px; fades elsewhere;1.4.3 (PUB-013)|
|Title|Valid News/Blog details have empty document.title;2.4.2 (PUB-018)|
|Language|html langbn with large English passages lacking language-of-parts distinction;3.1.2 (PUB-012)|
|Auto-updating hero|No pause and still changes with reduced-motion;2.2.2 (PUB-029)|
|Names/alt|Missing About/editorial alts; unnamed testimonial buttons/social links;1.1.1/2.4.4/4.1.2 (PUB-030)|
|Expanded state|FAQ changes visually without aria-expanded;4.1.2 (PUB-032)|

Homepage dots have3px/6px high hit areas and insufficient spacing between adjacent small targets. Product carousel dots already have32×32px hit areas. [W3C target-size guidance](https://www.w3.org/WAI/WCAG 22/Understanding/target-size-minimum.html) uses24×24px with explicit exceptions;44px is useful mobile guidance, not the universal AA threshold. Equivalent-control exceptions should be checked per homepage selector before assigning a criterion failure. [W3C pause guidance](https://www.w3.org/WAI/WCAG 22/Understanding/pause-stop-hide.html) supports user control of auto-updating information.

Keep the existing main landmark, logo alt, global visible focus rule,16px mobile form text, Products aria-pressed filters and Escape close. Add native-screen-reader and full keyboard testing after fixes, including open overlays, result announcements, focus restoration and focus not obscured by sticky elements. No flashing or screen-reader speech test was performed.

## H. Performance assessment

### Build and media evidence

| Asset / bundle | Observed size | Implication |
|---|---:|---|
|Public entry JS|1,109.11kB /283.91kB gzip estimate|All public pages eagerly imported; optional AI SDK is in public import graph. Potential route/feature splitting opportunity |
|Public CSS|88.02kB /15.46kB gzip estimate|Review used public styles alongside shared build boundaries; no package/config changes now |
|Admin lazy output|638.66kB JS|Build emits it, but this is not a claim it loads on public pages; Admin implementation excluded |
|Visible logo|47.98kB|Separate from oversized favicon source |
|Favicon source|7.94MB,12500×12500|Generate a small approved derivative later |
|Social hero.jpg|8.61MB,6272×2688|Heavy share image, not the rotating Home hero |
|Rotating hero JPEGs|About0.52–0.75MB each|No responsive source variants; optimize without degrading approved appearance |
|Product media|About1.46–2.04MB per mapped view|Large relative to card slot; no shared carousel lazy-loading attribute or responsive variants |
|Certificate media|About1.71–1.78MB each|About5.2MB for three originals; previews need derivatives and legible full-document access |
|Facility video|1.166MB|Autoplay/loop source without explicit preload/defer policy; no playing-state assumption from a paused below-fold sample |
|Bengali fonts|140.72kB regular /80.61kB italic|Actual source weights correctly declared; inspect glyph font fallback and optimize only after license/readability approval |

The main Home hero image and valid article hero images are **not** lazy-loaded. Featured News/Blog blocks use lazy images; these begin below the large mobile hero but may be near the desktop fold. Gallery, About and certificates commonly use lazy loading. Product carousel images omit lazy loading, dimensions and srcset; their CSS aspect frame reserves geometry but does not reduce transfer. Manrope/JetBrains CSS is imported from Google; analytics includes an obvious `G-XXXXXXXXXX` placeholder. Third-party access is a resilience risk; no claim is made that all remote requests fail.

### Synthetic cold observations

Method: one sample per route, local production preview, fresh public session/preloader,390×844 emulated mobile, cache disabled,4×CPU throttle,150ms network latency,200,000bytes/s download (1.6Mbps),93,750bytes/s upload (750Kbps). Observer collection lasted9s after DOMContentLoaded. Local preview transferred uncompressed JS; deployed compression/CDN conditions differ. Tests shared the host with other work and are diagnostic, not a reproducible benchmark series.

| Route | Last observed LCP entry | Raw no-input layout-shift sum | Interpretation |
|---|---:|---:|---|
|Home|12.396s|0.0000103|Slow synthetic entry path; LCP candidate is text during timed loading/hero sequence |
|Products|9.560s|0.003190|Initial JS transfer dominates the recorded slow link |
|Contact|9.140s|0.001020|Same large eager entry path |

These are **lab PerformanceObserver observations**, not Lighthouse scores or field Core Web Vitals. The raw layout-shift sum is not the official maximum-session-window CLS aggregation and is supplied only as a diagnostic. The finite capture can miss late content, unfinished image requests and post-interaction shifts. Do not claim “CLS passed” from these numbers.

Google's good field thresholds are LCP≤2.5s,INP≤200ms,CLS≤0.1 at the75th percentile. [Google Web Vitals](https://web.dev/articles/vitals). **Field INP/LCP/CLS, Lighthouse mobile scores and actual Bangladesh carrier performance are unavailable.** No INP number is invented. Existing tests do justify prioritizing JS/media reductions and shorter loading gates, followed by controlled repeat runs and actual deployment measurement.

## I. Product image audit

The local source has exactly21 products. Only IDs1–3 define arrays, with three images each; all nine local paths exist. IDs4–21 produce three Picsum URLs each. Card fallback is600×400 cropped into a4:3 frame; drawer fallback is800×600. Explicit images are approximately4:3, and the engineering JPEGs are2400×1792. The carousel always uses object-cover, so annotated material needs a deliberate contain/crop policy.

[PRODUCT-IMAGE-INVENTORY.csv](PRODUCT-IMAGE-INVENTORY.csv) records **each** ID, derived display SKU, name/category, all URLs, carousel count, file/placeholder status, visual assessment, editing/alt/crop notes, replacement proposal, approval and source line. [Product contact sheet](evidence/product-contact-sheet.png) shows the nine local images.

SKU1 is a confirmed frame-versus-bearing/racer mismatch. IDs2/3 visually match motorcycle stand families, but authentic identity and engineering/assembly claims still require client sign-off. For IDs4–21 obtain exact photos. Existing CNG/washer/rim art is only a candidate family illustration; it must not be relabelled as an exact variant. Standardize genuine photos with background cleanup, lighting/canvas consistency and optimized exports later, while preserving engineering features and retaining masters.

## J. Placeholder and credibility-content inventory

The [asset/claim inventory](PLACEHOLDER-ASSET-INVENTORY.md) covers local files and all public media groups, Gallery's15 exact URLs,54 generated product fallback slots, News/Blog sizes/seeds, portraits, hero/category art, video, certificates, logos, social images, fonts and duplicates. [asset-metadata.json](evidence/asset-metadata.json) holds sizes/dimensions/hashes; [route-results.json](evidence/route-results.json) records rendered URLs, alt, load state, fit and frame geometry.

Keep three classifications separate:

1. **Confirmed placeholder or association defect:** Picsum product/factory/leader scenes; SKU1 wrong product association; inert download promises; literal placeholder offices.
2. **Confirmed inconsistency requiring an authoritative decision:** certificate entity/dates versus site wording, two phone values, News7 person names, count mismatches, featured-story destination.
3. **Unverified, not established false:** ISO validity, materials/tolerance, MOQ/lead time, stock availability, customer testimonials, worker/factory identity, capacity, environmental/CSR/export claims, history and contact details.

The ISO9001 original was visually read: entity Modina Metal Industries; initial/certificate date10April2023; surveillance/expiry field09April2024; recertification due09April2026. Current status cannot be settled by an old image. Obtain renewed records and entity relationship before changing claims or enlarging these documents prominently.

Gemini-generated imagery could later support clearly labelled generic editorial/process illustrations. It must not fabricate exact-product geometry, actual Modina facilities/workers/customers, certificates or logos. No image-generation/replacement work occurred.

## K. Monorepo readiness assessment

The repository is currently a **single application**, not an organized full-stack workspace. Public content uses hardcoded data and local files, and a lazy Admin sibling belongs to the same frontend build. No conclusion about the excluded Admin's completeness/security follows from this.

The pre-existing7October architecture proposal explicitly kept root frontend paths and added an independently managed backend. That was a proposal, not implementation approval. The present request now asks for an eventual properly organized monorepo: record this difference as an architecture decision rather than silently treating both layouts as agreed.

Minimal possible future target, subject to a separate approved migration:

```text
package.json              workspace scripts only
apps/
  web/                    existing Vite public + approved Admin frontend
  api/                    separately authorized API implementation
packages/
  shared/                 browser-safe DTO/schema contracts, only when used
  config/                 shared tooling configuration, only when useful
  ui/                     optional; create only for a real second consumer
docs/                     decisions, contracts, audits, runbooks
```

Use npm workspaces initially if the team prefers the existing tooling. pnpm workspaces is a reasonable separately reviewed option; Nx/Turborepo are optional later when measured task/caching needs justify them. Do not introduce all packages solely to match a fashionable directory template. No new framework or separate Admin application is required by this audit.

Proposed migration sequence:

1. Finish/approve immediate public fixes at existing paths; retain screenshots, route/query contracts and a reproducible build.
2. Approve architecture, workspace manager and API/public-content contracts. Preserve literal `/blog/featured`, all public routes and category query links.
3. In an isolated later change, move the frontend as a unit, preserving public asset-root URLs, aliases, locale fonts, imports and build output. Update workspace/deployment root settings only in that authorized change.
4. Add the separately approved API package; share only safe contracts, never database clients/secrets. Keep dependency/build ownership explicit.
5. Verify equivalent public screenshots, deep-link handling, sitemap/canonical strategy, build scripts and independent deployment from the workspace. Only then consider extracting shared UI/config.

Risks: relative media/import paths, root-vs-app environment loading, Vite aliases, output directory changes, public rewrite/deep-link behaviour, dependency hoisting, native dependencies and locked visual behaviour. Vercel/Netlify would need reviewed app-root/build/publish settings; future API hosting is separate. No configuration, backend/CMS application or repository restructuring was created here.

## L. Prioritized implementation roadmap

The [roadmap](IMPLEMENTATION-ROADMAP.md) proposes six small stages plus owner preparation:

- **Owner preparation:** approve product identity/media, current certificates/entity, contact details, public documents, claims/people and production domain.
- **First engineering batch:** keyboard dropdowns/cards; named focus-managed overlays; form labels; enquiry subject; radius cascade; control names/expanded states; visible touch Details. Approximately3–5engineering days after explicit authorization, excluding content/integration waiting.
- **Then:** honest form/download availability; approved product/credibility media; typography/contrast/localization/mobile hierarchy; public metadata/loading/user-controlled motion.
- **Later:** a separately approved full-stack workspace migration, without delaying immediate frontend fixes.

No proposed work has started. For backend-dependent features, an honest unavailable state and verified alternative channel are separate from implementing real delivery.

## M. Acceptance criteria and regression checks

Each issue in [ISSUE-REGISTER.md](ISSUE-REGISTER.md) has a specific acceptance criterion, source, reproduction, risk and effort. Overall gates after implementation:

1. Preserve hashes/unrelated work; existing TypeScript and build commands exit0; changes stay in the newly approved scope.
2. All19 public route patterns, valid detail identifiers, unknown numeric/nonnumeric content and wildcard render correctly at all eight widths; no unintended document overflow or lost functionality.
3. Keep the two-row narrow header and full approved phone number; menus/search/filter/sticky states work at content-driven intermediate widths and with long Bengali labels.
4. Products show the correct approved item/media,9/9/3pages, accurate categories, working search/empty reset, independent carousel actions, keyboard details, safe modal focus and correct enquiry context.
5. Enabled download actions retrieve approved correct files. No contact/career UI promises delivery before confirmation; unavailable/pending/error/success states are truthful.
6. Keyboard and screen-reader checks cover open overlays, names/state, focus entry/trap/return, Escape, form errors and result announcements. axe is rerun but is not the sole accessibility gate.
7. Contrast and targets satisfy applicable WCAG criteria/exceptions; native200% text zoom and320 pxreflow preserve access; reduced-motion/pause works.
8. Native Bengali reader signs off translation/font/line-height; English parts have correct language where untranslated; actual language toggle persists across reload.
9. One correct nonempty title/description/canonical per valid URL; featured destination matches content; missing pages have approved metadata/status policy; sitemap/share images use approved origin.
10. Repeat production-build mobile performance measurements with fixed environment and completed assets; verify deployment compression/media variants; distinguish lab metrics from real75th-percentile field metrics.
11. Use a second independent browser engine and physical Android/iOS keyboard/touch checks before release. Do not send real notifications during UI regression.

## N. Blockers and client decisions needed

Required business inputs are grouped for review:

| Decision / input | Why needed |
|---|---|
|Exact21-product identities/photos and permitted family reuse|SKU1 conflict and18 random-image products; no speculative product substitution |
|Current certificate evidence and legal-entity relationship|Old scan/date/entity discrepancy; scope/current validity unverified |
|Approved phone, emails, offices, map and hours|Two phone numbers and literal placeholder offices; safe alternate enquiry path |
|11 public document files and publication rights|Current metadata-only downloads; internal QC/CAD/legal resources may need restricted approval |
|Testimonial/people/factory/media rights and claim/spec approval|Avoid turning polished placeholders into false documentary representations |
|Translation and native Bengali reviewer|Critical public tasks remain English despite Bengali mode; font readability requires native assessment |
|Canonical production domain and light/dark design exceptions|Three domain references; DESIGN/current UI conflict should be resolved explicitly |
|Future workspace architecture decision|Earlier root+backend proposal differs from eventual apps/web+apps/api requirement; no migration approved |

Validation limitations: no independent second engine, physical phones, native screen reader, native text zoom, field INP/CWV or Lighthouse score; Netlify inaccessible from this environment; full deployed route/revision parity unknown; slow/blocked asset states possible; real contact/career/newsletter/AI service delivery and actual company claims not verified. Some targeted retries timed out, including a language-persistence attempt and multi-size drawer check; both final follow-ups also timed out (first on a product-title interaction, second waiting for a stable language button); language switching persistence and the added drawer/sticky sizes therefore remain unverified. Their logs are preserved. Repeated raw DOM card counts during exiting animations were unstable (9/18/21); they are not reported as duplicate visible products. The first interaction sample recorded nine cards on each of the first two pages, three after Hardware filtering, and nine after clearing. A reliable settled third-page count was not obtained. Native keyboard/card defects remain confirmed independently of those count timings.

## O. Overall recommendation

Approve a focused public interaction/accessibility batch first and collect authoritative client media/content alongside it. Preserve the approved brand and working responsive foundation. Resolve truthful enquiry/download availability and product/certification presentation before spending effort on minor animation or cosmetic refinements. Follow with typography, localization and measured performance/metadata work. Keep monorepo migration outside the immediate UI polishing path.

Read this report together with the route/responsive matrices, design gap analysis,21-row product CSV, placeholder/claim register, detailed 43-item issue register and implementation roadmap. No implementation authorization should be inferred from the audit.

**AUDIT COMPLETE — NO UI/UX IMPLEMENTATION PERFORMED. READY FOR CHATGPT REVIEW.**
