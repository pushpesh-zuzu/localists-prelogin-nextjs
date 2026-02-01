import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import GutterCleaning from "@/app/component/Nearme/GutterCleaning/GutterCleaning";

export const metadata = {
    title: "Find Gutter Cleaning Near Me | Localists",
    description:
        "Find professional gutter cleaners near you who can help deal with dirt and debris in your gutters. Click to get free quotes from gutter cleaners in your area now.",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/gutter-cleaning-near-me"
                bannerImage="/nearme/Gutter-Cleaning.webp"
                breadcrumb={[
                    { title: "Home", path: "/en/gb" },
                    { title: "Home & Garden", path: "/en/gb/home" },
                    { title: "Gutter Cleaning", path: "/en/gb/gutter-cleaning-near-me" },
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
                <GutterCleaning />
            </Suspense>
        </>
    );
}
