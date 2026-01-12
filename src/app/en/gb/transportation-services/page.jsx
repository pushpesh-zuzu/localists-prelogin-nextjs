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
    title: "Lessons & Training From Local Experts | Localists",
    description:
        "Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers. Get your free quote now!",

    alternates: {
        canonical: "https://www.localists.com/en/gb/lessons-training",
    },

    openGraph: {
        title: "Lessons & Training From Local Experts | Localists",
        description:
            "Develop a skill, and get lessons in anything from driving to academics with trusted local tutors and trainers.",
        url: "https://www.localists.com/en/gb/lessons-training",
        images: [
            {
                url: "https://www.localists.com/images/Banners/LessonsAndTraining.webp",
                width: 1200,
                height: 630,
                alt: "Lessons & Training From Local Experts",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        images: [
            "https://www.localists.com/images/Banners/LessonsAndTraining.webp",
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
                        path: "/airport-transfers-near-me",
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