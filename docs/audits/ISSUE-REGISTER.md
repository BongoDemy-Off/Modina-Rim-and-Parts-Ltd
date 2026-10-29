# Public UI/UX issue register — 27 October 2026

Local source is authoritative. This register distinguishes measured/static defects, verification requirements and recommendations. P1 is high, P2 medium, P3 low. No P0 was established. Effort is a rough engineering estimate excluding waiting for content, client decisions and production integration. Evidence paths are relative to docs/audits. Source references name the inspected local file and one-based line. Screenshots cannot prove keyboard behaviour; JSON/manual event observations support those findings.

## PUB-001 — P1: 18 products use unrelated random photographs

- **Status / route / component:** Confirmed; /products; shared global search; ProductImageCarousel.
- **Actual / exact problem:** Products 4–21 have no image arrays. Each falls back to three Picsum photos labelled as views of that product. These are unrelated scenes, not product documentation.
- **Expected:** Every listing has an approved exact-product image, or a clearly labelled representative family image / honest unavailable state.
- **Evidence:** [PRODUCT-IMAGE-INVENTORY.csv](PRODUCT-IMAGE-INVENTORY.csv); [evidence/public-data.json](evidence/public-data.json); [evidence/products-390-en.png](evidence/products-390-en.png); [evidence/products-image-failure-390.png](evidence/products-image-failure-390.png).
- **Reproduce / viewport:** 390×844 touch viewport; open Products, filter Rims, inspect photographs and alt text. Repeat IDs 4–21 using the inventory.
- **Source / established cause:** `src/lib/data.ts:34`; `src/components/ProductImageCarousel.tsx:26`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Prepare approved SKU-to-photo mappings; remove random fallback only in an authorized implementation. Never reuse a different product as an exact photograph.
- **Regression risk:** Wrong mapping can change perceived engineering identity; approval is per SKU.
- **Effort:** 1–2 days after asset receipt.
- **Acceptance criteria:** All 21 products have approved media status, meaningful alt, and no random-scene fallback.
- **WCAG:** Not a WCAG determination.

## PUB-002 — P1: SKU-001 name and photograph describe different products

- **Status / route / component:** Confirmed; /products; First product / drawer.
- **Actual / exact problem:** The record says Box Frame Bearing & Racer; all three mapped assets depict and label a red Heavy Duty Frame. The alt repeats Heavy Duty Frame. This is a confirmed association mismatch, not proof of which product name is correct.
- **Expected:** Name, exact product photo, alt, specifications and enquiry context refer to the same client-approved item.
- **Evidence:** [evidence/product-contact-sheet.png](evidence/product-contact-sheet.png); [evidence/product-drawer-390.png](evidence/product-drawer-390.png); [PRODUCT-IMAGE-INVENTORY.csv](PRODUCT-IMAGE-INVENTORY.csv).
- **Reproduce / viewport:** 390×844; tap the first product title, advance the carousel and compare the frame image with the bearing/racer heading.
- **Source / established cause:** `src/lib/data.ts:19`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Client chooses the authoritative identity and genuine media. Retain all existing masters until that decision; do not rename or reshape engineering features speculatively.
- **Regression risk:** A name-only change could break client catalogue alignment.
- **Effort:** 2–4 hours after client decision.
- **Acceptance criteria:** Client signs off the SKU identity; all three views and enquiry text agree.
- **WCAG:** Not a WCAG determination.

## PUB-003 — P1: Factory, people and sustainability captions accompany placeholder scenes

- **Status / route / component:** Confirmed; /gallery, /about, /mission, /sustainability, /news, /blog; Public supporting imagery.
- **Actual / exact problem:** All 15 Gallery URLs are Picsum. Rendered Factory Floor Overview shows a beach. About has two Picsum leadership portraits; Mission and Sustainability also attach real-world captions to random imagery. Editorial images are random too.
- **Expected:** Factual factory/person captions use authorized genuine photography. Editorial illustrations are clearly distinguished.
- **Evidence:** [evidence/gallery-390-en.png](evidence/gallery-390-en.png); [evidence/brand-media-contact-sheet.png](evidence/brand-media-contact-sheet.png); PLACEHOLDER-ASSET-INVENTORY.md.
- **Reproduce / viewport:** 390×844 and 1440×900; inspect Gallery first card and About leadership; compare captions with visible scenes.
- **Source / established cause:** `src/lib/data.ts:87`; `src/pages/About.tsx:58`; `src/pages/Mission.tsx:236`; `src/pages/Sustainability.tsx:230`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Use a location/person/content approval register and replace only with approved assets. Gemini may later supply labelled conceptual process or editorial illustrations, never documentary factory or certificate evidence.
- **Regression risk:** Removing placeholder imagery without layout reservations can introduce shifts.
- **Effort:** 2–4 days plus client media.
- **Acceptance criteria:** Every factual image has provenance and a matching caption; illustrative media is labelled.
- **WCAG:** Not a WCAG determination.

## PUB-004 — P1: Forms can claim delivery without sending anything

- **Status / route / component:** Confirmed; /contact, /careers; Message and job application feedback.
- **Actual / exact problem:** Read-only handlers prevent default and immediately set success state. Contact promises Message Sent and a response; Careers says Application Received. No delivery call is present. No form was submitted during this audit.
- **Expected:** Visitors receive truthful availability and delivery feedback; success appears only after confirmed delivery in a separately authorized integration.
- **Evidence:** [evidence/contact-390-en.png](evidence/contact-390-en.png); [evidence/careers-form-390.png](evidence/careers-form-390.png); static handlers cited below.
- **Reproduce / viewport:** Static reproduction: follow each handleSubmit to setIsSubmitted / setSubmitted. Do not submit live data.
- **Source / established cause:** `src/pages/Contact.tsx:29`; `src/pages/Careers.tsx:140`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Approve an honest public unavailable/demo state and verified alternate contact first; plan delivery separately. Do not implement backend, authentication or notifications within UI polish.
- **Regression risk:** Changing success copy must preserve the approved future form workflow.
- **Effort:** 0.5 day for truthful UI; delivery separately scoped.
- **Acceptance criteria:** No public UI promises sent/received before actual acknowledgement; pending/error/unavailable states are distinguishable.
- **WCAG:** Not a WCAG determination.

## PUB-005 — P1: Download buttons have no document targets

- **Status / route / component:** Confirmed; /downloads, /; product drawer; Catalog and specification CTAs.
- **Actual / exact problem:** Clicking a Downloads card produced zero download events and zero requests. Its button has no handler or URL. Home 2026 Catalog and Downloads featured Download Now are also inert; product Download Spec Sheet only opens the generic Downloads page.
- **Expected:** Each promised file action opens the correct approved document or clearly states that it is unavailable.
- **Evidence:** [evidence/download-action-390.png](evidence/download-action-390.png); [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/public-data.json](evidence/public-data.json).
- **Reproduce / viewport:** 390×844; click first Download on Downloads and observe no file or navigation. Inspect Home 2026 Catalog and the drawer spec-sheet destination.
- **Source / established cause:** `src/pages/Downloads.tsx:211`; `src/pages/Home.tsx:557`; `src/pages/Products.tsx:402`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Request the 11 listed files and approved metadata; map real URLs individually. Use an explicit unavailable state until approved files exist.
- **Regression risk:** Do not publish internal QC or CAD documents merely because a seed advertises them.
- **Effort:** 0.5–1 day after document approval.
- **Acceptance criteria:** Every enabled download retrieves the advertised MIME type, filename and version; no inert enabled control.
- **WCAG:** Not a WCAG determination.

