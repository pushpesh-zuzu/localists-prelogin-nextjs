"use client";
import React from "react";
import PopularImageCard from "../../common/PopularImageCard";
import PopularJobs from "./PopularMobileCard";
import H2 from "../../UI/Typography/H2";
import HomeGardenCarousel from "../../Carousel/HomeCarousel";

function PopularCard() {
  const PopularData = [
    {
      id: 1,
      image: "/homepage/image16.webp",
      title: "Tree surgeon",
    },
    { id: 2, image: "/homepage/image17.webp", title: "Landscaping" },
    { id: 3, image: "/homepage/image18.webp", title: "Personal Trainer" },
    { id: 4, image: "/homepage/image19.webp", title: "Driveways" },
    {
      id: 5,
      image: "/fenceinstallation.webp",
      title: "Fence & Gate Installation",
    },
    {
      id: 6,
      image: "/artificialinstallation.webp",
      title: "Artificial Grass Installation",
    },
  ];
  return (
    <div className="h-full lg:min-h-[587px] xl:min-h-[657px] px-7.5 md:px-10 xl:px-[120px] pt-12 pb-[68px]">
      <H2 className="text-[#00afe3] pb-7">
        Popular <span className="text-black">jobs.</span>
      </H2>

      <div className="hidden md:block ">
        <HomeGardenCarousel
          data={PopularData}
          renderCard={(card) => <PopularImageCard card={card} />}
          showSpecial={false}
        />
      </div>
      <div className="block md:hidden">
        <PopularJobs />
      </div>
    </div>
  );
}

export default PopularCard;
