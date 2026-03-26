import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInChorley from '@/app/component/LocationPages/Chorley/RoofersInChorley/RoofersInChorley';
import RoofersInSandbach from '@/app/component/LocationPages/Sandbach/RoofersInSandbach/RoofersInSandbach';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Roofers Chorley | Localists.com",
  description:
    "Discover reliable Chorley roofers homeowners depend on. Share a few details and get free quotes from experienced local roofers near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/chorley"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Chorley", path: "en/gb/roofers-near-me/chorley" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInChorley />
      </Suspense></>
  )
}

export default page