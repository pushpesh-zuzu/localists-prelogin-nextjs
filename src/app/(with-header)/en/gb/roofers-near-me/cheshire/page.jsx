import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInCheshire from '@/app/component/LocationPages/Cheshire/RoofersInCheshire/RoofersInCheshire';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Trusted Roofers in Cheshire | Localists.com",
  description:
    "Looking for reliable roofers in Cheshire? Get free, no-obligation quotes from vetted local roofing specialists. Enter your postcode and compare quotes today.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/cheshire"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Cheshire", path: "en/gb/roofers-near-me/cheshire" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInCheshire/>
      </Suspense></>
  )
}

export default page