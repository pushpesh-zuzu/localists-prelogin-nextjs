"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
  BREADCRUM_DATA_ARCHITECTS,
  FREQUENTLY_DATA_ARCHITECTS,
  POPULAR_SERVICES_ARCHITECTS,
  QUESTION_AND_ABOUT_SERVICE_ARCHITECTS,
  // ARCHITECTS_ADVICEINSIGHT,
  FEEDBACK_ARCHITECTS,
  ARCHITECTS_DATA,
  ARCHITECTS_TABDATA,
  VETTED_DATA_ARCHITECTS,
} from "./ArchitectsData";

import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
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

function ArchitectsNearMe() {
  usePendingBuyerRedirect()
  useScrollToTop()
  return (
    <>
      {typeof window !== 'undefined' && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_ARCHITECTS} />
      <HeroSectionNearMe
        heading1="Find Architects"
        heading2="Near You"
        description="Find the best roofers near you! Just enter your postcode and a few details to get 5 free quotes from local architects."
        bannerImage="/nearme/Architects/architectBanner.webp"
        bannerImageMobile="/nearme/Architects/architectBannerMobile.webp"
        altText="Two residential architects adjusting and conversing over a conceptual design"
        serviceId=""
        serviceName=""
      />
      <VettedSection
        paragraph={VETTED_DATA_ARCHITECTS}
        vettedHeading1="Vetted Local Architects you can"
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_ARCHITECTS}
      />
      <PopularJobNearMe
        services={POPULAR_SERVICES_ARCHITECTS}
        popularImage="/nearme/Architects/ArchitectPopularJob.webp"
        altText="two architects on site looking at a new building in the distance"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        // ctaLink="/en/gb/tree-surgeon-multi-form-ppc"
      />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToServiceNearMe
        showRightTabButtons
        heading1="Architects"
        heading2="in your area"
        tabData={ARCHITECTS_TABDATA}
        heightClass="min-h-[400px] h-auto md:h-auto lg:h-auto"
      />
      <UserFeedbackNearMe2 feedbackData={FEEDBACK_ARCHITECTS} />
      {/* <PaddingWrapper> */}
      <AboutServicesAndQuestions serviceId="" serviceName="" contentBlocks={QUESTION_AND_ABOUT_SERVICE_ARCHITECTS} />
      {/* </PaddingWrapper> */}
      <FAQ data={FREQUENTLY_DATA_ARCHITECTS} />
      {/* <AdviceInsightNearMe maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} /> */}
      <DiscoverNearMe homeData={ARCHITECTS_DATA} />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default ArchitectsNearMe;
