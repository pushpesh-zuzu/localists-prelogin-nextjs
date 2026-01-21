import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingDriveway from "@/app/component/LandingPages/LandingDriveway";

export const metadata = {
     title: "Compare Free Quotes from Local Driveway Companies | Localists",
    description:
      "Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
};

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["driveways_ppc"]?.banner}
            />
            <LandingDriveway />
            <Footer />
        </Suspense>
    );
}
