import BannerWrapper from "@/app/component/common/bannerWrapper/BannerWrapper";
import { aboutUsBanner } from "../../../../../../public/images/MainBanners";
import SEO from "@/app/component/common/seo/SEO";
import WhoWeAre from "@/app/component/AboutUs/WhoWeAre";
import GetInTouchButton from "@/app/component/AboutUs/GetInTouch";
import Footer from "@/app/component/Footer/Footer";
import WrapperBGWidth from "@/app/component/common/WrapperBGWidth/WrapperBGWidth";


export const metadata = {
    title: "Meet Our Leadership Team & Investors - Localists",
    description:
        "Meet our experienced leadership team and the investors driving Localists, the world’s fastest-growing local services marketplace. Get free quotes.",
};

export default function Page() {
    return (
        <main className="bg-white">
            <SEO
                bannerImage="./images/MainBanners"
                canonicalPath="/en/gb/about-us"
                breadcrumb={[
                    { title: "Home", path: "/en/gb" },
                    { title: "About Us", path: "/en/gb/about-us" },
                ]}
                conversion={true}
            />
            <BannerWrapper
                imageAlt={"About Us"}
                headingText="About Us"
                image={aboutUsBanner.src}
            />
            <WrapperBGWidth>
            <WhoWeAre />
            <GetInTouchButton />
            </WrapperBGWidth>
            <Footer />
        </main>
    );
}
