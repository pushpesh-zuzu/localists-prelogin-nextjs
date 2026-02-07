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
import Script from 'next/script'
import React from 'react'

function page() {
  return (
    <main className="bg-white">
      <script type="application/ld+json">
              {
                `{
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "name": "Localists",
                    "url": "https://www.localists.com/en/gb/",
                    "logo": "https://www.localists.com/logodesktop.svg",
                    "sameAs": [
                      "https://www.facebook.com/localistsuk/",
                      "https://www.instagram.com/localists_official/",
                      "https://www.linkedin.com/company/localistsuk/",
                      "https://x.com/LocalistsUK"
                    ]
                  },
                  {
                    "@type": "WebSite",
                    "name": "Localists",
                    "url": "https://www.localists.com/en/gb/",
                    "potentialAction": {
                      "@type": "SearchAction",
                      "target": "https://www.google.com/search?q={search_term_string}+site:localists.com",
                      "query-input": "required name=search_term_string"
                    }
                  },
                  {
                    "@type": "LocalBusiness",
                    "name": "Localists",
                    "image": "https://www.localists.com/logodesktop.svg",
                    "url": "https://www.localists.com/en/gb/",
                    "telephone": "01544 303 020",
                    "address": {
                      "@type": "PostalAddress",
                      "streetAddress": "Chester Business Park",
                      "addressLocality": "Chester",
                      "postalCode": "CH4 9QJ",
                      "addressCountry": "GB"
                    },
                    "geo": {
                      "@type": "GeoCoordinates",
                      "latitude": 53.1630694,
                      "longitude": -2.9000889
                    },
                    "openingHoursSpecification": [
                      {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                          "Monday",
                          "Tuesday",
                          "Wednesday",
                          "Thursday",
                          "Friday",
                          "Saturday",
                          "Sunday"
                        ],
                        "opens": "00:00",
                        "closes": "23:59"
                      }
                    ],
                    "sameAs": [
                      "https://www.facebook.com/localistsuk/",
                      "https://www.instagram.com/localists_official/",
                      "https://x.com/LocalistsUK",
                      "https://www.linkedin.com/company/localistsuk/"
                    ]
                  }
                ]
                  }`
              }
              </script>
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