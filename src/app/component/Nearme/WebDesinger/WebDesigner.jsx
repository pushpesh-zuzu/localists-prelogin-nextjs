"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_WEB_DESIGNER,
    FREQUENTLY_DATA_WEB_DESIGNER_INSTALLERS,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    WEB_DESIGNER_INSTALLERS_FEEDBACK,
    WEB_DESIGNER_INSTALLERS_DATA,
    WEB_DESIGNER_INSTALLERS_TABDATA,
    VETTED_DATA_WEB_DESIGNER_INSTALLER,
} from "./WebDesingerData";
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
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";
import PopularJobNearMe from "../PopularJobNearMe";

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

function WebDesigner() {
    usePendingBuyerRedirect();
    useScrollToTop()

    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_WEB_DESIGNER_INSTALLERS["driveway-installers-near-me"]} />
            <HeroSectionNearMe
                heading1="Find Web Designers"
                heading2="Near You"
                description="Find the expert website desiner agency near you! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
                bannerImage="/nearme/WebsiteDesingner/webDesingDesktop.webp"
                bannerImageMobile="/nearme/WebsiteDesingner/webDesingMobile.webp"
                altText="designer-working-on-laptop-"
                serviceId="19"
                serviceName="Web Design"
                blackHeadinginline="inline md:block"
            />
            <VettedSection
                paragraph={VETTED_DATA_WEB_DESIGNER_INSTALLER}
                vettedHeading1="Vetted web designer agency you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_WEB_DESIGNER}
            />
            <PopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/WebsiteDesingner/WebPopularJobs.webp"
                altText="installer creating cement mix for website desinger"
            // ctaLink="/en/gb/driveways-multi-form-ppc"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                showRightTabButtons
                heading1="Web Desinger Agency"
                heading2="in your area"
                tabData={WEB_DESIGNER_INSTALLERS_TABDATA}
                heightClass="min-h-[400px] h-auto md:h-auto lg:h-auto]"

            />
            <UserFeedbackNearMe2 feedbackData={WEB_DESIGNER_INSTALLERS_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId="19"
                serviceName="Web Design"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_WEB_DESIGNER_INSTALLERS["driveway-installers-near-me"]}
            />

            <DiscoverNearMe background="#f7f7f7f7" homeData={WEB_DESIGNER_INSTALLERS_DATA} />

            <NearmeMember
                userName="Marie"
                desktopImage="/nearme/WebsiteDesingner/webDesingMebmerDesktop.webp"
                mobileImage="/nearme/WebsiteDesingner/webDesingMebmerMobile.webp"
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default WebDesigner;
