import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInCheadleHulme from "@/app/component/LocationPages/CheadleHulme/RoofersInCheadleHulme/RoofersInCheadleHulme";
import React, { Suspense } from "react";
export const metadata = {
  title: "Local Trusted Roofers in Cheadle Hulme | Localists.com",
  description:
    "Find reliable local roofers in Cheadle Hulme. Receive 5 free quotes from vetted local professionals across Cheadle Hulme.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/cheadle-hulme"
        bannerImage="/nearme/Roofing/wrexhamBanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          {
            title: "Cheadle Hulme",
            path: "en/gb/roofers-near-me/cheadle-hulme",
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
        <RoofersInCheadleHulme />
      </Suspense>
    </>
  );
}

export default page;
