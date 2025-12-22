import Footer from "../component/Footer/Footer";
import HeroSection from "../component/HowItWorks/HeroSection/HeroSection";
import RegisterNow from "../component/HowItWorks/RegisterNow/RegisterNow";
import FindLocalServices from "./FindLocalServices";
import ServicesSteps from "./ServicesSteps";

export default function Page() {
  return (
    <main>
      <HeroSection />
      <FindLocalServices />
      <ServicesSteps />
      <RegisterNow/>
      <Footer />
    </main>
  );
}