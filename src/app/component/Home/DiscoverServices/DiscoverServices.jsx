"use client";
import React from "react";
import H2 from "../../UI/Typography/H2";
import HomeGardenCarousel from "../../Carousel/HomeCarousel";
import {
  carouselData,
  carouselData1,
  carouselData3,
} from "@/constants/homepageData";
import CarouselCard from "../../Carousel/CarouselCard";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import Link from "next/link";

function DiscoverServices() {
  return (
    <WrapperBGWidth>
      <div className="md:block px-[30px] py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 xl:pt-12 xl:pb-[72px]">
        <H2 className="hidden lg:block text-[#00afe3] pb-4 xl:pb-10 text-center">
          Discover <span className="text-[#253238]">services.</span>{" "}
        </H2>
        <div>
          <div>
            <div className="flex lg:hidden justify-between pt-5 md:pt-0 pb-12 md:pb-10 xl:pb-10">
              <H2 variant="tercery" className="text-[#00AFE3]">Home & Garden</H2>{" "}
              <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                <Link href="/en/gb/home">
                  <span className="underline">See all</span>
                </Link>
              </button>
            </div>
            <HomeGardenCarousel
              data={carouselData}
              renderCard={(card) => <CarouselCard card={card} />}
              showSpecial={true}
              mobileArrowSpacing={0}
            />
          </div>
          <div className="mt-[30px]">
            <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
              <H2 variant="tercery" className="text-[#00AFE3]">Business Services</H2>{" "}
              <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap">
                <span className="underline">See all</span>
              </button>
            </div>
            <HomeGardenCarousel
              data={carouselData1}
              renderCard={(card) => <CarouselCard card={card} />}
              showSpecial={true}
              mobileArrowSpacing={0}
            />
          </div>
          <div className="mt-[30px]">
            <div className="flex lg:hidden justify-between pt-5 pb-12 xl:pb-10">
              <H2 variant="tercery" className="text-[#00AFE3]">Weddings & Events</H2>{" "}
              <button className="font-bold text-xs sm:text-base tracking-[0.03em] leading-[18px] whitespace-nowrap ">
                <span className="underline">See all</span>
              </button>
            </div>
            <HomeGardenCarousel
              data={carouselData3}
              renderCard={(card) => <CarouselCard card={card} />}
              showSpecial={true}
              mobileArrowSpacing={0}
            />
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default DiscoverServices;
