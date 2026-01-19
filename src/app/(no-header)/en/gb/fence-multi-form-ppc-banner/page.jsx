import MultiStepFormFencing from "@/app/component/MultiStepFormPPC/MultiStepFormFencing/MultiStepFormFencing";
import React from "react";
export const metadata = {
  title: "Compare Free Quotes from Local Fencing Companies | Localists",
  description:
    "Get free quotes from top fencing companies. Compare local professionals, read reviews, and hire trusted experts – quick and hassle-free.",
  robots: {
    index: false,
    follow: false,
  },
};
function page() {
  return <MultiStepFormFencing isQuestionWithImage />;
}

export default page;
