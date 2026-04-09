import React, { useEffect, useState } from 'react';
import '../styles/projects.css';

const digitalProjectsData = [
  {
    id: 0,
    title: "Cola Next",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/246967861?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/246967861/Cola-Next"
  },
  {
    id: 1,
    title: "Oreo Brand",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/245108345?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/245108345/Oreo"
  },
  {
    id: 2,
    title: "TUC Brand",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/242080387?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/242080387/TUC"
  },
  {
    id: 3,
    title: "Spotify",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/241789743?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/241789743/Spotify"
  },
  {
    id: 4,
    title: "DREAMTO",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/234347109?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/234347109/DREAMTO"
  },
  {
    id: 5,
    title: "McDonald's",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/233506297?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/233506297/McDonalds"
  },
  {
    id: 6,
    title: "Kingtox",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/219046293?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/219046293/Kingtox"
  },
  {
    id: 7,
    title: "KRONE",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/211855881?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/211855881/KRONE"
  },
  {
    id: 8,
    title: "Engro",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/221028855?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/221028855/Engro"
  },
  {
    id: 9,
    title: "Stay Green",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/234919057?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/234919057/Stay-Green"
  },
  {
    id: 10,
    title: "Quice",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.behance.net/embed/project/160876375?ilo0=1",
    behanceUrl: "https://www.behance.net/gallery/160876375/Quice"
  },
  {
    id: 11,
    title: "National Foods",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7445135386613325824?compact=1",
    behanceUrl: "https://www.linkedin.com/feed/"
  },
  {
    id: 12,
    title: "Tapal Danedar",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7442526485317382144?compact=1",
    behanceUrl: "https://www.linkedin.com/feed/"
  },
  {
    id: 13,
    title: "Motion Design Work",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7437354859609120768?compact=1",
    behanceUrl: "https://www.linkedin.com/feed/"
  },
  {
    id: 14,
    title: "Motion Graphics Showcase",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7434374901203099648?compact=1",
    behanceUrl: "https://www.linkedin.com/feed/"
  },
  {
    id: 15,
    title: "Ferrari Edit",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7421466433840361472?compact=1",
    behanceUrl: "https://www.linkedin.com/feed/"
  },
  {
    id: 16,
    title: "National Mayo",
    category: "Digital Marketing & Animation",
    embedUrl: "https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:7418905604255252480?compact=1",
    behanceUrl: "https://www.linkedin.com/feed/"
  },
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
    (p) => filter === 'all' || p.category.toLowerCase().includes(filter.replace('-', ' ')),
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
          <div className="max-w-[80%] md:max-w-[60%]">
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-10 max-w-[1500px] mx-auto">
          {visibleProjects.map((p, index) => (
            <div
              key={index}
              className="project-reveal group flex flex-col rounded-[10px] border border-white/10 bg-white/5 p-5 shadow-[0_0_20px_rgba(123,97,255,0.06)] transition-all hover:shadow-[0_0_30px_rgba(123,97,255,0.18)] hover:scale-[1.02] hover:border-[#7B61FF]"
            >
              <div className="relative mb-4 overflow-hidden rounded-[10px] bg-black/40 pt-[56.25%] shadow-inner border border-white/5">
                {p.embedUrl ? (
                  <iframe
                    src={p.embedUrl}
                    className="absolute inset-0 h-full w-full border-0"
                    allowFullScreen
                    loading="lazy"
                    scrolling="no"
                    title={p.title}
                    style={{ overflow: 'hidden' }}
                  ></iframe>
                ) : (
                  <img
                    src={p.img}
                    alt={p.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
              </div>

              <h3 className="mb-1 text-[19px] font-medium text-white">
                <span className="text-[#7B61FF] mr-2">•</span> {p.title}
              </h3>

              {p.subtitle && (
                <div className="mb-2 text-[15px] font-bold text-white/70 uppercase tracking-tight">
                  {p.subtitle}
                </div>
              )}

              {p.text && (
                <p className="mb-4 text-[14px] leading-relaxed text-[#cccccc]">
                  {p.text}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between">
                <span className="text-[12px] uppercase tracking-wider text-[#7B61FF] font-semibold">
                  {p.category}
                </span>
                
                {(p.behanceUrl || p.link) && (
                  <a
                    href={p.behanceUrl || p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] font-medium text-white/80 hover:text-[#7B61FF] transition-colors flex items-center gap-1"
                  >
                    View Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                )}
              </div>
            </div>
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
