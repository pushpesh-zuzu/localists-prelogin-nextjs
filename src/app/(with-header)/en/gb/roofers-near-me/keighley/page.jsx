import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInKeighley from '@/app/component/LocationPages/Keighley/RoofersInKeighley/RoofersInKeighley';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Reliable Roofers Keighley | Localists.com",
  description:
    "Looking for Roofers in Keighley? Enter your postcode and receive free quotes from local roofing professionals working in your area.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/keighley"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Keighley", path: "en/gb/roofers-near-me/keighley" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInKeighley/>
      </Suspense></>
  )
}

export default page