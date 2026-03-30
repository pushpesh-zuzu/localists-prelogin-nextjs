import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInPenrith from "@/app/component/LocationPages/Penrith/RoofersInPenrith/RoofersInPenrith";
import React, { Suspense } from "react";
export const metadata = {
  title: "Find dependable Roofers Penrith | Localists.com",
  description:
    "Looking for Roofers Penrith you can depend on? Share your roof issues with us and get 5 free quotes form local roof expert in Penrith.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/penrith"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Penrith", path: "en/gb/roofers-near-me/penrith" },
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
        <RoofersInPenrith />
      </Suspense>
    </>
  );
}

export default page;