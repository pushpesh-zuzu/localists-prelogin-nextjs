import React from "react";
import HeroSectionMainLeadBuyer from "./SubSections/HeroSectionMainLeadBuyer";
import LeadGenerationSection from "./SubSections/LeadGenerationSection";
import RealNumbers from "./SubSections/RealNumber";
import HowItWorksleadBuyer from "./SubSections/HowItWorksLeadBuyer";
import ExclusiveLeadsComingSoon from "./SubSections/ExclusiveLeadsComingSoon";
import YouWinWork from "./SubSections/YouWinWork";
import ChooseYourTrade from "./SubSections/ChooseYourTrade";
import WhyProfessionalsLoveLocalists from "./SubSections/WhyProfessionalsLoveLocalists";
import ConnectWithClients from "./SubSections/ConnectWithClients";
import Footer from "../Footer/Footer";
import UserFeedbackNearMe2 from "../Nearme/UserFeedbackNearMe2";
import TopHeadingSection from "./SubSections/TopHeadingSection";

function MainLeadBuyer() {
  return (
    <>
      <TopHeadingSection />
      <HeroSectionMainLeadBuyer />
      <LeadGenerationSection />
      <ExclusiveLeadsComingSoon />
      <RealNumbers />
      <ChooseYourTrade
        trades={[
          {
            label: "Fence & Gate Installation",
            image: "/homepage/fenceandgate.webp",
            serviceId: 49,
          },
          {
            label: "Driveway Installation",
            image: "/homepage/driveway.webp",
            serviceId: 51,
          },
          {
            label: "Patio Laying",
            image: "/homepage/patiolayer.webp",
            serviceId: 52,
          },
          {
            label: "Artificial Grass Installation",
            image: "/homepage/artificialgrassinstallation.webp",
            serviceId: 54,
          },

          {
            label: "Landscaping",
            image: "/homepage/landscapingservice.webp",
            serviceId: 43,
          },
          {
            label: "Tree Surgery",
            image: "/homepage/treesurgery.webp",
            serviceId: 112,
          },
          {
            label: "Gutter Cleaning",
            image: "/homepage/guttercleaning.webp",
            serviceId: 114,
          },
          { label: "Roofing", image: "/roofing.webp", serviceId: 113 },

          {
            label: "Painter and Decorator",
            image: "/homepage/image1.webp",
            serviceId: 27,
          },
          {
            label: "Architects",
            image: "/homepage/image3.webp",
            serviceId: 48,
          },
          {
            label: "Airport Transfers",
            image: "/homepage/image4.webp",
            serviceId: 116,
          },
          {
            label: "Physics and Maths",
            image: "/homepage/image14.webp",
            serviceId: 117,
          },

          { label: "Tutoring", image: "/homepage/image1.webp", serviceId: 118 },
          {
            label: "Personal Trainers",
            image: "/homepage/image3.webp",
            serviceId: 22,
          },
        ]}
      />
      <UserFeedbackNearMe2
        feedbackData={[
          {
            id: 1,
            text: "Really happy with the service. Localists give you legit numbers not like other lead generators where you're left with fake numbers. Very pleased with the service and cant fault them.",
            name: "Graham",
            // location: "Hartlepool",
          },
          {
            id: 2,
            text: "Can't fault them for the quality leads. I've had some decent business from Localists and cancelled my membership with Rated People now because I'm getting far more business from these. Nice one chaps. ",
            name: "Luke",
          },
          {
            id: 3,
            text: "Very happy with the service. Had a decent amount of roofing work come my way from Localists. Look forward to a long-term business partnership",
            name: "Paul",
          },
          {
            id: 4,
            text: "Great for landscaping and driveways. Would definitely recommend Localists for getting you decent leads in these areas!!!",
            name: "Patrick",
          },
        ]}
      />
      <HowItWorksleadBuyer />
      <YouWinWork />
      <WhyProfessionalsLoveLocalists />
      <ConnectWithClients
        trades={[
          {
            label: "Fence & Gate Installation",
            image: "/homepage/fenceandgate.webp",
            serviceId: 49,
          },
          {
            label: "Driveway Installation",
            image: "/homepage/driveway.webp",
            serviceId: 51,
          },
          {
            label: "Patio Laying",
            image: "/homepage/patiolayer.webp",
            serviceId: 52,
          },
          {
            label: "Artificial Grass Installation",
            image: "/homepage/artificialgrassinstallation.webp",
            serviceId: 54,
          },

          {
            label: "Landscaping",
            image: "/homepage/landscapingservice.webp",
            serviceId: 43,
          },
          {
            label: "Tree Surgery",
            image: "/homepage/treesurgery.webp",
            serviceId: 112,
          },
          { label: "Roofing", image: "/roofing.webp", serviceId: 113 },

          {
            label: "Painter and Decorator",
            image: "/homepage/image1.webp",
            serviceId: 27,
          },
        ]}
      />
      <Footer />
    </>
  );
}

export default MainLeadBuyer;
