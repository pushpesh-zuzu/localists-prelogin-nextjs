import { Suspense } from "react";
import LandingNewPPC from "@/app/component/LandingNewPPC/LandingNewPPC";

export default function Page() {
  return (
    <Suspense fallback={<div></div>}>
      <LandingNewPPC />
    </Suspense>
  );
}
