"use client";

import { useState, useRef } from "react"; // ✅ useRef add kiya
import FeatureCard from "./FeatureCard";
import { FetureSearchBox } from "./FetureSearchBox";
import Button1 from "../../UI/Typography/Button1";

export default function FetureCardList({ serviceId, serviceName }) {
  const cards = [
    { id: 1, featured: true },
    { id: 2 },
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
  const [activeFeture, setActiveFeture] = useState(0);
  const newItemRef = useRef(null); // ✅ ref banaya

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + STEP);

    if (!enableInnerScroll) {
      setEnableInnerScroll(true);
    }

    // ✅ Naye pehle item pe scroll
    setTimeout(() => {
      newItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const visibleCards = cards.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-[1115px] px-[30px] py-[40px] md:py-[50px] md:px-16  xl:px-[120px] lg:py-[72px]">
      <FetureSearchBox serviceId={serviceId} serviceName={serviceName} />

      {/* Card Container */}
      <div
        className={`
          ${enableInnerScroll ? "max-h-[1205px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full overflow-y-auto px-1 pb-0.5 md:pb-[5px] mt-[34px] md:mt-[46px]" : "mt-[34px] md:mt-[46px]"}
        `}
      >
        <div className="flex flex-col gap-4 md:gap-12">
          {visibleCards.map((card, index) => (
            // ✅ Sirf pehle naye item pe ref wali div lagayi
            <div
              key={card.id}
              ref={index === visibleCount - STEP ? newItemRef : null}
            >
              <FeatureCard
                index={index}
                featured={index === activeFeture}
                setActiveFeture={setActiveFeture}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Show More */}
      <div className="flex justify-center pt-10 md:pt-[50px]">
        <button
          className="hover:bg-[#00afe3]  bg-black text-white
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
                              disabled:opacity-70
                              "
          disabled={visibleCount >= cards.length}
          title={visibleCount >= cards.length ? "No more data to show" : ""}
          onClick={handleShowMore}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
