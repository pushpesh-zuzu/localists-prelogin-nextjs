"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_ROOFERS_HUDDERSFIELD,
  ROOFERS_FREQUENTLY_DATA_HUDDERSFIELD,
  POPULAR_SERVICES_ROOFERS_HUDDERSFIELD,
  QUESTION_AND_ABOUT_SERVICE_ROOFERS_HUDDERSFIELD,
  ROOFERS_ADVICEINSIGHT_HUDDERSFIELD,
  ROOFERS_FEEDBACK_HUDDERSFIELD,
  ROOFERS_DATA_HUDDERSFIELD,
  ROOFERS_TABDATA_HUDDERSFIELD,
  VETTED_DATA_ROOFERS_HUDDERSFIELD,
} from "./RoofersInHuddersfieldData";
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
import WrapperBGWidth from "@/app/component/common/WrapperBGWidth/WrapperBGWidth";
import PostCodeSectionLocation2 from "../../PostCodeSectionLocation2";
import HowItWork from "@/app/component/Home/HowItWork";

function RoofersInHuddersfield() {
  useScrollToTop()
  useRegistrationRedirect()
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
      <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_HUDDERSFIELD} />
      <HeroSectionLocation
        heading1="Roofers"
        heading2="Huddersfield"
        description="Find the best roofers in Huddersfield! just enter your postcode, answer a few questions, and we'll match you with 5 roofers in Huddersfield to give you a quote."
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/location/roofing_location.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        blackHeadinginline="block md:inline"
        serviceId={113}
        serviceName="Roofing"
      />
      {/* above herosection description is missing in the doc */}
      <VettedSection
        paragraph={VETTED_DATA_ROOFERS_HUDDERSFIELD}
        vettedHeading1="Find Local Vetted Roofers in "
        vettedHeading2="Huddersfield"
        breadcrumb={BREADCRUM_DATA_ROOFERS_HUDDERSFIELD}
        extraButton
        featureRef={featureRef}
      />

      <PopularJobNearMe
        services={POPULAR_SERVICES_ROOFERS_HUDDERSFIELD}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="two roofers installing slate tiles onto a brand new roof URL"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      
      <AboutServicesAndQuestions
        serviceId={113}
        serviceName="Roofing"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_HUDDERSFIELD}
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature county='Huddersfield' cityName='Huddersfield' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
      </div>

      <AdviceInsightNearMe
        articles={ROOFERS_ADVICEINSIGHT_HUDDERSFIELD}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
      />
      <WrapperBGWidth>
        <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
          <PostCodeSectionLocation2 classNamePostCode="mb-[30px] mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={113} serviceName="Roofing" />
        </div>
      </WrapperBGWidth>
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        data={ROOFERS_FREQUENTLY_DATA_HUDDERSFIELD}
      />
      <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_HUDDERSFIELD} />
      <DiscoverNearMe homeData={ROOFERS_DATA_HUDDERSFIELD} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={ROOFERS_TABDATA_HUDDERSFIELD}
        activeTabkey="popular"
      />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
        desktopImage="/nearme/Roofing/roofingmember.webp"
        mobileImage="/nearme/Roofing/roofingmembermobile.webp"
      />
      <Footer />
    </>
  );
}
export default RoofersInHuddersfield;