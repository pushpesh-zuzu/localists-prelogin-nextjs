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
import Member from '../Member'
import { useScrollToTop } from '@/utils/handleScrollToBottom'
import ProjectDetails from '../ProjectDetails'
import RoofOptionsIconsData from './RoofOptionsIconsData'

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

function LocalistsRoof() {
    useRegistrationRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <Header />
            <RateExperience />
            <HeroSection
                title="Get A Free Roofing Quote"
                heading="Find Your Local Roofing Company"
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
                <Member
                    description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                />
            </div>
            <Footer />
        </>
    )
}

export default LocalistsRoof