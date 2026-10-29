Modina Rim & Parts Ltd.
Premium Light Design System v2.0
Optimized for Google Antigravity 2.0
OBJECTIVE
Redesign the entire website into a world-class premium manufacturing website while preserving every feature, route, business logic, API integration, SEO structure, responsiveness, accessibility, and performance.

DO NOT redesign functionality.

ONLY redesign the visual system.

The final result should look comparable to Apple, Bosch, Stripe, Siemens, SKF, Continental, and other premium international manufacturers.

The website should immediately communicate:

Premium Manufacturing
International Quality
Engineering Excellence
Trust
Innovation
Clean Modern Design
The client explicitly requested:

White background
Light premium UI
Larger text
Better readability
Cleaner layout
More premium appearance
This design system MUST satisfy those requirements.

DESIGN PHILOSOPHY
Keywords: Premium, Minimal, Luxury, Engineering, Corporate, International, Clean, Modern, Elegant, Professional, Readable, Trustworthy.

Never flashy. Never cluttered. Never overly colorful.
Never futuristic cyberpunk. Never dark. Never glassmorphism-heavy. Never neumorphism.
Always clean. Always spacious. Always premium.
Geometry should feel engineered and precise (avoid overly rounded, bubble-like UI).
COLOR SYSTEM
Primary Background: #FFFFFFSecondary Background: #F8F9FBAlternate Section: #F4F6F8Card Background: #FFFFFFBorder: #E5E7EBDivider: #ECECEC

Primary Text: #111827Heading: #0F172ASecondary Text: #6B7280Muted Text: #94A3B8

Brand Primary: Use the existing Modina Rim & Parts Ltd. brand red. Do NOT invent a new primary color.Success: #16A34AWarning: #D97706Error: #DC2626

Links: #0F172A (Dark Slate) with a 1px underline.Hover: Underline thickens, text turns Brand Red.

Never use pure black backgrounds.Never use gradients as page backgrounds.

TYPOGRAPHY
Primary Font: ManropeFallback: Inter, Sans-serifWeights: 400, 500, 600, 700, 800

Use CSS clamp() for fluid typography across all screen sizes.

Hero Title: clamp(40px, 6vw, 72px)Hero Subtitle: clamp(18px, 2vw, 22px)Section Title: clamp(32px, 4vw, 48px)Section Subtitle: clamp(18px, 2vw, 20px)Card Title: 24px to 28pxBody: 18px to 20px (Base 1.125rem)Small Text: 14px to 16pxButtons: 16pxNavigation: 15px to 16pxFooter: 15px

Line Height: 150%Letter Spacing: Default (Headings can use slight negative tracking, e.g., -0.02em, to feel premium).

Headings should feel bold and confident.Never use tiny text. Never use thin typography.The website must feel readable from several feet away.

LAYOUT
Maximum Width: 1280pxContent Width: 1200pxContainer Padding: Desktop (80px), Tablet (48px), Mobile (24px)

Section Spacing: 120px vertical (Desktop), 64px (Mobile)Component Gap: 32pxCard Gap: 32pxGrid: 12-column responsive layout

Whitespace is premium. Increase whitespace throughout the entire website. Never crowd elements together.

BORDER RADIUS
Cards: 12pxButtons: 8pxImages: 12pxInputs: 8pxBadges: 999px (Pill shape)

Do not use excessive rounding. Geometry should feel engineered and precise, fitting for a metal fabrication manufacturer.

SHADOW SYSTEM
Use soft, diffuse shadows. Do not use harsh, short-spread shadows.

Shadow Small: 0px 2px 8px rgba(0, 0, 0, 0.04)Shadow Medium: 0px 8px 24px rgba(0, 0, 0, 0.06)Shadow Large: 0px 16px 48px rgba(0, 0, 0, 0.08)Hover Shadow: 0px 20px 50px rgba(0, 0, 0, 0.10)

Never use glowing effects. Never use sharp, dark drop-shadows.

BUTTONS
Primary Button: Filled (Brand Red), White Text, Large (56px height), 8px radius.Hover: Lifts slightly (translateY(-2px)), shadow increases to Hover Shadow.Transition: 250ms ease.

