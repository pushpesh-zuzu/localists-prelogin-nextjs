import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInWrexham from '@/app/component/LocationPages/Wrexham/RoofersInWrexham/RoofersInWrexham';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Roofers Wrexham | Find vetted roofers at Localists.com",
  description:
    "Searching for Roofers near you in Wrexham? Click now to get matched with vetted local roofers. Get up to 5 free quotes to your inbox in minutes.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/wrexham"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Wrexham", path: "en/gb/roofers-near-me/wrexham" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInWrexham />
      </Suspense></>
  )
}

export default page