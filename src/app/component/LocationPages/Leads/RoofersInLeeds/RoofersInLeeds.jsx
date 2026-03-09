"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_ROOFERS_LEEDS,
  ROOFERS_FREQUENTLY_DATA_LEEDS,
  POPULAR_SERVICES_ROOFERS_LEEDS,
  QUESTION_AND_ABOUT_SERVICE_ROOFERS_LEEDS,
  ROOFERS_ADVICEINSIGHT_LEEDS,
  ROOFERS_FEEDBACK_LEEDS,
  ROOFERS_DATA_LEEDS,
  ROOFERS_TABDATA_LEEDS,
  VETTED_DATA_ROOFERS_LEEDS,
} from "./RoofersInLeedsData";
import CloseBrowserAbandon from "../../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import VettedSection from "../../../Nearme/VettedSection";
import PopularJobNearMe from "../../../Nearme/PopularJobNearMe";
import Footer from "../../../Footer/Footer";
import AboutServicesAndQuestions from "../../../Nearme/AboutServicesAndQuestions";
import { FAQ } from "../../../Nearme/FAQ";
import UserFeedbackNearMe2 from "../../../Nearme/UserFeedbackNearMe2";
import DiscoverNearMe from "../../../Nearme/DiscoverNearMe";
import NearmeMember from "../../../Nearme/NearmeMember";
import FAQScript from "../../../common/seo/FAQScript";
import HireRelatedToServiceNearMe from "../../../Nearme/HireRelatedToServiceNearMe";
import AdviceInsightNearMe from "../../../Nearme/AdviceInsightNearMe";
import Feature from "../../FetureComponent/Feature";
import HeroSectionLocation from "../../HeroSectionLocation";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import useRegistrationRedirect from "@/hooks/useRegistrationRedirect";

function RoofersInLeeds() {
  useScrollToTop()
  useRegistrationRedirect()
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
      <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_LEEDS} />
      <HeroSectionLocation
        heading1="Roofers"
        heading2="Leeds"
        description="Find the highest quality roofers in Leeds now! Just enter your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/nearme/Roofing/roofingmobile.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        blackHeadinginline="inline"
        serviceId={113}
        serviceName="Roofing"
      />
      <VettedSection
        paragraph={VETTED_DATA_ROOFERS_LEEDS}
        vettedHeading1="Find Local Vetted Roofers "
        vettedHeading2="Leeds Near You"
        breadcrumb={BREADCRUM_DATA_ROOFERS_LEEDS}
        extraButton
        featureRef={featureRef}
      />

      <PopularJobNearMe
        services={POPULAR_SERVICES_ROOFERS_LEEDS}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      <AboutServicesAndQuestions
        serviceId={113}
        serviceName="Roofing"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_LEEDS}
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature county='City of Leeds' cityName='Leeds' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
      </div>

      <AdviceInsightNearMe
        articles={ROOFERS_ADVICEINSIGHT_LEEDS}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
      />
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        data={ROOFERS_FREQUENTLY_DATA_LEEDS}
      />
      <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_LEEDS} />
      <DiscoverNearMe homeData={ROOFERS_DATA_LEEDS} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={ROOFERS_TABDATA_LEEDS}
        activeTabkey="popular"
      />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}
export default RoofersInLeeds;