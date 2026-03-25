import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInCaernarfon from '@/app/component/LocationPages/Caernarfon/RoofersInCaernarfon/RoofersInCaernarfon';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Skilled Local Roofers in Caernarfon | Localists.com",
  description:
    "Need a roofer in Caernarfon? Tell us about your roof and receive up to 5 free quotes from skilled professional roofers near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/caernarfon "
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Caernarfon ", path: "en/gb/roofers-near-me/caernarfon " },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInCaernarfon />
      </Suspense></>
  )
}

export default page