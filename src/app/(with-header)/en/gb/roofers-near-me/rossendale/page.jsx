import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInRossendale from '@/app/component/LocationPages/Rossendale/RoofersInRossendale/RoofersInRossendale';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Trusted Roofers Rossendale | Localists.com",
  description:
    "Are you looking to hire reliable roofers in Rossendale? Compare free quotes from vetted local roofing professionals today. No hassle. No pressure.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/rossendale"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Rossendale", path: "en/gb/roofers-near-me/rossendale" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInRossendale />
      </Suspense></>
  )
}

export default page