import React from "react";
import H2 from "../UI/Typography/H2";
import Paragraph from "../UI/Typography/Paragraph";
import GetQuote from "../common/GetQuotes/GetQuote";
import Button1 from "../UI/Typography/Button1";
import NearmeH2Heading from "./NearmeH2Heading";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import PaddingWrapper from "./PaddingWrapper";
import Breadcrumb from "../common/BreadCrum/BreadCrum";
import Button from "../UI/Typography/Button";

function VettedSection({
  isSingular = false,
  vettedHeading1 = "",
  vettedHeading2 = "trust",
  paragraph = [],
  breadcrumb = [],
  buttonText = "View Tree Surgeons",
  getQuoteText = "Get your Quote",
}) {
  return (
    <WrapperBGWidth>
      <div className="md:block px-2.5 py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-[30px] xl:pt-[72px] xl:pb-[72px]">
        <Breadcrumb items={breadcrumb} />
        <div className="pt-7 md:pt-12">
          <NearmeH2Heading
            headdingblue={vettedHeading1}
            headingblack={vettedHeading2}
          />
          <div className="mt-6  flex flex-col gap-6 md:gap-8 lg:gap-[48px]">
            {paragraph.map((item, index) => (
              <Paragraph variant="primarySmall" key={index}>
                {item}
              </Paragraph>
            ))}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-6 mb-2.5">
              <GetQuote text={getQuoteText} />
              <Button className="max-w-fit px-3.5 py-2 xl:py-3 xl:px-7  rounded-full bg-white border-4 border-black text-black shadow-[0_0_4px_rgba(0,0,0,0.1)]">
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default VettedSection;
