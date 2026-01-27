'use client'

import HeroSectionNewPPC from '@/app/component/NewPPCpage/HeroSectionNewPPC';
import HowItWorkNewPPC from '@/app/component/NewPPCpage/HowItWorkNewPPC';
import useRegistrationRedirect from "@/hooks/useRegistrationRedirect";
import SEO from '@/app/component/common/seo/SEO';
import FloatingButtonWrapper from '@/app/component/common/FloatingButton.jsx/FloatingButtonWrapper';
import CloseBrowserAbandon from '@/app/component/common/CloseBrowserAbandon/CloseBrowserAbandon';


function NewGlobalFormPPC() {
    useRegistrationRedirect();
    return (
        <>
            <CloseBrowserAbandon />
            <FloatingButtonWrapper>
                {(heroRef, sectionsStartRef) => (
                    <>
                        <SEO conversion />
                        <div ref={heroRef}>
                            <HeroSectionNewPPC
                                heading0="Find Trusted"
                                heading1="Home Improvement"
                                heading2="Experts Near You"
                                quoteText="Hire a Tradesperson"
                                questionDescription="To find the ideal Driveway Installation specialist for your project, simply complete the quick form below."
                            />
                        </div>

                        <div ref={sectionsStartRef}>
                            <HowItWorkNewPPC />
                        </div>
                    </>
                )}
            </FloatingButtonWrapper>
        </>
    )
}

export default NewGlobalFormPPC