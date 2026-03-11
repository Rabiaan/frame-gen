import React, { useEffect, useState } from 'react';
import '../styles/projects.css';

const digitalProjectsData = [
  {
    img: '/images/brandarc.png',
    title: 'Brand and Digital Marketing Agency',
    subtitle: 'Brand Architect',
    text: 'Complete brand identity and digital marketing strategy with custom WordPress development.',
    category: 'DIGITAL MARKETING',
    link: 'https://brandarchitectsconsulting.com/',
  },
  {
    img: '/images/synthesis.png',
    title: '3D Animated Business Portfolio',
    subtitle: 'Synthesis Engineering',
    text: 'Interactive 3D animations and motion graphics for business showcase.',
    category: 'ANIMATION',
    link: 'https://synthesis-eng.vercel.app/index.html',
  },
  // Add more digital marketing and animation projects here as they are completed
];

function DigitalMarketing() {
  const [filter, setFilter] = useState('all');

  // Reveal animations for project cards
  useEffect(() => {
    document.title = "Digital Marketing & Animation Projects — FrameGen";
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

    const elements = document.querySelectorAll('.project-reveal');
    elements.forEach((el) => {
      el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filter]);

  // Load Spline viewer script and remove watermark
  useEffect(() => {
    if (!document.querySelector('script[src*="splinetool"]')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@latest/build/spline-viewer.js';
      document.head.appendChild(script);
    }

    const interval = setInterval(() => {
      const viewer = document.querySelector('spline-viewer');
      if (viewer && viewer.shadowRoot) {
        const selectors = [
          '#logo',
          '.logo',
          'a.logo',
          '.watermark',
          'spline-viewer-watermark',
          'spline-viewer-toolbar',
        ];
        selectors.forEach((sel) => {
          const node = viewer.shadowRoot.querySelector(sel);
          if (node) node.remove();
        });
        viewer.shadowRoot.querySelectorAll('a').forEach((a) => a.remove());
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const visibleProjects = digitalProjectsData.filter(
    (p) => filter === 'all' || p.category.toLowerCase().replace(' ', '-') === filter,
  );

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[1400px] text-white">
      {/* Hero with Spline background */}
      <section
        aria-labelledby="projects-hero-heading"
        className="project-banner relative mb-20 h-[85vh] overflow-hidden rounded-[20px] border border-white/5 px-6 py-24 shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[6px] md:px-20"
      >
        <div className="pointer-events-none absolute inset-0 scale-[1.3]">
          <spline-viewer url="https://prod.spline.design/Q2XQ2o4G0cZzWJy5/scene.splinecode" />
        </div>
        <div className="relative z-10 flex max-w-[1400px] flex-col gap-6 md:flex-row md:items-start md:justify-between">
          
        </div>
        <div className="hero-brand">
          DIGITAL<br />MARKETING
          <br />
          & ANIMATION
        </div>
      </section>

      {/* Projects section */}
      <section
        aria-labelledby="projects-heading"
        className="mb-20 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 text-left shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[15px] md:px-20"
      >
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-[60%] md:max-w-[60%]">
            <h2 className="mb-2 text-[15px] text-[#aaaaaa]">Our Work</h2>
            <h1
              id="projects-heading"
              className="mb-4 font-syne text-[40px] font-light leading-[1.06] md:text-[65px]"
            >
              Creative Digital
              <br />
              Marketing & Animation
            </h1>
            <p className="text-[14px] leading-[1.6] text-[#cccccc]">
              Explore our portfolio of digital marketing campaigns, brand strategies, and animated content.
            </p>
          </div>
        </div>
        {/* Divider */}
        <div className="mb-8 h-[1px] bg-white/20"></div>

        {/* Filter buttons */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {[
            { key: 'all', label: 'All' },
            { key: 'digital-marketing', label: 'Digital Marketing' },
            { key: 'animation', label: 'Animation' },
          ].map((btn) => (
            <button
              key={btn.key}
              type="button"
              onClick={() => setFilter(btn.key)}
              className={`rounded-full border px-5 py-2 text-[14px] transition ${
                filter === btn.key
                  ? 'border-[#7B61FF] bg-[#7B61FF] text-white'
                  : 'border-white/10 bg-white/5 text-white hover:border-[#7B61FF] hover:bg-[#7B61FF]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Projects Grid - Mobile: 1 card | Tablet & Desktop: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 lg:gap-10 max-w-[1500px] mx-auto">
          {visibleProjects.map((p, index) => (
            <a
              key={index}
              href={p.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-reveal block rounded-[10px] border border-white/10 bg-white/5 p-5 shadow-[0_0_20px_rgba(123,97,255,0.06)] transition-all hover:shadow-[0_0_30px_rgba(123,97,255,0.18)] hover:scale-[1.03] hover:border-[#7B61FF]"
            >
              <img
                src={p.img}
                alt={p.title}
                className="mb-4 h-[220px] w-full rounded-[10px] object-cover border border-white/5"
              />

              <h3 className="mb-1 text-[19px] font-medium">
                <span className="text-[#7B61FF] mr-2">•</span> {p.title}
              </h3>

              <div className="mb-2 text-[16px] font-bold text-white/90">{p.subtitle}</div>

              <p className="mb-3 text-[14.5px] leading-relaxed text-[#cccccc]">{p.text}</p>

              <span className="text-[12.5px] uppercase tracking-wider text-[#7B61FF] font-medium">
                {p.category}
              </span>
            </a>
          ))}
        </div>
        
        {visibleProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[18px] text-[#cccccc]">More projects coming soon!</p>
            <p className="text-[14px] text-[#aaaaaa] mt-2">We're constantly working on exciting new digital marketing and animation projects.</p>
          </div>
        )}
      </section>
    </div>
  );
}

export default DigitalMarketing;
