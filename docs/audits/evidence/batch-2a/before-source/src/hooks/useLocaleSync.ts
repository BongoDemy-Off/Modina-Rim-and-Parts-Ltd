import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LOCALES, DEFAULT_LOCALE } from '../i18n/locales';

/**
 * useLocaleSync — root-level locale synchronization hook.
 *
 * Must be called once at the App root. Synchronises the <html> element
 * with the active i18next locale before the browser's normal paint,
 * ensuring no flash of incorrect English typography on hard-refresh
 * when a non-English locale is stored in localStorage.
 *
 * Effects on every locale change:
 *   - <html lang="...">         document language
 *   - <html dir="...">          text direction (ltr / rtl)
 *   - <html class="locale-*">   locale CSS class (used for font-synthesis-weight scoping)
 *   - :root --font-sans         overrides @theme compile-time default
 *   - :root --font-display      overrides @theme compile-time default
 *   - :root --font-condensed    overrides @theme compile-time default
 *   - :root --font-mono         overrides @theme compile-time default
 *
 * Locale resolution order (precise → base → default):
 *   1. i18n.resolvedLanguage (e.g. "bn-BD" or "bn") — exact LOCALES key
 *   2. Base language portion (e.g. "bn" from "bn-BD")
 *   3. DEFAULT_LOCALE ("en")
 */
export function useLocaleSync(): void {
  const { i18n } = useTranslation();

  // useLayoutEffect fires synchronously after DOM mutations but before paint,
  // ensuring lang/dir/class/font-tokens are set on the first meaningful frame.
  useLayoutEffect(() => {
    const resolved = i18n.resolvedLanguage ?? i18n.language ?? DEFAULT_LOCALE;

    const cfg =
      LOCALES[resolved] ??
      LOCALES[resolved.split('-')[0]] ??
      LOCALES[DEFAULT_LOCALE];

    const root = document.documentElement;

    // 1. Document language and direction
    root.lang = cfg.lang;
    root.dir  = cfg.dir;

    // 2. Swap locale CSS class (remove any existing locale-* class first)
    Object.values(LOCALES).forEach(c => root.classList.remove(c.cssClass));
    root.classList.add(cfg.cssClass);

    // 3. Override Tailwind @theme font tokens at runtime.
    //    Inline styles on :root take precedence over @theme compile-time values.
    //    All components using font-sans / font-display / font-condensed / font-mono
    //    automatically resolve to the overridden token — no component changes needed.
    root.style.setProperty('--font-sans',      cfg.fontSans);
    root.style.setProperty('--font-display',   cfg.fontDisplay);
    root.style.setProperty('--font-condensed', cfg.fontCondensed);
    root.style.setProperty('--font-mono',      cfg.fontMono);
  }, [i18n.resolvedLanguage, i18n.language]);
}
