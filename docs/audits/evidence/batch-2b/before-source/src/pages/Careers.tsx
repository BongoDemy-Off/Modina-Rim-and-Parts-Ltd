import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import PublicModal from '../components/PublicModal';
import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight, MapPin, Clock, Briefcase, Send, X } from 'lucide-react';

interface Job {
  id: number;
  title: string;
  department: string;
  type: string;
  location: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const jobs: Job[] = [
  {
    id: 1,
    title: 'CNC Machine Operator',
    department: 'Manufacturing',
    type: 'Full-time',
    location: 'Jashore Factory',
    experience: '2–4 years',
    description: 'Operate and maintain CNC lathes and milling machines for precision-cut automotive rim components. Ensure dimensional accuracy to ±0.01mm tolerance.',
    responsibilities: [
      'Set up, operate and monitor CNC machines as per production schedule',
      'Perform routine maintenance and minor repairs',
      'Inspect finished parts using calibrated measurement tools',
      'Maintain production logs and quality records',
    ],
    requirements: [
      'Diploma or certification in Mechanical Technology or CNC Operation',
      '2+ years hands-on CNC machine experience',
      'Ability to read engineering drawings and technical specifications',
      'Knowledge of ISO 9001:2015 quality procedures preferred',
    ],
  },
  {
    id: 2,
    title: 'Quality Assurance Inspector',
    department: 'Quality',
    type: 'Full-time',
    location: 'Jashore Factory',
    experience: '3–5 years',
    description: 'Conduct in-process and final inspections of automotive components to uphold our ISO 9001:2015 zero-defect standard.',
    responsibilities: [
      'Perform dimensional and visual inspections at each production stage',
      'Document non-conformances and initiate corrective action reports',
      'Calibrate and maintain inspection instruments',
      'Participate in internal ISO surveillance audits',
    ],
    requirements: [
      'B.Sc. or Diploma in Mechanical or Industrial Engineering',
      '3+ years QA experience in a manufacturing environment',
      'Proficiency with micrometers, verniers, and CMM equipment',
      'ISO 9001:2015 internal auditor certification is a plus',
    ],
  },
  {
    id: 3,
    title: 'Sales & Business Development Executive',
    department: 'Sales',
    type: 'Full-time',
    location: 'Dhaka / Remote',
    experience: '2–5 years',
    description: 'Drive B2B sales growth by acquiring new distributor and dealer accounts across Bangladesh and regional export markets.',
    responsibilities: [
      'Identify and develop new distributor and dealer relationships',
      'Prepare and present product proposals and pricing to clients',
      'Maintain CRM records and weekly sales reporting',
      'Coordinate with factory on lead times, MOQ and special orders',
    ],
    requirements: [
      'Bachelor\'s degree in Business, Marketing or related field',
      '2+ years B2B sales experience in automotive or hardware sector',
      'Excellent communication in Bengali and English',
      'Willingness to travel across Bangladesh',
    ],
  },
  {
    id: 4,
    title: 'Logistics & Supply Chain Coordinator',
    department: 'Operations',
    type: 'Full-time',
    location: 'Jashore Factory',
    experience: '2–3 years',
    description: 'Manage inbound raw materials and outbound finished goods logistics to ensure on-time delivery to domestic and export customers.',
    responsibilities: [
      'Coordinate with steel and raw material suppliers for timely inbound shipments',
      'Plan and manage outbound dispatch schedules',
      'Prepare shipping documentation for domestic and export orders',
      'Track and resolve logistics disruptions proactively',
    ],
    requirements: [
      'Diploma or Bachelor\'s in Supply Chain, Logistics or related field',
      '2+ years experience in logistics or warehouse management',
      'Familiarity with export documentation (HS codes, LC, B/L) preferred',
      'Strong organizational and communication skills',
    ],
  },
];

const departments = ['All', 'Manufacturing', 'Quality', 'Sales', 'Operations'];

const perks = [
  { icon: '🏭', title: 'State-of-the-Art Facility', desc: 'Work in our ISO-certified manufacturing complex in Jashore equipped with modern CNC and precision measurement equipment.' },
  { icon: '📈', title: 'Career Growth', desc: 'We promote from within. Every role at Modina has a clear path to advancement as the company scales.' },
  { icon: '🏥', title: 'Health & Safety', desc: 'ISO 45001:2018 certified workplace with comprehensive health coverage and safety training for all employees.' },
  { icon: '🎓', title: 'Skill Development', desc: 'Access to technical training programs, ISO certification courses, and professional development workshops.' },
  { icon: '🕌', title: 'Prayer Facilities', desc: 'Dedicated prayer spaces and observance of all national and religious holidays per Bangladeshi labor law.' },
  { icon: '🤝', title: 'Team Culture', desc: 'A tight-knit team of 150+ professionals united by a common mission of precision and quality.' },
];

export default function Careers() {
  const letters = 'CAREERS'.split('');
  const [activeDept, setActiveDept] = useState('All');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const jobHeading = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();

  const filtered = activeDept === 'All' ? jobs : jobs.filter(j => j.department === activeDept);

  const openJob = (job: Job) => {
    setSelectedJob(job);
    setIsDrawerOpen(true);
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>Careers | Modina Rim &amp; Parts Ltd. — Join Our Team</title>
        <meta name="description" content="Join Modina Rim & Parts Ltd., Bangladesh's ISO-certified automotive parts manufacturer. View current job openings in manufacturing, quality, sales and operations at our Jashore facility." />
        <link rel="canonical" href="https://www.modinarim.com/careers" />
      </Helmet>

      {/* SECTION 1 — HERO */}
      <section className="w-full public-section flex flex-col items-center text-center bg-white border-b border-modina-divider">
        <div className="text-xs font-bold tracking-widest text-modina-subtle uppercase flex items-center gap-2 justify-center mb-10 public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5 text-modina-subtle" />
          <span className="text-modina-muted">Careers</span>
        </div>
        <div className="w-24 h-[2px] bg-modina-red mx-auto mb-10" />
        <h1 className="font-display font-bold tracking-tight text-modina-heading uppercase leading-none flex items-center justify-center flex-wrap public-hero-title">
          {letters.map((letter, i) => (
            <motion.span key={i} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}>
              {letter}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: 'left' }}
          className="w-32 h-[1px] bg-modina-red mx-auto my-10"
        />
        <p className="text-xs font-bold tracking-widest text-modina-muted uppercase flex items-center justify-center flex-wrap gap-2 public-meta">
          <span>{jobs.length} Open Positions</span>
          <span className="text-modina-red">·</span>
          <span>Jashore, Bangladesh</span>
          <span className="text-modina-red">·</span>
          <span>Est. 2010</span>
        </p>
        <div className="flex flex-col items-center gap-3 mt-14">
          <motion.div initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }} style={{ transformOrigin: 'top' }} className="w-[0.5px] h-10 bg-modina-divider" />
          <span className="text-xs font-bold tracking-widest text-modina-red uppercase public-meta">Scroll</span>
        </div>
      </section>

