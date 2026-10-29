import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ChevronRight, ArrowLeft, ArrowRight, Clock } from 'lucide-react';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  img: string;
  body: string[];
}

const articlesData: Article[] = [
  {
    id: 1,
    title: 'ISO 9001:2015 Certification Successfully Renewed for 2025–2026',
    category: 'Company News',
    date: 'March 2026',
    readTime: '3 min read',
    img: 'https://picsum.photos/seed/news-01/1200/700',
    excerpt: 'Modina Rim & Parts Ltd. has completed its annual ISO 9001:2015 surveillance audit with zero non-conformances, reaffirming our commitment to world-class quality management.',
    body: [
      'Modina Rim & Parts Ltd. is proud to announce the successful renewal of its ISO 9001:2015 Quality Management System certification for the 2025–2026 cycle. The annual surveillance audit was conducted by LMS Certification Limited over three days at our Jhumjhumpur, Jashore manufacturing facility.',
      'The audit covered all major production processes including raw material inspection, CNC machining, heat treatment, surface finishing, dimensional quality control, and final dispatch certification. The audit team reviewed 18 months of production records, corrective action logs, customer feedback data, and employee training records.',
      'We are particularly pleased that the audit concluded with zero major non-conformances and zero minor non-conformances — a result that reflects the dedication of our entire team to maintaining the highest standards in every step of our manufacturing process.',
      '"This certification renewal is not merely a formality," said Md. Faruq Hossain, Managing Director. "It is proof that our commitment to quality management has become genuinely embedded in our culture. Every worker on our floor understands why these standards matter."',
      'The ISO 9001:2015 certification, first awarded in April 2023 under certificate number BD99166A, covers the design, manufacture, and supply of automotive rim and parts components. The renewal is valid through April 2026, with the next full recertification audit scheduled for Q2 2026.',
    ],
  },
  {
    id: 2,
    title: 'New CNG Rim Variant Released for Commercial Fleet Operators',
    category: 'Product Updates',
    date: 'February 2026',
    readTime: '4 min read',
    img: 'https://picsum.photos/seed/news-02/1200/700',
    excerpt: 'Following market demand from commercial operators, Modina has introduced a reinforced CNG rim variant engineered for higher load ratings and extended service life.',
    body: [
      'Modina Rim & Parts Ltd. has officially launched a new reinforced variant of its popular CNG Rim product, specifically engineered to meet the demands of high-cycle commercial fleet operators across Bangladesh.',
      'The new variant features a 15% increased wall thickness in the spoke-to-barrel junction area — the primary failure point identified through analysis of field returns over the past two years. The updated design also incorporates a revised spoke geometry that distributes load stress more evenly across the full rim profile.',
      'Commercial CNG operators typically run their vehicles 16–20 hours per day, compared to 8–10 hours for private use. This duty cycle places significantly greater stress on rim components, particularly the spoke welds and barrel seam. The new variant addresses these specific failure modes.',
      'Key technical improvements in the new CNG Rim variant include: reinforced spoke-to-barrel junction (15% thicker), revised spoke geometry for improved load distribution, enhanced powder coating process for corrosion resistance, and updated quality certification batch testing at 120% rated load.',
      '"We listened to fleet operators and worked backward from the failure data," said the Head of Product Engineering. "The result is a rim that should last 40% longer under commercial operating conditions."',
      'The new CNG Rim variant is available from our Jashore facility in both standard black and silver finishes. Minimum order quantity is 100 units. Contact our sales team for distributor pricing.',
    ],
  },
  {
    id: 3,
    title: 'Modina Participates in Dhaka International Trade Expo 2026',
    category: 'Events',
    date: 'January 2026',
    readTime: '5 min read',
    img: 'https://picsum.photos/seed/news-03/1200/700',
    excerpt: 'Our team showcased the full 2026 product range at the Dhaka International Trade Expo, connecting with over 200 distributors and manufacturers from across South Asia.',
    body: [
      'Modina Rim & Parts Ltd. participated as an exhibitor at the Dhaka International Trade Expo 2026, held at the Bashundhara International Convention City from January 14–17, 2026.',
      'Our team occupied a 48 sqm booth in Hall B, the dedicated zone for automotive and industrial components manufacturers. The booth featured a full display of our 21-SKU product range.',
      'Over the four days, our sales team engaged with 214 verified trade visitors, including 89 from outside Bangladesh (primarily from India, Nepal, and Myanmar).',
      '"The response exceeded our expectations," said the Sales Director. "We had visitors queuing at our booth throughout all four days."',
      'Modina also participated in a panel discussion on "Precision Manufacturing in Bangladesh: Competing on Quality" alongside four other leading manufacturers.',
      'Follow-up meetings have been scheduled with 23 prospective partners across India, Nepal, and Myanmar.',
    ],
  },
  {
    id: 4,
    title: 'Bangladesh Automotive Parts Sector Grows 18% in FY2025',
    category: 'Industry',
    date: 'December 2025',
    readTime: '6 min read',
    img: 'https://picsum.photos/seed/news-04/1200/700',
    excerpt: 'The Bangladesh automotive components manufacturing sector recorded strong growth in fiscal year 2025, driven by rising domestic demand and increased export volumes to neighboring markets.',
    body: [
      'The Bangladesh automotive components manufacturing sector recorded 18.3% year-on-year growth in fiscal year 2024–2025, according to data published by the Bangladesh Auto Parts Manufacturers Association (BAPMA).',
      'Growth was driven by three principal factors: continued expansion of the CNG auto-rickshaw fleet in urban centers, recovery of two-wheeler sales to pre-pandemic levels, and increasing export volumes to Nepal, India\'s northeastern states, and Myanmar.',
      'Export volumes from Bangladeshi manufacturers to South Asian markets grew by 31% in FY2025, with Nepal accounting for the largest share of growth.',
      'Industry analysts project continued growth of 14–16% for FY2026, contingent on raw material price stability.',
      'Modina Rim & Parts Ltd. is well positioned to benefit from these trends, with existing export relationships in Nepal and active expansion discussions in Myanmar and India.',
    ],
  },
  {
    id: 5,
    title: 'Modina Expands Distribution Network to Chittagong and Sylhet',
    category: 'Company News',
    date: 'November 2025',
    readTime: '3 min read',
    img: 'https://picsum.photos/seed/news-05/1200/700',
    excerpt: 'To better serve our regional clients, Modina has established two new distribution centers in Chittagong and Sylhet, reducing delivery times by up to 40% for customers in those regions.',
    body: [
      'Modina Rim & Parts Ltd. has established two new regional distribution centers — one in Chittagong and one in Sylhet — as part of our ongoing commitment to improving delivery speed and reliability.',
      'The Chittagong facility serves our growing customer base in Chittagong, Cox\'s Bazar, Comilla, and Noakhali. The Sylhet facility covers Sylhet, Moulvibazar, Habiganj, and Sunamganj districts.',
      'Both facilities maintain 4–6 weeks of forward inventory for our top-selling SKUs, allowing next-day dispatch for most standard orders.',
      '"Our Chittagong and Sylhet customers had been asking for faster delivery for years," said the Logistics Manager.',
    ],
  },
  {
    id: 6,
    title: 'New Motorcycle Handlebar Range Passes Stress Testing at 200% Load',
    category: 'Product Updates',
    date: 'October 2025',
    readTime: '4 min read',
    img: 'https://picsum.photos/seed/news-06/1200/700',
    excerpt: 'Our latest motorcycle handlebar range has completed rigorous stress testing at 200% of rated load capacity, setting a new benchmark for durability in the Bangladeshi market.',
    body: [
      'Modina Rim & Parts Ltd. is pleased to announce that our new Chromoly Steel Motorcycle Handlebar range has successfully completed rigorous structural stress testing at 200% of rated load capacity.',
      'The handlebars were tested using calibrated load application equipment at our in-house quality laboratory. Each sample underwent 50,000 load cycles at 200% rated capacity.',
      'The new handlebar range incorporates several design improvements: mandrel-bent tubing for consistent wall thickness, improved weld joint geometry, and a refined powder coating process.',
      '"The 200% load certification gives our distributor and dealer partners a credible quality claim to make to their customers," said the Product Engineering Manager.',
    ],
  },
  {
    id: 7,
    title: 'South Asian Auto Parts Summit — Modina Keynote Speaker',
    category: 'Events',
    date: 'September 2025',
    readTime: '5 min read',
    img: 'https://picsum.photos/seed/news-07/1200/700',
    excerpt: 'Modina Managing Director Md. Faruq Hossain delivered the keynote address at the South Asian Auto Parts Summit in Colombo, speaking on precision manufacturing and regional supply chains.',
    body: [
      'Modina Rim & Parts Ltd. Managing Director Md. Faruq Hossain delivered the opening keynote address at the 2025 South Asian Auto Parts Summit, held at the Cinnamon Grand Convention Centre in Colombo, Sri Lanka.',
      'The Summit, now in its seventh year, brings together automotive components manufacturers, distributors, and policy representatives from Bangladesh, India, Sri Lanka, Nepal, and Pakistan.',
      'Md. Faruq Hossain\'s keynote, titled "Precision at Scale: How Bangladesh Can Lead South Asian Auto Parts Manufacturing," outlined the strategic advantages of Bangladesh\'s manufacturing sector.',
      'Modina was the only Bangladeshi manufacturer invited to present at the Summit this year, reflecting the company\'s growing regional profile.',
    ],
  },
  {
    id: 8,
    title: 'Rising Steel Costs and the Case for Domestic Manufacturing',
    category: 'Industry',
    date: 'August 2025',
    readTime: '7 min read',
    img: 'https://picsum.photos/seed/news-08/1200/700',
    excerpt: 'As global steel prices continue to fluctuate, Bangladeshi manufacturers who have invested in domestic supply chains are proving more resilient than those dependent on imports.',
    body: [
      'Global hot-rolled coil steel prices have experienced significant volatility over the past 18 months, with prices swinging between USD 520 and USD 790 per metric tonne.',
      'Manufacturers who have invested in domestic supply chain relationships and forward purchasing agreements are proving significantly more resilient than those relying on spot-market import purchases.',
      'Modina Rim & Parts Ltd. has historically maintained 8–10 week forward inventory of key raw materials, sourced from a mix of domestic steel producers and established import relationships.',
      'The pattern emerging from the current steel price cycle underscores a broader lesson: quality-focused manufacturers who have built stable supply chains are better positioned to absorb cost shocks.',
    ],
  },
];

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const article = articlesData.find(a => a.id === Number(id));

  const currentIndex = articlesData.findIndex(a => a.id === Number(id));
  const prevArticle = currentIndex > 0 ? articlesData[currentIndex - 1] : null;
  const nextArticle = currentIndex < articlesData.length - 1 ? articlesData[currentIndex + 1] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px] flex flex-col items-center justify-center gap-6">
        <p className="text-xs font-bold tracking-widest text-modina-muted uppercase">Article not found</p>
        <Link to="/news" className="text-xs font-bold tracking-widest text-modina-red uppercase hover:text-modina-heading transition-colors duration-300">
          ← Back to News
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-modina-text pt-[112px] sm:pt-[72px]">
      <Helmet>
        <title>{article.title} | Modina Rim &amp; Parts Ltd.</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://www.modinarim.com/news/${article.id}`} />
      </Helmet>

      {/* HERO IMAGE */}
      <div className="relative w-full h-[45vh] md:h-[55vh] overflow-hidden">
        <motion.img
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(15,23,42,0.6)_0%,transparent_50%)]" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-6 md:px-12 lg:px-24 pb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold tracking-widest text-modina-red uppercase border border-modina-red/40 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-sm">
              {article.category}
            </span>
          </div>
        </div>
      </div>

      {/* ARTICLE CONTENT */}
      <article className="container mx-auto px-6 md:px-12 lg:px-24 py-16 max-w-3xl">
        {/* Breadcrumb */}
        <div className="text-xs font-bold tracking-widest text-modina-muted uppercase flex items-center gap-2 mb-10">
          <Link to="/" className="hover:text-modina-red transition-colors duration-300">Home</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <Link to="/news" className="hover:text-modina-red transition-colors duration-300">News</Link>
          <ChevronRight className="w-2.5 h-2.5" />
          <span className="text-modina-subtle">{article.category}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-6 mb-6">
          <span className="text-xs font-bold tracking-widest text-modina-muted uppercase">{article.date}</span>
          <span className="w-[0.5px] h-3 bg-modina-divider" />
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-modina-subtle" />
            <span className="text-xs font-bold tracking-widest text-modina-muted uppercase">{article.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-bold text-modina-heading text-3xl md:text-4xl lg:text-5xl tracking-tight leading-tight mb-8"
        >
          {article.title}
        </motion.h1>

        {/* Red separator */}
        <div className="w-16 h-[2px] bg-modina-red mb-10" />

        {/* Excerpt */}
        <p className="text-[16px] text-modina-muted font-light leading-relaxed mb-10 border-l-2 border-modina-red pl-6">
          {article.excerpt}
        </p>

        {/* Body paragraphs */}
        {article.body.map((para, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: idx * 0.05 }}
            className="text-[15px] text-modina-muted font-light leading-relaxed mb-6"
          >
            {para}
          </motion.p>
        ))}

        {/* Article footer */}
        <div className="mt-14 pt-8 border-t border-modina-divider flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase mb-1">Published by</p>
            <p className="text-xs font-bold tracking-widest text-modina-muted uppercase">Modina Rim &amp; Parts Ltd.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/news')}
            className="flex items-center gap-2 text-xs font-bold tracking-widest text-modina-muted uppercase hover:text-modina-red transition-all duration-300 ease-in-out"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to News
          </button>
        </div>
      </article>

      {/* PREV / NEXT NAVIGATION */}
      {(prevArticle || nextArticle) && (
        <div className="border-t border-modina-divider">
          <div className="grid min-w-0 grid-cols-1 divide-y divide-modina-divider md:grid-cols-2 md:divide-x md:divide-y-0">
            {prevArticle ? (
              <Link
                to={`/news/${prevArticle.id}`}
                className="group min-w-0 bg-modina-bg-alt p-6 sm:p-8 lg:p-10 flex flex-col gap-3 relative transition-all duration-300 ease-in-out hover:bg-white"
              >
                <div className="absolute top-0 left-0 w-0 group-hover:w-full h-[2px] bg-modina-red transition-all duration-500" />
                <div className="flex items-center gap-2 text-modina-subtle group-hover:text-modina-red transition-colors duration-300">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="text-xs font-bold tracking-widest uppercase">Previous</span>
                </div>
                <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase">{prevArticle.category}</p>
                <h3 className="font-display font-bold text-modina-muted group-hover:text-modina-heading text-lg tracking-tight transition-colors duration-300 line-clamp-2">
                  {prevArticle.title}
                </h3>
              </Link>
            ) : <div className="bg-modina-bg-alt" />}

            {nextArticle ? (
              <Link
                to={`/news/${nextArticle.id}`}
                className="group bg-modina-bg-alt p-8 lg:p-10 flex flex-col gap-3 items-end text-right relative transition-all duration-300 ease-in-out hover:bg-white"
              >
                <div className="absolute top-0 right-0 w-0 group-hover:w-full h-[2px] bg-modina-red transition-all duration-500" />
                <div className="flex items-center gap-2 text-modina-subtle group-hover:text-modina-red transition-colors duration-300">
                  <span className="text-xs font-bold tracking-widest uppercase">Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <p className="text-xs font-bold tracking-widest text-modina-subtle uppercase">{nextArticle.category}</p>
                <h3 className="font-display font-bold text-modina-muted group-hover:text-modina-heading text-lg tracking-tight transition-colors duration-300 line-clamp-2">
                  {nextArticle.title}
                </h3>
              </Link>
            ) : <div className="bg-modina-bg-alt" />}
          </div>
        </div>
      )}
    </div>
  );
}
