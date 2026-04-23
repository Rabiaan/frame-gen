import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import { blogPosts } from '../data/blogPosts.js';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: { '@type': 'Organization', name: 'FrameGen', url: 'https://framegen.vercel.app' },
    publisher: {
      '@type': 'Organization',
      name: 'FrameGen',
      logo: { '@type': 'ImageObject', url: 'https://framegen.vercel.app/frame_gen.png' },
    },
    datePublished: '2026-04-12', // Simplified for dynamic
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://framegen.vercel.app/blog/${post.slug}` },
  };

  return (
    <div className="relative z-10 mx-auto mt-[150px] w-[calc(100%-40px)] max-w-[900px] text-white pb-20">
      <SEO
        title={post.title}
        description={post.description}
        canonical={`https://framegen.vercel.app/blog/${post.slug}`}
        schema={articleSchema}
      />

      <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-[14px] text-[#7B61FF] hover:underline">
        ← Back to Blog
      </Link>

      <header className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span 
            className="rounded-full border px-3 py-1 text-[12px]"
            style={{ 
                backgroundColor: `${post.categoryColor}10`, 
                borderColor: `${post.categoryColor}40`,
                color: post.categoryColor 
            }}
          >
            {post.category}
          </span>
          <span className="text-[13px] text-[#666]">{post.readTime} · {post.date}</span>
        </div>
        <h1 className="mb-4 font-syne text-[32px] font-light leading-[1.2] md:text-[48px]">
          {post.title}
        </h1>
      </header>

      <div className="space-y-12 text-[16px] leading-[1.8] text-[#cccccc]">
        {post.content.map((block, idx) => {
          if (block.type === 'intro') {
            return (
              <p key={idx} className="text-[18px] leading-[1.7] text-[#aaaaaa]">
                {block.text}
              </p>
            );
          }

          if (block.type === 'section') {
            return (
              <section key={idx} className="backdrop-blur-[12px] bg-white/5 border border-white/10 rounded-[20px] p-6 md:p-8">
                <h2 className="mb-6 font-syne text-[26px] text-white">{block.title}</h2>
                <div className="space-y-4">
                  {block.items.map((item, i) => (
                    <div key={i} className="flex gap-4 rounded-[14px] border border-white/10 bg-white/5 p-5">
                      <span className="flex-shrink-0 text-[18px] font-bold text-[#7B61FF]">{i + 1}.</span>
                      <div>
                        <h3 className="mb-1 text-[17px] font-semibold text-white">{item.title}</h3>
                        <p className="text-[15px] text-[#aaaaaa]">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (block.type === 'alert') {
            return (
              <section 
                key={idx} 
                className={`rounded-[16px] border p-6 md:p-8 backdrop-blur-[12px] ${
                    block.variant === 'red' ? 'border-[#EF4444]/20 bg-[#EF4444]/5' : 'border-white/10 bg-white/5'
                }`}
              >
                <h2 className="mb-5 font-syne text-[24px] text-white">{block.title}</h2>
                <div className="grid gap-3 md:grid-cols-2">
                  {block.items.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-[10px] border border-white/10 bg-black/30 p-4">
                      <span className={block.variant === 'red' ? 'text-[#EF4444]' : 'text-[#7B61FF]'}>
                          {block.variant === 'red' ? '✗' : '✓'}
                      </span>
                      <span className="text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          if (block.type === 'list') {
            return (
              <section key={idx} className="rounded-[16px] border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-[12px]">
                <h2 className="mb-5 font-syne text-[24px] text-white">{block.title}</h2>
                <div className="space-y-4">
                  {block.items.map((q, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-[10px] border border-[#7B61FF]/20 bg-[#7B61FF]/5 p-4">
                      <span className="flex-shrink-0 font-bold text-[#7B61FF]">Q{i + 1}.</span>
                      <span className="text-[15px]">{q}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          }

          return null;
        })}

        {/* Dynamic CTA */}
        <section className="rounded-[20px] border border-[#7B61FF]/30 bg-[#7B61FF]/5 p-8 text-center backdrop-blur-[12px]">
          <h2 className="mb-3 font-syne text-[26px]">Ready to grow your business?</h2>
          <p className="mb-6 text-[15px] text-[#aaaaaa]">Our team helps businesses implement these strategies with data-driven planning tailored to your goals.</p>
          <Link
            to="/contact"
            className="inline-block rounded-md bg-gradient-to-tr from-[#7B61FF] to-[#00F0FF] px-8 py-3 text-[14px] text-white transition hover:-translate-y-[2px] hover:shadow-[0_0_20px_rgba(123,97,255,0.28)]"
          >
            Get a Free Consultation →
          </Link>
        </section>
      </div>
    </div>
  );
}
