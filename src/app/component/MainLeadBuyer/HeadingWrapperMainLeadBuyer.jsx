import React from "react";
import NearmeH2Heading from "../Nearme/NearmeH2Heading";
import Paragraph from "../UI/Typography/Paragraph";

function HeadingWrapperMainLeadBuyer({headdingblue="", headingblack="", className="",description=""}) {
  return (
    <div className="mb-5 lg:mb-8 xl:mb-12">
      <NearmeH2Heading
        headdingblue={headdingblue}
        headingblack={headingblack}
        className="mb-5 lg:mb-8 xl:mb-12"
      />
      <Paragraph
        variant="primarySmall"
        bold="font-normal"
        className=" text-[#253238]"
      >
        {description}
      </Paragraph>
    </div>
  );
}

export default HeadingWrapperMainLeadBuyer;
