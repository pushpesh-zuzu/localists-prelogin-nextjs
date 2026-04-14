import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import LandscapersInWrexham from "@/app/component/LocationPages/Wrexham/LandscapersInWrexham/LandscapersInWrexham";
import React, { Suspense } from "react";
export const metadata = {
  title: "22 Reliable Local Landscapers in Wrexham | Localists",
  description:
    "Looking for trusted landscapers in Wrexham? Click now to answer a few quick questions and get matched with local professionals ready to quote.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me/wrexham"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
          {
            title: "Wrexham",
            path: "en/gb/landscape-gardeners-near-me/wrexham",
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
        <LandscapersInWrexham />
      </Suspense>
    </>
  );
}

export default page;
