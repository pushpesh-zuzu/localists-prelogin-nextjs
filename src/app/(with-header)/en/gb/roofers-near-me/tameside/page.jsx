import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInBirkenhead from '@/app/component/LocationPages/Birkenhead/RoofersInBirkenhead/RoofersInBirkenhead';
import RoofersInLlandudno from '@/app/component/LocationPages/Llandudno/RoofersInLlandudno/RoofersInLlandudno';
import RoofersInTameside from '@/app/component/LocationPages/Tameside/RoofersInTameside/RoofersInTameside';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Expert Roofers in Tameside | Localists.com",
  description:
    "Need of a skilled, verified roofer in Tameside? Get up to 5 free quotes now from fully vetted, local roofing specialists near you. Only on Localists.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/tameside"
      bannerImage="/nearme/Roofing/roofingbanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Tameside", path: "en/gb/roofers-near-me/tameside" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInTameside/>
      </Suspense></>
  )
}

export default page