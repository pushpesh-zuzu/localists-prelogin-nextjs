import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
  LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingLandscapingAwin from "@/app/component/LandingPages/LandingLandscapingAwin";

export const metadata = {
  title: "Compare Free Quotes from Local Landscapers | Localists",
  description:
    "Compare free quotes from trusted local landscapers in seconds. Submit your details and get matched with top-rated landscapers near you – quick, easy, and hassle-free!",
 robots: {
    index: false,
    follow: false,
  },
  };

export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <SEO conversion
        bannerImage={LANDING_DETAIL_BANNERS["landscaping_ppc"]?.banner}
      />
      <LandingLandscapingAwin />
      <Footer />
    </Suspense>
  );
}
