import SEO from "@/app/component/common/seo/SEO";
import CreditBuyingProcess from "@/app/component/Pricing/CreditBuyingProcess";
import PricingCards from "@/app/component/Pricing/PricingCards";
import PricingFAQ from "@/app/component/Pricing/PricingFaq";
import PricingSection from "@/app/component/Pricing/PricingSection";
import StartWinning from "@/app/component/Pricing/StartWinning";

export const metadata = {
    title: "Pricing | Join Free & Connect with Customers - Localists",
    description:
        "Register free on Localists and get customer leads. Only pay a small fee to connect with the ones you want. Keep 100% of what you earn.",
    openGraph: {
        title: "Pricing | Join Free & Connect with Customers - Localists",
        description:
            "Register free on Localists and get customer leads. Only pay a small fee to connect with the ones you want. Keep 100% of what you earn.",
    },
    twitter: {
        title: "Pricing | Join Free & Connect with Customers - Localists",
        description:
            "Register free on Localists and get customer leads. Only pay a small fee to connect with the ones you want. Keep 100% of what you earn.",
    },
};
function page() {
    return (
        <main>
            <SEO conversion />
            <PricingSection />
            <CreditBuyingProcess />
            <PricingCards />
            <PricingFAQ />
            <StartWinning />
        </main>
    )
}

export default page;