# Batch 2B evidence index

Use the [implementation report](../../BATCH-2B-IMPLEMENTATION-REPORT.md) for conclusions and limits. This directory preserves unsuccessful attempts as well as corrected results. A filename containing `final` alone is not proof of acceptance; use the receipt and selections below.

## Preservation and reproducibility

- [Starting working tree and SHA256 manifest](baseline.json): 1,466 original files, including all 1,225 original untracked files.
- `before-source/`: independent copy of the actual original public source/assets and configuration, not a clean HEAD checkout. [Public asset fixture verification](baseline-public-assets.json) records the corrected 25/25 HTTP byte comparisons.
- [Preservation assertions](preservation.cjs), [latest proof](preservation-results.json), [complete final Git status](git-status-final.txt).
- [Application hashes](final-application-hashes.json), [tested production-build hashes](tested-build-hashes.json), [command exit receipts](command-results.json).
- [Consolidated final validation](validation-summary.json): all required results and unchanged tested source/build hashes. The first driver's aggregate exit 1 is retained for its fixture-navigation timeout; the [isolated rapid-reopen rerun](race-rerun-command.json) exited 0 with all 40 cycle assertions unchanged.
- `final-qa.ps1` runs typecheck/build, accepted regression/lifecycle/race/touch/settled-axe suites, production query verification, the full responsive sweep, diff and preservation checks. Preview processes are loopback-only, strict-port, owned and stopped by their runners. No deployment is involved.

## Selected matched comparisons

Viewport, locale, content and interaction state are matched. Page entry captures use scroll zero. Detail captures walk through the section to trigger entrances, return to the same section anchor, poll visible ancestors/geometry, then capture raw browser pixels. The header stays present. Production animations are not globally disabled. Earlier offscreen/transparent Motion captures are incomplete, not evidence of design whitespace.

| Subject | Before | After |
|---|---|---|
| Products, 390 EN | [before](before-products-390-en-hero.png) | [after](group1-review-products-390-en-hero.png) |
| Contact, 390 EN | [before](before-contact-390-en-hero.png) | [after](group1-review-contact-390-en-hero.png) |
| Careers, 390 EN | [before](before-careers-390-en-body.png) | [after](group2-review-careers-390-en-body.png) |
| Home, 390 EN | [corrected baseline](before-home-corrected-home-390-en-hero.png) | [after](group3-review-home-390-en-hero.png) |
| Home, 1440 EN | [corrected baseline](before-home-corrected-home-1440-en-hero.png) | [after](group3-review-home-1440-en-hero.png) |
| About timeline, 390 EN | [before](before-about-390-section.png) | [after](after-about-390-section.png) |
| Mission values, 1440 EN | [before](before-mission-1440-section.png) | [after](after-mission-1440-section.png) |
| Sustainability pillars, 390 EN | [before](before-sustainability-390-section.png) | [after](after-sustainability-390-section.png) |
| Quality process, 390 EN | [before](before-quality-390-section.png) | [after](after-quality-390-section.png) |
| Certificates, 1440 EN | [before](before-certificates-1440-section.png) | [after](after-certificates-1440-section.png) |
| Product drawer, 390 EN | [before](before-products-390-drawer.png) | [after](after-products-390-drawer.png) |
| Gallery lightbox, 390 EN | [before](before-gallery-390-lightbox.png) | [after](after-gallery-390-lightbox.png) |
| FAQ expanded, 390 EN | [before](before-faq-390-faq.png) | [after](after-faq-390-faq.png) |
| Contact dark CTA, 1440 EN | [before](before-contact-1440-cta.png) | [after](after-contact-1440-cta.png) |
| Contact footer, 390 EN | [before](before-contact-390-footer.png) | [final after](footer-final-after-contact-390-footer.png) |
| Contact footer, 1440 EN | [before](before-contact-1440-footer.png) | [final after](footer-final-after-contact-1440-footer.png) |
| News, 390 EN | [before](before-news-390-en-hero.png) | [after](group6-review-news-390-en-hero.png) |
| Privacy, 390 EN | [before](before-privacy-390-en-body.png) | [after](group6-review-privacy-390-en-body.png) |

The final entry-review receipts are `group1-review-results.json` through `group6-review-results.json` (88 total observations). Additional accepted sets: [40 section/overlay captures](details-final-results.json), `before/after-bn-wide-results.json` (four each), `before/after-tablet-results.json` (five each), [final story insets](story-inset-final-results.json) and [final footer pair](footer-final-results.json). Bengali mobile screenshots are included in each group; the wide supplement covers Home/About/Products/Contact at 1440px. The 352-state sweep records DOM/overflow observations, not 352 claimed manual visual approvals.

## Focused behavioral receipts

- [Exact-product queries, dev](query-checks.json): 49 checks; production rerun is `production-query-checks.json`.
- [Layout/skip/anchors/FAQ](layout-release-checks.json): 15 checks.
- [Intro](intro-final-checks.json): four checks, actual timings retained.
- [Hero rotation](motion-final-checks.json): seven checks, three actual timer callback timestamps. Hidden-document fallback is explicitly synthetic when native headless visibility does not change.
- [Video](video-release-checks.json): four controller/event checks, not physical native-control testing.
- [Enlarged text](text-corrected-checks.json): 20 checks, CSS root-font approximation and long Bengali fixture; no native-zoom claim.
- [Hero touch](home-touch-final-checks.json): four checks.
- [Short Careers drawer](short-careers-final-checks.json): three checks.
- [Long lightbox captions](caption-final-checks.json): two checks.
- [Additional accessibility](accessibility-final-checks.json): eight scoped axe scans and two missing-detail H1 checks.
- Complete accepted-suite receipts are `production-regression-results.json`, `lifecycle-results.json`, `race-results.json`, `touch-results.json`, `settled-a11y-results.json`; full responsive receipt is `sweep-results.json`. Consult command exits and completion fields, not partial logs.

## Retained incomplete/failed attempts

Initial `before-home-*` captures used a wrongly nested public fixture. They are superseded by `before-home-corrected-*`; they must not be used for visual comparison. The corrected fixture bytes were verified before recapture. Initial concurrent/HMR captures and `partial-*`, `group1`, `group2-final`, `group3-final`, `group4-final`, `details-results.json` and early Home attempts contain incomplete or superseded states. The original query focus race, intro deadline failure and enlarged-text failures led to implementation corrections. The first motion observation ended before three callbacks and was replaced with timestamp-based observation. Keep these receipts to explain the correction history, not as final acceptance.

No real device, native screen reader, native browser zoom, software keyboard or independent engine result is claimed. Native Chrome video playback depends on browser policy and available media/network. Tests block business writes/analytics and do not validate service delivery or production readiness.
