"use client";
import React from "react";
// import HomeGardenCarousel from "../../Carousel/HomeCarousel";

import CarouselCard from "../Carousel/CarouselCard";
import HomeGardenCarousel from "../Carousel/HomeCarousel";
import H2 from "../UI/Typography/H2";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function DiscoverNearMe({ homeData = [], businessData = [], eventData = [] }) {
  return (
    <WrapperBGWidth background={"#f7f7f7f7"}>
      <div className=" bg-[#f7f7f7f7] md:block px-[30px] py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 pb-10 xl:pt-[72px] xl:pb-[72px]">
        <H2 className=" text-[#00afe3] pb-5 xl:pb-[50px] text-center">
          Discover <span className="text-[#253238]">services.</span>{" "}
        </H2>
        <div>
          {homeData ? (
            <div>
              <div className="flex lg:hidden justify-between pt-5 md:pt-0 pb-12 md:pb-10 xl:pb-10">
                <h3 className="font-Inter font-black tracking-[-0.03em] text-[30px] leading-[34px] md:text-[30px] md:leading-[35px] lg:text-[50px] lg:leading-[55px] text-[#00AFE3]">
                  Home & Garden
                </h3>{" "}
                <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                  <span className="underline">See all</span>
                </button>
              </div>
              <HomeGardenCarousel
                mobileArrowSpacing={1}
                showArrow={homeData.length ? true : false}
                data={homeData}
                renderCard={(card) => <CarouselCard card={card} />}
                showSpecial={true}
              />
            </div>
          ) : (
            ""
          )}
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
          ) : (
            ""
          )}
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
          ) : (
            ""
          )}
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default DiscoverNearMe;
