"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_LANDSCAPING_HUDDERSFIELD,
  FREQUENTLY_DATA_LANDSCAPING_HUDDERSFIELD,
  POPULAR_SERVICES_LANDSCAPING_HUDDERSFIELD,
  QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_HUDDERSFIELD,
  LANDSCAPING_ADVICEINSIGHT_HUDDERSFIELD,
  LANDSCAPING_FEEDBACK_HUDDERSFIELD,
  LANDSCAPING_DATA_HUDDERSFIELD,
  LANDSCAPING_TABDATA_HUDDERSFIELD,
  VETTED_DATA_LANDSCAPING_HUDDERSFIELD,
} from "./LandscapersInHuddersfieldData";
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

function LandscapersInHuddersfield() {
  useScrollToTop();
  useRegistrationRedirect();
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && (
        <CloseBrowserAbandon serviceId={43} quote_type="req call back" />
      )}
      <FAQScript FAQ={FREQUENTLY_DATA_LANDSCAPING_HUDDERSFIELD} />
      <HeroSectionLocation
        heading1="Landscapers "
        heading2="Huddersfield "
        description="Get free, no obligation quotes now from the highest quality landscapers in Huddersfield. All you need to do is enter your postcode, a few quick details and we’ll match you with local professionals who are ready to quote. "
        bannerImage="/nearme/Landscaping/Landscapingbanner.webp"
        bannerImageMobile="/nearme/Landscaping/landscapingMobile1.webp"
        altText="A Landscaper carefully laying a large concrete slab amongst a garden of flowers and grey pebble dash"
        serviceId={43}
        serviceName="Landscaping"
      />
      <VettedSection
        paragraph={VETTED_DATA_LANDSCAPING_HUDDERSFIELD}
        vettedHeading1="Find Local Vetted Landscapers in "
        vettedHeading2="Huddersfield"
        breadcrumb={BREADCRUM_DATA_LANDSCAPING_HUDDERSFIELD}
        extraButton
        featureRef={featureRef}
        featureButtonText="View Landscapers"
      />
      <LandScapingGardenPopularJobs
        services={POPULAR_SERVICES_LANDSCAPING_HUDDERSFIELD}
        popularImage="/nearme/Landscaping/pathwayPopularJob.png"
        altText="beautifully landscaped garden with pathway and decorative paving edges "
        mobileCardClass="w-[285px] min-[390px]:w-[221px] min-[412px]:w-[300px] min-[440px]:w-[307px] min-[512px]:w-[350px]"
        classNameD="max-w-[65%] min-[850]:max-w-[80%] lg:max-w-full"
        isPaddingBottom={true}
      />
      <AboutServicesAndQuestions
        serviceId={43}
        serviceName="Landscaping"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_LANDSCAPING_HUDDERSFIELD}
        quotesBannerText="LANDSCAPING QUOTES IN"
        mobileFrame="/nearme/Landscaping/mobilelandscaping.webp"
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature
          serviceProfessionName="Landscapers "
          county="West Yorkshire"
          cityName="Huddersfield"
          serviceId={43}
          serviceName="Landscaping"
          featureRef={featureRef}
        />
      </div>

      <AdviceInsightNearMe
        articles={LANDSCAPING_ADVICEINSIGHT_HUDDERSFIELD}
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
        data={FREQUENTLY_DATA_LANDSCAPING_HUDDERSFIELD}
      />
      <UserFeedbackNearMe2 feedbackData={LANDSCAPING_FEEDBACK_HUDDERSFIELD} />
      <DiscoverNearMe homeData={LANDSCAPING_DATA_HUDDERSFIELD} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={LANDSCAPING_TABDATA_HUDDERSFIELD}
        activeTabkey="popular"
      />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
        desktopImage="/nearme/Landscaping/landscapingmember.webp"
        mobileImage="/nearme/Landscaping/landscapingmember.webp"
      />
      <Footer />
    </>
  );
}
export default LandscapersInHuddersfield;
