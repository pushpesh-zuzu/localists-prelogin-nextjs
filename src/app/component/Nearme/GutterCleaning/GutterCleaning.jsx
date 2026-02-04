"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_GUTTER_CLEANING,
    FREQUENTLY_DATA_GUTTER_CLEANING,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    GUTTER_CLEANING_FEEDBACK,
    GUTTER_CLEANING_DATA,
    GUTTER_CLEANING_TABDATA,
    VETTED_DATA_GUTTER_CLEANING,
} from "./GutterCleaningData";
import { FAQ } from "../FAQ";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";
import GutterCleaningPopularJobNearMe from "./GutterCleaningPopularJobNearMe";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";

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

function GutterCleaning() {
    usePendingBuyerRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_GUTTER_CLEANING["gutter-cleaning-near-me"]} />
            <HeroSectionNearMe
                heading1="Find Gutter Cleaning"
                heading2="Near You"
                description="Find the best gutter cleaning experts in your area, just enter your postcode and a few details for instant quotes"
                bannerImage="/nearme/Gutter-Cleaning.webp"
                bannerImageMobile="/nearme/Gutter-cleaning_mobile.webp"
                altText="Close-up of dry autumn leaves piled in a house gutter and slate roof tiles."
                serviceId=""
                serviceName=""
            />
            <VettedSection
                paragraph={VETTED_DATA_GUTTER_CLEANING}
                vettedHeading1="Vetted gutter cleaners you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_GUTTER_CLEANING}
            />
            <GutterCleaningPopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/gutter-leaf.webp"
                altText="expert gutter cleaning using specialist leaf blower equipment"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Gutter Cleaning Experts"
                heading2="in your area"
                tabData={GUTTER_CLEANING_TABDATA}
            />
            <UserFeedbackNearMe2 feedbackData={GUTTER_CLEANING_FEEDBACK} serviceId=""
                serviceName="" />
            <AboutServicesAndQuestions
                serviceId=""
                serviceName=""
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_GUTTER_CLEANING["gutter-cleaning-near-me"]}
            />

            <DiscoverNearMe homeData={GUTTER_CLEANING_DATA} />

            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default GutterCleaning;
