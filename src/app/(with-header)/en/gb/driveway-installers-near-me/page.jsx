// app/tree-surgeons-near-me/page.tsx

import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import DrivewayInstallers from "@/app/component/Nearme/DrivewayInstallers/DrivewayInstallers";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";

export const metadata = {
    title: "Find Driveway Companies & Driveway Contractors Near Me - Localists",
    description:
        " Find the best local driveway installers and contractors near you. Need resin bound, gravel or tarmac driveways? Get free quotes from local specialists nearby.",
};

export default function Page() {

    return (
        <>
            <SEO
                canonicalPath="/en/gb/driveway-installers-near-me"
                bannerImage="/nearme/Driveway-Installation-Page.webp"
                breadcrumb={[
                    { title: "Home", path: "/en/gb" },
                    { title: "Home & Garden", path: "/en/gb/home" },
                    { title: "Driveway Installers", path: "/en/gb/driveway-installers-near-me" },
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
                <DrivewayInstallers />
            </Suspense>
        </>
    );
}
