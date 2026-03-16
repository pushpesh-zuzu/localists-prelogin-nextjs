import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInRuncorn from '@/app/component/LocationPages/Runcorn/RoofersInRuncorn/RoofersInRuncorn';
import React, { Suspense } from 'react'
export const metadata = {
  title: " Find Vetted Roofers Runcorn | Localists.com",
  description:
    " Need qualified roofing professionals in Runcorn. Got a roofing emergency? Receive 5 free quotes from experienced and skilled roofers near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/runcorn"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Runcorn", path: "en/gb/roofers-near-me/runcorn" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInRuncorn />
      </Suspense></>
  )
}

export default page