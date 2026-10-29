# Design-system gap analysis

Baseline: DESIGN.md read in full. Preserve light canvas, established brand red #E52525 / dark red #B31515, Manrope, existing routes, approved narrow two-row header, responsive grids/inner scrollers, product carousel arrows, and restrained engineered geometry. This is comparison and recommendation only.

| Element | Baseline | Local comparison / exact mechanism | Decision / acceptance |
|---|---|---|---|
| Hero titles | clamp(40px,6vw,72px) | Products/About clamp(52px,9vw,120px); Contact clamp(40px,7vw,96px); Certificates/Gallery/etc xl:text-[9rem] | Agree 2–3 named variants; 320 px content/translated clusters must remain readable. PUB-016 |
| Hero subtitles | 18–22px | Home clamp(15px,1.2vw,17px); many metadata strips 12–14px uppercase | Separate actual explanatory subtitle from small metadata. PUB-014 |
| Breadcrumbs | Consistent navigation/link language | Products 14px medium; other pages 12px uppercase tracking-widest; no common breadcrumb nav primitive | One compact public breadcrumb; links keep visible focus |
| Section widths | 1280 max / 1200 content | container-premium max1280 padding clamp(24,5vw,80); many container+px-6/md:px-12/lg:px-24; legal max-w-3xl with large inset | Use shared container plus intentional reading-width variant |
| Section spacing | 120 desktop / 64 mobile | section-py fluid64–120; many py-20/lg:py-28 (80/112), py-24/lg:py-32 (96/128), p-10/lg:p-16; repeated mb-10 rules | Map a small spacing scale and compact mobile hero; preserve intentional breathing room |
| Cards | 12px radius, soft shadows, subtle lift | card-premium reused; Downloads duplicates full custom style; Gallery rounded-lg and 8px gaps vs 24/32px list gaps | Public Card base with gallery/media variant; avoid a generic all-purpose framework |
| Product cards | 24–28 title, description, visible Details | text-base 16px title, text-sm14 description, 12px SKU, opacity-0 Details; 4:3 cover images | Accessible named Details, visible on touch; approved exact photos; preserve separate carousel |
| Category controls | Consistent selected and focus state | Products pill classes+aria-pressed; other pages underline/category bars; global reset makes many buttons square | Allow explicit pill/underline variants with common semantics and hit area |
| Primary/secondary buttons | 56px/8px/16px | .btn classes match; Home bespoke CTA uses 14px and rounded-md (6px); header call40/44px intentional compact variant | Keep compact-header exception; normalize equivalent body CTAs |
| Link hover | Dark slate underline → red, stronger underline | Generally red brand hover; several text links have no underline; navbar hover turns heading slate | Verify link affordance/focus; do not paint semantic success/error or every icon red |
| Icons | Lucide outline20/24 | Many 12/14/16px arrow/metadata icons; Header and primary UI vary | 20/24 action roles; 14/16 decorative/metadata exceptions |
| Border radius | Card/image12, button/input8, badge pill | Unlayered button inherit overrides Tailwind rounded utilities to0px; .btn rules later restore8px | Correct CSS ownership after approval; verify computed values. PUB-015 |
| Shadows | Shared diffuse tokens | Shared --shadow-* exist; Home/chat red glow and drop-shadow-2xl diverge; shadow-design-xl referenced but not defined | Reuse existing tokens; owner reviews intentional accent exceptions |
| Forms | 56px, 8px, 16px mobile, 2px focus | Contact rounded bordered; Careers underline rounded-none/outline-none; newsletter no visible persistent label | Shared public Field styling+associated label/error; compact newsletter variant |
| Header offsets | Approved112px narrow;72px base/64 scrolled wider | Public roots pt112/sm72; sticky filters top112/sm64 | Preserve approved pattern; use one offset contract; verify settled state, real keyboard and text zoom |
| Images | Bright, high quality, accurate | Exact paths1–3 but SKU1 mismatch; 18 random products; gallery placeholders; dark category art; 220px certificates | Media provenance and per-role contain/cover rules before cosmetic edits |
| Motion | 200–350ms, restrained; user control | Numerous 0.6–1.8s entrances, 2.5s counters, fixed3.4s preloader,5s hero rotation | Owner-approved shorter motion; pause/reduced-motion; no unsupported conformance claim |
| Footer | White, thin border, readable15px | Overall matches; newsletter Join inert, social links #/unnamed; contact values plain text;10–12px labels | Keep structure; make availability and actions honest |
| Dark accents | DESIGN says never dark | Many bg-modina-heading CTA bands + black/red product artwork exist in approved UI | Explicit exception decision before broad restyling. PUB-039 |

## Minimal future reusable public system

Use the existing theme and CSS base; define only PublicContainer/ReadingContainer, PageHero (2–3 variants), SectionHeading, Button/Link variants, Card/MediaFrame, FilterButton, Field, and one accessible Dialog/Drawer primitive. Keep Navbar composition intact. Do not pull in Admin components or create a new UI package merely for a few class strings. A package can follow later when a second real consumer exists.

Typography exceptions on very small screens should be documented by role, not forced to fixed design dimensions. Bengali script already uses grapheme segmentation on About and locale font synchronization; preserve those mechanisms. Native-reader review remains necessary.

See [ISSUE-REGISTER.md](ISSUE-REGISTER.md) for exact source lines/reproduction and [RESPONSIVE-QA-MATRIX.md](RESPONSIVE-QA-MATRIX.md) for measurement limits.

