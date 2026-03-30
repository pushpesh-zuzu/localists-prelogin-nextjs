import BlogFlateRoofLast from '@/app/component/Blog/BlogFlateRoofLast/BlogFlateRoofLast'
import SEO from '@/app/component/common/seo/SEO'
import React, { Suspense } from 'react'
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
export const metadata = {
  title: " How Long Does a Flat Roof Last | Localists.com",
  description:
    " How long does a flat roof actually last? Is EPDM  better than Bitumen? Find out this and more in our latest expert article.",
};
function page() {
  return (
    // <div><BlogFlateRoofLast/></div>
    <>
      {/* // <div><BlogFlateRoofLast/></div> */}
      <SEO
        canonicalPath="/en/gb/blog/advice/how-long-does-a-flat-roof-last"
        bannerImage="/blog/blogflatroofbanner3.webp"
        
        conversion={true} /><Suspense
          fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoadingIndicator size="large" />
          </div>}
        >
        <BlogFlateRoofLast />
      </Suspense></>
  )
}

export default page