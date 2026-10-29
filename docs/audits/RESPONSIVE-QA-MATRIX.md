# Responsive QA matrix — 27 October 2026

Chromium 156.0.8078.48, Playwright 1.62.1, local production preview 127.0.0.1:4173. CSS viewports, no physical devices. Main sweep hasTouch=true/isMobile=true, English; viewport heights 844px below 768 and 900px otherwise. Font/image availability and motion can change with remote latency.

| Route | 320 | 360 | 375 | 390 | 430 | 768 | 1024 | 1440 |
|---|---|---|---|---|---|---|---|---|
| / | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 |
| /about | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /mission | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /sustainability | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /products | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /quality | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /certificates | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /downloads | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /news | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /news/1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 |
| /news/invalid | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /blog | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /blog/1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 |
| /blog/featured | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 |
| /blog/invalid | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /contact | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /gallery | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /careers | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /faq | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /privacy | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /terms | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow | No document overflow |
| /audit-missing-page | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 | No document overflow / multi-line H1 |

## Interpretation and additional coverage

- 176/176 main states had scrollWidth equal to innerWidth. This establishes a useful layout baseline, not a claim that every text run, sticky position or control is accessible. Intentional inner scrollers in filters, stats and timelines remain; off-screen children in those scrollers are not document overflow defects.
- 22 Bengali 390 px initial states also had no document overflow. Longer Bengali menu/content states still require translated-content and native-reader review.
- Additional Home/Products/Contact/Gallery sweeps ran at 639,640,767,769,1023,1279,1280,1920 plus landscape 667×375 and 844×390 (40 states). Initial header transition values in that raw sweep are not settled-height defects.
- Product drawer was captured at 390×844. Additional drawer-size attempts did not complete: focused-results.json and final-browser-*-run.txt retain the timeouts. No multi-size drawer pass is claimed. A timeout is not proof of a product defect.
- Chat UI was opened at 667×375; input remained inside the viewport. Real software keyboard, collapsing browser chrome, iOS safe areas and physical one-handed use remain untested.
- A text-only enlargement approximation doubled computed fonts/line heights at 390 px; document grew to 417px. This is a suspected enlargement risk requiring native 200% text zoom; it is not a confirmed WCAG 1.4.4/1.4.10 failure. Default 320 px reflow passed the document-width measurement.
- Mobile two-row header at <640px and one-row larger header are approved and retained. No evidence warrants replacing that pattern.
- Touch product Details cue is hidden (PUB-040), small Home dot hit areas need review (PUB-031), and modal keyboard/background behaviour fails (PUB-008). These matter despite no default overflow.
- Secondary-page task access needs owner review: Products search roughly y=689 / first card y=860; Contact form roughly y=974 at 390 px. This is measured UX friction (PUB-017), not arbitrary removal of premium whitespace.

Evidence: [route-results.json](evidence/route-results.json), [interaction-results.json](evidence/interaction-results.json), [locale-results.json](evidence/locale-results.json), [focused-results.json](evidence/focused-results.json). Native zoom, screen reader and second-engine checks remain release gates.

