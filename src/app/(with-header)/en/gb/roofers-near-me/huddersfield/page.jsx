import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import RoofersInHuddersfield from "@/app/component/LocationPages/Huddersfield/RoofersInHuddersfield/RoofersInHuddersfield";
import React, { Suspense } from "react";
export const metadata = {
  title: "Find Trusted Roofers Huddersfield| Localists.com",
  description:
    "Looking for trusted roofers in Huddersfield? Get up to 5 free, no-obligation quotes from vetted local experts for repairs, replacements, and emergencies.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofers-near-me/huddersfield"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Roofing", path: "en/gb/roofers-near-me" },
          { title: "Huddersfield", path: "en/gb/roofers-near-me/huddersfield" },
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
        <RoofersInHuddersfield />
      </Suspense>
    </>
  );
}

export default page;
