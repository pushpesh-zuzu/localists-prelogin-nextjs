import BlogGridSection from "@/app/component/BlogArchive/BlogSection/BlogGridSection";
import HeroSection from "../../../component/BlogArchive/HeroSection/HeroSection";
import IndustryInsights from "@/app/component/BlogArchive/IndustryInsights";
import CloseBrowserAbandon from "../../../component/common/CloseBrowserAbandon/CloseBrowserAbandon";
import DiscoverServices from "@/app/component/BlogArchive/DiscoverServices";
import Footer from "@/app/component/Footer/Footer";


export const metadata = {
    title: "Blog – Latest Guides, Tips & Insights | Localists",
    description: "Explore the Localists blog for expert guides, helpful tips, cost advice and the latest insights on local services across the UK.",

    robots: {
        index: false,
        follow: false,
    },

    alternates: {
        canonical: "https://dev2.localistsbooster.com/en/gb/blog-archive",
        languages: {
            "en-GB": "https://dev2.localistsbooster.com/en/gb/blog-archive"
        },
    },

    openGraph: {
        title: "Blog – Latest Guides, Tips & Insights | Localists",
        description:
            "Explore the Localists blog for expert guides, helpful tips, cost advice and the latest insights on local services across the UK.",
        url: "https://dev2.localistsbooster.com/en/gb/blog-archive",
        siteName: "Localists",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Blog – Latest Guides, Tips & Insights | Localists",
        description:
            "Explore the Localists blog for expert guides, helpful tips, cost advice and the latest insights on local services across the UK.",
    },
};

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