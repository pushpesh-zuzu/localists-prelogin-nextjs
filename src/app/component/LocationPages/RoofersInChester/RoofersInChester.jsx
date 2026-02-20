"use client";
import React from "react";
import {
  BREADCRUM_DATA_TREESURGEON_CHESTER,
  FREQUENTLY_DATA_TREE_SURGEON_CHESTER,
  POPULAR_SERVICES_CHESTER,
  QUESTION_AND_ABOUT_SERVICE_CHESTER,
  // TREE_SRUGEON_ADVICEINSIGHT_CHESTER,
  TREE_SUREON_FEEDBACK_CHESTER,
  // TREE_SURGEON_DATA_CHESTER,
  // TREE_SURGEON_TABDATA_CHESTER,
  VETTED_DATA_TREE_SURGEON_CHESTER,
} from "./RoofersInChesterData";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import HeroSectionNearMe from "../../Nearme/HeroSectionNearMe";
import VettedSection from "../../Nearme/VettedSection";
import PopularJobNearMe from "../../Nearme/PopularJobNearMe";
import Footer from "../../Footer/Footer";
import AboutServicesAndQuestions from "../../Nearme/AboutServicesAndQuestions";
import { FAQ } from "../../Nearme/FAQ";
import UserFeedbackNearMe2 from "../../Nearme/UserFeedbackNearMe2";
// import DiscoverNearMe from "../../Nearme/DiscoverNearMe";
import NearmeMember from "../../Nearme/NearmeMember";
// import HireRelatedToServiceNearMe from "../../Nearme/HireRelatedToServiceNearMe";
// import AdviceInsightNearMe from "../../Nearme/AdviceInsightNearMe";

function RoofersInChester() {
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_TREE_SURGEON_CHESTER} />
      <HeroSectionNearMe
        heading1="Roofers"
        heading2="Chester"
        description="Find the best roofers in Chester! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/nearme/Roofing/roofingmobile.webp"
        altText="Tree Surgeon Hanging From a Tree trimming branches with a chainsaw"
        blackHeadinginline="inline"
      />
      <VettedSection
        paragraph={VETTED_DATA_TREE_SURGEON_CHESTER}
        vettedHeading1="Find Vetted Local Roofers in "
        vettedHeading2="Chester"
        breadcrumb={BREADCRUM_DATA_TREESURGEON_CHESTER}
        extraButton
      />
      <PopularJobNearMe
        services={POPULAR_SERVICES_CHESTER}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="a tree surgeon cutting the branches of an evergreen tree"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px]  sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      {/* <HowItWorkNearMe /> */}
      <AboutServicesAndQuestions
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_CHESTER}
      />
      {/* <AdviceInsightNearMe
        articles={TREE_SRUGEON_ADVICEINSIGHT_CHESTER}
        padding="px-7.5 pb-[70px] pt-[0px] sm:px-10 md:px-16 md:pb-10 md:pt-0 xl:px-[120px] lg:pt-[0px] lg:pb-[72px]"
      /> */}
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px]  mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        headdingblue="Frequently Asked Questions About "
        headingblack="Roofers in Chester"
        data={FREQUENTLY_DATA_TREE_SURGEON_CHESTER}
      />
      <UserFeedbackNearMe2 feedbackData={TREE_SUREON_FEEDBACK_CHESTER} />

      {/* <DiscoverNearMe homeData={TREE_SURGEON_DATA_CHESTER} /> */}
      {/* <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={TREE_SURGEON_TABDATA_CHESTER}
        activeTabkey="popular"
      /> */}
      <NearmeMember
        // mobileImage="/location/tree_surgeon_member_location_mobile.webp"
        // desktopImage="/location/tree_surgeon_member_location_desktop.webp"
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}
export default RoofersInChester;
