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

function MainLeadBuyer() {
  return (
    <>
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
    <HowItWorksleadBuyer/>
    <YouWinWork/>
    <WhyProfessionalsLoveLocalists/>
    <ConnectWithClients/>
    <Footer/>
    </>
  )
}

export default MainLeadBuyer