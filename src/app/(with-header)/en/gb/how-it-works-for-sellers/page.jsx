import React from 'react'
import Footer from '@/app/component/Footer/Footer';
import HeroSectionSellers from '@/app/component/HowItWorksSellers/HeroSectionSellers';
import HowItWorksDetail from '@/app/component/HowItWorksSellers/HowItWorksDetail';
import RegisterNow from '@/app/component/HowItWorks/RegisterNow/RegisterNow';
import WrapperBGWidth from '@/app/component/common/WrapperBGWidth/WrapperBGWidth';
import SEO from '@/app/component/common/seo/SEO';

export const metadata = {
  title: "How It Works for Professionals & Businesses - Localists",
  description: "Learn how Localists connect you with ready-to-hire customers in your area. Get quality leads, grow your business, and boost your visibility online today.",

  // robots: {
  //   index: false,
  //   follow: false,
  // },
};

const page = () => {
  return (
    <main>
      <SEO
        canonicalPath="/en/gb/how-it-works-for-customers"
        breadcrumb={[
          { title: "Home", path: "en/gb" },
          { title: "How it works for sellers", path: "en/gb/how-it-works-for-sellers" },
        ]}
        conversion={true}
      />
      <HeroSectionSellers />
      <WrapperBGWidth>
        <HowItWorksDetail />
        <RegisterNow />
      </WrapperBGWidth>
      <Footer />
    </main>
  )
}

export default page
