import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInBradford from "@/app/component/LocationPages/Bradford/RoofersInBradford/RoofersInBradford";

import React, { Suspense } from "react";
export const metadata = {
  title: "Roofers Bradford | Free Quotes in Minutes |Localists.com",
  description:
    "Looking for an expert roofer in Bradford? Start now. Get free, no-obligation quotes from local experts near you. Roof leaks, repairs, and installations.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/bradford"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Bradford", path: "en/gb/roofers-near-me/bradford" },
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
        <RoofersInBradford />
      </Suspense>
    </>
  );
}

export default page;
