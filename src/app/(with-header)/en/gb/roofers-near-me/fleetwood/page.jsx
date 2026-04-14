import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInFleetwood from "@/app/component/LocationPages/Fleetwood/RoofersInFleetwood/RoofersInFleetwood";

import React, { Suspense } from "react";
export const metadata = {
  title: "Find Reliable Roofers Fleetwood | Localists.com",
  description:
    "Looking for local roofers in Fleetwood that you can trust with your project? Compare free quotes now from the best professionals in your area.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/fleetwood"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Fleetwood", path: "en/gb/roofers-near-me/fleetwood" },
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
        <RoofersInFleetwood />
      </Suspense>
    </>
  );
}

export default page;
