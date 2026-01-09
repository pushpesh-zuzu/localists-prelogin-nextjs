import React from "react";
import HeroSectionNearMe from "../HeroSectionNearMe";
import PaddingWrapper from "../PaddingWrapper";
import Breadcrumb from "../../common/BreadCrum/BreadCrum";
import VettedSection from "../VettedSection";
import AboutServicesAndQuestions from "../AboutServicesAndQuestions";
import {
  FREQUENTLY_DATA_TREE_SURGEON,
  QUESTION_AND_ABOUT_SERVICE,
  TREE_SRUGEON_ADVICEINSIGHT,
  TREE_SURGEON_TABDATA,
} from "./TreeSurgeonData";
import DiscoverServices from "../../Home/DiscoverServices/DiscoverServices";
import AdviceInsight from "../../Home/AdviceInsight/AdviceInsight";
import HowItWork from "../../Home/HowItWork";
import HireRelatedToService from "../../Home/HireRelatedToService/HireRelatedToService";
import UserFeedback from "../../Home/UserFeedback/UserFeedback";
import Feature from "../Feature";
import { FAQ } from "../FAQ";
import PopularJobNearMe from "../PopularJobNearMe";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import NearmeMember from "../NearmeMember";

function TreeSurgeon() {
  return (
    <>
      <HeroSectionNearMe />
      <WrapperBGWidth>
        <PaddingWrapper>
          <Breadcrumb
            items={[
              { title: "Home & Garden", path: "/home" },
              { title: "Tree Surgeons" },
            ]}
          />
          <VettedSection
            paragraph={[
              `Do you have a garden full of misbehaving trees? Whether its oaks leaning
        like they’ve had too many, or hedges with some boundary issues,
        Localists can help you find a local tree surgeon that can set things
        straight.`,
              `From precise pruning, to safe removals. We’ll connect you with vetted
        and verified tree surgeons near you, ensuring you have healthy trees,
        safer spaces and peace of mind - without the hassle`,
            ]}
            vettedHeading1="Vetted tree surgeons you can"
            vettedHeading2="trust"
          />
        </PaddingWrapper>
      </WrapperBGWidth>
      <WrapperBGWidth>
        <PopularJobNearMe />
      </WrapperBGWidth>
      <HowItWork />
      <Feature />
      <HireRelatedToService tabData={TREE_SURGEON_TABDATA} />
      <UserFeedback />
      <PaddingWrapper>
        <AboutServicesAndQuestions contentBlocks={QUESTION_AND_ABOUT_SERVICE} />
      </PaddingWrapper>
      <FAQ data={FREQUENTLY_DATA_TREE_SURGEON["tree-surgeons-near-me"]} />
      <AdviceInsight articles={TREE_SRUGEON_ADVICEINSIGHT} />
      <DiscoverServices />
      <NearmeMember
        description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
      />
    </>
  );
}

export default TreeSurgeon;
