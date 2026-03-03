import SEO from '@/app/component/common/seo/SEO';
import MultiStepLandscaping from '@/app/component/MultiStepFormPPC/MulStepLandscaping/MultiStepLandscaping'
import React from 'react'
export const metadata = {
  title: "Compare Free Quotes from Local Landscapers | Localists",
  description:
    "Compare free quotes from trusted local landscapers in seconds. Submit your details and get matched with top-rated landscapers near you – quick, easy, and hassle-free!",
  robots: {
    index: false,
    follow: false,
  },
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscaping-multi-form-ppc"
        conversion={false}
      />
      <MultiStepLandscaping />
    </>
  )
}

export default page