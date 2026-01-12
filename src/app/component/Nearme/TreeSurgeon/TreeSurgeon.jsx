import React from "react";
import HeroSectionNearMe from "../HeroSectionNearMe";
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
import AdviceInsight from "../../Home/AdviceInsight/AdviceInsight";
import HireRelatedToService from "../../Home/HireRelatedToService/HireRelatedToService";
import UserFeedback from "../../Home/UserFeedback/UserFeedback";
// import Feature from "../Feature";
import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";

function TreeSurgeon() {
  return (
    <>
      <HeroSectionNearMe
        heading1="Find Tree Surgeons"
        heading2="Near You."
        description="Find the best tree surgeons for your job, just enter your postcode and a few details for instant quotes."
        bannerImage="/nearme/treeSurgeon.webp"
        altText="Tree Surgeon"
      />
      <VettedSection
        paragraph={VETTED_DATA_TREE_SURGEON}
        vettedHeading1="Vetted tree surgeons you can"
        vettedHeading2="trust."
        breadcrumb={BREADCRUM_DATA_TREESURGEON}
      />
      <PopularJobNearMe services={POPULAR_SERVICES} />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToService tabData={TREE_SURGEON_TABDATA} />
      <UserFeedback feedbackData={TREE_SUREON_FEEDBACK} />
      <PaddingWrapper>
        <AboutServicesAndQuestions contentBlocks={QUESTION_AND_ABOUT_SERVICE} />
      </PaddingWrapper>
      <FAQ data={FREQUENTLY_DATA_TREE_SURGEON["tree-surgeons-near-me"]} />
      <AdviceInsight maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} />
      <DiscoverServices />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default TreeSurgeon;
