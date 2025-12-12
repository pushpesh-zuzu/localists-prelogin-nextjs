"use client";
import React from "react";
import H2 from "../../UI/Typography/H2";
import HomeGardenCarousel from "../../Carousel/HomeCarousel";
import { carouselData, carouselData1, carouselData3 } from "@/constants/homepageData";
import CarouselCard from "../../Carousel/CarouselCard";

function DiscoverServices() {
  return (
    <div className="md:block px-2.5 py-5 sm:px-10 xl:px-[120px] pt-12 pb-[72px]">
      <H2 className="text-[#00afe3] pb-4 xl:pb-10 text-center">
        Discover <span className="text-black">services.</span>{" "}
      </H2>
      <div>
        <div>
          <div className="flex md:hidden justify-between py-5 xl:pb-10">
            <h2 className="text-[#00AFE3] font-bold text-2xl leading-[18px]">
              Home & Garden
            </h2>{" "}
            <button className="font-bold">See All</button>
          </div>
          <HomeGardenCarousel
            data={carouselData}
            renderCard={(card) => <CarouselCard card={card} />}
            showSpecial={true}
          />
        </div>
        <div className="mt-[30px]">
          <div className="flex md:hidden justify-between py-5 xl:pb-10">
            <h2 className="text-[#00AFE3] font-bold text-2xl leading-[18px]">
              Weddings & Events
            </h2>{" "}
            <button className="font-bold">See All</button>
          </div>
          <HomeGardenCarousel
            data={carouselData1}
            renderCard={(card) => <CarouselCard card={card} />}
            showSpecial={true}
          />
        </div>
        <div className="mt-[30px]">
          <div className="flex md:hidden justify-between py-5 xl:pb-10">
            <h2 className="text-[#00AFE3] font-bold text-2xl leading-[18px]">
              Weddings & Events
            </h2>{" "}
            <button className="font-bold">See All</button>
          </div>
          <HomeGardenCarousel
            data={carouselData3}
            renderCard={(card) => <CarouselCard card={card} />}
            showSpecial={true}
          />
        </div>

      </div>
    </div>
  );
}

export default DiscoverServices;
