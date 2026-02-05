import { Suspense } from "react";
import SEO from "@/app/component/common/seo/SEO";
import DrivewayInstallers from "@/app/component/Nearme/DrivewayInstallers/DrivewayInstallers";
import LoadingIndicator from "@/app/component/common/Loader/LoaderIndicatore";

export const metadata = {
    title: "Local Roofers Near Me | Get Free Quotes | Localists.com",
    description:
        "Find trusted roofers near me. Get 5 free quotes from vetted local roofers in your area. Start your search now!",
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
                    { title: "Roofing", path: "/en/gb/roofers-near-me" },
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
