export interface SeoSettings {
  defaultTitle: string;
  defaultDescription: string;
  siteName: string;
  ogTitle: string;
  ogDescription: string;
  socialImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  detectedCanonicalBase: string;
}

export interface OrganizationSourceClaim { label: string; value: string; warning?: string }
