"use client";
import React, { useState, useRef, useEffect } from "react";
// import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
// import GetQuote from "../../common/GetQuotes/GetQuote";

const JobButton = ({ title, url }) => {
  if (url) {
    return (
      <button
        className="font-[Arial] border-2 xl:border-2 border-white
        font-bold text-[12px] -tracking-[3%] lg:text-[20px]
        px-1.5 py-[5px] xl:px-5 xl:py-1
        rounded-full text-white whitespace-nowrap
        focus:outline-none cursor-pointer
        pointer-events-none"
      >
        <a
          href={url}
          className="pointer-events-auto"
          aria-label={`Search for ${title}`}
        >
          {title}
        </a>
      </button>
    );
  }

  return (
    <button
      className="font-[Arial] border-2 xl:border-2 border-white font-bold text-[13px] -tracking-[3%] lg:text-[20px] 
               px-1.5 py-[5px] xl:px-5 xl:py-[4px] rounded-full text-white 
               whitespace-nowrap focus:outline-none cursor-default"
      aria-label={`Search for ${title}`}
    >
      {title}
    </button>
  );
};

export default function HireRelatedToService({
  heading1 = "Hire with",
  heading2 = "confidence",
  tabData = [],
}) {
  const [currentTab, setcurrentTab] = useState("popular");
  const [showAll, setShowAll] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const contentRef = useRef(null);

  const handleClick = (activtab) => {
    setcurrentTab(activtab);
    setShowAll(false);
  };

  const COLLAPSED_HEIGHT = {
    mobile: 156,
    tablet: 170,
    desktop: 180,
  };

  const tabs = [
    { lable: "Popular Jobs", activtab: "popular" },
    { lable: "Find Professionals", activtab: "professionals" },
    { lable: "Advice & Insight", activtab: "insight" },
  ];

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
  }, [currentTab, tabData, showAll]);

  return (
    <WrapperBGWidth background={"#00AFE3"}>
      <div className="bg-[#00AFE3]  px-2.5 py-10 md:py-[50px] md:pl-16  xl:px-[120px] lg:py-[72px] w-full h-auto
    lg:min-h-[484px]">
        <header className="mb-5 xl:mb-12">
          <div className="flex flex-wrap md:flex-col lg:flex-row xl:justify-between items-left gap-7.5 md:gap-6 xl:gap-12">
            <h2
              className="font-Inter font-black
                          tracking-[-0.03em]
                          text-[30px] md:text-[35px] leading-7 md:leading-6
                          lg:text-[50px] lg:leading-[55px] text-white whitespace-nowrap "
            >
              {heading1} <span className="text-[#023047]">{heading2}.</span>
            </h2>
            <nav className="flex gap-1 sm:gap-4 md:gap-4  xl:gap-7 items-center flex-wrap">
              {tabs.map((tab, index) => (
                <button
                  key={tab.activtab}
                  onClick={() => handleClick(tab.activtab)}
                  className={`${currentTab === tab.activtab
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
        <div
          ref={contentRef}
          className={`
            flex flex-wrap gap-y-2 xl:gap-y-[23px] gap-3.5 lg:gap-[23px]
            w-full md:max-w-full
            overflow-hidden transition-all duration-300
            ${showAll
              ? "max-h-none"
              : "max-h-[156px] md:max-h-[170px] lg:max-h-[180px]"
            }
          `}
        >
          {tabData[currentTab]?.map((item, i) => {
            if (typeof item === "object") {
              return <JobButton key={i} title={item.title} url={item.url} />;
            }

            return <JobButton key={i} title={item} />;
          })}
        </div>
        {hasOverflow && !showAll && (
          <div className="flex flex-wrap justify-center md:justify-start gap-[7px] gap-2.5 lg:gap-6 mb-2.5 mt-[30px] md:mt-[30px] lg:mt-12">
            <Button
              variant="primary"
              onClick={() => setShowAll(!showAll)}
              className="py-[7px] xl:py-4 xl:px-[30px] cursor-pointer max-w-fit px-[13px]
              hover:bg-[#253238] rounded-full bg-[#253238] text-white
              shadow-[0_0_4px_rgba(0,0,0,0.1)]"
            >
              Show More
            </Button>
          </div>
        )}

        {showAll && (
          <div className="flex justify-center md:justify-start gap-2.5 lg:gap-6 mt-[30px] lg:mt-12">
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
        )}
      </div>
    </WrapperBGWidth>
  );
}
