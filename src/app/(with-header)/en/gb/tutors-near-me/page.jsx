import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import Tutors from "@/app/component/Nearme/Tutors/Tutors";

export const metadata = {
    title: "Find a Physics and Maths Tutor from just £25ph | Localists",
    description:
        "Find a fully qualified physics and maths tutor that can help you with A levels, GCSE, Undergraduate and Postgraduate degrees. Get a free quote now.",
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
                    { title: "Tutoring", path: "/en/gb/tutors-near-me" },
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
