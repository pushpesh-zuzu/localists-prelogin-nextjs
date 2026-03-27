import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInBurnley from "@/app/component/LocationPages/Burnley/RoofersInBurnley/RoofersInBurnley";
import React, { Suspense } from "react";
export const metadata = {
  title: "Find Expert Roofers Burnley| Free Quotes Now | Localists",
  description:
    "Need a roofer in Burnley? Get up to 5 free, no-obligation quotes from vetted local roofing specialists for repairs, replacements, and emergency jobs.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/burnley"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Burnley", path: "en/gb/roofers-near-me/burnley" },
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
        <RoofersInBurnley />
      </Suspense>
    </>
  );
}

export default page;
