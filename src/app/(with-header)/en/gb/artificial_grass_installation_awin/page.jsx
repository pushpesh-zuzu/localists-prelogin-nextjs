import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingArtificialGrassInstallationAwin from "@/app/component/LandingPages/LandingArtificialGrassInstallationAwin";

export const metadata = {
    title:
        "Compare Free Quotes from Local Artificial Grass Companies | Localists",
    content:
        "Find trusted artificial grass companies near you. Compare free quotes, read reviews, and hire the best professionals for your garden project today.",
};

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["artificial_grass_installation_ppc"]?.banner}
            />
            <LandingArtificialGrassInstallationAwin />
            <Footer />
        </Suspense>
    );
}
