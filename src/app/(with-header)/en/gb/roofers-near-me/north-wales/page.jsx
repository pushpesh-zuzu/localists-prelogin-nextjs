import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInNorthWales from '@/app/component/LocationPages/NorthWales/RoofersInNorthWales/RoofersInNorthWales';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Get Trusted Roofers in North Wales | Localists.com",
  description:
    "Are you looking for skilled roofers in North Wales? Click now to get up to 5 free quotes from vetted local roofing professionals near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/north-wales"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "North Wales", path: "en/gb/roofers-near-me/north-wales" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInNorthWales/>
      </Suspense></>
  )
}

export default page