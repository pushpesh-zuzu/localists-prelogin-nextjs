import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInScarborough from '@/app/component/LocationPages/Scarborough/RoofersInScarborough/RoofersInScarborough';
import React, { Suspense } from 'react'
export const metadata = {
  title: " Find Trusted Roofers Scarborough | Localists.com",
  description:
    "Looking for the best Roofers Scarborough homeowners trust? Click now to get up to 5 free, no-obligation quotes from trusted roofing experts in your area.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/scarborough"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Scarborough", path: "en/gb/roofers-near-me/scarborough" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInScarborough/>
      </Suspense></>
  )
}

export default page