import MultiStepRoofing from "@/app/component/MultiStepFormPPC/MultiStepFormRoofing/MultiStepRoofing";
import React from "react";
export const metadata = {
  title: " Compare Free Quotes from Local Roofing Companies | Localists",
  description:
    "Get free quotes from top roofing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
  robots: {
    index: false,
    follow: false,
  },
};
function page() {
  return <MultiStepRoofing serviceId={113} />;
}

export default page;
