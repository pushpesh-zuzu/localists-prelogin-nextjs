"use client";

import { usePathname } from "next/navigation";
import BannerWithBreadCrum from "@/app/component/category/ServicesHeroSection/BannerWithBreadCrum";
import Home from "../../../../../../public/images/Banners/Home.webp";
import HowItWorks from "@/app/component/category/howItWorks/CloneHowitWorks";
import {
    HowItWorksData,
    PopularCategoriesData,
} from "@/constants/CloneCategory";
import SEO from "@/app/component/common/seo/SEO";
import PopularCategories from "@/app/component/category/popularCategories/ClonePopularCategories";
import AllServiceLevel1 from "@/app/component/category/allServices/AllServiceLevel1";
import GetQuotes from "@/app/component/common/GetQuotes/GetQuote";
import Footer from "@/app/component/Footer/Footer";

const endpointCategoryMap = {
    "financial-and-accounting": ["Accounting", "Bookkeeping Services"],
    business: [
        "Accounting",
        "Bookkeeping Services",
        "Business Consulting",
        "Social Media Marketing",
    ],
    home: [
        "General Builders",
        "Landscaping",
        "Fence & Gate Installation",
        "Driveway Installation",
        "Patio Laying",
        "Artificial Grass Installation",
        "Tree Surgery",
        "Gutter Cleaning",
    ],
};

export default function Page() {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);
    const endpoint1 = pathSegments[pathSegments.length - 1];

    const allowedTitles = endpointCategoryMap[endpoint1] || [];

    const filteredCategories = PopularCategoriesData.filter((item) =>
        allowedTitles.includes(item.title)
    );

    const howItWorksData = HowItWorksData[endpoint1];
    return (
        <main className="bg-white">
            <SEO
                bannerImage={Home}
                breadcrumb={[
                    { title: "Home & Garden", path: "/en/gb/home" },
                ]}
                conversion
            />
            <BannerWithBreadCrum
                header={"Home & Garden"}
                imageAlt={"Home"}
                LevelOneTwoTitle={"Home & Garden"}
                accountHeader="Home & Garden"
                level={2}
                isNeedS={false}
                doYouNeetTitle={[
                    "Do you need trusted",
                    "home & garden",
                    "professionals",
                ]}
                panelImage={Home}
                title="Home & Garden"
                findAccountTitle2="professionals"
                para1="At Localists, we connect you with the right Home & Garden Professionals for your needs."
                para2="Not sure how to find the right Home & Garden Professionals? Simply tell us what you need help with and where you need it, and we’ll recommend the best Home & Garden Professionals near you. See what they offer, check out their reviews, and get free quotations for the work you require."
                para3={`It's super fast and easy!`}
                heading2={"Professionals"}
                placeholderText="Driveway Installation, Gardening Services, etc..."
            />

            <HowItWorks
                howItWorksData={howItWorksData}
                ctaText={"Home & Garden Professionals"}
            />
            <PopularCategories data={filteredCategories} />
            <AllServiceLevel1
                data={[
                    {
                        name: "Fence & Gate Installation",
                        path: "/fencing-contractors-near-me",
                    },
                    {
                        name: "Driveway Installation",
                        path: "/driveway-installers-near-me",
                    },
                    { name: "Patio Laying", path: "/patio-layers-near-me" },
                    { name: "Landscaping", path: "/landscape-gardeners-near-me" },
                    {
                        name: "Artificial Grass Installation",
                        path: "/artificial-grass-installers-near-me",
                    },
                    { name: "Tree Surgery", path: "/tree-surgeon-near-me" },
                    { name: "Gutter Cleaning", path: "/gutter-cleaning-near-me" },
                ]}
            />
            <div className="mt-[5px] mb-3">
                <div
                    className="py-[50px] max-[768px]:py-[30px] max-[480px]:py-[20px]" >
                    <GetQuotes ctaText="Home & Garden" needSString={false} />
                </div>
            </div>
            <Footer />
        </main>
    );
}