import React from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import H5 from "../../UI/Typography/H5";
import Paragraph from "../../UI/Typography/Paragraph";
import Image from "next/image";
import ZigzagCheckIcon from "../../../../../public/mainLeadBuyer/ZigzagCheckIcon";

const features = [
  {
    title: "Pick the jobs you want",
    description:
      "Only pay for the jobs you want to quote for. Big, small, or commercial only. The choice is yours!",
  },
  {
    title: "Full and Genuine Contact Details",
    description:
      "OTP verified phone numbers, as well as the customers' full address, not just the postcode.",
  },
  {
    title: "No Contracts",
    description:
      "You're not tied down to a monthly contract. Just buy your leads, and go.",
  },
  {
    title: "Dedicated Account Manager",
    description:
      "You'll have a dedicated account manager to book in jobs for you, and support when you need it.",
  },
];

function WhyProfessionalsLoveLocalists({ image='/mainLeadBuyer/professionalLocalists.webp' }) {
  return (
    <WrapperBGWidth background={"#F4FCFF"}>
      <div className="bg-[#F4FCFF] px-7.5 sm:px-10 md:px-16 xl:px-[120px] py-12 mt-12 md:py-15 md:mt-15 xl:py-[72px] xl:mt-[72px]">
       <Image
          height={468}
          width={564}
            src={image}
            alt="Why professionals love Localists"
            className=" lg:hidden w-full h-full object-cover rounded-2xl max-w-[564px] max-h-[468px] mb-7.5"
          />
      <HeadingWrapperMainLeadBuyer
        headdingblue="Why professionals love"
        headingblack="Localists"
      />

      <div className="mt-7.5 md:mt-8 flex flex-col lg:flex-row items-center lg:gap-10 xl:gap-16">
        {/* Left — Image */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden">
          <Image
          height={468}
          width={564}
            src={image}
            alt="Why professionals love Localists"
            className="hidden lg:block w-full h-full object-cover rounded-2xl max-w-[564px] max-h-[468px]"
          />
        </div>

        {/* Right — Feature list */}
        <div className="flex-1 w-full flex flex-col gap-5 md:gap-8 xl:gap-12">
          {features.map(({ title, description }) => (
            <div key={title} className="flex items-start md:items-center gap-3 md:gap-4.5">
              {/* Checkmark icon */}
              <span
                className=" w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <ZigzagCheckIcon className="h-12 w-12"/>
              </span>

              <div>
                <H5 className="text-[#253238]">{title}</H5>
                <Paragraph
                  variant="primarySmall"
                  bold={false}
                  className="mt-2 font-normal text-[#253238] tracking-[0em]!"
                >
                  {description}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>  
      </div>
    </WrapperBGWidth>
  );
}

export default WhyProfessionalsLoveLocalists;