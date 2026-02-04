"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_FENCE_AND_GATE,
    FREQUENTLY_DATA_FENCE_AND_GATE,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    FENCE_AND_GATE_FEEDBACK,
    FENCE_AND_GATE_DATA,
    FENCE_AND_GATE_TABDATA,
    VETTED_DATA_FENCE_AND_GATE,
} from "./FenceAndGateInstallationData";
import { FAQ } from "../FAQ";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import UserFeedbackNearMe from "../UserFeedbackNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import FenceGatePopularJobNearMe from "./FenceGatePopularJobNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";

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

function FenceAndGateInstallation() {
    usePendingBuyerRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_FENCE_AND_GATE["fencing-contractors-near-me"]} />
            <HeroSectionNearMe
                heading1="Find Fencing Contractors"
                heading2="Near You"
                description="Find the best fencing contractors for your job, just enter your postcode and a few details for instant quotes."
                bannerImage="/nearme/Fencing-Contractors.webp"
                bannerImageMobile="/nearme/fencing-contractor-mobile.webp"
                altText="Worker drilling metal fence panel"
                serviceId={49}
                serviceName="Fence & Gate Installation"
            />
            <VettedSection
                paragraph={VETTED_DATA_FENCE_AND_GATE}
                vettedHeading1="Vetted fence builders you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_FENCE_AND_GATE}
            />
            <FenceGatePopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/fencing-fixing.webp"
                altText="fencing contractor fixing a fence"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Fencing Contractors"
                heading2="in your area"
                tabData={FENCE_AND_GATE_TABDATA}
            />
            <UserFeedbackNearMe feedbackData={FENCE_AND_GATE_FEEDBACK} serviceId={49}
                serviceName="Fence & Gate Installation" />
            <AboutServicesAndQuestions
                serviceId={49}
                serviceName="Fence & Gate Installation"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />
            <FAQ
                data={FREQUENTLY_DATA_FENCE_AND_GATE["fencing-contractors-near-me"]}
            />
            <DiscoverNearMe homeData={FENCE_AND_GATE_DATA} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default FenceAndGateInstallation;
