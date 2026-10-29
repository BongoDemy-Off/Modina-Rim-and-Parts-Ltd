/**
 * Central locale configuration registry.
 *
 * Adding a future language/font requires:
 *   1. Add the translation JSON to src/i18n/
 *   2. Register it in src/i18n/index.ts
 *   3. Add the approved font asset(s) to src/assets/Fonts/
 *   4. Register @font-face in src/index.css
 *   5. Add one entry here
 *
 * No page-component changes are required.
 */

export interface LocaleConfig {
  /** Value written to <html lang="..."> */
  lang: string;
  /** Text direction written to <html dir="..."> */
  dir: 'ltr' | 'rtl';
  /** CSS font-family stack for --font-sans */
  fontSans: string;
  /** CSS font-family stack for --font-display */
  fontDisplay: string;
  /**
   * CSS font-family stack for --font-condensed.
   * Included even though no component currently uses font-condensed,
   * so future components cannot accidentally bypass locale typography.
   */
  fontCondensed: string;
  /** CSS font-family stack for --font-mono */
  fontMono: string;
  /** Class toggled on <html> for locale-scoped CSS (font-synthesis-weight, etc.) */
  cssClass: string;
}

// ─── English stacks — preserve approved typography exactly ───────────────────
const EN_SANS      = '"Manrope", "Inter", ui-sans-serif, system-ui, sans-serif';
const EN_DISPLAY   = '"Manrope", ui-sans-serif, system-ui, sans-serif';
const EN_CONDENSED = '"Manrope", ui-sans-serif, system-ui, sans-serif';
const EN_MONO      = '"JetBrains Mono", ui-monospace, monospace';

// ─── Bengali stacks ───────────────────────────────────────────────────────────
// Nodia leads for Bengali codepoints (unicode-range restricts it to U+0980–09FF).
// Manrope follows so Latin characters in mixed elements (ISO labels, SKUs, etc.)
// still resolve to Manrope with genuine weights.
// Noto Sans Bengali / Shonar Bangla provide a Unicode-safe Bengali fallback
// in case the custom font fails to load.
const BN_SANS      = '"Li Niladri Nodia Unicode", "Manrope", "Noto Sans Bengali", "Shonar Bangla", ui-sans-serif, sans-serif';
const BN_DISPLAY   = '"Li Niladri Nodia Unicode", "Manrope", "Noto Sans Bengali", "Shonar Bangla", ui-sans-serif, sans-serif';
const BN_CONDENSED = '"Li Niladri Nodia Unicode", "Manrope", "Noto Sans Bengali", "Shonar Bangla", ui-sans-serif, sans-serif';
// For mono contexts (product SKUs, technical codes): Nodia covers Bengali
// characters; JetBrains Mono covers Latin/numeric content.
const BN_MONO      = '"Li Niladri Nodia Unicode", "JetBrains Mono", ui-monospace, monospace';

export const LOCALES: Record<string, LocaleConfig> = {
  en: {
    lang:          'en',
    dir:           'ltr',
    fontSans:      EN_SANS,
    fontDisplay:   EN_DISPLAY,
    fontCondensed: EN_CONDENSED,
    fontMono:      EN_MONO,
    cssClass:      'locale-en',
  },
  bn: {
    lang:          'bn',
    dir:           'ltr',
    fontSans:      BN_SANS,
    fontDisplay:   BN_DISPLAY,
    fontCondensed: BN_CONDENSED,
    fontMono:      BN_MONO,
    cssClass:      'locale-bn',
  },
};

export const DEFAULT_LOCALE = 'en';
