import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInWigan from "@/app/component/LocationPages/Wigan/RoofersInWigan/RoofersInWigan";

import React, { Suspense } from "react";
export const metadata = {
  title: "Find Trusted Roofers in Wigan | Free Quotes| Localists.com",
  description:
    " Looking for reliable roofers in Wigan? Get up to 5 free, no-obligation quotes from vetted local roofing experts. Repairs, replacements & emergencies.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/ulverston"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Ulverston", path: "en/gb/roofers-near-me/ulverston" },
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
        <RoofersInWigan />
      </Suspense>
    </>
  );
}

export default page;
