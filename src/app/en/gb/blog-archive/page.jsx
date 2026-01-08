import BlogGridSection from "@/app/component/BlogArchive/BlogSection/BlogGridSection";
import HeroSection from "../../../component/BlogArchive/HeroSection/HeroSection";
import IndustryInsights from "@/app/component/BlogArchive/IndustryInsights";
import CloseBrowserAbandon from "../../../component/common/CloseBrowserAbandon/CloseBrowserAbandon";
import DiscoverServices from "@/app/component/BlogArchive/DiscoverServices";
import Footer from "@/app/component/Footer/Footer";


export default function Page() {
    return (
        <main className="bg-white">
            <CloseBrowserAbandon />
            <HeroSection />
            <BlogGridSection />
            <IndustryInsights />
            <DiscoverServices />
            <Footer />
        </main>
    );
}