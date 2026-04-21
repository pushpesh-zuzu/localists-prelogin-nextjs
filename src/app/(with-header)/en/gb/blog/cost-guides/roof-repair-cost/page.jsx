import BlogFlateRoofLast from '@/app/component/Blog/BlogFlateRoofLast/BlogFlateRoofLast'
import SEO from '@/app/component/common/seo/SEO'
import React, { Suspense } from 'react'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import RoofRepairCost from '@/app/component/Blog/RoofRepairCost/RoofRepairCost';
export const metadata = {
  title: "Detailed Roof Repair Cost for 2026 | Localists",
  description:
    "Discover the full cost of getting a roof repair in the UK in 2026. Get price breakdowns, common repairs, and how to find qualified roofers near you.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/blog/advice/roof-repair-cost"
        bannerImage="/blog/blogRoofRepairCost.webp"
        
        conversion={true} /><Suspense
          fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoadingIndicator size="large" />
          </div>}
        >
        <RoofRepairCost />
      </Suspense></>
  )
}

export default page