import React from "react";
import Paragraph from "../UI/Typography/Paragraph";
import { Home, Building2, Star, BadgeCheck } from "lucide-react";

function RateExperience() {
    return (
        <div
            className="
        grid grid-cols-2 md:gap-3 gap-2
        md:flex md:flex-row md:items-center md:justify-between
        px-4 md:px-[70px] xl:px-61.5
        pt-2 pb-2 md:pt-2.5 md:pb-2.5 xl:pt-[5px] xl:pb-2
        bg-[#00aeef]
      "
        >
            {/* Item 1 */}
            <div className="flex items-center gap-2 text-white justify-center md:justify-start">
                <Home size={20} />
                <Paragraph variant="optional" bold="font-normal">
                    10
                    <span className="hidden sm:inline">{" "}Years</span>
                    <span className="inline sm:hidden">Y</span>{" "}
                    Experience
                </Paragraph>
            </div>

            {/* Item 2 */}
            <div className="flex items-center gap-2 text-white justify-center md:justify-start">
                <Building2 size={20} />
                <Paragraph variant="optional" bold="font-normal">
                    2,700+ Projects <span className="hidden md:inline">Completed</span>
                </Paragraph>
            </div>

            {/* Item 3 */}
            <div className="flex items-center gap-2 text-white justify-center md:justify-start">
                <Star size={20} />
                <Paragraph variant="optional" bold="font-normal">
                    10 Year Guarantee
                </Paragraph>
            </div>

            {/* Item 4 */}
            <div className="flex items-center gap-2 text-white justify-center md:justify-start">
                <BadgeCheck size={20} />
                <Paragraph variant="optional" bold="font-normal">
                    Fully Accredited
                </Paragraph>
            </div>
        </div>
    );
}

export default RateExperience;