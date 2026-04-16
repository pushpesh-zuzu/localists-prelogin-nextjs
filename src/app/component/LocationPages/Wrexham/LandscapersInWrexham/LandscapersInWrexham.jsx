"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_LANDSCAPING_WREXHAM,
  FREQUENTLY_DATA_LANDSCAPING_WREXHAM,
  POPULAR_SERVICES_LANDSCAPING_WREXHAM,
  QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_WREXHAM,
  LANDSCAPING_ADVICEINSIGHT_WREXHAM,
  LANDSCAPING_FEEDBACK_WREXHAM,
  LANDSCAPING_DATA_WREXHAM,
  LANDSCAPING_TABDATA_WREXHAM,
  VETTED_DATA_LANDSCAPING_WREXHAM,
  NEARBY_PLACES_ROOFER_WREXHAM
} from "./LandscapersInWrexhamData";
import CloseBrowserAbandon from "../../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import VettedSection from "../../../Nearme/VettedSection";
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
import WrapperBGWidth from "../../../common/WrapperBGWidth/WrapperBGWidth";
import PostCodeSectionLocation2 from "../../PostCodeSectionLocation2";
import LandScapingGardenPopularJobs from "@/app/component/Nearme/LandscaperGardenNearMe/LandScapingGardenPopularJobs";
import NearbyPlaces from "@/app/component/common/NearByPlaces/NearbyPlaces";

function LandscapersInWrexham() {
  useScrollToTop();
  useRegistrationRedirect();
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && (
        <CloseBrowserAbandon serviceId={43} quote_type="req call back" />
      )}
      <FAQScript FAQ={FREQUENTLY_DATA_LANDSCAPING_WREXHAM} />
      <HeroSectionLocation 
        heading1="Landscapers"
        heading2="Wrexham"
        description="Looking for the best landscapers in Wrexham? Look no further! Pop in your postcode below a few quick details about your project, and we’ll pair you with local landscapers who’ll come out and give you a quote - takes less than a minute to get started. "
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        bannerImageMobile="/nearme/Landscaping/landscapingMobile1.webp"
        altText="A Landscaper carefully laying a large concrete slab amongst a garden of flowers and grey pebble dash"
        serviceId={43}
        serviceName="Landscaping"
      />
      <VettedSection
        paragraph={VETTED_DATA_LANDSCAPING_WREXHAM}
        vettedHeading1="Find Local Vetted Landscapers in "
        vettedHeading2="Wrexham"
        breadcrumb={BREADCRUM_DATA_LANDSCAPING_WREXHAM}
        extraButton
        featureRef={featureRef}
        featureButtonText="View Landscapers"
      />
      <LandScapingGardenPopularJobs
        services={POPULAR_SERVICES_LANDSCAPING_WREXHAM}
        popularImage="/nearme/Landscaping/pathwayPopularJob.png"
        altText="beautifully landscaped garden with pathway and decorative paving edges "
        mobileCardClass="w-[285px] min-[390px]:w-[221px] min-[412px]:w-[300px] min-[440px]:w-[307px] min-[512px]:w-[350px]"
        classNameD="max-w-[65%] min-[850]:max-w-[80%] lg:max-w-full"
        isPaddingBottom={true}
      />
      <AboutServicesAndQuestions
        serviceId={43}
        serviceName="Landscaping"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_WREXHAM}
        quotesBannerText="LANDSCAPING QUOTES IN"
        mobileFrame="/nearme/Landscaping/mobilelandscaping.webp"
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature
          serviceProfessionName="Landscapers "
          county="Wrexham"
          cityName="Wrexham"
          serviceId={43}
          serviceName="Landscaping"
          featureRef={featureRef}
        />
      </div>

      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={LANDSCAPING_TABDATA_WREXHAM}
        activeTabkey="popular"
      />
      <AdviceInsightNearMe
        articles={LANDSCAPING_ADVICEINSIGHT_WREXHAM}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
      />
      <WrapperBGWidth>
        <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
          <PostCodeSectionLocation2
            classNamePostCode="mb-[30px] md:mb-10 mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12"
            serviceId={43}
            serviceName="Landscaping"
          />
        </div>
      </WrapperBGWidth>
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        headdingblue="FAQ's"
        headingblack=""
        data={FREQUENTLY_DATA_LANDSCAPING_WREXHAM}
      />
      <UserFeedbackNearMe2 feedbackData={LANDSCAPING_FEEDBACK_WREXHAM} />
      <DiscoverNearMe homeData={LANDSCAPING_DATA_WREXHAM} />
      <NearbyPlaces NearByPlacesData={NEARBY_PLACES_ROOFER_WREXHAM}/>
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
        desktopImage="/nearme/Landscaping/landscapingmember.webp"
        mobileImage="/nearme/Landscaping/landscapingmember.webp"
      />
      <Footer />
    </>
  );
}
export default LandscapersInWrexham;
