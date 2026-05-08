import React, { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import BookKeepersNearMe from "@/app/component/Nearme/BookKeepersNearMe/BookKeepersNearMe";

export const metadata = {
    title: "Bookkeepers Near Me | Local Bookkeeping Services | Localists",
    description:
        "Looking for expert bookkeepers near you? Save time and find qualified bookkeepers in locally or nationwide with Localists. Get quotes in minutes at no cost.",
};
function page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/bookkeepers-near-me"
                bannerImage="/nearme/BookKeeping/bookkeeping_banner1.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Business", path: "" },
                    { title: "Bookkeeping Services", path: "/en/gb/bookkeepers-near-me" },
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
                <BookKeepersNearMe />
            </Suspense>
        </>
    );
}

export default page;
