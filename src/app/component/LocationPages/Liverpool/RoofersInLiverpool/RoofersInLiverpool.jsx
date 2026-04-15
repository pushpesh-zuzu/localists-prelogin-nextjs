"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_ROOFERS_LIVERPOOL,
  FREQUENTLY_DATA_LIVERPOOL,
  POPULAR_SERVICES_ROOFERS_LIVERPOOL,
  QUESTION_AND_ABOUT_SERVICE_ROOFERS_LIVERPOOL,
  ROOFERS_ADVICEINSIGHT_LIVERPOOL,
  ROOFERS_FEEDBACK_LIVERPOOL,
  ROOFERS_DATA_LIVERPOOL,
  ROOFERS_TABDATA_LIVERPOOL,
  VETTED_DATA_ROOFERS_LIVERPOOL,
  NEARBY_PLACES_ROOFER_LIVERPOOL
} from "./RoofersInLiverpoolData";
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
import useRegistrationRedirect from "@/hooks/useRegistrationRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import WrapperBGWidth from "@/app/component/common/WrapperBGWidth/WrapperBGWidth";
import PostCodeSectionLocation2 from "../../PostCodeSectionLocation2";
import NearbyPlaces from "@/app/component/common/NearByPlaces/NearbyPlaces";

function RooferInLiverpool() {
  useRegistrationRedirect();
  useScrollToTop()
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
      <FAQScript FAQ={FREQUENTLY_DATA_LIVERPOOL} />
      <HeroSectionLocation
        heading1="Roofers"
        heading2="Liverpool"
        description="Find the best roofers in Liverpool! Just input your postcode and a few details to get 5 tailored quotes. No cost. No obligation. No fuss."
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/location/roofing_location.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        blackHeadinginline="inline"
        serviceId={113}
        serviceName="Roofing"
      />
      <VettedSection
        paragraph={VETTED_DATA_ROOFERS_LIVERPOOL}
        vettedHeading1="Find Local Vetted Roofers in "
        vettedHeading2="Liverpool"
        breadcrumb={BREADCRUM_DATA_ROOFERS_LIVERPOOL}
        extraButton
        featureRef={featureRef}
      />
      <PopularJobNearMe
        services={POPULAR_SERVICES_ROOFERS_LIVERPOOL}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="two roofers installing slate tiles onto a brand new roof URL"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-0 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      {/* <HowItWorkNearMe /> */}
      <AboutServicesAndQuestions
        serviceId={113}
        serviceName="Roofing"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_LIVERPOOL}
      />
      <div ref={featureRef}>
        {" "}
        {/* ✅ Feature ko wrap kiya */}
        <Feature county='Liverpool' serviceId={113} serviceName="Roofing" cityName="Liverpool" featureRef={featureRef} />
      </div>
      <AdviceInsightNearMe
        articles={ROOFERS_ADVICEINSIGHT_LIVERPOOL}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10  xl:px-[120px]  lg:py-[72px]"
      />
      <WrapperBGWidth>
        <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
          <PostCodeSectionLocation2 classNamePostCode="mb-[30px] md:mb-10 mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={113} serviceName="Roofing" />
        </div>
      </WrapperBGWidth>
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px]  mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        headdingblue="FAQ's"
        headingblack=""
        data={FREQUENTLY_DATA_LIVERPOOL}
      />
      <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_LIVERPOOL} />

      <DiscoverNearMe homeData={ROOFERS_DATA_LIVERPOOL} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={ROOFERS_TABDATA_LIVERPOOL}
        activeTabkey="popular"
        heightClass="min-h-[400px] [@media(max-width:360px)]:min-h-[422px]  h-auto md:h-auto lg:h-[485.5px]"
      />
      <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_LIVERPOOL} />
      <NearmeMember
        // mobileImage="/location/tree_surgeon_member_location_mobile.webp"
        // desktopImage="/location/tree_surgeon_member_location_desktop.webp"
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
        desktopImage="/nearme/Roofing/roofingmember.webp"
        mobileImage="/nearme/Roofing/roofingmembermobile.webp"
      />
      <Footer />
    </>
  );
}
export default RooferInLiverpool;
