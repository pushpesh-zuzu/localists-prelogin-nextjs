import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import {
    LANDING_DETAIL_BANNERS,
} from "@/app/component/LandingPages/LandingPageData";
import Footer from "@/app/component/Footer/Footer";
import LandingGate from "@/app/component/LandingPages/LandingGate";

export const metadata = {
    title: "Compare Free Quotes from Local Gating Companies | Localists",
    description:
      "Get free quotes from top gating companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
 robots: {
    index: false,
    follow: false,
  },
    };

export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <SEO conversion
                bannerImage={LANDING_DETAIL_BANNERS["gates_ppc"]?.banner}
            />
            <LandingGate />
            <Footer />
        </Suspense>
    );
}
