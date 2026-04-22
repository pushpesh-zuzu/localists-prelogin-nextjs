import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInWrexham from "@/app/component/LocationPages/Wrexham/RoofersInWrexham/RoofersInWrexham";
import React, { Suspense } from "react";

export const metadata = {
  title: "26 Roofers Wrexham | Find vetted roofers at Localists.com",
  description:
    "Searching for Roofers near you in Wrexham? Click now to get matched with vetted local roofers. Get up to 5 free quotes to your inbox in minutes.",
};

const businessSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Flex Roofing & Building",
    image:
      "https://localists.com/admin/storage/app/public/images/users/6984d3a66b4cf_1770312614.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "LL11 5UQ",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "60",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Flex Roofing",
    image:
      "https://localists.com/admin/storage/app/public/images/users/699717815308b_1771509633.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "EH1 1BB",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "0",
      ratingCount: "0",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Skelly Home Improvements",
    image:
      "https://localists.com/admin/storage/app/public/images/users/6915a1efeb6a2_1763025391.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "LL18 1EL",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "46",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Trust style roofing",
    image:
      "https://localists.com/admin/storage/app/public/images/users/697c8e1def0c8_1769770525.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "CH2 4NY",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "5",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Master Roofing and Building",
    image:
      "https://localists.com/admin/storage/app/public/images/users/6973b2b2371b2_1769190066.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "LL14 5BG",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "0",
      ratingCount: "0",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Visionary Building and Roofing Contractors Ltd",
    image:
      "https://localists.com/admin/storage/app/public/images/users/6970df292f35c_1769004841.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "LL13 9RE",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "6",
      bestRating: "5",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RKJ Roofing & Home Improvement",
    image:
      "https://localists.com/admin/storage/app/public/images/users/6989b1102ffea_1770631440.jpg",
    url: "https://www.localists.com/en/gb/roofers-near-me/wrexham",
    telephone: "01544303020",
    description:
      "Roofing and home improvement services in Wrexham and nearby areas.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wrexham",
      postalCode: "LL11 6BX",
      addressCountry: "GB",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      ratingCount: "25",
      bestRating: "5",
    },
  },
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
        canonicalPath="/en/gb/roofers-near-me/wrexham"
        bannerImage="/nearme/Roofing/wrexhamBanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Wrexham", path: "en/gb/roofers-near-me/wrexham" },
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
        <RoofersInWrexham />
      </Suspense>
    </>
  );
}

export default page;
