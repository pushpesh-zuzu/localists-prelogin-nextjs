import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingConcreteDriveway from "@/app/component/LandingPages/LandingConcreteDriveway";


export const metadata = {
    title: "Compare Free Concrete Driveway Quotes | Localists",
    description:
        "Get free quotes from trusted local concrete driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
};

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["concrete_driveways_ppc"]?.banner}
            />
            <LandingConcreteDriveway />
            <Footer />
        </Suspense>
    );
}