## PUB-006 — P1: Desktop navigation dropdowns cannot be opened by keyboard

- **Status / route / component:** Confirmed; All public routes at xl+; Navbar.
- **Actual / exact problem:** Quality, Company and Media triggers are DIVs with mouse enter/leave only and no tabindex or role. Pointer hover opens the dropdown; Tab cannot focus its trigger.
- **Expected:** Keyboard and pointer users can open the same menus and reach every link.
- **Evidence:** [evidence/desktop-dropdown-1440.png](evidence/desktop-dropdown-1440.png); [evidence/interaction-results.json](evidence/interaction-results.json).
- **Reproduce / viewport:** 1440×900; Tab through header. Compare with hovering Quality.
- **Source / established cause:** `src/components/Navbar.tsx:262`; `src/components/Navbar.tsx:268`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Use real disclosure buttons with expanded state, keyboard opening/closing and predictable focus, preserving the approved menu appearance.
- **Regression risk:** Pointer hover and focus transitions must not close a menu while moving to a link.
- **Effort:** 0.5–1 day.
- **Acceptance criteria:** Tab reaches triggers; Enter/Space opens; Escape closes; links remain operable by pointer and keyboard.
- **WCAG:** 2.1.1 Keyboard; 4.1.2 Name, Role, Value.

## PUB-007 — P1: Product, gallery and vacancy cards lack keyboard triggers

- **Status / route / component:** Confirmed; /products, /gallery, /careers; Clickable cards.
- **Actual / exact problem:** Primary card actions are click handlers on DIVs without role/tabindex. Product View Details is a non-interactive span. Carousel buttons remain tabbable but cannot open product details.
- **Expected:** A named keyboard-operable control opens each item without nesting interactive carousel controls inside a button.
- **Evidence:** [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/gallery-lightbox-390.png](evidence/gallery-lightbox-390.png); [evidence/careers-form-390.png](evidence/careers-form-390.png).
- **Reproduce / viewport:** 390×844 and desktop width; use Tab then Enter to try to open product, gallery or job details.
- **Source / established cause:** `src/pages/Products.tsx:202`; `src/pages/Gallery.tsx:115`; `src/pages/Careers.tsx:252`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Give titles/details actions real button/link semantics and a visible focus state; preserve separate carousel controls.
- **Regression risk:** Avoid nested buttons and double activation when carousel arrows bubble.
- **Effort:** 0.5–1 day.
- **Acceptance criteria:** Every item opens by keyboard; arrows only change images; mobile tap behaviour remains unchanged.
- **WCAG:** 2.1.1 Keyboard; 4.1.2 Name, Role, Value.

## PUB-008 — P1: Drawers and overlays do not manage modal focus

- **Status / route / component:** Confirmed; /products, /careers, /gallery; shared mobile menu; Overlay lifecycle.
- **Actual / exact problem:** Product opening leaves focus on BODY and has no dialog role. Shift+Tab from its Close button reaches background pagination/carousel controls. Mobile menu focus stays on its background opener. Gallery has no scroll lock and the page moved from y=53 to y=553 behind the lightbox.
- **Expected:** Blocking overlays have an accessible name, an intentional initial focus, contained keyboard focus, inert background and opener restoration.
- **Evidence:** [evidence/focused-results.json](evidence/focused-results.json); [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/product-drawer-390.png](evidence/product-drawer-390.png); [evidence/mobile-menu-390.png](evidence/mobile-menu-390.png).
- **Reproduce / viewport:** 390×844; open a product, focus Close and Shift+Tab; open Gallery and wheel behind it; open mobile Menu and inspect activeElement.
- **Source / established cause:** `src/pages/Products.tsx:297`; `src/pages/Gallery.tsx:175`; `src/components/Navbar.tsx:500`; `src/pages/Careers.tsx:313`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Adopt one small accessible dialog/drawer primitive after approval; specify scroll locking, focus return, accessible name and background inertness.
- **Regression risk:** Products already locks body and closes with Escape; preserve these behaviours and safe-area sizing.
- **Effort:** 1–2 days.
- **Acceptance criteria:** Repeated Tab/Shift+Tab stays inside; close returns to opener; background is not actionable; screen reader announces a named dialog.
- **WCAG:** 2.4.3 Focus Order; 4.1.2 Name, Role, Value.

## PUB-009 — P2: Escape closing is inconsistent

- **Status / route / component:** Confirmed; /gallery, /careers; mobile navbar; Lightbox/menu/job drawer.
- **Actual / exact problem:** Escape closes Products, but Gallery lightbox, Careers drawer and mobile menu stayed open in executed tests.
- **Expected:** The same documented keyboard dismissal works for equivalent blocking overlays.
- **Evidence:** [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/gallery-lightbox-390.png](evidence/gallery-lightbox-390.png).
- **Reproduce / viewport:** 390×844; open each overlay and press Escape; compare with Products.
- **Source / established cause:** `src/pages/Gallery.tsx:14`; `src/pages/Careers.tsx:135`; `src/components/Navbar.tsx:11`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Implement Escape consistently through the approved shared overlay primitive, with a visible Close control and focus restoration.
- **Regression risk:** Do not close multiple stacked overlays from one keypress.
- **Effort:** 2–4 hours with overlay primitive.
- **Acceptance criteria:** Escape closes only the top overlay and restores its opener.
- **WCAG:** Not a WCAG determination.

## PUB-010 — P1: Visible form labels are not associated with fields

- **Status / route / component:** Confirmed; /contact, /careers; footer newsletter; Form semantics.
- **Actual / exact problem:** All six Contact fields have labels.length=0. Subject select has no accessible name (axe select-name). Careers name/email/phone have neither associated labels nor aria-label. Placeholder text does not repair the visible label relationship.
- **Expected:** Every field has a persistent, programmatically associated label and understandable required/error state.
- **Evidence:** [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/careers-form-390.png](evidence/careers-form-390.png); [evidence/route-results.json](evidence/route-results.json).
- **Reproduce / viewport:** 390×844; inspect labels on Contact and the job form. Clicking a visible label should focus its field; run axe with drawer open after the fix.
- **Source / established cause:** `src/pages/Contact.tsx:127`; `src/pages/Careers.tsx:378`; `src/components/Footer.tsx:65`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Assign stable IDs and htmlFor, accessible error descriptions and name/role state; retain native required/email constraints.
- **Regression risk:** IDs must remain unique across public forms and open overlays.
- **Effort:** 0.5 day.
- **Acceptance criteria:** Each field has one correct label; Subject and job inputs pass naming checks; errors link to the correct field.
- **WCAG:** 1.3.1 Info and Relationships; 3.3.2 Labels or Instructions; 4.1.2 Name, Role, Value.

## PUB-011 — P2: Product enquiry is classified as General Inquiry

- **Status / route / component:** Confirmed; /products → /contact?product=…; Enquiry handoff.
- **Actual / exact problem:** The product name is correctly inserted into Message, but Subject displays General Inquiry. State is assigned Product Inquiry: <name>, which matches no select option.
- **Expected:** Subject displays Product Inquiry while preserving the exact selected product in the message/context.
- **Evidence:** [evidence/product-enquiry-subject-390.png](evidence/product-enquiry-subject-390.png); [evidence/interaction-results.json](evidence/interaction-results.json).
- **Reproduce / viewport:** 390×844; tap first product title, tap Request Inquiry, inspect Subject and Message without submitting.
- **Source / established cause:** `src/pages/Contact.tsx:23`; `src/pages/Contact.tsx:149`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Use an existing stable subject value and a separate product context; validate query context without inventing specifications.
- **Regression risk:** Preserve user edits if query parameters change after typing.
- **Effort:** 1–2 hours.
- **Acceptance criteria:** Every product enquiry opens with visible Product Inquiry and correct product text; manual subject changes persist.
- **WCAG:** Not a WCAG determination.

