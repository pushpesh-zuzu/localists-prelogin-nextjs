import BlogGridSection from "@/app/component/BlogArchive/BlogSection/BlogGridSection";
import HeroSection from "../../../../component/BlogArchive/HeroSection/HeroSection";
import IndustryInsights from "@/app/component/BlogArchive/IndustryInsights";
import CloseBrowserAbandon from "@/app/component/common/CloseBrowserAbandon/CloseBrowserAbandon";
import DiscoverServices from "@/app/component/BlogArchive/DiscoverServices";
import Footer from "@/app/component/Footer/Footer";
import SEO from "@/app/component/common/seo/SEO";


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
            <DiscoverServices />
            <Footer />
        </main>
    );
}