"use client";
import React, { useState } from "react";
import PopularImageCard from "../../common/PopularImageCard";
import PopularJobs from "./PopularMobileCard";
import H2 from "../../UI/Typography/H2";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
// import PopularCardCarousel from "../../Carousel/PopularCardCarousel";
// import PopularJobsCarousel from "../../Carousel/PopularJobsCarousel";
import { popularData, mobileCarouselData } from "./PopularData";
import dynamic from "next/dynamic";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";


const PopularJobsCarousel = dynamic(
  () => import("../../Carousel/PopularJobsCarousel"),
  {
    loading: () => (
      <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
        <LoaderIndicator size="large" />
      </div>
    ),
    ssr: false
  }
);

const PopularCardCarousel = dynamic(
  () => import("../../Carousel/PopularCardCarousel"),
  {
    loading: () => (
      <div className="flex justify-center items-center min-h-[473px] md:min-h-[560px] py-16">
        <LoaderIndicator size="large" />
      </div>
    ),
    ssr: false
  }
);


function PopularCard() {

  const [activeTooltip, setActiveTooltip] = useState(null);
  return (
    // <WrapperBGWidth>
    //   <div className="px-[30px] md:px-15 xl:px-[120px] h-full lg:min-h-[587px] xl:min-h-[657px] py-10 md:pt-6 md:pb-6 xl:pt-12 xl:pb-[78px]">
    //     <H2 className="text-[#00afe3] pb-10 lg:pb-7">
    //       Popular <span className="text-[#253238]">jobs.</span>
    //     </H2>
    <WrapperBGWidth>
      <div className=" px-5 md:px-15 xl:px-[120px] h-full lg:min-h-[587px] xl:min-h-[657px] py-10 md:pt-6 md:pb-6 xl:pt-12 xl:pb-[78px]">
        <H2 className="text-[#00afe3] px-[30px] md:px-0 pb-10 lg:pb-7">
          Popular <span className="text-[#253238]">jobs.</span>
        </H2>

        <div className="hidden md:block select-none">
          <PopularCardCarousel
            data={popularData}
            renderCard={(card) => <PopularImageCard card={card} />}
            showSpecial={false}
          />
        </div>
        <div className="block md:hidden select-none">
          <PopularJobsCarousel
            carouselData={mobileCarouselData}
            renderSlide={(slide) => (
              <PopularJobs
                setActiveTooltip={setActiveTooltip}
                activeTooltip={activeTooltip}
                jobs={slide.jobs}
              />
            )}
          />
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default PopularCard;
