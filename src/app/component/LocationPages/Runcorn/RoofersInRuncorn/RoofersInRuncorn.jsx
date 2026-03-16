"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_ROOFERS_RUNCORN,
  ROOFERS_FREQUENTLY_DATA_RUNCORN,
  POPULAR_SERVICES_ROOFERS_RUNCORN,
  QUESTION_AND_ABOUT_SERVICE_ROOFERS_RUNCORN,
  ROOFERS_ADVICEINSIGHT_RUNCORN,
  ROOFERS_FEEDBACK_RUNCORN,
  ROOFERS_DATA_RUNCORN,
  ROOFERS_TABDATA_RUNCORN,
  VETTED_DATA_ROOFERS_RUNCORN,
} from "./RoofersInRuncornData";
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

function RoofersInRuncorn() {
  useScrollToTop()
  useRegistrationRedirect()
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
      <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_RUNCORN} />
      <HeroSectionLocation
        heading1="Roofers"
        heading2="Runcorn"
        description="If you need a roofer in Runcorn, you can get free solid quotes from the highest quality roofers in your local area without having to ring round half the town. Enter your postcode, give us a few details, and that’s it - only takes under a minute!"
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/location/roofing_location.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        blackHeadinginline="inline"
        serviceId={113}
        serviceName="Roofing"
      />
      <VettedSection
        paragraph={VETTED_DATA_ROOFERS_RUNCORN}
        vettedHeading1="Find Local Vetted Roofers in "
        vettedHeading2="Runcorn"
        breadcrumb={BREADCRUM_DATA_ROOFERS_RUNCORN}
        extraButton
        featureRef={featureRef}
      />

      <PopularJobNearMe
        services={POPULAR_SERVICES_ROOFERS_RUNCORN}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      <AboutServicesAndQuestions
        serviceId={113}
        serviceName="Roofing"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_RUNCORN}
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature county='Halton' cityName='Runcorn' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
      </div>

      <AdviceInsightNearMe
        articles={ROOFERS_ADVICEINSIGHT_RUNCORN}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
      />
     
      <FAQ
      headdingblue="FAQ's on roofers "
      headingblack="Runcorn"
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        data={ROOFERS_FREQUENTLY_DATA_RUNCORN}
      />
      <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_RUNCORN} />
      <DiscoverNearMe homeData={ROOFERS_DATA_RUNCORN} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={ROOFERS_TABDATA_RUNCORN}
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
export default RoofersInRuncorn;