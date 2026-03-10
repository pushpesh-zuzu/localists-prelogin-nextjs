"use client";
import React, { useRef } from "react";
import {
    BREADCRUM_DATA_ROOFERS_ELLESMEREPORT,
    FREQUENTLY_DATA_ELLESMEREPORT,
    POPULAR_SERVICES_ROOFERS_ELLESMEREPORT,
    QUESTION_AND_ABOUT_SERVICE_ROOFERS_ELLESMEREPORT,
    ROOFERS_ADVICEINSIGHT_ELLESMEREPORT,
    ROOFERS_FEEDBACK_ELLESMEREPORT,
    ROOFERS_DATA_ELLESMEREPORT,
    ROOFERS_TABDATA_ELLESMEREPORT,
    VETTED_DATA_ROOFERS_ELLESMEREPORT,
} from "./RoofersInEllesmerePortData";
import CloseBrowserAbandon from "../../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import VettedSection from "../../../Nearme/VettedSection";
import PopularJobNearMe from "../../../Nearme/PopularJobNearMe";
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

function RoofersInEllesmerePort() {
    useScrollToTop()
    useRegistrationRedirect()
    const featureRef = useRef(null);
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
            <FAQScript FAQ={FREQUENTLY_DATA_ELLESMEREPORT} />
            <HeroSectionLocation
                heading1="Roofers"
                heading2="Ellesmere Port"
                description="Get free, no-obligation quotes from the highest quality roofers working across Ellesmere Port. Enter your postcode below and share a few details about the work. It only takes a minute to get started."
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                bannerImageMobile="/location/roofing_location.webp"
                altText="A roofer installing a new roof by securing clay tiles with a drill"
                blackHeadinginline="inline"
                serviceId={113}
                serviceName="Roofing"
                // margin='m-start'
            />
            <VettedSection
                paragraph={VETTED_DATA_ROOFERS_ELLESMEREPORT}
                vettedHeading1="Find Local Vetted Roofers in "
                vettedHeading2="Ellesmere Port"
                breadcrumb={BREADCRUM_DATA_ROOFERS_ELLESMEREPORT}
                extraButton
                featureRef={featureRef}
            />

            <PopularJobNearMe
                services={POPULAR_SERVICES_ROOFERS_ELLESMEREPORT}
                popularImage="/nearme/Roofing/roofslate.webp"
                altText="two roofers installing slate tiles onto a brand new roof URL"
                mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
                paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
            />
            <AboutServicesAndQuestions
                serviceId={113}
                serviceName="Roofing"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_ELLESMEREPORT}
            />

            <div ref={featureRef} style={{ overflowAnchor: "none" }}>
                <Feature county='Cheshire' cityName='Ellesmere Port' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
            </div>

            <AdviceInsightNearMe
                articles={ROOFERS_ADVICEINSIGHT_ELLESMEREPORT}
                padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
            />
            <FAQ
                containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
                headdingblue="FAQ's"
                headingblack=""
                data={FREQUENTLY_DATA_ELLESMEREPORT}
            />
            <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_ELLESMEREPORT} />
            <DiscoverNearMe homeData={ROOFERS_DATA_ELLESMEREPORT} />
            <HireRelatedToServiceNearMe
                heading1="Hire with"
                heading2="confidence."
                tabData={ROOFERS_TABDATA_ELLESMEREPORT}
                activeTabkey="popular"
            />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}
export default RoofersInEllesmerePort;