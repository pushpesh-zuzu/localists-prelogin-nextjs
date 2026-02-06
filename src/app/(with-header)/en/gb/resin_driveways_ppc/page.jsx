import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingResinDriveway from "@/app/component/LandingPages/LandingResinDriveway";

export const metadata = {
    title: "Compare Free Resin Driveway Quotes | Localists",
    description:
        "Get free quotes from trusted local resin driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
 robots: {
    index: false,
    follow: false,
  },
    };

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["resin_driveways_ppc"]?.banner}
            />
            <LandingResinDriveway />
            <Footer />
        </Suspense>
    );
}
