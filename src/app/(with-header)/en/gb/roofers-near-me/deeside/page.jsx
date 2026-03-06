import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInDeeside from '@/app/component/LocationPages/Deeside/RoofersInDeeside/RoofersInDeeside';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Reliable Roofers Deeside | Get Free Quotes |Localists.com",
  description:
    "Find expert roofers Deeside residents trust for all roofing jobs. Click now for up to 5 free quotes. Emergency roofing. Fully vetted local installers.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/deeside"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Deeside", path: "en/gb/roofers-near-me/deeside" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInDeeside/>
      </Suspense></>
  )
}

export default page