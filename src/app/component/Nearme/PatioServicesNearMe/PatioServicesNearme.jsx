"use client";

import React from "react";
// import HeroSectionNearMe from "../HeroSectionNearMe";
// import PaddingWrapper from "../PaddingWrapper";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
// import Feature from "../Feature";
import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
// import UserFeedbackNearMe from "../UserFeedbackNearMe";
// import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
// import AdviceInsightNearMe from "../AdviceInsightNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";
import {
  PATIO_SERVICES_NEARME_TABDATA,
  BREADCRUM_DATA_PATIO_SERVICES_NEARME,
  DISCOVER_PATIO_SERVICES_NEARME_DATA,
  FEEDBACK_PATIO_SERVICES_NEARME,
  FREQUENTLY_DATA_PATIO_SERVICES_NEARME,
  POPULAR_SERVICES_PATIO_SERVICES_NEARME,
  QUESTION_AND_ABOUT_SERVICE_PATIO_SERVICES_NEARME,
  VETTED_DATA_PATIO_SERVICES_NEARME,
} from "./PatioServicesData";

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
  { ssr: false },
);

function PatioServicesNearme() {
  usePendingBuyerRedirect();
  return (
    <>
      <CloseBrowserAbandon />
      <FAQScript FAQ={FREQUENTLY_DATA_PATIO_SERVICES_NEARME} />
      <HeroSectionNearMe
        heading1="Find Patio Layers"
        heading2="Near You"
        description="Find the best patio layers for your job, just enter your postcode and a few details for instant quotes."
        bannerImage="/nearme/Patio/patioServicesNearme.webp"
        bannerImageMobile="/nearme/Patio/patioServicesNearmeMobile.webp"
        altText="Expert patio installer with gloves on, laying paver bricks on large patio"
        serviceId={54}
        serviceName="Patio Laying"
      />
      <VettedSection
        paragraph={VETTED_DATA_PATIO_SERVICES_NEARME}
        vettedHeading1="Verified patio layers you can "
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_PATIO_SERVICES_NEARME}
      />

      <PopularJobNearMe
        services={POPULAR_SERVICES_PATIO_SERVICES_NEARME}
        popularImage="/nearme/Patio/PatioServicesPopularJobs.webp"
        altText="stone paver patio installation in progress with drainage installed"
      />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToServiceNearMe
        heading1="Patio specialists " 
        heading2="in your area"
        tabData={PATIO_SERVICES_NEARME_TABDATA}
      /> 
      <UserFeedbackNearMe2 feedbackData={FEEDBACK_PATIO_SERVICES_NEARME} />
      {/* <PaddingWrapper> */}
      <AboutServicesAndQuestions
        serviceId={54}
        serviceName="Artificial Grass Installation"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_PATIO_SERVICES_NEARME}
      />
      {/* </PaddingWrapper> */}
      <FAQ data={FREQUENTLY_DATA_PATIO_SERVICES_NEARME} />
      {/* <AdviceInsightNearMe maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} /> */}
      <DiscoverNearMe homeData={DISCOVER_PATIO_SERVICES_NEARME_DATA} />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default PatioServicesNearme;
