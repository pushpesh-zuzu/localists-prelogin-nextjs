"use client";

import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import GetCTAButton from "./UITypography/GetCTAButton";
import H5 from "@/app/component/UI/Typography/H5";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

function TreeSurgeryCostGuide({
  CostGuidData = [],
  heading1 = "Tree Surgery Services",
  headding2 = "Cost Guide",
  description = `Understanding the costs involved in driveway installation helps you
  budget effectively. Prices vary based on material, size, and
  complexity.`,
  maxWidth = "800px",
}) {
  return (
    <PaddingWrapper>
      {/* HEADING */}
      <div className="max-w-[720px] mx-auto mb-[36px] mt-[-20px] text-center">
        <BlueBlackH2Heading
          blueText={heading1}
          blackText={headding2}
          className="
          max-[768px]:leading-[34px]
            flex items-center justify-center gap-[7px]
            whitespace-nowrap
            max-[768px]:whitespace-normal
            max-[768px]:block
          "
        />

        <Paragraph
          className="
            mt-[12px]
            text-[#253238]
          "
        >
          {description}
        </Paragraph>
      </div>

      {/* TABLE */}
      <div
        className="
          bg-white
          rounded-[20px]
          overflow-hidden
          mx-auto
        "
        style={{ maxWidth }}
      >
        {/* HEADER */}
        <div
          className="
            grid grid-cols-2
            bg-[#F2FBFF]
            text-[#00AFE3]
            font-black
            max-[768px]:text-[#253238]
          "
        >
          <H5 className="px-[20px] py-[11px] border border-[#f7f7f7]">
            Service
          </H5>
          <H5 className="px-[20px] py-[11px] border border-[#f7f7f7]">
            Average Price
          </H5>
        </div>

        {/* ROWS */}
        {CostGuidData.map((item, index) => (
          <div
            key={index}
            className="
              grid grid-cols-2
              items-center
              border border-[#f7f7f7]
              gap-[6px]
            "
          >
            <Paragraph
              className="
                px-[20px] py-[11px]
                border-r border-[#f7f7f7]
                font-black
                text-[#253238]
              "
            >
              {item.service}
              {item.description && (
                <span className="font-normal text-[#253238]">
                  {item.description}
                </span>
              )}
            </Paragraph>

            <Paragraph
              className="
                px-[20px] py-[11px]
                font-black
                text-[#253238]
                max-[768px]:text-[#00AFE3]
                max-[768px]:font-bold
              "
            >
              {item.price}
            </Paragraph>
          </div>
        ))}
      </div>

      {/* CTA */}
      <GetCTAButton
        onClick={() => {
          handleScrollToBottom();
        }}
      />
    </PaddingWrapper>
  );
}

export default TreeSurgeryCostGuide;
