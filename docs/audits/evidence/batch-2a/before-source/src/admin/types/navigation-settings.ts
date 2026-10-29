export type LocalizedText = { en: string; bn: string };

export type NavigationTarget =
  | '/'
  | '/products'
  | '/quality'
  | '/certificates'
  | '/sustainability'
  | '/about'
  | '/mission'
  | '/careers'
  | '/faq'
  | '/downloads'
  | '/gallery'
  | '/news'
  | '/blog'
  | '/contact';

export interface NavigationChildItem {
  id: string;
  label: LocalizedText;
  target: NavigationTarget;
  order: number;
}

export interface NavigationTopItem {
  id: 'home' | 'products' | 'quality' | 'company' | 'media';
  kind: 'link' | 'group';
  label: LocalizedText;
  target?: NavigationTarget;
  order: number;
  children: NavigationChildItem[];
}

export interface NavigationSettings {
  items: NavigationTopItem[];
  contactCta: { label: LocalizedText; target: '/contact'; structuralRole: 'special-contact-cta' };
  fixedControls: Array<'logo-and-brand' | 'search' | 'language-switch' | 'phone-cta'>;
  phoneSources: { desktopAndCompact: string; mobileDrawer: string };
}
