import { Suspense } from "react";
import LandingNewPPC from "@/app/component/LandingNewPPC/LandingNewPPC";
export const metadata = {
    title: "Compare Free Quotes from Local Driveway Companies | Localists",
    description:
        "Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
 robots: {
    index: false,
    follow: false,
  },
    };
export default function Page() {
    return (
        <Suspense fallback={<div></div>}>
            <LandingNewPPC
                serviceId={51}
                serviceName="Driveway Installation"
                subHeading="driveway pro"
                title="Driveway installers"
            />
        </Suspense>
    );
}
