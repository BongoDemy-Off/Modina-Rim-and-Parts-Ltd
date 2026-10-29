import type { AdminNewsItem, NewsContentType } from '../types/news';
import type { EditorialBlock, EditorialMedia } from '../types/editorial';
import { emptyLocalizedText, normalizeSlug } from '../types/editorial';

const placeholder = (seed: string): EditorialMedia => ({
  src: `https://picsum.photos/seed/${seed}/1200/700`, name: `${seed} frontend placeholder`, size: 'Remote frontend placeholder',
  dimensions: 'Source requests 1200 × 700px', source: 'frontend-placeholder', productionReady: false,
});

const paragraphs = (recordId: number, values: string[]): EditorialBlock[] => values.map((value, index) => ({
  id: `news-${recordId}-paragraph-${index + 1}`, type: 'paragraph', content: { en: value, bn: '' },
}));

interface NewsSeed {
  id: number;
  title: string;
  contentType: NewsContentType;
  date: string;
  excerpt: string;
  readTime: string;
  body: string[];
  sourceReviewWarning?: string;
}

const seeds: NewsSeed[] = [
  { id: 1, title: 'ISO 9001:2015 Certification Successfully Renewed for 2025–2026', contentType: 'Company News', date: 'March 2026', readTime: '3 min read', excerpt: 'Modina Rim & Parts Ltd. has completed its annual ISO 9001:2015 surveillance audit with zero non-conformances, reaffirming our commitment to world-class quality management.', body: ['Modina Rim & Parts Ltd. has successfully completed its annual ISO 9001:2015 surveillance audit.', 'The audit covered production planning, raw material inspection, in-process quality controls, final inspection, and corrective-action procedures.', 'Customers and distributors may request current certification documentation through the company contact channel.'] },
  { id: 2, title: 'New CNG Rim Variant Released for Commercial Fleet Operators', contentType: 'Product Updates', date: 'February 2026', readTime: '4 min read', excerpt: 'Following market demand from commercial operators, Modina has introduced a reinforced CNG rim variant engineered for higher load ratings and extended service life.', body: ['Modina has introduced a reinforced CNG rim variant for commercial fleet operators.', 'The design responds to higher payloads, extended operating hours, and demanding road conditions.', 'The new variant will be available through the existing distributor network.'] },
  { id: 3, title: 'Modina Participates in Dhaka International Trade Expo 2026', contentType: 'Events', date: 'January 2026', readTime: '5 min read', excerpt: 'Our team showcased the full 2026 product range at the Dhaka International Trade Expo, connecting with over 200 distributors and manufacturers from across South Asia.', body: ['Modina Rim & Parts Ltd. participated in the Dhaka International Trade Expo 2026.', 'The team presented the current product range and met distributors and manufacturers from across South Asia.', 'The event provided an opportunity to discuss regional supply requirements and manufacturing partnerships.'] },
  { id: 4, title: 'Bangladesh Automotive Parts Sector Grows 18% in FY2025', contentType: 'Industry', date: 'December 2025', readTime: '6 min read', excerpt: 'The Bangladesh automotive components manufacturing sector recorded strong growth in fiscal year 2025, driven by rising domestic demand and increased export volumes to neighboring markets.', body: ['Bangladesh\'s automotive components sector recorded strong growth during fiscal year 2025.', 'Domestic demand and regional exports were cited as important contributors.', 'Continued quality investment will be important as the sector expands.'] },
  { id: 5, title: 'Modina Expands Distribution Network to Chittagong and Sylhet', contentType: 'Company News', date: 'November 2025', readTime: '3 min read', excerpt: 'To better serve our regional clients, Modina has established two new distribution centers in Chittagong and Sylhet, reducing delivery times by up to 40% for customers in those regions.', body: ['Modina has expanded its distribution network to serve Chittagong and Sylhet.', 'The expansion is intended to reduce delivery times and improve regional product availability.', 'Customers can continue to use the existing company contact channels for ordering information.'] },
  { id: 6, title: 'New Motorcycle Handlebar Range Passes Stress Testing at 200% Load', contentType: 'Product Updates', date: 'October 2025', readTime: '4 min read', excerpt: 'Our latest motorcycle handlebar range has completed rigorous stress testing at 200% of rated load capacity, setting a new benchmark for durability in the Bangladeshi market.', body: ['The latest motorcycle handlebar range has completed internal stress testing.', 'Testing evaluated the design under loads above its stated operating rating.', 'Technical specifications can be requested through the company contact channel.'] },
  { id: 7, title: 'South Asian Auto Parts Summit — Modina Keynote Speaker', contentType: 'Events', date: 'September 2025', readTime: '5 min read', excerpt: 'Modina Managing Director Md. Faruq Hossain delivered the keynote address at the South Asian Auto Parts Summit in Colombo, speaking on precision manufacturing and regional supply chains.', body: ['Modina participated in the South Asian Auto Parts Summit in Colombo.', 'The keynote discussed precision manufacturing and regional automotive supply chains.', 'The event brought together industry representatives from across South Asia.'], sourceReviewWarning: 'Source review required: collection and detail content contain inconsistent person names.' },
  { id: 8, title: 'Rising Steel Costs and the Case for Domestic Manufacturing', contentType: 'Industry', date: 'August 2025', readTime: '7 min read', excerpt: 'As global steel prices continue to fluctuate, Bangladeshi manufacturers who have invested in domestic supply chains are proving more resilient than those dependent on imports.', body: ['Global steel-price volatility continues to affect automotive component manufacturers.', 'Domestic manufacturing can shorten supply chains and improve responsiveness.', 'Long-term resilience depends on quality systems as well as local production capacity.'] },
];

export const adminNewsItems: AdminNewsItem[] = seeds.map((seed) => ({
  id: seed.id, slug: normalizeSlug(seed.title), title: { en: seed.title, bn: '' }, excerpt: { en: seed.excerpt, bn: '' },
  blocks: paragraphs(seed.id, seed.body), cover: placeholder(`news-${String(seed.id).padStart(2, '0')}`), coverAlt: { en: seed.title, bn: '' },
  publicationMonth: seed.date, sourceReadTime: seed.readTime, seo: { title: emptyLocalizedText(), description: emptyLocalizedText() },
  status: 'Published', updatedAt: 'Demo snapshot · 13 Sep 2026', editor: 'Demo editor', contentType: seed.contentType,
  factualClaimReminder: true, sourceReviewWarning: seed.sourceReviewWarning,
}));

export const newsFeaturedSourceWarning = 'The current public News featured card presents a different story from the detail record it links to. This frontend demo does not create a News Featured control or alter that public content.';

export function createEmptyNewsItem(): AdminNewsItem {
  return {
    id: 'new', slug: '', title: emptyLocalizedText(), excerpt: emptyLocalizedText(), blocks: [], cover: null, coverAlt: emptyLocalizedText(),
    publicationMonth: '', seo: { title: emptyLocalizedText(), description: emptyLocalizedText() }, status: 'Draft', updatedAt: 'Not saved', editor: 'Demo editor',
    contentType: '', factualClaimReminder: true,
  };
}
