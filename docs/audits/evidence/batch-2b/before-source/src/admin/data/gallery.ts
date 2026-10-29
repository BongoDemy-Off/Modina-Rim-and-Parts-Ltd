import type { AdminGalleryItem, GalleryCategory, GalleryDisplayStyle } from '../types/gallery';

export const galleryCategories: GalleryCategory[] = ['Facility', 'Machinery', 'Production', 'Quality', 'Products', 'Materials', 'Workforce'];
export const galleryDisplayStyles: GalleryDisplayStyle[] = ['Normal', 'Wide', 'Tall'];

const seeds: Array<{ id: number; title: string; category: GalleryCategory; src: string; style: GalleryDisplayStyle; dimensions: string }> = [
  { id: 1, title: 'Factory Floor Overview', category: 'Facility', src: 'https://picsum.photos/seed/gal-factory-01/1200/800', style: 'Wide', dimensions: '1200 × 800px source request' },
  { id: 2, title: 'CNC Machining Centre', category: 'Machinery', src: 'https://picsum.photos/seed/gal-cnc-01/600/800', style: 'Tall', dimensions: '600 × 800px source request' },
  { id: 3, title: 'Rim Production Line', category: 'Production', src: 'https://picsum.photos/seed/gal-rim-line/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 4, title: 'Quality Inspection Station', category: 'Quality', src: 'https://picsum.photos/seed/gal-qa-01/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 5, title: 'Raw Steel Inventory', category: 'Materials', src: 'https://picsum.photos/seed/gal-steel-01/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 6, title: 'Heat Treatment Furnace', category: 'Machinery', src: 'https://picsum.photos/seed/gal-furnace-01/1200/600', style: 'Wide', dimensions: '1200 × 600px source request' },
  { id: 7, title: 'Finished Rim Stacks', category: 'Products', src: 'https://picsum.photos/seed/gal-rims-stacked/600/800', style: 'Tall', dimensions: '600 × 800px source request' },
  { id: 8, title: 'Powder Coating Bay', category: 'Production', src: 'https://picsum.photos/seed/gal-coating-01/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 9, title: 'ISO Audit Documentation', category: 'Quality', src: 'https://picsum.photos/seed/gal-iso-docs/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 10, title: 'Worker Safety Training', category: 'Workforce', src: 'https://picsum.photos/seed/gal-safety-01/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 11, title: 'Dispatch & Logistics Bay', category: 'Facility', src: 'https://picsum.photos/seed/gal-dispatch/1200/600', style: 'Wide', dimensions: '1200 × 600px source request' },
  { id: 12, title: 'Precision Measurement Lab', category: 'Quality', src: 'https://picsum.photos/seed/gal-lab-01/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 13, title: 'Spoke & Hardware Assembly', category: 'Production', src: 'https://picsum.photos/seed/gal-assembly/600/800', style: 'Tall', dimensions: '600 × 800px source request' },
  { id: 14, title: 'Company Entrance — BSCIC', category: 'Facility', src: 'https://picsum.photos/seed/gal-entrance/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
  { id: 15, title: 'Export Packaging Station', category: 'Production', src: 'https://picsum.photos/seed/gal-pack-01/600/600', style: 'Normal', dimensions: '600 × 600px source request' },
];

export const adminGalleryItems: AdminGalleryItem[] = seeds.map((seed, index) => ({
  id: seed.id,
  title: { en: seed.title, bn: '' },
  alt: { en: seed.title, bn: '' },
  altSource: 'derived-from-title',
  category: seed.category,
  media: { src: seed.src, name: 'Remote Picsum placeholder', size: 'Remote asset · file size unavailable', dimensions: seed.dimensions, source: 'frontend-placeholder', productionReady: false },
  displayStyle: seed.style,
  sortOrder: index + 1,
  status: 'Published',
  sourceRecordExists: true,
  updatedAt: 'Current frontend demo snapshot',
  editor: 'Demo editor',
}));

export function createEmptyGalleryItem(): AdminGalleryItem {
  return { id: 'new', title: { en: '', bn: '' }, alt: { en: '', bn: '' }, altSource: 'derived-from-title', category: '', media: null, displayStyle: 'Normal', sortOrder: adminGalleryItems.length + 1, status: 'Draft', sourceRecordExists: false, updatedAt: 'Not saved', editor: 'Demo editor' };
}

export const cloneGalleryItem = (item: AdminGalleryItem): AdminGalleryItem => structuredClone(item);
