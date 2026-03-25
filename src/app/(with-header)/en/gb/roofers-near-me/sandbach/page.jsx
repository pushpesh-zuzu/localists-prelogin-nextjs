import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInSandbach from '@/app/component/LocationPages/Sandbach/RoofersInSandbach/RoofersInSandbach';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Vetted Local Roofers in Sandbach | Localists.com",
  description:
    " Are you in need of a roofer in Sandbach? Compare free quotes from skilled local professionals working across Sandbach. No obligation. No fuss",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/sandbach"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Sandbach", path: "en/gb/roofers-near-me/sandbach" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInSandbach />
      </Suspense></>
  )
}

export default page