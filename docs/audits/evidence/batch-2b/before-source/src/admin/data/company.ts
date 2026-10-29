import faruqPortrait from '@/assets/Md. Faruq Hossain.webp';
import companyImage from '@/assets/company.webp';
import facilityVideo from '@/assets/State of the Art Facility.webm';
import type { CompanyPageConfig } from '../types/company';

const text = (en: string, bn = '') => ({ en, bn });
const local = (src: string, name: string) => ({ src, name, origin: 'current-local-project' as const, mediaPresent: true });
const placeholder = (src: string, name: string) => ({ src, name, origin: 'remote-stock-placeholder' as const, mediaPresent: true });

export const companyPages: Record<CompanyPageConfig['id'], CompanyPageConfig> = {
  about: {
    id: 'about', status: 'Published', heading: text('Our Story', 'আমাদের গল্প'),
    intro: text('Engineering Reliability Since 2010', '২০১০ সাল থেকে নির্ভরশীল প্রকৌশল'),
    slots: [
      ['timeline-2010', '2010', 'Company Founded', 'Established in Jhumjhumpur, Jashore with a focus on bicycle, rickshaw and motorcycle parts.'],
      ['timeline-2013', '2013', 'First Export', 'Began exporting to neighboring countries in South Asia.'],
      ['timeline-2019', '2019', 'Factory Expansion', 'Expanded operations at BSCIC Industrial Area with new precision manufacturing equipment.'],
      ['timeline-2023', '2023', 'Triple ISO Certified', 'Achieved ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certifications — all in one year.'],
      ['timeline-2024', '2024', 'Product Range Expansion', 'Launched 21+ product lines covering motorcycle parts, rims, and hardware for the regional market.'],
      ['value-precision', '—01', 'Precision', 'Every component is engineered to micro-millimeter accuracy. We believe precision is not optional — it is the foundation of trust.'],
      ['value-integrity', '—02', 'Integrity', 'We hold ourselves to the highest standards of quality and transparency. Our ISO 9001:2015 certification is proof, not a promise.'],
      ['value-innovation', '—03', 'Innovation', 'From our founding, we have continuously invested in new technologies and processes to stay ahead of global manufacturing standards.'],
      ['stat-products', '21+', 'Product Lines', 'Literal source string; do not synchronize with Homepage metrics.'],
      ['stat-experience', '15+', 'Years Experience', 'Literal source string; do not calculate company age.'],
      ['stat-exports', '3+', 'Export Countries', 'Literal source string.'],
      ['stat-iso', '100%', 'ISO Certified', 'Literal source string; coverage is not calculated.'],
    ].map(([id, sharedLabel, title, description], index) => ({ id, order: index + 1, sharedLabel, content: { title: text(title), description: text(description) } })),
    leadership: [
      { id: 'leadership-faruq', order: 1, name: 'Md. Faruq Hossain', role: text('Founder & Managing Director', 'প্রতিষ্ঠাতা ও ব্যবস্থাপনা পরিচালক'), portrait: local(faruqPortrait, 'Md. Faruq Hossain.webp') },
      { id: 'leadership-hasanur', order: 2, name: 'Md. Hasanur Rahman', role: text('Chief Operations Officer', 'প্রধান পরিচালন কর্মকর্তা'), portrait: placeholder('https://picsum.photos/seed/leader-02/400/500', 'leader-02 remote placeholder') },
      { id: 'leadership-rakibul', order: 3, name: 'Md. Rakibul Islam', role: text('Head of Quality Assurance', 'কোয়ালিটি অ্যাসুরেন্স প্রধান'), portrait: placeholder('https://picsum.photos/seed/leader-03/400/500', 'leader-03 remote placeholder') },
    ],
    media: [local(companyImage, 'company.webp'), local(facilityVideo, 'State of the Art Facility.webm')],
    warnings: ['Leadership review required: public source contains conflicting founder/Managing Director identities.', 'Business claim review required: timeline and metric strings remain literal source content.', 'Current local project assets — provenance/approval not independently confirmed.'], updatedAt: 'Current public source',
  },
  mission: {
    id: 'mission', status: 'Published', heading: text('Our Mission'), intro: text('Engineering Trust. Delivering Excellence.'),
    slots: [
      ['mission-statement', 'Mission', 'Mission Statement', 'Our mission is to manufacture automotive components that exceed international quality standards, empowering mobility across Bangladesh and beyond. We exist to prove that precision engineering and uncompromising quality can originate from Bangladesh.'],
      ['vision-statement', 'Vision', 'Vision', "To be South Asia's most trusted automotive components manufacturer — recognized not just for what we make, but for how we make it."],
      ['mission-value-1', '01', 'Precision', 'Every component is engineered to micro-millimeter accuracy. We believe precision is not optional — it is the foundation of trust between manufacturer and customer.'],
      ['mission-value-2', '02', 'Integrity', 'We hold ourselves to the highest standards of transparency in every transaction, every audit, and every product that leaves our facility. Our word is our warranty.'],
      ['mission-value-3', '03', 'Innovation', 'We continuously invest in new technologies, processes, and people. Standing still in manufacturing means falling behind — and we refuse to fall behind.'],
      ['mission-value-4', '04', 'Responsibility', 'We are accountable to our customers, our employees, and the communities we operate in. Responsible manufacturing means doing things right even when no one is watching.'],
      ['mission-value-5', '05', 'Excellence', 'Good enough is never enough at Modina. We pursue excellence in every dimension — from raw material selection to final dispatch inspection — without exception.'],
      ['mission-value-6', '06', 'Partnership', 'We view every distributor, supplier, and customer as a long-term partner. Our success is measured not just by what we produce but by the relationships we build.'],
    ].map(([id, sharedLabel, title, description], index) => ({ id, order: index + 1, sharedLabel, content: { title: text(title), description: text(description) } })),
    attribution: text('Mohammed Rafiqul Islam, Founder & MD'), media: [placeholder('https://picsum.photos/seed/mission-leader/900/700', 'mission-leader remote placeholder')],
    warnings: ['Leadership review required: Mission attribution conflicts with About leadership source.', 'Mission attribution is source-local and is not linked to About or News.'], updatedAt: 'Current public source',
  },
  sustainability: {
    id: 'sustainability', status: 'Published', heading: text('Sustainability'), intro: text('Responsible by Design.'),
    slots: [
      ['pillar-environment', '—01', 'Environment', 'We hold ISO 14001 certification for environmental management. Our facility has reduced industrial waste output by 30% since 2018 through process optimization, material recycling programs, and responsible chemical handling protocols.'],
      ['pillar-people', '—02', 'People', 'Our 150+ strong workforce operates in a safe, fair, and inclusive environment. We invest in continuous skills training, provide above-market compensation, and maintain strict occupational health and safety standards across all production areas.'],
      ['pillar-community', '—03', 'Community', 'We actively support the industrial communities around our Jashore facility through educational sponsorships, apprenticeship programs for local youth, and partnerships with vocational training institutes in the region.'],
      ['environment-waste', '01', 'Waste Reduction Program', '30% reduction in industrial waste since 2018 through material recycling and process optimization.'],
      ['environment-energy', '02', 'Energy Efficiency', 'LED lighting and optimized CNC scheduling have reduced energy consumption by 18% over three years.'],
      ['environment-chemical', '03', 'Chemical Management', 'All surface treatment chemicals are handled under strict EPA-equivalent protocols with zero discharge violations.'],
      ['environment-supplier', '04', 'Supplier Standards', 'We require environmental compliance documentation from all raw material suppliers before onboarding.'],
      ['csr-apprenticeship', '—01', 'Youth Apprenticeship Program', 'Annual intake of 20 apprentices from local vocational institutes. Participants receive 6-month paid training in CNC operation, quality inspection, and manufacturing processes, with 70% offered permanent positions upon completion.'],
      ['csr-scholarships', '—02', 'Educational Sponsorships', 'Modina sponsors 15 scholarships annually for children of factory workers pursuing technical education at polytechnic institutes across Bangladesh.'],
      ['csr-safety', '—03', 'Workplace Safety Initiative', 'Zero lost-time injury target since 2020. All production staff receive quarterly safety training, personal protective equipment is provided at no cost, and near-miss reporting is actively encouraged and rewarded.'],
      ['csr-suppliers', '—04', 'Local Supplier Development', 'We prioritize sourcing from local Bangladeshi suppliers wherever quality standards permit. Our local procurement ratio has grown from 40% to 65% since 2018.'],
    ].map(([id, sharedLabel, title, description], index) => ({ id, order: index + 1, sharedLabel, content: { title: text(title), description: text(description) } })),
    warnings: ['Sustainability claim requires client confirmation.', 'Quantified claims remain literal source strings; no ESG, emissions, or evidence workflow exists.'], updatedAt: 'Current public source',
  },
  quality: {
    id: 'quality', status: 'Published', heading: text('Our Quality'), intro: text('Precision Is Not Optional'),
    slots: [
      ['quality-stage-1', '01', 'Raw Material Inspection', 'All incoming steel and alloy verified against spec sheets.'],
      ['quality-stage-2', '02', 'Precision Cutting', 'CNC-guided cutting to ±0.01mm tolerance.'],
      ['quality-stage-3', '03', 'Heat Treatment', 'Controlled furnace hardening for maximum durability.'],
      ['quality-stage-4', '04', 'Surface Finishing', 'Electroplating and powder coating for corrosion resistance.'],
      ['quality-stage-5', '05', 'Dimensional QC', '100% inspection with calibrated measurement tools.'],
      ['quality-stage-6', '06', 'Final Certification', 'ISO 9001:2015 batch sign-off before dispatch.'],
      ['quality-cert-9001', '—01', 'ISO 9001:2015', 'Quality Management System certification covering design, in-process control, and customer service. Issued by LMS Certification Limited, Certificate No. BD99166A.'],
      ['quality-cert-14001', '—02', 'ISO 14001:2015', 'Environmental Management System certification confirming responsible material use, waste reduction, and sustainable facility operations. Certificate No. BD99166B.'],
      ['quality-cert-45001', '—03', 'ISO 45001:2018', 'Occupational Health & Safety Management System certification ensuring safe working conditions for all 150+ employees. Certificate No. BD99166C-1.'],
    ].map(([id, sharedLabel, title, description], index) => ({ id, order: index + 1, sharedLabel, content: { title: text(title), description: text(description) } })),
    warnings: ['Quality claim requires client confirmation.', 'Certificate association review required: Quality-page asset mappings do not align cleanly with Certificates-page filenames.', 'Quality certification cards are source-local and are not linked to Certificate records.'], updatedAt: 'Current public source',
  },
};

