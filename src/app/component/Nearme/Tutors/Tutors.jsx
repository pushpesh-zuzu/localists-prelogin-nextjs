"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_TUTORS,
    FREQUENTLY_DATA_TUTORS,
    QUESTION_AND_ABOUT_SERVICE,
    TUTORS_FEEDBACK,
    TUTORS_DATA,
    TUTORS_TABDATA,
    VETTED_DATA_TUTORS,
} from "./TutorsData";
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
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";
import HeroSectionNearMeOtherTheHome from "../HeroSectionNearMeOtherTheHome";

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

function Tutors() {
    usePendingBuyerRedirect()
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_TUTORS["tutors-near-me"]} />
            <HeroSectionNearMeOtherTheHome
                heading1="Find Tutors"
                heading2="Near You"
                description="Find the best tutors near you for any subject. Enter your postcode and requirements to get 5 tailored quotes. Free. No obligation. No fuss."
                bannerImage="/nearme/tutors.webp"
                bannerImageMobile="/nearme/tutorsmobile.webp"
                altText="Tutors"
                serviceId="118"
                serviceName="Tutoring"
            />
            <VettedSection
                paragraph={VETTED_DATA_TUTORS}
                vettedHeading1="Vetted tutors you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_TUTORS}
            />

            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                showRightTabButtons
                heading1="Tutors"
                heading2="in your area"
                tabData={TUTORS_TABDATA}
                heightClass="min-h-[390px] md:min-h-[460px] [@media(max-width:360px)]:min-h-[388px]  h-auto md:h-auto lg:h-auto"

            />
            <UserFeedbackNearMe2 feedbackData={TUTORS_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId="118"
                serviceName="Tutoring"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_TUTORS["tutors-near-me"]}
            />
            <DiscoverNearMe background="#f7f7f7f7" homeData={TUTORS_DATA} />
            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default Tutors;
