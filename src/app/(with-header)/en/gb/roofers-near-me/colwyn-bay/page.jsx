import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInColwynBay from '@/app/component/LocationPages/ColwynBay/RoofersInColwynBay/RoofersInColwynBay';
import RoofersInOrmskirk from '@/app/component/LocationPages/Ormskirk/RoofersInOrmskirk/RoofersInOrmskirk';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find the Best Roofers in Colwyn Bay | Localists.com",
  description:
    "Need reliable roofers in Colwyn Bay? Get free, no-obligation quotes from vetted local roofing specialists. Enter your postcode and compare quotes today.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/colwyn-bay"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Colwyn Bay", path: "en/gb/roofers-near-me/colwyn-bay" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInColwynBay/>
      </Suspense></>
  )
}

export default page