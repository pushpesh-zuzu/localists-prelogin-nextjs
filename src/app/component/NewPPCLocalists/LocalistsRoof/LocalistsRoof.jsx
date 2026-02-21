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
import {
    PopularCategoriesData
} from "@/constants/CloneCategory";
import PopularCategories from "@/app/component/category/popularCategories/ClonePopularCategories";
import { useScrollToTop } from '@/utils/handleScrollToBottom'

const endpointCategoryMap = {
    home: [
        "General Builders",
        "Landscaping",
        "Fence & Gate Installation",
        "Driveway Installation",
        "Patio Laying",
        "Artificial Grass Installation",
        "Tree Surgery",
        "Gutter Cleaning",
        "Roofing",
        "Painter and Decorator"
    ],
};

function LocalistsRoof() {
    useRegistrationRedirect();
    useScrollToTop()

    const allowedTitles = endpointCategoryMap.home;

    const filteredCategories = React.useMemo(() => {
        return PopularCategoriesData?.filter(item =>
            allowedTitles.includes(item.title)
        );
    }, []);
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
            <div className="lg:px-[84px] md:px-[30px] px-0 [&>*]:!pt-0">
                <PopularCategories data={filteredCategories} />
            </div>
            <Member
                description={`“The thing I like about Localists is they don’t tie you down to any monthly contracts and the leads are generally better.  When I’m quiet, I just hop on the website and get a few leads to tie me over.”`}
            />
            <Footer />
        </>
    )
}

export default LocalistsRoof