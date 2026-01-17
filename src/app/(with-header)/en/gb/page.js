import CloseBrowserAbandon from '@/app/component/common/CloseBrowserAbandon/CloseBrowserAbandon'
import Footer from '@/app/component/Footer/Footer'
import AdviceInsight from '@/app/component/Home/AdviceInsight/AdviceInsight'
import DiscoverServices from '@/app/component/Home/DiscoverServices/DiscoverServices'
import HeroSection from '@/app/component/Home/HeroSection/HeroSection'
import HireRelatedToService from '@/app/component/Home/HireRelatedToService/HireRelatedToService'
import HowItWork from '@/app/component/Home/HowItWork'
import Member from '@/app/component/Home/Member/Member'
import PopularCard from '@/app/component/Home/PopularCard/PopularCard'
import UserFeedback from '@/app/component/Home/UserFeedback/UserFeedback'
import { articles, feedbackData, tabData } from '@/constants/homepageData'
import React from 'react'

function page() {
  return (
      <main className="bg-white">
         <CloseBrowserAbandon />
      <HeroSection />
      <PopularCard />
      <HowItWork />
      <DiscoverServices />
      <UserFeedback feedbackData={feedbackData} />
      <AdviceInsight articles={articles} />
      <HireRelatedToService tabData={tabData} />
      <Member />
      <Footer />
      </main>
  )
}

export default page