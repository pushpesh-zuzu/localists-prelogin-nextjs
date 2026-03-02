"use client"

import React from 'react'
import CloseBrowserAbandon from '../../common/CloseBrowserAbandon/CloseBrowserAbandon'
import Header from '../Header'
import RateExperience from '../RateExperience'
import HeroSection from '../HeroSection'
import UserFeedback from '../UserFeedback'
import { ROOFING_FEEDBACK } from './RoofingData'
import useRegistrationRedirect from '@/hooks/useRegistrationRedirect'
import Footer from '../../Footer/Footer'
import HowItWork from '../HowItWorks'
import { useScrollToTop } from '@/utils/handleScrollToBottom'
import ProjectDetails from '../ProjectDetails'
import RoofOptionsIconsData from './RoofOptionsIconsData'
import MemberLocalistsRoof from '../BuyerRegistrationPPC/MemberLocalistsRoof'

const roofingImages = [
    "/roofing.webp",
    "/nearme/Roofing/rooferneatly.webp",
    "/nearme/Roofing/roofrepair.webp",
    "/nearme/Roofing/roofspecialist.webp",
    "/nearme/Roofing/rooferneatly.webp",
    "/nearme/Roofing/roofspecialist.webp",
    "/nearme/Roofing/roofrepair.webp",
    "/roofing.webp",
];

function LocalistsRoof({ heading ="Find Your Local Roofing Company" }) {
    useRegistrationRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <Header />
            <RateExperience />
            <HeroSection
                title="Get A Free Roofing Quote"
                heading={heading}
                description="Complete the form below to get a free quote from us today"
                bannerImage="/newppc/roofbanner.webp"
                altText="Professional roofers roofing a new build with ceramic roof tiles"
                OptionsIconsData={RoofOptionsIconsData}
                serviceId={113}
                serviceName="Roofing"
            />
            <UserFeedback feedbackData={ROOFING_FEEDBACK} />
            <HowItWork />
            <ProjectDetails projectImages={roofingImages}
            />
            <div className='lg:pt-[100px] pt-[40px]'>
                <MemberLocalistsRoof
                    description={`“Today, with over 2,700 roofs completed, I'm proud to say most of our work comes from word of mouth and happy customers. If I wouldn't accept it on my own home, it doesn't go on yours.”`}
                />
            </div>
            <Footer />
        </>
    )
}

export default LocalistsRoof