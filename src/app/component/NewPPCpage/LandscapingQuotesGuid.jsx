"use client";

import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import H5 from "@/app/component/UI/Typography/H5";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

import LandscapingIcon from "../../../../public/ReactIcons/LandscapingIcon";
import GroundWorkIcon from "../../../../public/ReactIcons/GroundWorkIcon";
import SubBaseDrainageIcon from "../../../../public/ReactIcons/SubBaseDrainageIcon";
import MaterialIcon from "../../../../public/ReactIcons/MaterialIcon";
import LabourAndMachineryicon from "../../../../public/ReactIcons/LabourAndMachineryicon";
import WasteRemovalIcon from "../../../../public/ReactIcons/WasteRemovalIcon";

function LandscapingQuotesGuid({
    heading1 = "How it",
    heading2 = "Works",
    description = `Get competitive home improvements quotes from leading suppliers in 3 simple steps!`,
}) {
    return (
        <PaddingWrapper>
            {/* HEADING */}
            <div className="text-center mx-auto mb-[48px] mt-[-50px] max-[600px]:mb-[35px]">
                <BlueBlackH2Heading
                    blueText={heading1}
                    blackText={heading2}
                />

                <Paragraph
                    className="
            mt-[12px]
            text-[#253238]
            max-w-[1000px]
            mx-auto
          "
                >
                    {description}
                </Paragraph>
            </div>

            {/* FEATURES */}
            <div
                className="
          grid grid-cols-3 gap-[24px]
          max-w-[1000px]
          mx-auto mb-[50px]
          max-[900px]:grid-cols-1
        "
            >
                <Feature
                    icon={<LandscapingIcon />}
                    text="Site survey and measurements"
                    maxWidth="max-w-[89%]"
                />

                <Feature
                    icon={<GroundWorkIcon />}
                    text="Groundworks and excavation"
                    maxWidth="max-w-[89%]"
                />

                <Feature
                    icon={<SubBaseDrainageIcon />}
                    text="Sub-base and drainage preparation"
                    maxWidth="max-w-[89%]"
                />

                <Feature
                    icon={<MaterialIcon />}
                    text="Materials (paving, stone, concrete, timber, etc.)"
                    maxWidth="max-w-[94%]"
                />

                <Feature
                    icon={<LabourAndMachineryicon />}
                    text="Labour and machinery"
                    maxWidth="max-w-[83%]"
                />

                <Feature
                    icon={<WasteRemovalIcon />}
                    text="Waste removal and site clearance"
                    maxWidth="max-w-[89%]"
                />
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

export default LandscapingQuotesGuid;


function Feature({ icon, text, maxWidth }) {
    return (
        <div
            className="
        bg-white
        rounded-[20px]
        py-[30px]
        text-center
        border border-[#E5E7EB] border-4

      "
        >
            <div className="w-[75px] h-[75px] mx-auto mb-[15px] flex items-center justify-center">
                {icon}
            </div>

            <H5 className={`${maxWidth} mx-auto`}>
                {text}
            </H5>
        </div>
    );
}

