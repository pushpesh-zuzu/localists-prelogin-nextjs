import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInLiverpool from '@/app/component/LocationPages/Liverpool/RoofersInLiverpool/RoofersInLiverpool';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Trusted Roofers Liverpool | Localists.com",
  description:
    "Looking for reliable roofers in Liverpool? Get up to 5 free, no-obligation quotes from trusted local specialists for repairs, replacements, and installations.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/chester"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Liverpool", path: "en/gb/roofers-near-me/liverpool" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInLiverpool />
      </Suspense></>
  )
}

export default page