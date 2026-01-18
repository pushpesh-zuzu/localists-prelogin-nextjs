"use client";

import { useState } from "react";
import ChevronUpIcon from "../../../../public/ReactIcons/ChevronUpIcon";
import ChevronDownIcon from "../../../../public/ReactIcons/ChevronDownIcon";
import H5 from "@/app/component/UI/Typography/H5";

const FAQComponent = ({
    FrequentlyQuestion = [],
    lang = "en",
    country = "gb",
}) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const toggle = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    return (
        <div className="w-full px-[120px] max-[1024px]:px-2">
            <div className="space-y-[14px]">
                {FrequentlyQuestion.map((item, index) => {
                    const isOpen = index === activeIndex;

                    const updatedDescription = item?.description
                        ?.replace(/__LANG__/g, lang)
                        ?.replace(/__COUNTRY__/g, country);

                    return (
                        <div
                            key={item.key}
                            className="
                bg-white
                border border-[#D9D9D9]
                rounded-[20px]
                overflow-hidden
              "
                        >
                            {/* HEADER */}
                            <button
                                onClick={() => toggle(index)}
                                className="
                  w-full
                  flex items-center justify-between
                  px-[30px] py-[27px]
                  text-left
                  cursor-pointer

                transition-colors duration-200

                  max-[768px]:pl-[10px]
                  max-[768px]:pr-[30px]
                  max-[768px]:py-[22px]
                " >
                                <H5 className="max-[768px]:leading-[27px]">
                                    {item.title}
                                </H5>

                                <span
                                    className={`
    ml-[12px] shrink-0
    transition-transform duration-300 ease-in-out
    self-center
    max-[768px]:self-start
    max-[768px]:mt-[4px]
    ${isOpen ? "rotate-180" : "rotate-0"}
  `}
                                >
                                    {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                                </span>

                            </button>

                            {/* CONTENT */}
                            <div
                                className={`
                  grid transition-all duration-300 ease-in-out
                  ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                `}
                            >
                                <div className="overflow-hidden">
                                    <div
                                        className="
                      px-[30px]
                      pt-[1px]
                      pb-[18px]

                      font-[Arial]
                      text-[20px]
                      leading-[28px]
                      text-[#253238]
                      tracking-[-0.03em]

                      [&_*]:m-0
                      [&_p]:mb-[12px]
                      [&_ul]:pl-[18px]
                      [&_ul]:list-disc
                      [&_li]:mb-[8px]

                      max-[768px]:px-[10px]
                      max-[768px]:pt-[12px]
                      max-[768px]:pb-[22px]
                      max-[768px]:text-[16px]
                      max-[768px]:leading-[24px]
                    "
                                        dangerouslySetInnerHTML={{
                                            __html: updatedDescription,
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FAQComponent;
