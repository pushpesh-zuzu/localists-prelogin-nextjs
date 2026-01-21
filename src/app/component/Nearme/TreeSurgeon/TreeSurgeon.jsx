import React from "react";
// import HeroSectionNearMe from "../HeroSectionNearMe";
import PaddingWrapper from "../PaddingWrapper";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
  BREADCRUM_DATA_TREESURGEON,
  FREQUENTLY_DATA_TREE_SURGEON,
  POPULAR_SERVICES,
  QUESTION_AND_ABOUT_SERVICE,
  TREE_SRUGEON_ADVICEINSIGHT,
  TREE_SUREON_FEEDBACK,
  TREE_SURGEON_TABDATA,
  VETTED_DATA_TREE_SURGEON,
} from "./TreeSurgeonData";
import DiscoverServices from "../../Home/DiscoverServices/DiscoverServices";
// import Feature from "../Feature";
import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import UserFeedbackNearMe from "../UserFeedbackNearMe";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import AdviceInsightNearMe from "../AdviceInsightNearMe";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Find Quality Tree Surgeons Near Me | Localists",
  description:
    "Find fully qualified tree surgeons near me. Certified and skilled arborists. Safe tree removal & pruning. Get free quotes from local experts in your area.",
};

const HeroSectionNearMe = dynamic(() => import("../HeroSectionNearMe"), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 animate-spin" />
      </div>
    </div>
  ),
});

function TreeSurgeon() {
  return (
    <>
      <CloseBrowserAbandon />
      <HeroSectionNearMe
        heading1="Find Tree Surgeons"
        heading2="Near You"
        description="Get free, no-obligation quotes from the highest quality tree surgeons in your area. Enter your postcode below, and give us a few details about your project - It takes under a minute!"
        bannerImage="/nearme/treeSurgeon.webp"
        bannerImageMobile="/nearme/treeSurgeon1.webp"
        altText="Tree Surgeon Hanging From a Tree trimming branches with a chainsaw"
      />
      <VettedSection
        paragraph={VETTED_DATA_TREE_SURGEON}
        vettedHeading1="Vetted tree surgeons you can"
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_TREESURGEON}
      />
      <PopularJobNearMe
        services={POPULAR_SERVICES}
        popularImage="/nearme/treeSurgeonNearmeRounded.webp"
        altText="a tree surgeon cutting the branches of an evergreen tree"
      />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToServiceNearMe
        heading1="Tree surgeons"
        heading2="in your area"
        tabData={TREE_SURGEON_TABDATA}
      />
      <UserFeedbackNearMe feedbackData={TREE_SUREON_FEEDBACK} />
      {/* <PaddingWrapper> */}
      <AboutServicesAndQuestions contentBlocks={QUESTION_AND_ABOUT_SERVICE} />
      {/* </PaddingWrapper> */}
      <FAQ data={FREQUENTLY_DATA_TREE_SURGEON["tree-surgeons-near-me"]} />
      <AdviceInsightNearMe maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} />
      <DiscoverServices />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default TreeSurgeon;
