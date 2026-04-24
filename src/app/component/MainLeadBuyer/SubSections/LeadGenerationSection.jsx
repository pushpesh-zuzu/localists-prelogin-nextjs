"use client";
import React from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import Paragraph from "../../UI/Typography/Paragraph";
import PaddingWrapper from "../../Nearme/PaddingWrapper";
import H3 from "../../UI/Typography/H3";
import Button from "../../UI/Typography/Button";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import ProfileCircleWhiteBGIcon from "../../../../../public/ReactIcons/ProfileCircleWhiteBGIcon";
import MaterailMeasurement from "../../../../../public/ReactIcons/MaterailMeasurement";
import CallCircleWhiteBGIcon from "../../../../../public/ReactIcons/CallCircleWhiteBGIcon";

const steps = [
  {
    step: "Step 1",
    icon: <ProfileCircleWhiteBGIcon/>,
    title: "Create your free profile",
    description:
      "Add your logo, photos of previous work, and a bit about what makes your business special.",
  },
  {
    step: "Step 2",
    icon: <MaterailMeasurement/>,
    title: "Select your service and radius",
    description: "Select the services you offer, and where you offer them",
  },
  {
    step: "Step 3",
    icon: <CallCircleWhiteBGIcon/>,
    title: "Start getting enquiries",
    description:
      "Pick which leads you like best, and start getting enquiries for your services.",
  },
];

function LeadGenerationSection() {
  return (
    <WrapperBGWidth className="">
      
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px] py-12 md:py-15 xl:py-[72px]">
        <HeadingWrapperMainLeadBuyer
          headdingblue="Level up your lead generation with"
          headingblack="Localists"
          description="Setting up is easy. Just create your profile, choose what services you offer and where you offer them, and then you're ready to start getting quotes."
        />
        {/* Step Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-[60px] xl:gap-[78px]">
          {steps.map(({ step, icon, title, description }) => (
            <div
              key={step}
              className="rounded-[20px] md:rounded-[37px] min-h-[216px] md:min-h-[300px] lg:min-h-[382px] pt-5 pb-5 md:pb-0 md:pt-[38px] px-[21px] flex flex-col gap-2.5 md:gap-4"
              style={{ backgroundColor: "#00AFE3" }}
            >
              {/* Icon + Step row */}
              <div className="flex items-center justify-between">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FFFFFF" }}
                >
                  {icon}
                </div>
                <Paragraph
                variant="primarySmall"
                className="text-white tracking-[0em]!"
              > {step}</Paragraph>
              </div>

              {/* Title */}
              <H3 className="text-white mt-3 lg:mt-8">{title}</H3>

              {/* Description */}
              <Paragraph
                bold="font-normal"
                variant="primarySmall"
                className="text-white tracking-[0em]!"
              >
                {description}
              </Paragraph>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            onClick={() => {
              handleScrollToBottom();
            }}
            className="cursor-pointer min-w-[171px] md:min-w-[189px] rounded-full max-w-fit bg-[#10C87B] hover:bg-[#00aef3] text-white mt-[30px] lg:mt-12 px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
          >
            Get Started Now
          </Button>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default LeadGenerationSection;
