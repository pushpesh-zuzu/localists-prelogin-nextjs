"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_PAINTER_DECORATOR,
    FREQUENTLY_DATA_PAINTER_DECORATOR,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    PAINTER_DECORATOR_FEEDBACK,
    PAINTER_DECORATOR_DATA,
    PAINTER_DECORATOR_TABDATA,
    VETTED_DATA_PAINTER_DECORATOR,
} from "./PainterAndDecoratorData";
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

function PainterAndDecoratorNearMe() {
    usePendingBuyerRedirect();
    useScrollToTop()
    return (
        <>
            {typeof window !== "undefined" && <CloseBrowserAbandon />}
            <FAQScript FAQ={FREQUENTLY_DATA_PAINTER_DECORATOR} />
            <HeroSectionNearMe
                heading1="Find Painters And"
                headingMiddle="Decorators"
                heading2="Near You"
                description="Find reliable painters and decorators in your area. Enter your postcode and a few details to receive instant quotes."
                bannerImage="/nearme/painter/Painter.webp"
                bannerImageMobile="/nearme/painter/painter-mobile.webp"
                altText="Painter pouring paint into a paint tray with clips roller"
                serviceId=""
                serviceName=""
            />
            <VettedSection
                paragraph={VETTED_DATA_PAINTER_DECORATOR}
                vettedHeading1="Vetted painters and decorators you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_PAINTER_DECORATOR}
            />
            <FenceGatePopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/painter/paintTray.webp"
                altText="Decorator with a tray full of magnolia dipping his brush in ready to paint the walls"
                ctaLink=""
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Painting and Decorating Experts"
                heading2="in your area"
                tabData={PAINTER_DECORATOR_TABDATA}
            />
            <UserFeedbackNearMe2 feedbackData={PAINTER_DECORATOR_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId=""
                serviceName=""
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_PAINTER_DECORATOR}
            />

            <DiscoverNearMe homeData={PAINTER_DECORATOR_DATA} />

            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default PainterAndDecoratorNearMe;
