"use client";

import React from "react";
// import HeroSectionNearMe from "../HeroSectionNearMe";
// import PaddingWrapper from "../PaddingWrapper";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
// import Feature from "../Feature";
import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
import NearmeMember from "../NearmeMember";
import Footer from "../../Footer/Footer";
import HowItWorkNearMe from "../HowItWorkNearMe";
import HireRelatedToServiceNearMe from "../HireRelatedToServiceNearMe";
// import UserFeedbackNearMe from "../UserFeedbackNearMe";
// import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
// import AdviceInsightNearMe from "../AdviceInsightNearMe";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import FAQScript from "../../common/seo/FAQScript";
import DiscoverNearMe from "../DiscoverNearMe";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import UserFeedbackNearMe2 from "../UserFeedbackNearMe2";
import {
  ARTIFICIAL_GRASS_NEARME_TABDATA,
  BREADCRUM_DATA_ARTIFICIAL_GRASS_NEARME,
  DISCOVER_ARTIFICIAL_GRASS_NEARME_DATA,
  FEEDBACK_ARTIFICIAL_GRASS_NEARME,
  FREQUENTLY_DATA_ARTIFICIAL_GRASS_NEARME,
  POPULAR_SERVICES_ARTIFICIAL_GRASS_NEARME,
  QUESTION_AND_ABOUT_SERVICE_ARTIFICIAL_GRASS_NEARME,
  VETTED_DATA_ARTIFICIAL_GRASS_NEARME,
} from "./ArtificialGrassInstallationNearmeData";

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
  { ssr: false },
);

function ArtificialGrassInstallationNearme() {
  usePendingBuyerRedirect();
  return (
    <>
      <CloseBrowserAbandon />
      <FAQScript FAQ={FREQUENTLY_DATA_ARTIFICIAL_GRASS_NEARME} />
      <HeroSectionNearMe
        heading1=" Find Artificial Grass Installers"
        heading2="Near You"
        description="Find the best artificial grass installers in your area, just enter your postcode and a few details for instant quotes"
        bannerImage="/nearme/Artificial/ArtificialGrassBanner.jpg"
        bannerImageMobile="/nearme/Artificial/ArtificialGrassBannerMobile.webp"
        altText="Artificial grass installer landscaping a yard with artificial grass, measuring tap on grass."
        serviceId={54}
        serviceName="Artificial Grass Installation"
      />
      <VettedSection
        paragraph={VETTED_DATA_ARTIFICIAL_GRASS_NEARME}
        vettedHeading1="Verified artificial grass installers you can "
        vettedHeading2="trust"
        breadcrumb={BREADCRUM_DATA_ARTIFICIAL_GRASS_NEARME}
      />
      {/* popularImage="/nearme/Artificial/artificialPopularJobs.webp" */}

      <PopularJobNearMe
        services={POPULAR_SERVICES_ARTIFICIAL_GRASS_NEARME}
        popularImage="/nearme/Artificial/artificialPopularJobs.webp"
        altText="Grass fitter hand cutting artificial turf with sharp cutter"
        mobileCardClass="w-[235px] min-[375px]:w-[270px] min-[430px]:w-[270px] min-[512px]:w-[350px] "
          classNameD='md:max-w-[396px] lg:max-w-[450px] xl:max-w-full'


      />
      <HowItWorkNearMe />
      {/* <Feature /> */}
      <HireRelatedToServiceNearMe
        heading1="Artificial Grass Installers "
        heading2="in your area"
        tabData={ARTIFICIAL_GRASS_NEARME_TABDATA}
      />
      <UserFeedbackNearMe2 feedbackData={FEEDBACK_ARTIFICIAL_GRASS_NEARME} />
      {/* <PaddingWrapper> */}
      <AboutServicesAndQuestions
        serviceId={54}
        serviceName="Artificial Grass Installation"
        contentBlocks={QUESTION_AND_ABOUT_SERVICE_ARTIFICIAL_GRASS_NEARME}
      />
      {/* </PaddingWrapper> */}
      <FAQ data={FREQUENTLY_DATA_ARTIFICIAL_GRASS_NEARME} />
      {/* <AdviceInsightNearMe maxWidth articles={TREE_SRUGEON_ADVICEINSIGHT} /> */}
      <DiscoverNearMe homeData={DISCOVER_ARTIFICIAL_GRASS_NEARME_DATA} />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
      <Footer />
    </>
  );
}

export default ArtificialGrassInstallationNearme;
