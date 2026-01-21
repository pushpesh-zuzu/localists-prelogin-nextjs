"use client"

import Script from "next/script";
import { usePathname } from "next/navigation";

// const BASE_URL = "https://www.localists.com";

const BASE_URL = "https://localistsbooster.com/en/gb";


export default function SEO({
  breadcrumb = [],
  bannerImage,
  conversion = false,
}) {
  const pathname = usePathname();
  const canonicalUrl = `${BASE_URL}/${pathname}`;

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
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Image (optional) */}
      {bannerImage && (
        <meta
          property="og:image"
          content={`${BASE_URL}${bannerImage.src ?? bannerImage}`}
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
