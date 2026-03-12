import React from "react";
import Paragraph from "../UI/Typography/Paragraph";
import GetQuote from "../common/GetQuotes/GetQuote";
import NearmeH2Heading from "./NearmeH2Heading";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import Breadcrumb from "../common/BreadCrum/BreadCrum";
import Button from "../UI/Typography/Button";
import UserIcon from "../common/icons/LocationIcons/UserIcon";

function VettedSection({
  isSingular = false,
  vettedHeading1 = "",
  vettedHeading2 = "trust",
  paragraph = [],
  breadcrumb = [],
  buttonText = "View Tree Surgeons",
  getQuoteText = "Get your Quote",
  extraButton= false,
  featureRef,
  featureButtonText="View Roofers",
}) {
  const handleViewRoofers = () => {
  const element = featureRef?.current;
  if (element) {
    const top = element.getBoundingClientRect().top + window.scrollY - 80; // 80px upar
    window.scrollTo({ top, behavior: "smooth" });
  }
};
  return (
    <WrapperBGWidth>
      <div className="md:block py-[35px] px-[30px]  sm:px-10 md:px-16 md:py-10 xl:px-[120px] xl:pt-[71px] xl:pb-[72px]">
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
              {extraButton && <Button onClick={handleViewRoofers}  variant="primary" className="cursor-pointer py-[7px] xl:py-4 xl:px-[30px] max-w-fit px-[13px]  hover:bg-[#00afe3]  rounded-full border-1 flex flex-row justify-center items-center gap-1 md:gap-[13px]"><UserIcon className="h-[18px] w-[18px] md:h-6 md:w-6" />{featureButtonText}</Button>}
            </div>
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default VettedSection;
