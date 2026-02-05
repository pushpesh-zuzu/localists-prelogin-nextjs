import BlogGridSection from "@/app/component/BlogArchive/BlogSection/BlogGridSection";
import HeroSection from "../../../../component/BlogArchive/HeroSection/HeroSection";
import IndustryInsights from "@/app/component/BlogArchive/IndustryInsights";
import CloseBrowserAbandon from "@/app/component/common/CloseBrowserAbandon/CloseBrowserAbandon";
// import DiscoverServices from "@/app/component/BlogArchive/DiscoverServices";
import Footer from "@/app/component/Footer/Footer";
import SEO from "@/app/component/common/seo/SEO";
import DiscoverNearMe from "@/app/component/Nearme/DiscoverNearMe";
import { BLOG_DATA } from "@/app/component/BlogArchive/BlogDiscoverData";
import PostCodeSection from "@/app/component/Nearme/AboutServicesAndQuestions/PostCodeSection";


export const metadata = {
    title: "Blog – Latest Guides, Tips & Insights | Localists",
    description: "Explore the Localists blog for expert guides, helpful tips, cost advice and the latest insights on local services across the UK.",

    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <main className="bg-white">
            <SEO
                conversion={true}
                canonicalPath="/en/gb/blog"
                breadcrumb={[
                    { title: "Home", path: "/en/gb" },
                    { title: "Blog", path: "/en/gb/blog" },
                ]} />
            <CloseBrowserAbandon />
            <HeroSection />
            <BlogGridSection />
            <IndustryInsights />
            <DiscoverNearMe homeData={BLOG_DATA} />
            <div className="px-2.5 sm:px-10 md:px-16 xl:px-[125px]">
                <PostCodeSection serviceId={51}
                    serviceName="Driveway Installation" />
            </div>
            {/* <DiscoverServices /> */}
            <Footer />
        </main>
    );
}