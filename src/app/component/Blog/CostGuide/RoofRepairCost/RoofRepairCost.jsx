"use client";
import React from "react";
import CloseBrowserAbandon from "../../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import BlogHeroSection from "../../BlogHeroSection";
import {
  ROOFREPAIRCOST_QUESTION_AND_ABOUT_SERVICE,
  FREQUENTLY_DATA_ROOFREPAIRCOST_ROOF,
} from "./RoofRepairCostData";
import AboutServiceAndQuestionBlog from "../../AboutServiceAndQuestionBlog";
import AdviceAndInsightBlog from "../../AdviceAndInsightBlog";
import { TREE_SRUGEON_ADVICEINSIGHT } from "../../../Nearme/TreeSurgeon/TreeSurgeonData";
import Footer from "../../../Footer/Footer";
import FAQScript from "../../../common/seo/FAQScript";
import { FAQ } from "../../../Nearme/FAQ";
import PostCodeSectionBlog from "../../PostCodeSectionBlog";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";

function RoofRepairCost() {
  usePendingBuyerRedirect();
  useScrollToTop();

  return (
    <>
      {" "}
      {typeof window !== "undefined" && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_ROOFREPAIRCOST_ROOF} />
      <BlogHeroSection
        category="Roofing"
        title="Roof Repair Cost UK"
        altText="a roofer wearing protective leak roofing a roof with safety harness"
        bannerImage="/blog/costGuid/roofRepairHero.webp"
        bannerImageMobile="/blog/costGuid/roofRepairHero.webp"
        publishedDate="21.04.26"
        updatedDate="21.04.26"
      />
      {/* <BlogShareSection/> */}
      <AboutServiceAndQuestionBlog
        maxWidth="max-w-[800px]"
        contentBlocks={ROOFREPAIRCOST_QUESTION_AND_ABOUT_SERVICE}
        serviceId={113}
        serviceName="Roofing"
      />
      <FAQ
        data={FREQUENTLY_DATA_ROOFREPAIRCOST_ROOF}
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] lg:max-w-[1200px] mx-auto pb-0 xl:pb-[0px]"
      />
      <div className="max-w-[800px] px-[30px] md:px-16 xl:px-0 mx-auto   ">
        <PostCodeSectionBlog
          serviceId={113}
          serviceName="Roofing"
          classNamePostCode="mb-[30px] mt-[30px] lg:mt-[48px] lg:mb-[48px]"
        />
      </div>
      <AdviceAndInsightBlog articles={TREE_SRUGEON_ADVICEINSIGHT} />
      <Footer />
    </>
  );
}

export default RoofRepairCost;
