// app/tree-surgeons-near-me/page.tsx
import SEO from "@/app/component/common/seo/SEO";
import TreeSurgeon from "@/app/component/Nearme/TreeSurgeon/TreeSurgeon";
import { BREADCRUM_DATA_TREESURGEON } from "@/app/component/Nearme/TreeSurgeon/TreeSurgeonData";
// import { Metadata } from "next";

// JSON-LD Component
// function StructuredData() {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localistsbooster.com';
//   const canonicalUrl = `${baseUrl}/en/gb/tree-surgeons-near-me`;

//   const breadcrumbList = [

//     {
//       "@type": "ListItem",
//       "position": 1,
//       "name": "Home & Garden",
//       "item": `${baseUrl}/en/gb/home`
//     },
//     {
//       "@type": "ListItem",
//       "position": 2,
//       "name": "Tree Surgeons",
//       "item": canonicalUrl
//     }
//   ];

//   const jsonLd = {
//     "@context": "https://schema.org",
//     "@type": "BreadcrumbList",
//     "itemListElement": breadcrumbList
//   };

//   return (
//     <script
//       type="application/ld+json"
//       dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//     />
//   );
// }

// Metadata
// export async function generateMetadata() {
//   const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://localistsbooster.com';
//   const canonicalUrl = `${baseUrl}/en/gb/tree-surgeons-near-me`;

//   const bannerImage = "/nearme/treeSurgeon.webp";
//   const fullImageUrl = `${baseUrl}/${bannerImage}`;

//   const description = "Find fully qualified tree surgeons near me. Certified and skilled arborists. Safe tree removal & pruning. Get free quotes from local experts in your area.";
//   const title = "Find Quality Tree Surgeons Near Me | Localists";

//   return {
//     title,
//     description,
//     metadataBase: new URL(baseUrl),
//     robots: "index, follow",

//     alternates: {
//       canonical: canonicalUrl,
//       languages: {
//         'en-gb': canonicalUrl,
//       },
//     },

//     openGraph: {
//       url: canonicalUrl,
//       type: "website",
//       title,
//       description,
//       siteName: "Localists",
//       locale: "en_GB",
//       images: [
//         {
//           url: fullImageUrl,
//           width: 1200,
//           height: 630,
//           alt: "Professional Tree Surgeons Near You - Localists",
//         },
//       ],
//     },

//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [fullImageUrl],
//     },
//   };
// }

export default function Page() {
  return (
    <>
      {/* <StructuredData /> */}
      <SEO
        canonicalPath="/en/gb/tree-surgeon-near-me"
        bannerImage="/nearme/treeSurgeon.webp"
        breadcrumb={[
          { title: "Home & Garden", path: "/home" },  
          { title: "Tree Surgeons", path: "/tree-surgeon-near-me" },
        ]}
        conversion={true}
      />
      <TreeSurgeon />
    </>
  );
}