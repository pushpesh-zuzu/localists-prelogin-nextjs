import BannerWrapper from "@/app/component/common/bannerWrapper/BannerWrapper";
import { aboutUsBanner } from "../../../../../../public/images/MainBanners";
import SEO from "@/app/component/common/seo/SEO";
import WhoWeAre from "@/app/component/AboutUs/WhoWeAre";
import GetInTouchButton from "@/app/component/AboutUs/GetInTouch";
import Footer from "@/app/component/Footer/Footer";


export const metadata = {
    title: "Meet Our Leadership Team & Investors - Localists",
    description:
        "Meet our experienced leadership team and the investors driving Localists, the world’s fastest-growing local services marketplace. Get free quotes.",

    alternates: {
        // canonical: "https://dev2.localistsbooster.com/en/gb/about-us",
        languages: {
            "en-GB": "https://dev2.localistsbooster.com/en/gb/About-us"
        },
    },

    openGraph: {
        title: "Meet Our Leadership Team & Investors - Localists",
        description:
            "Meet our experienced leadership team and the investors driving Localists, the world’s fastest-growing local services marketplace. Get free quotes.",
    },

    twitter: {
        title: "Meet Our Leadership Team & Investors - Localists",
        description:
            "Meet our experienced leadership team and the investors driving Localists, the world’s fastest-growing local services marketplace. Get free quotes.",
    },
};

export default function Page() {
    return (
        <main className="bg-white">
            <SEO
                bannerImage="./images/MainBanners"
                breadcrumb={[
                    { title: "About Us", path: "/en/gb/about-us" },
                ]}
                conversion
            />
            <BannerWrapper
                imageAlt={"About Us"}
                headingText="About Us"
                image={aboutUsBanner.src}
            />
            <WhoWeAre />
            <GetInTouchButton />
            <Footer />
        </main>
    );
}
