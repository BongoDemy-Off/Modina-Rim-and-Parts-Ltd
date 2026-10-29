# Task 5B — Production architecture, security, SEO and deployment portability

**Proposal for approval — architecture only.** Date: 7 October 2026, Asia/Dhaka. Repository: Modina-Rim-and-Parts-Ltd, commit `855c1a2` (`Complete and freeze admin frontend prototype`). The working tree was clean at inspection. The approved public and Admin designs remain frozen.

This report separates **observed source facts**, **proposed production behavior**, and **client decisions**. None of the architecture described below has been implemented. Only this report is added. No dependencies, application files, environment files, containers, databases, migrations, workflows or deployments are created or changed.

## 1. Executive summary

Recommend the existing React/TypeScript/Vite/Tailwind frontend, a Dockerized NestJS modular monolith with Express, PostgreSQL 18, Prisma 7, REST/OpenAPI, Better Auth with database-backed browser sessions, server-side capability RBAC, S3-compatible storage and an external email/newsletter provider. Generate public HTML at build time and hydrate it with React. Admin remains an authenticated client application; no public Node rendering server is required.

For beginner client staff, managed hosting has the lowest operational burden. Choose a balanced hybrid if existing client infrastructure is suitable and a named operator can maintain it. Self-hosting PostgreSQL is a budget fallback requiring explicit acceptance of patching, backups and restore responsibility. No business module depends on a hosting vendor.

The frontend approval is a visual/UX approval, not production security or SEO readiness. Current output is CSR; language changes do not change URLs; Products uses modal details; forms simulate submission; downloads have missing files; Admin has no enforcement. A browser-side Gemini-key injection path is a production blocker. Resolve these through separately approved production wiring, without redesigning the visual concept.

**Recommended decision: APPROVE AFTER SPECIFIC DECISIONS.** Approve the architecture direction, then resolve the scope and deployment gates in sections 58–59 before implementation/deployment respectively.

## 2. Repository findings

### Architecture and package assumptions

The frontend is at repository root, not in `frontend/`. `src/main.tsx` uses React `createRoot`, StrictMode and HelmetProvider. `src/App.tsx` uses BrowserRouter, eagerly imports public pages and lazily loads `src/admin/AdminRoutes.tsx` as a sibling `/admin/*` route. Public `Layout` owns shared navigation/footer/chatbot; Admin owns its layout and scoped `.admin-root` CSS. No runnable backend, Prisma model, migration directory, authentication or API client was found in application source.

`package.json` has no Node `engines` or runtime pin. Local tools report Node **24.15.0**, npm **11.12.1**. The lockfile resolves React/React DOM **19.2.4**, Vite **6.4.1**, React Router **7.13.1**, Helmet Async **3.0.0**, TypeScript **5.8.3**, Tailwind **4.2.1**. These are observed installed-contract facts, not instructions to upgrade. `lint` is `tsc --noEmit`, not an ESLint run. There is no test script. Existing Express 4.22.1, SQLite, Nodemailer and dotenv dependencies do not establish a backend; do not reuse this frontend package as the Nest runtime.

`vite.config.ts` substitutes `process.env.GEMINI_API_KEY` at build time, and `Chatbot.tsx` constructs GoogleGenAI in the browser. If a real key is supplied, this mechanism exposes it in client assets. No secret value was inspected or printed. Production must move the request behind a server-owned boundary or disable the integration by an approved feature decision.

### Current route inventory

Public URLs are `/`, `/about`, `/mission`, `/sustainability`, `/products`, `/quality`, `/certificates`, `/downloads`, `/news`, `/news/:id`, `/blog`, `/blog/:id`, `/contact`, `/gallery`, `/careers`, `/faq`, `/privacy`, `/terms`, plus wildcard NotFound. Blog supports the literal `featured` identifier as well as numeric-looking string IDs; News uses numeric IDs. Products has no public detail route. Footer/Home category links retain exact query values such as `/products?category=Rims`.

Admin contains dashboard, fixed Homepage editor, collection list/new/edit routes, company singletons, Careers, private-operation detail screens, Website Configuration and governance. Task 4I's eight governance routes are Users list/new/edit, Roles list/new/edit, Activity Log list/detail. Foundation/Newsletter/Media Library remain deferred UI placeholders. No auth route or guard currently exists. Publishing, mutations, uploads and status changes are local demonstrations.

### Domain facts verified from current types/data

| Domain | Current source evidence | Production implication |
|---|---|---|
| Products | 21 records; Motorcycle/Rims/Hardware; SKU, localized name/descriptions, specifications, ordered included media, SEO, featured/status | Keep categories and ordered first-included cover rule; do not turn display availability into inventory |
| Editorial | 10 Blog seeds, 8 News; one block tree with EN/BN text; headings 2/3, paragraphs, quotes, lists, images, dividers; literal month/year | Shared structural blocks and translations; no invented publication day |
| Gallery/Downloads/FAQ | 15 Gallery, 11 Downloads, 18 FAQ seeds | Global Gallery/Downloads order; category-local FAQ order; FAQ plain text |
| Careers/Applications | 4 vacancies; 5 synthetic applications; name/email/phone/cover note and vacancy reference | No CV upload; submitted applicant fields immutable except approved privacy actions |
| Company/Certificates | About/Mission/Sustainability/Quality singletons; leadership slots; 3 certificate records | Fixed content structure and explicit claims/association review |
| Homepage/Testimonials | Seven fixed sections; five Hero slides, four category slots, three Quality cards, four Download summaries, three testimonial slots | Structured configuration, not a page builder; preserve literal metrics and readiness warnings |
| Website/Operations | Typed navigation/footer/contact/SEO/language/site settings; 5 synthetic Contact Messages | Preserve fixed targets, purpose-specific emails and stable subject keys |
| Governance | 26 capability domains, 77 capabilities; 5 roles, 5 synthetic users, 7 synthetic log entries | Retain capability IDs and one-role contract; exclude demo identities/logs from production |

Principal evidence: `src/admin/types/*.ts`, all `src/admin/data/*.ts`, `src/lib/data.ts`, public pages/components, i18n files, router entries, `index.html`, robots/sitemap and existing `dist/index.html`.

Public constants and Admin snapshots are **not automatically equivalent**. Products 20/21 are visible publicly but seeded Draft/Archived in Admin. Admin News bodies are shorter summaries than the public detail bodies. News 7 has different person names in list/detail source. Homepage Download summaries do not map reliably to Downloads. Migration must preserve both source occurrences and obtain decisions; copying Admin mock state alone would change approved content.

## 3. Confirmed stack and version strategy

All approved application defaults remain. No demonstrated incompatibility requires changing them. Pin a tested compatible set during implementation, including Node patch, Nest packages, TypeScript, Prisma CLI/client/adapter, Better Auth and image-processing dependencies. Commit lockfiles; never scaffold from an unqualified `latest` tag.

Prisma's versioned supported-database table explicitly includes PostgreSQL 18, so the approved ORM/database pair has documentation support. This still requires actual migration/query tests on the selected patches. [Prisma 7 supported databases](https://www.prisma.io/docs/orm/v7/reference/supported-databases).

| Component | Verified constraint / candidate | Implementation policy |
|---|---|---|
| Node | 24 is an LTS line; current official download page shows 24.21.0; local is 24.15.0 | Select supported 24.x patch and pin image digest/runtime file after testing |
| Nest | Registry reports 12.1.2; current docs cover Nest 12; CLI on Node 24 requires 24.15+ | Candidate 12.1.x, Express; align core/common/platform/testing major and companion peer ranges |
| PostgreSQL | Official versioning page currently lists 18.6; major 18 is supported | Current supported 18 minor at deployment; verify provider support and upgrade window |
| Prisma | Registry stable 7 candidate 7.10.0; `latest` currently points to 8.0.0-rc.20 | Explicit tested 7.x pins; no Prisma 8 RC adoption |
| Prisma 7 tooling | ESM, explicit generated output, driver adapter, Prisma config, explicit env loading | Backend ESM/NodeNext; standard pg adapter; no provider-specific connection protocol |
| Better Auth | Registry candidate 1.7.7; official Prisma guide uses Prisma 7/PostgreSQL | Exact tested stable version; review security advisories and adapter schema |
| Nest auth wrapper | Community-maintained; current peer ranges accept Nest 11/12, Express 5 and TS 5.9.2/6 | Compatibility gate; avoid blindly inheriting frontend TS/Express versions |

Versions above are observations on the audit date, not a tested production matrix. Registry metadata was retrieved read-only from npm for `prisma`, `@nestjs/core`, `better-auth`, `@thallesp/nestjs-better-auth`, Swagger and Throttler. Official documentation sometimes has different freshness from package tags; implementation must verify package engines/peers together. The backend gets its own toolchain; the frontend stays on its approved lockfile until a separately justified security/compatibility change is approved.

