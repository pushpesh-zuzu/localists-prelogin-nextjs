"use client";

import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import FAQComponent from "./FAQComponent";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

const FAQSection = ({
    FrequentlyQuestion = [],
    description = "Get answers to common driveway installation questions",
    background = "white",
}) => {
    return (
        <PaddingWrapper
            background={background}
            className="
        max-[768px]:px-[25px] max-[768px]:py-[40px]
        max-[640px]:mb-[40px]
      "
        >
            {/* HEADING */}
            <div className="text-center mx-auto mb-[48px] max-[768px]:mb-[40px]">
                <BlueBlackH2Heading className="max-[768px]:leading-[34px]"
                    blueText="Frequently"
                    blackText="Asked Questions"
                />

                <Paragraph
                    className="
            mt-[12px]
            text-[#253238]
            max-[768px]:mt-[10px]
          ">
                    {description}
                </Paragraph>
            </div>

            {/* FAQ LIST */}
            {FrequentlyQuestion.length > 0 && (
                <FAQComponent FrequentlyQuestion={FrequentlyQuestion} />
            )}

            {/* CTA */}
            <div className="flex justify-center">
                <GetCTAButton text="Get Free Estimates"
                    onClick={() => {
                        handleScrollToBottom();
                    }}
                />
            </div>
        </PaddingWrapper>
    );
};

export default FAQSection;
