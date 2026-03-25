import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInWidnes from '@/app/component/LocationPages/Widnes/RoofersInWidnes/RoofersInWidnes';
import React, { Suspense } from 'react'
export const metadata = {
  title: " Local Roofers in Widnes | Localists.com",
  description:
    "Looking for a reliable local roofer in Widnes? Compare free quotes from vetted roofing professionals across Widnes and surrounding areas today.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/widnes"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Widnes", path: "en/gb/roofers-near-me/widnes" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInWidnes />
      </Suspense></>
  )
}

export default page