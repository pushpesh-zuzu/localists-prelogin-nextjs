"use client";
import React, { useRef } from "react";
import {
    BREADCRUM_DATA_ROOFERS_MIDDLESBROUGH,
    ROOFERS_FREQUENTLY_DATA_MIDDLESBROUGH,
    POPULAR_SERVICES_ROOFERS_MIDDLESBROUGH,
    QUESTION_AND_ABOUT_SERVICE_ROOFERS_MIDDLESBROUGH,
    ROOFERS_ADVICEINSIGHT_MIDDLESBROUGH,
    ROOFERS_FEEDBACK_MIDDLESBROUGH,
    ROOFERS_DATA_MIDDLESBROUGH,
    ROOFERS_TABDATA_MIDDLESBROUGH,
    VETTED_DATA_ROOFERS_MIDDLESBROUGH,
    NEARBY_PLACES_ROOFER_MIDDLESBROUGH
} from "./RoofersInMiddlesbroughData";
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
import WrapperBGWidth from "@/app/component/common/WrapperBGWidth/WrapperBGWidth";
import PostCodeSectionLocation2 from "../../PostCodeSectionLocation2";
import NearbyPlaces from "@/app/component/common/NearByPlaces/NearbyPlaces";

function RoofersInMiddlesbrough() {
    useScrollToTop()
    useRegistrationRedirect()
    const featureRef = useRef(null);
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
            <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_MIDDLESBROUGH} />
            <HeroSectionLocation 
                heading1="Roofers"
                heading2="Middlesbrough"
                description="Looking for a trusted and reliable roofer in Middlesbrough? Look no further! Enter your postcode, a few details about your project and receive free, no obligation quotes from the best quality roofers in the area. Only takes a minute."
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                bannerImageMobile="/location/roofing_location.webp"
                altText="A roofer installing a new roof by securing clay tiles with a drill"
                blackHeadinginline="inline"
                serviceId={113}
                serviceName="Roofing"
            />
            <VettedSection
                paragraph={VETTED_DATA_ROOFERS_MIDDLESBROUGH}
                vettedHeading1="Find Local Roofers in "
                vettedHeading2="Middlesborough"
                breadcrumb={BREADCRUM_DATA_ROOFERS_MIDDLESBROUGH}
                extraButton
                featureRef={featureRef}
            />

            <PopularJobNearMe
                services={POPULAR_SERVICES_ROOFERS_MIDDLESBROUGH}
                popularImage="/nearme/Roofing/roofslate.webp"
                altText="A roofer installing a new roof by securing clay tiles with a drill"
                mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
                paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-0 xl:px-[120px] pt-0 xl:pb-[0px]"
            />
            <AboutServicesAndQuestions
                serviceId={113}
                serviceName="Roofing"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_MIDDLESBROUGH}
            />

            <div ref={featureRef} style={{ overflowAnchor: "none" }}>
                <Feature county='North Yorkshire' cityName='Middlesbrough' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
            </div>

            <HireRelatedToServiceNearMe
                heading1="Hire with"
                heading2="confidence."
                tabData={ROOFERS_TABDATA_MIDDLESBROUGH}
                activeTabkey="popular"
            />
            <AdviceInsightNearMe
                articles={ROOFERS_ADVICEINSIGHT_MIDDLESBROUGH}
                padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
            />
            <WrapperBGWidth>
                <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
                    <PostCodeSectionLocation2 classNamePostCode="mb-[30px] md:mb-10 mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={113} serviceName="Roofing" />
                </div>
            </WrapperBGWidth>
            <FAQ
                containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
                data={ROOFERS_FREQUENTLY_DATA_MIDDLESBROUGH}
            />
            <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_MIDDLESBROUGH} />
            <DiscoverNearMe homeData={ROOFERS_DATA_MIDDLESBROUGH} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                desktopImage="/nearme/Roofing/roofingmember.webp"
                mobileImage="/nearme/Roofing/roofingmembermobile.webp"
            />
            <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_MIDDLESBROUGH} />
            <Footer />
        </>
    );
}
export default RoofersInMiddlesbrough;