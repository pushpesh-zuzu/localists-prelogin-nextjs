import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInChester from '@/app/component/LocationPages/RoofersInChester/RoofersInChester';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Trusted Roofers Chester | Localists.com",
  description:
    "Looking for reliable roofers in Chester? Get up to 5 free, no-obligation quotes from trusted local specialists for repairs, replacements, and installations.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/tree-surgeon-in-chester"
      bannerImage="/nearme/treeSurgeon.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Tree Surgeons", path: "en/gb/tree-surgeon-near-me" },
        { title: "Chester", path: "en/gb/tree-surgeon-in-chester" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInChester />
      </Suspense></>
  )
}

export default page