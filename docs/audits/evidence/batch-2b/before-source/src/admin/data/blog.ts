import type { AdminBlogPost, BlogCategory } from '../types/blog';
import type { EditorialBlock, EditorialMedia } from '../types/editorial';
import { emptyLocalizedText, normalizeSlug } from '../types/editorial';

const placeholder = (seed: string): EditorialMedia => ({
  src: `https://picsum.photos/seed/${seed}/1200/700`,
  name: `${seed} frontend placeholder`,
  size: 'Remote frontend placeholder',
  dimensions: 'Source requests 1200 × 700px',
  source: 'frontend-placeholder',
  productionReady: false,
});

const paragraphs = (recordId: string, values: string[]): EditorialBlock[] => values.map((value, index) => ({
  id: `${recordId}-paragraph-${index + 1}`,
  type: 'paragraph',
  content: { en: value, bn: '' },
}));

interface BlogSeed {
  id: string;
  title: string;
  category: BlogCategory;
  date: string;
  excerpt: string;
  readTime: string;
  imageSeed: string;
  tags: string[];
  featured?: boolean;
  body: string[];
}

const seeds: BlogSeed[] = [
  {
    id: 'featured',
    title: 'Why Precision Tolerance Is the Most Underrated Factor in Auto Parts Manufacturing',
    category: 'Engineering', date: 'April 2026', readTime: '7 min read', imageSeed: 'blog-featured', tags: ['Engineering', 'Quality'], featured: true,
    excerpt: 'Across the automotive supply chain, tolerance specifications are often treated as an afterthought. At Modina, we argue that ±0.01mm is not a number on a datasheet — it is the difference between a part that lasts and a part that fails.',
    body: [
      'In the automotive components industry, tolerance specifications are frequently listed in datasheets but rarely scrutinized by buyers until something fails. At Modina Rim & Parts Ltd., we have built our entire manufacturing philosophy around a single conviction: tolerance is not a footnote — it is the product.',
      'Tolerance refers to the permissible variation in a part\'s dimensions from its nominal specification. A rim machined to a nominal diameter of 400mm with a tolerance of ±0.5mm may fit — but a rim machined to ±0.01mm will fit consistently, seat evenly, and perform reliably across its entire service life.',
      'The difference matters most under dynamic loading. A wheel rim experiences thousands of load cycles per kilometre — each one applying stress at the spoke-to-barrel junction, the valve hole, and the bead seat.',
      'For buyers evaluating suppliers, tolerance documentation is the single most revealing specification to request.',
    ],
  },
  {
    id: '1', title: 'The Science Behind ISO 9001 and What It Means for Buyers', category: 'Quality', date: 'March 2026', readTime: '6 min read', imageSeed: 'blog-01', tags: ['Quality', 'Standards'],
    excerpt: 'ISO 9001 is more than a certificate on a wall. We break down what each clause means in practice and why it should be your first filter when choosing an auto parts supplier.',
    body: [
      'ISO 9001:2015 is the world\'s most widely adopted quality management system standard, with over one million certified organisations across 170 countries.',
      'The standard is built around seven quality management principles: customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, and relationship management.',
      'When evaluating a supplier\'s ISO certification, three checks matter: verify the certificate number is genuine, confirm the scope covers the products you are buying, and check the expiry date and surveillance audit status.',
    ],
  },
  {
    id: '2', title: 'CNC Machining vs. Traditional Stamping: Which Produces Better Rims?', category: 'Engineering', date: 'February 2026', readTime: '8 min read', imageSeed: 'blog-02', tags: ['Engineering', 'Manufacturing'],
    excerpt: 'A technical comparison of CNC machining and traditional die stamping for rim production, covering dimensional accuracy, surface finish, material waste, and cost per unit.',
    body: ['The choice between CNC machining and traditional die stamping for rim production involves genuine engineering tradeoffs — not a simple verdict.', 'Die stamping excels at high-volume, low-variation production, while CNC machining offers substantially tighter dimensional accuracy.', 'At Modina, critical rim dimensions use CNC machining while stamping is reserved for non-critical formed features.'],
  },
  {
    id: '3', title: 'How Bangladesh Became a Serious Auto Parts Exporter', category: 'Industry', date: 'January 2026', readTime: '7 min read', imageSeed: 'blog-03', tags: ['Industry', 'Bangladesh'],
    excerpt: 'From a purely import-dependent economy to a growing exporter of precision components — the story of Bangladesh automotive manufacturing over the past 15 years.',
    body: ['In 2010, Bangladesh imported nearly all of its automotive components from China, India, and Japan.', 'The shift began with the rapid expansion of Bangladesh\'s CNG auto-rickshaw fleet.', 'The challenge ahead is sustaining quality improvement as the sector scales.'],
  },
  {
    id: '4', title: 'Heat Treatment Explained: Why We Fire Our Steel Twice', category: 'Manufacturing', date: 'December 2025', readTime: '5 min read', imageSeed: 'blog-04', tags: ['Manufacturing', 'Materials'],
    excerpt: 'Our two-stage heat treatment process increases tensile strength by up to 30% compared to single-stage methods. Here is the metallurgy behind the decision.',
    body: ['Steel\'s mechanical properties are significantly influenced by subsequent thermal processing.', 'Our two-stage process adds a hardening and tempering cycle after initial normalisation.', 'The process adds cost, but the alternative is a lighter, softer part that fails prematurely in the field.'],
  },
  {
    id: '5', title: '5 Questions to Ask Before Sourcing Rims from Any Manufacturer', category: 'Quality', date: 'November 2025', readTime: '4 min read', imageSeed: 'blog-05', tags: ['Quality', 'Procurement'],
    excerpt: 'Whether you are a distributor or fleet operator, these five technical questions will help you separate quality manufacturers from those cutting corners on specifications.',
    body: ['Sourcing automotive components from a new manufacturer carries real risk.', 'Ask about dimensional tolerance, certifications, heat treatment, facility visits, and defect handling.', 'An honest answer with real data builds more confidence than a claim of zero defects.'],
  },
  {
    id: '6', title: 'Inside Modina: A Day on the Production Floor', category: 'Company', date: 'October 2025', readTime: '9 min read', imageSeed: 'blog-06', tags: ['Company', 'Manufacturing'],
    excerpt: 'From raw coil steel arriving at 6 AM to finished rims passing final QC at 4 PM — a walkthrough of one complete production cycle at our Jashore facility.',
    body: ['6:00 AM. The first delivery truck of the day backs into the raw materials bay at our BSCIC Industrial Area facility.', '9:00 AM. Formed rim blanks move to the CNC machining centre.', '4:00 PM. The first dispatch of the day loads.'],
  },
  {
    id: '7', title: 'Electroplating vs. Powder Coating: Surface Finish Compared', category: 'Engineering', date: 'September 2025', readTime: '6 min read', imageSeed: 'blog-07', tags: ['Engineering', 'Finishing'],
    excerpt: 'Both electroplating and powder coating offer corrosion protection — but they perform very differently under real-world conditions. We compare them across 6 key dimensions.',
    body: ['Surface finishing is not merely cosmetic — it is a functional engineering decision.', 'Powder coating creates a thick, continuous polymer barrier that is highly resistant to moisture penetration.', 'At Modina, powder coating is the standard surface finish, with electroplating available for specific variants.'],
  },
  {
    id: '8', title: 'Why Rickshaw Rims Demand More Engineering Than You Think', category: 'Manufacturing', date: 'August 2025', readTime: '7 min read', imageSeed: 'blog-08', tags: ['Manufacturing', 'Engineering'],
    excerpt: 'Rickshaw rims carry enormous dynamic loads on unpaved roads at low speeds — a combination that exposes design weaknesses invisible in standard lab testing. Here is how we solve it.',
    body: ['Rickshaw rims operate in a completely different loading environment.', 'The critical loading scenario is the quasi-static pothole drop under full load.', 'Finished rim samples are tested above rated load to verify design intent.'],
  },
  {
    id: '9', title: 'The True Cost of a Low-Quality Bearing in a Commercial Vehicle', category: 'Industry', date: 'July 2025', readTime: '5 min read', imageSeed: 'blog-09', tags: ['Industry', 'Quality'],
    excerpt: 'A single substandard bearing in a CNG auto-rickshaw can cause cascading failures costing 20x the original part price. The economics of quality procurement explained.',
    body: ['The price difference between a quality bearing and a substandard alternative is typically small.', 'A bearing failure can cascade into axle, hub, rim, labour, and lost-revenue costs.', 'Procurement decisions made on unit price alone systematically undercount total cost of ownership.'],
  },
];

