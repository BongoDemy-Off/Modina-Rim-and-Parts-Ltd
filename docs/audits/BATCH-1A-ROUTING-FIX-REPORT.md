# Batch 1A.1 — public SPA routing correction

27 October 2026, Asia/Dhaka. **Local correction ready for review; live deployment verification pending.** No deployment or remote-setting change was made.

## Issue and cause

The accepted Batch 1A evidence showed that Home → Products worked through client navigation, while directly requesting or refreshing nested paths returned platform 404 pages. Fresh read-only checks at approximately 18:24 Asia/Dhaka reproduced **Home 200, Products 404, Gallery 404 on both Vercel and Netlify**. See [live-status.json](evidence/batch-1a-routing/live-status.json) and the preserved acceptance `host-routing.json` / `host-status.json`.

Confirmed local findings:

- `src/App.tsx` uses React Router `BrowserRouter`, with public routes and a separate sibling `/admin/*` route tree.
- Resolved Vite configuration is `appType: spa`, `base: /`, `publicDir: public`, `build.outDir: dist`, `copyPublicDir: true`.
- Workspace inspection found no `vercel.json`, `vercel.ts`, `netlify.toml`, root/public `_redirects`, provider-link metadata or existing hosting rewrite rules before this change. No backend/API route implementation or provider function routing was found.
- Local `origin` is `https://github.com/BongoDemy-Off/Modina-Rim-and-Parts-Ltd.git`; branch is `main`, tracking `origin/main`, at `855c1a2c2866308be0bfd7bd04a9f2b50b88ed0e` plus the accepted uncommitted Batch 1A work.

Missing SPA fallbacks are a **confirmed repository gap** and explain the observed server/client distinction. Their absence in the deployed configuration remains a likely cause, rather than a proven remote-settings diagnosis: provider CLIs, linked-project files and connected provider tools were unavailable. The deployments' actual repository, branch, root, build command and publish-directory settings could not be authenticated or independently verified.

## Exact configuration changes

Only two deployment configuration files were added; no existing rule was overwritten:

| New file | Content / purpose |
|---|---|
| [vercel.json](../../vercel.json) | Root configuration containing the official SPA rewrite: source `/(.*)` → `/index.html`, plus the official schema URL. No build, header, redirect or security settings were added or replaced. |
| [public/_redirects](../../public/_redirects) | One non-forced rule: `/* /index.html 200`. Vite copies it to `dist/_redirects`, the root of the intended Netlify publish directory. |

