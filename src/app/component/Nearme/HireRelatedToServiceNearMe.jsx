"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import Button from "../UI/Typography/Button";
import Link from "next/link";

const JobButton = ({ title, url }) => {
  if (url) {
    return (
      <div
        aria-label={`Search for ${title}`}
        className="font-[Arial] border-2 xl:border-2 border-white
        font-bold text-[13px] -tracking-[3%] lg:text-[20px]
        px-1.5 py-[5px] xl:px-5 xl:py-[4px]
        rounded-full text-white whitespace-nowrap
        focus:outline-none cursor-pointer
        pointer-events-none"
      >
        <Link href={url} className="pointer-events-auto">
          {title}
        </Link>
      </div>
    );
  }

  return (
    <div
      className="font-[Arial] border-2 xl:border-2 border-white font-bold text-[13px] -tracking-[3%] lg:text-[20px] 
               px-1.5 py-[5px] xl:px-5 xl:py-[4px] rounded-full text-white 
               whitespace-nowrap focus:outline-none cursor-default"
      aria-label={`Search for ${title}`}
    >
      {title}
    </div>
  );
};

const ROWS_PER_CHUNK = 4;

export default function HireRelatedToServiceNearMe({
  heading1 = "Hire with",
  heading2 = "confidence",
  tabData = [],
  headingMiddle = "",
  heightClass = "min-h-[400px] [@media(max-width:360px)]:min-h-[422px]  h-auto md:h-auto lg:min-h-[489.5px] lg:h-auto",
  activeTabkey = "professionals",
  homePageCss=false
}) {
  const sectionRef = useRef(null);
  const [currentTab, setcurrentTab] = useState(activeTabkey);
  const contentRef = useRef(null);

  const [visibleChunks, setVisibleChunks] = useState(1);
  const [rowHeight,     setRowHeight]     = useState(0);
  const [totalRows,     setTotalRows]     = useState(0);
  const [rowGap, setRowGap] = useState(0);
  const handleClick = (activtab) => {
    setcurrentTab(activtab);
  };

  const tabs = [
    { lable: "Find Professionals", activtab: "professionals" },
    { lable: "Popular Jobs",       activtab: "popular"       },
    { lable: "Advice & Insight",   activtab: "insight"       },
    { lable: "Related Service",    activtab: "related"       },
    { lable: "Find Out More",      activtab: "findMore"      },
  ].filter((tab) => tabData?.[tab.activtab]?.length > 0);

  // ── Measure: contentRef ke direct children (JobButton divs) se rows nikalo ──
  const measure = useCallback(() => {
    const container = contentRef.current;
    if (!container) return;

    // Direct children = JobButton wale divs
    const items = Array.from(container.children);
    if (!items.length) return;

    const firstTop = items[0].offsetTop;

    const nextRowItem = items.find((el) => el.offsetTop > firstTop);

    const rh = nextRowItem
      ? nextRowItem.offsetTop - firstTop        // row1 top → row2 top = 1 row height with gap
      : items[0].offsetHeight + 8;             // single row fallback

    const uniqueTops = new Set(items.map((el) => el.offsetTop));
      const gap = parseFloat(getComputedStyle(container).rowGap) || 0;
      setRowGap(gap-2.6);
    setRowHeight(rh);
    setTotalRows(uniqueTops.size);
  }, []);

  useEffect(() => {
    const t = setTimeout(measure, 60);
    const ro = new ResizeObserver(() => measure());
    if (contentRef.current) ro.observe(contentRef.current);
    return () => { clearTimeout(t); ro.disconnect(); };
  }, [measure, currentTab, tabData]);

  const visibleRows = visibleChunks * ROWS_PER_CHUNK;
  const boxHeight   = rowHeight > 0 ? rowHeight * visibleRows-rowGap : undefined;
  const hasMore     = totalRows > visibleRows;
  const hasLess     = !hasMore && visibleChunks > 1 ;

  return (
    <WrapperBGWidth background={"#00AFE3"}>
      <div
        ref={sectionRef}
        className={`bg-[#00AFE3] px-[30px] md:px-16 py-[30px] md:py-[50px] lg:pl-16 xl:px-[120px] lg:py-[72px]  w-full ${heightClass}`}
      >
        <header className="mb-5 md:mb-[35px] xl:mb-12">
          <div className="flex flex-wrap md:flex-col lg:flex-row xl:justify-between items-left gap-7.5 md:gap-6 xl:gap-12">
            <h2
              className="font-Inter font-black
                          tracking-[-0.03em]
                          text-[30px] md:text-[35px] leading-[34px] md:leading-[38px]
                          lg:text-[50px] lg:leading-[55px] text-white md:whitespace-nowrap"
            >
              {heading1}
              {headingMiddle && ` ${headingMiddle}`}

              {headingMiddle ? (
                <span className="md:block break-words text-[#253238]">
                  {" "}
                  {heading2}
                </span>
              ) : (
                <span className="text-[#253238]"> {heading2}</span>
              )}
            </h2>
            <nav className={`flex ${homePageCss ? "gap-0":"gap-1"} sm:gap-4 md:gap-4  xl:gap-7 items-center flex-wrap`}>
              {tabs.map((tab) => {
                const isActive = currentTab === tab.activtab;
                return (
                  <div
                    key={tab.activtab}
                    className={`${
                      isActive ? "border-2 border-white rounded-full" : ""
                    }  font-[Arial] font-bold text-white px-2.5 tracking-[-0.03em]
                      text-[11px] md:text-[14px]
                      xl:text-[18px] py-[3px] sm:px-3 sm:py-1.5 xl:px-4 xl:py-[11px]`}
                  >
                    <span
                      onClick={() => handleClick(tab.activtab)}
                      className="cursor-pointer pointer-events-auto"
                      aria-label={`Open ${tab.lable}`}
                    >
                      {tab.lable}
                    </span>
                  </div>
                );
              })}
            </nav>
          </div>
        </header>

        {/*
          contentRef wali div pe directly style lagao — koi extra wrapper nahi
          height fixed = rowHeight × visibleRows  →  overflow-hidden se clip hoga
          empty space bhi dikhegi kyunki height fixed hai maxHeight nahi
        */}
        <div
          ref={contentRef}
          style={{
            height:    boxHeight !== undefined ? `${boxHeight}px` : "auto",
            minHeight: boxHeight !== undefined ? `${boxHeight}px` : undefined,
          }}
          className="flex flex-wrap content-start
            gap-y-2 xl:gap-[24px] gap-2 lg:gap-[23.92px]
            overflow-hidden transition-[height] duration-300
            w-full md:max-w-full"
        >
          {tabData[currentTab]?.map((item, i) => {
            if (typeof item === "object") {
              return <JobButton key={i} title={item.title} url={item.url} />;
            }
            return <JobButton key={i} title={item} />;
          })}
        </div>

        {/* Show More */}
        {hasMore && (
          <div className="flex justify-center pt-[20px] lg:pt-12 md:pt-[30px]">
            <Button
              variant="primary"
              onClick={() => setVisibleChunks((c) => c + 1)}
              className="py-[7px] xl:py-4 xl:px-[30px] cursor-pointer max-w-fit px-[13px]
                     hover:bg-[#253238] rounded-full bg-[#253238] text-white
                     shadow-[0_0_4px_rgba(0,0,0,0.1)]"
            >
              Show More
            </Button>
          </div>
        )}

        {/* Show Less */}
        {hasLess && (
          <div className="flex justify-center pt-[20px] lg:pt-12 md:pt-[30px]">
            <Button
              variant="primary"
              onClick={() => {
                setVisibleChunks(1);
                setTimeout(() => {
                  const el = sectionRef.current;
                  if (!el) return;
                  const rect = el.getBoundingClientRect();
                  const sectionCenter =
                    rect.top + window.scrollY + rect.height / 2;
                  const viewportCenter = window.innerHeight / 2;
                  window.scrollTo({
                    top: sectionCenter - viewportCenter,
                    behavior: "smooth",
                  });
                }, 350);
              }}
              className={`${!(totalRows > ROWS_PER_CHUNK) ? 'opacity-0':'opacity-100'} py-[7px] xl:py-4 xl:px-[30px] cursor-pointer px-[13px]
                     hover:bg-[#253238] rounded-full bg-[#253238] text-white
                     shadow-[0_0_4px_rgba(0,0,0,0.1)]`}
            >
              Show Less
            </Button>
          </div>
        )}
      </div>
    </WrapperBGWidth>
  );
}