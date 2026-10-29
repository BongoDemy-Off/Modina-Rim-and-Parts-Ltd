# Public placeholder, media and credibility inventory

No image was replaced or edited in application source. Contact sheets under evidence are audit-only thumbnails. [asset-metadata.json](evidence/asset-metadata.json) inventories 51 local image/video/font files, dimensions, bytes and SHA-256. Local storage totals 81.38 MB including duplicate masters and fonts; public/ media totals 41.81 MB. These are on-disk totals, not per-visit transfer. XLS is a source business asset, not a rendered public image, and was not interpreted.

## Complete mapped public media groups

| Location | Actual source / count | Classification and action |
|---|---|---|
| Product IDs1–3 | /products/sku-001..003/{01-product.png,02-engineering.jpg,03-assembly.png}:9 assets | All exist; first product mismatches its bearing/racer name; IDs2/3 visually match stand family, but exact identity/engineering accuracy/provenance need client approval |
| Product IDs4–21 |18×3 generated Picsum URLs:54 slots; card600×400, drawer800×600 | Confirmed random placeholders; no exact local mapping. Per-SKU proposal is in CSV |
| Home hero | /hero_products.jpg,/hero_rims.jpg,/hero_cng_parts.jpg,/hero_hardware.jpg,/hero_bicycle.jpg | Local staged/composite product illustrations. Rights/authentic exact-product status unverified. Approximately0.52–0.75MB each; display object-contain; actual first hero is not lazy-loaded |
| Home category artwork | Premium Rims.webp,CNG Rim.webp,cat_motorcycle_parts.webp,wasar.webp | Local black/red art; MOTORCYCLE category uses alloy-wheel artwork while description promises stands/guards/handlebars. It can be family/editorial art only after approved meaning/caption |
| Home/About facility video | State of the Art Facility.webm:1.166MB | Autoplay muted loop, no controls or explicit defer/preload strategy; actual factory identity unverified. No physical-facility claim can be inferred from polish |
| About company/leader | company.webp; Md. Faruq Hossain.webp | Real local files; strongly styled imagery. Could be generated/composited, but generation method is not proven from pixels. Client verifies identity, rights and documentary accuracy |
| About other leaders | picsum.photos/seed/leader-02/400/500 and leader-03 | Confirmed placeholders under named people; replace with approved portraits or honest unavailable state |
| Mission leader | picsum.photos/seed/mission-leader/900/700 | Confirmed placeholder; no documentary leadership inference |
| Sustainability pillars | sustain-env,sustain-people,sustain-community:3 Picsum seeds | Confirmed placeholders; approve genuine context or labelled conceptual illustrations |
| Sustainability environment / CSR | factory-green/900/700 plus csrmodina0..2/800/600 |4 Picsum placeholders with real-world claims; client replacement/provenance required |
| Gallery |15 source URLs listed below | All random placeholders; first Factory Floor is a beach in rendered evidence; lightbox requests alternate sizes |
| News |news-featured/900/700; news-01..08/600/400, detail1200/700 |9 conceptual slots; random scenery, not evidence of actual events. Featured destination mismatch and item7 name conflict must be resolved separately |
| Blog |blog-featured900×700/detail1200×700; blog-01..09 list600×400/detail1200×700 |10 conceptual slots; use licensed labelled editorial visuals. Do not imply random photos show Modina capability |
| Testimonials |3 images.unsplash.com portraits listed in Home.tsx | Stock remote portraits under named customers/companies; consent, identity and exact testimonial wording unverified |
| Quality certificates |src/assets/ISO/Certificate*.png (3 imported assets) | Exact byte duplicates of public/iso variants; about1.7–1.8MB each; role uses contain |
| Certificates |/iso/iso-9001.png,/iso/iso-14001.png,/iso/iso-45001.png | Scans exist. Inspected9001 entity/date discrepancy; all validity/scope require current issuer/client evidence; do not alter scans |
| Navbar/Footer Logo |src/assets/logo.png:47,975 bytes |Actual visible logo; alt exists. Preserve approved mark; no counterfeit regeneration |
| Favicon |public/logo.jpg:7,935,555 bytes,12500×12500 |Oversized icon source; exact source master duplicate. Optimize derivative later; preserve master |
| OG/Twitter share |public/hero.jpg:8,607,874 bytes,6272×2688 |Generic heavy social image; exact source Hero Image.png duplicate. Not the rotating Home hero image |
| Other public assets |hero.jpg,cat_*.jpg/.png and logo.jpg all recorded in metadata |Presence alone is not proof of current rendering. Match references before pruning; no asset removed |
| Fonts |Two served Unicode TTFs and bundled ANSI source fonts; Google Manrope/JetBrains CSS import |Regular Bengali140.72kB/Italic80.61kB output; Latin third-party dependency; verify actual loaded glyph fonts and license before subsetting |

## Gallery source list

