import HeroSection from "./component/Home/HeroSection/HeroSection";
import HowItWork from "./component/Home/HowItWork";
import PopularCard from "./component/Home/PopularCard/PopularCard";
import UserFeedback from "./component/Home/UserFeedback/UserFeedback";
import HireRelatedToService from "./component/Home/HireRelatedToService/HireRelatedToService";
import Footer from "./component/Footer/Footer";
import DiscoverServices from "./component/Home/DiscoverServices/DiscoverServices";
import Member from "./component/Home/Member/Member";
import AdviceInsight from "./component/Home/AdviceInsight/AdviceInsight";
import { articles, feedbackData, tabData } from "@/constants/homepageData";
import CloseBrowserAbandon from "./component/common/CloseBrowserAbandon/CloseBrowserAbandon";
import Header from "./component/Header/Header";
import Script from "next/script";

export const metadata = {
  title: "Localists.com: Find Trusted Local Services and Professionals",
  description:
    "Connect with verified local experts through Localists.com. Find trusted professionals, compare quotes, and hire the best for your project—quick, easy, and free.",
};

export default function Home() {
  return (
    <main className="bg-white">
      <Script type="application/ld+json">
        {
          `{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "name": "Localists",
              "url": "https://www.localists.com/en/gb/",
              "logo": "https://www.localists.com/assets/logo-CQuAsOMd.png",
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
              "image": "https://www.localists.com/assets/logo-CQuAsOMd.png",
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
        </Script>
      <CloseBrowserAbandon />
      {/* <div suppressHydrationWarning> */}
        <Header />
      {/* </div> */}
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
  );
}
