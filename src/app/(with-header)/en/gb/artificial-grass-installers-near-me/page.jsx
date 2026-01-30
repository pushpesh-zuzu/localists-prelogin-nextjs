import SEO from "@/app/component/common/seo/SEO";
import React, { Suspense } from "react";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import ArtificialGrassInstallationNearme from "@/app/component/Nearme/ArtificialGrassInstallationNearme/ArtificialGrassInstallationNearme";

export const metadata = {
  title: "Find Artificial Grass Installers Near Me - Localists",
  description:
    "Get instant quotes from artificial grass installation specialists near you. View their past projects and read reviews before you hire. Get started today at Localists  ",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/artificial-grass-installers-near-me"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home & Garden", path: "/home" },
          { title: "Artificial Grass Installation", path: "/artificial-grass-installers-near-me" },
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
        <ArtificialGrassInstallationNearme />;
      </Suspense>
    </>
  );
}

export default page;
