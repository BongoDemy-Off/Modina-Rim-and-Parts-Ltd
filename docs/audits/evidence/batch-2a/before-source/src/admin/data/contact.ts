import type { ContactSettings } from '../types/contact';

const text = (en: string, bn = '') => ({ en, bn });

export const contactSettings: ContactSettings = {
  hero: { eyebrow: text('Contact'), heading: text('GET IN TOUCH'), summary: text('Modina Rim & Parts Ltd. · Est. 2010 · Jashore, Bangladesh') },
  form: {
    heading: text("Let's Talk"),
    labels: { name: text('Full Name'), company: text('Company Name'), email: text('Email'), phone: text('Phone'), subject: text('Subject'), message: text('Message') },
    subjectOptions: [
      { key: 'general-inquiry', sourceValue: 'General Inquiry', label: text('General Inquiry') },
      { key: 'product-inquiry', sourceValue: 'Product Inquiry', label: text('Product Inquiry') },
      { key: 'partnership', sourceValue: 'Partnership', label: text('Partnership') },
      { key: 'quality-certification', sourceValue: 'Quality Certification', label: text('Quality Certification') },
      { key: 'other', sourceValue: 'Other', label: text('Other') },
    ],
    submitLabel: text('Send Message'),
    successHeading: text('Message Sent'),
    successCopy: text("We'll respond within 24 business hours."),
  },
  contact: { address: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore, Bangladesh', phone: '+880 1234 567890', email: 'sales@modinarim.com', hours: 'Sun–Thu: 9:00 AM – 6:00 PM' },
  mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3666.6!2d89.2182!3d23.1721!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe7558b8c19bff%3A0x9e0ef7bfed2ab2f4!2sBSCIC%20Industrial%20Area%2C%20Jashore!5e0!3m2!1sen!2sbd!4v1715000000000!5m2!1sen!2sbd',
  offices: [
    { id: 'warehouse', city: 'Warehouse', address: 'Plot S1/A, BSCIC Industrial Area, Jhumjhumpur, Jashore', type: 'Headquarters & Manufacturing', sourcePlaceholder: false },
    { id: 'jashore-office', city: 'Jashore Office', address: 'Placeholder — to be updated', type: 'Sales & Distribution', sourcePlaceholder: true },
    { id: 'jashore-factory', city: 'Jashore Factory', address: 'Placeholder — to be updated', type: 'Manufacturing', sourcePlaceholder: true },
  ],
  cta: { heading: text('Need Help Now? Talk to Our Team'), primaryLabel: text('View Products'), secondaryLabel: text('Download Catalog') },
};
