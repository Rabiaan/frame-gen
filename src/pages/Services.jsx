import React, { useEffect } from 'react';
import SEO from '../components/SEO.jsx';
import '../styles/services.css';
import PatternCard from '../components/PatternCard.jsx';
import OrbitalProcess from '../components/OrbitalProcess.jsx';
import { 
  Globe, 
  Layout, 
  ShoppingCart, 
  Box, 
  PlaySquare, 
  Palette 
} from 'lucide-react';


const deliverables = [
  {
    color: '#3B82F6',
    svgPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    title: 'High-performance websites',
    text: 'Fast, secure, and SEO-optimized digital experiences tailored to your business needs.',
  },
  {
    color: '#A855F7',
    svgPath: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    title: 'Conversion-focused UI/UX design',
    text: 'User-centric interfaces designed to engage visitors and drive measurable actions.',
  },
  {
    color: '#F59E0B',
    svgPath: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z",
    title: 'Cinematic 3D and motion visuals',
    text: 'Realistic 3D renders and motion graphics that bring your products and vision to life.',
  },
  {
    color: '#10B981',
    svgPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    title: 'Strong brand identity systems',
    text: 'Comprehensive visual systems including logos, typography, and color palettes.',
  },
  {
    color: '#EC4899',
    svgPath: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    title: 'Scalable e-commerce platforms',
    text: 'Robust online stores built for growth, seamless checkout, and easy management.',
  },
  {
    color: '#6366F1',
    svgPath: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    title: 'Ongoing support and optimization',
    text: 'Reliable maintenance, security updates, and performance monitoring for long-term success.',
  },
];

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. Simple websites take 2-4 weeks, while complex applications can take 2-4 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! We work with clients worldwide and are comfortable collaborating across different time zones.. Most communication happens via email, video calls, and project management tools."
  },
  {
    question: "What's your payment structure?",
    answer: "We typically work with a 50% upfront deposit and 50% upon completion for smaller projects. Larger projects are broken into milestone-based payments for better cash flow management."
  },
  {
    question: "Do you provide ongoing support?",
    answer: "Yes! All projects include a warranty period for bug fixes. We also offer ongoing maintenance packages for updates, security monitoring, and continued optimization."
  },
  {
    question: "Can you work with my existing team?",
    answer: "Definitely! We collaborate seamlessly with internal teams, agencies, and other freelancers. We can adapt to your existing workflows and communication preferences."
  },
  {
    question: "What are the cost expectations for a project?",
    answer: "Our pricing is tailored to the unique scope and complexity of each project. Whether you need a high-performance website, cinematic 3D visuals, or a comprehensive brand identity, we provide custom quotes that reflect the specific value and results we deliver. We typically offer project-based pricing or milestone structures to ensure clarity and transparency."
  },
  {
    question: "What if I need revisions?",
    answer: "All projects include a set number of revisions. We believe in getting it right, so we'll work together until you're completely satisfied with the final result."
  },
];

const whyItems = [
  'Premium Quality Code',
  'Fast Delivery',
  'Fit for Future Scale',
  'Unique Design Language',
  'SEO Friendly',
  'Clean UI Animations',
  'Professional Communication',
  'High-Performance Websites',
];

