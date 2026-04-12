import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';

const posts = [
  {
    slug: 'choose-digital-marketing-agency-pakistan',
    category: 'Digital Marketing',
    categoryColor: '#00F0FF',
    readTime: '6 min read',
    date: 'April 2026',
    title: 'How to Choose a Digital Marketing Agency in Pakistan',
    excerpt:
      'With hundreds of agencies claiming to be the best, here\'s a practical checklist to find a team that actually delivers measurable results.',
  },
  {
    slug: 'signs-business-needs-new-website-2026',
    category: 'Business Growth',
    categoryColor: '#10B981',
    readTime: '4 min read',
    date: 'April 2026',
    title: '5 Signs Your Business Needs a New Website in 2026',
    excerpt:
      'Is your website costing you clients without you realising it? These five warning signs mean it\'s time for a serious upgrade.',
  },
];

export default function Blog() {
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'FrameGen Blog',
    url: 'https://framegen.vercel.app/blog',
    description: 'Expert insights on web development, digital marketing, and online growth from the FrameGen team.',
    publisher: {
      '@type': 'MarketingAgency',
      name: 'FrameGen',
      url: 'https://framegen.vercel.app',
      logo: 'https://framegen.vercel.app/frame_gen.png',
    },
  };

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[1400px] text-white">
      <SEO
        title="Blog — Web Dev, SEO & Marketing Insights"
        description="Expert articles on website development costs, digital marketing strategy, and growth tips for businesses in Pakistan and beyond."
        canonical="https://framegen.vercel.app/blog"
        schema={blogSchema}
      />

      {/* Hero Banner */}
      <section className="relative mb-16 overflow-hidden rounded-[20px] border border-white/5 bg-white/5 px-6 py-16 text-center shadow-[0_0_40px_rgba(123,97,255,0.12)] backdrop-blur-[15px] md:px-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7B61FF]/10 via-transparent to-[#00F0FF]/10 pointer-events-none" />
        <p className="mb-3 text-[14px] uppercase tracking-[0.15em] text-[#7B61FF]">FrameGen Insights</p>
        <h1 className="font-syne text-[40px] font-light leading-[1.1] md:text-[64px]">
          Web, Design &<br />Marketing Blog
        </h1>
        <p className="mx-auto mt-4 max-w-[600px] text-[16px] text-[#aaaaaa]">
          Expert guides on growing your business online — written by the FrameGen team.
        </p>
      </section>

      {/* Blog Posts Grid */}
      <section className="mb-20 grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group flex flex-col rounded-[16px] border border-white/10 bg-white/5 p-6 shadow-[0_0_20px_rgba(123,97,255,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#7B61FF]/50 hover:shadow-[0_0_40px_rgba(123,97,255,0.18)] backdrop-blur-[12px]"
          >
            {/* Category badge */}
            <div className="mb-4 flex items-center justify-between">
              <span
                className="rounded-full px-3 py-1 text-[12px] font-medium"
                style={{ backgroundColor: `${post.categoryColor}20`, color: post.categoryColor, border: `1px solid ${post.categoryColor}40` }}
              >
                {post.category}
              </span>
              <span className="text-[12px] text-[#666]">{post.readTime}</span>
            </div>

            <h2 className="mb-3 font-syne text-[20px] font-semibold leading-[1.3] text-white transition group-hover:text-[#7B61FF]">
              {post.title}
            </h2>
            <p className="mb-6 flex-1 text-[14px] leading-[1.7] text-[#aaaaaa]">{post.excerpt}</p>

            <div className="flex items-center justify-between text-[13px] text-[#666]">
              <span>{post.date}</span>
              <span className="text-[#7B61FF] transition group-hover:translate-x-1">Read more →</span>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="mb-12 rounded-[20px] border border-white/5 bg-white/5 px-6 py-12 text-center shadow-[0_0_40px_rgba(123,97,255,0.08)] backdrop-blur-[12px]">
        <h2 className="mb-3 font-syne text-[28px] font-light">Want a Free Website Consultation?</h2>
        <p className="mb-6 text-[15px] text-[#aaaaaa]">Talk to our team about your project. No commitment required.</p>
        <Link
          to="/contact"
          className="inline-block rounded-md bg-gradient-to-tr from-[#7B61FF] to-[#00F0FF] px-8 py-3 text-[14px] text-white shadow-[0_0_0_rgba(123,97,255,0.28)] transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)]"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
