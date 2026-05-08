"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_BOOKKEEPERS,
    FREQUENTLY_DATA_BOOKKEEPERS,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    BOOKKEEPERS_FEEDBACK,
    BOOKKEEPERS_DATA,
    BOOKKEEPERS_TABDATA,
    VETTED_DATA_BOOKKEEPERS,
} from "./BookKeepersData";
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

function BookKeepersNearMe() {
    usePendingBuyerRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_BOOKKEEPERS} />
            <HeroSectionNearMe
                heading1="Find Bookkeepers"
                heading2="Near You"
                description="Tell us where you need it?"
                bannerImage="/nearme/BookKeeping/bookkeeping_banner1.webp"
                bannerImageMobile="/nearme/BookKeeping/bookKeeping_mobile.webp"
                altText="Professional roofers roofing a new build with ceramic roof tiles"
                serviceId=""
                serviceName=""
            />
            <VettedSection
                paragraph={VETTED_DATA_BOOKKEEPERS}
                vettedHeading1="Vetted bookkeepers you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_BOOKKEEPERS}
            />
            <FenceGatePopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/BookKeeping/bookkeeping_jobs.webp"
                altText="two roofers installing slate tiles onto a brand new roof URL"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                showRightTabButtons
                heading1="Bookkeepers"
                heading2="in your area"
                tabData={BOOKKEEPERS_TABDATA}
                heightClass="min-h-[392px] [@media(max-width:360px)]:min-h-[392px]  h-auto md:h-auto lg:h-auto"

            />
            <UserFeedbackNearMe2 feedbackData={BOOKKEEPERS_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId=""
                serviceName=""
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_BOOKKEEPERS}
            />

            <DiscoverNearMe background="#f7f7f7f7" homeData={BOOKKEEPERS_DATA} />

            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                desktopImage="/nearme/BookKeeping/bookkeeping-member.webp"
                mobileImage="/nearme/BookKeeping/bookkeeping-member.webp"
            />
            <Footer />
        </>
    );
}

export default BookKeepersNearMe;
