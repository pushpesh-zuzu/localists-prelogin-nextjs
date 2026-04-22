import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInBrighouse from "@/app/component/LocationPages/Brighouse/RoofersInBrighouse/RoofersInBrighouse";
import React, { Suspense } from "react";
export const metadata = {
  title: "22 Trusted Roofers in Brighouse| Localists.com",
  description:
    "Looking for the best quality roofers in Brighouse? Click now to get 5 free quotes from local vetted roofing professionals directly to your inbox",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/Brighouse"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Brighouse", path: "en/gb/roofers-near-me/Brighouse" },
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
        <RoofersInBrighouse />
      </Suspense>
    </>
  );
}

export default page;
