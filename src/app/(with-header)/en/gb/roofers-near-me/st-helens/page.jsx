import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInStHelens from '@/app/component/LocationPages/StHelens/RoofersInStHelens';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Reliable Roofers St Helens | Localists.com",
  description:
    "Looking for Roofers St Helens? Enter your postcode and receive free quotes from local roofing professionals working near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/st-helens"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "St Helens", path: "en/gb/roofers-near-me/st-helens" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInStHelens />
      </Suspense></>
  )
}

export default page