import SEO from "@/app/component/common/seo/SEO";
import React, { Suspense } from "react";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import PatioServicesNearme from "@/app/component/Nearme/PatioServicesNearMe/PatioServicesNearme";

export const metadata = {
  title: "Find Patio Installers and Patio Layers Near me | Localists",
  description:
    "Looking for patio installers near you? Find trusted patio contractors and patio layers in your local area. Get free quotes and start today at Localists.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/patio-layers-near-me"
        bannerImage="/nearme/Patio/patioServicesNearme.webp"
        breadcrumb={[
          { title: "Home", path: "/en/gb" },
          { title: "Home & Garden", path: "/home" },
          { title: "Patio Installation", path: "/patio-layers-near-me" },
        ]}
        conversion={false}
      />
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoadingIndicator size="large" />
          </div>
        }
      >
        <PatioServicesNearme />
      </Suspense>
    </>
  );
}

export default page;
