import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ChevronRight, ArrowLeft, ArrowRight, Clock, Tag } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  tags: string[];
  excerpt: string;
  body: string[];
}

const featuredPost: Post = {
  id: 'featured',
  title: 'Why Precision Tolerance Is the Most Underrated Factor in Auto Parts Manufacturing',
  category: 'Engineering',
  date: 'April 2026',
  readTime: '7 min read',
  img: 'https://picsum.photos/seed/blog-featured/1200/700',
  tags: ['Engineering', 'Quality'],
  excerpt: 'Across the automotive supply chain, tolerance specifications are often treated as an afterthought. At Modina, we argue that ±0.01mm is not a number on a datasheet — it is the difference between a part that lasts and a part that fails.',
  body: [
    'In the automotive components industry, tolerance specifications are frequently listed in datasheets but rarely scrutinized by buyers until something fails. At Modina Rim & Parts Ltd., we have built our entire manufacturing philosophy around a single conviction: tolerance is not a footnote — it is the product.',
    'Tolerance refers to the permissible variation in a part\'s dimensions from its nominal specification. A rim machined to a nominal diameter of 400mm with a tolerance of ±0.5mm may fit — but a rim machined to ±0.01mm will fit consistently, seat evenly, and perform reliably across its entire service life.',
    'The difference matters most under dynamic loading. A wheel rim experiences thousands of load cycles per kilometre — each one applying stress at the spoke-to-barrel junction, the valve hole, and the bead seat. At these stress concentration points, even small dimensional errors create uneven load distribution, accelerating fatigue crack propagation.',
    'Our CNC machining centres hold ±0.01mm tolerance across all critical dimensions. Every finished part passes 100% dimensional inspection using calibrated measurement tools before it leaves our quality lab. This is not a marketing claim — it is documented in our ISO 9001:2015 batch records for every production run.',
    'For buyers evaluating suppliers, tolerance documentation is the single most revealing specification to request. Any manufacturer genuinely achieving tight tolerances will have the measurement data to prove it. Those who cannot produce it are telling you something important.',
    'At Modina, we welcome technical scrutiny. Our quality lab is open to authorised distributor visits, and our batch inspection records are available to qualified buyers. Precision is not a cost — it is our competitive advantage, and we are transparent about how we achieve it.',
  ],
};

