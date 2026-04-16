"use client";
import React, { useRef } from "react";
import {
    BREADCRUM_DATA_ROOFERS_DONCASTER,
    FREQUENTLY_DATA_DONCASTER,
    POPULAR_SERVICES_ROOFERS_DONCASTER,
    QUESTION_AND_ABOUT_SERVICE_ROOFERS_DONCASTER,
    ROOFERS_ADVICEINSIGHT_DONCASTER,
    ROOFERS_FEEDBACK_DONCASTER,
    ROOFERS_DATA_DONCASTER,
    ROOFERS_TABDATA_DONCASTER,
    VETTED_DATA_ROOFERS_DONCASTER,
    NEARBY_PLACES_ROOFER_DONCASTER
} from "./RoofersInDoncasterData";
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
import PostCodeSectionLocation2 from "../../PostCodeSectionLocation2";
import NearbyPlaces from "@/app/component/common/NearByPlaces/NearbyPlaces";
import WrapperBGWidth from "../../../common/WrapperBGWidth/WrapperBGWidth";

function RoofersInDoncaster() {
    useScrollToTop()
    useRegistrationRedirect()
    const featureRef = useRef(null);
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
            <FAQScript FAQ={FREQUENTLY_DATA_DONCASTER} />
            <HeroSectionLocation 
                heading1="Roofers"
                heading2="Doncaster"
                description="Get free no-obligation quotes from the highest quality roofers working across Doncaster. Just enter your postcode now, give us a few details, and receive quotes in your inbox. It’s that easy and takes under a minute."
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                bannerImageMobile="/location/roofing_location.webp"
                altText="A roofer installing a new roof by securing clay tiles with a drill"
                blackHeadinginline="block md:inline"
                serviceId={113}
                serviceName="Roofing"
            />
            <VettedSection
                paragraph={VETTED_DATA_ROOFERS_DONCASTER}
                vettedHeading1="Find Local Vetted Roofers in "
                vettedHeading2="Doncaster"
                breadcrumb={BREADCRUM_DATA_ROOFERS_DONCASTER}
                extraButton
                featureRef={featureRef}
            />

            <PopularJobNearMe
                services={POPULAR_SERVICES_ROOFERS_DONCASTER}
                popularImage="/nearme/Roofing/roofslate.webp"
                altText="two roofers installing slate tiles onto a brand new roof URL"
                mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
                paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-0 xl:px-[120px] pt-0 xl:pb-[0px]"
            />
            <AboutServicesAndQuestions
                serviceId={113}
                serviceName="Roofing"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_DONCASTER}
            />

            <div ref={featureRef} style={{ overflowAnchor: "none" }}>
                <Feature county='South Yorkshire' cityName='Doncaster' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
            </div>

            <HireRelatedToServiceNearMe
                heading1="Hire with"
                heading2="confidence."
                tabData={ROOFERS_TABDATA_DONCASTER}
                activeTabkey="popular"
            />
            <AdviceInsightNearMe
                articles={ROOFERS_ADVICEINSIGHT_DONCASTER}
                padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
            />
            <WrapperBGWidth>
                <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
                    <PostCodeSectionLocation2 classNamePostCode="mb-[30px] md:mb-10 mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={113} serviceName="Roofing" />
                </div>
            </WrapperBGWidth>
            <FAQ
                containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
                headdingblue="FAQ's"
                headingblack=""
                data={FREQUENTLY_DATA_DONCASTER}
            />
            <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_DONCASTER} />
            <DiscoverNearMe homeData={ROOFERS_DATA_DONCASTER} />
            <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_DONCASTER} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                desktopImage="/nearme/Roofing/roofingmember.webp"
                mobileImage="/nearme/Roofing/roofingmembermobile.webp"
            />
            <Footer />
        </>
    );
}
export default RoofersInDoncaster;