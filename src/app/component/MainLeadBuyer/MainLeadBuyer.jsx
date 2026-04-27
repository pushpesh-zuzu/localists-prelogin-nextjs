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
    { label: "Gardening", image: "/homepage/image1.webp" },
    { label: "Plumbing", image: '/homepage/image3.webp' },
    { label: "Electricial", image: '/homepage/image4.webp' },
    { label: "Carpenter", image: '/homepage/image14.webp' },
    { label: "Gardening", image: "/homepage/image1.webp" },
    { label: "Plumbing", image: '/homepage/image3.webp' },
    { label: "Electricial", image: '/homepage/image4.webp' },
    { label: "Carpenter", image: '/homepage/image14.webp' },
    { label: "Gardening", image: "/homepage/image1.webp" },
    { label: "Plumbing", image: '/homepage/image3.webp' },
    { label: "Electricial", image: '/homepage/image4.webp' },
    { label: "Carpenter", image: '/homepage/image14.webp' },
    { label: "Gardening", image: "/homepage/image1.webp" },
    { label: "Plumbing", image: '/homepage/image3.webp' },
    { label: "Electricial", image: '/homepage/image4.webp' },
    { label: "Carpenter", image: '/homepage/image14.webp' },
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