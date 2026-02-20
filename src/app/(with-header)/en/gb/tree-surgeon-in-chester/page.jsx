import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import TreeSurgeonInChester from '@/app/component/LocationPages/TreeSurgeonInChester/TreeSurgeonInChester'
import React, { Suspense } from 'react'
export const metadata = {
  title: "Find Quality Tree Surgeons in Chester | Localists",
  description:
    "Find fully qualified tree surgeons in Chester. Certified and skilled arborists. Safe tree removal & pruning. Get free quotes from local experts in your area.",
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

        <TreeSurgeonInChester />
      </Suspense></>
  )
}

export default page