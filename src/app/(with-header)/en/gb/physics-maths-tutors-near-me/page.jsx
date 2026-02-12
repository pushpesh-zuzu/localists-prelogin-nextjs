import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import PhysicsAndMaths from "@/app/component/Nearme/PhysicsAndMaths/PhysicsAndMaths";

export const metadata = {
    title: "Find a Physics and Maths Tutor from just £25ph | Localists",
    description:
        "Find a fully qualified physics and maths tutor that can help you with A levels, GCSE, Undergraduate and Postgraduate degrees. Get a free quote now.",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/physics-maths-tutors-near-me"
                bannerImage="/nearme/physics-maths.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Lessons & Training", path: "en/gb/lessons-training" },
                    { title: "Physics and Maths", path: "en/gb/physics-maths-tutors-near-me" },
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
                <PhysicsAndMaths />
            </Suspense>
        </>
    );
}
