import SEO from '@/app/component/common/seo/SEO';
import MultiStepTreeSurgeon from '@/app/component/MultiStepFormPPC/MultiStepTreeSurgeon/MultiStepTreeSurgeon'
import React from 'react'
export const metadata = {
  title: "Find Quality Tree Surgeons Near Me | Localists",
  description:
    "Find fully qualified tree surgeons near me. Certified and skilled arborists. Safe tree removal & pruning. Get free quotes from local experts in your area.",
  robots: {
    index: false,
    follow: false,
  },
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/tree-surgeon-multi-form-ppc"
        conversion={false}
      />
      <MultiStepTreeSurgeon serviceId={112} />
    </>
  )
}

export default page