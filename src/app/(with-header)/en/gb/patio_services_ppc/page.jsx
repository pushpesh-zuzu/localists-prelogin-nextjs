import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingPatioPage from "@/app/component/LandingPages/LandingPatioPage";

export const metadata = {
    title: "Compare Free Quotes from Local Patio Companies | Localists",
    description:
        "Find trusted patio companies near you. Compare free quotes and hire the best experts for patio design, installation, and repairs – fast and easy!",
};

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["patio_services_ppc"]?.banner}
            />
            <LandingPatioPage />
            <Footer />
        </Suspense>
    );
}
