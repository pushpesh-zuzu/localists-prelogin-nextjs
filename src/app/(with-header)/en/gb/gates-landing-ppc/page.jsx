import { Suspense } from "react";
import LandingNewPPC from "@/app/component/LandingNewPPC/LandingNewPPC";
export const metadata = {
    title: "Compare Free Quotes from Local Gating Companies | Localists",
    description:
        "Get free quotes from top gating companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
 robots: {
    index: false,
    follow: false,
  },
    };
export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <LandingNewPPC
                serviceId={49}
                serviceName="Fence & Gate Installation"
                subHeading="gate company"
                title="Gate installers"
            />
        </Suspense>
    );
}