Secondary Button: White background, 1px solid Border (#E5E7EB), Dark text (#0F172A).Hover: Background turns #F8F9FB.

Ghost Button: Transparent, dark text, 1px underline on hover.

ICONOGRAPHY
Use outline icons. Simple. Modern. Consistent stroke width.Never use colorful icons.Prefer Lucide icons. Icons should be 20px or 24px in UI contexts.

NAVIGATION
Sticky navbar.White background with subtle bottom border (#E5E7EB).

Height: 72px (Desktop).Must shrink to 64px and add a subtle shadow on scroll to maximize viewport space.Mobile Height: 64px.

Logo left. Menu center/right. Primary CTA button on right.

Dropdowns: 8px radius, soft shadow, large spacing, large typography.Navigation should remain visible during scrolling.

HERO SECTION
Large premium product photography.Clean white background.Massive heading (using fluid clamp sizes).Short supporting paragraph.Primary CTA and Secondary CTA.Trust badges below CTA (e.g., ISO Certified, 25+ Years Experience, Export Quality, Premium Manufacturing).

The hero should occupy nearly the full first screen.Avoid clutter.

PRODUCT CARDS
Large product image (12px radius).Minimal text.12px rounded corners.Soft shadow.

Hover: Lift upward (translateY(-4px)), shadow increases, image slightly zooms (scale 1.02).Product name, short description, and "View Details" CTA.Never overload cards with information.

ABOUT SECTION
Two-column layout.Large image (12px radius).Strong heading.Readable paragraph.Feature list.Timeline or milestones optional.

STATS SECTION
White background.Large numbers (using fluid typography or clamp(32px, 4vw, 48px)).Examples: 25+ Years Experience, 500+ Products, 100+ Dealers, 30+ Districts Served.Numbers should be visually dominant.

QUALITY SECTION
Highlight: ISO Certification, Testing, Manufacturing, Inspection, Factory Process.Use cards with icons.Minimal text.

CERTIFICATES
Display certificates inside premium cards (12px radius).Hover zoom (scale 1.05).Lightbox support.

GALLERY
Large masonry grid.Rounded images (12px radius).Hover scale (scale 1.02).Lazy loading.

NEWS
Magazine layout.Large featured article.Cards below.Minimal metadata.

CONTACT
Large embedded map (12px radius).Clean contact cards.Simple form.Large inputs (56px height).Rounded inputs (8px).Clear CTA.

FOOTER
White background.Thin top divider (#E5E7EB).Company info, Quick links, Products, Contact.Social icons.Newsletter input.Keep generous spacing.

FORMS
Large inputs (56px height).8px radius.Soft border (#E5E7EB).Focus: 2px Brand Red outline.Never use dark inputs.

TABLES
8px radius on container.Light borders (#E5E7EB).Alternating rows (#FFFFFF and #F8F9FB).Readable spacing.Large typography.

IMAGES
High-quality only. Bright. Natural lighting.White backgrounds preferred.Manufacturing, factory, products, engineers, machines, quality inspection.Never use low-resolution images.

ANIMATIONS
Subtle. Premium. Duration: 200–350ms.Fade, Slide, Scale.No bouncing. No spinning. No excessive parallax.Animations should enhance—not distract.

ACCESSIBILITY
Minimum contrast ratio: AA.Keyboard accessible.Visible focus states (2px Brand Red outline).ARIA preserved.Never sacrifice accessibility for aesthetics.

RESPONSIVE
Mobile First: Start with the smallest usable phone layout, then progressively enhance for tablet, laptop, desktop, and large desktop. Very narrow phones use the approved compact two-row Navbar so the full tap-to-call telephone number, Search, Menu, and brand identity remain usable; wider mobile/tablet uses the compact one-row header where content fits, and xl+ retains the approved desktop navigation. Use content-driven stacking, wrapping, grids, and intentional inner scrollers. Keep touch targets practical, form controls at least 16px on mobile, meaningful content uncropped, and the document free of unintended horizontal scrolling while preserving the approved desktop visual identity.

PERFORMANCE
Do not increase bundle size unnecessarily.Reuse existing components.Optimize images.Lazy-load heavy assets.Maintain Lighthouse scores.

TAILWIND CSS INTEGRATION
Antigravity must map the above design tokens into the Tailwind v4 @theme block inside src/index.css.

Replace all existing dark mode utility classes (e.g., bg-modina-dark, text-white body backgrounds) with the new light theme utilities.
Ensure dark mode tokens are safely overwritten or removed to prevent styling conflicts.
Utilize Tailwind's container queries and flex/grid utilities to achieve the specified 12-column layout and whitespace rules.
COMPONENT GUIDELINES
All cards should share one consistent style.All buttons should share one consistent style.All spacing should follow an 8px grid.All icons should be consistent.All shadows should be consistent.No component should feel visually disconnected.

WHAT TO REMOVE
Remove dark backgrounds.Remove heavy gradients.Remove glowing borders.Remove excessive blur.Remove neon effects.Remove overly aggressive animations.Remove tiny typography.Remove cramped layouts.Remove inconsistent spacing.Remove decorative elements that do not add value.

WHAT TO KEEP
Existing routing.Business logic.SEO.Backend integration.API calls.Forms.Database.Animations (if subtle).Accessibility.Responsiveness.Localization.Performance optimizations.

IMPLEMENTATION RULES FOR GOOGLE ANTIGRAVITY 2.0
Preserve all functionality and routing.
Preserve all backend integrations and API calls.
Refactor only the presentation layer.
Reuse existing React components where possible.
Replace dark theme tokens with the new light design system.
Increase typography sizes throughout the application.
Increase whitespace consistently.
Improve visual hierarchy using spacing, typography, and layout—not decorative effects.
Use Tailwind utility classes consistently.
Create reusable design tokens for colors, spacing, radius, and shadows.
Ensure every page follows the same design language.
Maintain excellent performance, accessibility, SEO, and responsiveness.
The final experience should feel like a premium international manufacturing website rather than a generic industrial catalog.
FINAL DESIGN GOAL
Create a clean, elegant, premium, light-themed website that immediately communicates engineering excellence, manufacturing quality, and international credibility. The interface should feel refined, spacious, and highly readable, with consistent components, subtle motion, and a timeless visual identity suitable for Modina Rim & Parts Ltd.
