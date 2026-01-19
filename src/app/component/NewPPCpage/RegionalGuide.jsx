"use client";

import H2 from "@/app/component/UI/Typography/H2";
import H4 from "@/app/component/UI/Typography/H4";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import RegionPricing from "./RegionPricing";
import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "../../../utils/scroll";

const RegionalGuide = ({
  description = "Average driveway installation costs across different UK regions",
  regionPricingData = [],
  bannerHeading = "UK Average for Standard Driveway (50m²)",
  bannerPrice = "£4,500",
  budget = "Budget: £3,800 | Premium: £8,800",
  heading1 = "Regional",
  heading2 = "Pricing Guide",
  background = "#FAFAFA",
}) => {
  return (
    <PaddingWrapper
      background={background}
      className="
        px-[83px] py-[56px]
        max-[767px]:px-[10px] max-[767px]:py-[40px]
      "
    >
      {/* Heading */}
      <div className="text-center mx-auto mb-[48px] max-[767px]:mb-[40px]">
        <BlueBlackH2Heading blueText={heading1} blackText={heading2} />

        <Paragraph className="mt-[12px] text-[#253238]">
          {description}
        </Paragraph>
      </div>

      {/* Region Pricing */}
      <RegionPricing regionPricingData={regionPricingData} />

      {/* Banner */}
      <div className="flex justify-center mt-[48px] max-[767px]:mt-[40px]">
        <div
          className="
            bg-[#00afe3]
            rounded-[20px]
            px-[102px] py-[33px]
            text-center text-white
            max-w-[850px]
            max-[767px]:px-0 max-[767px]:py-[27px]
            min-[360px]:max-[600px]:px-[50px]
            min-[768px]:max-[1023px]:w-full
          "
        >
          {bannerHeading && <H4 className="text-white">{bannerHeading}</H4>}

          {bannerPrice && (
            <H2 className="my-[18px] text-white">{bannerPrice}</H2>
          )}

          {budget && (
            <Paragraph bold className="text-white font-bold">
              {budget}
            </Paragraph>
          )}
        </div>
      </div>

      {/* CTA */}
      <div>
        <GetCTAButton onClick={handleScrollToBottom} />
      </div>
    </PaddingWrapper>
  );
};

export default RegionalGuide;
