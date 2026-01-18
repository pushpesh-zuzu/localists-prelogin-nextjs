"use client";

import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import H5 from "@/app/component/UI/Typography/H5";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

function ProfessionalServiceInstallation({
  topCards = [],
  heading = "Driveway Installation",
  description = `Expert installation ensures quality, durability, and compliance with regulations`,
}) {
  /* GRID COLUMNS BASED ON CARD COUNT */
  const gridCols =
    topCards.length === 4
      ? "grid-cols-4"
      : topCards.length === 3
      ? "grid-cols-3"
      : "grid-cols-2";

  return (
    <PaddingWrapper background="#FAFAFA">
      {/* HEADING */}
      <div className="max-w-[1200px] mx-auto mb-[48px] text-center">
        <BlueBlackH2Heading
          className="max-[768px]:leading-[34px]"
          blueText="Why Choose"
          blackText={`Professional ${heading} ?`}
        />

        <Paragraph
          className="
            mt-[12px]
            text-[#253238]
            text-center
          "
        >
          {description}
        </Paragraph>
      </div>

      {/* TOP GRID */}
      <div
        className={`
          grid ${gridCols}
          gap-[40px]
          mb-[80px]

          max-[1200px]:grid-cols-2
          max-[900px]:grid-cols-2
          max-[640px]:grid-cols-1
          max-[640px]:gap-[40px]
          max-[640px]:mb-0
        `}
      >
        {topCards.map((item, i) => (
          <div key={i} className="text-center">
            {/* ICON */}
            <div
              className="
                mx-auto mb-[16px]
                flex items-center justify-center
                rounded-full
                bg-[#00AEF0]

                w-[75px] h-[75px]
                max-[1024px]:w-[48px] max-[1024px]:h-[48px]
                max-[640px]:w-[75px] max-[640px]:h-[75px]
              "
            >
              {item.icon}
            </div>

            {/* TITLE */}
            <H5>{item.title}</H5>

            {/* TEXT */}
            <div className="px-[34px]">
              <Paragraph
                className="
                  mt-[12px]
                  text-[#253238]
                "
              >
                {item.text}
              </Paragraph>
            </div>
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

export default ProfessionalServiceInstallation;
