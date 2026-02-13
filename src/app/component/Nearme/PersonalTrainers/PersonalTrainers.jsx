"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_PERSONAL_TRAINERS,
    FREQUENTLY_DATA_PERSONAL_TRAINERS,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    PERSONAL_TRAINERS_FEEDBACK,
    PERSONAL_TRAINERS_DATA,
    PERSONAL_TRAINERS_TABDATA,
    VETTED_DATA_PERSONAL_TRAINERS,
} from "./PersonalTrainersData";
import { FAQ } from "../FAQ";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import FenceGatePopularJobNearMe from "../FenceAndGateInstallation/FenceGatePopularJobNearMe";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";
import UserFeedbackNearMe from "../UserFeedbackNearMe";

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

function PainterAndDecoratorNearMe() {
    usePendingBuyerRedirect();
    useScrollToTop()
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon />}
            <FAQScript FAQ={FREQUENTLY_DATA_PERSONAL_TRAINERS} />
            <HeroSectionNearMe
                heading1="Find Personal"
                headingMiddle="Trainers"
                heading2="Near You"
                description="Find the best personal trainers near you! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
                bannerImage="/nearme/personaltrainers/personaltrainers.webp"
                bannerImageMobile="/nearme/personaltrainers/trainersmobile.webp"
                altText="Personal trainer is showing a customer how to do correct lunges"
                serviceId=""
                serviceName=""
            />
            <VettedSection
                paragraph={VETTED_DATA_PERSONAL_TRAINERS}
                vettedHeading1="Vetted personal trainers you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_PERSONAL_TRAINERS}
            />
            <FenceGatePopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/personaltrainers/wightlift.webp"
                altText="WEIGHT LIFTER CHALKING HIS HAND, KNEELING DOWN TO COMPLETE A BARBELL DEADLIFT."
                ctaLink=""
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Personal Trainers"
                heading2="in your area"
                tabData={PERSONAL_TRAINERS_TABDATA}
            />
            <UserFeedbackNearMe feedbackData={PERSONAL_TRAINERS_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId=""
                serviceName=""
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_PERSONAL_TRAINERS}
            />

            <DiscoverNearMe homeData={PERSONAL_TRAINERS_DATA} />

            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default PainterAndDecoratorNearMe;
