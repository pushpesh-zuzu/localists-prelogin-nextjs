import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import LandscapersInWigan from "@/app/component/LocationPages/Wigan/LandscapersInWigan/LandscapersInWigan";

import React, { Suspense } from "react";
export const metadata = {
  title: "25 Local Landscapers Wigan | Free Quotes | Localists.com",
  description:
    "Looking for trusted landscapers in Wigan? Click now to receive no-obligation quotes directly to your inbox, from highly qualified experts in your local area",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me/wigan"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
          { title: "Wigan", path: "en/gb/landscape-gardeners-near-me/wigan" },
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
        <LandscapersInWigan />
      </Suspense>
    </>
  );
}

export default page;