| ID | Caption / category | Source |
|---|---|---|
| 1 | Factory Floor Overview / Facility | https://picsum.photos/seed/gal-factory-01/1200/800 |
| 2 | CNC Machining Centre / Machinery | https://picsum.photos/seed/gal-cnc-01/600/800 |
| 3 | Rim Production Line / Production | https://picsum.photos/seed/gal-rim-line/600/600 |
| 4 | Quality Inspection Station / Quality | https://picsum.photos/seed/gal-qa-01/600/600 |
| 5 | Raw Steel Inventory / Materials | https://picsum.photos/seed/gal-steel-01/600/600 |
| 6 | Heat Treatment Furnace / Machinery | https://picsum.photos/seed/gal-furnace-01/1200/600 |
| 7 | Finished Rim Stacks / Products | https://picsum.photos/seed/gal-rims-stacked/600/800 |
| 8 | Powder Coating Bay / Production | https://picsum.photos/seed/gal-coating-01/600/600 |
| 9 | ISO Audit Documentation / Quality | https://picsum.photos/seed/gal-iso-docs/600/600 |
| 10 | Worker Safety Training / Workforce | https://picsum.photos/seed/gal-safety-01/600/600 |
| 11 | Dispatch & Logistics Bay / Facility | https://picsum.photos/seed/gal-dispatch/1200/600 |
| 12 | Precision Measurement Lab / Quality | https://picsum.photos/seed/gal-lab-01/600/600 |
| 13 | Spoke & Hardware Assembly / Production | https://picsum.photos/seed/gal-assembly/600/800 |
| 14 | Company Entrance — BSCIC / Facility | https://picsum.photos/seed/gal-entrance/600/600 |
| 15 | Export Packaging Station / Production | https://picsum.photos/seed/gal-pack-01/600/600 |

## Product replacement mapping proposal

The CSV has one row per all 21 records, including three carousel slots each, real-file status, alt/crop/editing assessment and approval needs. SKU is a derived display identifier, not an independent SKU field in public data. IDs2/3 may retain current stand imagery only after exact identity and diagram approval. ID1 must wait for the bearing/racer versus frame decision. IDs4–7 need exact foot-rest/handlebar/guard photos, IDs8–19 their respective rim variants, ID20 the correct spoke and ID21 an approved washer. Existing wasar.webp/CNG Rim.webp/rim art are only candidate representative family media; never claim them as exact variants without approval. Genuine exact images can have background cleanup, exposure/lighting consistency, standardized canvas and optimized exports, while preserving geometry, holes, welds, materials and visible marks. Use contain for annotated diagrams; reserve cover for approved editorial photography.

## Client verification register

| Subject | Evidence / conflict | Required decision or document |
|---|---|---|
| Legal entity and ISO scope |9001 image names Modina Metal Industries; website uses Modina Rim & Parts Ltd.; recertification due09 April2026 |Entity relationship, current certificates/surveillance, scope and permission. No invalidity determination made |
| Phone/email/address/hours |Header +8801321234510 vs +8801234567890 elsewhere; two explicit office placeholders; sales/careers emails not tested |Authoritative sales/support/careers contact register and verified map pin |
| Testimonials |Three quotes, named companies/roles and Unsplash portraits |Exact approved quotes, identities, portrait rights and publication consent |
| Product identity/specifications |SKU1 mismatch; generic ISO/In Stock/MOQ50–100/lead time3–5 and tolerance±0.01 applied broadly |Per-product identity, materials, compatibility, tolerances, availability terms and commercial wording |
| Manufacturing and company statistics |2010,15+years,21+,150+people,capacity,testing and delivery assertions |Dated evidence and approved units/scope; distinguish brand families from catalogue categories |
| Export/CSR/environment |Milestones and News claims;30%waste reduction,200+lives and2030target |Approved event/evidence sources; do not convert targets into achievements |
| People |About named leadership vs News7 contradictory MD identity |Client-approved roles/names and portraits |
| Download resources |11 metadata records, no files; Home summary does not establish matching actual documents |Approved filenames, versions, public rights and real content; especially internal QC/CAD/legal documents |
| Policies and analytics |January2026 legal copy; G-XXXXXXXXXX placeholder analytics |Owner/legal review of factual practices and analytics intent; legal adequacy not assessed |
| Production domain |www.modinarim.com canonicals vs Vercel/Netlify references |Approved canonical origin and future preview policy; no hosting changes in this audit |

These are verification requirements, not assertions that all company claims are false. No people or certifier were contacted.

## Gemini illustration opportunities (proposal only)

Appropriate: visibly labelled conceptual metallurgy/process diagrams, generic editorial backgrounds for engineering articles, or neutral category illustrations. Inappropriate: invented exact-product engineering views, fake workers/factory interiors presented as Modina, customer portraits, certificate scans, material claims or logos. Genuine client photography remains the preference for factual manufacturing and product presentation. No generative tool was used for this audit.

