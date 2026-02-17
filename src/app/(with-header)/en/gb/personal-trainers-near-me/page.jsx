import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import PersonalTrainers from "@/app/component/Nearme/PersonalTrainers/PersonalTrainers";

export const metadata = {
    title: "Personal Trainers Near Me | Find Local Fitness Professionals - Localists",
    description:
        "Looking for personal trainers near you? Compare vetted personal trainers, including female trainers and in-home sessions. Get free quotes and hire the right trainer today with Localist.",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/personal-trainers-near-me"
                bannerImage="/nearme/personaltrainers/personaltrainers.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Health and Wellness", path: "en/gb/health-and-wellness" },
                    { title: "Personal Trainers", path: "en/gb/personal-trainers-near-me" },
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
                <PersonalTrainers />
            </Suspense>
        </>
    );
}
