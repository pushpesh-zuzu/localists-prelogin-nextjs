import Footer from "../component/Footer/Footer";
import HeroSection from "../component/HowItWorks/HeroSection/HeroSection";
import RegisterNow from "../component/HowItWorks/RegisterNow/RegisterNow";
import FindLocalServices from "./FindLocalServices";
import ServicesSteps from "./ServicesSteps";

export const metadata = {
  title: "How It Works for Customers - Localists",
  description: "Find trusted local professionals fast with Localists.com. Enter your details, get up to 5 free quotes, compare, and save – no commission or hidden fees.",

  robots: {
    index: false,
    follow: false,
  },

  alternates: {
    canonical: "https://www.localists.com/how-it-works-for-customers",
    languages: {
      "en-GB": "https://www.localists.com/en/gb/how-it-works-for-customers"
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
      <FindLocalServices />
      <ServicesSteps />
      <RegisterNow />
      <Footer />
    </main>
  );
}