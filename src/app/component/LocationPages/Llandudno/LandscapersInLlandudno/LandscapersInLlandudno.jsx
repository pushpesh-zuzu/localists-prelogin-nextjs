"use client";
import React, { useRef } from "react";
import {
    BREADCRUM_DATA_LANDSCAPING_LLANDUDNO,
    FREQUENTLY_DATA_LLANDUDNO,
    POPULAR_SERVICES_LANDSCAPING_LLANDUDNO,
    QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_LLANDUDNO,
    LANDSCAPING_ADVICEINSIGHT_LLANDUDNO,
    LANDSCAPING_FEEDBACK_LLANDUDNO,
    LANDSCAPING_DATA_LLANDUDNO,
    LANDSCAPING_TABDATA_LLANDUDNO,
    VETTED_DATA_LANDSCAPING_LLANDUDNO,
    NEARBY_PLACES_ROOFER_LLANDUDNO
} from "./LandscapersInLlandudnoData";
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

function LandscapersInLlandudno() {
    useScrollToTop()
    useRegistrationRedirect()
    const featureRef = useRef(null);
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={43} quote_type="req call back" />}
            <FAQScript FAQ={FREQUENTLY_DATA_LLANDUDNO} />
            <HeroSectionLocation
                heading1="Landscapers"
                heading2="Llandudno"
                description="Looking for landscaping professionals in Llandudno? Look no further! Just enter your postcode below and tell us exactly what you need, and you’ll receive free quotes from the highest quality landscapers in the area - takes only a minute"
                bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
                bannerImageMobile="/nearme/Landscaping/landscapingMobile1.webp"
                altText="A Landscaper carefully laying a large concrete slab amongst a garden of flowers and grey pebble dash"
                serviceId={43}
                serviceName="Landscaping"
            />
            <VettedSection
                paragraph={VETTED_DATA_LANDSCAPING_LLANDUDNO}
                vettedHeading1="Find Local Vetted Landscapers in "
                vettedHeading2="Llandudno"
                breadcrumb={BREADCRUM_DATA_LANDSCAPING_LLANDUDNO}
                extraButton
                featureRef={featureRef}
                featureButtonText="View Landscapers"
            />
            <LandScapingGardenPopularJobs
                services={POPULAR_SERVICES_LANDSCAPING_LLANDUDNO}
                popularImage="/nearme/Landscaping/pathwayPopularJob.png"
                altText="beautifully landscaped garden with pathway and decorative paving edges "
                mobileCardClass="w-[285px] min-[390px]:w-[221px] min-[412px]:w-[300px] min-[440px]:w-[307px] min-[512px]:w-[350px]"
                classNameD="max-w-[65%] min-[850]:max-w-[80%] lg:max-w-full"
                isPaddingBottom={true}
            />
            <AboutServicesAndQuestions
                serviceId={43}
                serviceName="Landscaping"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_LLANDUDNO}
                quotesBannerText="LANDSCAPING QUOTES IN"
                mobileFrame="/nearme/Landscaping/mobilelandscaping.webp"
            />

            <div ref={featureRef} style={{ overflowAnchor: "none" }}>
                <Feature county='Conwy' cityName='Llandudno' serviceId={43} serviceName="Landscaping" featureRef={featureRef} serviceProfessionName="Landscapers" />
            </div>

            <AdviceInsightNearMe
                articles={LANDSCAPING_ADVICEINSIGHT_LLANDUDNO}
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
                data={FREQUENTLY_DATA_LLANDUDNO}
            />
            <UserFeedbackNearMe2 feedbackData={LANDSCAPING_FEEDBACK_LLANDUDNO} />
            <DiscoverNearMe homeData={LANDSCAPING_DATA_LLANDUDNO} />
            <HireRelatedToServiceNearMe
                heading1="Hire with"
                heading2="confidence."
                tabData={LANDSCAPING_TABDATA_LLANDUDNO}
                activeTabkey="popular"
            />
            <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_LLANDUDNO}/>
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                desktopImage="/nearme/Landscaping/landscapingmember.webp"
                mobileImage="/nearme/Landscaping/landscapingmember.webp"
            />
            <Footer />
        </>
    );
}
export default LandscapersInLlandudno;