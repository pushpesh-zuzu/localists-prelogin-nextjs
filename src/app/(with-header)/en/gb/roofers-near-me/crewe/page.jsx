import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInCrew from '@/app/component/LocationPages/Crew/RoofersInCrew/RoofersInCrew';
import React, { Suspense } from 'react'
export const metadata = {
  title: "18 Reliable Roofers Crewe | Localists.com",
  description:
    "Looking for reliable roofers Crewe homeowners would recommend? Share a few details and compare free quotes from experienced local professionals.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/crewe"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Crewe", path: "en/gb/roofers-near-me/crewe" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInCrew />
      </Suspense></>
  )
}

export default page