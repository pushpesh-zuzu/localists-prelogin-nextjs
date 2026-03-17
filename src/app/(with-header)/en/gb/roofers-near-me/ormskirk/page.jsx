import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInMold from '@/app/component/LocationPages/Mold/RoofersInMold/RoofersInMold';
import RoofersInOrmskirk from '@/app/component/LocationPages/Ormskirk/RoofersInOrmskirk/RoofersInOrmskirk';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Get Trusted Roofers Ormskirk | Localists.com",
  description:
    "Looking for trusted local roofers in Ormskirk? Get free quotes from vetted and insured professionals in your area. No hassle. No obligation to hire.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/ormskirk"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Ormskirk", path: "en/gb/roofers-near-me/ormskirk" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInOrmskirk/>
      </Suspense></>
  )
}

export default page