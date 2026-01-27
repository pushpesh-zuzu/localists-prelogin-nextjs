"use client";

import { useState } from "react";
import BlueBlackH2Heading from "./UITypography/BlueBlackH2Heading";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import ServiceTypeCard from "./ServiceTypeCard";
import PaddingWrapper from "@/app/component/UI/PaddingWrapper/PaddingWrapper";
import GetCTAButton from "./UITypography/GetCTAButton";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

function PopularServicesTypes({
    heading1 = "Popular",
    heading2 = "Driveway Types",
    data = [],
    description = `Explore our comprehensive range of driveway installation options to
          find the perfect solution for your property`,
}) {
    const [active, setActive] = useState(null);

    return (
        <PaddingWrapper background="#FAFAFA">
            {/* HEADING */}
            <div className="text-center mx-auto mb-[48px] max-[640px]:mb-[30px]">
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
          "
                >
                    {description}
                </Paragraph>
            </div>

            {/* GRID */}
            <div
                className="
          grid grid-cols-3 gap-[22px]
          max-[1024px]:grid-cols-2
          max-[640px]:grid-cols-1
        "
            >
                {data.length > 0 &&
                    data.map((item, index) => (
                        <ServiceTypeCard
                            key={index}
                            data={item}
                            active={index === active}
                            onMouseEnter={() => setActive(index)}
                            onMouseLeave={() => setActive(null)}
                            onClick={() => setActive(index)}
                        />
                    ))}
            </div>

            {/* CTA */}
            <GetCTAButton text="Get Free Estimates"
                onClick={() => {
                    handleScrollToBottom();
                }}
            />
        </PaddingWrapper>
    );
}

export default PopularServicesTypes;
