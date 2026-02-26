"use client";
import React from "react";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import BlogHeroSection from "../BlogHeroSection";
import {
  BLOG_FLATE_QUESTION_AND_ABOUT_SERVICE,
  FREQUENTLY_DATA_BLOG_FLATE_ROOF,
} from "./BlogFlateRoofLastData";
import AboutServiceAndQuestionBlog from "../AboutServiceAndQuestionBlog";
import AdviceAndInsightBlog from "../AdviceAndInsightBlog";
import { TREE_SRUGEON_ADVICEINSIGHT } from "../../Nearme/TreeSurgeon/TreeSurgeonData";
import Footer from "../../Footer/Footer";
import FAQScript from "../../common/seo/FAQScript";
import { FAQ } from "../../Nearme/FAQ";
import PostCodeSectionBlog from "../PostCodeSectionBlog";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";

function BlogFlateRoofLast() {
  usePendingBuyerRedirect();
  useScrollToTop();

  return (
    <>
      {" "}
      {typeof window !== "undefined" && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_BLOG_FLATE_ROOF} />
      <BlogHeroSection
        category="Roofing"
        title="How Long Does a Flat Roof Last"
        altText="a roofer wearing protective clothing unrolling roofing material on a flat roof"
        bannerImage="/blog/blogflatroofbanner.webp"
        bannerImageMobile="/blog/blogflatroofbannerMobile.webp"
        publishedDate="25.02.26"
        updatedDate="25.02.26"
      />
      {/* <BlogShareSection/> */}
      <AboutServiceAndQuestionBlog
        maxWidth="max-w-[800px]"
        contentBlocks={BLOG_FLATE_QUESTION_AND_ABOUT_SERVICE}
        serviceId={113}
        serviceName="Roofing"
      />
      <FAQ
        data={FREQUENTLY_DATA_BLOG_FLATE_ROOF}
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] lg:max-w-[1200px] mx-auto pb-0 xl:pb-[0px]"
      />
      <div className="max-w-[800px] px-[30px] md:px-16 xl:px-0 mx-auto   ">
        <PostCodeSectionBlog
          serviceId={113}
          serviceName="Roofing"
          classNamePostCode="mb-[20px] mt-[20px] lg:mt-[48px] lg:mb-[48px]"
        />
      </div>
      <AdviceAndInsightBlog articles={TREE_SRUGEON_ADVICEINSIGHT} />
      <Footer />
    </>
  );
}

export default BlogFlateRoofLast;
