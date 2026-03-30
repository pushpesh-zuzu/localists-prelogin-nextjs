"use client";
import React, { useRef } from "react";
import {
  BREADCRUM_DATA_ROOFERS_OSWESTRY,
  ROOFERS_FREQUENTLY_DATA_OSWESTRY,
  POPULAR_SERVICES_ROOFERS_OSWESTRY,
  QUESTION_AND_ABOUT_SERVICE_ROOFERS_OSWESTRY,
  ROOFERS_ADVICEINSIGHT_OSWESTRY,
  ROOFERS_FEEDBACK_OSWESTRY,
  ROOFERS_DATA_OSWESTRY,
  ROOFERS_TABDATA_OSWESTRY,
  VETTED_DATA_ROOFERS_OSWESTRY,
} from "./RoofersInOswestryData";
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

function RoofersInOswestry() {
  useScrollToTop()
  useRegistrationRedirect()
  const featureRef = useRef(null);
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon serviceId={113} quote_type="req call back" />}
      <FAQScript FAQ={ROOFERS_FREQUENTLY_DATA_OSWESTRY} />
      <HeroSectionLocation
        heading1="Roofers"
        heading2="Oswestry"
        description="Get free, no-obligation quotes from reliable and vetted Oswestry roofers. Just pop in your postcode, share a few details about the work and get free quotes delivered straight to your inbox. It only takes a minute."
        bannerImage="/nearme/Roofing/roofingbanner.webp"
        bannerImageMobile="/location/roofing_location.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        blackHeadinginline="inline"
        serviceId={113}
        serviceName="Roofing"
      />
      <VettedSection
        paragraph={VETTED_DATA_ROOFERS_OSWESTRY}
        vettedHeading1="Find Local Vetted Roofers in "
        vettedHeading2="Oswestry"
        breadcrumb={BREADCRUM_DATA_ROOFERS_OSWESTRY}
        extraButton
        featureRef={featureRef}
      />

      <PopularJobNearMe
        services={POPULAR_SERVICES_ROOFERS_OSWESTRY}
        popularImage="/nearme/Roofing/roofslate.webp"
        altText="A roofer installing a new roof by securing clay tiles with a drill"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
        paddingClass="px-[17.5px] py-[30px] sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[0px]"
      />
      <AboutServicesAndQuestions
        serviceId={113}
        serviceName="Roofing"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ROOFERS_OSWESTRY}
      />

      <div ref={featureRef} style={{ overflowAnchor: "none" }}>
        <Feature county='Shropshire' cityName='Oswestry' serviceId={113} serviceName="Roofing" featureRef={featureRef} />
      </div>

      <AdviceInsightNearMe
        articles={ROOFERS_ADVICEINSIGHT_OSWESTRY}
        padding="px-7.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] lg:py-[72px]"
      />
      <WrapperBGWidth>
        <div className="px-[30px] sm:px-10 md:px-16 xl:px-[120px]">
          <PostCodeSectionLocation2 classNamePostCode="mb-[30px] mt-[0px] lg:mt-[0px] lg:mb-[60px] lg:justify-center lg:gap-12" serviceId={113} serviceName="Roofing" />
        </div>
      </WrapperBGWidth>
      <FAQ
        containerClass="w-full px-[30px] sm:px-10 md:px-16 xl:px-[0px] mx-auto pb-10 xl:pb-[72px] xl:px-[120px]"
        data={ROOFERS_FREQUENTLY_DATA_OSWESTRY}
      />
      <UserFeedbackNearMe2 feedbackData={ROOFERS_FEEDBACK_OSWESTRY} />
      <DiscoverNearMe homeData={ROOFERS_DATA_OSWESTRY} />
      <HireRelatedToServiceNearMe
        heading1="Hire with"
        heading2="confidence."
        tabData={ROOFERS_TABDATA_OSWESTRY}
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
export default RoofersInOswestry;


import LoaderIndicator from '@/app/component/common/Loader/LoaderIndicatore';
import SEO from '@/app/component/common/seo/SEO';
import RoofersInOswestry from '@/app/component/LocationPages/Oswestry/RoofersInOswestry/RoofersInOswestry';
import React, { Suspense } from 'react'
export const metadata = {
  title: "Get Reliable Roofers Oswestry | Localists.com",
  description:
    "Are you in need of dependable roofers in Oswestry? Click now to get free quotes from experienced, vetted roofing specialists in your local area.",
};
function page() {
  return (
    <>
    <SEO
      canonicalPath="/en/gb/roofers-near-me/oswestry"
      bannerImage="/nearme/Roofing/wrexhamBanner.webp"
      breadcrumb={[
        { title: "Home", path: "en/gb" },
        { title: "Home & Garden", path: "en/gb/home" },
        { title: "Roofing", path: "en/gb/roofers-near-me" },
        { title: "Oswestry", path: "en/gb/roofers-near-me/oswestry" },
      ]}
      conversion={true} /><Suspense
        fallback={<div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
          <LoaderIndicator size="large" />
        </div>}
      >

        <RoofersInOswestry />
      </Suspense></>
  )
}

export default page