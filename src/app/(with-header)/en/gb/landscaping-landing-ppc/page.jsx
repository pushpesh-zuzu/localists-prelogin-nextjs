import { Suspense } from "react";
import LandingNewPPC from "@/app/component/LandingNewPPC/LandingNewPPC";
export const metadata = {
  title: "Compare Free Quotes from Local Landscapers | Localists",
  description:
    "Compare free quotes from trusted local landscapers in seconds. Submit your details and get matched with top-rated landscapers near you – quick, easy, and hassle-free!",
 robots: {
    index: false,
    follow: false,
  },
  };
export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <LandingNewPPC
        serviceId={"43"}
        serviceName="Landscaping"
        subHeading="Landscaping"
        title="Landscaping"
      />
    </Suspense>
  );
}
