"use client";

import TreeEditIcon from "../../../../public/ReactIcons/TreeEditIcon";
import TreeUserIcon from "../../../../public/ReactIcons/TreeUserIcon";
import TreeDocumentSearchIcon from "../../../../public/ReactIcons/TreeDocumentSearchIcon";

import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import H5 from "@/app/component/UI/Typography/H5";
import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

export default function HowItWorkNewPPC({
  heading1 = "How it",
  heading2 = "Works",
  heading = "What to Expect From a Professional Driveway Installation",
  description = `Get Competitive Home Improvement Quotes From Leading Suppliers in 3 Simple Steps!`,
  steps,
}) {
  const defaultSteps = [
    {
      icon: <TreeEditIcon />,
      text: "Fill in your details for your project",
    },
    {
      icon: <TreeUserIcon />,
      text: "Receive quotes from professionals",
    },
    {
      icon: <TreeDocumentSearchIcon />,
      text: "Compare your quotes and enjoy great savings",
    },
  ];

  const stepsToRender = steps?.length ? steps : defaultSteps;

  return (
    <PaddingWrapper>
      <div className="text-center">
        <div className="mx-auto mb-[48px] max-[600px]:mb-[35px]">
          <BlueBlackH2Heading
            blueText={heading1}
            blackText={heading2}
          />

          <Paragraph
            variant="medium"
            className="
              mt-[12px]
              text-[#253238]
              font-normal
              max-w-[1000px]
              mx-auto
            "
          >
            {description}
          </Paragraph>
        </div>

        <div
          className="
            grid grid-cols-3 gap-[24px]
            max-w-[1000px] mx-auto mb-[50px]
            max-[900px]:grid-cols-1
          "
        >
          {stepsToRender.map((step, index) => (
            <div
              key={index}
              className="
                bg-white text-[#253238]
                rounded-[20px]
                py-[30px]
                text-center
                border border-[#E5E7EB] border-4
              "
            >
              <div className="mb-[15px] flex justify-center">
                <div className="w-[75px] h-[75px] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <H5 className="max-w-[88%] mx-auto">
                {step.text}
              </H5>
            </div>
          ))}
        </div>

        <GetCTAButton
          onClick={() => {
            handleScrollToBottom();
          }}
        />
      </div>
    </PaddingWrapper>
  );
}
