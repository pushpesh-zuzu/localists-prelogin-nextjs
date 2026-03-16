import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInWarrington from '@/app/component/LocationPages/Warrington/RoofersInWarrington';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Vetted Roofers Warrington |Free Quotes| Localists.com",
  description:
    "Need reliable roofers in Warrington? Get free expert, no-obligation quotes from vetted roofers near you for repairs, replacements, and emergency roofing.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/warrington"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Warrington", path: "en/gb/roofers-near-me/warrington" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInWarrington />
      </Suspense></>
  )
}

export default page