## PUB-012 — P1: Bengali mode leaves most public content in English

- **Status / route / component:** Confirmed; Most public routes; especially /products, /contact, /mission; Localization.
- **Actual / exact problem:** All 22 Bengali route states set html lang=bn and load the Bengali font, but Products, forms and most page bodies remain hardcoded English. Home also mixes Bengali heading with English copy and Explore Catalog. About retains English fragments and numeric milestone logic tests a missing i18n_lang key.
- **Expected:** Approved translated content and correct language-of-parts declarations; untranslated content is honestly identified.
- **Evidence:** [evidence/locale-results.json](evidence/locale-results.json); [evidence/home-390-bn.png](evidence/home-390-bn.png); [evidence/products-390-bn.png](evidence/products-390-bn.png).
- **Reproduce / viewport:** 390×844; select Bengali then open Products/Contact/Mission. Compare document language and visible content.
- **Source / established cause:** `src/pages/Products.tsx:16`; `src/pages/Contact.tsx:9`; `src/pages/Home.tsx:143`; `src/pages/About.tsx:36`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Inventory hardcoded strings, obtain native-reader/client translations and mark remaining English passages lang=en. Preserve the approved Bengali font pending reader testing.
- **Regression risk:** Long translations can change menu, hero and button wrapping.
- **Effort:** 2–4 days plus translation review.
- **Acceptance criteria:** Critical product/enquiry journeys are translated and tested at 320–430px; language parts are declared; no broken Bengali clusters.
- **WCAG:** 3.1.2 Language of Parts; translation completeness is also a product requirement.

## PUB-013 — P2: Subtle text and faded timelines fail contrast

- **Status / route / component:** Confirmed; All public routes; Text colour tokens and opacity.
- **Actual / exact problem:** Axe reports #94a3b8 on white at 2.56:1 for 12px product SKUs, below 4.5:1. Faded timeline years and labels add further failures. The 22 mobile scans contain 361 violation nodes including repeated shared elements, not 361 unique defects.
- **Expected:** Normal text meets 4.5:1; large text meets 3:1; meaningful UI boundaries meet the applicable non-text requirement.
- **Evidence:** [evidence/route-results.json](evidence/route-results.json); [evidence/products-390-en.png](evidence/products-390-en.png); [evidence/certificates-390-en.png](evidence/certificates-390-en.png).
- **Reproduce / viewport:** 390×844; inspect product SKU text and timeline years; repeat contrast calculations using final composited colours.
- **Source / established cause:** `src/index.css:58`; `src/pages/Certificates.tsx:48`; `src/pages/About.tsx:69`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Introduce accessible text roles and limit decorative fading to nonessential graphics. Keep semantic success/error colours; do not make every hover red.
- **Regression risk:** Changing a shared colour may affect badges, borders and icon contrast.
- **Effort:** 0.5–1 day.
- **Acceptance criteria:** All reported text contrast failures are resolved or documented decorative exceptions; both locales and overlays checked.
- **WCAG:** 1.4.3 Contrast (Minimum).

## PUB-014 — P2: Card and article text undercuts the approved readability baseline

- **Status / route / component:** Confirmed; /products, /news, /blog, /downloads, /certificates, /privacy, /terms; Typography.
- **Actual / exact problem:** Product names are 16px and body 14px, editorial card excerpts 12px, Downloads descriptions 13px/metadata 10px, article/legal body 15px. DESIGN.md specifies body 18–20px and small text 14–16px. Numerous font-light overrides also contradict its guidance.
- **Expected:** Use agreed readable body/card roles; justified small metadata remains legible without blindly forcing large fixed sizes on 320 px screens.
- **Evidence:** [evidence/route-results.json](evidence/route-results.json); DESIGN-SYSTEM-GAP-ANALYSIS.md; [evidence/blog-390-en.png](evidence/blog-390-en.png).
- **Reproduce / viewport:** 390×844 and 1440×900; compare Products/Blog/Downloads and legal body to design typography roles.
- **Source / established cause:** `src/pages/Products.tsx:222`; `src/pages/Blog.tsx:234`; `src/pages/Downloads.tsx:194`; `src/pages/BlogDetail.tsx:135`; `src/pages/Privacy.tsx:195`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Agree a small fluid type scale, then apply by semantic role. Review Bengali line-height and Latin fallback before changing font families.
- **Regression risk:** Larger text can increase truncation and card height; recheck enquiry/footer lengths.
- **Effort:** 1–2 days.
- **Acceptance criteria:** Body copy meets the approved scale or has a documented exception; long titles remain discoverable at 320 px and enlarged text.
- **WCAG:** Not a WCAG determination.

## PUB-015 — P2: Global reset overrides rounded button styles

- **Status / route / component:** Confirmed; All public routes; CSS cascade.
- **Actual / exact problem:** Unlayered button { border-radius: inherit; } overrides layered Tailwind rounded utilities. Computed Product arrows, filters, Menu and chat radius is 0px despite rounded-full/rounded-lg classes. Screenshots show square controls; .btn-primary has its own later rule and retains 8px.
- **Expected:** Buttons render the radius assigned by their intended variant consistently.
- **Evidence:** [evidence/button-style-results.json](evidence/button-style-results.json); [evidence/mobile-top-contact-sheet.png](evidence/mobile-top-contact-sheet.png); [evidence/product-drawer-390.png](evidence/product-drawer-390.png).
- **Reproduce / viewport:** 390×844; inspect computed border-radius for Next image, Open chat, Menu and Filter by All.
- **Source / established cause:** `src/index.css:128`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Scope or place the reset in the correct layer in an approved CSS-only batch, then verify computed styles instead of only class strings.
- **Regression risk:** The reset is global; audit any affected public button and avoid unrequested Admin edits.
- **Effort:** 2–4 hours.
- **Acceptance criteria:** Carousel/chat shapes and filter/menu radii match approved tokens; .btn variants remain unchanged.
- **WCAG:** Not a WCAG determination.

## PUB-016 — P2: Equivalent heroes and content containers use different scales

- **Status / route / component:** Confirmed; Public company/list/legal pages; Hero and section primitives.
- **Actual / exact problem:** Products/About use clamp(52px,9vw,120px); Contact uses clamp(40px,7vw,96px); several pages reach 9rem (144px) versus DESIGN maximum 72px. Containers mix container-premium with container + px-6/md:px-12/lg:px-24; body and hero subtitle roles vary.
- **Expected:** A small documented set of hero/content variants preserves intentional hierarchy without arbitrary scale drift.
- **Evidence:** DESIGN-SYSTEM-GAP-ANALYSIS.md; [evidence/mobile-top-contact-sheet.png](evidence/mobile-top-contact-sheet.png); [evidence/route-results.json](evidence/route-results.json).
- **Reproduce / viewport:** Compare equivalent heroes at 390 and 1440 px; measure heading size, inset, section padding and title wrapping.
- **Source / established cause:** `src/pages/Products.tsx:87`; `src/pages/Contact.tsx:74`; `src/pages/Certificates.tsx:85`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Agree hero variants, content widths and spacing tokens. Do not enlarge the narrow-phone Navbar or force 72px headings where they would overflow.
- **Regression risk:** A blanket utility replacement would erase approved page-specific composition.
- **Effort:** 1–2 days.
- **Acceptance criteria:** Equivalent page roles share a reviewed scale; all deviations are named/justified; no new overflow.
- **WCAG:** Not a WCAG determination.

