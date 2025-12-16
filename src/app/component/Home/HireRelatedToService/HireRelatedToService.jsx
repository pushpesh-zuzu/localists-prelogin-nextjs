"use client";
import React, { useState } from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";

const JobButton = ({ title }) => (
  <button
    className="font-[Arial] border xl:border-2 border-white font-bold text-[12px] -tracking-[3%] lg:text-[20px] 
               px-1.5 py-[5px] xl:px-5 xl:py-1 rounded-full text-white 
               whitespace-nowrap focus:outline-none"
    aria-label={`Search for ${title}`}
  >
    {title}
  </button>
);

export default function HireRelatedToService() {
  const tabData = {
    professionals: [
      "Electricians in London",
      "Roofers in Edinburgh",
      "Maths Tutor in Manchester",
      "Plumbers in Birmingham",
      "Gardeners in Wolverhampton",
      "Plumbers in Birmingham",
      "Roofers in Norwich",
      "Garden Designers Cardiff",
      "Electricians in London",
      "Roofers in Edinburgh",
      "Patio Layers in Manchester",
      "Plumbers in Birmingham",
    ],
    popular: [
      "Landscapers",
      "Patio Layers",
      "Private Tutors",
      "Roofers",
      "Garden Designers",
      "Maths Tutor",
      "Plumbers",
      "Patio Layers",
      "Roofers",
      "Gardeners",
      "Electricians",
    ],
    insight: [
      "Hiring Tips",
      "Roofing Safety",
      "Electrician Rates",
      "Garden Design",
      "Math Tutoring",
      "Best Patio Materials",
      "Interior Design",
      "Home Renovation",
      "Top Carpenters",
      "Painting Techniques",
      "DIY Gardening Hacks",
    ],
  };
  const [currentTab, setcurrentTab] = useState("professionals");
  const handleClick = (activtab) => {
    setcurrentTab(activtab);
  };
  const tabs = [
    { lable: "Popular Jobs", activtab: "popular" },
    { lable: "Find Professionals", activtab: "professionals" },
    { lable: "Advice & Insight", activtab: "insight" },
  ];
  return (
    <WrapperBGWidth background={"#00AFE3"}>
      <div className="bg-[#00AFE3] md:px-[46px] px-2.5 py-10 md:py-[38px] lg:px-[120px] lg:py-[72px] w-full h-full">
        <header className="mb-5 xl:mb-12">
          <div className="flex flex-wrap sm:flex-nowrap justify-between  items-center gap-7.5 xl:gap-12">
            <h2 className="font-Inter font-black
                          tracking-[-0.03em]
                          text-[24px] leading-7
                          lg:text-[50px] lg:leading-[55px] text-white ">
              Hire with <span className="text-[#023047]">confidence.</span>
            </h2>
            <nav className="flex gap-1 sm:gap-4 xl:gap-7 items-center flex-wrap">
              {tabs.map((tab, index) => (
                <Button
                  key={tab.activtab}
                  onClick={() => handleClick(tab.activtab)}
                  className={`${
                    currentTab === tab.activtab
                      ? "bg-[#253238] rounded-full transition-all duration-700 ease-in-out"
                      : ""
                  } text-white px-[5px] text-[12px] py-2 md:text-[18px] md:px-4 md:py-[11px] cursor-pointer`}
                >
                  {tab.lable}
                </Button>
              ))}
            </nav>
          </div>
        </header>
        <div className="flex flex-wrap gap-y-2 xl:gap-y-[23px] gap-3.5 lg:gap-[23px] w-full xl:max-w-[90%] md:max-w-full">
          {tabData[currentTab].map((title, i) => (
            <JobButton key={i} title={title} />
          ))}
        </div>
      </div>
    </WrapperBGWidth>
  );
}