function Services() {

  useEffect(() => {

    const options = { threshold: 0.1, rootMargin: '0px 0px -80px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = document.querySelectorAll('.services-reveal');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const servicesSchema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Web Development',
      provider: { '@type': 'MarketingAgency', name: 'FrameGen', url: 'https://framegen.vercel.app' },
      areaServed: { '@type': 'Country', name: 'Pakistan' },
      description: 'Custom web development including React apps, WordPress, and e-commerce solutions.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Digital Marketing',
      provider: { '@type': 'MarketingAgency', name: 'FrameGen', url: 'https://framegen.vercel.app' },
      areaServed: { '@type': 'Country', name: 'Pakistan' },
      description: 'SEO, social media advertising, and digital marketing strategies to grow your business.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: '3D CGI & Motion Graphics',
      provider: { '@type': 'MarketingAgency', name: 'FrameGen', url: 'https://framegen.vercel.app' },
      description: 'Photorealistic 3D renders, CGI animation, and motion graphics for marketing.',
    },
  ];

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[1400px] text-white">
      <SEO
        title="Our Services — Web Dev, 3D CGI, Branding & Digital Marketing"
        description="Explore FrameGen's full range of services: web development, 3D CGI visualization, motion graphics, brand identity design, and digital marketing in Pakistan."
        canonical="https://framegen.vercel.app/services"
        schema={servicesSchema}
      />

      {/* Hero */}
      <section
        aria-labelledby="services-hero-heading"
        className="services-banner relative mb-20  overflow-hidden rounded-[20px] border border-white/5 bg-center bg-cover bg-fixed shadow-[0_0_40px_rgba(123,97,255,0.08)] px-6 md:px-20"
      >
        {/* Visually hidden H1 for SEO — the decorative banner text is aria-hidden */}
        <h1 id="services-hero-heading" className="sr-only">
          Digital Agency Services — Web Development, 3D CGI, Motion Graphics & Branding
        </h1>
        <div className="hero-brand" aria-hidden="true">
          OUR
          <br />
          SERVICES
        </div>
      </section>

      {/* Core Expertise */}
      <section
        id="core-expertise"
        className="core-expertise mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <p className="text-gray-500 text-left">Blend of Creativity & Excellence.</p>
        <h2 className="mb-5 text-left font-syne text-[36px] font-light">Our Core Expertise</h2>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <PatternCard 
            label="Visuals"
            title="3D & CGI Visualization"
            subtitle="Photorealistic 3D rendering and cinematic CGI for products, architecture, and marketing environments."
            type="polka-dots"
            features={["Product Design", "Architectural Renders", "CGI Animation", "VFX & Post-Production"]}
            icon={<Box className="text-[#00F0FF]" size={24} />}
            iconBg="bg-[#00F0FF]/10"
          />
          <PatternCard 
            label="Motion"
            title="Motion Graphics & 2D/3D Animation"
            subtitle="Engaging motion graphics and custom animations that tell your brand story with fluid, cinematic movement."
            type="diagonal-lines"
            features={["Explainer Videos", "Logo Animation", "UI Interaction Motion", "Social Content"]}
            icon={<PlaySquare className="text-[#3B82F6]" size={24} />}
            iconBg="bg-[#3B82F6]/10"
          />
          <PatternCard 
            label="Web Dev"
            title="Web Applications"
            subtitle="Custom web applications designed for speed, security, and seamless user experiences that support business growth"
            type="wavy-lines"
            features={["React & Next.js", "API Integration", "Scalable Backend", "Cloud Hosting"]}
            icon={<Globe className="text-blue-400" size={24} />}
            iconBg="bg-blue-500/10"
          />
          <PatternCard 
            label="CMS"
            title="WordPress & CMS"
            subtitle="Custom WordPress solutions, theme development, and manageable CMS platforms for seamless content control."
            type="dotted-wavy"
            features={["Custom Theme Design", "Elementor & Blocks", "Plugin Customization", "SEO Optimization"]}
            icon={<Layout className="text-[#7B61FF]" size={24} />}
            iconBg="bg-[#7B61FF]/10"
          />
          <PatternCard 
            label="Shopping"
            title="E-commerce Solutions"
            subtitle="Robust online stores built to convert, from Shopify setups to fully custom headless commerce architectures."
            type="chevrons"
            features={["Shopify & WooCommerce", "Payment Gateways", "Inventory Systems", "Headless Commerce"]}
            icon={<ShoppingCart className="text-[#7B61FF]" size={24} />}
            iconBg="bg-[#7B61FF]/10"
          />
          <PatternCard 
            label="Branding"
            title="Brand Identity & Visual Design"
            subtitle="Comprehensive branding solutions including logo design, typography, color palettes, and full brand books."
            type="random-dashes"
            features={["Logo & Iconography", "Brand Guidelines", "Print & Digital Collateral", "Typography Systems"]}
            icon={<Palette className="text-[#7B61FF]" size={24} />}
            iconBg="bg-[#7B61FF]/10"
          />
          <PatternCard 
            label="Ads"
            title="Digital Ads & Social Strategy"
            subtitle="Strategic design and management of high-conversion ad campaigns across all major digital and social platforms."
            type="glowing-rings"
            features={["Facebook & IG Ads", "Google Search/Display", "Content Marketing Plan", "Conversion Optimization"]}
            icon={<Globe className="text-[#7B61FF]" size={24} />}
            iconBg="bg-[#7B61FF]/10"
          />
        </div>
      </section>

      {/* What We Deliver */}
      <section
        className="deliver mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      ><p className="text-gray-500 text-left">Value & Your Success</p>
        <h2 className="mb-5 text-left font-syne text-[36px] font-light">What We Deliver</h2>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="grid gap-6 md:grid-cols-4">
          {deliverables.map((d) => (
            <div
              key={d.title}
              className="services-reveal bg-[#09090b] border border-gray-800 p-5 rounded-xl transition hover:border-purple-500/50"
            >
              <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center">
                <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d.svgPath} />
                </svg>
              </div>
              <h3 className="mb-2 text-[18px] font-medium">{d.title}</h3>
              <p className="text-[14px] leading-[1.5] text-[#cccccc]">{d.text}</p>
            </div>
          ))}
        </div>
      </section>

      <OrbitalProcess />

      {/* Why Choose Us */}
      <section
        id="why-choose"
        className="why-choose mb-10 rounded-[20px] border border-white/5 bg-[#0b0b0b] px-6 py-12 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      ><p className="text-gray-500 text-left">Frequently Asked</p>
        <h2 className="mb-5 text-left font-syne text-[36px] font-light">Why Choose FrameGen?</h2>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>

        {/* FAQ Grid: 2 boxes per row */}
        <div className="grid gap-6 md:grid-cols-2">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="faq-card relative rounded-xl border border-white/10 bg-[#121214]] p-6 text-white backdrop-blur-[20px] shadow-lg"
            >
              <h3 className="mb-3 text-[18px] font-semibold">{item.question}</h3>
              <p className="text-[15px] leading-relaxed text-[#cccccc]">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Services;