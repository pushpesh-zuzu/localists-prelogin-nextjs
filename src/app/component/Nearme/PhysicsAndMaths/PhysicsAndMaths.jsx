"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_PHYSICS_AND_MATHS,
    FREQUENTLY_DATA_PHYSICS_AND_MATHS,
    QUESTION_AND_ABOUT_SERVICE,
    PHYSICS_AND_MATHS_FEEDBACK,
    PHYSICS_AND_MATHS_DATA,
    PHYSICS_AND_MATHS_TABDATA,
    VETTED_DATA_PHYSICS_AND_MATHS,
} from "./PhysicsAndMathsData";
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
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";

const HeroSectionPhysicsAndMaths = dynamic(() => import("../HeroSectionPhysicsAndMaths"), {
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

function PhysicsAndMaths() {
    usePendingBuyerRedirect()
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_PHYSICS_AND_MATHS["physics-maths-tutors-near-me"]} />
            <HeroSectionPhysicsAndMaths
                heading1="Find Physics and Maths"
                headingMiddle="Tutor"
                heading2="Near You or Online"
                description="Find trusted physics and maths tutors near you. Enter your postcode and learning needs to receive 5 tailored quotes. Free. No obligation. No hassle."
                bannerImage="/nearme/physics-maths.webp"
                bannerImageMobile="/nearme/physicsmobile.webp"
                altText="Physics and Maths Tutor"
                serviceId=""
                serviceName="Physics And Maths"
            />
            <VettedSection
                paragraph={VETTED_DATA_PHYSICS_AND_MATHS}
                vettedHeading1="Vetted physics and maths tutors you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_PHYSICS_AND_MATHS}
            />

            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Physics and Maths Tutors"
                heading2="in your area"
                tabData={PHYSICS_AND_MATHS_TABDATA}
            />
            <UserFeedbackNearMe feedbackData={PHYSICS_AND_MATHS_FEEDBACK} serviceId=""
                serviceName="Physics And Maths" />
            <AboutServicesAndQuestions
                serviceId=""
                serviceName="Physics And Maths"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_PHYSICS_AND_MATHS["physics-maths-tutors-near-me"]}
            />
            <DiscoverNearMe homeData={PHYSICS_AND_MATHS_DATA} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default PhysicsAndMaths;
