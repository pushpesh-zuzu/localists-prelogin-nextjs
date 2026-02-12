import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import FenceAndGateInstallation from "@/app/component/Nearme/FenceAndGateInstallation/FenceAndGateInstallation";

export const metadata = {
    title: "Fencing Companies & Fencing Contractors Near Me | Localists",
    description:
        "Searching for secure fencing contractors near you? Get 5 free quotes from  local fencing companies now.",
};


export default function Page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/fencing-contractors-near-me"
                bannerImage="/nearme/Fencing-Contractors.webp"
                breadcrumb={[
                    { title: "Home", path: "en/gb" },
                    { title: "Home & Garden", path: "en/gb/home" },
                    { title: "Fence & Gate Installation", path: "en/gb/fencing-contractors-near-me" },
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
                <FenceAndGateInstallation />
            </Suspense>
        </>
    );
}