The Vercel rule follows its [Vite SPA guidance](https://vercel.com/docs/frameworks/frontend/vite#using-vite-to-make-spas). Vercel documents filesystem precedence before these [rewrites](https://vercel.com/docs/project-configuration/vercel-json#rewrites). Netlify documents the same fallback and default static-file shadowing in its [SPA rewrite guidance](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/). Neither rule is a browser redirect: the original public URL and its query string remain available to React Router. Existing published files take precedence over the fallback. No backend endpoint was changed or invented.

## Local verification

Evidence is confined to [batch-1a-routing](evidence/batch-1a-routing/). **These are local configuration-driven rule models, not Vercel/Netlify CLI emulators.** Each reads the actual configuration or published `_redirects` file, serves existing build files first, and applies its SPA fallback to remaining paths. A no-fallback control returned Home 200 and Products/Gallery 404, reproducing the relevant failure mechanism. This does not prove provider deployment behavior.

The completed [final routing suite](evidence/batch-1a-routing/final-routing-results.json) passed **35/35 cases, exit 0**, using bundled Playwright/Node 24.19.0 and installed Chrome 156.0.8078.48. Owned browser and all local model servers closed normally. Zero JavaScript page exceptions were recorded.

Both configurations passed direct loading and browser refresh for all twelve URLs below — **48 document-load checks** in total:

```text
/
/about
/products
/products?category=Rims
/gallery
/contact
/contact?product=Box%20Frame%20Bearing%20%26%20Racer%20(Black%20Blue%20%26%20Red)
/news/1
/blog/1
/blog/featured
/faq
/routing-acceptance-unknown
```

`Rims` and the product name were verified against existing catalogue data. Product enquiry subject/message and query values remained accurate after direct load, refresh and client navigation. Real Home/Products/About/category links, browser Back/Forward and product-drawer enquiry navigation passed; the client-navigation/history group issued no new main-document request.

Static checks verified **43 built files per configuration, 86 responses total**, including JavaScript, CSS, images, fonts and media. HTTP status, content type and SHA-256 bytes matched the actual files, with filesystem handling rather than SPA substitution. `public/_redirects` and `dist/_redirects` matched byte-for-byte. Per-file results are recorded in the suite JSON.

Batch 1A sanity checks passed independent carousel/Details actions, product/Gallery/Careers opening and Escape/focus restoration, enquiry route cleanup, and Bengali 320px touch-menu navigation with no lingering scroll lock. Admin verification stopped at the route boundary: `/admin` loaded `.admin-root` without the public layout. **No Admin controls or business workflows were exercised.** The complete prior 64-case accessibility suite was not rerun for this configuration-only change.

The initial run was **27/35, exit 1**, retained in `routing-results.json`, `routing-run.txt` and `first-routing-runner.cjs`. Six assertions encountered the already registered **PUB-018 empty article document titles**; prior audit evidence confirms the same empty titles with correct visible headings. Final route assertions verify the actual article headings and explicitly record unchanged metadata observations. Two test waits inspected a category link before Home rendering completed; waiting for the Home page before selecting the link resolved them. No title or animation behavior was changed, and the initial failures are not relabelled as passing.

| Required command | Actual result | Evidence |
|---|---|---|
| `npm.cmd run lint` | **Exit 0**, TypeScript `tsc --noEmit`, not ESLint | `typecheck.txt` |
| `npm.cmd run build` | **Exit 0**, existing large-chunk warning remains | `build.txt` |
| `git diff --check` | **Exit 0**, existing LF/CRLF notices only | `diff-check.txt` |

## Remaining risks and deployment requirements

- **The production sites still return 404 because this correction has not been deployed.** The live URLs were not repaired or claimed verified. Model tests and successful Vite builds cannot establish deployed provider settings or CDN behavior.
- Separately authorized deployment must include the accepted Batch 1A working-tree changes and these configuration files. Confirm each provider's connected repository/branch and repository-root directory; use the Vite build (`npm run build`) and **`dist`** output/publish directory. Vercel must read root `vercel.json`; Netlify must receive `dist/_redirects`.
- After deployment, rerun the public URL matrix, refresh/history/query checks and static-asset requests against each actual host. Review any provider-only rules not visible in this checkout before deployment.
- The fallback returns **HTTP 200 for an unknown URL**, after which the existing client NotFound page renders. This corrects deep linking; it does **not** implement server-side 404 semantics, SSR, SEO metadata fixes or real API routing. Missing file URLs can also reach a broad SPA fallback; existing real assets retain filesystem precedence.
- PUB-018 article metadata, PUB-004 form delivery/fake-success and PUB-005 downloads remain open. No forms, applications or other business transactions were submitted. No Batch 1B work began.

## Git status and preservation

Starting inventory was verified as **241 tracked files, 8 existing tracked modifications, and 396 untracked files**. A SHA-256 baseline covered all **637 existing files** before writing new configuration. [Preservation results](evidence/batch-1a-routing/preservation-results.json) verify every baseline file unchanged and present, including the repaired PublicModal, all existing reports/evidence, Admin/CMS, product data/media, manifests and lockfiles.

The [full final Git status](evidence/batch-1a-routing/git-status-final.txt) lists every path. Existing tracked modifications remain limited to Navbar, ProductImageCarousel, index.css, Layout, Careers, Contact, Gallery and Products; their contents were not changed in Batch 1A.1. New paths are restricted to `vercel.json`, `public/_redirects`, this report and the routing evidence directory. Branch, commit and index are unchanged. No reset, destructive cleanup, blanket staging, commit, push, deployment, dependency installation, architecture change or remote hosting mutation occurred.

Final inventory: **8 existing unstaged tracked modifications and 417 untracked files** (396 preserved + 21 new); no staged changes.
