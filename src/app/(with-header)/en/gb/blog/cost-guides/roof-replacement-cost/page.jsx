import SEO from '@/app/component/common/seo/SEO'
import React, { Suspense } from 'react'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import RoofReplacementCost from '@/app/component/Blog/CostGuide/RoofReplacementCost/RoofReplacementCost';
export const metadata = {
  title: "Roof Replacement Cost 2026 | Localists.com",
  description:
    "Wondering how much it costs to get a full roof replacement in 2026? Click now to get the full breakdown on material, labour, and full replacement costs.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/blog/cost-guides/roof-replacement-cost"
        bannerImage="/blog/roofReplacement/banner.webp"
        conversion={true} /><Suspense
          fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoadingIndicator size="large" />
          </div>}
        >
        <RoofReplacementCost />
      </Suspense></>
  )
}

export default page