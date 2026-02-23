"use client"

import React from 'react'
import CloseBrowserAbandon from '../../common/CloseBrowserAbandon/CloseBrowserAbandon'
import Header from '../Header'
import RateExperience from '../RateExperience'
import HeroSection from '../HeroSection'
import UserFeedback from '../UserFeedback'
import { TREE_SUREON_FEEDBACK } from './TreeSurgeonData'
import useRegistrationRedirect from '@/hooks/useRegistrationRedirect'
import Footer from '../../Footer/Footer'
import HowItWork from '../HowItWorks'
import Member from '../Member'
import { useScrollToTop } from '@/utils/handleScrollToBottom'
import ProjectDetails from '../ProjectDetails'
import TreeSurgeonOptionsData from './TreeSurgeryOptionsIconsData'

const treeSurgeonImages = [
    "/nearme/treesurgery.webp",
    "/nearme/treesurgery1.webp",
    "/nearme/sergeondo.webp",
    "/nearme/tree-climb-remov.webp",
    "/nearme/tree-root-remove.webp",
    "/nearme/tree-remove.webp",
    "/nearme/long-tree-remove.webp",
    "/nearme/treesurgery1.webp",
];

function LocalistsTreeSurgery() {
    useRegistrationRedirect();
    useScrollToTop()
    return (
        <>
            <CloseBrowserAbandon />
            <Header />
            <RateExperience />
            <HeroSection
                title="Get A Free Tree Surgeons Quote"
                heading="We're Your Local Tree Surgeon Company In Swansea"
                description="Complete the form below to get a free quote from us today"
                bannerImage="/newppc/roofbanner.webp"
                altText="Professional tree surgeons carrying out specialist tree work"
                serviceId={112}
                serviceName="Tree Surgery"
                OptionsIconsData={TreeSurgeonOptionsData}
            />
            <UserFeedback feedbackData={TREE_SUREON_FEEDBACK} />
            <HowItWork />
            <ProjectDetails projectImages={treeSurgeonImages} />
            <div className='lg:pt-[100px] pt-[40px]'>
                <Member
                    description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
                />
            </div>
            <Footer />
        </>
    )
}

export default LocalistsTreeSurgery