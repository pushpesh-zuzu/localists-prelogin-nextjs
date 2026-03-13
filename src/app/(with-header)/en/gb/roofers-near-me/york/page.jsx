import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInYork from '@/app/component/LocationPages/York/RoofersInYork/RoofersInYork';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Trusted Roofers York | Get Free Quotes| Localists",
  description:
    "Need reliable roofers in York? Click now to receive up to 5 free, no-obligation quotes from vetted local professionals in minutes with Localists.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/york"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "York", path: "en/gb/roofers-near-me/york" },
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