Sources: [Node releases](https://nodejs.org/en/about/previous-releases), [PostgreSQL versioning](https://www.postgresql.org/support/versioning/), [Nest migration requirements](https://docs.nestjs.com/migration-guide), [Prisma 7 upgrade](https://docs.prisma.io/docs/orm/v6/more/upgrades/to-v7), [Prisma 7 system requirements](https://www.prisma.io/docs/orm/v7/reference/system-requirements), [Better Auth Prisma adapter](https://better-auth.com/docs/adapters/prisma).

## 4. Architecture style

Use a modular monolith: one Nest application, one PostgreSQL database and one deployable API image. Modules own services, policies, DTOs and persistence operations. Proposed boundaries: Auth; Governance; Audit; Media; Products; Editorial (Blog/News); Gallery; Downloads; FAQ; Testimonials; Homepage; Company; Certificates; Careers; Applications; Contact; Website Configuration; Newsletter; Publishing; Integrations; Health/Observability.

Shared infrastructure provides database, configuration, storage/email interfaces, validation and request context. Domain modules call interfaces, not another module's tables or provider SDK. Keep public queries separate from Admin commands. A small PostgreSQL-backed delivery outbox handles retryable build/email/provider work after transactions. This is a delivery mechanism, not event sourcing, a CQRS framework or a message broker.

Three to five editors and mostly cached public reads do not justify independent services, network transactions or broker operations. Extract a service only when measured workload, ownership or isolation demands it.

## 5. Proposed repository structure

Keep existing root frontend paths. Add a separately managed `backend/`; do not move `src/` or introduce workspace tooling merely to create a monorepo.

```text
repository/
  src/                    existing public + Admin frontend
  public/                 existing frontend assets
  package.json            existing frontend package
  backend/                independent Nest package and lockfile
    src/{modules,common,config,generated}/
    prisma/{schema.prisma,migrations}/
    test/
    scripts/              bootstrap and reviewed content-import commands
    Dockerfile
    .dockerignore
  scripts/public-build/   static route/data/build orchestration
  deploy/                 provider adapters / reviewed proxy templates
  docs/architecture/      accepted decisions, contracts, runbooks
  .github/workflows/      future CI/CD only after approval
```

No root package restructuring now. Use independent working-directory installs and cache keys. Frontend contract generation writes safe DTO/client types under `src/api/`; never share generated Prisma models with browser code.

## 6. Docker architecture

Use dependency, build and production stages. Prefer a pinned Node 24 Debian slim image initially: predictable native-library compatibility for Sharp and password hashing. Alpine's smaller size does not automatically outweigh native dependency complexity. Run deterministic installs from the backend lockfile, generate Prisma client and compile TypeScript in the build stage; copy only compiled code/generated client and production dependencies into runtime. A distinct migration image/target includes the CLI without requiring it in the web runtime.

Use a non-root UID, exec-form entrypoint, runtime secret injection, bounded memory/CPU, read-only filesystem where compatible and bounded writable temporary space. Exclude `.env`, Git, test artifacts, frontend assets, backups and node_modules from build context. Never inject production secrets into image layers or build arguments. Container logs go to stdout/stderr.

Liveness checks process viability; readiness checks PostgreSQL connectivity and required initialization, not every external email/storage call. Dependency outages must not cause endless liveness restarts. On SIGTERM, stop accepting requests, finish bounded in-flight work, stop delivery polling and close the shared DB pool. Enable Nest shutdown hooks; set a measured termination grace period.

Local development uses PostgreSQL 18 in a future Compose setup, API/frontend dev commands and sandbox email/storage adapters. Production uses the same API image in managed compute or client VPS; persistent DB/object data never lives in the API container. [Docker build guidance](https://docs.docker.com/build/building/best-practices/).

## 7. Deployment abstraction

Vendor-neutral contracts: ordinary PostgreSQL TCP/TLS; OCI image; `ObjectStorage` put/head/get/delete/presign operations; `EmailProvider` transactional delivery; newsletter contact/consent/suppression operations; `AntiBotVerifier`; `PublicDeployment` trigger/status/promote/rollback operations; stdout logs and standard health endpoints. Configuration selects adapters.

Storage URLs are derived from storage key/CDN base, not permanently written as a vendor hostname into content. Auth identities and RBAC remain local. Provider-specific API keys, webhooks, build triggers and deployment rules belong to integration adapters. S3 compatibility still needs adapter contract tests for signatures, range requests, checksums and lifecycle features; it is not a promise of identical provider behavior.

## 8. Managed deployment profile

Static public output on a CDN/static host; Admin static output on an Admin hostname with an API proxy; one always-available container service; managed PostgreSQL 18 in a nearby suitable region; external object storage/CDN; external transactional/newsletter mail; external uptime/error monitoring. Keep API and DB close; test Bangladesh mobile latency rather than choose a region by name alone.

Require managed DB private connectivity or restricted access, supported backups/PITR, export and restore capability, container health checks, secret injection, restart policy and documented limits. Avoid a sleeping free API for production submissions and password reset. Managed services reduce work but do not remove ownership of releases, access reviews, restore drills and cost alerts. Vendor selection remains open.

## 9. Low-cost VPS deployment profile

Internet → DNS/CDN where available → patched Nginx reverse proxy/TLS → Dockerized Nest API on private Docker networking → PostgreSQL managed or local → external object storage/email. Public HTML can be served from Apache/cPanel, Nginx or a static host. Serve actual generated paths; do not blanket-rewrite all public requests to `index.html`.

If self-hosting DB, use a persistent volume and private network; expose no PostgreSQL port to the Internet. Restrict SSH, enforce key-based operator access, review sudo users, patch OS/Docker/PostgreSQL, monitor disk/inodes/WAL, set connection/resource limits and automate off-server encrypted backups with alerts. Validate backups on a second machine. Never mount the Docker socket in the API. Assess container firewall behavior as well as host firewall rules.

A provisional starting evaluation is a Linux VPS with 2 vCPU/4 GB RAM, adequate SSD headroom and backups, but this is not a sizing guarantee. Build frontend/images in CI, not on a small live server. Require a named qualified operator and measured load/restore tests; a paid existing VPS is not free.

## 10. Hybrid deployment profile

Use already-owned static hosting if it supports generated routes, headers, redirects and real 404s; client VPS runs API; managed PostgreSQL handles recovery/patching; external object storage and mail remain separate. This usually gives the best budget/maintenance balance when the VPS is usable.

| Profile | Monthly vendor expenditure | Operations | Backup / patch ownership | Reliability and scaling | Beginner maintainability |
|---|---|---|---|---|---|
| Client VPS + local DB | Potentially lowest incremental spend; VPS, backup and mail costs remain | Highest | Client operator owns OS, Docker, DB, offsite backup and recovery | One-server failure domain; scale manually | Poor without retained technical support |
| Hybrid | Moderate: existing server plus managed DB/storage/mail | Medium | Operator patches API host; DB provider handles platform tasks; project verifies restore | Public site survives API outage; simpler DB recovery | Reasonable with a clear runbook/support owner |
| Managed | Usually higher direct vendor spend | Lowest | Providers run platforms; project owns exports, access and drills | Managed restart/scale options; plan limits still matter | Preferred default |

## 11. Hosting/client-information checklist

Obtain plan names and configuration summaries, **not credentials**: exact Namecheap subscriptions and renewal invoices; domain legal owner/account ownership; registrar and DNS provider; ability to edit DNS; cPanel plan; existing websites/mail/services; VPS CPU/RAM/disk/type/free capacity/bandwidth/static IP/OS/support status; root/sudo availability; Docker permission/support; firewall/network restrictions; backup services, retention and restore evidence; PostgreSQL version/access; TLS certificates/renewal method; mail hosting/mailboxes and sending limits.

Obtain sanitized DNS records for A/AAAA/CNAME/MX/TXT/CAA, SPF/DKIM/DMARC and any CDN/proxy use. Confirm who owns deployment, payments, alerts and emergency recovery. Domain registration, shared hosting, VPS and mailbox hosting are distinct services. No assumption that cPanel hosting supports Docker or PostgreSQL 18 is justified by the repository.

## 12. PostgreSQL architecture

One database per environment, ordinary PostgreSQL 18. Prefer separate application/migration/backup users: runtime has required table privileges but no superuser/schema-altering power; migrations get time-limited elevated rights. Use TLS with certificate verification for network connections; configure CA explicitly, never solve connectivity by disabling validation.

Use stable UUID identities plus unique legacy-source identifiers for migration and unchanged public ID URLs. Store timestamps as timestamptz/UTC; display operating dates in Asia/Dhaka. Preserve year-only and month-only source dates separately from real timestamps. Domain-specific statuses, bounded sort orders, FK constraints, collection-specific slug uniqueness, normalized SKU uniqueness and optimistic version checks prevent invalid writes.

Indexes: status/order for public collections; category/status/order for catalog; unique SKU; editorial route/slug; application vacancy/status/submitted_at; contact status/submitted_at; audit time/actor/resource; session expiry; unique normalized Admin email; outbox available_at/state. Reserve DB connections for migration, backup and administration. Start with a bounded shared pg pool, explicit connection/query timeouts and monitoring; introduce PgBouncer only if measured topology needs it. Do not build provider-specific DB behavior into services.

## 13. Prisma strategy

Use Prisma 7 with `prisma`, client and pg adapter pinned to a tested compatible set. Explicit `prisma.config.ts` supplies CLI connection settings; generated client output is backend-only. NodeNext/ESM configuration must be tested with Nest, decorators and Better Auth. Runtime reuses one client/pool per process; teardown closes it. Driver pool defaults require deliberate configuration. [Prisma 7 upgrade constraints](https://docs.prisma.io/docs/orm/v6/more/upgrades/to-v7).

Prisma migrations own schema changes, including reviewed auth tables. Auth schema generation is reviewed input to Prisma, not a second automatic production migration authority. Use transactions for draft saves, publication/audit/outbox and governance changes. Database uniqueness is authoritative; translate conflicts into safe API errors. Avoid unsafe SQL; use reviewed parameterized SQL migrations for constraints Prisma cannot express. No production `db push` or reset. Version upgrades run integration/restore/migration tests before promotion.

## 14. Complete high-level database/domain map

Names below are **proposed logical tables**, not an implemented schema. Editorial/company fields derive from current source; operational/auth/release fields marked as additions support production behavior.

| Area | Logical entities and fields | Relations / invariants |
|---|---|---|
| Identity | Auth user/account/session/verification/two-factor tables; Admin profile: displayName, normalized email, status, roleId; production security timestamps | One role per Admin; auth-library table contract reviewed; no demo passwords/users |
| Governance | Role: stable key, name, description, systemRole; Capability: stable ID/domain/action; RoleCapability join | Unique IDs; protected system role; no per-user overrides |
| Audit | actorId, action, resourceType/id, occurredAt, outcome, safe metadata, correlationId | Append-only through application permissions; actor history survives disabling; not tamper-proof certification |
| Media | Asset: key, original filename, detected MIME, bytes, dimensions/duration, checksum, visibility, lifecycle, provenance/readiness; Variant | Original/variants distinct; typed usage joins/FKs prevent deletion of referenced media |
| Product | SKU, category, featured, order/version; ProductTranslation: locale, name, short/detailed description, SEO | Draft data separate from published snapshot; legacy IDs preserved |
| Specifications | ProductSpecification: stable key/order/sharedValue; translations for label/value | One shared structure; language-independent values explicit |
| Product media | product/asset association, role, included, order; localized alt | First included ordered item is cover; no orphan asset reference |
| Blog/News | Separate entity classification fields; slug, literal publicationMonth, sourceReadTime; translations title/excerpt/SEO; tags for Blog | News contentType distinct from Blog category; domain-specific warnings/internal review |
| Editorial blocks | Block: parent/type/order/heading level; BlockTranslation; ListItem/translations; image asset/caption/alt | Shared EN/BN structural order; heading 2/3 only; no arbitrary HTML |
| Gallery | category, displayStyle, order, asset; localized title/alt and altSource | Global order; source placeholder/readiness remains separate |
| Downloads | category, format, order, asset version; localized title/description; source size/extent/year labels | Metadata-only records remain missing-file drafts; actual byte size distinct from source label |
| FAQ | category/categoryOrder; question/answer translations | Plain text; category-local ordering |
| Testimonial | order, shared organization, portrait; quote/display attribution/portraitAlt translations; readiness/source review | No invented rating/location/date; attribution not proof of identity |
| Homepage | Typed singleton draft/public snapshot for seven sections; slots/metrics/CTAs/media references; Testimonial selections | No section creation/reorder/page-builder schema; literal metric strings |
| Company | About/Mission/Sustainability/Quality page; localized heading/intro/attribution; ordered source slots/translations, media associations | Keep source-local claim occurrences; do not unify contradictory identities |
| Leadership | About leadership slots: name, localized role, order, portrait | No automatic shared person master linking News/Mission |
| Certificates | title translations, issuer, certificateNumber, source issueDate/optional confirmed date, scan asset, order/status | Immutable scan; association and legal validity unresolved separately |
| Vacancies | department, employmentType, deadline if supplied, status; localized title/location/experience/description; ordered responsibility/requirement items | Draft/Open/Closed/Archived; deadline optional rather than fabricated |
| Applications | vacancy FK, applicantName, email, phone, coverNote, submittedAt, reviewStatus | New/Reviewed/Shortlisted/Rejected/Hired; immutable submission; no CV relation |
| Contact messages | name/company/email/phone, subjectKey, source subject label if needed, message, submittedAt/status | New/Read/Resolved; private; no website visitor CRUD/read endpoint |
| Newsletter | normalized email, consent evidence/version/time/source/locale, subscription state, provider reference/sync state | Proposed launch addition; Pending/Confirmed/Unsubscribed/Suppressed; separate marketing consent |
| Suppression | email matching key, reason/time/provider reconciliation state | Durable prevention of accidental re-subscription; policy-approved minimized retention |
| Navigation | fixed top/child keys, localized labels, target/order, special Contact CTA, fixed controls | Allowlisted route/query targets; not a generic menu builder |
| Footer | typed localized fixed copy/link groups, exact targets, social candidates, purpose-specific contact | Generated copyright year; newsletter presentation separate from delivery |
| Contact page | typed hero/form labels, stable subject keys, contact/map/offices/CTA | Preserve office placeholders and source values in migration review |
| SEO/settings | localized default metadata, public origin, approved social media reference; typed Organization facts; company/site/purpose-email settings | Candidate values do not override unresolved source occurrences without review |
| Languages | locale code/label/direction/enabled; computed per-domain coverage | Existing EN/BN; UI strings remain versioned code; no invented translated coverage |
| Legal pages | source-preserving Privacy/Terms content and approved policy version | Public content exists; no current Admin editor contract; keep code-managed until scope approved |
| Publishing | entity published snapshot, public release manifest/safe dataset, deployment status/pointer; redirect mapping | Proposed production addition; bounded releases for rollback, not enterprise content history |
| Deliveries | outbox kind/resource reference/idempotency key/state/attempt/next time/lease; provider webhook dedup | Proposed reliability addition; no sensitive message body in ordinary job/log metadata |
| Source review | source file/record/field/original value, warning category, review disposition/approved decision evidence | Migration manifest first; only persisted where needed; never universal `verified=true` |

Most draft fields, relations, identities, statuses, ordering and searchable content are relational. JSONB is justified only for schema-validated fixed singleton payloads, safe published DTO snapshots/release bundles, constrained metadata and delivery parameters. Extract media/testimonial references into FK-backed associations even when the presentation payload is JSONB. Distinct statuses remain per domain; no universal status enum.

## 15. Multilingual storage decision

| Pattern | Query/index behavior | Validation / Prisma / API | Completeness / extra languages | Maintenance |
|---|---|---|---|---|
| Translation tables | Strong locale-scoped queries, uniqueness and indexes | Explicit typed rows/relations; flattened localized DTO adapter | Missing locale is explicit; adding locale does not duplicate entity | Best default for collections and shared block trees |
| JSONB localized fields | Expression indexes possible, less straightforward per-field constraints | Ergonomic payload, requires comprehensive server schema checks | Flexible but missing/empty/fallback easily confused | Suitable for small fixed configuration; weak as universal model |
| Hybrid | Relational searchable collections; constrained JSONB fixed configs/snapshots | Clear per-domain rule; small mapping layer | One structural entity everywhere; coverage calculated | **Recommended** |

Default: entity + translation rows keyed uniquely by `(entityId, locale)`. Structural fields, list/block/media order, categories, organization and shared specifications are common. Typed Homepage/Website singleton JSONB is an explicit exception because the approved fixed nested structure is small and rarely queried by subfield. Published DTO snapshots are another exception for immutable builds.

Adapters reconstruct the current `{en,bn}` shape for editors; missing Bengali stays empty/unavailable. Never create two independent entity trees or machine-fill missing translations. Validate locale-specific publication requirements and record genuine coverage. One published edition can contain English only until Bengali content is approved.

## 16. Media/data/document architecture

PostgreSQL stores metadata and references; object storage stores bytes. Estimate 5–50 GB as supplied by the request, not a measured inventory. Public images/videos/downloads can be CDN-served; staging originals, quarantine, backups and any private documents use private access and short-lived authorized URLs. No CV uploads at launch, and emailed CVs stay outside this website data model.

Asset lifecycle: upload reservation → private quarantine → detected-type/size/checksum validation and malware checks where appropriate → image derivatives if allowed → ready → attached/published → retired → approved delayed deletion. Readiness and client provenance are separate from byte presence and publishing. Anonymous submissions accept no files. Admin upload requires the owning domain's edit capability; a generic Media Library capability is not invented.

Certificate originals are immutable documentary assets with checksum and original metadata. No AI alteration, visual rewriting or image pipeline on original scans; optional display thumbnails must be clearly separate assets and approved. PDFs/ZIP retain original bytes; safe Content-Type/Disposition/filename and caching are deliberate. Existing Download labels do not prove the file exists.

## 17. Authentication decision

| Choice | Security / session / MFA/reset | Integration and upgrade risk | Portability / future consumers | Team maintenance | Decision |
|---|---|---|---|---|---|
| Better Auth | Library-supported DB sessions, password/reset and TOTP/recovery features; application still enforces role/MFA policy | Prisma 7 guide exists; Nest integration is community maintained; parser/guard/upgrade tests required | Local identities/DB; browser cookies now, separate mobile flow later | Lowest custom security surface among local options | **Recommend, subject to integration gate** |
| Nest/Passport + custom sessions | Strategies are useful; reset, lifecycle, MFA, recovery, revocation and abuse rules need composition | Fewer auth-package assumptions but much more custom lifecycle/security code | Portable; can support later consumers | Highest long-term implementation and review burden | Reject for v1 |
| Keycloak / external mature identity service | Mature OIDC/session/MFA facilities; requires role mapping | Another managed service or self-hosted identity platform and its upgrades | Federation useful if company identity/SSO exists | Additional operations or provider dependency | Revisit if an existing corporate IdP/SSO requirement appears |

Recommend Better Auth as the identity/session engine, wrapped by an owned Nest Auth module; RBAC remains owned domain policy. Do not equate its optional Admin-role plugin with the 77-capability model. Disable public sign-up and unused social/passwordless methods. The first approved phase must prove Express parsing, auth endpoints, cookies, PostgreSQL schema/migrations, disabled users, immediate revocation, reset and MFA on the pinned stack.

The official Nest guide labels its wrapper community maintained and requires body-parser attention; auth traffic must reach its handler as expected while Nest JSON DTO routes retain explicit size-limited parsing and provider webhooks retain signature-verifiable raw bodies. Prefer the documented wrapper if tests pass; otherwise evaluate a small documented Node-handler mount inside the same Auth boundary before changing auth engines. [Nest integration](https://better-auth.com/docs/integrations/nestjs), [Prisma integration](https://better-auth.com/docs/adapters/prisma).

## 18. Session architecture

Opaque database-backed session identifier in a Secure, HttpOnly, host-only cookie; use `__Host-` prefix with Path `/` and no Domain. Prefer Admin and its reverse-proxied API on one dedicated Admin hostname. Keep approved `/admin/*` paths within that host. Public deployment must not expose an active unauthenticated production Admin application merely because demo routes exist.

Use SameSite=Lax initially with strict Origin/Fetch Metadata/CSRF checks; Strict is possible after testing password-reset navigation. Avoid cross-site third-party-cookie dependence. If separate same-site API origin is selected, document host-only cookie destination, credentialed fetch and exact CORS; no wildcard credential sharing across subdomains.

Proposed policy: 8-hour absolute session cap, 30-minute inactivity limit enforced on server, recent reauthentication within 5 minutes for governance/password/MFA actions. These are policy proposals, not claimed library defaults. Disable Better Auth cookie-session caching to avoid delayed revocation; query active user/current role on protected requests. Rotate/reissue sessions at authenticated trust changes and revoke sessions on disable, password reset, role change and MFA reset. Logout revokes server session and clears cookie. Database outage fails closed. [Better Auth sessions and cache caveats](https://better-auth.com/docs/concepts/session-management).

## 19. MFA architecture

Require TOTP for Super Admin; recommend it for all Admins. Enrollment requires recent password verification, secret provisioning and successful authenticator-code confirmation before activation. A password-only Super Admin session may access enrollment/recovery screens only; it cannot access privileged data or perform governance actions. Promotion to Super Admin revokes existing sessions and enforces enrollment. Guard checks need a reliable server-side assurance/enrollment state, not a React boolean.

TOTP secret must be recoverably encrypted, not hashed; recovery codes must have secure library-supported protection, display once and be single-use. Verify actual library storage/replay handling in the integration gate; add missing controls within the auth boundary. Reject reuse of accepted TOTP counters where needed, use a small tested clock window and synchronized clocks. Rate-limit challenges. Disable trusted-device MFA bypass for Super Admin in v1; no email/SMS fallback that weakens the requirement.

Recovery requires offline stored recovery codes or a documented identity-verified operator procedure with audit, all-session revocation and fresh enrollment. Password reset alone never removes MFA. Prevent an ordinary roles.manage user from making themselves Super Admin or disabling its MFA. [Better Auth TOTP/recovery feature documentation](https://better-auth.com/docs/plugins/2fa).

## 20. Password reset/account lifecycle

No open registration. Provision real Admins through a controlled invitation/activation flow; normalized email is unique and mailbox ownership is verified. First Super Admin bootstrap is a one-time operator command using an explicit client-approved email, no embedded credentials; deliver a short-lived activation flow and require MFA before administration. Remove/expire bootstrap authority after success.

Better Auth documents scrypt as its default. Recommend using its supported hashing hook with Argon2id at OWASP's minimum baseline or stronger measured parameters, retaining salt/version metadata and bounded password-hashing concurrency. This adds one maintained library but avoids assuming default scrypt parameters meet the desired policy. If native support fails on the target image, use reviewed OWASP-equivalent scrypt parameters rather than downgrade silently. [Password storage guidance](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html), [Better Auth credential hooks](https://better-auth.com/docs/authentication/email-password).

Propose 15-character minimum passphrases, at least 64-character support, paste/password-manager support, no arbitrary composition or scheduled rotation, and compromised-password screening with a privacy-preserving implementation. Apply bounded maximum bytes and identical generic responses to account discovery.

Reset requests return a generic acknowledgement. Use cryptographically random single-use expiring reset tokens, preferably digest-only persistence; review Better Auth's actual token storage and expiry before acceptance. Proposed expiry 30 minutes. Bind links to configured trusted origin, never inbound Host. No tokens in logs/analytics/referrers; reset page gets no third-party analytics and no-store/no-referrer. Atomic redemption prevents replay. Success revokes all sessions and sends a security notification; existing MFA persists. Disable blocks login/reset completion and protected API access. Audit security outcomes without secrets.

## 21. RBAC architecture

Model `AdminUser → Role → RoleCapability → Capability`. Import stable capability definitions from reviewed source into backend-owned versioned catalog. New roles start with zero capabilities. Unknown capabilities or unannotated private endpoints default deny. Authenticate globally; explicitly mark public endpoints and require capabilities per private controller operation. Services recheck domain/resource rules for non-HTTP calls.

Preserve the five role templates: Super Admin; Administrator; Content Editor; Product Manager; HR Manager. Administrator initially has no Job Applications capabilities and no users.manage/roles.manage. HR Manager and Super Admin have applicant view/status capabilities. Languages remains view-only. Dashboard aggregates only domains the actor can view; never leak applicants through a dashboard summary or counts.

Super Admin is a protected server-owned role containing the explicitly modeled catalog, not an unchecked arbitrary-route bypass. Seed roles otherwise retain source template semantics. Reserve assignment of Super Admin, alteration of protected roles and recovery operations for a current MFA-verified Super Admin with recent reauthentication. Governance managers cannot grant powers they are not entitled to delegate or edit their own privileges around these limits. Ensure at least one active fully enrolled Super Admin remains, using transactional locking to resist concurrent disable/reassignment. Revoke affected sessions after role/capability changes; fetch live effective permissions. Audit actor, affected user/role and safe capability deltas.

Avoid per-user overrides. Upload/delete/replace operations inherit relevant domain capabilities and reference rules. Privacy deletion and newsletter management capabilities are absent from the frozen UX: define restricted operator procedures initially; any new UI/capability requires a separate approved contract change.

## 22. Privacy-sensitive data handling

Applications store only the actual submitted fields: name, email, optional phone/cover note, vacancy reference and timestamp; reviewStatus is mutable. Contacts store current name/company/email/phone/subject/message/timestamp/status. Proposed consent-policy evidence is separate where required; do not invent CV/files or unrelated profile fields. Validate vacancy existence and Open state at submission; preserve historic vacancy references after closure/archive.

Only explicit domain capabilities can list/read/update records; authorize direct IDs and deny foreign-domain access. Audit sensitive record reads/status changes with record ID and actor, not message content. Redact email/phone/content from request logs, errors, traces and telemetry; redact session/reset/MFA secrets everywhere. Do not send applicant/contact bodies to AI. Email notifications should use a minimal reference/link rather than full PII where possible.

Proposed retention, requiring client policy approval:

| Data | Initial proposal / decision |
|---|---|
| Contact Messages | Review/delete or anonymize 12 months after resolution; unresolved records reviewed periodically |
| Job Applications | Delete/anonymize 6 months after recruitment closes; HR decides whether hired-record transfer or separately consented talent pool is needed |
| Admin audit | 12 months initially; redact/minimize actor PII while retaining action accountability |
| Runtime/security logs | 30 days initially; longer only for justified incident evidence |
| Reset/verification tokens | Expire on purpose-specific deadline; purge expired rows within 24 hours |
| Sessions | Enforce expiry immediately; purge expired rows within 7 days |
| Backups | 30 daily copies plus 3 monthly copies initially; encrypted/restricted; align with privacy policy |
| Newsletter pending consent | Expire unconfirmed signup after 7 days; confirmed data while subscribed |
| Unsubscribe/suppression | Keep minimum matching evidence while sending continues; exact legal/business duration requires confirmation |

These are business proposals, not invented Bangladesh legal requirements. Client/legal review decides purpose, notice, processors/locations and retention. A restricted deletion/anonymization job must also handle provider data and backup expiry. Maintain a minimal deletion ledger for replay after restore so restored backups do not resurrect erased PII. Do not claim immediate erasure from every immutable backup; document restricted access and expiry.

## 23. Public/Admin/submission API architecture

Public read DTOs expose only active-release published content and approved public asset URLs. Admin DTOs expose editable drafts, source warnings, version/readiness metadata and permitted operational fields. Submission endpoints accept Contact, Job Application and Newsletter data; they expose no list/read/update access to visitors.

Use typed mapping adapters from API DTOs into frozen UI view models. Retain domain enums, shared localized structure and media/specification ordering. Replace `'new'`, `synthetic:true`, `blob:` sources, human display-size strings, Demo editor/status dates and fake readiness flags with UI state or derived labels. Production IDs/timestamps/versions and permission state come from API; never accept client-provided actor/status/publishedAt/auth fields through mass assignment.

Publish/archive/status/governance actions use pessimistic acknowledgements and clear pending/error handling. Draft autosave is not currently approved; use existing save interactions. Optimistic reordering is allowed only with version check and reliable rollback. Map 401 to login, 403 to access denied, validation to existing field messages and 409/412 to refresh/reconcile. New auth/loading/release-status behavior needs targeted functional approval, not a visual redesign.

## 24. API route conventions

Examples, not generated routes:

```text
/api/v1/public/products             GET
/api/v1/public/products/:publicId   GET
/api/v1/public/blog/:publicId       GET
/api/v1/public/news/:publicId       GET
/api/v1/public/site                 GET safe active configuration
/api/v1/submissions/contact         POST
/api/v1/submissions/job-applications POST
/api/v1/submissions/newsletter      POST
/api/v1/admin/products             GET/POST
/api/v1/admin/products/:id          GET/PATCH
/api/v1/admin/products/:id/publish  POST
/api/v1/admin/products/:id/archive  POST
/api/v1/admin/job-applications/:id/status PATCH
/api/v1/admin/contact-messages/:id/status PATCH
/api/v1/admin/users, /roles, /activity-log
/api/v1/auth/*                     auth-library endpoint contract
/api/v1/integrations/webhooks/:provider POST signed server-to-server
/health/live, /health/ready        operational, minimal response
```

Use plural nouns, stable identifiers and explicit commands; do not force library auth endpoints into generic CRUD. API versioning does not imply public URL changes. Offset pagination is sufficient initially (default 20/max 100), with allowlisted sorting/filtering and stable tie-breaker ID; cursor pagination can be used for large time-ordered audit tables when needed. Normalize query search and cap length. Missing public records return 404. Private resource lookups follow consistent disclosure-safe 403/404 policy. Request/correlation IDs are generated/validated server-side.

## 25. OpenAPI strategy

Nest generates a reviewed OpenAPI artifact from explicit DTOs and operation annotations. Document security/cookies, public/private distinctions, capabilities, field errors, pagination, examples and status transitions. Auth library endpoints need their own reviewed documented contract if not covered automatically. Restrict Swagger UI in production; a safe export can be shared with integrators.

Generate a small TypeScript client/types for frontend, then adapt to existing localized view models. Contract checks detect breaking changes; no Prisma or auth-secret types enter browser bundles. Add integration examples for future mobile/dealer callers without enabling their auth flow now. [Nest OpenAPI](https://docs.nestjs.com/openapi/introduction).

## 26. Validation/error strategy

Use server DTO validation independent of UI. For Nest 12, choose one consistent supported DTO/schema validation approach and serialization strategy; class DTOs/ValidationPipe remain a practical default for decorator-based OpenAPI. Whitelist fields and reject unknown properties; do not blindly transform strings into booleans/numbers. Use explicit ID/date/enum/URL/email parsers and bounded nested arrays/text/body size. Normalize SKU/email/slugs consistently; preserve literal content, accents/Bengali and source precision.

Separate draft validation from publish validation. Required EN product name/SKU/category match the approved editor; production publish additionally checks source-review disposition and approved media readiness policy. No unsupported rule silently rewrites the prototype. Validate links by purpose: internal allowlist for CTAs, permitted HTTPS links for editorial, vetted map hosts, no javascript/data URLs or arbitrary server-side remote fetch. Markdown permits only the approved limited formatting; sanitize/escape output and exclude raw HTML.

Use a stable error envelope: `error.code`, safe `message`, `fieldErrors` with field paths, `requestId`. Typical statuses: 400 invalid input, 401 unauthenticated, 403 forbidden/CSRF, 404 absent, 409 uniqueness/state conflict, 412 stale version, 413 upload/body limit, 429 rate limit, 503 dependency unavailability. No stack traces, SQL or private existence details in responses. Server generates actor and timestamps. Serialize public responses through an allowlist DTO.

## 27. Security threat model

| Asset/surface | Principal threat | Required boundary / mitigation |
|---|---|---|
| Public forms | Spam, bots, notification amplification, oversized requests | Anti-bot, quotas, bounded validation, durable submission and controlled notification |
| Public content | XSS, stored injection, malicious links, poisoned metadata | Sanitized typed blocks, escaped text/JSON-LD, CSP, public DTOs |
| Auth/Admin | Guessing, stolen sessions, reset/MFA bypass, CSRF | Rate limits, secure cookies, token lifecycle, reauthentication, server MFA policy |
| Governance | Privilege escalation, role manipulation, IDOR | Default deny, current DB capabilities, delegation limits, last-Super-Admin invariant |
| Applicants/contacts | Disclosure through API/logs/cache/build/email/backup | Per-domain authorization, no-store, redaction, private backups and minimized delivery |
| Media/certificates | Malware, upload bombs, executable files, altered documents | Quarantine/detected MIME/limits, approved transformations, immutable originals |
| API/infrastructure | Injection, scraping/DoS, exposed DB, vulnerable dependencies | Parameterized queries, limits/timeouts, private DB, patching/scans and resource bounds |
| Delivery/build | Forged webhooks, draft/PII export, malicious trigger, stale release race | Scoped build identity, safe snapshot export, signed/dedup webhooks, release serialization |
| Secrets/backup | Browser key leakage, baked secrets, ransomware/deletion | Runtime secrets, least-privilege keys, independent private backup and tested recovery |
| Chatbot | Public key exposure, spend abuse, prompt/PII leakage | Server-owned integration, quotas/redaction and explicit scope approval |

Scraping of genuinely public content is not prevented by authentication fiction. Rate-limit abusive traffic without blocking ordinary crawlers. Large DoS mitigation belongs partly at edge/provider; one API instance cannot promise unlimited resistance.

## 28. Security baseline

Use OWASP ASVS **5.0.0** as a traceable baseline: Level 1 across applicable surfaces and selected Level 2 controls for identity, PII, authorization and uploads. This is not ASVS certification or a claim that all Level 2 controls have been met. Track individual versioned requirements, implementation, evidence and accepted exceptions in the implementation phase. [ASVS project](https://owasp.org/projects/asvs).

| ASVS 5 area | Project mapping / eventual evidence |
|---|---|
| V1 Encoding/Sanitization; V2 Validation/Business Logic | Markdown/link/JSON-LD escaping, DTO bounds, publish/state invariants and injection tests |
| V3 Web Frontend Security; V4 API | Secure cookies, headers/CSRF/CORS, safe methods, private serialization/cache tests |
| V5 File Handling | Type inspection, quota/quarantine, safe filenames, referenced-asset protection |
| V6 Authentication; V7 Sessions; V8 Authorization | Password/reset/MFA, revoke/expiry, direct-ID/capability/delegation tests |
| V11 Cryptography; V12 Communication; V13 Configuration | Supported hash/encryption, verified TLS, runtime secrets and hardened deployment |
| V14 Data Protection; V15 Architecture | PII minimization/retention, production boundaries, constrained infrastructure privileges |
| V16 Logging/Error Handling | Audit accountability, redaction, safe errors, incident investigation |

Specific verified browser controls include `v5.0.0-3.3.1` Secure, `3.3.3` host-only prefix, `3.3.4` HttpOnly, `3.4.2` CORS allowlist and `3.5.1–3.5.3` browser request forgery/method controls. A dedicated Admin origin follows the intent of `3.5.4`; route separation alone is weaker. [ASVS 5 browser requirements](https://raw.githubusercontent.com/OWASP/ASVS/v5.0.0/5.0/en/0x12-V3-Web-Frontend-Security.md).

Strict credentialed CORS permits exact environment origins, methods and headers; no wildcard or broad subdomain matching. CORS is not authorization. Cookie mutations require Origin/Fetch Metadata checks plus a session-bound CSRF token/custom header where appropriate; validate all accepted content types, including auth/reset/login. Signed provider webhooks are narrowly exempt from browser CSRF and use their own verification. Nest 12.1+ now documents native CSRF controls; use its supported mechanism after testing interaction with the auth handler, rather than copying obsolete middleware tutorials. [Nest CSRF](https://docs.nestjs.com/security/csrf), [OWASP CSRF](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html).

Set CSP at the static host for HTML and Nest/proxy headers for API. Use `object-src 'none'`, restricted base/frame/script/connect/image/media/font sources, frame-ancestors, nosniff and appropriate referrer policy. Static HTML can use hashes for legitimate inline scripts; per-request nonces would complicate pure static delivery. Inventory current Google Analytics placeholder, Google Maps, stock images, fonts and Gemini connections before enforcement. Remove placeholder analytics or replace through an approved decision; no arbitrary script UI. Roll out CSP report-only, fix violations, then enforce. Set HSTS after all intended hosts support HTTPS; includeSubDomains/preload requires domain-wide inventory, especially client mail/legacy services. Do not claim full ASVS L2 while this remains an exception. [Nest headers](https://docs.nestjs.com/security/helmet).

Provisional tunable limits: login 5 failures/15 minutes per account plus IP/global quotas; reset 3/hour per account and IP budget; MFA 5/challenge with lock/expiry; Contact 3/10 minutes/IP plus email/global cap; Applications 3/hour/IP plus vacancy/email dedup safeguards; Newsletter 5/hour/IP plus email cooldown; public reads generous per-IP burst control; Admin mutations per-user quotas including upload bytes. These are starting policies, not measured guarantees; account for shared Bangladesh NATs and IPv6. Return Retry-After; avoid permanent account lockout attackers can trigger. Trust forwarded IP only from known proxies.

Single-instance in-memory throttling plus edge controls is acceptable for v1 if restart bypass is acknowledged; persist critical auth/account abuse state or configure tested library DB-backed counters. Multiple replicas require shared edge limits or shared storage before scale-out. Redis is not required now. AntiBotVerifier can use Turnstile if selected; validate tokens server-side, expected hostname/action and one-time lifecycle. Honeypot/timing/progressive challenge are additional layers, not replacements for limits. Fail public submissions safely when verification is unavailable, without false success. Keep crawlers/read pages outside challenge gates. [Nest rate limiting](https://docs.nestjs.com/security/rate-limiting), [Turnstile validation](https://developers.cloudflare.com/turnstile/get-started/server-side-validation/).

Secrets are runtime-only, redacted and rotated; least-privilege CI/service keys and separate environments. Lockfiles, dependency/advisory review, secret scans, container scans, SBOM and supported update windows are required. `npm audit` alone does not establish production security.

## 29. SEO audit of the current frontend

**Observed locally, not on a verified production deployment:** six raw HTTP requests (`/`, `/products`, `/news/7`, `/blog/1`, an unknown URL and `/admin/users`) returned 200 with an empty React root, no h1 and no canonical. Existing `dist/index.html` likewise contains an empty root; Vite config has no generation pipeline. Dev-server fallback explains the local 200, but production status behavior cannot be established without host configuration.

Browser inspection confirmed hydrated Home, Products, News 7, Blog featured and public NotFound content. Home switched BN→EN while remaining `/`; its canonical stayed the same. The initial BN page visibly mixed Bengali navigation/content and hardcoded English sections. No hreflang exists. On Home and Products there were **two description tags**, because template and Helmet tags coexist; Products retained the global Twitter title. News detail retained the global OG/Twitter titles. Route-level Helmet does not make metadata available in initial static HTML.

| Item | Current finding | Production requirement |
|---|---|---|
| Rendering | CSR with `createRoot`; all public pages eagerly imported | Meaningful HTML and metadata before JS; hydration parity |
| Helmet | 18 page components include title/description/canonical; NotFound does not | One authoritative head output per route; deduplicate template tags |
| Canonicals | Hardcoded `https://www.modinarim.com`; ID detail URLs | Client confirms domain; environment-aware route manifest; deterministic canonical |
| OG/Twitter | Global relative `/hero.jpg`; 11 page components override some OG fields; no page-level Twitter overrides found | Absolute approved image URL, unique route title/description/URL; social-crawler testing |
| Structured data | Home runtime Organization only; source contact/certification claims unresolved | Source-approved Organization/Breadcrumb/Article where justified; no fabricated offers/reviews |
| Sitemap | 13 hand-written entries | Add Gallery/Careers/FAQ, all published Blog/News detail URLs and eligible locales; derive from release |
| Robots | Allows `/`, disallows `/api/`, hardcoded sitemap; no Admin rule | Crawl public assets; exclude private URLs from sitemap; noindex headers for Admin; robots is not access control |
| 404 | Visual page only; inherits global `index, follow`; unknown local URL returns 200 | Real host HTTP 404 with dedicated generated error HTML; missing article IDs also 404 |
| Links | Router links emit anchors for ordinary pages/articles | Preserve actual href anchors; inspect dropdown links and all generated routes |
| Products | Card details are modal/local state; nine visible per page; button pagination; no product detail href/route | Product identity/pages and crawlable navigation require explicit scope choice |
| Blog/News | Separate list/detail constants; ID routes; Blog `featured`; missing IDs handled in UI | Preserve legacy URL identity; unify reviewed content, real HTTP status and detail metadata |
| EN/BN | LocalStorage/navigator language detection; runtime html lang; same URL | Stable locale URLs only after approval; deterministic HTML and hydration locale |
| Content | Static constants/assets; no CMS feed; placeholders/conflicts | Reviewed published DTOs and build snapshot, never wholesale mock import |
| Performance | Motion/in-view counters and sessionStorage preloader; lazy Admin only | Static content must remain readable without effects; CWV measured on deployed artifacts |

`index.html` includes `G-XXXXXXXXXX` analytics, index/follow for every shell and home-wide metadata. This is not Search Console readiness. Do not infer actual Google indexing from local inspection; Search Console access, live domain, crawl logs and URL Inspection are unavailable. Google can render JavaScript, but initial crawling and later rendering are distinct stages; prerendering improves crawler access beyond Google. [Google JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## 30. SEO rendering options comparison

| Option | Crawlers / social | Existing Vite compatibility | CMS publication / rebuild | Deployment / cost / maintenance | Staging, rollback, scale / client impact |
|---|---|---|---|---|---|
| A. CSR only | Google may render; other crawlers/social cannot be assumed to execute JS; metadata/body initially generic | Closest to current source | API reads update instantly; no public HTML build | Static host cheap; indexing/social fragility remains | Simple releases, cached assets; does not satisfy reliable initial HTML acceptance |
| B. Build-time HTML/SSG + hydration | Full content/head at request time for search/social; fewer render dependencies | Small renderer/data/router/bootstrap changes; browser effects need isolation | Coalesced full-site builds after approved publish; immutable release data | No Node public server; CI/build integration adds maintenance, typically low for small catalog | Preview/staging artifacts and previous release rollback; CDN handles reads; editors see pending/live/failed release state |
| C. Vite SSR / hybrid runtime | Full HTML; fresh CMS reads if caches correct | Feasible with server entry/data loaders; more runtime/cache/error work | No full rebuild for each edit; SSR cache invalidation needed | Node rendering service and ongoing availability, secrets and scaling cost | More components to stage/restore; suits frequent/time-critical content, less beginner-friendly |
| D. Headless browser snapshots / bot-only rendering | Snapshots may capture content but animation/lazy UI creates gaps; bot/user divergence risk | Few source changes initially; hydration snapshot fidelity fragile | Browser crawl and readiness rules per build; external service possible | More nondeterministic build/runtime behavior or paid proxy | Harder reproducibility and parity; reject as long-term foundation |

For all choices, links, locale identity, metadata correctness, HTTP status, content approval and host rules remain necessary. SSR does not automatically fix any of those. No Next.js rewrite is justified by current scale or source. Google describes dynamic rendering as a workaround and recommends alternatives such as SSR/static rendering/hydration; do not maintain separate crawler-only content. [Google dynamic rendering](https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering), [Vite SSR/build-time rendering](https://vite.dev/guide/ssr.html).

## 31. Final SEO rendering recommendation

**Choose build-time static HTML generation from immutable safe public data, with React hydration.** Keep Vite and existing page components/design. Use a build-only server entry/StaticRouter, explicit locale and route data; browser entry hydrates generated public pages, while Admin uses its normal client bootstrap. Vite's SSR APIs can produce HTML during CI without running an SSR server in production. Do not select a third-party SSG package until compatibility with React 19/Router 7/Helmet 3 and the approved Vite version is proven.

The compatibility pilot must handle `window`, `document`, session/localStorage, useLayoutEffect, preloader state, date/year determinism, random values, in-view motion, counters and autoplay. Generated content must not be empty, opacity-hidden, show only zero counters or depend on scrolling/JS to become readable. Hydration must start from the same data/locale/state and use hydrateRoot, not erase static content with createRoot. There is targeted functional work, even though no redesign is proposed. [React hydration requirements](https://react.dev/reference/react-dom/client/hydrateRoot).

Use full-site rebuilds initially: current inventory is small enough to benchmark this first. Proposed target is publish-to-live within five minutes in normal conditions, subject to measured CI/host results. Full rebuild is acceptable only if the client accepts minutes-level freshness. Revisit route-scoped generation/runtime hybrid when build duration, content count or urgent editorial frequency breaches the agreed target. Keep Admin and public submissions live through the API independently of static builds.

## 32. Multilingual SEO strategy

Recommendation, **requiring route approval**: preserve all existing unprefixed URLs as English; add `/bn/...` equivalents only for materially complete approved Bengali pages. This avoids moving existing English URLs and avoids pretending 154 matching locale keys equal full content translation. URL becomes authoritative locale; localStorage can remember preference for explicit navigation, never silently replace the language of a canonical URL or force redirects by IP/browser.

On each available translation emit deterministic localized HTML/head, self-canonical, reciprocal `hreflang="en"`/`"bn"` and an appropriate English `x-default`. Do not canonicalize genuine Bengali translations to English. Do not emit Bengali sitemap/hreflang entries for English-body fallback pages. Missing Bengali views need an explicit unavailable/fallback experience; that functional contract must be approved. Existing BN runtime mode is incomplete and not independently indexable.

Compare minimal migration consequences: retain current EN URLs, add Bengali route handling/localized internal links and language-switch equivalents; validate query targets and ID aliases; update sitemap/canonicals; implement redirects only if later moving EN to `/en/`. Admin stays outside locale routes. Slug migration is optional and separate; existing ID URLs can remain canonical. Do not automatically redirect `/blog/featured` or numeric News links before reviewing alias maps. [Google multilingual URL guidance](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [hreflang requirements](https://developers.google.com/search/docs/specialty/international/localized-versions).

## 33. Sitemap/robots/canonical/structured-data architecture

One route manifest drives generation, safe internal links, sitemap, canonical/hreflang and host redirect/404 maps. Sitemap includes only active-release indexable 200 URLs, complete locale variants and actual meaningful lastmod; never fabricated daily timestamps, drafts/Admin/submissions. Robots permits crawlable JS/CSS/media and references configured production sitemap. Admin/private routes receive noindex HTTP/meta directives and authentication; blocking robots alone cannot secure or reliably deindex them. Staging requires access restriction and noindex; avoid leaking staging canonicals into production.

Canonical domain/trailing-slash/HTTPS/www policy is a client decision; generated canonicals should derive from one validated public origin. Filter query variants normally canonicalize to `/products`; dedicated category landing pages would be a separate scope decision. Redirect reviewed old slugs with 301/308; unknown routes and unknown records return actual 404, with no generic public SPA fallback. Keep a narrow Admin fallback on its origin/path only. Apache/cPanel must prove equivalent behavior before adoption.

JSON-LD is generated from the same approved visible data and safely escaped for script context. Organization uses confirmed company/contact/social facts; BreadcrumbList on detail pages; Article where accurate. Preserve month/year in visible text and omit exact datePublished until an exact day exists; real CMS publication timestamps can be stored separately from source editorial dates. Product structured data needs meaningful identity/detail URLs; do not invent prices, offers, stock, ratings or legal certificate validity. FAQ rich-result eligibility is not promised for this corporate site.

Future SEO acceptance: raw no-JS HTML contains meaningful headings/body/anchors; one unique title/description/canonical per route; absolute OG/Twitter images and working social previews; correct structured data with Rich Results tests where eligible; sitemap/robots/redirect/404 checks; alt text and heading semantics; mobile performance/caching/compression; actual-domain Search Console ownership, URL Inspection/render comparison and sitemap submission. Ranking/indexing speed guarantees are not supportable.

## 34. CMS publishing → SEO deployment flow

Keep a mutable relational draft and one current validated published snapshot per entity. Editing a published item changes draft data only; the last accepted published content remains available. Publish atomically validates current version/permissions/content/readiness, saves the snapshot, records actor/time and audit, increments desired release generation and inserts an outbox entry. This is not a complete historical CMS version-control system.

```text
Save draft → validate draft → database commit
Publish → authorize + publish validation + version check
        → one DB transaction: published snapshot + audit + delivery outbox
        → release candidate captures immutable safe public dataset
        → CI build uses scoped candidate export (no drafts/PII)
        → generate HTML/head/sitemap/redirects → validation/smoke
        → upload complete immutable deployment → promote atomically
        → confirm deployment → active release pointer/cache invalidation
```

Distinguish **content accepted for publication**, **website build pending**, **website live**, **website deployment failed**. Existing “Publish” UX needs this approved production status wiring; a successful DB transaction cannot promise that the website already changed. Public frontend hydrates the embedded immutable release dataset, avoiding latest-database content replacing old HTML mid-hydration. Public read API defaults to active release; protected build export may read a candidate. Active pointer/deployment promotion is reconciled and retried because database and host cannot share one transaction; no claim of perfectly atomic cross-provider deployment.

Serialize release promotion; coalesce rapid edits over a short configurable window (initially 30–60 seconds). A later edit creates a later candidate; an older finished build cannot overwrite a newer active generation. Use a small outbox poller with leases, idempotency, exponential backoff and alerting; support same-application process or a command from the same image, not a separate service platform.

Build/export/deploy failure leaves last good site live, retained candidate and safe error state; retry without re-saving content or duplicate email. Cache invalidation failure is surfaced and retried; use short HTML TTL to bound staleness. Preview uses authenticated draft access and private/no-store staging preview, never public draft URLs. Keep a bounded set of deployment bundles (initially last five successful releases plus short retention) for rollback. Rollback restores static artifact and matching active dataset/redirect map; draft/latest desired DB content is not destructively reverted. Republishing a prior edition is a new explicit content action. Archive/remove is also a release operation; urgent legal/security removal needs an operator purge/block procedure while rebuild is pending.

Whole-site build cost and publish frequency must be measured. Incremental dependency-aware rebuilds are a later optimization; client cPanel deployment must provide complete directory upload plus atomic pointer/symlink replacement or equivalent. If its plan only permits partial overwrite, reject it for this release strategy or use another static host.

## 35. Caching strategy

Static hashed JS/CSS/fonts and versioned public media: long max-age with immutable. HTML: short TTL/revalidation and atomic release promotion; a starting maximum of 60 seconds is reasonable to test against publishing expectations. Safe public API: ETag/Last-Modified from active release/content version, short shared cache and explicit Vary only on bounded supported locale inputs; locale URLs improve cache clarity. Sitemap/robots use short revalidation.

Admin/auth/preview/applicant/contact/governance/submission acknowledgements: private/no-store; no public CDN caching or draft build exports. Responses with cookies/auth are outside public cache rules. Public media URLs use immutable asset keys; replacements get new keys, not overwrites. Unpublish/private conversion requires deliberate CDN removal and understood propagation limits.

No Redis in v1. CDN/static caching carries most 100k monthly visits; sessions are DB-backed and low concurrency. In-process safe public cache is optional, bounded and version-aware; correctness must not depend on it. Revisit Redis only for measured distributed throttling/caching needs that simpler shared edge or DB mechanisms cannot meet.

## 36. Performance strategy

Measure requests and transferred bytes, not visits alone. CDN absorbs public HTML/assets, so 100,000 visits is not 100,000 uncached API workloads. Pagination/indexes/selective DTOs avoid oversized API results and N+1 relations; cap queries, use transactions sparingly and monitor slow queries/pool saturation. Keep DB/API co-located and pool capacity within provider limits.

Preserve lazy Admin separation; public route splitting is a targeted later performance change after rendering tests. Serve gzip/Brotli from host/CDN, pre-size responsive images, reserve dimensions, eager-load only likely LCP image, lazy-load below-fold media and avoid autoplay downloading a large facility video unnecessarily. Review font licensing/hosting/Bengali glyphs and subset only with coverage validation. No visual redesign or deletion of required content.

Future acceptance uses field p75 goals where data exists: LCP ≤2.5s, INP ≤200ms, CLS ≤0.1; laboratory Lighthouse/WebPageTest checks from representative Bangladesh/mobile conditions supplement field data. Treat these as targets, not current measured passes. Verify slow/offline/API-failure UX and hydration errors in production-like builds.

## 37. Media/object-storage abstraction

| Option | Portability / durability | Maintenance / security | Cost tradeoff | Recommendation |
|---|---|---|---|---|
| Generic S3-compatible interface | Standard key/presign operations with tested provider adapters | Private staging/originals, public approved derivatives; IAM/bucket checks | Storage + requests + transfer + backup; provider-specific features differ | **Application contract** |
| Local VPS filesystem | Simple initially; tied to volume/server and deployment | Operator owns permissions, capacity, offsite replication/recovery; avoid API ephemeral filesystem | Lower service fee possible; highest failure/maintenance exposure | Exception only with justified durable volume/CDN/backup plan |
| Managed object storage | Usually easiest retention/CDN integration | Provider platform operations; project owns access, lifecycle and independent copies | Recurring storage/egress/request cost varies | **Preferred deployment implementation** |

Use random/immutable keys independent of original filenames; persist checksum/bytes and variant relationships. Domain modules use MediaService; ObjectStorage adapter owns SDK calls. Presigned uploads are short-lived, constrained and followed by server verification; if provider cannot enforce limits, proxy bounded uploads through API. No arbitrary URL fetch/import endpoint (SSRF risk). Enforce visibility in delivery, not only a database boolean. Changing provider requires inventory copy/checksum verification plus URL-base configuration, with old URLs/redirects preserved as necessary.

## 38. Image/video processing architecture

Use Sharp for ordinary approved image uploads: inspect decoder/type/dimensions, bound pixel count and memory, normalize orientation, remove unwanted private EXIF/GPS, generate an optimized master and responsive WebP sizes. Evaluate AVIF only after CPU/build/storage measurements; no requirement to generate every format. Cap concurrent processing; keep uploads pending until derivatives finish. Retain originals according to provenance/backup needs. [Sharp supported pipeline](https://sharp.pixelplumbing.com/).

Never run documentary certificate originals through this rewriting pipeline. Keep PDF/ZIP unchanged and inspect them safely; do not extract arbitrary archives in a web process or invent missing pages/files. Disallow scriptable SVG/HTML uploads initially unless a sanitization policy is specifically approved. Allowlist necessary raster/PDF/ZIP/video formats, validate signatures and extension consistency, set per-domain byte quotas and quarantine failures. Documentary originals may contain intentional metadata; approve any derivative separately.

Limited corporate videos can use object storage/CDN with correct Content-Type, range requests, cache headers, pre-approved codecs, poster and practical duration/size limits. Avoid automatic video transcoding in v1; test existing WEBM delivery and mobile compatibility. A streaming provider becomes justified by adaptive-bitrate demand, large library/concurrency, geographic playback failures or bandwidth cost. Current volumes do not justify an expensive streaming platform.

## 39. Email-provider abstraction

EmailService owns purpose/templates, safe data and delivery policy; EmailProvider adapter owns provider APIs/message IDs/errors. NewsletterService has a separate marketing contact/consent/suppression interface. A provider can implement both, but transactional and marketing credentials/domains/lists/settings are deliberately separated. Password-reset and activation delivery can be synchronous/short-lived with a retry design that never persists raw token in ordinary outbox payloads; ordinary notifications use a DB record reference, rendering minimal permitted data at send time.

| Candidate | Verified relevant capabilities | Operational fit / cost drivers | Assessment |
|---|---|---|---|
| Brevo | Transactional API and double-opt-in contact endpoint | Campaign/list tooling worth evaluating with beginner staff; cost depends mail/contact tier and features | Preferred candidate for one-provider transactional + newsletter pilot, not a frozen choice |
| Resend | Transactional domain authentication and Broadcasts with unsubscribe links | Developer-friendly integration; assess campaign/editor/team usability and contact/send limits | Strong alternative if client prefers its workflow |
| Amazon SES | Sending/deliverability tools and list/subscription management | IAM, production-access setup and campaign workflow impose more operator work; usage-driven fees | Cost-oriented alternative with technical ownership |

Evidence: [Brevo transactional API](https://developers.brevo.com/docs/send-a-transactional-email), [Brevo double opt-in](https://developers.brevo.com/reference/create-doi-contact), [Resend Broadcasts](https://resend.com/docs/dashboard/broadcasts/introduction), [Resend domain authentication](https://resend.com/docs/dashboard/domains/introduction), [SES subscription management](https://docs.aws.amazon.com/ses/latest/dg/sending-email-subscription-management.html).

Do not claim Bangladesh inbox delivery without a pilot to Gmail/Outlook/client/corporate mailboxes. Evaluate EN/Bengali subjects, font/encoding, bounces, spam placement, response latency, domain reputation and support. Configure SPF/DKIM/DMARC without breaking existing Namecheap MX/mailboxes; avoid multiple SPF records. Require idempotency or dedup where available, retryable error classification, signed webhooks and suppression export. No exact price claim is made; re-quote official plans after volume/account requirements are known.

## 40. Newsletter architecture

Newsletter is **required for launch** by this request although its Admin UI is deferred. Keep campaigns/list operations in the provider dashboard initially; do not build a bulk sender or a new frozen-Admin module. Wiring the inert footer input and adding legally approved consent messaging is a targeted functional change requiring approval.

Submission validates/normalizes email, locale, anti-bot token and consent-policy version; records Pending with explicit consent evidence, then enqueues provider synchronization/DOI invitation. Duplicate requests return generic acknowledgements without revealing subscription status. Confirm only from a verified provider event or secure single-use confirmation flow; do not mark confirmed because API returned 200. Use provider-hosted DOI if selected and tested. Retry failed sync without duplicates; expire stale pending records.

Unsubscribe and one-click/provider webhooks update local state and provider suppression; no login required, no analytics leaking tokens, no confirmation page that reverses unsubscribe implicitly. Webhooks require signatures, deduplication, timestamp/replay limits and careful out-of-order handling. Once unsubscribed/suppressed, stale sync jobs must not resubscribe; re-consent is explicit and newly evidenced. Bounces/complaints suppress marketing. Keep minimal matching data for suppression and align restore/provider reconciliation with retention policy. Transactional account/security messages are purpose-separated from optional marketing; never interpret a marketing unsubscribe as permission to send campaigns transactionally.

## 41. Activity/audit log architecture

Application audit captures meaningful domain/security events: create/update/draft/publish/archive/configuration/status; user enable/disable/role/capability change; login success/failure where useful; MFA/reset/recovery and private-record access. Audit mutation with the DB transaction when it must correspond to a committed change. Record actor/system identity, action/resource/ID, timestamp/outcome, request ID and narrowly approved deltas. No passwords, token/hash values, MFA secrets, sessions or full contact/applicant bodies.

Activity UI maps real actions to approved labels; never seed demo activity in production. Ordinary request/error logs are infrastructure logs, not Activity Log items. Application runtime cannot update/delete audit records; restricted retention jobs can purge by policy. Restrict audit.view and redact metadata; record failure outcomes without leaking data. This is practical accountability, not tamper-proof compliance logging. Security-critical external export can be revisited if contractual assurance requires it.

## 42. Observability

Structured JSON runtime logs with service/environment/release/request ID, path template, duration/status and safe error code; exclude raw query strings/bodies/cookies/authorization/PII. Provider-independent error monitoring with scrubbed events, private source maps and restricted access. Sampling traces is optional; request and DB timings plus basic pool/resource metrics suffice initially.

Monitor HTTPS uptime, API readiness, submissions, auth failure spikes, upload processing, DB connections/slow queries/storage, outbox age/failed deliveries, publish-to-live time, backup age/success and restore drills. Alerts go to named operators with severity/runbook and no sensitive payload. Keep external uptime checks independent of the API host. Readiness failures alert without triggering destructive automated DB recovery. No monitoring provider is frozen.

## 43. Backup / restore / disaster recovery

Propose preferred **RPO ≤1 hour** for submissions/content/governance and **RTO ≤4 hours** for API/data restoration, pending budget and actual drill. Managed PITR or correctly operated physical base backup/WAL archiving can support that target; a once-daily logical dump alone cannot. Minimum-budget exception: daily independent dump, acknowledged **RPO up to 24 hours/RTO up to one business day**; require explicit client acceptance rather than silently weakening targets.

| Backup approach | Protection / portability | Operational responsibility | Decision |
|---|---|---|---|
| Provider backup only | Convenient same-provider restore; provider/account outage risk remains | Provider mechanics; project tests access/restore/retention | Insufficient as sole plan |
| Independent logical backup | Portable off-account recovery, useful migration/export | Project schedules encryption, monitoring and restore; typically loses changes since dump | Necessary independent layer; not PITR |
| Combined | Provider PITR/base backups + off-account logical dumps + independent media copies | Project verifies complete recovery and keys | **Recommend** |

Managed: enable paid backup/PITR as needed, verify region/retention/export and test provider restore. VPS: automated encrypted off-server pg_dump plus reviewed base-backup/WAL tooling for hourly RPO; do not improvise ad-hoc physical backup scripts. Keep backup and encryption credentials outside the failed VPS and separate from application write credentials. [PostgreSQL backup approaches](https://www.postgresql.org/docs/18/backup.html), [PITR requirements](https://www.postgresql.org/docs/18/continuous-archiving.html).

Propose 30 daily/3 monthly independent dumps and 7–14 days PITR history where affordable; refine with retention policy/storage budget. Back up media originals and immutable versions to an independent bucket/account or equivalent; versioning alone within one deletable account is insufficient. Capture DB schema/migration state, asset manifest/checksums, redirect/release artifacts and secured configuration recovery references. Quarterly isolated restore drill and before risky migrations: restore DB/media, replay deletion ledger, revoke sessions, verify auth/MFA/permissions, critical forms/content and measure RPO/RTO. API and public HTML recovery can have different timelines; static site may stay available during API outage, but forms must honestly show unavailability.

## 44. Local / staging / production environments

Separate DBs, buckets, secrets, auth/session namespaces, email lists/domains/recipient policies and public origins. Local has disposable synthetic data. Staging uses synthetic/anonymized fixtures, restricted access, noindex and mail capture/recipient allowlist; never production DB/PII/bucket or unrestricted real email recipients. Production uses reviewed content and actual users only.

Use the same API image promoted by digest; runtime config varies. Static public builds vary by public origin/release dataset and must be verified separately: promoting an API image does not mean blindly promoting staging HTML containing staging URLs. Preview of production-bound content remains private. Restore drills use isolated environments and suppressed outgoing messages/webhooks. Document environment ownership and teardown so test integrations cannot call production.

## 45. Secrets/configuration architecture

Public build config: canonical public origin, public API base, public media base, approved analytics ID and anti-bot site key. Everything exposed by Vite defines/VITE variables is public. Server secrets: DB/migration passwords, auth/encryption material, storage credentials, email/provider/build-webhook keys, anti-bot secret, monitoring upload token and any Gemini key. No secret in frontend, git, image, report or public OpenAPI examples.

Validate config at boot and fail safely on missing production prerequisites. Use platform secret injection or secure VPS environment files outside checkout with restrictive permissions; local examples contain placeholders only after approval. CI uses short-lived credentials/OIDC where supported, protected production environments and least-privilege repository tokens. Rotation/runbook covers DB, auth/session signing, MFA encryption, storage/mail and provider webhooks; encrypted MFA data requires key-version recovery planning. Backups cannot be restored if encryption keys are lost. Do not automatically regenerate auth keys at startup.

## 46. CI/CD architecture

PR pipeline: deterministic independent installs → true lint/type-check → business/API tests → frontend/API build → contract checks → secret/dependency/container scans → safe public HTML SEO checks. Current frontend `lint` is type-check only; introduction of ESLint/test tooling is next-phase work. CI should not silently redefine a past passing lint claim.

Main/staging: build tagged/digested API image → push registry → controlled migration job → deploy staging → smoke/critical E2E/security checks → public snapshot/static generation → host route/header/404 tests. Production: protected human promotion → backup/preflight → additive migration once → deploy compatible API → smoke → build/promote approved content release → verify cookies/forms/SEO → monitor → rollback image/static artifact if needed. No migration in every replica startup. Pin Actions and restrict permissions; production secrets do not enter untrusted PR jobs.

Separate code deployment from CMS-triggered static content build. Build identity reads only safe candidate data, cannot manage users/PII or run DB migrations. Durable outbox retry handles CI trigger failure. Production API/statics have independent rollback artifacts; database rollback follows section 48. No workflow is created now.

## 47. Container registry recommendation

Recommend **GitHub Container Registry** for the API image because GitHub CI is approved and OCI pulls are portable across deployment hosts. Private repository/image visibility and storage/transfer/retention limits need confirmation. Tag with commit/release and deploy by immutable digest; retain known-good artifacts and attach SBOM/provenance where practical.

Host-specific registries simplify some hosts' authentication/networking but couple artifact access to vendor accounts. Docker Hub or another OCI registry is viable if procurement/access requires it, but there is no demonstrated need for another vendor. Switching registry should change image reference/credentials, not business code. Avoid making all credentials long-lived owner tokens. [GHCR documentation](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

## 48. Database migration strategy

Develop reviewed Prisma migrations against disposable PostgreSQL; commit SQL and schema together. Validate from clean DB and representative previous schema/data in CI/staging. Apply production through one protected release job with migration-specific credential and lock/coordination. Never run destructive reset, dev migration or unreviewed schema push in production.

Prefer expand–migrate–contract: additive nullable/new fields first, compatible application release, idempotent bounded data backfill, later enforce constraints/remove old fields. Set appropriate lock/statement timeouts; plan large indexes/backfills using PostgreSQL-specific reviewed SQL where required. API rollback only works while schema remains compatible. Fix forward for ordinary migration problems; restore/PITR only for approved disaster cases because it loses new submissions. Take and verify backups before risky changes and schedule downtime where genuinely unavoidable. Major PostgreSQL upgrades are separate restore/pg_upgrade exercises, not a minor-image tag edit.

## 49. Development seed vs production migration

Development seed includes synthetic roles/users/forms/logs only in explicit non-production environments, with hard environment guards. Production migration imports reviewed content and capability/role templates, never demo contacts/applicants/users, synthetic activity, placeholder media or mock editor/timestamps. Schema migration must not silently run demo seeding.

First Super Admin bootstrap uses verified client email and one-time activation, an audited operator action, then mandatory MFA. No default password, fixed secret or public bootstrap route. Production data import has dry-run/report/checksum/source-key idempotency and explicit reviewed allowlist; reruns cannot overwrite approved edits unintentionally. Roles/capability definitions are controlled system data; production individual assignments are explicit.

## 50. Existing content migration strategy

Create a **per-record and per-field source manifest** covering public constants, Admin snapshots and asset references; the initial source-record classification below covers the current seed inventory, but is not a verified/import-approved production list. Each record can carry multiple field-level categories. Preserve source path/legacy ID/exact value/media hash and source precision; classify before writing production records:

| Class | Meaning | Current examples / treatment |
|---|---|---|
| A | Technically migration-ready | Stable categories/targets/block structure/SKU source labels; still require overall client content authorization |
| B | Ready with review warning | Literal metrics/material/certification/read-time/month/year/quality claims and local project asset provenance; preserve warnings, do not certify truth |
| C | Placeholder replacement required | Picsum Gallery/Blog/News, stock portraits/leadership, social `#`, `G-XXXXXXXXXX`; quarantine, replace/approve |
| D | Conflicting source/client decision | Founder/MD and leadership roles; Faruk/Faruq; News 7/featured mismatch; Product 1 title/media; Homepage/About metrics; phone/address; Home Download mapping/size; public vs Admin lifecycle/body differences |
| E | Missing asset/data | Products 4–21 production media; Downloads files; certificate association proof; absent BN body translations/deadlines/confirmed factual evidence |

Products 1–3 have nine local assets but source `production` label does not prove rights/accuracy; Product 1 mismatch blocks unquestioned publication. FAQ's 18 EN entries may be text-importable with untranslated BN; no invented Bengali. Downloads' 11 records lack actual selected files, so migrate as incomplete/draft rather than live working downloads. Three certificates retain original files and literal metadata; legal validity is unestablished. Contact office placeholders remain recorded review issues. Newsletter has no real source subscribers. Demo operations/governance data is excluded entirely.

Import both public and Admin occurrences before choosing authoritative versions. Preserve full public Blog/News detail bodies; do not replace them with shorter Admin seed summaries. Public-visible Products 20/21 require client lifecycle choice rather than inheriting demo Draft/Archived. Existing homepage download summaries and quality certificate associations remain source-local until explicit linking decisions. Review artifacts document factual decisions/evidence; no universal verified flag or automatic source correction. Changed claims/translations/content require client approval, with preview comparison to frozen public views.

### Initial classification of every collection seed record

Keys in this table are current source IDs, not proposed new database IDs. A/B/C/D/E have the meanings above. Grouping lists every key explicitly; nested structural slots/specifications/block/list items inherit their parent classification with field-level warnings preserved. B covers unverified source copy/claims rather than asserting every claim is false. E for Bengali means untranslated content, not a requirement to fabricate it or a blocker to an approved English-only launch.

| Current source records | Class(es) | Specific disposition |
|---|---|---|
| Product 1 — Box Frame Bearing & Racer | B, D, E | Title vs Heavy Duty Frame media/alt; local asset provenance and untranslated content |
| Product 2 — Motor Cycle Center Stand | B, E | Local images present; confirm rights/specification claims; BN missing |
| Product 3 — Motor Cycle Double Stand | B, E | Local images present; confirm rights/specification claims; BN missing |
| Product 4 — Motor Cycle Foot Rest Rod | B, C, E | Public image fallback is placeholder; production images/BN missing |
| Product 5 — Motor Cycle Handlebar | B, C, E | Same missing-media/readiness rules |
| Product 6 — Motor Cycle Leg Guard | B, C, E | Same missing-media/readiness rules |
| Product 7 — Motor Cycle Sharee Guard Ladies | B, C, E | Preserve full source name/finish wording; same missing-media rules |
| Product 8 — Easy Bike RIM | B, C, E | Preserve full source title; missing media/BN |
| Product 9 — Rikshaw Avon Rim | B, C, E | Preserve literal source spelling; missing media/BN |
| Product 10 — Cycle Rim (Bichue & Hero) | B, C, E | Missing media/BN; literal source claims |
| Product 11 — Cycle Rim (26"X1.5") | B, C, E | Literal dimensions/title; missing media/BN |
| Product 12 — CNG Rim | B, C, E | Missing media/BN |
| Product 13 — Rikshaw Rim Gazi | B, C, E | Missing media/BN; preserve source spelling |
| Product 14 — Mishuk Rim Black & White | B, C, E | Missing media/BN |
| Product 15 — VAN Rickshaw Jumbo Rim | B, C, E | Missing media/BN |
| Product 16 — VAN Rickshaw Gold Rim | B, C, E | Missing media/BN |
| Product 17 — Rickshaw Japan Rim | B, C, E | Unverified specification/origin wording; missing media/BN |
| Product 18 — Nosimon Rim | B, C, E | Missing media/BN |
| Product 19 — Patti Rim | B, C, E | Missing media/BN |
| Product 20 — Van Spoke (Black & White) | B, C, D, E | Public-visible vs Admin Draft; missing media/BN |
| Product 21 — Wasar | B, C, D, E | Public-visible vs Admin Archived; missing Product media association/BN; do not auto-map a similarly named asset |
| Blog `featured`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9` (10) | B, C, D, E | Review technical/business claims; stock covers; public full bodies vs shortened Admin summaries; BN missing |
| News `1`, `2`, `3`, `4`, `5`, `6`, `8` (7) | B, C, D, E | Factual claims, stock covers, source body differences, missing BN; record1 also affected by separate featured-card/link mismatch |
| News `7` | B, C, D, E | All editorial issues plus named-person list/detail conflict |
| Gallery `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15` (15) | B, C, E | Every image is remote Picsum placeholder, not evidence of described factory/people/process; BN missing |
| Download `1`, `2`, `3`, `4`, `8`, `9`, `10`, `11`, `13`, `14` (10) | B, E | Metadata only; no actual selected file; retain source sizes/years separately; BN missing |
| Download `12` — Warranty Terms & Conditions | B, D, E | Missing file/BN plus Home `0.8 MB` vs Downloads `0.6 MB` mapping/size conflict |
| FAQ `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `10`, `11`, `12`, `13`, `14`, `15`, `17`, `18` (17) | B, E | Plain source business answers/claims; untranslated BN; category/order preserved |
| FAQ `16` | B, D, E | Location/contact answer participates in source address conflict; BN missing |
| Vacancy `1`, `2`, `3`, `4` (4) | B, E | Source roles/responsibilities/requirements preserved; missing BN/deadline retained as absent; re-confirm Open at real launch |
| Certificate `iso-9001`, `iso-14001`, `iso-45001` (3) | B, D, E | Files present; legal validity/provenance and cross-page associations unestablished; no invented translations/evidence |
| Testimonial `1` | B, C, D, E | Stock portrait, unverified attribution, Faruk/Faruq discrepancy and BN gaps |
| Testimonial `2`, `3` (2) | B, C, E | Stock portraits/unverified attribution and incomplete BN |
| Application `1`, `2`, `3`, `4`, `5` (5) | C — excluded | Synthetic fixtures only, including deliberately missing vacancy reference; never production PII |
| Contact `demo-contact-01`, `-02`, `-03`, `-04`, `-05` (5) | C — excluded | Synthetic local records; import none |
| Users `demo-super-admin-01`, `demo-admin-01`, `demo-editor-01`, `demo-product-manager`, `demo-hr-manager` (5) | C — excluded | Replace with explicitly provisioned real identities; import none |
| Activity `demo-activity-001`, `-002`, `-003`, `-004`, `-005`, `-006`, `-007` (7) | C — excluded | Synthetic deterministic log; real audit begins with real operations |
| Roles `super-admin`, `administrator`, `content-editor`, `product-manager`, `hr-manager` (5) | A — template definitions only | Bootstrap reviewed role/capability templates, not mock user assignments or implied enforcement |
| Capability catalog (77 stable IDs across 26 domain definitions) | A — contract definitions only | Reuse all source identifiers/actions through controlled backend system data; descriptions about demo behavior need production wording review |

### Singleton, configuration and non-record source disposition

| Source object | Class(es) / treatment |
|---|---|
| Homepage (all seven sections and nested fixed slots) | B/C/D/E: literal claims/metrics; remote/local readiness; metric/download/testimonial mapping conflicts; untranslated copy. Preserve independent source values. |
| About + all leadership/timeline/value/stat slots | B/C/D/E: source claims, stock portraits, founder/title/metric conflicts, mixed language. No shared authoritative person tree. |
| Mission + values/attribution slots | B/C/D/E: disputed founder/MD attribution, stock portrait and partial localized coverage. |
| Sustainability + source claim/CSR slots | B/C/E: quantify claims only as unverified source copy; stock media/translation gaps. |
| Quality + process/certification slots | B/C/D/E: claims, media, unresolved certificate associations/translated coverage. |
| Navigation | A structure/targets; D phone values; B/E localized labels only as actually supplied. Preserve special Contact CTA/fixed controls. |
| Footer | A fixed links/query structure; B contact copy; C social `#`; D phone/address conflicts; E newsletter functionality absent. |
| Contact page | A stable subject keys/form structure; B copy; C placeholder offices; D contact/prefill subject conflict; E untranslated fields/real delivery absent. |
| SEO snapshot | B/D unverified Organization/contact claims; C placeholder analytics; A detected metadata structure; no centralized runtime behavior yet. |
| Site settings | A typed candidate structure; C social placeholders; D phones/addresses/hours/candidate conflicts; purpose emails not merged automatically. |
| Languages EN/BN + locale dictionaries | A actual locale keys/direction; B font/content review; E missing page coverage. Keep UI strings in versioned source; no fake completeness. |
| Public Privacy/Terms | B policy review and D conflicting address/phone; keep exact source copy until client/legal approves replacement; no current Admin editor. |
| Dashboard metrics/draft/recent-activity summaries | C synthetic or UI projections; do not seed production aggregate numbers. Compute authorized aggregates. |
| Foundation/Newsletter/Media placeholders | C demonstration only; Newsletter gets newly consented production records; Media Library UI stays deferred. |
| Legacy sitemap/robots/HTML SEO config | A source evidence, D incomplete/fragmented metadata and URL inventory; replace generated behavior only in approved rendering phase. |
| Assets in `public/` / `src/assets/` | B local byte presence does not prove provenance; C remote stock; D uncertain certificate/product associations; E absent references. Classify each asset reference with owning record and checksum in implementation dry-run; orphan bytes are not automatically public content. |

This inventory classifies all current collection seeds and singleton/source objects without turning prototype statuses, stock bytes or source claims into approved production truth. Detailed field/asset checksums and client review dispositions remain implementation/import prerequisites, not invented evidence.

## 51. Products end-to-end pilot plan

Products remains the strongest pilot: bilingual shared fields/specifications, unique SKU, category, ordered included media/cover, draft/publish/archive, RBAC and public SEO. Use newly supplied/approved representative assets/content, not assume Product 1 is resolved.

After architecture approval: validate stack/auth/container/migration gates → model Product/draft/translations/specifications/media → private upload/readiness → APIs/OpenAPI/adapters → frozen editor wiring → atomic publish/audit/outbox → build snapshot/static HTML/hydration → public consumption → staged backup/restore and security/SEO checks.

Pilot acceptance: duplicate SKU rejected by DB; incomplete draft allowed; invalid publish denied; no draft leakage; EN-only/complete BN behavior truthful; media reorder/cover/exclusion invariant; simultaneous edits return conflict; unauthorized direct IDs/mutations denied; archive releases removal; failed build retains last-good site; restore brings back DB/assets/matching release safely. **Product detail URLs are a separate approval gate:** current modal can be retained, but individual product discovery/social metadata needs a minimal dedicated crawlable detail presentation or an approved modal-permalink design. Do not invent a new frontend page silently. If declined, explicitly accept catalog-only product SEO limitation rather than claim full per-product SEO.

## 52. Automated testing strategy

Use Nest-compatible Vitest or Jest (pick one tested ESM setup), Supertest for HTTP integration, real disposable PostgreSQL 18 for persistence/constraints and Playwright for browser flows. Do not substitute SQLite/mocked Prisma for uniqueness/transaction/migration behavior. CI tests deterministic synthetic data; storage/email/deployment adapters use sandbox/contract tests.

Unit tests target domain behavior: SKU/slug/date precision, cover/order, publish validation, lifecycle transitions, capability/delegation/last-Super-Admin rules, translation completeness, webhook replay/order and retries. Integration tests cover DTO/public serialization/auth/cookies/MFA/CSRF/capabilities/direct IDs, transaction/audit/outbox atomicity and concurrent edits. Browser tests preserve approved 320px-first layout and keyboard UX while proving real login/logout/reset/MFA, disabled accounts, Products draft/publish/archive/media replacement, Contact submission, Application/status and Newsletter subscribe/unsubscribe. No CV test pretending uploads exist.

Rendering tests inspect raw HTML/head/links/locale and HTTP status independently of browser hydration; E2E checks no hydration mismatch, draft/PII in artifacts, and failed release recovery. Test email failure, lost build callback and DB rollback. Run required integration/security checks before broadening to other modules; coverage percentages alone are not acceptance.

## 53. Security testing strategy

Maintain an ASVS 5 requirement/evidence matrix, misuse-case tests and staged manual review. Exercise password enumeration/guessing limits, reset replay/expiry/concurrency, MFA bypass/recovery/TOTP reuse, logout/revocation/idle expiry, disabled accounts and role changes. Attempt users.manage/roles.manage escalation, self-promotion, concurrent last-admin disable and direct-ID applicant/contact access. Check dashboard/audit/media/download/preview authorization as well as main screens.

Test cross-origin login/mutations, missing/wrong CSRF headers, alternate content types, forged Origin/forwarded IP, wildcard CORS, caches and cookies. Test stored Markdown/link/metadata/JSON-LD XSS; SQL injection/query/filter bounds; mass assignment; malicious MIME/polyglot/oversized/pixel-bomb/ZIP assets; storage visibility and signed URL expiry; SSRF by remote URL; forged/replayed/out-of-order provider webhooks; draft/PII build export leaks and secret scans of client bundles.

Use dependency/container/secret scanning and staged OWASP ZAP baseline with appropriate test accounts/rate constraints; authenticated manual penetration review before first production launch. Automated scanners cannot prove auth, RBAC or privacy correctness. Tests use staging synthetic data, not live client PII or uncontrolled production load.

## 54. Cost tiers

No exact monthly prices are asserted without a selected plan/current quote. Estimates must use monthly base fees plus DB storage/backups/PITR, 5–50 GB media, transfer/request counts, email/contact/campaign volumes, monitoring/log retention, CI build minutes, registry and staging costs, domain renewals/tax/FX and operator support. Video/image bytes and bot traffic can dominate transfer; 100k visits alone is insufficient to price a plan.

| Tier | Direct vendor costs | Hidden effort / recovery | Fit |
|---|---|---|---|
| Minimum-cost VPS | VPS, offsite DB/media backup, object/CDN, email, domain and monitoring; existing payment may reduce incremental fee | Highest patching/disk/DB/restore on-call work; single machine interruption; recovery depends operator | Only with suitable plan, named support and explicit weaker recovery acceptance if necessary |
| Balanced hybrid | VPS + managed DB/PITR + storage/email/CDN/staging | Moderate host operations, easier DB restore; retains existing infrastructure value | Budget recommendation if ownership/capability verified |
| Managed | Static/CDN + always-on compute + managed DB/PITR + storage/email/observability | Lowest routine platform work; release/access/cost/restore duties remain | Default for beginner client staff |

Set an approved monthly ceiling and alert thresholds; obtain official quotes before freezing vendors. Do not sell free tiers as a reliable production architecture. Avoid overpaying for HA, replicas, streaming or large analytics infrastructure without measured needs; operator labor is part of total cost.

## 55. Failure-mode analysis

| Failure | User-visible behavior / containment | Recovery |
|---|---|---|
| DB/API unavailable | Static public site works; submissions/auth show honest failure; never fake receipt | Restore connectivity/fail closed; readiness/uptime alert; retry safe submission with idempotency |
| Publish commit succeeds/build fails | Admin sees accepted content + deployment failed; old public release remains | Retry candidate; no duplicate publish or notification |
| Deployment succeeds/callback lost | Static release may be live while DB pointer lags | Reconcile release ID/host status and advance pointer idempotently; embedded HTML dataset stays coherent |
| Old build finishes after new one | Promotion is rejected by generation/lease check | Keep newer release; retire obsolete artifact |
| Partial upload/cache purge failure | Prior complete release remains active; limited cache staleness surfaced | Atomic promotion, retries, bounded TTL; reject unsuitable host |
| Email/marketing provider outage | Durable form record retained; notification pending; reset delivery cannot imply usable email | Bounded retry/expiry, ops alert; submissions never lost solely for mail failure |
| Upload/derivative failure | Pending/quarantined media cannot publish | Retry processing or select approved replacement; immutable old asset stays live |
| Anti-bot outage | Submission cannot be accepted silently; accessible retry message | Restore service or controlled operator-reviewed fallback, never disable auth security automatically |
| VPS disk/host loss | API/DB interruption if colocated; public CDN can survive | Off-server restore, disk alert, capacity/runbook; independent keys/backups |
| Account/session/secret compromise | Revoke/disable, stop dangerous actions, investigate safe audit | Rotate secrets, preserve evidence, restore approved content and notify via incident policy |
| Bad schema migration | Release stops; rollback code only if schema compatible | Forward fix or approved restore with explicit data-loss consequence |
| Bad content/PII publication | Urgent purge/block; public backups/releases restricted | Correct approved content, revoke unsafe asset URLs, investigate; static rollback may reintroduce content so inspect first |

Public submission idempotency keys have bounded scope/expiry and server-validated payload hashes, so retries do not create duplicate Contact/Applications or email amplification. Full-site generation failure must not turn the published DB into public draft leakage through API fallback.

## 56. Future expansion readiness

REST/OpenAPI, stable IDs, module ownership, local capabilities and standard PostgreSQL enable future mobile/dealer/ERP integrations. Future mobile auth uses a separately designed token/OIDC flow, revocation and scopes; browser session architecture does not require JWT-in-localStorage now. Dealer portal needs distinct identities/tenant/ownership controls and direct foreign-resource tests; do not add speculative tenant IDs or portal tables today.

ERP integration can use bounded adapters, idempotent external references and outbox deliveries when a contract exists. Current product “In Stock” copy is not an inventory system. E-commerce requires a separate order/payment/tax/customer/stock architecture and authorization/security review; do not pre-create checkout tables or promise that this CMS already handles commerce. Extract workloads only when measured needs justify it.

## 57. Explicitly rejected technologies/complexity

Reject microservices, Kubernetes, Kafka, RabbitMQ, service mesh, Elasticsearch, GraphQL, Redis by default, event sourcing, CQRS frameworks, distributed transactions, separate repositories per module, Nx/Turborepo migration, generic page/menu builders, arbitrary scripts/schema controls, CV uploads, custom bulk mail, speculative ERP/e-commerce schemas, Next.js rewrite and mandatory Node public-rendering hosting.

Retain a small delivery outbox because losing a publish/email trigger between DB commit and external API is a demonstrated architectural failure mode. It does not require a broker or event-history platform. Keep limited immutable public release artifacts because static rollout/rollback needs them, not enterprise editorial version control.

## 58. Risks and unresolved decisions

**Before implementation approval:** accept Better Auth integration gate and password/MFA policy; accept SSG/hydration/release-state wiring; decide whether EN-unprefixed + `/bn` routing and product detail presentation are approved; accept launch Newsletter integration/consent scope with provider dashboard; accept source-conflict review/publication gates. These are targeted functional exceptions to the frozen prototype, not permission to redesign.

**Before vendor selection/deployment:** obtain Namecheap inventory, canonical domain/DNS/email ownership, budget/support owner, managed vs hybrid vs VPS profile, region/PostgreSQL18 availability, storage/email/anti-bot/monitoring vendors, recovery/retention/privacy policy and verified content/assets. No production vendor is selected by this report.

Technical risks: newly available Nest 12/Better Auth wrapper compatibility; frontend Vite/React/Router/Helmet build-render compatibility; memory/CPU for hashing/Sharp on small VPS; browser-only effects/hydration; complete static host promotion/404 capability; stale-content removal; provider sync/webhook behavior; unsupported root dependencies/toolchain and lockfile security status. These are gates to test, not reasons to silently change the approved stack.

Source risks: identity/claim/phone/address/certificate associations, public/Admin body/status discrepancies, missing product/download assets, stock media ownership and incomplete Bengali. Record unresolved evidence, do not substitute guesses. This is an architecture audit, not a full vulnerability assessment or renewed Task 5A visual acceptance run.

## 59. Questions that must be answered by the client before deployment

1. What exact domain(s), registrar/DNS, Namecheap plans, VPS/cPanel/email services and shared existing workloads are owned, and who can administer them? Supply summaries, not passwords.
2. What monthly vendor budget and paid technical-support arrangement are approved? Who receives alerts, patches servers and performs restores?
3. Which deployment profile is acceptable, and is managed PostgreSQL required or is self-hosted database responsibility explicitly accepted? Which region/provider supports PostgreSQL 18 and desired recovery?
4. What canonical www/HTTPS domain and Admin/API hostname arrangement is approved? Are `/bn` routes and minimal crawlable product details allowed within the frozen visual design?
5. Are minutes-level publish-to-live delays acceptable? Who handles failed builds/urgent removal? What publishing frequency and recovery objectives are required?
6. Who are the first real Super Admin and other Admins, which roles do they need, and who owns MFA/recovery? Is all-Admin MFA approved?
7. Who approves factual claims, leadership identity/title, product-media mappings, certificate documents/associations, testimonial attribution, phone/address/emails, social URLs and full editorial bodies/lifecycle?
8. Which assets have licensed provenance/originals, which Downloads files are supplied, and which Bengali pages are materially complete for launch? Who approves translations?
9. What privacy notice, applicant/contact purposes/retention/deletion, email notification recipients, processor locations and backup retention are approved? Does client legal/HR review require adjustments?
10. What newsletter audience size/send frequency/provider dashboard owner and consent/double-opt-in/unsubscribe policy are approved? How are existing mailing lists, if any, legally evidenced for import?
11. Who owns DNS/mail authentication/Analytics/Search Console, and which monitoring, storage/email and anti-bot providers/accounts are approved? Does chatbot remain in scope, and what server-side budget/privacy boundary is authorized?
12. What launch date, incident contacts, restore-drill acceptance, staging access and production change/promotion authority apply?

Vendor procurement and exact patch choices can remain open while architecture is approved; production deployment cannot proceed without their resolution.

## 60. Recommended implementation sequence after approval

1. Accept ADRs/scope choices; document clients' deployment-independent decisions and source review register.
2. Verify pinned Node/Nest/Prisma/Better Auth/Express/TS stack in isolated backend; prove container/native dependencies and migrations.
3. Establish configuration, private DB access, health/log redaction, API/OpenAPI/validation and auth/session/MFA/RBAC/audit foundations; bootstrap safely in staging.
4. Implement provider-neutral media/email/anti-bot adapters, quarantine/processing, outbox and backup/restore baseline.
5. Deliver Products pilot with frozen UI adapters, draft/publish/archive, real media and privacy/security tests.
6. Prove static rendering/hydration/route metadata/locale/product-detail decision, candidate builds/atomic deployment/rollback on a representative host.
7. Migrate remaining content/company/config modules with per-record source approval, assets and translation completeness; keep legal pages source-managed unless contract changes.
8. Implement real Contact/Applications and launch Newsletter with consent/provider reconciliation; verify privacy and retention tooling.
9. Finish governance/Activity wiring, required auth/pending/error states and capability-filtered dashboard; regress frozen public/Admin responsive/accessibility behavior.
10. Provision approved staging/production profiles, protected CI/release/image registry and controlled migrations; verify restore/security/load/SEO/social/actual HTTP behavior.
11. Client acceptance, content/claims approval, account/MFA training, operations runbook, Search Console and controlled production launch.

Each gate has evidence and stop conditions; architecture approval does not automatically authorize deployment, irreversible content cleanup or silent scope changes.

## 61. Exact files/directories expected in the next implementation phase

This is a proposed scope manifest. **None of these implementation files is created now.** First approved tranche should be foundations + Products + rendering compatibility pilot, not every domain at once.

```text
backend/package.json
backend/package-lock.json
backend/tsconfig.json
backend/tsconfig.build.json
backend/nest-cli.json
backend/Dockerfile
backend/.dockerignore
backend/.gitignore
backend/.env.example                         placeholders only
backend/prisma.config.ts
backend/prisma/schema.prisma
backend/prisma/migrations/<timestamp>_initial/migration.sql
backend/src/main.ts
backend/src/app.module.ts
backend/src/config/environment.ts
backend/src/common/database/{database.module,prisma.service}.ts
backend/src/common/http/{api-error.filter,request-context.middleware}.ts
backend/src/modules/auth/{auth.module,auth.config,auth.guard,mfa-policy.service}.ts
backend/src/modules/governance/{governance.module,capabilities,capability.guard}.ts
backend/src/modules/audit/{audit.module,audit.service}.ts
backend/src/modules/health/{health.module,health.controller}.ts
backend/src/modules/media/{media.module,media.service,object-storage.port}.ts
backend/src/modules/media/adapters/s3-object-storage.adapter.ts
backend/src/modules/email/{email.module,email.service,email-provider.port}.ts
backend/src/modules/anti-abuse/{anti-abuse.module,anti-bot.port}.ts
backend/src/modules/deliveries/{deliveries.module,outbox.service,outbox-runner}.ts
backend/src/modules/products/{products.module,products.service}.ts
backend/src/modules/products/{public-products.controller,admin-products.controller}.ts
backend/src/modules/products/dto/             draft/publish/public/admin contracts
backend/src/modules/publishing/{publishing.module,publishing.service,deployment.port}.ts
backend/src/generated/prisma/                generated; backend-only
backend/scripts/bootstrap-super-admin.ts
backend/scripts/seed-development.ts
backend/scripts/import-reviewed-content.ts
backend/test/{auth,rbac,products,media,publishing}.e2e-spec.ts
scripts/public-build/{generate-public-site,verify-public-html}.ts
src/entry-server.tsx                         build-only public renderer
src/api/{client,generated,adapters}/         frontend DTO/view-model adapters
docs/architecture/{ADRs,CONTENT_MIGRATION_MANIFEST,API_CONTRACT}.md
docs/operations/{DEPLOYMENT,BACKUP_RESTORE,INCIDENT_RESPONSE}.md
```

Expected existing-file edits after explicit approval: `src/main.tsx` for hydration/bootstrap, `src/App.tsx` for deterministic public routing/locale and approved auth entry points, `src/i18n/index.ts`/locale hook for URL locale/SSR safety, `vite.config.ts`/`index.html` for render build/head/secret boundary, package scripts/dependencies for tooling, Product adapters/editors/public data consumption and source constants transition. Preloader/motion/Chatbot changes are narrowly scoped compatibility/security work. No CSS/design overhaul. Product detail and `/bn` routes require their scope decision first.

Later approved deployment tranche: `compose.local.yaml`, `deploy/nginx/site.conf`, `deploy/apache/.htaccess.example`, `deploy/adapters/<selected-host>/`, `.github/workflows/{ci,staging,release,public-content-build}.yml`, frontend/runtime pin files and retention/restore scripts. Provider adapter names/configuration cannot be fixed before selection. Remaining domain controller/service/DTO/test directories follow the accepted module map. No pretend exact generated migration timestamp or vendor configuration is supplied.

## 62. Final architecture diagram in text form

```text
PUBLIC VISITOR / CRAWLER
  ├─ www.<approved-domain> → CDN / Apache / Nginx static host
  │                          └─ generated localized HTML + safe release data
  │                             + hydrated React + immutable assets
  └─ public read / Contact / Application / Newsletter API (bounded, no PII reads)
                                      │
ADMIN (dedicated origin; existing /admin/* UX)
  └─ static React → same-origin /api/v1 proxy → TLS reverse proxy / managed ingress
                                      │
                         Dockerized NestJS modular monolith
                         ├─ Better Auth → DB sessions / TOTP
                         ├─ capability RBAC → private Admin DTOs
                         ├─ content / company / operations / configuration
                         ├─ media → ObjectStorage port → selected S3-compatible store/CDN
                         ├─ mail/newsletter → provider ports → external delivery/campaigns
                         ├─ anti-bot → verifier port → selected provider
                         ├─ audit + redacted logs / health / metrics
                         └─ PostgreSQL 18 via Prisma 7 / pg / verified TLS
                              ├─ relational drafts / identities / submissions
                              ├─ safe published snapshots / active release pointer
                              └─ transactional delivery outbox
                                           │
                               leased retries → build/deploy adapter
                                           │
                       GitHub CI + scoped immutable candidate export
                       → generate / validate public HTML
                       → complete deployment → guarded promotion
                       → CDN/cache update + release reconciliation

INDEPENDENT RECOVERY
  provider PITR/base backups + encrypted off-account logical dumps
  + media originals/version copies + release artifacts + secured recovery keys
  → isolated quarterly restore drill / deletion-ledger replay

DEPLOYMENT CHOICES (same application):
  Managed: static/CDN + container host + managed PostgreSQL
  Hybrid: existing static host + client API VPS + managed PostgreSQL
  VPS: static host/CDN + client API VPS + private local PostgreSQL (operator-owned)
  All: external storage, external mail, monitoring and independent backups
```

## 63. Final recommendation

**APPROVE AFTER SPECIFIC DECISIONS.** The approved stack is viable and portable; no fundamental blocker requires a different framework/database/ORM or microservices. Recommended defaults: managed deployment for lowest maintenance, hybrid if client infrastructure/support is suitable; Better Auth database sessions + mandatory Super Admin TOTP; capability RBAC; relational multilingual collections with typed JSONB exceptions; static generated public HTML/hydration; external object/mail/newsletter; combined backups; no Redis in v1.

Approve the proposed architecture subject to the integration gates and explicit functional scope decisions in section 58. Provider procurement, content truth/legal validity, missing files, Bengali completeness, operational ownership and deployment acceptance remain unresolved. They must not be inferred from frontend approval.

**Implementation is paused pending approval, as expressly required by the Task 5B first-run rule.** Approval should identify accepted ADRs and any changed scope choices, especially localized URLs, product discovery, Newsletter consent and auth/release-state wiring. No implementation begins from this report alone.

## Proposed architecture decision records

All ADRs are **Proposed**, not accepted or implemented.

### ADR-001 — Modular monolith

- **Decision:** One Nest application/database with owned domain modules.
- **Why:** Small Admin team and cached public traffic favor simple operation.
- **Alternatives rejected:** Microservices and broker-based orchestration.
- **Consequences:** Shared releases; enforce module interfaces and transaction ownership.
- **Revisit trigger:** Measured isolation/scaling or independent team ownership requirement.

### ADR-002 — PostgreSQL

- **Decision:** PostgreSQL 18, current supported minor, standard verified-TLS connections.
- **Why:** Approved default; relational constraints, transactions and deliberate JSONB support.
- **Alternatives rejected:** SQLite production backend, provider-specific database APIs.
- **Consequences:** Provider must support 18; backup/connection/migration operation required.
- **Revisit trigger:** Verified hosting incompatibility requiring client approval, not cheaper-plan assumption.

### ADR-003 — Prisma version strategy

- **Decision:** Explicit tested Prisma 7 CLI/client/pg adapter pins and reviewed migrations.
- **Why:** Approved default; current `latest` can select Prisma 8 RC.
- **Alternatives rejected:** Prisma 8 RC, floating latest, automatic schema push.
- **Consequences:** ESM/config/generated-output and adapter pool/TLS compatibility tests.
- **Revisit trigger:** Stable-major support/security need demonstrated and approved through migration review.

### ADR-004 — REST/OpenAPI

- **Decision:** `/api/v1` JSON surfaces with explicit DTOs and OpenAPI/client adapters.
- **Why:** Fits frozen forms/editors and future documented integrations.
- **Alternatives rejected:** GraphQL and exposing Prisma types/entities directly.
- **Consequences:** Contract/version checks and explicit public/private response mapping.
- **Revisit trigger:** Proven consumer requirements that REST cannot meet economically.

### ADR-005 — Dockerized backend

- **Decision:** Multi-stage Node24 slim OCI image, non-root runtime, separate migration execution.
- **Why:** Same API deploys to managed compute or client VPS.
- **Alternatives rejected:** Host-specific runtime business logic and container-start migrations.
- **Consequences:** Native-library/health/shutdown/image scanning and registry ownership.
- **Revisit trigger:** Tested host limitation or material native-image/runtime constraint.

### ADR-006 — Authentication/session model

- **Decision:** Better Auth inside Nest Auth boundary, PostgreSQL-backed opaque cookies, no session cookie cache; TOTP policy enforced server-side.
- **Why:** Reduces custom lifecycle code while retaining portable identities and immediate revoke policy.
- **Alternatives rejected:** JWT localStorage, bespoke Passport reset/MFA stack, new identity server.
- **Consequences:** Community Nest integration/Prisma/parser/assurance tests and controlled upgrades; scoped auth UI additions.
- **Revisit trigger:** Failed integration/security gate or existing corporate SSO/IdP requirement.

### ADR-007 — RBAC capabilities

- **Decision:** One Admin role, stable 77-capability starting catalog, default deny and protected Super Admin delegation.
- **Why:** Matches Task4I contract and conservative applicant access.
- **Alternatives rejected:** Frontend-only enforcement, arbitrary superuser bypass, per-user overrides.
- **Consequences:** Per-operation policy tests, live permission evaluation and revocation/audit on changes.
- **Revisit trigger:** A demonstrated workflow that cannot be represented by role bundles.

### ADR-008 — Multilingual data model

- **Decision:** Relational entities/translations/shared blocks; typed JSONB for fixed configs and immutable publication snapshots.
- **Why:** Preserves one structure with language-specific fields and practical querying.
- **Alternatives rejected:** Separate EN/BN trees and JSON-for-everything.
- **Consequences:** Locale completeness validation and view-model adapters; no fabricated translation fallback SEO.
- **Revisit trigger:** Additional locales or complex structured-query requirements exceeding config payload design.

### ADR-009 — Object storage abstraction

- **Decision:** MediaService/ObjectStorage port with tested S3-compatible adapter, immutable keys/private originals as applicable.
- **Why:** Media exceeds ephemeral API files; portability and documentary integrity matter.
- **Alternatives rejected:** Provider SDKs in domains and API-container local storage.
- **Consequences:** Asset lifecycle/provenance, reference protection, independent media backup and adapter conformance tests.
- **Revisit trigger:** Verified cost/feature/access requirement, with copy/checksum migration plan.

### ADR-010 — Email provider abstraction

- **Decision:** External transactional provider plus provider-based newsletter through separate purpose-specific ports.
- **Why:** Launch requires reset/forms/newsletter; beginner staff should use provider campaign tools.
- **Alternatives rejected:** Custom bulk sender and business modules hardwired to Brevo/Resend/SES.
- **Consequences:** DNS authentication, consent/suppression reconciliation, durable retries and delivery pilot.
- **Revisit trigger:** Demonstrated deliverability, pricing or campaign usability failure.

### ADR-011 — SEO rendering architecture

- **Decision:** Build-time public HTML generation and hydration from safe immutable release data; Admin CSR.
- **Why:** Reliable initial HTML/social metadata while preserving static deployment and Vite.
- **Alternatives rejected:** CSR-only production SEO, runtime SSR by default, bot-only snapshots, Next.js rewrite.
- **Consequences:** Browser-effect compatibility work, approved locale/product scope, rebuild/failure/live status and atomic releases.
- **Revisit trigger:** Publishing freshness/build duration/content scale violates agreed targets.

### ADR-012 — Deployment portability

- **Decision:** Managed, hybrid and VPS profiles use same OCI/API/DB/storage/email contracts.
- **Why:** Client hosting/budget is unresolved and beginner-team maintenance dominates.
- **Alternatives rejected:** Requiring any named application/database/static host.
- **Consequences:** Provider adapters/proxy rules differ; production profile needs verified client inventory/support.
- **Revisit trigger:** New contractual hosting constraint or evidence a profile cannot meet acceptance.

### ADR-013 — No Redis in v1

- **Decision:** CDN/static caching, PostgreSQL sessions/outbox and bounded single-instance throttling/edge controls.
- **Why:** Monthly public visits do not demonstrate distributed cache need.
- **Alternatives rejected:** Redis solely for 100k visits or default framework architecture.
- **Consequences:** Restart-aware auth counters and explicit shared-limit requirement before replicas.
- **Revisit trigger:** Measured distributed throttling/session/query load requiring shared fast state.

### ADR-014 — Backup strategy

- **Decision:** Provider PITR/base backup plus independent encrypted logical dumps/media copies and tested restore.
- **Why:** Provider/account/server failure and portability require independent recovery.
- **Alternatives rejected:** Provider-only backup, same-VPS backup, calling daily dumps hourly RPO.
- **Consequences:** Backup budget/keys/retention/operator drills; explicit lower-budget RPO exception if selected.
- **Revisit trigger:** Client recovery/retention requirements or restore evidence changes.

### ADR-015 — Environment separation

- **Decision:** Strict local/staging/production DB/bucket/secret/recipient/origin separation.
- **Why:** Prevent PII leaks, cross-environment actions and accidental real notifications.
- **Alternatives rejected:** Staging against production data or shared production provider lists/secrets.
- **Consequences:** Some duplicate service cost; safe fixtures and separate public-origin builds.
- **Revisit trigger:** A formally approved anonymized test-data workflow with demonstrated controls.

## Audit evidence and limits

- Repository baseline: clean tracked/untracked working tree before report; commit `855c1a2`.
- Read-only source review: root package/lock/config/router/bootstrap; public pages/shared components; all Admin type/data files and route/layout boundaries; locale source; robots/sitemap; existing dist HTML.
- Static checks: 19 public page components inspected; 18 have Helmet/canonical, 11 have some page OG, none have page Twitter, only Home has JSON-LD; source counts recorded in section 2.
- Raw HTTP inspection: 6/6 observations completed on local Vite server; all returned CSR shell with 200. The unknown-route observation is a local SEO defect, not a claim about an uninspected deployment.
- Browser inspection: Home EN/BN same-URL behavior, Products link/metadata behavior, News7/Blog featured detail content and NotFound. After awaiting the lazy Admin heading, `/admin/users` rendered `.admin-root`, synthetic Users and no public Navbar, with no login required and inherited `index, follow`. This was targeted architectural observation, not a new full responsive/accessibility/console acceptance suite or a security-enforcement test.
- Official documents and read-only package metadata checked; no dependency install, scaffold, migration, production account access, secret inspection or deployment.
- Task5A results are supplied user context; this report does not claim to have rerun that acceptance suite. New application/security/container/DB/E2E tests are intentionally deferred because no implementation is authorized.
- Task5B report completeness: 63 numbered sections; six required comparison categories (auth, rendering, deployment, multilingual storage, storage, backup); 15 proposed ADRs with decision/why/alternatives/consequences/revisit trigger.

Approval request: approve this proposal and identify any changes to the section58 implementation scope decisions. Implementation remains stopped until that approval.
