import type { LanguageSourceRecord } from '../types/languages';

export const languageSourceRecords: LanguageSourceRecord[] = [
  { code: 'en', label: 'English', direction: 'ltr', localeLeafKeys: 154, typography: 'Manrope / configured Latin fallbacks', contentCoverage: 'Primary source language; several pages remain hardcoded English.' },
  { code: 'bn', label: 'বাংলা', direction: 'ltr', localeLeafKeys: 154, typography: 'Li Niladri Nodia Unicode with configured fallbacks', contentCoverage: 'Locale keys aligned, but site-wide Bengali content coverage is incomplete / mixed.' },
];

export const knownLanguageWarnings = ['Careers Bengali incomplete', 'Blog Bengali incomplete', 'Contact Bengali unavailable in current source'];
