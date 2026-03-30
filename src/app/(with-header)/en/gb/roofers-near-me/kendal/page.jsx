import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInKendal from "@/app/component/LocationPages/Kendal/RoofersInKendal/RoofersInKendal";
import React, { Suspense } from "react";
export const metadata = {
  title: " Find Trusted Roofers Kendal | Free Quotes| Localists.com",
  description:
    " Looking to hire a reliable Roofer in Kendal? Click now to get up to 5 free quotes from local roofers near you. Fully vetted. Emergency roofing available.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/kendal"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Kendal", path: "en/gb/roofers-near-me/kendal" },
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
        <RoofersInKendal />
      </Suspense>
    </>
  );
}

export default page;