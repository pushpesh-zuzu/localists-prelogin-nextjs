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
                heading="We're Your Local Roofing Company In Swansea"
                description="Complete the form below to get a free quote from us today"
                bannerImage="/newppc/roofbanner.webp"
                altText="Professional roofers roofing a new build with ceramic roof tiles"
                serviceId={113}
                serviceName="Roofing"
            />
            <UserFeedback feedbackData={ROOFING_FEEDBACK} />
            <HowItWork />
            <ProjectDetails />
            <Member
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    )
}

export default LocalistsRoof