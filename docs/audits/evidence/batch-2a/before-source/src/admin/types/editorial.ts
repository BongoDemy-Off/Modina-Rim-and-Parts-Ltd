import type { AdminStatus } from '../types';

export type EditorialLanguage = 'en' | 'bn';

export interface LocalizedEditorialText {
  en: string;
  bn: string;
}

export interface EditorialMedia {
  src: string;
  name: string;
  size: string;
  dimensions: string;
  source: 'frontend-placeholder' | 'local-preview';
  productionReady: boolean;
}

interface EditorialBlockBase {
  id: string;
}

export interface EditorialTextBlock extends EditorialBlockBase {
  type: 'paragraph' | 'quote';
  content: LocalizedEditorialText;
}

export interface EditorialHeadingBlock extends EditorialBlockBase {
  type: 'heading';
  level: 2 | 3;
  content: LocalizedEditorialText;
}

export interface EditorialListItem {
  id: string;
  content: LocalizedEditorialText;
}

interface EditorialListBlockBase extends EditorialBlockBase {
  items: EditorialListItem[];
}

export type EditorialListBlock =
  | (EditorialListBlockBase & { type: 'bulleted-list' })
  | (EditorialListBlockBase & { type: 'numbered-list' });

export interface EditorialImageBlock extends EditorialBlockBase {
  type: 'image';
  media: EditorialMedia | null;
  alt: LocalizedEditorialText;
  caption: LocalizedEditorialText;
}

export interface EditorialDividerBlock extends EditorialBlockBase {
  type: 'divider';
}

export type EditorialBlock = EditorialTextBlock | EditorialHeadingBlock | EditorialListBlock | EditorialImageBlock | EditorialDividerBlock;

export interface EditorialSeo {
  title: LocalizedEditorialText;
  description: LocalizedEditorialText;
}

export interface EditorialRecordBase {
  id: string | number;
  slug: string;
  title: LocalizedEditorialText;
  excerpt: LocalizedEditorialText;
  blocks: EditorialBlock[];
  cover: EditorialMedia | null;
  coverAlt: LocalizedEditorialText;
  publicationMonth: string;
  sourceReadTime?: string;
  seo: EditorialSeo;
  status: Extract<AdminStatus, 'Draft' | 'Published' | 'Archived'>;
  updatedAt: string;
  editor: string;
}

export interface EditorialValidationErrors {
  title?: string;
  slug?: string;
  classification?: string;
  body?: string;
  publicationMonth?: string;
  cover?: string;
}

export const emptyLocalizedText = (): LocalizedEditorialText => ({ en: '', bn: '' });

export const makeBlockId = () => `block-${crypto.randomUUID()}`;

export function normalizeSlug(value: string): string {
  return value
    .normalize('NFKD')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function hasMeaningfulEnglishBody(blocks: EditorialBlock[]): boolean {
  return blocks.some((block) => {
    if (block.type === 'divider' || block.type === 'image') return false;
    if (block.type === 'bulleted-list' || block.type === 'numbered-list') return block.items.some((item) => item.content.en.trim());
    return Boolean(block.content.en.trim());
  });
}

export function getEnglishWordCount(blocks: EditorialBlock[]): number {
  const text = blocks.flatMap((block) => {
    if (block.type === 'divider' || block.type === 'image') return [];
    if (block.type === 'bulleted-list' || block.type === 'numbered-list') return block.items.map((item) => item.content.en);
    return [block.content.en];
  }).join(' ').trim();
  return text ? text.split(/\s+/).length : 0;
}

export function estimateReadTime(blocks: EditorialBlock[]): string {
  const words = getEnglishWordCount(blocks);
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

export function cloneEditorialRecord<RecordType extends EditorialRecordBase>(record: RecordType): RecordType {
  return structuredClone(record);
}