const aboutBangla: Record<string, [string, string]> = {
  'timeline-2010': ['কোম্পানি প্রতিষ্ঠা', 'বাইসাইকেল, রিকশা এবং মোটরসাইকেলের পার্টস তৈরির লক্ষ্য নিয়ে যশোরের ঝুমঝুমপুরে প্রতিষ্ঠিত।'],
  'timeline-2013': ['প্রথম রপ্তানি', 'দক্ষিণ এশিয়ার প্রতিবেশী দেশগুলোতে রপ্তানি শুরু।'],
  'timeline-2019': ['কারখানা সম্প্রসারণ', 'বিসিক শিল্প নগরীতে নতুন ও অত্যাধুনিক যন্ত্রপাতির মাধ্যমে উৎপাদন সম্প্রসারণ।'],
  'timeline-2023': ['ট্রিপল আইএসও সার্টিফাইড', 'একই বছরে আইএসও ৯০০১:২০১৫, আইএসও ১৪০০১:২০১৫ এবং আইএসও ৪৫০০১:২০১৮ অর্জন।'],
  'timeline-2024': ['প্রোডাক্ট রেঞ্জ বৃদ্ধি', 'মোটরসাইকেলের পার্টস, রিম এবং হার্ডওয়্যার সহ ২১টিরও বেশি প্রোডাক্ট লাইন চালু।'],
  'value-precision': ['নির্ভুলতা', 'প্রতিটি যন্ত্রাংশ মাইক্রো-মিলিমিটার নিখুঁতভাবে তৈরি। আমরা বিশ্বাস করি নির্ভুলতা কোনো বিকল্প নয় — এটিই আমাদের আস্থার ভিত্তি।'],
  'value-integrity': ['সততা', 'আমরা গুণমান ও স্বচ্ছতার সর্বোচ্চ মান বজায় রাখি। আমাদের আইএসও ৯০০১:২০১৫ সার্টিফিকেশন তারই প্রমাণ।'],
  'value-innovation': ['উদ্ভাবন', 'প্রতিষ্ঠালগ্ন থেকেই, আমরা বিশ্বমানের উৎপাদন প্রযুক্তি ও প্রক্রিয়ায় অবিরাম বিনিয়োগ করে আসছি।'],
  'stat-products': ['প্রোডাক্ট লাইন', 'সোর্সের হুবহু দাবির স্ট্রিং।'], 'stat-experience': ['বছরের অভিজ্ঞতা', 'সোর্সের হুবহু দাবির স্ট্রিং।'], 'stat-exports': ['রপ্তানিকৃত দেশ', 'সোর্সের হুবহু দাবির স্ট্রিং।'], 'stat-iso': ['আইএসও সার্টিফাইড', 'সোর্সের হুবহু দাবির স্ট্রিং।'],
};
companyPages.about.slots = companyPages.about.slots.map((slot) => aboutBangla[slot.id] ? { ...slot, content: { ...slot.content, title: { ...slot.content.title, bn: aboutBangla[slot.id][0] }, description: { ...slot.content.description, bn: aboutBangla[slot.id][1] } } } : slot);

export const cloneCompanyPage = (id: CompanyPageConfig['id']) => structuredClone(companyPages[id]);
