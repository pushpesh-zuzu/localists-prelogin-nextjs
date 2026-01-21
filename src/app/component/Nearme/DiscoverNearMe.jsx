"use client";
import React from "react";
// import HomeGardenCarousel from "../../Carousel/HomeCarousel";

import CarouselCard from "../Carousel/CarouselCard";
import HomeGardenCarousel from "../Carousel/HomeCarousel";
import H2 from "../UI/Typography/H2";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function DiscoverNearMe({ homeData = [], businessData = [], eventData = [] }) {
  return (
    <WrapperBGWidth>
      <div className="md:block px-2.5 py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 xl:pt-12 xl:pb-[72px]">
        <H2 className=" text-[#00afe3] pb-4 xl:pb-10 text-center">
          Discover <span className="text-[#253238]">services.</span>{" "}
        </H2>
        <div>
          {homeData ? (
            <div>
              <div className="flex lg:hidden justify-between pt-5 md:pt-0 pb-12 md:pb-10 xl:pb-10">
                <H2 className="text-[#00AFE3]">Home & Garden</H2>{" "}
                <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                  <span className="underline">See all</span>
                </button>
              </div>
              <HomeGardenCarousel
                showArrow={homeData.length ? true : false}
                data={homeData}
                renderCard={(card) => <CarouselCard card={card} />}
                showSpecial={true}
              />
            </div>
          ):''}
          {businessData.length ? (
            <div className="mt-[30px]">
              <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
                <H2 className="text-[#00AFE3]">Business Services</H2>{" "}
                <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                  <span className="underline">See all</span>
                </button>
              </div>
              <HomeGardenCarousel
                showArrow={businessData.length ? true : false}
                data={businessData}
                renderCard={(card) => <CarouselCard card={card} />}
                showSpecial={true}
              />
            </div>
          ):''}
          {eventData.length ? (
            <div className="mt-[30px]">
              <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
                <H2 className="text-[#00AFE3]">Weddings & Events</H2>{" "}
                <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap ">
                  <span className="underline">See all</span>
                </button>
              </div>
              <HomeGardenCarousel
                showArrow={eventData.length ? true : false}
                data={eventData}
                renderCard={(card) => <CarouselCard card={card} />}
                showSpecial={true}
              />
            </div>
          ):''}
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default DiscoverNearMe;
