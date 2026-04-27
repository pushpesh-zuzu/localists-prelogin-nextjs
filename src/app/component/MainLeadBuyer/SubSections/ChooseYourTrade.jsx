"use client";
import React, { useState } from "react";
import Image from "next/image";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import Button from "../../UI/Typography/Button";
import H4 from "../../UI/Typography/H4";

/**
 * Props:
 *  trades - array of { label: string, image: string }
 *  initialVisible - number of trades to show initially (default 8)
 *  onTradeClick - handler when a trade card is clicked (receives trade object)
 */
function ChooseYourTrade({ trades = [], initialVisible = 12,initialVisibleMobile=6, onTradeClick }) {
  const [visibleCount, setVisibleCount] = useState(initialVisible);
   const [visibleCountMobile, setVisibleCountMobile] = useState(initialVisibleMobile);

  const visibleTrades = trades.slice(0, visibleCount);
  const hasMore = visibleCount < trades.length;
const visibleTradesMobile = trades.slice(0, visibleCountMobile);
  const hasMoreMobile = visibleCountMobile < trades.length;
  return (
    <WrapperBGWidth className="">
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px]">
        <HeadingWrapperMainLeadBuyer
          headdingblue="Choose Your"
          headingblack="Trade"
          description="Tell us what you do and start getting found by local customers."
        />

        {/* Trade Grid */}
        <div className="mt-8 hidden md:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 lg:gap-12">
          {visibleTrades.map((trade, index) => (
            <div
              key={`${trade.label}-${index}`}
              onClick={() => onTradeClick && onTradeClick(trade)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group md:w-[186px] md:h-[200px] xl:w-[264px] xl:h-[256px] w-[140px] h-[136px]"
            >
              {/* Next.js Image */}
              <Image
                src={trade.image} 
                alt={trade.label}
                width={264}
                height={256}
                className="md:w-[186px] md:h-[200px] xl:w-[264px] xl:h-[256px] w-[140px] h-[136px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />

              {/* Label */}
              <H4 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 translate-y-[0%] text-white">
                {trade.label}
              </H4>
            </div>
          ))}
        </div>
        <div className="mt-8 grid md:hidden grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 lg:gap-12">
          {visibleTradesMobile.map((trade, index) => (
            <div
              key={`${trade.label}-${index}`}
              onClick={() => onTradeClick && onTradeClick(trade)}
              className="relative rounded-2xl overflow-hidden cursor-pointer group md:w-[186px] md:h-[200px] xl:w-[264px] xl:h-[256px] w-[140px] h-[136px]"
            >
              {/* Next.js Image */}
              <Image
                src={trade.image}
                alt={trade.label}
                width={264}
                height={256}
                className="md:w-[186px] md:h-[200px] xl:w-[264px] xl:h-[256px] w-[140px] h-[136px] object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
                }}
              />

              {/* Label */}
              <H4 className="absolute bottom-[10%] left-1/2 transform -translate-x-1/2 translate-y-[0%] text-white">
                {trade.label}
              </H4>
            </div>
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="hidden md:flex justify-center mt-8 md:mt-12">
            <Button
              variant="primary"
              onClick={() => setVisibleCount((prev) => prev + initialVisible)}
              className=" cursor-pointer rounded-full min-w-[116px] md:min-w-[143px] bg-[#253238] hover:bg-[#0099cc] text-white px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
            >
              Load More
            </Button>
          
          </div>
        )}
         {hasMoreMobile && (
          <div className="flex md:hidden justify-center mt-8 md:mt-12">
          
            <Button
              variant="primary"
              onClick={() => setVisibleCountMobile((prev) => prev + initialVisibleMobile)}
              className="cursor-pointer rounded-full min-w-[116px] md:min-w-[143px] bg-[#253238] hover:bg-[#0099cc] text-white px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
            >
              Load More
            </Button>
          </div>
        )}
      </div>
    </WrapperBGWidth>
  );
}

export default ChooseYourTrade;
