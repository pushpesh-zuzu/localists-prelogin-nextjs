import SEO from "@/app/component/common/seo/SEO";
import ContactUs from "@/app/component/ContactUs/ContactUs";
import Footer from "@/app/component/Footer/Footer";

export const metadata = {
    title: "Get in Touch with Localists | Customer & Professional Support",
    description:
        "Have questions or need help? Contact Localists & speak with our team, find professionals, or join as a service provider. We’re here to help you connect.",
};



export default function Page() {
    return (
        <main>
            <SEO
                canonicalPath="/en/gb/contact-us"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Contact us", path: "en/gb/contact-us" },
                ]}
                conversion={true}
            />
            <ContactUs />
            <Footer />
        </main>
    );
}