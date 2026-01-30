"use client"

import React from "react";
// import HeroSectionNearMe from "../HeroSectionNearMe";
// import PaddingWrapper from "../PaddingWrapper";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
 QUESTION_AND_ABOUT_SERVICE_LANDSCAPE_NEARME,
FREQUENTLY_DATA_LANDSCAPE_NEARME,
// ADVICEINSIGHT_LANDSCAPE_NEARME,
LANDSCAPE_NEARME_TABDATA,
VETTED_DATA_LANDSCAPE_NEARME,
BREADCRUM_DATA_LANDSCAPE_NEARME,
POPULAR_SERVICES_LANDSCAPE_NEARME,
FEEDBACK_LANDSCAPE_NEARME,
DISCOVER_LANDSCAPE_NEARME_DATA

} from "./LandscaperGardenNearmeData";
// import DiscoverServices from "../../Home/DiscoverServices/DiscoverServices";
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



const HeroSectionNearMe = dynamic(() => import("../HeroSectionNearMe"), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
      <LoaderIndicator size="large" />
    </div>
  ),
  ssr: true,
});

// const FAQ = dynamic(() => import("../FAQ"), { ssr: false });

const CloseBrowserAbandon = dynamic(
  () => import("../../common/CloseBrowserAbandon/CloseBrowserAbandon"),
  { ssr: false }
);

function LandscapeGardenNearme() {
  usePendingBuyerRedirect()
  return (
    <>
      <CloseBrowserAbandon />
      <FAQScript FAQ={FREQUENTLY_DATA_LANDSCAPE_NEARME["tree-surgeons-near-me"]} />
      <HeroSectionNearMe
        heading1=" Find Landscape Gardeners"
        heading2="Near You"
        description="Find the best landscape gardeners near you! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss. "
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        bannerImageMobile="/nearme/Landscaping/landscapingMobile.webp"
        altText="A Landscaper carefully laying a large concrete slab amongst a garden of flowers and grey pebble dash"
      />
      <VettedSection
        paragraph={VETTED_DATA_LANDSCAPE_NEARME}
        vettedHeading1="Vetted landscape gardeners you can "
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_LANDSCAPE_NEARME}
      />
      <PopularJobNearMe
        services={POPULAR_SERVICES_LANDSCAPE_NEARME}
        popularImage="/nearme/Landscaping/pathwayPopularJob.png"
        altText="a tree surgeon cutting the branches of an evergreen tree"
      />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToServiceNearMe
        heading1="Landscaping Specialists"
        heading2="in your area"
        tabData={LANDSCAPE_NEARME_TABDATA}
      />
      <UserFeedbackNearMe2 feedbackData={FEEDBACK_LANDSCAPE_NEARME} />
      {/* <PaddingWrapper> */}
      <AboutServicesAndQuestions contentBlocks={QUESTION_AND_ABOUT_SERVICE_LANDSCAPE_NEARME} />
      {/* </PaddingWrapper> */}
      <FAQ data={FREQUENTLY_DATA_LANDSCAPE_NEARME} />
      {/* <AdviceInsightNearMe maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} /> */}
      <DiscoverNearMe homeData={DISCOVER_LANDSCAPE_NEARME_DATA} />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default LandscapeGardenNearme;
