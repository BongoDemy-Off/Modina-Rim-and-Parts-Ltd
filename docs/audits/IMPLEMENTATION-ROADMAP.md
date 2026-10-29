# Proposed public UI/UX implementation roadmap

**Not authorized implementation.** Preserve approved routes, red/light identity, Manrope, Bengali font registry, public functionality and the narrow-phone two-row header. No Admin/CMS/backend work belongs in these batches. Estimates exclude content waiting and actual delivery integration.

| Batch | Scope / issues | Effort estimate | Exit evidence / approval boundary |
|---|---|---|---|
|0 — Review and content truth|Owner reviews audit; approves SKU identity/media, contact register, certificates, domain, testimonial/spec claims; resolve old architecture proposal conflicts|Client-dependent;1–2days to organize|Signed-off content/status register; no replacement fact invented|
|1 — Public interaction/accessibility foundation|PUB-006–010,011,015,030–032,037,040: keyboard triggers, one accessible overlay, labels, enquiry subject, button reset, naming/state and touch Details cue|3–5engineering days|Keyboard walkthrough, axe before/after,320/390/768/1440 screenshots; preserve approved navbar layout and all existing working product/filter/carousel flows|
|2 — Honest enquiry/download presentation|PUB-004–005,022,041: show actual availability, verify tel/mail links, map approved real files; keep local-demo truth visible until separately authorized delivery|1–2days after content|No false sent/received success, inert enabled action or misleading file promise; no real notifications during QA|
|3 — Product and credibility media|PUB-001–003,021,023,026,034,036: approved SKU mapping, current document evidence, loading/error states, legible certificate view and responsive derivatives|2–4days after assets|21-row mapping signed off; all photos/claims accurate, master assets preserved, no physical geometry changed|
|4 — Typography and mobile hierarchy|PUB-012–017,035,038–039: approved translation, readable type, contrast, shared hero/container variants, explicit light/dark exceptions|2–4days plus translation review|Before/after all-route screenshots; true native zoom/reflow, native Bengali-reader review; no new overflow|
|5 — Public SEO and measured loading|PUB-018–020,024–029,033: metadata ownership, featured link/content conflict, code splitting/media budgets, reduced-motion/pause, exact search intent|2–4days; static generation separately scoped|One correct metadata set/route; approved canonical/sitemap; repeat lab runs and deployment verification; no fabricated INP|
|6 — Later full-stack monorepo|Architecture decision and API/content contracts; future workspace apps/web+apps/api if approved; optional shared/config only as used|Separate estimate after architecture review|UI batches can ship independently; migration proves identical public screenshots/URLs and build portability|

## Recommended first engineering batch

Start with Batch1 in a new explicitly authorized change: preserve the current visual concept while making navigation/cards/overlays keyboard usable, giving forms correct labels, fixing the product-enquiry subject and the button-radius cascade, and showing Details on touch. Add no backend. This batch provides a small public component foundation for later media/typography work. Batch0 fact collection can proceed in parallel as business work, so engineers do not invent assets or rewrite claims.

## Regression checklist for every later batch

1. Record starting Git revision and pre-existing changes; preserve hashes; restrict writes to approved scope.
2. Existing npm run lint and npm run build must pass; check actual process exit codes. No dependency change without separate justification.
3. All19 route patterns and valid/missing detail states render at320,360,375,390,430,768,1024,1440; no document overflow or clipped essential text; retain intentional inner scrollers.
4. Product search/category/query links, empty reset,9/9/3pagination, image arrows/dots, modal close, enquiry prefill and approved downloads remain correct.
5. English/Bengali switching persists, translated labels fit, font/line-height reviewed by a native reader; no language mismatch left unmarked.
6. Keyboard reaches desktop dropdowns/cards, focus stays in modal, Escape/close restores opener; menus announce state; targets and focus indicators are usable.
7. axe A/AA tagged scans include open overlays, contrast calculation is verified manually, and a native screen-reader pass follows. Automated score alone is not conformance.
8. Native200% text zoom and320 pxreflow plus at least a second engine and physical Android/iOS keyboard checks remain release gates.
9. Performance budgets use repeatable production-build mobile lab runs; verify compression and image sizes on actual deployment; obtain field75th-percentile CWV when available.
10. No real enquiries, job applications, newsletter messages, calls or chatbot API requests in UI QA; use an explicitly approved sandbox for future delivery tests.

No changes in this roadmap have been implemented.

