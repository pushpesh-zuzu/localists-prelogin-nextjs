import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInGlossop from "@/app/component/LocationPages/Glossop/RoofersInGlossop/RoofersInGlossop";
import React, { Suspense } from "react";
export const metadata = {
  title: " Discover Trusted Roofers Glossop | Localists.com",
  description:
    " Searching for reliable and vetted Glossop roofers near you? Compare up to 5 free quotes now from local roofers in your area. Only on localists",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/glossop"
        bannerImage="/nearme/Roofing/wrexhamBanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Glossop", path: "en/gb/roofers-near-me/glossop" },
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
        <RoofersInGlossop />
      </Suspense>
    </>
  );
}

export default page;