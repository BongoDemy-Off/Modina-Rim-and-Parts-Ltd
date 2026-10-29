import type { AdminDownload, DownloadCategory } from '../types/downloads';

export const downloadCategories: DownloadCategory[] = ['Catalogs', 'Certificates', 'Technical', 'Legal'];

const seeds = [
  { id: 1, title: 'Product Catalog 2026', category: 'Catalogs', description: 'Complete range of all 21 SKUs with specifications and ordering codes.', size: '4.2 MB', format: 'PDF', extent: '48 pages', year: '2026' },
  { id: 2, title: 'Product Catalog 2025', category: 'Catalogs', description: 'Previous year full product range catalog with legacy part numbers.', size: '3.8 MB', format: 'PDF', extent: '44 pages', year: '2025' },
  { id: 3, title: 'Motorcycle Parts Catalog', category: 'Catalogs', description: 'Dedicated catalog for all 7 motorcycle component SKUs.', size: '1.9 MB', format: 'PDF', extent: '18 pages', year: '2026' },
  { id: 4, title: 'Rim & Wheel Catalog', category: 'Catalogs', description: 'Full range of rim products for Easy Bike, Rickshaw, CNG and Van.', size: '2.1 MB', format: 'PDF', extent: '22 pages', year: '2026' },
  { id: 8, title: 'Alloy Technical Spec Sheet', category: 'Technical', description: 'Detailed material composition, tensile strength, and hardness data.', size: '2.4 MB', format: 'PDF', extent: '12 pages', year: '2026' },
  { id: 9, title: 'CNC Tolerance Standards', category: 'Technical', description: 'Machining tolerances and dimensional accuracy guidelines.', size: '1.3 MB', format: 'PDF', extent: '8 pages', year: '2026' },
  { id: 10, title: 'CAD Model Package', category: 'Technical', description: '3D CAD models for all rim profiles in STEP and IGES formats.', size: '18.5 MB', format: 'ZIP', extent: '21 files', year: '2025' },
  { id: 11, title: 'Quality Control Manual', category: 'Technical', description: 'Internal QC process documentation and inspection checklists.', size: '3.2 MB', format: 'PDF', extent: '36 pages', year: '2026' },
  { id: 12, title: 'Warranty Terms & Conditions', category: 'Legal', description: 'Product warranty coverage, claim process, and exclusions.', size: '0.6 MB', format: 'PDF', extent: '6 pages', year: '2025' },
  { id: 13, title: 'Export Compliance Document', category: 'Legal', description: 'International trade compliance and export regulation summary.', size: '0.9 MB', format: 'PDF', extent: '8 pages', year: '2025' },
  { id: 14, title: 'Distributor Agreement Template', category: 'Legal', description: 'Standard partnership and distribution agreement framework.', size: '1.2 MB', format: 'PDF', extent: '14 pages', year: '2026' },
] as const;

export const adminDownloads: AdminDownload[] = seeds.map((seed, index) => ({
  id: seed.id,
  title: { en: seed.title, bn: '' },
  description: { en: seed.description, bn: '' },
  category: seed.category,
  sourceMetadata: { sizeLabel: seed.size, format: seed.format, extentLabel: seed.extent, sourceYear: seed.year },
  selectedFile: null,
  sourceRecordExists: true,
  migrationRequired: true,
  sortOrder: index + 1,
  status: 'Published',
  updatedAt: 'Current frontend demo snapshot',
  editor: 'Demo editor',
}));

export function createEmptyDownload(): AdminDownload {
  return { id: 'new', title: { en: '', bn: '' }, description: { en: '', bn: '' }, category: '', sourceMetadata: { sizeLabel: '', format: '', extentLabel: '', sourceYear: '' }, selectedFile: null, sourceRecordExists: false, migrationRequired: false, sortOrder: adminDownloads.length + 1, status: 'Draft', updatedAt: 'Not saved', editor: 'Demo editor' };
}

export const cloneDownload = (item: AdminDownload): AdminDownload => structuredClone(item);
