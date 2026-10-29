import type { EditorialRecordBase } from './editorial';

export const newsContentTypes = ['Company News', 'Product Updates', 'Industry', 'Events'] as const;
export type NewsContentType = typeof newsContentTypes[number];

export interface AdminNewsItem extends EditorialRecordBase {
  contentType: NewsContentType | '';
  factualClaimReminder: boolean;
  sourceReviewWarning?: string;
}
