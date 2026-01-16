import BannerWithBreadCrum from "@/app/component/category/ServicesHeroSection/BannerWithBreadCrum";
import TransportBanner from "../../../component/level1/banner/TransportBanner.webp";
import {
    TransportHowItWork, TransportPopularCategory
} from "@/constants/transportData";
import SEO from "@/app/component/common/seo/SEO";
import HowItWorks from "@/app/component/category/howItWorks/CloneHowitWorks";
import PopularCategories from "@/app/component/category/popularCategories/ClonePopularCategories";
import AllServiceLevel1 from "@/app/component/category/allServices/AllServiceLevel1";
import GetQuotes from "@/app/component/common/GetQuotes/GetQuote";
import Footer from "@/app/component/Footer/Footer";

export const metadata = {
    title: "Transportation Services Near Me | Find Local Professionals - Localists",
    description:
        "Find reliable transportation services near you. Get free quotes for removals, airport transfers, coach hire and more.",

    alternates: {
        canonical: "https://www.localists.com/en/gb/transportation-services",
    },

    openGraph: {
        title: "Transportation Services Near Me | Find Local Professionals - Localists",
        description:
            "Find reliable transportation services near you. Get free quotes for removals, airport transfers, coach hire and more.",
        url: "https://www.localists.com/en/gb/transportation-services",
        images: [
            {
                url: "https://dev2.localistsbooster.com/en/gb/component/level/banner/TransportBanner.webp",
                width: 1200,
                height: 630,
                alt: "transport",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        images: [
            "https://dev2.localistsbooster.com/en/gb/component/level/banner/TransportBanner.webp",
        ],
    },
};



export default function Page() {
    return (
        <main className="bg-white">
            <SEO
                bannerImage={TransportBanner}
                breadcrumb={[
                    { title: "Transportation Services", path: "/en/gb/transportation-services" },
                ]}
                conversion
            />
            <BannerWithBreadCrum
                imageAlt={"transport"}
                accountHeader="Transportation Services"
                level={2}
                isNeedS={false}
                panelImage={TransportBanner}
                doYouNeetTitle={[
                    "Do you need trusted",
                    "local transport",
                    "professionals",
                ]}
                title="transportation services"
                para1="At Localists, we connect you with the right transport providers for your needs."
                para2="From squeaky-clean sedans to stretch limos, speedy airport shuttles to big group coaches—getting from A to B has never looked so good. We’ll connect you with local transport pros who know how to move you in style (and on time)."
                para3="Not sure how to find a reliable transportation service? Simply tell us what you need—whether it’s a transfer, courier delivery, removals, or local taxi hire—and where you need it. We’ll then recommend the best professionals near you. Compare services, read verified reviews, and get free, tailored quotations for your journey."
                para4={`It’s quick, easy, and stress-free!`}
                placeholderText="Airport Transfers, Bus & Coach Hire, etc..."
            />
            <HowItWorks
                howItWorksData={TransportHowItWork}
                ctaText={"Transport Services"}
            />
            <PopularCategories data={TransportPopularCategory} />
            <AllServiceLevel1
                data={[
                    {
                        name: "Airport Transfers",
                        path: "",
                    },
                ]}
            />

            <div className="">
                <div
                    className="py-[50px] max-[768px]:py-[30px] max-[480px]:py-[20px]" >
                    <GetQuotes ctaText="Transport" needSString={false} />
                </div>
            </div>
            <Footer />

        </main>
    );
}