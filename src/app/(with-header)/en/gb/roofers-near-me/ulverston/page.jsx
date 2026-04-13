import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInUlverston from "@/app/component/LocationPages/Ulverston/RoofersInUlverston/RoofersInUlverston";

import React, { Suspense } from "react";
export const metadata = {
  title: "Find Roofers Ulverston | Localists",
  description:
    " Do you need Roofers in Ulverston for your project? Click now to get free, no-obligation quotes from local roofers within minutes. All fully vetted.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/wigan"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Wigan", path: "en/gb/roofers-near-me/wigan" },
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
        <RoofersInUlverston />
      </Suspense>
    </>
  );
}

export default page;
