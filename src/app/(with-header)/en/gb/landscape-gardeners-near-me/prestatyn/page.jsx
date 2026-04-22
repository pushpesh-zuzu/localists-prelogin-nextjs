import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import LandscapersInPrestatyn from "@/app/component/LocationPages/Prestatyn/LandscapersInPrestatyn/LandscapersInPrestatyn";
import LandscapersInWakefield from "@/app/component/LocationPages/Wakefield/LandscapersInWakefield/LandscapersInWakefield";
import React, { Suspense } from "react";
export const metadata = {
  title: " 23 Vetted Local Landscapers Prestatyn",
  description:
    "Need to hire reliable landscapers in Prestatyn? Click now to get free expert quotes from local landscaping professionals near you. Only on Localists today.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me/prestatyn"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
          {
            title: "Prestatyn",
            path: "en/gb/landscape-gardeners-near-me/prestatyn",
          },
        ]}
        conversion={true}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoaderIndicator size="large" />
          </div>
        }
      >
        <LandscapersInPrestatyn />
      </Suspense>
    </>
  );
}

export default page;
