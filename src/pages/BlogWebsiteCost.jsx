import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

export default function BlogWebsiteCost() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How Much Does Website Development Cost in Pakistan?',
    description:
      'A complete breakdown of website development costs in Pakistan — from simple WordPress sites to custom React applications and e-commerce platforms.',
    author: { '@type': 'Organization', name: 'FrameGen', url: 'https://framegen.vercel.app' },
    publisher: {
      '@type': 'Organization',
      name: 'FrameGen',
      logo: { '@type': 'ImageObject', url: 'https://framegen.vercel.app/frame_gen.png' },
    },
    datePublished: '2026-04-12',
    dateModified: '2026-04-12',
    mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://framegen.vercel.app/blog/website-development-cost-pakistan' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much does a website cost in Pakistan?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Website development costs in Pakistan range from PKR 25,000 for a basic WordPress site to PKR 500,000+ for a custom React or e-commerce solution. Pricing depends on complexity, features, and agency experience.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is a PKR 10,000 website worth it?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Very cheap websites often use low-quality templates, have no SEO optimization, and lack post-launch support. Investing in a properly built site pays off through better rankings and more leads.',
        },
      },
    ],
  };

  const pricingTiers = [
    {
      type: 'Basic Business Website',
      tech: 'WordPress / HTML',
      range: 'PKR 25,000 – 80,000',
      color: '#3B82F6',
      includes: ['5–8 pages', 'Mobile responsive', 'Contact form', 'Basic SEO setup'],
    },
    {
      type: 'Professional Business Site',
      tech: 'WordPress / React',
      range: 'PKR 80,000 – 200,000',
      color: '#7B61FF',
      includes: ['Custom design', 'CMS integration', 'Advanced SEO', 'Performance optimized', 'Blog/news section'],
    },
    {
      type: 'E-commerce Store',
      tech: 'WooCommerce / Shopify',
      range: 'PKR 120,000 – 350,000',
      color: '#10B981',
      includes: ['Product catalog', 'Payment gateway', 'Inventory management', 'Order tracking', 'Discount system'],
    },
    {
      type: 'Custom Web Application',
      tech: 'React / Next.js',
      range: 'PKR 300,000 – 1,000,000+',
      color: '#F59E0B',
      includes: ['Custom functionality', 'User authentication', 'Database integration', 'API development', 'Ongoing support'],
    },
  ];

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[900px] text-white">
      <SEO
        title="Website Development Cost in Pakistan 2026 — Full Breakdown"
        description="How much does a website cost in Pakistan? Get real pricing for WordPress sites, e-commerce stores, and React web apps in 2026. No fluff, just honest numbers."
        canonical="https://framegen.vercel.app/blog/website-development-cost-pakistan"
        schema={[articleSchema, faqSchema]}
      />

      {/* Back link */}
      <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-[14px] text-[#7B61FF] hover:underline">
        ← Back to Blog
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-[#7B61FF]/40 bg-[#7B61FF]/10 px-3 py-1 text-[12px] text-[#7B61FF]">Web Development</span>
          <span className="text-[13px] text-[#666]">5 min read · April 2026</span>
        </div>
        <h1 className="mb-4 font-syne text-[32px] font-light leading-[1.2] md:text-[48px]">
          How Much Does Website Development Cost in Pakistan?
        </h1>
        <p className="text-[17px] leading-[1.7] text-[#aaaaaa]">
          One of the most common questions we get from business owners is: <em>"What will my website actually cost?"</em> The honest answer is — it depends. But here's a clear breakdown so you can budget properly.
        </p>
      </header>

      <div className="prose-content space-y-8 text-[16px] leading-[1.8] text-[#cccccc]">

        {/* Section 1 */}
        <section className="rounded-[16px] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="mb-4 font-syne text-[24px] text-white">Why Prices Vary So Much</h2>
          <p>
            Pakistan's web development market has a massive price spread — from self-taught freelancers charging PKR 10,000 to established agencies billing PKR 500,000+ for the same type of project. The difference usually comes down to three things:
          </p>
          <ul className="mt-4 space-y-2">
            {['Experience and portfolio quality', 'Custom design vs. pre-built templates', 'Post-launch support and SEO optimization'].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1 text-[#7B61FF]">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pricing Table */}
        <section>
          <h2 className="mb-6 font-syne text-[24px] text-white">Pakistan Website Cost Breakdown (2026)</h2>
          <div className="grid gap-5 md:grid-cols-2">
            {pricingTiers.map((tier) => (
              <div
                key={tier.type}
                className="rounded-[16px] border border-white/10 bg-white/5 p-6 transition hover:border-[#7B61FF]/40"
                style={{ borderTopColor: tier.color, borderTopWidth: '2px' }}
              >
                <h3 className="mb-1 text-[18px] font-semibold text-white">{tier.type}</h3>
                <p className="mb-3 text-[13px] text-[#666]">{tier.tech}</p>
                <p className="mb-4 text-[20px] font-bold" style={{ color: tier.color }}>{tier.range}</p>
                <ul className="space-y-1">
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[14px]">
                      <span style={{ color: tier.color }}>✓</span>
                      <span className="text-[#cccccc]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2 */}
        <section className="rounded-[16px] border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="mb-4 font-syne text-[24px] text-white">Hidden Costs to Watch Out For</h2>
          <p className="mb-4">Many agencies quote low upfront, then charge extra for things you'd naturally expect to be included. Always ask about:</p>
          <ul className="space-y-3">
            {[
              { item: 'Domain name', note: 'PKR 1,500–3,000/year — buy this yourself' },
              { item: 'Hosting', note: 'PKR 5,000–30,000/year depending on traffic' },
              { item: 'SSL certificate', note: 'Should be free (Let\'s Encrypt) or included' },
              { item: 'Post-launch changes', note: 'Ask if a revision period is included' },
              { item: 'SEO setup', note: 'Meta tags, sitemap, and Google Search Console should be standard' },
            ].map(({ item, note }) => (
              <li key={item} className="flex flex-col gap-1 rounded-[10px] border border-white/10 bg-black/30 p-4">
                <span className="font-medium text-white">{item}</span>
                <span className="text-[14px] text-[#999]">{note}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="mb-6 font-syne text-[24px] text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="rounded-[12px] border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 text-[17px] font-semibold text-white">Is a PKR 10,000 website worth it?</h3>
              <p className="text-[15px] text-[#aaaaaa]">Usually not for business use. At that price you're getting a template with no customization, no SEO, and no support. It may look OK initially, but it will hold your business back in search rankings and professional credibility.</p>
            </div>
            <div className="rounded-[12px] border border-white/10 bg-white/5 p-5">
              <h3 className="mb-2 text-[17px] font-semibold text-white">What's the best website platform in Pakistan?</h3>
              <p className="text-[15px] text-[#aaaaaa]">WordPress is ideal for most businesses — it's flexible, well-supported, and SEO-friendly. Shopify or WooCommerce works best for e-commerce. React/Next.js is the choice for high-performance web applications with custom requirements.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-[20px] border border-[#7B61FF]/30 bg-[#7B61FF]/5 p-8 text-center">
          <h2 className="mb-3 font-syne text-[26px]">Want a Custom Quote?</h2>
          <p className="mb-6 text-[15px] text-[#aaaaaa]">Tell us about your project and we'll give you a transparent, itemized quote — no hidden fees.</p>
          <Link
            to="/contact"
            className="inline-block rounded-md bg-gradient-to-tr from-[#7B61FF] to-[#00F0FF] px-8 py-3 text-[14px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)]"
          >
            Get a Free Quote →
          </Link>
        </section>
      </div>
    </div>
  );
}
