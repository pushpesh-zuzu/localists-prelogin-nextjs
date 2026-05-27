import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import WebDesigner from "@/app/component/Nearme/WebDesinger/WebDesigner";

export const metadata = {
  title: "Expert Web Design Near Me |Get Free Quotes |Localists.com",
  description:
    " Looking for a reliable web design agency near you? Compare up to 5 free quotes from professional web designers in your area. Zero cost. Zero obligation.",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/web-design-agency-near-me"
                bannerImage="/nearme/WebsiteDesingner/webDesingDesktop.webp"
                breadcrumb={[
                        { title: "Home", path: "/en/gb" },
                        // { title: "Digital Services", path: "/en/gb/digital-services" },
                        { title: "Web Designer", path: "/en/gb/web-design-agency-near-me" },
                        ]}
                conversion={true}
            />
            <Suspense
                fallback={
                    <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
                        <LoadingIndicator size="large" />
                    </div>
                }
            >
                <WebDesigner />
            </Suspense>
        </>
    );
}
