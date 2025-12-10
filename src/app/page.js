import HeroSection from "./component/Home/HeroSection/HeroSection";
import HowItWork from "./component/Home/HowItWork";
import PopularCard from "./component/Home/PopularCard/PopularCard";
import UserFeedback from "./component/Home/UserFeedback/UserFeedback";
import HireRelatedToService from "./component/Home/HireRelatedToService/HireRelatedToService";
import Footer from "./component/Footer/Footer";
import DiscoverServices from "./component/Home/DiscoverServices/DiscoverServices";
import Member from "./component/Home/Member/Member";
import AdviceInsight from "./component/Home/AdviceInsight/AdviceInsight";

export const metadata = {
  title: "Find Local Services Fast | Get Instant Quotes",
  description: "Get instant quotes from local professionals",
};

export default function Home() {
  return (
    <main className="bg-white">
      <HeroSection />
      <PopularCard />
      <HowItWork />
      <DiscoverServices />
      <UserFeedback />
      <AdviceInsight />
      <HireRelatedToService />
      <Member />
      <Footer />
    </main>
  );
}
