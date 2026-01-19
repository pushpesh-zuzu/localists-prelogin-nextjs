"use client";

import LocationPinIcon from "../../../../public/ReactIcons/LocationPinIcon";
import H5 from "@/app/component/UI/Typography/H5";
import Paragrah from "@/app/component/UI/Typography/Paragraph2";

export default function RegionPricing({ regionPricingData = [] }) {
    return (
        <div
            className="
        grid grid-cols-3 gap-[22px]
        my-[48px] mx-auto
        max-w-[1200px]
        max-[768px]:grid-cols-1
        min-[768px]:max-[1023px]:grid-cols-2
        min-[1024px]:max-[1399px]:grid-cols-3
        max-[1023px]:mt-[40px]
        w-full
      "
        >
            {regionPricingData.map((item, index) => (
                <div
                    key={index}
                    className="
            bg-white
            rounded-[20px]
            pt-[25px] pr-[24px] pb-[25px] pl-[20px]
            border border-[#E5E7EB] border-3
            min-w-0 overflow-hidden box-border
            w-full
          "
                >
                    {/* Header */}
                    <div className="flex items-center gap-[8px] mb-[12px]">
                        <span>
                            <LocationPinIcon size={18} />
                        </span>
                        <H5 className="text-[22px] text-[#00afe3]">
                            {item.region}
                        </H5>
                    </div>

                    {/* List */}
                    <div className="flex flex-col gap-[10px]">
                        {item.prices.map((price, i) => (
                            <div
                                key={i}
                                className="flex justify-between text-[#253238]"
                            >
                                <Paragrah className="font-bold">
                                    {price.label}
                                </Paragrah>
                                <Paragrah bold={false} className="whitespace-nowrap">
                                    {price.value}
                                </Paragrah>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
