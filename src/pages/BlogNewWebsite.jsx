import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function BlogNewWebsite() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '5 Signs Your Business Needs a New Website in 2026',
    description:
      'Is your current website holding your business back? These 5 clear warning signs mean it\'s time to invest in a modern, high-performance website.',
    author: { '@type': 'Organization', name: 'FrameGen', url: 'https://framegen.vercel.app' },
    publisher: {
      '@type': 'Organization',
      name: 'FrameGen',
      logo: { '@type': 'ImageObject', url: 'https://framegen.vercel.app/frame_gen.png' },
    },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://framegen.vercel.app/blog/signs-business-needs-new-website-2026' },
  };

  const signs = [
    {
      number: '01',
      color: '#7B61FF',
      title: 'It Takes More Than 3 Seconds to Load',
      desc: 'Speed is not a nice-to-have anymore — it directly affects your Google rankings and how many visitors stay on your site. Studies show that 53% of mobile users abandon a page that takes longer than 3 seconds to load. If your website fails Google PageSpeed Insights, you\'re losing customers every single day.',
      stat: '53% of users leave if a page takes >3 seconds to load',
    },
    {
      number: '02',
      color: '#00F0FF',
      title: 'It Looks Broken on Mobile',
      desc: 'Over 60% of web traffic in Pakistan now comes from mobile devices. If your website isn\'t fully responsive — meaning it adapts cleanly to any screen size — you\'re giving a terrible first impression to the majority of your visitors. This alone is enough reason to rebuild.',
      stat: '60%+ of Pakistani web traffic is mobile',
    },
    {
      number: '03',
      color: '#10B981',
      title: 'You\'re Not Ranking on Google',
      desc: 'A website that search engines can\'t properly crawl and index is invisible online. Old sites built without SEO fundamentals — proper heading structure, meta tags, schema markup, fast loading, and internal linking — simply won\'t rank. If you can\'t find your own business on Google, neither can your potential clients.',
      stat: '75% of users never scroll past the first page of Google',
    },
    {
      number: '04',
      color: '#F59E0B',
      title: 'Your Design Looks Like It\'s From 2015',
      desc: 'A dated website signals to potential clients that your business may not be keeping up with the times. In competitive markets, first impressions happen in milliseconds. Modern businesses need clean, premium-feeling websites that immediately communicate trust and professionalism.',
      stat: 'Users form an opinion about a website in 0.05 seconds',
    },
    {
      number: '05',
      color: '#EC4899',
      title: 'Visitors Leave Without Taking Action',
      desc: 'If people are visiting your website but not calling you, filling in a form, or making a purchase, you have a conversion problem. This is usually a mix of unclear calls-to-action, poor structure, confusing navigation, and content that doesn\'t address customer pain points. A redesign focused on conversion can dramatically change your results.',
      stat: 'Proper CTA placement can increase conversions by 300%+',
    },
  ];

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[900px] text-white">
      <SEO
        title="5 Signs Your Business Needs a New Website in 2026"
        description="Is your website costing you clients? Discover the 5 clear warning signs that indicate it's time for a new, modern website in 2026 — and what to do about it."
        canonical="https://framegen.vercel.app/blog/signs-business-needs-new-website-2026"
        schema={articleSchema}
      />

      <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-[14px] text-[#7B61FF] hover:underline">
        ← Back to Blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#10B981]/40 bg-[#10B981]/10 px-3 py-1 text-[12px] text-[#10B981]">Business Growth</span>
          <span className="text-[13px] text-[#666]">4 min read · April 2026</span>
        </div>
        <h1 className="mb-4 font-syne text-[32px] font-light leading-[1.2] md:text-[48px]">
          5 Signs Your Business Needs a New Website in 2026
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#aaaaaa]">
          Your website is your most important salesperson — it works 24/7, represents your brand to every potential client, and either builds trust or destroys it in seconds. Here are the five warning signs that yours is working against you.
        </p>
      </header>

      <div className="space-y-8 text-[16px] leading-[1.8] text-[#cccccc]">

        {/* Signs */}
        {signs.map((sign) => (
          <section
            key={sign.number}
            className="rounded-[20px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-[12px]"
            style={{ borderLeftColor: sign.color, borderLeftWidth: '3px' }}
          >
            <div className="mb-4 flex items-start gap-4">
              <span
                className="flex-shrink-0 rounded-xl px-3 py-1 font-mono text-[13px] font-bold"
                style={{ backgroundColor: `${sign.color}20`, color: sign.color }}
              >
                {sign.number}
              </span>
              <h2 className="font-syne text-[22px] font-semibold text-white leading-[1.3]">{sign.title}</h2>
            </div>
            <p className="mb-4">{sign.desc}</p>
            <div
              className="inline-block rounded-lg px-4 py-2 text-[13px] font-medium"
              style={{ backgroundColor: `${sign.color}15`, color: sign.color, border: `1px solid ${sign.color}30` }}
            >
              📊 {sign.stat}
            </div>
          </section>
        ))}

        {/* What to Do Next */}
        <section className="rounded-[16px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-[12px]">
          <h2 className="mb-4 font-syne text-[24px] text-white">What Should You Do Next?</h2>
          <p className="mb-4">
            If you recognize even 2 of these signs, it's time to act. A properly built website is not an expense — it's an investment that generates leads while you sleep.
          </p>
          <p>
            At FrameGen, we build high-performance websites that are fast, mobile-first, SEO-optimized, and designed to convert visitors into clients. Every project comes with proper Google Analytics setup, sitemap submission, and on-page SEO as standard.
          </p>
        </section>

        {/* CTA */}
        <section className="rounded-[20px] border border-[#7B61FF]/30 bg-[#7B61FF]/5 p-8 text-center backdrop-blur-[12px]">
          <h2 className="mb-3 font-syne text-[26px]">Ready for a Website That Actually Works?</h2>
          <p className="mb-6 text-[15px] text-[#aaaaaa]">Get a free review of your current website and a transparent quote for a rebuild. No commitment.</p>
          <Link
            to="/contact"
            className="inline-block rounded-md bg-gradient-to-tr from-[#7B61FF] to-[#00F0FF] px-8 py-3 text-[14px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)]"
          >
            Get a Free Website Audit →
          </Link>
        </section>
      </div>
    </div>
  );
}
