import React, { useEffect, useState } from 'react';
import '../styles/services.css';

const processPhases = [
  {
    number: '01',
    color: '#3B82F6',
    title: 'Discovery',
    desc: 'We start with understanding your goals, audience, and challenges through detailed consultation.'
  },
  {
    number: '02',
    color: '#A855F7',
    title: 'Strategy',
    desc: 'Developing a comprehensive plan and approach tailored to your specific needs and objectives.'
  },
  {
    number: '03',
    color: '#10B981',
    title: 'Design',
    desc: 'Creating visual concepts and wireframes with iterative feedback to refine the user experience.'
  },
  {
    number: '04',
    color: '#F59E0B',
    title: 'Development',
    desc: 'Building the technical foundation through coding and integration with regular testing.'
  },
  {
    number: '05',
    color: '#EF4444',
    title: 'Launch & Support',
    desc: 'Delivering polished solutions with ongoing support and optimization for continued success.'
  },
];

const deliverables = [
  {
    color: '#A855F7',
    svgPath: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    title: 'Brand Identity & UI/UX',
    text: 'Clean designs, unique brand tone, engaging visual systems.',
  },
  {
    color: '#3B82F6',
    svgPath: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    title: 'Website Redesign',
    text: 'Level up weak or outdated websites with modern structure and visuals.',
  },
  {
    color: '#10B981',
    svgPath: "M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1",
    title: 'Maintenance & Support',
    text: 'Hosting, backups, security fixes, optimization.',
  },
  {
    color: '#F59E0B',
    svgPath: "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0H3m15.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L6.75 2.905M16.5 4.205l.75-1.3",
    title: 'React Web Applications',
    text: 'Dynamic single-page applications, and data-driven interfaces with API integration.',
  },
];

const faqItems = [
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary based on scope and complexity. Simple websites take 2-4 weeks, while complex applications can take 2-4 months. We'll provide a detailed timeline during our initial consultation."
  },
  {
    question: "Do you work with international clients?",
    answer: "Absolutely! We work with clients worldwide and am comfortable with different time zones. Most communication happens via email, video calls, and project management tools."
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
  // Reveal animations for cards and steps
  useEffect(() => {
    document.title = "Our Services — FrameGen";
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

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[1400px] text-white">
      {/* Hero */}
      <section
        aria-labelledby="services-hero-heading"  // change to about-hero-heading / contact-hero-heading / projects-heading depending on page
        className="services-banner relative mb-20  overflow-hidden rounded-[20px] border border-white/5 bg-center bg-cover bg-fixed shadow-[0_0_40px_rgba(123,97,255,0.08)] px-6 md:px-20"
      >
        <div className="hero-brand">
          OUR
          <br />
          SERVICES
        </div>
      </section>

      {/* Core Expertise */}
      <section
        id="core-expertise"
        className="core-expertise mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      ><p className="text-gray-500 text-left">Blend of Creativity & Excellence.</p>
        <h2 className="mb-5 text-left font-syne text-[36px] font-light">Our Core Expertise</h2>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Web Applications */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-blue-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Web Applications</h3>
            <p className="text-gray-400 mb-6">High-performance, scalable web applications built with React, Next.js, and modern cloud architectures.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                React & Next.js
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                API Integration
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Scalable Backend
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                Cloud Hosting
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: 4-8 weeks</div>
          </div>

          {/* WordPress Development */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-violet-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">WordPress & CMS</h3>
            <p className="text-gray-400 mb-6">Custom WordPress solutions, theme development, and manageable CMS platforms for seamless content control.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                Custom Theme Design
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                Elementor & Blocks
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                Plugin Customization
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                SEO Optimization
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: 2-4 weeks</div>
          </div>

          {/* E-commerce Solutions */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-pink-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">E-commerce Solutions</h3>
            <p className="text-gray-400 mb-6">Robust online stores built to convert, from Shopify setups to fully custom headless commerce architectures.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                Shopify & WooCommerce
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                Payment Gateways
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                Inventory Systems
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                Headless Commerce
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: 4-8 weeks</div>
          </div>

          {/* 3D & CGI Visualization */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-indigo-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2 1m0 0l-2-1m2 1v2.5M7 10l-2 1m0 0l-2-1m2 1v2.5M7 4l-2 1m0 0l-2-1m2 1v2.5M20 4l-2 1m0 0l-2-1m2 1v2.5" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">3D & CGI Visualization</h3>
            <p className="text-gray-400 mb-6">Photorealistic 3D rendering and cinematic CGI for products, architecture, and marketing environments.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Product Design
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                Architectural Renders
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                CGI Animation
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                VFX & Post-Production
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: 3-6 weeks</div>
          </div>

          {/* Motion Graphics */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-orange-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Motion Graphics & 2D/3D Animation</h3>
            <p className="text-gray-400 mb-6">Engaging motion graphics and custom animations that tell your brand story with fluid, cinematic movement.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                Explainer Videos
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                Logo Animation
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                UI Interaction Motion
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>
                Social Content
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: 2-5 weeks</div>
          </div>

          {/* Brand Identity */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-teal-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Brand Identity & Visual Design</h3>
            <p className="text-gray-400 mb-6">Comprehensive branding solutions including logo design, typography, color palettes, and full brand books.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Logo & Iconography
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Brand Guidelines
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Print & Digital Collateral
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                Typography Systems
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: 2-4 weeks</div>
          </div>

          {/* Digital Ads */}
          <div className="bg-[#09090b] border border-gray-800 p-8 rounded-xl hover:border-cyan-500/50 transition-all">
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.003 9.003 0 0120.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 5.062V11H4.062c.487-2.735 2.57-4.888 5.438-5.938z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.5 13H4.062c.487 2.735 2.57 4.888 5.438 5.938V13z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 13h6.938c-.487 2.735-2.57 4.888-5.438 5.938V13z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-3">Digital Ads & Social Strategy</h3>
            <p className="text-gray-400 mb-6">Strategic design and management of high-conversion ad campaigns across all major digital and social platforms.</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Facebook & IG Ads
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Google Search/Display
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Content Marketing Plan
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                Conversion Optimization
              </li>
            </ul>
            <div className="text-sm text-gray-500">Timeline: Ongoing/Monthly</div>
          </div>
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

      {/* Process */}
      <section
        className="process mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <p className="text-gray-500 text-left">How we work together</p>
        <div className="flex items-center gap-4 mb-5">
          <h2 className="text-left font-syne text-[36px] font-light">Our Process</h2>
        </div>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>
        <div className="flex flex-col md:flex-row gap-8">
          {processPhases.map((phase) => (
            <div key={phase.number} className="services-reveal flex-1">
              <div 
                className="mb-4 inline-flex items-center justify-center w-16 h-16 rounded-2xl text-xl font-bold" 
                style={{ 
                  backgroundColor: `${phase.color}15`,
                  border: `2px solid ${phase.color}40`,
                  color: phase.color 
                }}
              >
                {phase.number}
              </div>
              <h4 className="mb-2 text-xl font-medium">{phase.title}</h4>
              <p className="text-[14px] text-[#cccccc]">{phase.desc}</p>
            </div>
          ))}
        </div>
      </section>

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