const postsData: Post[] = [
  { id: '1', title: 'The Science Behind ISO 9001 and What It Means for Buyers', category: 'Quality', date: 'March 2026', readTime: '6 min read', img: 'https://picsum.photos/seed/blog-01/1200/700', tags: ['Quality', 'Standards'], excerpt: 'ISO 9001 is more than a certificate on a wall. We break down what each clause means in practice and why it should be your first filter when choosing an auto parts supplier.', body: ['ISO 9001:2015 is the world\'s most widely adopted quality management system standard, with over one million certified organisations across 170 countries. For buyers of industrial components, it represents the most reliable independent signal that a supplier has documented, audited processes — rather than just claimed quality.', 'The standard is built around seven quality management principles: customer focus, leadership, engagement of people, process approach, improvement, evidence-based decision making, and relationship management. In practice, for a rim manufacturer, this means every step from raw material receipt to finished goods dispatch must follow documented procedures and leave an auditable record.', 'Clause 8 of ISO 9001:2015 covers operational planning and control — the heart of manufacturing compliance. It requires organisations to plan, implement, control, monitor, and review processes for providing products. For Modina, this means our production planning, in-process inspection, and final QC are all governed by documented procedures reviewed in our annual surveillance audits.', 'When evaluating a supplier\'s ISO certification, three checks matter: verify the certificate number is genuine (contact the certification body directly), confirm the scope covers the products you are buying, and check the expiry date and surveillance audit status. A certificate that has lapsed or covers a different product scope offers no assurance.', 'Modina holds ISO 9001:2015 certificate BD99166A, issued by LMS Certification Limited on 10 April 2023. Our scope covers design, manufacture, and supply of automotive rim and parts components. Surveillance audits are conducted annually with zero non-conformances in our most recent cycle.'] },
  { id: '2', title: 'CNC Machining vs. Traditional Stamping: Which Produces Better Rims?', category: 'Engineering', date: 'February 2026', readTime: '8 min read', img: 'https://picsum.photos/seed/blog-02/1200/700', tags: ['Engineering', 'Manufacturing'], excerpt: 'A technical comparison of CNC machining and traditional die stamping for rim production, covering dimensional accuracy, surface finish, material waste, and cost per unit.', body: ['The choice between CNC machining and traditional die stamping for rim production involves genuine engineering tradeoffs — not a simple verdict. Understanding these tradeoffs helps buyers make more informed sourcing decisions.', 'Die stamping excels at high-volume, low-variation production. A well-maintained stamping die can produce thousands of identical parts per hour with minimal operator intervention. For simple geometries and very large production volumes, it remains cost-competitive. The limitation is tolerance: stamped parts typically achieve ±0.3–0.5mm dimensional accuracy, which is adequate for non-critical applications.', 'CNC machining inverts this profile. Setup time is higher, cycle time per part is longer, but dimensional accuracy reaches ±0.01mm on modern 5-axis centres. For rim features where fit and load distribution matter — bead seat diameter, spoke hole position, valve hole placement — this precision difference is engineering-significant, not cosmetic.', 'At Modina, we use CNC machining for all critical rim dimensions and reserve stamping processes for non-critical formed features. This hybrid approach captures the accuracy advantage of CNC where it matters while maintaining production efficiency for high-volume components.', 'Surface finish is the third dimension of comparison. CNC machining produces consistent surface roughness (Ra 0.8–3.2μm depending on feed rate), which is important for subsequent coating adhesion. Stamped parts often show surface irregularities at the die contact zones that require additional preparation before coating — adding process steps and cost that are rarely reflected in the stamped part price.'] },
  { id: '3', title: 'How Bangladesh Became a Serious Auto Parts Exporter', category: 'Industry', date: 'January 2026', readTime: '7 min read', img: 'https://picsum.photos/seed/blog-03/1200/700', tags: ['Industry', 'Bangladesh'], excerpt: 'From a purely import-dependent economy to a growing exporter of precision components — the story of Bangladesh automotive manufacturing over the past 15 years.', body: ['In 2010, Bangladesh imported nearly all of its automotive components from China, India, and Japan. Domestic manufacturing was limited to basic assembly and repair-grade fabrication. Fifteen years later, a cohort of ISO-certified manufacturers is exporting precision components to Nepal, India\'s northeastern states, Myanmar, and beyond.', 'The shift began with the rapid expansion of Bangladesh\'s CNG auto-rickshaw fleet — a policy-driven growth that created massive domestic demand for locally-manufactured components. Entrepreneurs who had previously traded imported parts recognised an opportunity to manufacture domestically at competitive cost while offering shorter lead times and more responsive service.', 'The second phase of development, from roughly 2016 to 2022, was driven by quality investment. Early domestic manufacturers competed purely on price, but buyers increasingly demanded consistent quality. ISO certification became the gateway to serious B2B contracts — both domestically and for export. Manufacturers who invested in certified quality management systems found themselves with a durable competitive advantage.', 'Bangladesh\'s export growth in automotive components has been concentrated in South Asian markets where price sensitivity is high but quality expectations are rising. The SAFTA framework reduces tariff barriers across the region, and Bangladeshi manufacturers — with lower labour costs than Indian competitors and improving quality credentials — are increasingly competitive in Nepal and Myanmar in particular.', 'The challenge ahead is sustaining quality improvement as the sector scales. The manufacturers who will define Bangladesh\'s automotive components export reputation over the next decade are those investing in people, processes, and certification — not those competing purely on price.'] },
  { id: '4', title: 'Heat Treatment Explained: Why We Fire Our Steel Twice', category: 'Manufacturing', date: 'December 2025', readTime: '5 min read', img: 'https://picsum.photos/seed/blog-04/1200/700', tags: ['Manufacturing', 'Materials'], excerpt: 'Our two-stage heat treatment process increases tensile strength by up to 30% compared to single-stage methods. Here is the metallurgy behind the decision.', body: ['Steel\'s mechanical properties are not fixed at the point of manufacture — they are significantly influenced by subsequent thermal processing. Heat treatment is the controlled application of temperature cycles to alter a steel\'s microstructure and, consequently, its strength, hardness, toughness, and ductility.', 'Standard single-stage heat treatment — often called annealing or normalising — relieves residual stresses from forming operations and homogenises the grain structure. It produces a softer, more ductile material that is easier to machine but may not achieve the tensile strength required for high-cycle fatigue applications.', 'Our two-stage process adds a hardening and tempering cycle after initial normalisation. In the hardening stage, steel is heated above its critical temperature and quenched rapidly — locking a hard martensite microstructure in place. In the tempering stage, the hardened steel is reheated to a lower temperature to reduce brittleness while retaining most of the hardness gain.', 'The result is a material with tensile strength up to 30% higher than single-stage processed equivalents, combined with sufficient toughness to resist impact and fatigue fracture. For rim spokes and centre stands that must endure thousands of dynamic load cycles on rough road surfaces, this combination of strength and toughness is the correct engineering choice.', 'The process adds cost — an additional furnace cycle with controlled temperature profiles and quench parameters. We absorb this cost because the alternative — a lighter, softer part that fails prematurely in the field — costs far more in warranty, reputation, and customer trust.'] },
  { id: '5', title: '5 Questions to Ask Before Sourcing Rims from Any Manufacturer', category: 'Quality', date: 'November 2025', readTime: '4 min read', img: 'https://picsum.photos/seed/blog-05/1200/700', tags: ['Quality', 'Procurement'], excerpt: 'Whether you are a distributor or fleet operator, these five technical questions will help you separate quality manufacturers from those cutting corners on specifications.', body: ['Sourcing automotive components from a new manufacturer carries real risk — substandard parts create warranty costs, customer complaints, and reputational damage that can far exceed the initial price saving. These five questions help structure a rigorous supplier evaluation.', 'First: What is your dimensional tolerance specification and how do you verify it? A credible manufacturer will state a specific tolerance (e.g., ±0.01mm for critical dimensions) and describe their measurement process. Ask to see sample inspection records from recent production batches. Vague answers or reluctance to share data are warning signs.', 'Second: What certifications do you hold and who issued them? ISO 9001:2015 is the baseline. Verify the certificate number directly with the certification body — certificate forgery is more common than buyers assume. Confirm the scope covers the specific products you are purchasing.', 'Third: What is your heat treatment process for steel components? Single-stage versus two-stage treatment produces materially different mechanical properties. If a manufacturer cannot describe their heat treatment parameters, they likely do not control them consistently.', 'Fourth: Can I visit your facility? Serious manufacturers welcome qualified buyer visits. A factory tour reveals process discipline, equipment age, housekeeping standards, and workforce engagement — none of which are visible in a brochure. Reluctance to allow visits is a significant red flag.', 'Fifth: What is your defect rate and how do you handle non-conformances? Every manufacturer has some defect rate. The question is whether they measure it, what it is, and what their corrective action process looks like. An honest answer with real data builds more confidence than a claim of zero defects.'] },
  { id: '6', title: 'Inside Modina: A Day on the Production Floor', category: 'Company', date: 'October 2025', readTime: '9 min read', img: 'https://picsum.photos/seed/blog-06/1200/700', tags: ['Company', 'Manufacturing'], excerpt: 'From raw coil steel arriving at 6 AM to finished rims passing final QC at 4 PM — a walkthrough of one complete production cycle at our Jashore facility.', body: ['6:00 AM. The first delivery truck of the day backs into the raw materials bay at our BSCIC Industrial Area facility.', 'The cargo is hot-rolled steel coil — 3.2mm gauge, verified against our material specification before the driver leaves.', '9:00 AM. Formed rim blanks move to the CNC machining centre. This is where our ±0.01mm tolerance claim is realised.', '11:00 AM. In-process inspection. A sample from each machining batch is measured by our QC team.', '3:30 PM. Final inspection and batch sign-off. Finished parts are laid out for 100% visual inspection.', '4:00 PM. The first dispatch of the day loads. Domestic orders leave the facility with confirmed delivery slots.'] },
  { id: '7', title: 'Electroplating vs. Powder Coating: Surface Finish Compared', category: 'Engineering', date: 'September 2025', readTime: '6 min read', img: 'https://picsum.photos/seed/blog-07/1200/700', tags: ['Engineering', 'Finishing'], excerpt: 'Both electroplating and powder coating offer corrosion protection — but they perform very differently under real-world conditions. We compare them across 6 key dimensions.', body: ['Surface finishing is not merely cosmetic — it is a functional engineering decision that directly affects corrosion resistance, fatigue life, coating adhesion, and long-term appearance.', 'Corrosion resistance: Powder coating creates a thick (60–120μm), continuous polymer barrier that is highly resistant to moisture penetration.', 'Impact and abrasion resistance: Electroplated surfaces are harder but more brittle — they resist surface abrasion well but can crack and delaminate under impact.', 'At Modina, we use powder coating as our standard surface finish, with electroplating available for specific product variants where customers require it.'] },
  { id: '8', title: 'Why Rickshaw Rims Demand More Engineering Than You Think', category: 'Manufacturing', date: 'August 2025', readTime: '7 min read', img: 'https://picsum.photos/seed/blog-08/1200/700', tags: ['Manufacturing', 'Engineering'], excerpt: 'Rickshaw rims carry enormous dynamic loads on unpaved roads at low speeds — a combination that exposes design weaknesses invisible in standard lab testing. Here is how we solve it.', body: ['Rickshaw rims operate in a completely different loading environment — heavy payloads, very low speeds, unpaved and heavily potholed surfaces, and continuous operation for 14–18 hours per day.', 'The critical loading scenario for a rickshaw rim is the quasi-static pothole drop — a slow-speed impact where the wheel drops into a pothole under full load.', 'Our rim design process includes finite element analysis of the pothole drop scenario at design gross vehicle weight plus a 25% overload factor.', 'We also test finished rim samples at 150% of rated load to verify that design intent is achieved in production.'] },
  { id: '9', title: 'The True Cost of a Low-Quality Bearing in a Commercial Vehicle', category: 'Industry', date: 'July 2025', readTime: '5 min read', img: 'https://picsum.photos/seed/blog-09/1200/700', tags: ['Industry', 'Quality'], excerpt: 'A single substandard bearing in a CNG auto-rickshaw can cause cascading failures costing 20x the original part price. The economics of quality procurement explained.', body: ['The price difference between a quality bearing and a substandard alternative is typically small — perhaps BDT 50–150 per unit for common CNG auto-rickshaw applications.', 'A typical CNG auto-rickshaw bearing failure scenario: the bearing begins to deteriorate at approximately 40% of its expected service life.', 'The repair cost breakdown: replacement bearing, axle regrinding, hub bore repair, rim replacement, labour, and lost operating revenue — total cost BDT 4,000–9,000 from an initial saving of BDT 100.', 'Procurement decisions made on unit price alone systematically undercount total cost of ownership.'] },
];