## PUB-017 — P2: Secondary-page heroes delay access to the main task on mobile

- **Status / route / component:** Measured friction; proposed visual adjustment; /products, /contact, /downloads, /certificates, legal pages; Vertical hierarchy.
- **Actual / exact problem:** At 390 px the Product filter starts around y=689 and first image around y=860; Contact form starts around y=974. Multiple decorative rules, mb-10 gaps and stat strips consume much of the first viewport. Full mobile pages reach 5,810–10,067px in several cases.
- **Expected:** The main product/contact task appears promptly while retaining the approved visual character. Exact whitespace reduction is a design recommendation, not a WCAG failure by itself.
- **Evidence:** [evidence/mobile-top-contact-sheet.png](evidence/mobile-top-contact-sheet.png); [evidence/route-results.json](evidence/route-results.json).
- **Reproduce / viewport:** 390×844; count scroll needed to search Products and start a Contact message; compare hero section sizes.
- **Source / established cause:** `src/pages/Products.tsx:75`; `src/pages/Contact.tsx:67`; `src/pages/Privacy.tsx:160`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Review compact mobile secondary-page hero variants; keep homepage storytelling and intentional inner scrollers. Validate task access with the owner before changing spacing.
- **Regression risk:** Removing all whitespace would violate the approved premium direction.
- **Effort:** 0.5–1 day after review.
- **Acceptance criteria:** At 390 px product search is visible early and contact entry requires less avoidable scrolling; before/after owner review required.
- **WCAG:** Not a WCAG determination.

## PUB-018 — P1: Valid article pages render an empty document title

- **Status / route / component:** Confirmed; exact library cause not proven; /news/1, /blog/1, /blog/featured; Helmet / title rendering.
- **Actual / exact problem:** Direct navigation repeatedly yields document.title="" and an empty title element alongside the original static title. Axe document-title fails for each sampled valid detail route. The visible H1 still renders.
- **Expected:** Each valid article has one meaningful browser title containing its headline and company name.
- **Evidence:** [evidence/focused-results.json](evidence/focused-results.json); [evidence/route-results.json](evidence/route-results.json); [evidence/news-1-390-en.png](evidence/news-1-390-en.png).
- **Reproduce / viewport:** 390×844; directly load each sampled valid detail route and inspect document.title / all title elements after load.
- **Source / established cause:** `src/pages/NewsDetail.tsx:169`; `src/pages/BlogDetail.tsx:73`; `src/main.tsx:10`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Investigate React 19/Helmet metadata ownership and pass a single composed title string; verify direct and client navigation. The exact underlying library interaction needs a controlled fix test.
- **Regression risk:** Avoid duplicate metadata while preserving social/structured content.
- **Effort:** 0.5 day.
- **Acceptance criteria:** Exactly one nonempty correct title after direct load, SPA navigation and back/forward for all valid detail IDs.
- **WCAG:** 2.4.2 Page Titled.

## PUB-019 — P2: Fallback pages keep generic indexable metadata

- **Status / route / component:** Confirmed; /news/invalid, /news/9999, /blog/invalid, /blog/9999, *; Missing content / NotFound.
- **Actual / exact problem:** Missing articles render only a paragraph and back link, with no H1 or route metadata. Wildcard has an H1 but uses the generic title/description and index,follow. Local preview serves the SPA shell with HTTP 200; deployed unknown-route status was not checked.
- **Expected:** Missing states are clearly titled and semantically structured; production status/indexing policy is deliberate.
- **Evidence:** [evidence/focused-results.json](evidence/focused-results.json); [evidence/news-invalid-390-en.png](evidence/news-invalid-390-en.png); [evidence/audit-missing-page-390-en.png](evidence/audit-missing-page-390-en.png).
- **Reproduce / viewport:** Load a nonnumeric ID, 9999 and /audit-missing-page; inspect title, H1 and robots.
- **Source / established cause:** `src/pages/NewsDetail.tsx:155`; `src/pages/BlogDetail.tsx:61`; `src/pages/NotFound.tsx:6`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Add a consistent public missing-content component and metadata; separately plan real static/HTTP status handling without changing hosting in this audit.
- **Regression risk:** A noindex rule must not leak to valid pages during navigation.
- **Effort:** 0.5 day UI; hosting separately scoped.
- **Acceptance criteria:** Missing states have a descriptive title/H1 and reviewed indexing policy; valid pages recover correct metadata.
- **WCAG:** Not a WCAG determination.

## PUB-020 — P2: Metadata/domain strategy is unresolved and fragmented

- **Status / route / component:** Confirmed; All routes; Public SEO presentation.
- **Actual / exact problem:** Static and Helmet descriptions coexist (two on valid sampled detail pages). Canonicals and sitemap use www.modinarim.com although two deployment domains are supplied. Sitemap omits Gallery, Careers, FAQ and detail URLs. OG/Twitter images are relative and generic; initial HTML has an empty root and generic metadata.
- **Expected:** One approved canonical origin, one route-owned metadata set, an accurate public sitemap and reliable share previews.
- **Evidence:** [evidence/focused-results.json](evidence/focused-results.json); index.html; public/sitemap.xml; [evidence/deployment-results.json](evidence/deployment-results.json).
- **Reproduce / viewport:** Inspect direct detail DOM head, dist/index.html and sitemap. Compare deployment URL to canonical; do not assume an unapproved domain is wrong.
- **Source / established cause:** `index.html:8`; `src/pages/Home.tsx:78`; `public/sitemap.xml:2`; `src/main.tsx:2`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Obtain production-domain decision, consolidate metadata, use absolute approved share images and plan public pre-rendering separately. No framework rewrite is required just for metadata cleanup.
- **Regression risk:** Premature canonical changes can split search identity; do not change hosting/domain settings.
- **Effort:** 1–2 days for frontend; static rendering separately estimated.
- **Acceptance criteria:** One correct title/description/canonical per valid route; sitemap covers approved URLs; invalid routes excluded; share URLs resolve on approved origin.
- **WCAG:** Not a WCAG determination.

## PUB-021 — P1: Certificate evidence needs renewed documents and entity confirmation

- **Status / route / component:** Confirmed document discrepancy; client verification required; /certificates, /quality, /; Certification trust.
- **Actual / exact problem:** The inspected ISO 9001 image names Modina Metal Industries, not Modina Rim & Parts Ltd.; it shows surveillance/certificate-expiry 09 April 2024 and recertification due 09 April 2026. Audit date is 27 October 2026. Website text presents current triple certification and a 2025–2026 renewal article. The image discrepancy is confirmed; current legal validity and entity relationship are unverified.
- **Expected:** Public certification claims are supported by current approved documents for the correct legal entity and product scope.
- **Evidence:** [evidence/certificate-contact-sheet.png](evidence/certificate-contact-sheet.png); public/iso/iso-9001.png (visually inspected original); [evidence/certificates-390-en.png](evidence/certificates-390-en.png).
- **Reproduce / viewport:** Compare certificate entity and dated fields with page/company wording. Client/issuer verification is required; no issuer was contacted.
- **Source / established cause:** `src/pages/Certificates.tsx:7`; `src/pages/Quality.tsx:20`; `src/pages/News.tsx:18`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Client supplies renewed certificates, surveillance status, entity relationship and publication permission. Do not declare certification invalid or alter the document image based only on this audit.
- **Regression risk:** Unsupported edits could misrepresent a legal entity or certification scope.
- **Effort:** 0.5–1 day after verified documents.
- **Acceptance criteria:** Every public claim maps to current approved evidence; entity/date/scope are consistent across pages and metadata.
- **WCAG:** Not a WCAG determination.

