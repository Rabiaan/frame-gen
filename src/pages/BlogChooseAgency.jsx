import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function BlogChooseAgency() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How to Choose a Digital Marketing Agency in Pakistan',
    description:
      'A practical checklist for choosing the right digital marketing agency in Pakistan — questions to ask, red flags to avoid, and green flags that prove competence.',
    author: { '@type': 'Organization', name: 'FrameGen', url: 'https://framegen.vercel.app' },
    publisher: {
      '@type': 'Organization',
      name: 'FrameGen',
      logo: { '@type': 'ImageObject', url: 'https://framegen.vercel.app/frame_gen.png' },
    },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://framegen.vercel.app/blog/choose-digital-marketing-agency-pakistan' },
  };

  const greenFlags = [
    { title: 'They show you real case studies', desc: 'Not vague testimonials — actual numbers, like "We grew client X from 2,000 to 15,000 monthly visitors in 6 months."' },
    { title: 'They ask about your business first', desc: 'A good agency understands your audience and goals before pitching a solution.' },
    { title: 'They explain their process clearly', desc: 'You should understand exactly what they\'ll do each month and how results will be measured.' },
    { title: 'They have a verifiable portfolio', desc: 'Real websites, real clients, real results — not just stock mockups and made-up logos.' },
    { title: 'They set realistic expectations', desc: 'SEO takes 3–6 months minimum. Anyone promising page-1 Google rankings in 2 weeks is lying.' },
  ];

  const redFlags = [
    'Guaranteed #1 Google ranking promises',
    'No contract or vague deliverables',
    'Zero social proof or client references',
    '"Secret" strategies they can\'t explain',
    'Extremely low prices with big promises',
    'No reporting or performance tracking',
  ];

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[900px] text-white">
      <SEO
        title="How to Choose a Digital Marketing Agency in Pakistan"
        description="A step-by-step checklist for finding a trustworthy digital marketing agency in Pakistan. Learn the green flags, red flags, and key questions to ask."
        canonical="https://framegen.vercel.app/blog/choose-digital-marketing-agency-pakistan"
        schema={articleSchema}
      />

      <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-[14px] text-[#7B61FF] hover:underline">
        ← Back to Blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 px-3 py-1 text-[12px] text-[#00F0FF]">Digital Marketing</span>
          <span className="text-[13px] text-[#666]">6 min read · April 2026</span>
        </div>
        <h1 className="mb-4 font-syne text-[32px] font-light leading-[1.2] md:text-[48px]">
          How to Choose a Digital Marketing Agency in Pakistan
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#aaaaaa]">
          Pakistan's digital marketing industry has exploded over the last 5 years. That's great — but it also means there are a lot of agencies making big promises they can't keep. Here's how to tell the difference.
        </p>
      </header>

      <div className="space-y-8 text-[16px] leading-[1.8] text-[#cccccc]">

        {/* Green Flags */}
        <section>
          <h2 className="mb-6 font-syne text-[26px] text-white">✅ Green Flags — Signs of a Trustworthy Agency</h2>
          <div className="space-y-4">
            {greenFlags.map((flag, i) => (
              <div key={i} className="flex gap-4 rounded-[14px] border border-[#10B981]/20 bg-[#10B981]/5 p-5">
                <span className="flex-shrink-0 text-[20px] text-[#10B981]">{i + 1}.</span>
                <div>
                  <h3 className="mb-1 text-[17px] font-semibold text-white">{flag.title}</h3>
                  <p className="text-[15px] text-[#aaaaaa]">{flag.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Red Flags */}
        <section className="rounded-[16px] border border-[#EF4444]/20 bg-[#EF4444]/5 p-6 md:p-8">
          <h2 className="mb-5 font-syne text-[24px] text-white">🚩 Red Flags — Walk Away</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {redFlags.map((flag) => (
              <div key={flag} className="flex items-start gap-3 rounded-[10px] border border-[#EF4444]/20 bg-black/30 p-4">
                <span className="text-[#EF4444]">✗</span>
                <span className="text-[15px]">{flag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="rounded-[16px] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="mb-5 font-syne text-[24px] text-white">Questions to Ask Before Signing</h2>
          <div className="space-y-4">
            {[
              'Can you share a case study from a client in my industry?',
              'What KPIs will you track and report monthly?',
              'What happens to my accounts/assets if we stop working together?',
              'What\'s your process for the first 90 days?',
              'Do you outsource any work — and if so, to whom?',
            ].map((q, i) => (
              <div key={i} className="flex items-start gap-3 rounded-[10px] border border-[#7B61FF]/20 bg-[#7B61FF]/5 p-4">
                <span className="flex-shrink-0 font-bold text-[#7B61FF]">Q{i + 1}.</span>
                <span className="text-[15px]">{q}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Service Types */}
        <section className="rounded-[16px] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="mb-4 font-syne text-[24px] text-white">The Main Services to Look For</h2>
          <p className="mb-5">A full-service digital marketing agency should ideally cover all of these areas or partner with specialists:</p>
          <div className="grid gap-3 md:grid-cols-2">
            {['SEO (Search Engine Optimization)', 'Google Ads / PPC', 'Social Media Marketing (Meta, TikTok)', 'Content Marketing & Blogging', 'Email Marketing', 'Website Conversion Optimization'].map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-[10px] border border-white/10 bg-black/20 px-4 py-3">
                <span className="text-[#00F0FF]">→</span>
                <span className="text-[15px]">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[20px] border border-[#7B61FF]/30 bg-[#7B61FF]/5 p-8 text-center">
          <h2 className="mb-3 font-syne text-[26px]">Think FrameGen Might Be a Fit?</h2>
          <p className="mb-6 text-[15px] text-[#aaaaaa]">We're happy to answer all these questions and show you real results from past clients. No pressure — just a conversation.</p>
          <Link
            to="/contact"
            className="inline-block rounded-md bg-gradient-to-tr from-[#7B61FF] to-[#00F0FF] px-8 py-3 text-[14px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)]"
          >
            Talk to Our Team →
          </Link>
        </section>
      </div>
    </div>
  );
}
