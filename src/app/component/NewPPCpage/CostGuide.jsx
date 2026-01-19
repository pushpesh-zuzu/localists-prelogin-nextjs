"use client";

import React from "react";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import H4 from "@/app/component/UI/Typography/H4";
import H5 from "@/app/component/UI/Typography/H5";
import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "../../../utils/scroll";

function CostGuide({
    pricing = [],
    factors = [],
    icons = {},
    description = `Understanding the costs involved in driveway installation helps you
  budget effectively. Prices vary based on material, size, and complexity.`,
    heading1 = "Driveway Installation",
}) {
    const renderIcon = (key, props = {}, className = "") => {
        const Icon = icons[key];
        if (!Icon) return null;

        return (
            <Icon
                className={className}
                width={props.size || props.width || "24px"}
                height={props.size || props.height || "24px"}
                bgColor={props.background}
                fillColor={props.color}
                strokeColor={props.strokeColor}
            />
        );
    };

    return (
        <PaddingWrapper>
            {/* Heading */}
            <div className="max-w-[900px] mx-auto mb-[60px] text-center max-[640px]:mb-[30px]">
                <BlueBlackH2Heading blueText={heading1} blackText="Cost Guide" />
                <Paragraph
                    variant="medium"
                    className="mt-[12px] text-[#253238] text-center"
                >
                    {description}
                </Paragraph>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 gap-[40px] max-w-[1200px] mx-auto max-[900px]:grid-cols-1">
                {/* Left - Pricing */}
                <div className="flex flex-col gap-[20px]">
                    {pricing.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white text-[#253238] rounded-[20px] border border-[#E5E7EB] border-3 px-[20px] py-[30px]"
                        >
                            <div className="flex justify-between items-center mb-[16px] max-[640px]:flex-col max-[640px]:items-start max-[640px]:gap-[20px]">
                                <div className="flex items-center gap-[4px]">
                                    {renderIcon(item.icon)}
                                    <H5>{item.title}</H5>
                                </div>
                                <H4 className="text-[#00afe3] font-black">
                                    {item.price}
                                </H4>
                            </div>

                            <Paragraph
                                variant="secondary"
                                className="text-[#253238] text-left"
                            >
                                {item.description}
                            </Paragraph>
                        </div>
                    ))}
                </div>

                {/* Right - Factors */}
                {factors.length > 0 && (
                    <div className="bg-[#f4fbff] rounded-[20px] px-[40px] py-[30px] text-left max-[640px]:px-[20px]">
                        <H4 className="mb-[30px] text-[30px] leading-[34px]">
                            Cost Factors to Consider
                        </H4>

                        <div className="flex flex-col gap-[30px]">
                            {factors.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex gap-[16px] items-start"
                                >
                                    <div className="w-[52px] h-[52px] bg-[#00afe3] rounded-full flex items-center justify-center shrink-0">
                                        {renderIcon(item.icon)}
                                    </div>

                                    <div>
                                        <H5 className="mb-[8px] text-left">
                                            {item.title}
                                        </H5>
                                        <Paragraph
                                            variant="medium"
                                            className="text-[#253238]"
                                        >
                                            {item.description}
                                        </Paragraph>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* CTA */}
            <div>
                <GetCTAButton onClick={handleScrollToBottom} />
            </div>
        </PaddingWrapper>
    );
}

export default CostGuide;
