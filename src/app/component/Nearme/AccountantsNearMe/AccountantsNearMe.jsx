"use client";

import React from "react";
// import HeroSectionNearMe from "../HeroSectionNearMe";
// import PaddingWrapper from "../PaddingWrapper";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
  BREADCRUM_DATA_ACCOUNTANTS,
  FREQUENTLY_DATA_ACCOUNTANTS,
  POPULAR_SERVICES_ACCOUNTANTS,
  QUESTION_AND_ABOUT_SERVICE,
  ACCOUNTANTS_FEEDBACK,
  ACCOUNTANTS_DATA,
  ACCOUNTANTS_TABDATA,
  VETTED_DATA_ACCOUNTANTS,
} from "./AccountantsNearMeData";
import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { useScrollToTop } from "@/utils/handleScrollToBottom";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";

const HeroSectionNearMe = dynamic(() => import("../HeroSectionNearMe"), {
  loading: () => (
    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
      <LoaderIndicator size="large" />
    </div>
  ),
  ssr: true,
});

// const FAQ = dynamic(() => import("../FAQ"), { ssr: false });

const CloseBrowserAbandon = dynamic(
  () => import("../../common/CloseBrowserAbandon/CloseBrowserAbandon"),
  { ssr: false },
);

function AccountantsNearMe() {
  usePendingBuyerRedirect();
  useScrollToTop();
  return (
    <>
      {typeof window !== "undefined" && <CloseBrowserAbandon />}
      <FAQScript FAQ={FREQUENTLY_DATA_ACCOUNTANTS} />
      <HeroSectionNearMe
        heading1="Find Accountants "
        heading2="Near You"
        description="Get free, no-obligation quotes from the highest quality accountants in your area. Enter your postcode below, and give us a few details about your project - It takes under a minute!"
        bannerImage="/nearme/Accountants/AccountantHero.webp"
        bannerImageMobile="/nearme/Accountants/AccountantHeroMobile1.webp"
        altText="Tree Surgeon Hanging From a Tree trimming branches with a chainsaw"
        serviceName="Accountants"
        serviceId=""
      />
      <VettedSection
        paragraph={VETTED_DATA_ACCOUNTANTS}
        vettedHeading1="Vetted accountants you can"
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_ACCOUNTANTS}
      />
      <PopularJobNearMe
        services={POPULAR_SERVICES_ACCOUNTANTS}
        popularImage="/nearme/Accountants/popularAccounts.webp"
        altText="Accounting people jobs"
        mobileCardClass="w-[285px] min-[440px]:w-[302px] min-[512px]:w-[350px]"
      />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToServiceNearMe
        showRightTabButtons
        heading1="Tree Surgeons"
        heading2="in your area"
        tabData={ACCOUNTANTS_TABDATA}
        heightClass="min-h-[400px] h-auto md:h-auto lg:h-auto"
      />
      <UserFeedbackNearMe2 feedbackData={ACCOUNTANTS_FEEDBACK} />
      {/* <PaddingWrapper> */}
      <AboutServicesAndQuestions
        serviceName="Accountants"
        serviceId=""
        contentBlocks={QUESTION_AND_ABOUT_SERVICE}
      />
      {/* </PaddingWrapper> */}
      <FAQ data={FREQUENTLY_DATA_ACCOUNTANTS} />
      {/* <AdviceInsightNearMe maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} /> */}
      <DiscoverNearMe background="#f7f7f7f7" homeData={ACCOUNTANTS_DATA} />
      <NearmeMember
        desktopImage="/nearme/Accountants/MemberAcountingDesktop.webp"
        mobileImage="/nearme/Accountants/MemberAcountingMobile.webp"
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default AccountantsNearMe;
