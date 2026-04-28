import React from 'react'
import HeroSectionMainLeadBuyer from './SubSections/HeroSectionMainLeadBuyer'
import LeadGenerationSection from './SubSections/LeadGenerationSection'
import RealNumbers from './SubSections/RealNumber'
import HowItWorksleadBuyer from './SubSections/HowItWorksLeadBuyer'
import ExclusiveLeadsComingSoon from './SubSections/ExclusiveLeadsComingSoon'
import YouWinWork from './SubSections/YouWinWork'
import ChooseYourTrade from './SubSections/ChooseYourTrade'
import WhyProfessionalsLoveLocalists from './SubSections/WhyProfessionalsLoveLocalists'
import ConnectWithClients from './SubSections/ConnectWithClients'
import Footer from '../Footer/Footer'
import UserFeedbackNearMe2 from '../Nearme/UserFeedbackNearMe2'
import TopHeadingSection from './SubSections/TopHeadingSection'

function MainLeadBuyer() {
  return (
    <>
    <TopHeadingSection/>
    <HeroSectionMainLeadBuyer/>
    <LeadGenerationSection/>
    <ExclusiveLeadsComingSoon/>
    <RealNumbers/>
    <ChooseYourTrade trades={[
  { label: "Fence & Gate Installation", image: "/homepage/fenceandgate.webp", link: "fencing-contractors-near-me" },
  { label: "Driveway Installation", image: "/homepage/driveway.webp", link: "driveway-installers-near-me" },
  { label: "Patio Laying", image: "/homepage/patiolayer.webp", link: "patio-layers-near-me" },
  { label: "Artificial Grass Installation", image: "/homepage/artificialgrassinstallation.webp", link: "artificial-grass-installers-near-me" },

  { label: "Landscaping", image: "/homepage/landscapingservice.webp", link: "landscape-gardeners-near-me" },
  { label: "Tree Surgery", image: "/homepage/treesurgery.webp", link: "tree-surgeon-near-me" },
  { label: "Gutter Cleaning", image: "/homepage/guttercleaning.webp", link: "gutter-cleaning-near-me" },
  { label: "Roofing", image: "/roofing.webp", link: "roofers-near-me" },

  { label: "Painter and Decorator", image: "/homepage/image1.webp", link: "painter-and-decorator-near-me" },
  { label: "Architects", image: "/homepage/image3.webp", link: "architects-near-me" },
  { label: "Airport Transfers", image: "/homepage/image4.webp", link: "airport-transfers-near-me" },
  { label: "Physics and Maths", image: "/homepage/image14.webp", link: "physics-maths-tutors-near-me" },

  { label: "Tutoring", image: "/homepage/image1.webp", link: "tutors-near-me" },
  { label: "Personal Trainers", image: "/homepage/image3.webp", link: "personal-trainers-near-me" },
]}/>
  <UserFeedbackNearMe2 feedbackData={[
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
]} />
    <HowItWorksleadBuyer/>
    <YouWinWork/>
    <WhyProfessionalsLoveLocalists/>
    <ConnectWithClients/>
    <Footer/>
    </>
  )
}

export default MainLeadBuyer