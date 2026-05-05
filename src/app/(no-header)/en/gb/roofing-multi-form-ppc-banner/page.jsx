import SEO from "@/app/component/common/seo/SEO";
import MultiStepRoofing from "@/app/component/MultiStepFormPPC/MultiStepFormRoofing/MultiStepRoofing";
import NewMultiStepRoofing from "@/app/component/MultiStepFormPPC/MultiStepFormRoofing/NewMultiStepRoofing";
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
  return (
    <>
      <SEO
        canonicalPath="/en/gb/roofing-multi-form-ppc-banner"
        conversion={false}
      />
      {/* <MultiStepRoofing
        serviceName="Roofing"
        isQuestionWithImage
        serviceId={113}
      /> */}
      <NewMultiStepRoofing
        serviceName="Roofing"
        isQuestionWithImage
        serviceId={113}
      />
    </>
  );
}

export default page;