## PUB-022 — P1: Public telephone numbers disagree

- **Status / route / component:** Confirmed; Navbar, mobile drawer, /contact, /products, footer, Organization JSON-LD; Contact identity.
- **Actual / exact problem:** Header/tap-to-call uses +8801321234510; mobile drawer/footer/Contact/Product sales and Home structured data use the different +8801234567890 pattern. The correct client number was not verified or dialled.
- **Expected:** Every contact channel uses the client-approved number and a valid tel link.
- **Evidence:** [evidence/mobile-menu-390.png](evidence/mobile-menu-390.png); [evidence/contact-390-en.png](evidence/contact-390-en.png); source occurrences.
- **Reproduce / viewport:** 390×844; compare top call button, mobile drawer Sales CTA and Contact detail. Read JSON-LD without calling.
- **Source / established cause:** `src/components/Navbar.tsx:395`; `src/components/Navbar.tsx:607`; `src/pages/Home.tsx:95`; `src/pages/Contact.tsx:43`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Obtain one approved contact register and reuse it in public display, tel links, metadata and footer. Keep the full-number narrow-phone layout.
- **Regression risk:** Do not assume the plausible-looking header number is authoritative.
- **Effort:** 2–4 hours after client approval.
- **Acceptance criteria:** All intended sales contact occurrences agree with the signed-off register; no real call required for UI regression.
- **WCAG:** Not a WCAG determination.

## PUB-023 — P1: Business claims and identity assets lack supplied approval evidence

- **Status / route / component:** Client-verification requirement; not a confirmed falsehood; Across public pages; Credibility content.
- **Actual / exact problem:** Hardcoded testimonials use stock portraits and named companies; production capacity, tolerance, materials, availability, MOQ, lead time, export/CSR milestones and workforce claims are asserted. Contact includes explicit placeholder office addresses. No client evidence was supplied for these claims.
- **Expected:** Marketing and commercial assertions have traceable client approval; placeholders are not mistaken for factual company evidence.
- **Evidence:** PLACEHOLDER-ASSET-INVENTORY.md; [evidence/public-data.json](evidence/public-data.json); [evidence/brand-media-contact-sheet.png](evidence/brand-media-contact-sheet.png).
- **Reproduce / viewport:** Read Home testimonials, Product spec drawer, Sustainability statistics, News and Contact locations. This is verification inventory, not a finding that all claims are false.
- **Source / established cause:** `src/pages/Home.tsx:60`; `src/pages/Products.tsx:353`; `src/pages/Sustainability.tsx:7`; `src/pages/Contact.tsx:50`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Build a client sign-off register for identity, commercial terms, capabilities, testimonials/consent and rights. Preserve source conflicts for decisions.
- **Regression risk:** Editing specs or company history without approval can create new inaccuracies.
- **Effort:** 1–2 days for register; client review external.
- **Acceptance criteria:** Every published factual claim has an owner, evidence/status and approved wording; no invented replacement facts.
- **WCAG:** Not a WCAG determination.

## PUB-024 — P1: News featured story opens a different article

- **Status / route / component:** Confirmed; /news → /news/1; Featured editorial link.
- **Actual / exact problem:** Featured card says April 2026 catalogue launch; Read Article links to articlesData[0], the March 2026 ISO renewal story. The detail title does not match the promised story.
- **Expected:** A featured story opens matching headline/date/body, or clearly links to an appropriate alternative destination.
- **Evidence:** [evidence/news-390-en.png](evidence/news-390-en.png); [evidence/news-1-390-en.png](evidence/news-1-390-en.png); source link mapping.
- **Reproduce / viewport:** 390×844 or 1440×900; read featured headline, follow Read Article and compare the article H1.
- **Source / established cause:** `src/pages/News.tsx:156`; `src/pages/News.tsx:161`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Client approves a real detail record/destination; bind featured presentation to that record rather than unrelated first-list item.
- **Regression risk:** Do not invent a launch article solely to make the link match.
- **Effort:** 2–4 hours after content decision.
- **Acceptance criteria:** Featured headline/date/image and destination article describe the same approved event.
- **WCAG:** Not a WCAG determination.

## PUB-025 — P2: News list and detail disagree on the same person

- **Status / route / component:** Confirmed static discrepancy; /news and /news/7; Duplicated editorial data.
- **Actual / exact problem:** News item 7 names Mohammed Rafiqul Islam in the listing; NewsDetail item 7 names Md. Faruq Hossain. This is a source-confirmed conflict, not a verified identity.
- **Expected:** One approved person name is used consistently in summaries and full text.
- **Evidence:** Static source comparison; PLACEHOLDER-ASSET-INVENTORY.md.
- **Reproduce / viewport:** Inspect item 7 in both source arrays; this detail item was not separately rendered.
- **Source / established cause:** `src/pages/News.tsx:24`; `src/pages/NewsDetail.tsx:121`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Obtain client decision, then share approved editorial records between list and detail without changing routing.
- **Regression risk:** Blindly choosing the detail name would overwrite a source conflict.
- **Effort:** 1–2 hours after client decision.
- **Acceptance criteria:** Listing/detail/metadata use the approved identity; no unrelated article changes.
- **WCAG:** Not a WCAG determination.

## PUB-026 — P2: Large source media are served without responsive variants

- **Status / route / component:** Confirmed; /products, /quality, /certificates; shared favicon; Media transfer.
- **Actual / exact problem:** Product views are roughly 1.46–2.04 MB each, certificates roughly 1.71–1.78 MB each. public/logo.jpg is a 7.94 MB 12,500² favicon target. hero.jpg is 8.61 MB (social image, not the rotating hero asset). There are exact duplicate source/public masters; they are not all downloaded on every page.
- **Expected:** Small rendered slots receive suitable optimized variants while authentic masters are preserved.
- **Evidence:** [evidence/asset-metadata.json](evidence/asset-metadata.json); [evidence/build.txt](evidence/build.txt); [evidence/product-contact-sheet.png](evidence/product-contact-sheet.png); [evidence/certificate-contact-sheet.png](evidence/certificate-contact-sheet.png).
- **Reproduce / viewport:** Compare on-disk bytes/dimensions against 4:3 card slots and 220px certificate previews. Inspect favicon reference.
- **Source / established cause:** `src/components/ProductImageCarousel.tsx:75`; `src/pages/Certificates.tsx:206`; `index.html:29`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** After media approval, produce responsive WebP/AVIF/JPEG variants, srcset/sizes and a small favicon. Preserve masters; share equivalent certificate URLs where appropriate.
- **Regression risk:** Compression must preserve engineering annotations and certificate legibility.
- **Effort:** 1–2 days.
- **Acceptance criteria:** Correct responsive variants are transferred; visual detail preserved; favicon is appropriately sized; no master deleted.
- **WCAG:** Not a WCAG determination.

## PUB-027 — P1: Eager public bundle and cold rendering are costly

