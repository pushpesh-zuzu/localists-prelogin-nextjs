"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_ROOFERS,
    FREQUENTLY_DATA_ROOFING,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    ROOFING_FEEDBACK,
    ROOFING_DATA,
    ROOFING_TABDATA,
    VETTED_DATA_ROOFERS,
} from "./RoofingData";
import { FAQ } from "../FAQ";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
// import UserFeedbackNearMe from "../UserFeedbackNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
// import DrivewayPopularJobNearMe from "./DrivewayPopularJobNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import FenceGatePopularJobNearMe from "../FenceAndGateInstallation/FenceGatePopularJobNearMe";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";

const HeroSectionNearMe = dynamic(() => import("../HeroSectionNearMe"), {
    loading: () => (
        <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
            <LoaderIndicator size="large" />
        </div>
    ),
    ssr: true,
});

const CloseBrowserAbandon = dynamic(
    () => import("../../common/CloseBrowserAbandon/CloseBrowserAbandon"),
    { ssr: false }
);

function RoofingNearMe() {
    usePendingBuyerRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_ROOFING} />
            <HeroSectionNearMe
                heading1="Find Roofers"
                heading2="Near You"
                description="Find the best roofers near you! Just enter your postcode and a few details to get 5 free roofing quotes from local roofers in minutes!"
                bannerImage="/nearme/Roofing/roofingbanner.webp"
                bannerImageMobile="/nearme/Roofing/roofingmobile.webp"
                altText="Professional roofers roofing a new build with ceramic roof tiles"
                serviceId={113}
                serviceName="Roofing"
            />
            <VettedSection
                paragraph={VETTED_DATA_ROOFERS}
                vettedHeading1="Vetted roofers you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_ROOFERS}
            />
            <FenceGatePopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/Roofing/roofslate.webp"
                altText="two roofers installing slate tiles onto a brand new roof URL"
                ctaLink="/en/gb/roofing-multi-form-ppc"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Roofers"
                heading2="in your area"
                tabData={ROOFING_TABDATA}
            />
            <UserFeedbackNearMe2 feedbackData={ROOFING_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId={113}
                serviceName="Roofing"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_ROOFING}
            />

            <DiscoverNearMe homeData={ROOFING_DATA} />

            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default RoofingNearMe;
