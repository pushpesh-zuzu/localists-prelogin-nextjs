import React from "react";
import Paragraph from "../UI/Typography/Paragraph";
import { Home, Building2, Star, BadgeCheck } from "lucide-react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function RateExperience() {
    return (
        <WrapperBGWidth className="bg-[#00aeef]">
            <div
                className="
        grid grid-cols-2 md:gap-3 gap-2
        md:flex md:flex-row md:items-center md:justify-between
        px-4 md:px-[70px] lg:px-61.5 xl:px-61.5
        pt-[10px] pb-[10px]
      ">
                {/* Item 1 */}
                <div className="flex items-center gap-2 text-white justify-center md:justify-start leading-none mr-4.5 md:mr-0">
                    <Home size={21} />
                    <Paragraph variant="optional" bold="font-normal">
                        10
                        <span className="hidden sm:inline">{" "}Years</span>
                        <span className="inline sm:hidden">Y</span>{" "}
                        Experience
                    </Paragraph>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-2 text-white justify-center md:justify-start leading-none">
                    <Building2 size={21} />
                    <Paragraph variant="optional" bold="font-normal">
                        2,700+ Projects <span className="hidden md:inline">Completed</span>
                    </Paragraph>
                </div>

                {/* Item 3 */}
                <div className="flex items-center gap-2 text-white justify-center md:justify-start leading-none">
                    <Star size={21} fill="white" />
                    <Paragraph variant="optional" bold="font-normal">
                        10 Year Guarantee
                    </Paragraph>
                </div>

                {/* Item 4 */}
                <div className="flex items-center gap-2 text-white justify-center md:justify-start leading-none">
                    <BadgeCheck size={21} />
                    <Paragraph variant="optional" bold="font-normal">
                        Fully Accredited
                    </Paragraph>
                </div>
            </div>
        </WrapperBGWidth>
    );
}

export default RateExperience;