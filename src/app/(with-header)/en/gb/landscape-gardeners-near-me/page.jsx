import SEO from "@/app/component/common/seo/SEO";
import LandscapeGardenNearme from "@/app/component/Nearme/LandscaperGardenNearMe/LandscapeGardenNearme";
import React, { Suspense } from "react";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";

export const metadata = {
  title: "Find Landscape Gardeners Near Me - Localists",
  description:
    " Looking to hire expert landscape gardeners or landscape architects in your local area? Start today at Localists. Obtain free no obligation quotes.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home & Garden", path: "/home" },
          { title: "Landscaping", path: "landscape-gardeners-near-me" },
        ]}
        conversion={true}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoadingIndicator size="large" />
          </div>
        }
      >
        <LandscapeGardenNearme />;
      </Suspense>
    </>
  );
}

export default page;
