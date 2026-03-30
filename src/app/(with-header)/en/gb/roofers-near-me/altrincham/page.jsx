import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInAltrincham from '@/app/component/LocationPages/Altrincham/RoofersInAltrincham/RoofersInAltrincham';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Reliable Roofers Altrincham | Localists",
  description:
    "Need roofers Altrincham residents use? Enter your postcode and receive free quotes from local roofing professionals near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/altrincham"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Altrincham", path: "en/gb/roofers-near-me/altrincham" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInAltrincham />
      </Suspense></>
  )
}

export default page