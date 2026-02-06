import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingDriwayAwin from "@/app/component/LandingPages/LandingDriwayAwin";

export const metadata = {
   title: "Compare Free Quotes from Local Driveway Companies | Localists",
    description:
      "Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
 robots: {
    index: false,
    follow: false,
  },
    };

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["driveways_ppc"]?.banner}
            />
            <LandingDriwayAwin />
            <Footer />
        </Suspense>
    );
}
