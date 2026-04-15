import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInNorthWales from '@/app/component/LocationPages/NorthWales/RoofersInNorthWales/RoofersInNorthWales';
import React, { Suspense } from 'react'

export const metadata = {
  title: "Get Trusted Roofers in North Wales | Localists.com",
  description:
    "Are you looking for skilled roofers in North Wales? Click now to get up to 5 free quotes from vetted local roofing professionals near you.",
};

const businessSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Skelly Home Improvements",
    "image": "https://localists.com/admin/storage/app/public/images/users/6915a1efeb6a2_1763025391.jpg",
    "url": "https://www.localists.com/en/gb/roofers-near-me/north-wales",
    "telephone": "01544303020",
    "description": "Roofing and home improvement services in North Wales and nearby areas.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Wales",
      "postalCode": "LL18 1EL",
      "addressCountry": "GB"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "46",
      "bestRating": "5"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Trust style roofing",
    "image": "https://localists.com/admin/storage/app/public/images/users/697c8e1def0c8_1769770525.jpg",
    "url": "https://www.localists.com/en/gb/roofers-near-me/north-wales",
    "telephone": "01544303020",
    "description": "Roofing and home improvement services in North Wales and nearby areas.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Wales",
      "postalCode": "CH2 4NY",
      "addressCountry": "GB"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "5",
      "bestRating": "5"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Flex Roofing & Building",
    "image": "https://localists.com/admin/storage/app/public/images/users/6984d3a66b4cf_1770312614.jpg",
    "url": "https://www.localists.com/en/gb/roofers-near-me/north-wales",
    "telephone": "01544303020",
    "description": "Roofing and home improvement services in North Wales and nearby areas.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Wales",
      "postalCode": "LL11 5UQ",
      "addressCountry": "GB"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "60",
      "bestRating": "5"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "RKJ Roofing & Home Improvement",
    "image": "https://localists.com/admin/storage/app/public/images/users/6989b1102ffea_1770631440.jpg",
    "url": "https://www.localists.com/en/gb/roofers-near-me/north-wales",
    "telephone": "01544303020",
    "description": "Roofing and home improvement services in North wales and nearby areas.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Wales",
      "postalCode": "LL11 6BX",
      "addressCountry": "GB"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "ratingCount": "25",
      "bestRating": "5"
    }
  }
];

function page() {
  return (
    <>
      {/* Schema Scripts */}
      {businessSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SEO
        canonicalPath="/en/gb/roofers-near-me/north-wales"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "North Wales", path: "en/gb/roofers-near-me/north-wales" },
        ]}
        conversion={true}
      />

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoaderIndicator size="large" />
          </div>
        }
      >
        <RoofersInNorthWales />
      </Suspense>
    </>
  );
}

export default page;