export interface SourceOccurrence { location: string; value: string }
export interface SiteSettings {
  companyName: string;
  foundingYear: string;
  siteUrl: string;
  candidatePhone: string;
  candidateAddress: string;
  candidateHours: string;
  salesEmail: string;
  privacyEmail: string;
  legalEmail: string;
  careersEmail: string;
  socialLinks: Array<{ platform: 'Facebook' | 'Twitter' | 'LinkedIn' | 'Instagram'; candidateUrl: string; currentSource: '#' }>;
  phoneOccurrences: SourceOccurrence[];
  addressOccurrences: SourceOccurrence[];
  hoursOccurrences: SourceOccurrence[];
  logoReference: string;
  faviconReference: string;
}
