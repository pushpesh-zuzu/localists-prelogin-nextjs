import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import PainterAndDecoratorNearMe from "@/app/component/Nearme/PainterDecoratorNearMe/PainterAndDecoratorNearMe";

export const metadata = {
    title: "Painter and Decorator Near Me | Free Quotes | Localists.com",
    description:
        " Looking for a skilled painter and decorator near you? Compare free no-obligation quotes from trusted pros in your local area. Zero stress. Zero Cost.",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/painter-and-decorator-near-me"
                bannerImage="/nearme/painter/Painter.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Painter and Decorator", path: "en/gb/painter-and-decorator-near-me" },
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
                <PainterAndDecoratorNearMe />
            </Suspense>
        </>
    );
}
