import { Helmet } from 'react-helmet-async';

/**
 * SEO — drop this at the top of any page component.
 *
 * Props:
 *  title        — page <title> (append " | FrameGen" automatically)
 *  description  — meta description (160 chars max)
 *  canonical    — full canonical URL for this page
 *  ogImage      — OG image URL (defaults to agency logo)
 *  schema       — optional JSON-LD object or array of objects
 *  noIndex      — set true to add noindex (e.g. for /blog drafts)
 */
export default function SEO({
  title,
  description,
  canonical,
  ogImage = 'https://framegen.vercel.app/frame_gen.png',
  schema,
  noIndex = false,
}) {
  const fullTitle = title
    ? `${title} | FrameGen`
    : 'FrameGen — Digital Agency | Web, 3D & Brand Design';

  const schemaArray = schema
    ? Array.isArray(schema)
      ? schema
      : [schema]
    : [];

  return (
    <Helmet>
      {/* Core */}
      <title>{fullTitle}</title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      {description && <meta property="og:description" content={description} />}
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      {schemaArray.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}