- **Status / route / component:** Confirmed; All public routes; Loading performance.
- **Actual / exact problem:** Build emits 1,109.11 kB public JS (283.91 kB gzip) and 88.02 kB CSS; Vite warns about chunk size. Public pages are eager imports. Synthetic cold LCP observations are 12.396s Home, 9.560s Products, 9.140s Contact in an uncompressed local preview under the recorded throttle. These are single lab samples, not field scores.
- **Expected:** The first route loads only necessary code and renders promptly on the agreed mobile network budget.
- **Evidence:** [evidence/build.txt](evidence/build.txt); [evidence/performance-results.json](evidence/performance-results.json); [evidence/environment.json](evidence/environment.json).
- **Reproduce / viewport:** Run the recorded production build and CDP test; compare the large initial script request with render timing.
- **Source / established cause:** `src/App.tsx:7`; `src/App.tsx:8`; `src/components/Chatbot.tsx:4`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Profile route-level splitting and defer optional chatbot code; establish image/code budgets and repeat controlled lab tests. Vite injects a browser AI key when configured: treat safe public-chat availability as a separate existing architecture decision, without exposing values or implementing backend here.
- **Regression risk:** Splitting can change route transitions/preloader behaviour; missing-key AI status must be truthful.
- **Effort:** 1–2 days frontend performance; integration separately scoped.
- **Acceptance criteria:** Initial JS is measurably reduced; lab LCP improves under repeatable conditions; field INP is measured only when actual field data exists.
- **WCAG:** Not a WCAG determination.

## PUB-028 — P2: Fixed preloader adds delay and clips narrow-screen branding

- **Status / route / component:** Confirmed; All public routes on fresh session; Preloader.
- **Actual / exact problem:** Source runs a 2.2s counter + 0.4s hold + 0.8s exit regardless of network readiness. It was gone at a follow-up capture after a subsequent four-second wait; exact wall-clock completion was not measured. At 320 px each half is 160px with 32px side padding; the brand text is visibly clipped. This is an entry-animation issue, not document overflow.
- **Expected:** Entry feedback does not hide useful content unnecessarily and remains legible at narrow widths.
- **Evidence:** [evidence/preloader-320.png](evidence/preloader-320.png); [evidence/preloader-results.json](evidence/preloader-results.json).
- **Reproduce / viewport:** Fresh 320×740 context with no modina_loaded key; capture during the counter and wait for completion.
- **Source / established cause:** `src/components/Preloader.tsx:103`; `src/components/Preloader.tsx:146`; `src/components/Preloader.tsx:203`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Review a short/skip/reduced-motion path and mobile-safe brand layout; preserve the visual concept subject to owner approval.
- **Regression risk:** Session behaviour and initial route visibility must remain deterministic.
- **Effort:** 0.5 day.
- **Acceptance criteria:** 320 px brand text is visible; reduced-motion has a minimal path; loading feedback is not a fixed unnecessary gate.
- **WCAG:** Not a WCAG determination.

## PUB-029 — P1: Hero keeps rotating with no pause, including reduced-motion mode

- **Status / route / component:** Confirmed hero issue; video control gap source-confirmed; /; /about video source; Motion controls.
- **Actual / exact problem:** Home advances every 5s indefinitely with prev/next/dots but no pause control. With prefers-reduced-motion=reduce, recorded src still changed from hero_products to hero_rims. Source videos autoplay+loop without controls; actual playback was paused in the sampled hidden/below-fold state.
- **Expected:** Visitors can pause auto-updating content; reduced-motion preferences are respected.
- **Evidence:** [evidence/reduced-motion.json](evidence/reduced-motion.json); [evidence/home-390-en.png](evidence/home-390-en.png); Home timer source.
- **Reproduce / viewport:** Emulate reduced motion; wait >5s and compare hero src. Inspect controls and autoplay source.
- **Source / established cause:** `src/pages/Home.tsx:44`; `src/pages/Home.tsx:337`; `src/pages/About.tsx:245`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Add accessible pause/play and reduced-motion behaviour; defer below-fold video and provide an intentional still state. Do not claim every CSS animation is an AA violation.
- **Regression risk:** Manual navigation should not unexpectedly resume paused rotation.
- **Effort:** 0.5–1 day.
- **Acceptance criteria:** Pause stops rotation, manual selection works, reduced-motion starts static, and any playing loop can be stopped.
- **WCAG:** 2.2.2 Pause, Stop, Hide.

## PUB-030 — P2: Images and icon-only links/buttons lack meaningful names

- **Status / route / component:** Confirmed; /about, /sustainability, /news, /blog, /; shared footer; Alternative text and names.
- **Actual / exact problem:** Axe reports four missing image alts on About (company and leadership), one each on Sustainability and featured News/Blog. Four footer social links are unnamed on every route and point to #. Five Home testimonial controls are unnamed.
- **Expected:** Informative images have appropriate alt; decorative images have empty alt; every interactive icon has a useful name and real destination.
- **Evidence:** [evidence/route-results.json](evidence/route-results.json); [evidence/about-390-en.png](evidence/about-390-en.png); [evidence/home-390-en.png](evidence/home-390-en.png).
- **Reproduce / viewport:** Run the recorded 390 px axe scan; inspect image-alt, link-name and button-name nodes.
- **Source / established cause:** `src/pages/About.tsx:273`; `src/components/Footer.tsx:75`; `src/pages/Home.tsx:631`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Approve captions/links, add semantic names and appropriate alt. Do not label random photos as actual employees; unavailable socials should not appear functional.
- **Regression risk:** Blindly duplicating nearby text as alt can make navigation verbose.
- **Effort:** 0.5 day after content decisions.
- **Acceptance criteria:** No image-alt/link-name/button-name failures remain for public states; all enabled social links have approved destinations.
- **WCAG:** 1.1.1 Non-text Content; 2.4.4 Link Purpose; 4.1.2 Name, Role, Value.

## PUB-031 — P2: Homepage progress dots are too small and tightly spaced

- **Status / route / component:** Confirmed dimensions; assess equivalent-control exception per function; /; Hero and testimonial selectors.
- **Actual / exact problem:** Hero progress buttons are 3px high; inactive widths are 16px with 4px gaps. Testimonial dots are 6px high with 8px gaps. Adjacent small targets do not have 24px separation. Product carousel indicators are already 32×32 and should be retained.
- **Expected:** Pointer targets meet WCAG 2.2 AA minimum size or its spacing/equivalent-control exceptions; aim for practical 44px mobile targets.
- **Evidence:** [evidence/focused-results.json](evidence/focused-results.json); Home button classes; [evidence/home-390-en.png](evidence/home-390-en.png).
- **Reproduce / viewport:** 390×844; measure actual button rectangles, not just visible dots. Apply spacing exceptions rather than declaring all sub-44px controls failures.
- **Source / established cause:** `src/pages/Home.tsx:218`; `src/pages/Home.tsx:680`; `src/components/ProductImageCarousel.tsx:114`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Keep tiny visual markers inside larger transparent button hit areas; label selected state and retain prev/next alternatives.
- **Regression risk:** Expanded hit areas must not overlap image arrows or captions.
- **Effort:** 2–4 hours.
- **Acceptance criteria:** Marker visuals remain restrained; actual targets meet 24px/spacing requirements and are comfortable to tap.
- **WCAG:** 2.5.8 Target Size (Minimum).

## PUB-032 — P2: Accordion and most category controls omit state semantics

