import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInLlandudno from '@/app/component/LocationPages/Llandudno/RoofersInLlandudno/RoofersInLlandudno';
import React, { Suspense } from 'react'
export const metadata = {
  title: " Find Reliable Roofers in Llandudno | Localists.com",
  description:
    "Got a roofing emergency and need skilled roofers in Llandudno? Get 5 free quotes from professional roofers near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/llandudno"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Llandudno", path: "en/gb/roofers-near-me/llandudno" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInLlandudno/>
      </Suspense></>
  )
}

export default page