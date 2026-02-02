"use client";
import React, { useState } from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import Button from "../UI/Typography/Button";
import { ChevronDown } from "lucide-react";

const JobButton = ({ title }) => (
  <button
    className="font-[Arial] border-2 xl:border-2 border-white font-bold text-[13px] -tracking-[3%] lg:text-[20px] 
               px-1.5 py-[5px] xl:px-5 xl:py-[4px] rounded-full text-white 
               whitespace-nowrap focus:outline-none"
    aria-label={`Search for ${title}`}
  >
    {title}
  </button>
);

export default function HireRelatedToServiceNearMe({
  heading1 = "Hire with",
  heading2 = "confidence",
  tabData = [],
}) {
  const [currentTab, setcurrentTab] = useState("popular");
  const handleClick = (activtab) => {
    setcurrentTab(activtab);
  };
  const tabs = [
    { lable: "Popular Jobs", activtab: "popular" },
    { lable: "Find Professionals", activtab: "professionals" },
    { lable: "Advice & Insight", activtab: "insight" },
  ].filter((tab) => tabData?.[tab.activtab]?.length > 0);
  return (
    <WrapperBGWidth background={"#00AFE3"}>
      <div className="bg-[#00AFE3] px-[30px]  md:px-16 py-[30px] md:py-[50px] lg:pl-16  xl:px-[120px] lg:py-[72px] w-full h-full">
        <header className="mb-5 xl:mb-12">
          <div className="flex flex-wrap md:flex-col lg:flex-row xl:justify-between items-left gap-7.5 md:gap-6 xl:gap-12">
            <h2
              className="font-Inter font-black
                          tracking-[-0.03em]
                          text-[30px] md:text-[35px] leading-7 md:leading-6
                          lg:text-[50px] lg:leading-[55px] text-white md:whitespace-nowrap"
            >
              {heading1} <span className="text-[#253238]">{heading2}</span>
            </h2>
            <nav className="flex gap-1 sm:gap-4 md:gap-4  xl:gap-7 items-center flex-wrap">
              {tabs.map((tab, index) => (
                <button
                  key={tab.activtab}
                  onClick={() => handleClick(tab.activtab)}
                  className={`${
                    currentTab === tab.activtab
                      ? "bg-[#253238] rounded-full transition-all duration-700 ease-in-out"
                      : ""
                  }  font-[Arial] font-bold text-white px-2.5 tracking-[-0.03em]
                      text-[12px] md:text-[14px]
                      xl:text-[18px] py-[3px] sm:px-3 sm:py-1.5 xl:px-4 xl:py-[11px] cursor-pointer`}
                >
                  {tab.lable}
                </button>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex flex-wrap gap-y-2 xl:gap-[24px] gap-2 lg:gap-[23.92px] w-full md:max-w-full">
          {tabData[currentTab].map((title, i) => (
            <JobButton key={i} title={title} />
          ))}
        </div>
        <div className="flex md:hidden justify-center pt-[30px]">
          <Button className="mx-auto flex bg-[#253238] text-white px-[15px] py-2 rounded-full">
            Show More <ChevronDown />
          </Button>
        </div>
      </div>
    </WrapperBGWidth>
  );
}
