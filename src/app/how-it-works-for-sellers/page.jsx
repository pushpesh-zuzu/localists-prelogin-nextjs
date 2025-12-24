import React from 'react'
import HeroSectionSellers from '../component/HowItWorksSellers/HeroSectionSellers';
import HowItWorksDetail from '../component/HowItWorksSellers/HowItWorksDetail';
import RegisterNow from '../component/HowItWorks/RegisterNow/RegisterNow';
import Footer from '../component/Footer/Footer';

export const metadata = {
  title: "How It Works for Professionals & Businesses - Localists",
  description: "Learn how Localists connect you with ready-to-hire customers in your area. Get quality leads, grow your business, and boost your visibility online today.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://www.localists.com/how-it-works-for-sellers",
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
      <HeroSectionSellers />
      <HowItWorksDetail />
      <RegisterNow />
      <Footer />
    </main>
  )
}

export default page
