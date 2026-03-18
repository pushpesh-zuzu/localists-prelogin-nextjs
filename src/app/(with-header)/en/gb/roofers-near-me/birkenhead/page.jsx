import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBirkenhead from '@/app/component/LocationPages/Birkenhead/RoofersInBirkenhead/RoofersInBirkenhead';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find the Best Roofers in Birkenhead | Localists.com",
  description:
    "Looking for trusted roofers in Birkenhead? Click now to get free, no-obligation quotes from vetted local roofing experts near you.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/birkenhead"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Birkenhead", path: "en/gb/roofers-near-me/birkenhead" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInBirkenhead/>
      </Suspense></>
  )
}

export default page