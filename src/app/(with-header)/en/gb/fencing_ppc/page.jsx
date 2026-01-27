import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingFenceAndGate from "@/app/component/LandingPages/LandingFenceAndGate";

export const metadata = {
    title: "Compare Free Quotes from Local Fencing Companies | Localists",
    description:
        "Get free quotes from top fencing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
};

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["fencing_ppc"]?.banner}
            />
            <LandingFenceAndGate />
            <Footer />
        </Suspense>
    );
}
