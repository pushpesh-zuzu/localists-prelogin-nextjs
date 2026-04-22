import LoaderIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import SEO from "@/app/component/common/seo/SEO";
import LandscapersInNorthwich from "@/app/component/LocationPages/Northwich/LandscapersInNorthwich/LandscapersInNorthwich";
import React, { Suspense } from "react";
export const metadata = {
  title: " 20 Local Skilled Landscapers in Northwich | Localists",
  description:
    "looking for trusted landscaper Northwich? Click now to receive up to 5 free no obligation quotes. Only on Localists.",
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/landscape-gardeners-near-me/northwich"
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Landscaping", path: "en/gb/landscape-gardeners-near-me" },
          {
            title: "Northwich",
            path: "en/gb/landscape-gardeners-near-me/northwich",
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
        <LandscapersInNorthwich />
      </Suspense>
    </>
  );
}

export default page;