const allPosts = [featuredPost, ...postsData];

export default function BlogDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const post = allPosts.find(p => p.id === id);
  const numericPosts = postsData;
  const currentIdx = numericPosts.findIndex(p => p.id === id);
  const prev = currentIdx > 0 ? numericPosts[currentIdx - 1] : null;
  const next = currentIdx < numericPosts.length - 1 ? numericPosts[currentIdx + 1] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] flex flex-col items-center justify-center gap-6 public-page public-recovery">
        <h1 className="public-article-title text-modina-heading text-center">Article not found</h1>
        <Link to="/blog" className="text-xs font-bold tracking-widest text-modina-red uppercase hover:text-modina-heading transition-colors duration-300">← Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] public-page">
      <Helmet>
        <title>{post.title} | Modina Blog</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={`https://www.modinarim.com/blog/${post.id}`} />
      </Helmet>

      {/* HERO */}
      <div className="public-article-media relative w-full overflow-hidden">
        <motion.img
          initial={{ scale: 1.06 }} animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={post.img} alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.7)_0%,transparent_55%)]" />
        <div className="absolute bottom-8 left-0 right-0 container-premium">
          <span className="text-xs font-bold tracking-widest text-modina-red uppercase border border-modina-red/40 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm public-meta">{post.category}</span>
        </div>
      </div>

      {/* ARTICLE */}
      <article className="container-premium public-task-content max-w-3xl public-reading">
        <div className="text-xs font-bold tracking-widest text-modina-muted uppercase flex items-center gap-2 mb-10 flex-wrap public-breadcrumb">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <Link to="/blog" className="hover:text-modina-red transition-colors duration-300">Blog</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-modina-subtle">{post.category}</span>
        </div>

        <div className="flex items-center gap-6 mb-5 flex-wrap">
          <span className="text-xs font-bold tracking-widest text-modina-muted uppercase public-meta">{post.date}</span>
          <span className="w-[0.5px] h-3 bg-modina-divider" />
          <div className="flex items-center gap-2"><Clock className="w-3 h-3 text-modina-subtle" /><span className="text-xs font-bold tracking-widest text-modina-muted uppercase public-meta">{post.readTime}</span></div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-modina-heading tracking-tight leading-tight mb-8 public-article-title"
        >
          {post.title}
        </motion.h1>

        <div className="w-16 h-[2px] bg-modina-red mb-8" />

        <p className="text-[16px] text-modina-muted font-light leading-relaxed mb-10 border-l-2 border-modina-red pl-6 public-body">{post.excerpt}</p>

        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1.5 text-xs font-bold tracking-widest text-modina-muted border border-modina-border px-3 py-1 uppercase rounded-sm public-meta">
              <Tag className="w-2.5 h-2.5" />{tag}
            </span>
          ))}
        </div>

        {post.body.map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
            className="text-[15px] text-modina-muted font-light leading-relaxed mb-6 public-body"
          >
            {para}
          </motion.p>
        ))}

        <div className="mt-14 pt-8 border-t border-modina-divider flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mb-1 public-meta">Published by</p>
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase public-meta">Modina Rim &amp; Parts Ltd.</p>
          </div>
          <button type="button" onClick={() => navigate('/blog')} className="flex items-center gap-2 text-xs font-bold tracking-widest text-modina-muted uppercase hover:text-modina-red transition-all duration-300 ease-in-out">
            <ArrowLeft className="w-3 h-3" /> Back to Blog
          </button>
        </div>
      </article>

      {/* PREV / NEXT */}
      {(prev || next) && (
        <div className="border-t border-modina-divider">
          <div className="grid min-w-0 grid-cols-1 divide-y divide-modina-divider md:grid-cols-2 md:divide-x md:divide-y-0">
            {prev ? (
              <Link to={`/blog/${prev.id}`} className="group min-w-0 bg-modina-bg-alt p-6 sm:p-8 lg:p-10 flex flex-col gap-3 relative transition-all duration-300 ease-in-out hover:bg-white">
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-modina-red transition-all duration-500" />
                <div className="flex items-center gap-2 text-modina-subtle group-hover:text-modina-red transition-colors duration-300"><ArrowLeft className="w-3.5 h-3.5" /><span className="text-xs font-bold tracking-widest uppercase public-meta">Previous</span></div>
                <h3 className="font-display font-bold text-modina-muted group-hover:text-modina-heading text-lg tracking-tight transition-colors duration-300 line-clamp-2 public-card-title">{prev.title}</h3>
              </Link>
            ) : <div className="bg-modina-bg-alt" />}
            {next ? (
              <Link to={`/blog/${next.id}`} className="group bg-modina-bg-alt p-8 lg:p-10 flex flex-col gap-3 items-end text-right relative transition-all duration-300 ease-in-out hover:bg-white">
                <div className="absolute top-0 right-0 w-0 group-hover:w-full h-[2px] bg-modina-red transition-all duration-500" />
                <div className="flex items-center gap-2 text-modina-subtle group-hover:text-modina-red transition-colors duration-300"><span className="text-xs font-bold tracking-widest uppercase public-meta">Next</span><ArrowRight className="w-3.5 h-3.5" /></div>
                <h3 className="font-display font-bold text-modina-muted group-hover:text-modina-heading text-lg tracking-tight transition-colors duration-300 line-clamp-2 public-card-title">{next.title}</h3>
              </Link>
            ) : <div className="bg-modina-bg-alt" />}
          </div>
        </div>
      )}
    </div>
  );
}
