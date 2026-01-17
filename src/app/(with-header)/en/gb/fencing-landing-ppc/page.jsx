import { Suspense } from "react";
import LandingNewPPC from "@/app/component/LandingNewPPC/LandingNewPPC";
export const metadata = {
    title: "Compare Free Quotes from Local Fencing Companies | Localists",
    description:
        "Get free quotes from top fencing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
};  


export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <LandingNewPPC
                serviceId={49}
                serviceName="Fence & Gate Installation"
                subHeading="fencing pro"
                title="Fencing installers"
            />
        </Suspense>
    );
}
