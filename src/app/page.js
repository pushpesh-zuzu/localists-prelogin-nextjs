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

export const metadata = {
  title: "Localists.com: Find Trusted Local Services and Professionals",
  description:
    "Connect with verified local experts through Localists.com. Find trusted professionals, compare quotes, and hire the best for your project—quick, easy, and free.",
};

export default function Home() {
  return (
    <main className="bg-white">
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
  );
}
