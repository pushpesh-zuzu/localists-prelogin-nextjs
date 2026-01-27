"use client";

import { useState } from "react";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";
import Button from "../UI/Typography/Button";
import ChevroliteDoubleDownIcon from "../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";


const insights = [
    "Fence & Gate Installation",
    "Driveway Installation",
    "Patio Services",
    "Landscaping",
    "Artificial Grass Installation",
    "Tree Surgeon",
    "Gutter Cleaning",
    "Airport Transfers",
    "Physics and Maths",
    "Tutoring"
];

export default function IndustryInsights() {
    const [showAll, setShowAll] = useState(false);

    const mobileItems = showAll ? insights : insights.slice(0, 5);
    const tabletItems = showAll ? insights : insights.slice(0, 10);


    return (
        <section className="bg-[#05ACE3] py-12">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 xl:px-0">

                {/* TITLE – START POSITION */}
                <div className="w-full flex flex-col justify-center">
                    <H1 className="text-white font-extrabold text-shadow-[0_2.03px_2.03px_0_#0000001A]">

                        {/* Mobile & Desktop */}
                        <p className="md:hidden lg:block text-[32px] leading-[34px] xl:text-[50px] xl:leading-[52px]">
                            Industry <span className="text-[#253238]">Insights.</span>
                        </p>

                        {/* Tablet only */}
                        <div className="hidden md:block lg:hidden text-[36px] leading-[38px]">
                            Industry
                            <div className="flex">
                                &nbsp;<span className="text-[#253238]">Insights.</span>
                            </div>
                        </div>

                    </H1>
                </div>

                <Paragraph1
                    style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
                    className="max-w-[204px] sm:max-w-full text-white pt-[18px] md:pt-2 lg:pt-[18px]"
                >
                    Get the latest insights from industries you care about. Just click any
                    of the buttons below to get in depth expert
                    <span className="lg:block">
                        advice in whichever industry you select.
                    </span>
                </Paragraph1>

                {/* DESKTOP */}
                <div
                    className="
    hidden lg:flex flex-wrap
    gap-x-10 gap-y-10 
    xl:gap-x-5 xl:gap-y-5
    mt-10
  "
                >
                    {insights.map((item, index) => (
                        <button
                            key={index}
                            className="
        border xl:border-2 border-white
        hover:border-[#B4EEFF]
        px-1.5 py-[5px] xl:px-3.5 xl:py-[7px]
        rounded-full cursor-pointer
        text-white
        hover:bg-[#B4EEFF] hover:text-[#00AEEF]
        transition-all duration-200
        whitespace-nowrap focus:outline-none
      "
                            aria-label={`Search for ${item}`}
                        >
                            <span className="font-bold tracking-[-0.03em] text-sm xl:text-base">
                                {item}
                            </span>
                        </button>
                    ))}
                </div>


                {/* MOBILE */}
                <div className="md:hidden w-full mt-5">
                    <div className="flex flex-wrap gap-x-2 gap-y-3">
                        {mobileItems.map((item) => (
                            <button
                                key={item}
                                className="
                border-2 border-white
                px-3 py-0.5
                rounded-full
                text-white
                hover:bg-white hover:text-[#00AEEF]
                transition-all duration-200
                whitespace-nowrap focus:outline-none
              "
                                aria-label={`Search for ${item}`}
                            >
                                <p className="text-base font-bold tracking-[-0.03em]">
                                    {item}
                                </p>
                            </button>
                        ))}
                    </div>

                    {insights.length > 5 && (
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                            >
                                <ChevroliteDoubleDownIcon />
                            </button>
                        </div>
                    )}
                </div>

                {/* TABLET */}
                <div className="hidden md:block lg:hidden w-full mt-7">
                    <div className="flex flex-wrap gap-x-2 gap-y-4">
                        {tabletItems.map((item) => (
                            <button
                                key={item}
                                className="
                border-2 border-white
                px-3 py-0.5
                rounded-full
                text-white
                hover:bg-white hover:text-[#00AEEF]
                transition-all duration-200
                whitespace-nowrap focus:outline-none
              "
                                aria-label={`Search for ${item}`}
                            >
                                <p className="text-base font-bold tracking-[-0.03em]">
                                    {item}
                                </p>
                            </button>
                        ))}
                    </div>

                    {insights.length > 10 && (
                        <div className="flex justify-center mt-5">
                            <button
                                onClick={() => setShowAll(!showAll)}
                                className="font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                            >
                                <ChevroliteDoubleDownIcon />
                            </button>
                        </div>
                    )}
                </div>

                <div className="flex justify-center mt-6 xl:mt-12">
                    <Button className="bg-[#253238] hover:bg-[#1b2326] cursor-pointer px-4.5 py-1 md:px-9 md:py-2 xl:py-3.5 xl:px-[66px] text-white rounded-full">
                        Show More
                    </Button>
                </div>

            </div>
        </section>
    );
}
