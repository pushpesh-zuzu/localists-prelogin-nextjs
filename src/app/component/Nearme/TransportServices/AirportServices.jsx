"use client"

import React from "react";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
  QUESTION_AND_ABOUT_SERVICE_AIRPORT_TRANSPORT,
  FREQUENTLY_DATA_AIRPORT_TRANSPORT,
  AIRPORT_TRANSPORT_TABDATA,
  VETTED_DATA_AIRPORT_TRANSPORT,
  BREADCRUM_DATA_AIRPORT_TRANSPORT,
  FEEDBACK_AIRPORT_TRANSPORT,
  DISCOVER_AIRPORT_TRANSPORT_DATA,
} from "./AirtportData";
import { FAQ } from "../FAQ";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import UserFeedbackNearMe from "../UserFeedbackNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import HeroSectionNearMeOtherTheHome from "../HeroSectionNearMeOtherTheHome";

const HeroSectionNearMe = dynamic(() => import("../HeroSectionNearMe"), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
      <LoaderIndicator size="large" />
    </div>
  ),
  ssr: true,
});

const CloseBrowserAbandon = dynamic(
  () => import("../../common/CloseBrowserAbandon/CloseBrowserAbandon"),
  { ssr: false }
);

function AirportServices() {
  usePendingBuyerRedirect()
  useScrollToTop()
  return (
    <>
      {typeof window !== 'undefined' && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_AIRPORT_TRANSPORT} />
      <HeroSectionNearMeOtherTheHome
        heading1="Find Airport Transfer"
        headingMiddle="Services"
        heading2="Near You"
        description="Find reliable airport transfer services near you. Enter your postcode and trip details to get 5 tailored quotes. No cost. No obligation. No fuss."
        bannerImage="/nearme/AirportTransport/airportTransportBanner.webp"
        bannerImageMobile="/nearme/AirportTransport/airportmobile.webp"
        altText="Airport Transfer"
        serviceId=""
        serviceName=""
      />
      <VettedSection
        paragraph={VETTED_DATA_AIRPORT_TRANSPORT}
        vettedHeading1="Vetted airport transfer providers you can"
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_AIRPORT_TRANSPORT}
      />
      <HowItWorkNearMe />
      <HireRelatedToServiceNearMe
        showRightTabButtons
        heading1="Airport Transfer"
        heading2="in your area"
        tabData={AIRPORT_TRANSPORT_TABDATA}
        heightClass="min-h-[420px] md:min-h-[392px] h-auto md:h-auto lg:h-auto"
      />
      <UserFeedbackNearMe feedbackData={FEEDBACK_AIRPORT_TRANSPORT} />
      <AboutServicesAndQuestions
        serviceId=""
        serviceName=""
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_AIRPORT_TRANSPORT} />
      <FAQ data={FREQUENTLY_DATA_AIRPORT_TRANSPORT} />
      <DiscoverNearMe background="#f7f7f7f7" homeData={DISCOVER_AIRPORT_TRANSPORT_DATA} />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default AirportServices;
