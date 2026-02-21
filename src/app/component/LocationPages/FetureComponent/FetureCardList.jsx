"use client";

import { useState } from "react";
import FeatureCard from "./FeatureCard";
import { FetureSearchBox } from "./FetureSearchBox";
import Button1 from "../../UI/Typography/Button1";

export default function FetureCardList() {
  const cards = [
    { id: 1,featured: true },
    { id: 2, },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];

  const STEP = 4;

  const [visibleCount, setVisibleCount] = useState(STEP);
  const [enableInnerScroll, setEnableInnerScroll] = useState(false);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + STEP);

    // first click ke baad internal scroll enable
    if (!enableInnerScroll) {
      setEnableInnerScroll(true);
    }
  };

  const visibleCards = cards.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-[1115px]  px-[10px]  py-[40px] md:py-[50px] md:px-16  xl:px-[120px] lg:py-[72px]">
      <FetureSearchBox />

      {/* Card Container */}
      <div
        className={`
          ${enableInnerScroll ? "max-h-[1205px] overflow-y-auto px-1 mt-2.5 md:mt-[84px]" : ""}
        `}
      >
        <div className="flex flex-col gap-10">
        {visibleCards.map((card,index) => (
          <FeatureCard index={index} key={card.id} featured={card.featured} />
        ))}
        </div>
      </div>

      {/* Show More */}
      
        <div className="flex justify-center pt-6">
          <button className="hover:bg-[#00afe3]  bg-black text-white
                              text-base
                              md:text-[16px]
                              lg:text-[18px]
                              px-[15px] py-2  xl:py-[15px] xl:px-7 h-fit rounded-full
                              shadow-[0_0_4px_rgba(0,0,0,0.1)
                              cursor-pointer disabled:opacity-70
                              inline-flex items-center justify-center
                              rounded-full
                              font-[Arial] font-bold
                              tracking-[-0.03em]
                              text-center align-middle
                              "
       disabled={visibleCount > cards.length} variant="secondary"
          //  onClick={handleShowMore}
           >
            Show more
          </button>
        </div>
    
    </div>
  );
}