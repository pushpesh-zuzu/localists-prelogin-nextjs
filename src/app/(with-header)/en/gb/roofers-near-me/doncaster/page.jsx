import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInDoncaster from "@/app/component/LocationPages/Doncaster/RoofersInDoncaster/RoofersInDoncaster";

import React, { Suspense } from "react";
export const metadata = {
  title: " Roofers Doncaster | Free Quotes in Minutes| Localists.com",
  description:
    "Need reliable roofers in Doncaster? Click now for up to 5 free quotes from trusted local roofing experts for repairs, replacements, and emergency services.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/Doncaster"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Doncaster", path: "en/gb/roofers-near-me/Doncaster" },
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
        <RoofersInDoncaster />
      </Suspense>
    </>
  );
}

export default page;
