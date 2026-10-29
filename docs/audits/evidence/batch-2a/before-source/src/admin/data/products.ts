import type { AdminProduct, AdminProductMedia, ProductCategory } from '../types/products';

interface PublicProductSnapshot {
  id: number;
  name: string;
  category: ProductCategory;
  description: string;
  material: string;
  certification: string;
  availability: string;
}

// Admin-only snapshot of the approved public catalog. Editors always clone these
// records into component state; this file never writes back to public product data.
const publicProductSnapshot: PublicProductSnapshot[] = [
  { id: 1, name: 'Box Frame Bearing & Racer (Black Blue & Red)', category: 'Hardware', description: 'Premium quality box frame bearing and racer, available in black, blue, and red finishes for maximum durability.', material: 'High-Carbon Steel', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 2, name: 'Motor Cycle Center Stand', category: 'Motorcycle', description: 'Heavy-duty center stand engineered for perfect balance and stability.', material: 'Reinforced Steel Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 3, name: 'Motor Cycle Double Stand', category: 'Motorcycle', description: 'Reinforced double stand providing superior support and longevity.', material: 'Reinforced Steel Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 4, name: 'Motor Cycle Foot Rest Rod', category: 'Motorcycle', description: 'Ergonomic and highly durable foot rest rod for enhanced rider comfort.', material: 'Forged Steel', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 5, name: 'Motor Cycle Handlebar', category: 'Motorcycle', description: 'Precision-bent motorcycle handlebar offering optimal control and vibration reduction.', material: 'Chromoly Steel', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 6, name: 'Motor Cycle Leg Guard', category: 'Motorcycle', description: 'Robust leg guard designed to protect the rider and vehicle during impacts.', material: 'Heavy-Duty Steel Tubing', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 7, name: 'Motor Cycle Sharee Guard Ladies (Black & Nickel)', category: 'Motorcycle', description: 'Elegant and protective sharee guard, available in premium black and nickel finishes.', material: 'Steel with Nickel Plating', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 8, name: 'Easy Bike RIM (Black & White)', category: 'Rims', description: 'High-strength Easy Bike rims designed for heavy loads, available in black and white.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 9, name: 'Rikshaw Avon Rim', category: 'Rims', description: 'Classic Avon style rim for rickshaws, built for everyday endurance.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 10, name: 'Cycle Rim (Bichue & Hero)', category: 'Rims', description: 'Standard cycle rims compatible with Bichue and Hero models.', material: 'Aluminum Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 11, name: 'Cycle Rim (26"X1.5")', category: 'Rims', description: 'Precision-crafted 26"x1.5" cycle rim for smooth and efficient riding.', material: 'Aluminum Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 12, name: 'CNG Rim', category: 'Rims', description: 'Heavy-duty CNG vehicle rims engineered for commercial reliability.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 13, name: 'Rikshaw Rim Gazi', category: 'Rims', description: 'Gazi specification rickshaw rim, known for exceptional load-bearing capacity.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 14, name: 'Mishuk Rim Black & White', category: 'Rims', description: 'Durable Mishuk rims available in classic black and white.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 15, name: 'VAN Rickshaw Jumbo Rim', category: 'Rims', description: 'Jumbo-sized rims for VAN rickshaws, maximizing cargo stability.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 16, name: 'VAN Rickshaw Gold Rim', category: 'Rims', description: 'Premium gold-finished rims for VAN rickshaws, combining aesthetics with strength.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 17, name: 'Rickshaw Japan Rim', category: 'Rims', description: 'Japan-spec rickshaw rims manufactured to exacting international standards.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 18, name: 'Nosimon Rim', category: 'Rims', description: 'Rugged rims specifically designed for Nosimon utility vehicles.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 19, name: 'Patti Rim', category: 'Rims', description: 'Traditional Patti style rims built for extreme local conditions.', material: 'Premium Grade Alloy', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 20, name: 'Van Spoke (Black & White)', category: 'Hardware', description: 'High-tensile van spokes available in black and white for custom builds.', material: 'High-Tensile Steel', certification: 'ISO 9001:2015', availability: 'In Stock' },
  { id: 21, name: 'Wasar', category: 'Hardware', description: 'Precision-stamped washers for secure and vibration-resistant fastening.', material: 'Galvanized Steel', certification: 'ISO 9001:2015', availability: 'In Stock' },
];

const mediaByProduct: Record<number, AdminProductMedia[]> = {
  1: [
    { id: '1-product', src: '/products/sku-001/01-product.png', role: 'product', included: true, alt: { en: 'Modina Heavy Duty Frame — product view', bn: '' }, source: 'production' },
    { id: '1-engineering', src: '/products/sku-001/02-engineering.jpg', role: 'engineering', included: true, alt: { en: 'Modina Heavy Duty Frame — engineering view', bn: '' }, source: 'production' },
    { id: '1-assembly', src: '/products/sku-001/03-assembly.png', role: 'assembly', included: true, alt: { en: 'Modina Heavy Duty Frame — assembly view', bn: '' }, source: 'production' },
  ],
  2: [
    { id: '2-product', src: '/products/sku-002/01-product.png', role: 'product', included: true, alt: { en: 'Motor Cycle Center Stand — product view', bn: '' }, source: 'production' },
    { id: '2-engineering', src: '/products/sku-002/02-engineering.jpg', role: 'engineering', included: true, alt: { en: 'Motor Cycle Center Stand — engineering view', bn: '' }, source: 'production' },
    { id: '2-assembly', src: '/products/sku-002/03-assembly.png', role: 'assembly', included: true, alt: { en: 'Motor Cycle Center Stand — assembly view', bn: '' }, source: 'production' },
  ],
  3: [
    { id: '3-product', src: '/products/sku-003/01-product.png', role: 'product', included: true, alt: { en: 'Motor Cycle Double Stand — product view', bn: '' }, source: 'production' },
    { id: '3-engineering', src: '/products/sku-003/02-engineering.jpg', role: 'engineering', included: true, alt: { en: 'Motor Cycle Double Stand — engineering view', bn: '' }, source: 'production' },
    { id: '3-assembly', src: '/products/sku-003/03-assembly.png', role: 'assembly', included: true, alt: { en: 'Motor Cycle Double Stand — assembly view', bn: '' }, source: 'production' },
  ],
};

export const productCategories: ProductCategory[] = ['Motorcycle', 'Rims', 'Hardware'];

export const adminProducts: AdminProduct[] = publicProductSnapshot.map((product) => ({
  id: product.id,
  sku: `SKU-${String(product.id).padStart(3, '0')}`,
  category: product.category,
  content: {
    name: { en: product.name, bn: '' },
    shortDescription: { en: product.description, bn: '' },
    detailedDescription: { en: '', bn: '' },
  },
  media: mediaByProduct[product.id] ?? [],
  specifications: [
    { id: `${product.id}-material`, key: 'material', label: { en: 'Material', bn: 'উপাদান' }, value: { en: product.material, bn: '' }, sharedValue: false },
    { id: `${product.id}-certification`, key: 'certification', label: { en: 'Certification', bn: 'সনদ' }, value: { en: product.certification, bn: product.certification }, sharedValue: true },
    { id: `${product.id}-availability`, key: 'availability', label: { en: 'Availability', bn: 'প্রাপ্যতা' }, value: { en: product.availability, bn: '' }, sharedValue: false },
  ],
  seo: { title: { en: '', bn: '' }, description: { en: '', bn: '' } },
  status: product.id === 20 ? 'Draft' : product.id === 21 ? 'Archived' : 'Published',
  featured: false,
  updatedAt: product.id <= 3 ? '13 Sep 2026' : '12 Sep 2026',
  editor: 'Demo editor',
}));

export function createEmptyProduct(): AdminProduct {
  return {
    id: 'new',
    sku: '',
    category: '',
    content: { name: { en: '', bn: '' }, shortDescription: { en: '', bn: '' }, detailedDescription: { en: '', bn: '' } },
    media: [],
    specifications: [],
    seo: { title: { en: '', bn: '' }, description: { en: '', bn: '' } },
    status: 'Draft',
    featured: false,
    updatedAt: 'Not saved',
    editor: 'Demo editor',
  };
}

export function cloneAdminProduct(product: AdminProduct): AdminProduct {
  return structuredClone(product);
}
