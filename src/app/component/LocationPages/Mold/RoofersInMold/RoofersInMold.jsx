"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_ROOFERS_MOLD,
  ROOFERS_FREQUENTLY_DATA_MOLD,
  POPULAR_SERVICES_ROOFERS_MOLD,
  QUESTION_AND_ABOUT_SERVICE_ROOFERS_MOLD,
  ROOFERS_ADVICEINSIGHT_MOLD,
  ROOFERS_FEEDBACK_MOLD,
  ROOFERS_DATA_MOLD,
  ROOFERS_TABDATA_MOLD,
  VETTED_DATA_ROOFERS_MOLD,
} from "./RoofersInMoldData";
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

function RoofersInMold() {
  useScrollToTop()
  useRegistrationRedirect()
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
      <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_MOLD} />
      <HeroSectionLocation
        heading1="Roofers"
        heading2="Mold"
        description="Find the best roofers in Mold. Just enter your postcode, give us a few quick details, and we will match you with roofers in under a minute."
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/nearme/Roofing/roofingmobile.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        blackHeadinginline="inline"
        serviceId={113}
        serviceName="Roofing"
      />
      <VettedSection
        paragraph={VETTED_DATA_ROOFERS_MOLD}
        vettedHeading1="Find Local Vetted Roofers "
        vettedHeading2="Mold Near You"
        breadcrumb={BREADCRUM_DATA_ROOFERS_MOLD}
        extraButton
        featureRef={featureRef}
      />

      <PopularJobNearMe
        services={POPULAR_SERVICES_ROOFERS_MOLD}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="two roofers installing slate tiles onto a brand new roof URL"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      <AboutServicesAndQuestions
        serviceId={113}
        serviceName="Roofing"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_MOLD}
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature county='Flintshire' cityName={'Mold'} serviceId={113} serviceName="Roofing" featureRef={featureRef} />
      </div>

      <AdviceInsightNearMe
        articles={ROOFERS_ADVICEINSIGHT_MOLD}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
      />
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        data={ROOFERS_FREQUENTLY_DATA_MOLD}
      />
      <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_MOLD} />
      <DiscoverNearMe homeData={ROOFERS_DATA_MOLD} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={ROOFERS_TABDATA_MOLD}
        activeTabkey="popular"
      />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}
export default RoofersInMold;