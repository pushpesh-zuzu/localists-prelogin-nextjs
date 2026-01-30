// app/tree-surgeons-near-me/page.tsx

import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";
import FenceAndGateInstallation from "@/app/component/Nearme/FenceAndGateInstallation/FenceAndGateInstallation";


export default function Page() {
    return (
        <>
            <SEO
                canonicalPath="/en/gb/fencing-contractors-near-me"
                bannerImage="/nearme/treeSurgeon.webp"
                breadcrumb={[
                    { title: "Home & Garden", path: "/home" },
                    { title: "Fence & Gate Installation", path: "/fencing-contractors-near-me" },
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
