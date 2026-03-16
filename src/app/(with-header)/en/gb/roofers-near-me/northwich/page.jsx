import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInNorthwich from '@/app/component/LocationPages/Northwich/RoofersInNorthwich/RoofersInNorthwich';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Trusted Roofers Northwich | Localists.com",
  description:
    "Trying to find a reliable roofer in Northwich? Compare free quotes from trusted local roofing professionals near you now. All fully vetted.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/northwich"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Northwich", path: "en/gb/roofers-near-me/northwich" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInNorthwich />
      </Suspense></>
  )
}

export default page