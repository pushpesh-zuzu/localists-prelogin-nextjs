"use client";
import React, { useRef } from "react";
import {
    BREADCRUM_DATA_LANDSCAPING_NORTHWICH,
    FREQUENTLY_DATA_NORTHWICH,
    POPULAR_SERVICES_LANDSCAPING_NORTHWICH,
    QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_NORTHWICH,
    LANDSCAPING_ADVICEINSIGHT_NORTHWICH,
    LANDSCAPING_FEEDBACK_NORTHWICH,
    LANDSCAPING_DATA_NORTHWICH,
    LANDSCAPING_TABDATA_NORTHWICH,
    VETTED_DATA_LANDSCAPING_NORTHWICH,
    NEARBY_PLACES_ROOFER_NORTHWICH
} from "./LandscapersInNorthwichData";
import CloseBrowserAbandon from "../../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import VettedSection from "../../../Nearme/VettedSection";
import Footer from "../../../Footer/Footer";
import AboutServicesAndQuestions from "../../../Nearme/AboutServicesAndQuestions";
import { FAQ } from "../../../Nearme/FAQ";
import UserFeedbackNearMe2 from "../../../Nearme/UserFeedbackNearMe2";
import DiscoverNearMe from "../../../Nearme/DiscoverNearMe";
import NearmeMember from "../../../Nearme/NearmeMember";
import FAQScript from "../../../common/seo/FAQScript";
import HireRelatedToServiceNearMe from "../../../Nearme/HireRelatedToServiceNearMe";
import AdviceInsightNearMe from "../../../Nearme/AdviceInsightNearMe";
import Feature from "../../FetureComponent/Feature";
import HeroSectionLocation from "../../HeroSectionLocation";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import useRegistrationRedirect from "@/hooks/useRegistrationRedirect";
import WrapperBGWidth from "../../../common/WrapperBGWidth/WrapperBGWidth";
import PostCodeSectionLocation2 from "../../PostCodeSectionLocation2";
import LandScapingGardenPopularJobs from "@/app/component/Nearme/LandscaperGardenNearMe/LandScapingGardenPopularJobs";
import NearbyPlaces from "@/app/component/common/NearByPlaces/NearbyPlaces";

function LandscapersInNorthwich() {
    useScrollToTop()
    useRegistrationRedirect()
    const featureRef = useRef(null);
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={43} quote_type="req call back" />}
            <FAQScript FAQ={FREQUENTLY_DATA_NORTHWICH} />
            <HeroSectionLocation 
                heading1="Landscapers"
                heading2="Northwich"
                description="Looking for landscapers in Northwich? Pop in your postcode and a few quick details of what needs doing below and receive several quotes in your inbox in minutes. It’s really that easy."
                bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
                bannerImageMobile="/nearme/Landscaping/landscapingMobile1.webp"
                altText="A Landscaper carefully laying a large concrete slab amongst a garden of flowers and grey pebble dash"
                serviceId={43}
                serviceName="Landscaping"
            />
            <VettedSection
                paragraph={VETTED_DATA_LANDSCAPING_NORTHWICH}
                vettedHeading1="Find Local Vetted Landscapers in "
                vettedHeading2="Northwich"
                breadcrumb={BREADCRUM_DATA_LANDSCAPING_NORTHWICH}
                extraButton
                featureRef={featureRef}
                featureButtonText="View Landscapers"
            />
            <LandScapingGardenPopularJobs
                services={POPULAR_SERVICES_LANDSCAPING_NORTHWICH}
                popularImage="/nearme/Landscaping/pathwayPopularJob.png"
                altText="beautifully landscaped garden with pathway and decorative paving edges "
                mobileCardClass="w-[285px] min-[390px]:w-[221px] min-[412px]:w-[300px] min-[440px]:w-[307px] min-[512px]:w-[350px]"
                classNameD="max-w-[65%] min-[850]:max-w-[80%] lg:max-w-full"
                isPaddingBottom={true}
            />
            <AboutServicesAndQuestions
                serviceId={43}
                serviceName="Landscaping"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_NORTHWICH}
                quotesBannerText="GET A QUOTES IN"
                mobileFrame="/nearme/Landscaping/mobilelandscaping.webp"
            />

            <div ref={featureRef} style={{ overflowAnchor: "none" }}>
                <Feature county='Cheshire' cityName='Northwich' serviceId={43} serviceName="Landscaping" featureRef={featureRef} serviceProfessionName="Landscapers" />
            </div>

            <HireRelatedToServiceNearMe
                heading1="Hire with"
                heading2="confidence."
                tabData={LANDSCAPING_TABDATA_NORTHWICH}
                activeTabkey="popular"
            />
            <AdviceInsightNearMe
                articles={LANDSCAPING_ADVICEINSIGHT_NORTHWICH}
                padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
            />
            <WrapperBGWidth>
                <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
                    <PostCodeSectionLocation2 classNamePostCode="mb-[30px] md:mb-10 mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={43} serviceName="Landscaping" />
                </div>
            </WrapperBGWidth>
            <FAQ
                containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
                headdingblue="FAQ's"
                headingblack=""
                data={FREQUENTLY_DATA_NORTHWICH}
            />
            <UserFeedbackNearMe2 feedbackData={LANDSCAPING_FEEDBACK_NORTHWICH} />
            <DiscoverNearMe homeData={LANDSCAPING_DATA_NORTHWICH} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                desktopImage="/nearme/Landscaping/landscapingmember.webp"
                mobileImage="/nearme/Landscaping/landscapingmember.webp"
            />
            {/* <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_NORTHWICH}/> */}
            <Footer />
        </>
    );
}
export default LandscapersInNorthwich;