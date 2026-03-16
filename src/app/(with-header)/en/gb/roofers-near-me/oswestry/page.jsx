import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInOswestry from '@/app/component/LocationPages/Oswestry/RoofersInOswestry/RoofersInOswestry';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Get Reliable Roofers Oswestry | Localists.com",
  description:
    "Are you in need of dependable roofers in Oswestry? Click now to get free quotes from experienced, vetted roofing specialists in your local area.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/oswestry"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Oswestry", path: "en/gb/roofers-near-me/oswestry" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInOswestry />
      </Suspense></>
  )
}

export default page