export const adminBlogPosts: AdminBlogPost[] = seeds.map((seed) => ({
  id: seed.id,
  slug: normalizeSlug(seed.title),
  title: { en: seed.title, bn: '' },
  excerpt: { en: seed.excerpt, bn: '' },
  blocks: paragraphs(`blog-${seed.id}`, seed.body),
  cover: placeholder(seed.imageSeed),
  coverAlt: { en: seed.title, bn: '' },
  publicationMonth: seed.date,
  sourceReadTime: seed.readTime,
  seo: { title: emptyLocalizedText(), description: emptyLocalizedText() },
  status: 'Published',
  updatedAt: 'Demo snapshot · 13 Sep 2026',
  editor: 'Demo editor',
  category: seed.category,
  tags: seed.tags,
  featured: Boolean(seed.featured),
}));

export function createEmptyBlogPost(): AdminBlogPost {
  return {
    id: 'new', slug: '', title: emptyLocalizedText(), excerpt: emptyLocalizedText(), blocks: [], cover: null, coverAlt: emptyLocalizedText(),
    publicationMonth: '', seo: { title: emptyLocalizedText(), description: emptyLocalizedText() }, status: 'Draft', updatedAt: 'Not saved', editor: 'Demo editor',
    category: '', tags: [], featured: false,
  };
}
