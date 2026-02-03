import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import Tutors from "@/app/component/Nearme/Tutors/Tutors";

export const metadata = {
    title: "Find Tutors Near Me From £25ph | Localists",
    description:
        "Find top-rated tutors near you. Vetted, qualified, and background-checked. GCSE, A-Level & all levels. Get free quotes straight to your inbox",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/tutors-near-me"
                bannerImage="/nearme/tutors.webp"
                breadcrumb={[
                    { title: "Home", path: "/en/gb" },
                    { title: "Lessons & Training", path: "/en/gb/lessons-training" },
                    { title: "Tutors", path: "/en/gb/tutors-near-me" },
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
                <Tutors />
            </Suspense>
        </>
    );
}
