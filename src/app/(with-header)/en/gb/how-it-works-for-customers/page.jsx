import WrapperBGWidth from "@/app/component/common/WrapperBGWidth/WrapperBGWidth";
import Footer from "@/app/component/Footer/Footer";
import HeroSection from "@/app/component/HowItWorks/HeroSection/HeroSection";
import FindLocalServices from "./FindLocalServices";
import ServicesSteps from "./ServicesSteps";
import RegisterNow from "@/app/component/HowItWorks/RegisterNow/RegisterNow";
import SEO from "@/app/component/common/seo/SEO";



export const metadata = {
  title: "How It Works for Customers - Localists",
  description: "Find trusted local professionals fast with Localists.com. Enter your details, get up to 5 free quotes, compare, and save – no commission or hidden fees.",

};

export default function Page() {
  return (
    <main>
      <SEO
        canonicalPath="/en/gb/how-it-works-for-customers"
        breadcrumb={[
          { title: "How it works for customers", path: "/en/gb" },
          { title: "How it works for customers", path: "/en/gb/how-it-works-for-customers" },
        ]}
        conversion={true}
      />

      <HeroSection />
      <WrapperBGWidth>
        <FindLocalServices />
        <ServicesSteps />
        <RegisterNow />
      </WrapperBGWidth>
      <Footer />
    </main>
  );
}