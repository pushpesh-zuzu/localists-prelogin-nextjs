"use client";
import React, { useRef } from "react";
import {
    BREADCRUM_DATA_ROOFERS_ASHINGTON,
    ROOFERS_FREQUENTLY_DATA_ASHINGTON,
    POPULAR_SERVICES_ROOFERS_ASHINGTON,
    QUESTION_AND_ABOUT_SERVICE_ROOFERS_ASHINGTON,
    ROOFERS_ADVICEINSIGHT_ASHINGTON,
    ROOFERS_FEEDBACK_ASHINGTON,
    ROOFERS_DATA_ASHINGTON,
    ROOFERS_TABDATA_ASHINGTON,
    VETTED_DATA_ROOFERS_ASHINGTON,
    NEARBY_PLACES_ROOFER_ASHINGTON
} from "./RoofersInAshingtonData";
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


function RoofersInAshington() {
    useScrollToTop()
    useRegistrationRedirect()
    const featureRef = useRef(null);
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
            <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_ASHINGTON} />
            <HeroSectionLocation 
                heading1="Roofers"
                heading2="Ashington"
                description="Need a reliable roofer for repairs, replacement, or any type of roofing emergency in Ashington? Get free, no obligation quotes now from the highest quality roofers in your area. Enter your postcode and a few details and receive quotes to your inbox - takes only a minute!"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                bannerImageMobile="/location/roofing_location.webp"
                altText="A roofer installing a new roof by securing clay tiles with a drill"
                blackHeadinginline="inline"
                serviceId={113}
                serviceName="Roofing"
            />
            <VettedSection
                paragraph={VETTED_DATA_ROOFERS_ASHINGTON}
                vettedHeading1="Find Local Vetted Roofers in "
                vettedHeading2="Ashington"
                breadcrumb={BREADCRUM_DATA_ROOFERS_ASHINGTON}
                extraButton
                featureRef={featureRef}
            />

            <PopularJobNearMe
                services={POPULAR_SERVICES_ROOFERS_ASHINGTON}
                popularImage="/nearme/Roofing/roofslate.webp"
                altText="A roofer installing a new roof by securing clay tiles with a drill"
                mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
                paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-0 xl:px-[120px] pt-0 xl:pb-[0px]"
            />
            <AboutServicesAndQuestions
                serviceId={113}
                serviceName="Roofing"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_ASHINGTON}
            />

            <div ref={featureRef} style={{ overflowAnchor: "none" }}>
                <Feature county='Northumberland' cityName='Ashington' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
            </div>
            <HireRelatedToServiceNearMe
                            heading1="Hire with"
                            heading2="confidence."
                            tabData={ROOFERS_TABDATA_ASHINGTON}
                            activeTabkey="popular"
                        />
            <AdviceInsightNearMe
                articles={ROOFERS_ADVICEINSIGHT_ASHINGTON}
                padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
            />
            <WrapperBGWidth>
                <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
                    <PostCodeSectionLocation2 classNamePostCode="mb-[30px] md:mb-10 mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={113} serviceName="Roofing" />
                </div>
            </WrapperBGWidth>
            <FAQ
                containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
                data={ROOFERS_FREQUENTLY_DATA_ASHINGTON}
            />
            <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_ASHINGTON} />
            <DiscoverNearMe homeData={ROOFERS_DATA_ASHINGTON} />
           
            <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_ASHINGTON} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                desktopImage="/nearme/Roofing/roofingmember.webp"
                mobileImage="/nearme/Roofing/roofingmembermobile.webp"
            />
            <Footer />
        </>
    );
}
export default RoofersInAshington;