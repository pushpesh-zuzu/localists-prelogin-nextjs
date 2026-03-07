import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInMold from '@/app/component/LocationPages/Mold/RoofersInMold/RoofersInMold';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Trusted Roofers Mold | Free Quotes Now| Localists.com",
  description:
    " Find reliable and vetted Roofers Mold has to offer. Receive 5 free quotes from reliable and skilled roofers in Mold within minutes today.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/mold"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Mold", path: "en/gb/roofers-near-me/mold" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInMold/>
      </Suspense></>
  )
}

export default page