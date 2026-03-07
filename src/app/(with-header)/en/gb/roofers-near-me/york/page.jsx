import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInYork from '@/app/component/LocationPages/York/RoofersInYork/RoofersInYork';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Roofers York | Find pre-vetted roofers at Localists.com",
  description:
    "Looking for reliable roofers in York? Get up to five free, no-obligation quotes from vetted local professionals with Localists today.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/leeds"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "York", path: "en/gb/roofers-near-me/leeds" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInYork />
      </Suspense></>
  )
}

export default page