- **Status / route / component:** Confirmed FAQ; static filter comparison; /faq; /gallery, /news, /blog, /downloads, /careers; Selected/expanded states.
- **Actual / exact problem:** FAQ answers open visually, but question buttons expose no aria-expanded or aria-controls. Products correctly uses aria-pressed; other category bars largely use styling only and are inconsistent.
- **Expected:** Assistive technology receives the same expanded/selected state visible to sighted users.
- **Evidence:** [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/faq-expanded-390.png](evidence/faq-expanded-390.png); source comparison.
- **Reproduce / viewport:** 390×844; open first FAQ and inspect attributes; compare Products category semantics with other filter bars.
- **Source / established cause:** `src/pages/FAQ.tsx:163`; `src/pages/Products.tsx:154`; `src/pages/Gallery.tsx:79`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Add stable accordion relationships and consistent filter button pressed state; announce result changes without stealing input focus.
- **Regression risk:** Do not introduce tablist semantics unless the complete keyboard pattern is implemented.
- **Effort:** 0.5 day.
- **Acceptance criteria:** Expanded and selected states are programmatically exposed; dynamic counts are understandable; controls still work by tap/keyboard.
- **WCAG:** 4.1.2 Name, Role, Value; 4.1.3 Status Messages where applicable.

## PUB-033 — P2: Global product search loses exact-item intent

- **Status / route / component:** Confirmed; Shared navbar → /products; Search result destinations.
- **Actual / exact problem:** Searching Wasar returns a named result, but its link opens only /products?category=Hardware with three cards and no drawer. Search can match product descriptions but does not carry the original term or selected ID.
- **Expected:** A chosen product result reveals that product clearly, preserving search intent.
- **Evidence:** [evidence/global-search-390.png](evidence/global-search-390.png); [evidence/interaction-results.json](evidence/interaction-results.json).
- **Reproduce / viewport:** 390×844; open Search, enter Wasar, select the result; inspect resulting URL/cards.
- **Source / established cause:** `src/components/Navbar.tsx:145`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Choose a minimal public query contract for selected product/search term; preserve category-only footer links. Document product permalink requirements separately.
- **Regression risk:** Query changes must not break existing approved category URLs.
- **Effort:** 0.5 day.
- **Acceptance criteria:** Selecting any search result makes the exact product immediately identifiable; back/forward and existing category links remain correct.
- **WCAG:** Not a WCAG determination.

## PUB-034 — P2: Image request failures leave empty/broken product frames

- **Status / route / component:** Confirmed; /products; other remote-heavy pages; Resilient media loading.
- **Actual / exact problem:** No onError fallback appears in the shared carousel. Aborted Picsum requests create broken image states with no honest unavailable message. Many remote dependencies have no local content fallback.
- **Expected:** Unavailable media reserves geometry and communicates the problem without misrepresenting the product.
- **Evidence:** [evidence/products-image-failure-390.png](evidence/products-image-failure-390.png); [evidence/focused-results.json](evidence/focused-results.json); source carousel.
- **Reproduce / viewport:** Block Picsum requests in the local browser, filter Rims and inspect images. This simulates an outage; it is not proof of a current public-host outage.
- **Source / established cause:** `src/components/ProductImageCarousel.tsx:73`; `src/pages/Gallery.tsx:122`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Add a stable reserved image frame with approved unavailable text and retry as appropriate; prioritize locally owned optimized assets.
- **Regression risk:** Do not replace failed exact photos with misleading random scenes.
- **Effort:** 0.5 day.
- **Acceptance criteria:** Failed/slow images do not collapse layout or show misleading alt scenes; gallery/product actions remain usable.
- **WCAG:** Not a WCAG determination.

## PUB-035 — P2: Catalogue counts do not match the local data

- **Status / route / component:** Confirmed; /products, /news, /downloads; Hero and summary facts.
- **Actual / exact problem:** Products advertises 4 Categories but has three data categories (Motorcycle 6, Rims 12, Hardware 3). News advertises 12+ Articles but the source contains eight list entries plus a separate featured block. Downloads similarly repeats four product categories and exposes a Certificates filter with no certificate records.
- **Expected:** Counts and filter labels describe actual available content; distinct marketing families are labelled separately.
- **Evidence:** [evidence/public-data.json](evidence/public-data.json); [evidence/products-390-en.png](evidence/products-390-en.png); [evidence/news-390-en.png](evidence/news-390-en.png); Downloads source.
- **Reproduce / viewport:** Compare visible stats/filter counts with the public arrays; choose Certificates on Downloads after implementation tests.
- **Source / established cause:** `src/pages/Products.tsx:126`; `src/pages/News.tsx:114`; `src/pages/Downloads.tsx:9`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Derive catalogue counts from source records; obtain client decision on genuinely missing articles/documents instead of inventing content.
- **Regression risk:** Four homepage visual families may remain valid if clearly distinguished from catalogue categories.
- **Effort:** 2–4 hours plus content decision.
- **Acceptance criteria:** Displayed record counts match approved data; empty categories have a clear state and no promised unavailable files.
- **WCAG:** Not a WCAG determination.

## PUB-036 — P2: Certificate previews cannot be enlarged or downloaded

- **Status / route / component:** Confirmed; /certificates; /quality; Document inspection.
- **Actual / exact problem:** Certificate images sit in 220px contain frames (Certificates) with opacity 0.7 until hover. Cards use cursor-default and no lightbox/open-original action. Text on a full 2550×3300 certificate is not readable in that thumbnail; mobile has no persistent hover.
- **Expected:** Visitors can open a legible approved document with keyboard/touch controls and clear issue/validity information.
- **Evidence:** [evidence/certificates-390-en.png](evidence/certificates-390-en.png); [evidence/certificate-contact-sheet.png](evidence/certificate-contact-sheet.png).
- **Reproduce / viewport:** 390×844 and 1440×900; try to enlarge or open a certificate, compare legibility to original.
- **Source / established cause:** `src/pages/Certificates.tsx:206`; `src/pages/Certificates.tsx:213`; `src/pages/Certificates.tsx:202`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** After entity/date approval, add a clear view-document action and accessible preview or actual file link; keep full image legibility.
- **Regression risk:** Do not make outdated documents more prominent before approval.
- **Effort:** 0.5–1 day after document validation.
- **Acceptance criteria:** Approved certificate can be read at useful size and dismissed/accessed by keyboard and touch.
- **WCAG:** Not a WCAG determination.

## PUB-037 — P2: Careers fields use a different shape and focus pattern

- **Status / route / component:** Confirmed; /careers versus /contact; Public form design.
- **Actual / exact problem:** Contact uses filled bordered rounded fields; Careers uses transparent bottom-border fields with rounded-none and outline-none. This diverges from DESIGN 56px/8px fields and weakens the common visual/focus system.
- **Expected:** Public inputs share a deliberate visual, label, height and focus convention, with justified textarea/compact exceptions.
- **Evidence:** [evidence/careers-form-390.png](evidence/careers-form-390.png); [evidence/product-enquiry-subject-390.png](evidence/product-enquiry-subject-390.png); DESIGN-SYSTEM-GAP-ANALYSIS.md.
- **Reproduce / viewport:** 390×844; compare Contact and job form controls and tab focus.
- **Source / established cause:** `src/pages/Contact.tsx:54`; `src/pages/Careers.tsx:385`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Reuse a minimal public field style with label/error wiring; verify visible focus rather than relying solely on border-colour change.
- **Regression risk:** Do not import or modify Admin form components during this public-only batch.
- **Effort:** 0.5 day with labels batch.
- **Acceptance criteria:** Equivalent inputs share approved radius/height/focus; mobile text stays at least 16px; textareas remain comfortable.
- **WCAG:** Not a WCAG determination.

## PUB-038 — P3: Bypass navigation and heading structure can be improved

