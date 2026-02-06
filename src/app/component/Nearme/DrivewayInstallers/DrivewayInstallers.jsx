"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_DRIVEWAY,
    FREQUENTLY_DATA_DRIVEWAY_INSTALLERS,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    DRIVEWAY_INSTALLERS_FEEDBACK,
    DRIVEWAY_INSTALLERS_DATA,
    DRIVEWAY_INSTALLERS_TABDATA,
    VETTED_DATA_DRIVEWAY_INSTALLER,
} from "./DrivewayInstallersData";
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
import DrivewayPopularJobNearMe from "./DrivewayPopularJobNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
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

function DrivewayInstallers() {
    usePendingBuyerRedirect();
    useScrollToTop()

    return (
        <>
            <CloseBrowserAbandon />
            <FAQScript FAQ={FREQUENTLY_DATA_DRIVEWAY_INSTALLERS["driveway-installers-near-me"]} />
            <HeroSectionNearMe
                heading1="Find Driveway"
                headingMiddle="Installers"
                heading2="Near You"
                description="Find the best driveway installers near you! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
                bannerImage="/nearme/Driveway-Installation-Page.webp"
                bannerImageMobile="/nearme/Driveway-mobile.webp"
                altText="New block paved Driveway being carefully Installed by a Driveway Installer"
                serviceId={51}
                serviceName="Driveway Installation"
            />
            <VettedSection
                paragraph={VETTED_DATA_DRIVEWAY_INSTALLER}
                vettedHeading1="Vetted driveway contractors you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_DRIVEWAY}
            />
            <DrivewayPopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/preparing-install-pavers.webp"
                altText="installer creating cement mix for block paving driveway installation"
                ctaLink="/en/gb/driveways-multi-form-ppc"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Driveway Installers"
                heading2="in your area"
                tabData={DRIVEWAY_INSTALLERS_TABDATA}
            />
            <UserFeedbackNearMe2 feedbackData={DRIVEWAY_INSTALLERS_FEEDBACK} />
            <AboutServicesAndQuestions
                serviceId={51}
                serviceName="Driveway Installation"
                contentBlocks={QUESTION_AND_ABOUT_SERVICE} />

            <FAQ
                data={FREQUENTLY_DATA_DRIVEWAY_INSTALLERS["driveway-installers-near-me"]}
            />

            <DiscoverNearMe homeData={DRIVEWAY_INSTALLERS_DATA} />

            <NearmeMember
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    );
}

export default DrivewayInstallers;
