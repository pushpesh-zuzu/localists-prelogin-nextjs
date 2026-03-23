import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import ArchitectsNearMe from "@/app/component/Nearme/ArchitectsNearMe/ArchitectsNearMe";
export const metadata = {
  title: "Architects Near Me | Get Free Quotes Now | Localists.com",
  description:
    "Need local architects near you? Get 5 free quotes from vetted architects near you for residential, commercial, and extension projects. Compare options",
};
export default function Page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/architects-near-me"
        bannerImage="/nearme/treeSurgeon.webp"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "Home & Garden", path: "en/gb/home" },
          { title: "Architects", path: "en/gb/architects-near-me" },
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
        <ArchitectsNearMe />
      </Suspense>
    </>
  );
}
