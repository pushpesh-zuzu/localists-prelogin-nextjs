"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_TREESURGEON_CHESTER,
  FREQUENTLY_DATA_TREE_SURGEON_CHESTER,
  POPULAR_SERVICES_TREE_SURGEON_CHESTER,
  QUESTION_AND_ABOUT_SERVICE_TREE_SURGEON_CHESTER,
  TREE_SRUGEON_ADVICEINSIGHT_CHESTER,
  TREE_SUREON_FEEDBACK_CHESTER,
  TREE_SURGEON_DATA_CHESTER,
  TREE_SURGEON_TABDATA_CHESTER,
  VETTED_DATA_TREE_SURGEON_CHESTER,
} from "./TreeSurgeonInChesterData";
import CloseBrowserAbandon from "@/app/component/common/CloseBrowserAbandon/CloseBrowserAbandon";
import HeroSectionNearMe from "@/app/component/Nearme/HeroSectionNearMe";
import VettedSection from "@/app/component/Nearme/VettedSection";
import PopularJobNearMe from "@/app/component/Nearme/PopularJobNearMe";
import AboutServicesAndQuestions from "@/app/component/Nearme/AboutServicesAndQuestions";
import { FAQ } from "@/app/component/Nearme/FAQ";
import UserFeedbackNearMe2 from "@/app/component/Nearme/UserFeedbackNearMe2";
import DiscoverNearMe from "@/app/component/Nearme/DiscoverNearMe";
import NearmeMember from "@/app/component/Nearme/NearmeMember";
import HireRelatedToServiceNearMe from "@/app/component/Nearme/HireRelatedToServiceNearMe";
import AdviceInsightNearMe from "@/app/component/Nearme/AdviceInsightNearMe";
import Footer from "@/app/component/Footer/Footer";
import Feature from "../../FetureComponent/Feature";
import FAQScript from "@/app/component/common/seo/FAQScript";
import HeroSectionLocation from "../../HeroSectionLocation";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import PopularJobsInLocation from "../../PopularJobsInLocation";

function TreeSurgeonInChester() {
  useScrollToTop();
  const featureRef = useRef(null);

  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_TREE_SURGEON_CHESTER} />
      <HeroSectionLocation
        heading1="Tree Surgeons"
        heading2="Chester."
        description="Find the best tree surgeons in Chester. Click ‘start a quote’ to get free instant quotes from local tree surgeons, or browse through our list of vetted and verified tree surgeons below."
        bannerImage="/nearme/tree-surgeon-header.webp"
        bannerImageMobile="/nearme/treeSurgeon1.png"
        altText="Tree Surgeon Hanging From a Tree trimming branches with a chainsaw"
      />
      <VettedSection
        paragraph={VETTED_DATA_TREE_SURGEON_CHESTER}
        vettedHeading1="Vetted tree surgeons you can"
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_TREESURGEON_CHESTER}
        extraButton
        featureRef={featureRef}
        featureButtonText="View Tree Surgeons"
      />
      {/* <PopularJobsInLocation
        services={POPULAR_SERVICES_TREE_SURGEON_CHESTER}
        ctaLink="/en/gb/tree-surgeon-multi-form-ppc"
        paddingClass="px-[17.5px] py-[30px]  sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      /> */}
       <PopularJobNearMe
        services={POPULAR_SERVICES_TREE_SURGEON_CHESTER}
        popularImage="/location/treeSurgeon_location_popularjob.webp"
        altText="a tree surgeon cutting the branches of an evergreen tree"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        ctaLink="/en/gb/tree-surgeon-multi-form-ppc"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-0 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      <AboutServicesAndQuestions
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_TREE_SURGEON_CHESTER}
      />
      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature
          county='Cheshire'
          serviceProfessionName="Tree Surgeons"
          serviceId={112}
          serviceName="Tree Surgery"
          featureRef={featureRef}
        />
      </div>
      <AdviceInsightNearMe
        articles={TREE_SRUGEON_ADVICEINSIGHT_CHESTER}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10  xl:px-[120px]  lg:py-[72px]"
      />
      <FAQ data={FREQUENTLY_DATA_TREE_SURGEON_CHESTER} />
      <UserFeedbackNearMe2 feedbackData={TREE_SUREON_FEEDBACK_CHESTER} />

      <DiscoverNearMe homeData={TREE_SURGEON_DATA_CHESTER} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={TREE_SURGEON_TABDATA_CHESTER}
        activeTabkey="related"
        heightClass="min-h-[400px] [@media(max-width:360px)]:min-h-[422px]  h-auto md:h-auto lg:h-[546px]"
      />
      <NearmeMember
        mobileImage="/location/tree_surgeon_member_location_mobile.webp"
        desktopImage="/location/tree_surgeon_member_location_desktop.webp"
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}
export default TreeSurgeonInChester;
