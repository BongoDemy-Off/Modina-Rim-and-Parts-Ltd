import type { EditorialRecordBase } from './editorial';

export const blogCategories = ['Engineering', 'Quality', 'Industry', 'Company', 'Manufacturing'] as const;
export type BlogCategory = typeof blogCategories[number];

export interface AdminBlogPost extends EditorialRecordBase {
  category: BlogCategory | '';
  tags: string[];
  featured: boolean;
}
