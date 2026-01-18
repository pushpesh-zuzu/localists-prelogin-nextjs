"use client";

import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import H5 from "@/app/component/UI/Typography/H5";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";
import TreeLocationPinIcon from "../../../../public/ReactIcons/TreeLocationPinIcon";

const TreeSurgeryRegionalGuide = ({
    pricingData = [],
    heading1 = "Regional",
    heading2 = "Tree Surgery Costs",
    background = "#FAFAFA",
}) => {
    return (
        <PaddingWrapper background={background} className="mt-[-40px] md:mt-[-60px]">
            {/* HEADING */}
            <div className="text-center mb-[40px]">
                <BlueBlackH2Heading
                    blueText={heading1}
                    blackText={heading2}
                />
            </div>

            {/* GRID */}
            <div
                className="
          grid grid-cols-3 gap-[22px]
          max-w-[1200px] mx-auto

          max-[1023px]:grid-cols-2
          max-[768px]:grid-cols-1
        "
            >
                {pricingData.map((item, index) => (
                    <div
                        key={index}
                        className="
              bg-white
              rounded-[20px]
              px-[20px] py-[25px]
              w-full
            "
                    >
                        {/* HEADER */}
                        <div className="flex items-center gap-[8px] mb-[12px] font-black">
                            <span>
                                <TreeLocationPinIcon clipPathId="clip1" size={18} />
                            </span>

                            <H5 className="text-[#00AFE3]">
                                {item.region}
                            </H5>
                        </div>

                        {/* LIST */}
                        <div className="flex flex-col gap-[10px]">
                            {item.prices.map((price, i) => (
                                <div
                                    key={i}
                                    className="flex justify-between text-[#253238]"
                                >
                                    <Paragraph className="font-bold">
                                        {price.label}
                                    </Paragraph>

                                    <Paragraph>
                                        {price.value}
                                    </Paragraph>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-[10px] flex justify-center">
                <GetCTAButton onClick={handleScrollToBottom} />
            </div>
        </PaddingWrapper>
    );
};

export default TreeSurgeryRegionalGuide;
