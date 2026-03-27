import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInWhitehaven from "@/app/component/LocationPages/Whitehaven/RoofersInWhitehaven/RoofersInWhitehaven";
import React, { Suspense } from "react";
export const metadata = {
  title: "Find Trusted Roofers Whitehaven | Localists.com",
  description:
    "Discover the best Roofers in Whitehaven. Click now. Get free, no-obligation quotes from local vetted roofers in your area. Takes only a minute.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/whitehaven "
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Whitehaven ", path: "en/gb/roofers-near-me/whitehaven" },
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
        <RoofersInWhitehaven />
      </Suspense>
    </>
  );
}

export default page;
