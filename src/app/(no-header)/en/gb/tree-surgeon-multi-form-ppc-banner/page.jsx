import MultiStepTreeSurgeon from "@/app/component/MultiStepFormPPC/MultiStepTreeSurgeon/MultiStepTreeSurgeon";
import React from "react";
export const metadata = {
  title: "Find Quality Tree Surgeons Near Me | Localists",
  description:
    "Find fully qualified tree surgeons near me. Certified and skilled arborists. Safe tree removal & pruning. Get free quotes from local experts in your area.",
  robots: {
    index: false,
    follow: false,
  },
};

function page() {
  return <MultiStepTreeSurgeon serviceId={112} isQuestionWithImage />;
}

export default page;
