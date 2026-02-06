"use client";

import { useState, useEffect, useRef } from "react";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";
import Button from "../UI/Typography/Button";
// import GetQuote from "../common/GetQuotes/GetQuote";


const insights = [
    "Tree Surgeon",
    "Landscaping",
    "Tutoring",
    "Physics and Maths",
    "Gutter Cleaning",
    "Airport Transfers",
    "Driveway Installation",
    "Patio Services",
    "Fence & Gate Installation",
    "Artificial Grass Installation",
];

export default function IndustryInsights() {
    const [showAll, setShowAll] = useState(false);
    const [hasOverflow, setHasOverflow] = useState(false);

    const contentRef = useRef(null);

    const COLLAPSED_HEIGHT = {
        mobile: 162,
        tablet: 170,
        desktop: 180,
    };

    useEffect(() => {
        const el = contentRef.current;
        if (!el || showAll) return;

        const observer = new ResizeObserver(() => {
            const width = window.innerWidth;

            const limit =
                width >= 1024
                    ? COLLAPSED_HEIGHT.desktop
                    : width >= 768
                        ? COLLAPSED_HEIGHT.tablet
                        : COLLAPSED_HEIGHT.mobile;

            const TOLERANCE = 4;

            setHasOverflow(el.scrollHeight > limit + TOLERANCE);
        });

        observer.observe(el);
        return () => observer.disconnect();
    }, [showAll, insights.length]);

    return (
        <section className="bg-[#05ACE3] py-12 h-auto
    lg:min-h-[484px]">
            <div className="max-w-[1320px] mx-auto px-4 md:px-8 xl:px-0">

                {/* TITLE – START POSITION */}
                <div className="w-full flex flex-col justify-center">
                    <H1 className="text-white font-extrabold drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">

                        {/* Mobile & Desktop */}
                        <p className="md:hidden lg:block text-[32px] leading-[34px] xl:text-[50px] xl:leading-[52px]">
                            Industry <span className="text-[#253238]">Insights.</span>
                        </p>

                        {/* Tablet only */}
                        <div className="hidden md:block lg:hidden text-[36px] leading-[38px]">
                            Industry
                            &nbsp;<span className="text-[#253238]">Insights.</span>
                        </div>

                    </H1>
                </div>

                <Paragraph1
                    className="tracking-[0em]! text-shadow-[0px 0px 4px 0px #00000040] md:text-shadow-[0px 4px 4px 0px #00000026] md:max-w-full sm:max-w-[60%] md:max-w-[450px] lg:max-w-full text-white pt-[18px] md:pt-2 lg:pt-[18px]
                    "
                >
                    Get the latest insights from industries you care about. Just click any
                    of the buttons below to get in depth expert{" "}
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

                <div
                    ref={contentRef}
                    className={`lg:hidden w-full mt-5
            flex flex-wrap gap-x-2 gap-y-3
            overflow-hidden transition-all duration-300
            ${showAll ? "max-h-none" : "max-h-[165px] md:max-h-[170px] lg:max-h-[180px]"}`}
                >
                    {insights.map((item) => (
                        <button
                            key={item}
                            className="border-2 border-white px-3 py-0.5
              rounded-full text-white hover:bg-white
              hover:text-[#00AEEF] transition-all
              whitespace-nowrap focus:outline-none"
                        >
                            <p className="text-base font-bold tracking-[-0.03em]">
                                {item}
                            </p>
                        </button>
                    ))}
                </div>
                {
                    hasOverflow && !showAll && (
                        <div className="flex justify-center mt-6 xl:mt-12">
                            <Button
                                variant="primary"
                                onClick={() => setShowAll(!showAll)}
                                className="py-[7px] xl:py-4 xl:px-[30px] cursor-pointer max-w-fit px-[13px]
                                          hover:bg-[#253238] rounded-full bg-[#253238] text-white
                                          shadow-[0_0_4px_rgba(0,0,0,0.1)]" >
                                Show More
                            </Button>
                        </div>
                    )
                }

                {
                    showAll && (
                        <div className="flex justify-center mt-6 xl:mt-12">
                            <Button
                                variant="primary"
                                onClick={() => setShowAll(false)}
                                className="py-[7px] xl:py-4 xl:px-[30px] cursor-pointer px-[13px]
                                 hover:bg-[#253238] rounded-full bg-[#253238] text-white
                                 shadow-[0_0_4px_rgba(0,0,0,0.1)]"
                            >
                                Show Less
                            </Button>
                        </div>
                    )
                }

            </div>
        </section>
    );
}
