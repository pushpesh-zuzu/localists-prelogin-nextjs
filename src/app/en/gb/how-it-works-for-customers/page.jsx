import WrapperBGWidth from "@/app/component/common/WrapperBGWidth/WrapperBGWidth";
import Footer from "@/app/component/Footer/Footer";
import HeroSection from "@/app/component/HowItWorks/HeroSection/HeroSection";
import FindLocalServices from "./FindLocalServices";
import ServicesSteps from "./ServicesSteps";
import RegisterNow from "@/app/component/HowItWorks/RegisterNow/RegisterNow";



export const metadata = {
  title: "How It Works for Customers - Localists",
  description: "Find trusted local professionals fast with Localists.com. Enter your details, get up to 5 free quotes, compare, and save – no commission or hidden fees.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://dev2.localistsbooster.com/en/gb/how-it-works-for-customers",
    languages: {
      "en-GB": "https://dev2.localistsbooster.com/en/gb/how-it-works-for-customers"
    },
  },

  openGraph: {
    title: "How It Works for Customers - Localists",
    description:
      "Find trusted local professionals fast with Localists.com. Enter your details, get up to 5 free quotes, compare, and save – no commission or hidden fees.",
    url: "https://www.localists.com/en/gb/how-it-works-for-customers",
    siteName: "Localists",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "How It Works for Customers - Localists",
    description:
      "Find trusted local professionals fast with Localists.com. Enter your details, get up to 5 free quotes, compare, and save – no commission or hidden fees.",
  },
};

export default function Page() {
  return (
    <main>
      <HeroSection />
      <WrapperBGWidth>
        <FindLocalServices/>
        <ServicesSteps/>
        <RegisterNow />
      </WrapperBGWidth>
      <Footer />
    </main>
  );
}