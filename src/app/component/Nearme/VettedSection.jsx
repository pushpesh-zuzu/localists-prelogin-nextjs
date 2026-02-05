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
      <div className="md:block p-[10px] min-[358px]:py-[35px] min-[358px]:px-[30px]  sm:px-10 md:px-16 md:py-10 xl:px-[120px] xl:pt-[71px] xl:pb-[72px]">
        <Breadcrumb items={breadcrumb} />
        <div className="pt-4 lg:pt-10 lg:pt-[58px] max-w-[99%] md:max-h-full">
          <NearmeH2Heading
            headdingblue={vettedHeading1}
            headingblack={vettedHeading2}
          />
          <div className="mt-5 md:mt-6 lg:mt-12 flex flex-col">
            {paragraph.map((item, index) => (
              <Paragraph
                key={index}
                className="tracking-[0em]!"
                bold="font-normal"
                variant="secondary"
              >
                <span
                  dangerouslySetInnerHTML={{ __html: item }} />
              </Paragraph>
            ))}
            <div className="flex flex-wrap justify-center md:justify-start gap-[7px] gap-2.5 lg:gap-6 mb-2.5 mt-[30px] md:mt-[30px] lg:mt-12">
              <GetQuote variant="primary" text={getQuoteText} />
            </div>
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default VettedSection;
