"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

// 👉 Change this automatically later for prod if needed
const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://dev2.localistsbooster.com";


export default function SEO({
  breadcrumb = [],
  bannerImage,
  conversion,
  canonicalPath, // 👈 allow manual canonical control
}) {
  const pathname = usePathname();

  // Use passed canonicalPath or fallback to current pathname
  const finalPath = canonicalPath || pathname;

  // Remove trailing slash (SEO best practice)
  const normalizedPath =
    finalPath !== "/" ? finalPath.replace(/\/$/, "") : finalPath;

  const canonicalUrl = `${BASE_URL}${normalizedPath}`;

  // Breadcrumb schema
  const breadcrumbList =
    breadcrumb?.length > 0
      ? breadcrumb.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        item: `${BASE_URL}${item.path}`,
      }))
      : [];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };

  return (
    <>
      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph URL */}
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />

      {/* Open Graph Image */}
      {bannerImage && (
        <meta
          property="og:image"
          content={`${BASE_URL}${bannerImage?.src ?? bannerImage}`}
        />
      )}

      {/* Breadcrumb JSON-LD */}
      {breadcrumbList.length > 0 && (
        <Script
          id="breadcrumb-jsonld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd),
          }}
        />
      )}

      {/* Google Ads Conversion */}
      {conversion && (
        <Script id="gtag-conversion" strategy="afterInteractive">
          {`
            gtag('event', 'conversion', {
              'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
              'value': 1.0,
              'currency': 'GBP'
            });
          `}
        </Script>
      )}
    </>
  );
}
