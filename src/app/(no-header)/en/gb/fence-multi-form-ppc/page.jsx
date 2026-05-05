import SEO from "@/app/component/common/seo/SEO";
import MultiStepFormFencing from "@/app/component/MultiStepFormPPC/MultiStepFormFencing/MultiStepFormFencing";
import NewMultiStepFormFencing from "@/app/component/MultiStepFormPPC/MultiStepFormFencing/NewMultiStepFormFencing";
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
  return (
    <>
      <SEO
        canonicalPath="/en/gb/fence-multi-form-ppc"
        conversion={false}
      />
      {/* <MultiStepFormFencing /> */}
      <NewMultiStepFormFencing/>
    </>
  );
}

export default page;
