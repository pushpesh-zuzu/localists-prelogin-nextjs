import SEO from "@/app/component/common/seo/SEO";
import MultiStepFormDriveways from "@/app/component/MultiStepFormPPC/MultiFormDriveways/MultiStepFormDriveways";
import React from "react";
export const metadata = {
  title: "Compare Free Quotes from Local Driveway Companies | Localists",
  description:
    "Get free quotes from trusted local driveway companies. Compare prices, read reviews, and hire top-rated professionals near you – quick and simple.",
  robots: {
    index: false,
    follow: false,
  },
};
function page() {
  return (
    <>
      <SEO
        canonicalPath="/en/gb/driveways-multi-form-ppc"
        conversion={false}
      />
      <MultiStepFormDriveways />
    </>
  )

}

export default page;
