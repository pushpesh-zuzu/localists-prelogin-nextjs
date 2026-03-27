import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInMorecambe from "@/app/component/LocationPages/Morecambe/RoofersInMorecambe/RoofersInMorecambe";
import React, { Suspense } from "react";
export const metadata = {
  title: "Discover Roofers Morecambe | Localists",
  description:
    "Discover competent roofers in Morecambe. Give us the details on your roof and get 5 free no-obligation quotes from the best roofers in Morecambe",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/morecambe"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Morecambe", path: "en/gb/roofers-near-me/morecambe" },
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
        <RoofersInMorecambe />
      </Suspense>
    </>
  );
}

export default page;
