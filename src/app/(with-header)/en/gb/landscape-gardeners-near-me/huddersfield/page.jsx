import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import LandscapersInHuddersfield from "@/app/component/LocationPages/Huddersfield/LandscapersInHuddersfield/LandscapersInHuddersfield";
import React, { Suspense } from "react";
export const metadata = {
  title: "19 Trusted Local Landscapers in Huddersfield| Localists.com",
  description:
    "Need a trusted landscaper in your area? Click now to get free no-obligation quotes from vetted, professional landscapers working across Huddersfield.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me/huddersfield"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
          {
            title: "Huddersfield",
            path: "en/gb/landscape-gardeners-near-me/huddersfield",
          },
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
        <LandscapersInHuddersfield />
      </Suspense>
    </>
  );
}

export default page;