      {/* SECTION 2 — WHY JOIN US */}
      <section className="w-full border-b border-modina-divider public-section bg-modina-bg-alt">
        <div className="container-premium">
          <div className="mb-16">
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4 public-meta">— Why Modina</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight public-section-title">
              Build Your Career<br />In Precision
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {perks.map((perk, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="card-premium group cursor-default flex flex-col transition-all duration-300 ease-in-out"
              >
                <span className="text-3xl mb-6">{perk.icon}</span>
                <h3 className="font-display font-bold text-modina-heading text-xl tracking-tight mb-4 public-card-title">{perk.title}</h3>
                <hr className="border-modina-border mb-4" />
                <p className="text-[13px] text-modina-muted leading-relaxed font-light flex-grow public-body">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — JOB LISTINGS */}
      <section className="w-full border-b border-modina-divider public-section bg-modina-bg-section">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4 public-meta">— Open Positions</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-modina-heading tracking-tight public-section-title">
                Build Your Career In Precision
              </h2>
            </div>
            {/* Dept filter */}
            <div className="flex flex-wrap items-center gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  type="button"
                  onClick={() => setActiveDept(dept)}
                  aria-pressed={activeDept === dept}
                  className={`public-filter px-5 py-2.5 rounded-[8px] text-xs font-bold tracking-widest uppercase transition-all duration-300 ease-in-out border ${activeDept === dept ? 'bg-modina-red border-modina-red text-white shadow-design-sm' : 'bg-white border-modina-border text-modina-muted hover:border-modina-red hover:text-modina-red'}`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((job, idx) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  className="group bg-white rounded-[8px] border border-modina-border p-6 md:px-8 md:py-6 shadow-sm hover:bg-modina-bg-alt hover:border-modina-red/30 transition-all duration-300 ease-in-out flex flex-col md:flex-row md:items-center justify-between gap-6"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[10px] font-bold tracking-widest text-modina-red uppercase bg-modina-red/5 px-2.5 py-1 rounded-sm border border-modina-red/10 public-meta">
                        {job.department}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-modina-divider" />
                      <span className="text-[10px] font-bold tracking-widest text-modina-muted uppercase public-meta">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-modina-heading text-xl md:text-2xl tracking-tight mb-4 group-hover:text-modina-red transition-colors duration-300 ease-in-out public-card-title">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-modina-subtle" />
                        <span className="text-[13px] text-modina-muted font-medium public-meta">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-modina-subtle" />
                        <span className="text-[13px] text-modina-muted font-medium public-meta">{job.experience}</span>
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center md:justify-end">
                    <button type="button" onClick={() => openJob(job)} aria-label={`View role: ${job.title}`} className="btn-secondary inline-flex items-center gap-3 text-sm font-bold text-modina-heading px-6 py-3 bg-transparent group-hover:border-modina-red/30 group-hover:text-modina-red group-hover:bg-modina-red/5 transition-all duration-300 ease-in-out">
                      View Role
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-[8px] border border-modina-border border-dashed">
              <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mb-4 public-meta">No openings in this department currently</p>
              <button type="button" onClick={() => setActiveDept('All')} className="text-xs font-bold tracking-widest text-modina-red uppercase hover:text-modina-red-dark transition-colors duration-300">
                — View All Positions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* JOB DETAIL DRAWER */}
      <PublicModal open={isDrawerOpen} onRequestClose={closeDrawer} labelledBy="career-detail-title" initialFocusRef={jobHeading}>
        {selectedJob && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.25 }} data-public-backdrop className="fixed inset-0 bg-modina-heading/40 backdrop-blur-sm z-[70]" />
            <motion.div
              initial={{ x: reduceMotion ? 0 : '100%' }}
              animate={{ x: 0 }}
              exit={{ x: reduceMotion ? 0 : '100%' }}
              transition={{ type: 'tween', duration: reduceMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed right-0 top-0 h-full w-full max-w-[520px] bg-white z-[80] flex flex-col border-l border-modina-border shadow-design-lg overflow-hidden"
            >
              {/* Drawer header */}
              <div className="sticky top-0 bg-white z-10 flex min-w-0 items-center justify-between gap-3 px-4 py-3 sm:px-8 sm:py-5 border-b border-modina-border">
                <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-4">
                  <span className="text-xs font-bold tracking-widest text-modina-red uppercase public-meta">{selectedJob.department}</span>
                  <span className="w-[0.5px] h-3 bg-modina-divider" />
                  <span className="text-xs font-bold tracking-widest text-modina-muted uppercase public-meta">{selectedJob.type}</span>
                </div>
                <button type="button" onClick={closeDrawer} className="flex h-11 shrink-0 items-center gap-2 px-2 text-xs font-bold tracking-widest text-modina-muted uppercase hover:text-modina-red transition-colors duration-300">
                  Close <X className="w-3 h-3" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
                <div className="px-4 py-6 sm:px-8 sm:py-8">
                  <h2 id="career-detail-title" ref={jobHeading} tabIndex={-1} className="text-2xl md:text-3xl font-display font-bold text-modina-heading tracking-tight mb-2 public-section-title">{selectedJob.title}</h2>
                  <div className="flex items-center gap-4 flex-wrap mb-6">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-modina-red" />
                      <span className="text-xs font-bold tracking-widest text-modina-muted uppercase public-meta">{selectedJob.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-3 h-3 text-modina-red" />
                      <span className="text-xs font-bold tracking-widest text-modina-muted uppercase public-meta">{selectedJob.experience}</span>
                    </div>
                  </div>

                  <p className="text-[13px] text-modina-muted leading-relaxed font-light mb-8 public-body">{selectedJob.description}</p>

                  <div className="border-t border-modina-border pt-6 mb-6">
                    <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mb-4 public-meta">Responsibilities</p>
                    {selectedJob.responsibilities.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3">
                        <span className="text-xs text-modina-red mt-1 public-meta">—</span>
                        <span className="text-[13px] text-modina-muted font-light leading-relaxed public-meta">{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-modina-border pt-6 mb-8">
                    <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mb-4 public-meta">Requirements</p>
                    {selectedJob.requirements.map((r, i) => (
                      <div key={i} className="flex items-start gap-3 mb-3">
                        <span className="text-xs text-modina-red mt-1 public-meta">—</span>
                        <span className="text-[13px] text-modina-muted font-light leading-relaxed public-meta">{r}</span>
                      </div>
                    ))}
                  </div>

                  {/* Application form */}
                  <div className="border-t border-modina-border pt-8">
                    <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-6 public-meta">— Apply Now</p>
                    {submitted ? (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start">
                        <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-3 public-meta">— Application Received</p>
                        <p className="text-[13px] text-modina-muted font-light public-body">Thank you for your interest. We will review your application and reach out within 5–7 business days.</p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        {[
                          { label: 'Full Name', name: 'name', type: 'text', required: true },
                          { label: 'Email Address', name: 'email', type: 'email', required: true },
                          { label: 'Phone Number', name: 'phone', type: 'tel', required: false },
                        ].map((field) => (
                          <div key={field.name} className="flex flex-col">
                            <label htmlFor={`career-${field.name}`} className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-2 public-meta">{field.label}</label>
                            <input
                              required={field.required}
                              type={field.type}
                              name={field.name}
                              id={`career-${field.name}`}
                              value={formData[field.name as keyof typeof formData]}
                              onChange={e => setFormData(p => ({ ...p, [field.name]: e.target.value }))}
                              className="public-field transition-colors duration-200"
                            />
                          </div>
                        ))}
                        <div className="flex flex-col">
                          <label htmlFor="career-message" className="text-xs font-bold tracking-widest text-modina-muted uppercase mb-2 public-meta">Cover Note</label>
                          <textarea
                            name="message"
                            id="career-message"
                            rows={4}
                            value={formData.message}
                            onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                            placeholder="Tell us briefly about your experience..."
                            className="public-field transition-colors duration-200 resize-none placeholder:text-modina-subtle"
                          />
                        </div>
                        <button type="submit" className="btn-primary w-full flex items-center justify-center gap-4 mt-2">
                          Submit Application <Send className="w-3.5 h-3.5" />
                        </button>
                        <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase text-center public-meta">We respond within 5–7 business days</p>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </PublicModal>

      {/* SECTION 4 — OPEN APPLICATION CTA */}
      <section className="w-full border-t border-modina-divider public-section bg-modina-heading public-dark">
        <div className="container-premium flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div className="relative pl-6">
            <div className="absolute left-0 top-0 w-1 h-20 bg-modina-red" />
            <p className="text-xs font-bold tracking-widest text-modina-red uppercase mb-4 public-meta">— Don't See Your Role?</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white tracking-tight leading-tight public-section-title">
              Send Us Your<br />CV Anyway
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="mailto:careers@modinarim.com" className="btn-primary flex items-center gap-4">
              Email Your CV
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <Link to="/contact" className="btn-secondary flex items-center gap-4">
              Contact HR
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
