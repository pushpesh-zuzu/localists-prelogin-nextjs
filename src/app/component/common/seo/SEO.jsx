"use client"

import { usePathname } from "next/navigation";

const BASE_URL =
  process.env.NEXT_PUBLIC_CANNONICAL_SITE_URL || "https://localists.com/";

export default function SEO({
  breadcrumb = [],
  bannerImage,
  conversion,
  canonicalPath,
}) {
  const pathname = usePathname();

  const finalPath = pathname;
  const normalizedPath =
    finalPath !== "/" ? finalPath.replace(/\/$/, "") : finalPath;

  const canonicalUrl = `${BASE_URL.replace(/\/$/, "")}${normalizedPath}`;

  const breadcrumbList = breadcrumb.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.title,
    item: `${BASE_URL}${item.path}`,
  }));

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return (
    <>
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {bannerImage && (
        <meta
          property="og:image"
          content={`${BASE_URL}${bannerImage?.src ?? bannerImage}`}
        />
      )}

      {/* ✅ VISIBLE breadcrumb HTML */}
      {breadcrumb.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="hidden">
            {breadcrumb.map((item, index) => (
              <li key={index}>
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {/* ✅ JSON-LD rendered in HTML */}
      {breadcrumb.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      )}

      {/* Conversion (can stay client-side) */}
      {conversion && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              gtag('event', 'conversion', {
                'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
                'value': 1.0,
                'currency': 'GBP'
              });
            `,
          }}
        />
      )}
    </>
  );
}
