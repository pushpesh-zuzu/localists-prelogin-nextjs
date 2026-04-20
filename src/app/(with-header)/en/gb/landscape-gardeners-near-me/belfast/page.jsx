import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import LandscapersInBelfast from "@/app/component/LocationPages/Belfast/LandscapersInBelfast/LandscapersInBelfast";
import React, { Suspense } from "react";
export const metadata = {
  title: "17 Local Skilled Landscapers Belfast | Localists",
  description:
    " Looking for trusted landscapers in Belfast? Click now and get free obligation quotes from qualified landscapers in the area in minutes.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me/belfast"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
          {
            title: "Belfast",
            path: "en/gb/landscape-gardeners-near-me/belfast",
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
        <LandscapersInBelfast />
      </Suspense>
    </>
  );
}

export default page;
