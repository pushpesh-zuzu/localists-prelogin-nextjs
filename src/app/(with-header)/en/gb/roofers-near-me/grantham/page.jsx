import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInGrantham from "@/app/component/LocationPages/Grantham/RoofersInGrantham/RoofersInGrantham";
import React, { Suspense } from "react";
export const metadata = {
  title: " Looking for Reliable Roofers Grantham | Localists.com",
  description:
    "Need dependable roofers in Grantham? Get up to 5 free quotes from top-skilled roofers in your local area today. All fully vetted and insured.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/grantham"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Grantham", path: "en/gb/roofers-near-me/grantham" },
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
        <RoofersInGrantham />
      </Suspense>
    </>
  );
}

export default page;
