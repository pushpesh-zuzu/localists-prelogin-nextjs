import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBangor from '@/app/component/LocationPages/Bangor/RoofersInBangor/RoofersInBangor';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Expert Roofers in Bangor | Localists.com",
  description:
    "Looking for trusted roofers working across Bangor? Click now. Get up to 5 free quotes from the best local professionals in your area.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/bangor"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Bangor", path: "en/gb/roofers-near-me/bangor" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInBangor/>
      </Suspense></>
  )
}

export default page