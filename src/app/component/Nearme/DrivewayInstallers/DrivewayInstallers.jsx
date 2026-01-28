"use client"

import React from "react";
import VettedSection from "../VettedSection";
// import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
    BREADCRUM_DATA_DRIVEWAY,
    FREQUENTLY_DATA_TREE_SURGEON,
    POPULAR_SERVICES,
    QUESTION_AND_ABOUT_SERVICE,
    // TREE_SRUGEON_ADVICEINSIGHT,
    DRIVEWAY_INSTALLERS_FEEDBACK,
    TREE_SURGEON_DATA,
    DRIVEWAY_INSTALLERS_TABDATA,
    VETTED_DATA_DRIVEWAY_INSTALLER,
} from "./DrivewayInstallersData";
import { BREADCRUM_DATA_TREESURGEON } from "../TreeSurgeon/TreeSurgeonData";
// import DiscoverServices from "../../Home/DiscoverServices/DiscoverServices";
// import Feature from "../Feature";
// import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
// import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import UserFeedbackNearMe from "../UserFeedbackNearMe";
// import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
// import AdviceInsightNearMe from "../AdviceInsightNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
// import FAQScript from "../../common/seo/FAQScript";
// import DiscoverNearMe from "../DiscoverNearMe";

export const metadata = {
    title: "Find Driveway Companies & Driveway Contractors Near Me - Localists",
    description:
        " Find the best local driveway installers and contractors near you. Need resin bound, gravel or tarmac driveways? Get free quotes from local specialists nearby.",
};

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
    return (
        <>
            <CloseBrowserAbandon />
            {/* <FAQScript FAQ={FREQUENTLY_DATA_TREE_SURGEON["tree-surgeons-near-me"]} /> */}
            <HeroSectionNearMe
                heading1="Find Driveway Installers"
                heading2="Near You"
                description="Find the best driveway installers near you! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
                bannerImage="/nearme/Driveway-Installation-Page.webp"
                bannerImageMobile="/nearme/Driveway-mobile.webp"
                altText="New block paved Driveway being carefully Installed by a Driveway Installer"
            />
            <VettedSection
                paragraph={VETTED_DATA_DRIVEWAY_INSTALLER}
                vettedHeading1="Vetted driveway contractors you can"
                vettedHeading2="trust"
                breadcrumb={BREADCRUM_DATA_DRIVEWAY}
            />
            <PopularJobNearMe
                services={POPULAR_SERVICES}
                popularImage="/nearme/preparing-install-pavers.webp"
                altText="installer creating cement mix for block paving driveway installation"
            />
            <HowItWorkNearMe />
            <HireRelatedToServiceNearMe
                heading1="Driveway Installers"
                heading2="in your area"
                tabData={DRIVEWAY_INSTALLERS_TABDATA}
            />
            <UserFeedbackNearMe feedbackData={DRIVEWAY_INSTALLERS_FEEDBACK} />
            {/* <AboutServicesAndQuestions contentBlocks={QUESTION_AND_ABOUT_SERVICE} /> */}




            <Footer />
        </>
    );
}

export default DrivewayInstallers;
