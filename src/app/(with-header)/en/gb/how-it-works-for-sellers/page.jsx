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

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    // canonical: "https://www.localists.com/how-it-works-for-sellers",
    languages: {
      "en-GB": "https://www.localists.com/en/gb/how-it-works-for-sellers"
    },
  },

  openGraph: {
    title: "How It Works for Professionals & Businesses - Localists",
    description:
      "Learn how Localists connect you with ready-to-hire customers in your area. Get quality leads, grow your business, and boost your visibility online today.",
    url: "https://www.localists.com/en/gb/how-it-works-for-sellers",
    siteName: "Localists",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "How It Works for Professionals & Businesses - Localists",
    description:
      "Learn how Localists connect you with ready-to-hire customers in your area. Get quality leads, grow your business, and boost your visibility online today.",
  },
};

const page = () => {
  return (
    <main>
      <SEO conversion />
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