- **Status / route / component:** Recommendation; not a blanket WCAG failure; All routes; product grid; Semantic navigation.
- **Actual / exact problem:** No visible-on-focus skip link is present. Products goes from H1 to card H3s without a grid H2; other pages use decorative and metadata H4s. A main landmark already exists and should be kept.
- **Expected:** Keyboard users can reach main content efficiently; headings describe a coherent content outline.
- **Evidence:** [evidence/route-results.json](evidence/route-results.json); [evidence/focused-results.json](evidence/focused-results.json); src/layouts/Layout.tsx.
- **Reproduce / viewport:** Tab from page start and review the DOM heading list, using native assistive-technology review in a later gate.
- **Source / established cause:** `src/layouts/Layout.tsx:12`; `src/pages/Products.tsx:222`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Add a focus-visible skip link and descriptive grid heading where appropriate; do not label every metadata item as a heading.
- **Regression risk:** Skip destination must account for fixed header and remain focusable.
- **Effort:** 2–4 hours.
- **Acceptance criteria:** First keyboard action offers main-content access and public heading outlines have a reviewed hierarchy.
- **WCAG:** Not a WCAG determination.

## PUB-039 — P2: Dark CTAs and bespoke effects diverge from the light baseline

- **Status / route / component:** Confirmed baseline conflict; visual remedy needs owner decision; Many secondary pages; homepage category media; Approved design-system reconciliation.
- **Actual / exact problem:** Several full-width CTA sections use bg-modina-heading with white text; DESIGN explicitly says never dark. Existing category art is predominantly black/red and uses heavy shadows. The approved current identity contains this conflict, so changing all of it automatically would be inappropriate.
- **Expected:** Owner explicitly resolves which existing dark accents are approved exceptions to DESIGN, with a minimal consistent policy.
- **Evidence:** [evidence/brand-media-contact-sheet.png](evidence/brand-media-contact-sheet.png); [evidence/certificates-390-en.png](evidence/certificates-390-en.png); DESIGN-SYSTEM-GAP-ANALYSIS.md.
- **Reproduce / viewport:** Compare DESIGN light-interface rules with secondary-page CTA sections and existing category images.
- **Source / established cause:** `src/pages/Certificates.tsx:297`; `src/pages/Contact.tsx:227`; `src/pages/Home.tsx:181`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Document approved exceptions first; standardize only the agreed public CTA/media presentation, retaining the brand-red/light overall direction.
- **Regression risk:** A broad colour replacement could erase approved composition and reduce image contrast.
- **Effort:** 0.5 day decision; 0.5–1 day implementation.
- **Acceptance criteria:** Owner signs off exception policy; equivalent CTA variants follow it consistently.
- **WCAG:** Not a WCAG determination.

## PUB-040 — P2: Mobile product detail affordance is hover-only

- **Status / route / component:** Confirmed; /products; Product card footer.
- **Actual / exact problem:** At a touch-oriented 390 px viewport, View Details has computed opacity 0 until group hover. The card remains tappable by pointer but does not expose the text cue; keyboard access is separately blocked by PUB-007.
- **Expected:** Mobile visitors see a clear, always-available details action and feedback for activation.
- **Evidence:** [evidence/interaction-results.json](evidence/interaction-results.json); [evidence/products-390-en.png](evidence/products-390-en.png).
- **Reproduce / viewport:** 390×844 touch context; inspect the first card footer before interaction and read computed opacity.
- **Source / established cause:** `src/pages/Products.tsx:232`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Show an explicit details action at touch widths and focus-visible state at pointer widths; preserve image carousel event isolation.
- **Regression risk:** Adding buttons must avoid nesting conflicts with image controls.
- **Effort:** 2–4 hours.
- **Acceptance criteria:** Details action is visible and usable without hover; keyboard, touch and mouse open the same product.
- **WCAG:** Not a WCAG determination.

## PUB-041 — P2: Displayed contact details are not actionable links

- **Status / route / component:** Confirmed; /contact; shared footer; Direct contact alternatives.
- **Actual / exact problem:** Phone and email in Contact/footer are rendered as plain paragraph/span text, while the form is only a local demo. The working header tel link exists but points to a conflicting number (PUB-022).
- **Expected:** Verified phone/email have clear tap-to-call/mail actions, including where users look for contact details.
- **Evidence:** [evidence/contact-390-en.png](evidence/contact-390-en.png); source Contact details / Footer contact values.
- **Reproduce / viewport:** 390×844; tap the displayed Contact/footer phone and email, without dialling or sending anything.
- **Source / established cause:** `src/pages/Contact.tsx:194`; `src/components/Footer.tsx:155`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Once the contact register is approved, use appropriate tel/mailto links with readable labels and a truthful alternate-enquiry path.
- **Regression risk:** No live calls/emails should be made during regression testing.
- **Effort:** 2–4 hours after contact approval.
- **Acceptance criteria:** Verified details expose correct link targets and work by keyboard/touch without changing the form scope.
- **WCAG:** Not a WCAG determination.

## PUB-042 — P2: Newsletter Join appears available but has no action

- **Status / route / component:** Confirmed static behaviour gap; All public routes; Footer newsletter.
- **Actual / exact problem:** Footer shows an email field and Join button, but the button is type=button with no handler and is not in a subscription form. No subscription was attempted.
- **Expected:** The newsletter control clearly communicates actual availability and never silently discards an entered address.
- **Evidence:** [evidence/home-390-en.png](evidence/home-390-en.png); static Footer markup.
- **Reproduce / viewport:** Inspect Footer newsletter markup; verify no onClick/onSubmit or destination. Do not enter or submit a real email.
- **Source / established cause:** `src/components/Footer.tsx:65`; `src/components/Footer.tsx:69`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Obtain an owner decision on newsletter availability; show an honest unavailable state until a separately approved subscription integration exists.
- **Regression risk:** No email-service integration or real subscription belongs to this UI audit.
- **Effort:** 2–4 hours for availability UI.
- **Acceptance criteria:** Enabled Join has a defined approved outcome; unavailable UI is explicit and no address is silently accepted.
- **WCAG:** Not a WCAG determination.

## PUB-043 — P2: Chatbot Online label is not tied to service availability

- **Status / route / component:** Confirmed unconditional label; service availability unverified; All public routes; Chatbot availability and fallback.
- **Actual / exact problem:** Opening chat always shows Online. Source constructs the AI client only when a message is sent and handles failure later; there is no availability check behind the label. Chat was opened but no AI message or API request was sent, so actual service status is unknown.
- **Expected:** The public widget makes only justified availability claims and offers a verified alternate contact path when unavailable.
- **Evidence:** [evidence/chat-landscape-667x375.png](evidence/chat-landscape-667x375.png); static Chatbot handleSend and Online markup.
- **Reproduce / viewport:** Open chat without sending; inspect the fixed Online label and the separate request/error path.
- **Source / established cause:** `src/components/Chatbot.tsx:23`; `src/components/Chatbot.tsx:90`. The mechanism described in Actual is established unless specifically labelled unresolved.
- **Recommended fix:** Approve a neutral availability label or deliberate disabled/unavailable state and accessible request feedback. Resolve browser-key/service integration separately under the existing architecture review.
- **Regression risk:** Do not test by sending real API requests or expose any configured key.
- **Effort:** 0.5 day for public UI; service separately scoped.
- **Acceptance criteria:** Status wording reflects known state; offline/error guidance includes approved contact alternatives; no false service-health assertion.
- **WCAG:** Not a WCAG determination.

