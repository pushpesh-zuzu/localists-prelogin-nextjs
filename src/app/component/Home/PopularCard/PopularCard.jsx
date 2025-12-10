"use client";
import React from "react";
import PopularImageCard from "../../common/PopularImageCard";
import PopularJobs from "./PopularMobileCard";
import Carousel from "../../common/Carousel";
import H2 from "../../UI/Typography/H2";
import NavigationArrows from "../../common/CarouselLeftRightIcon";

function PopularCard() {
  // const cards = [
  //   {
  //     id: 1,
  //     path: "/fenceinstallation.webp",
  //     title: "Fence & Gate Installation",
  //   },
  //   { id: 2, path: "/patiolaying.webp", title: "Patio Laying" },
  //   { id: 3, path: "/landscapper.webp", title: "Landscaping" },
  //   { id: 4, path: "/roofinginstallatin.webp", title: "Roofing" },
  //   {
  //     id: 5,
  //     path: "/drivewaysinstallation1.webp",
  //     title: "Driveway Installation",
  //   },
  //   {
  //     id: 6,
  //     path: "/artificialinstallation.webp",
  //     title: "Artificial Grass Installation",
  //   },
  //   { id: 7, path: "/tree-surgeon.webp", title: "Tree Surgery" },
  // ];
  const cards = [
    {
      id: 1,
      path: "/homepage/image16.webp",
      title: "Tree surgeon",
    },
    { id: 2, path: "/homepage/image17.webp", title: "Landscaping" },
    { id: 3, path: "/homepage/image18.webp", title: "Personal Trainer" },
    { id: 4, path: "/homepage/image19.webp", title: "Driveways" },
    {
      id: 5,
      path: "/fenceinstallation.webp",
      title: "Fence & Gate Installation",
    },
    // {
    //   id: 6,
    //   path: "/artificialinstallation.webp",
    //   title: "Artificial Grass Installation",
    // },
    // { id: 7, path: "/tree-surgeon.webp", title: "Tree Surgery" },
  ];
  return (
    <div className="h-full lg:min-h-[587px] xl:min-h-[657px] px-7.5 md:px-10 xl:px-[120px] pt-12 pb-[68px]">
      <H2 className="text-[#00afe3] pb-7">
        Popular <span className="text-black">jobs.</span>
      </H2>
      <div className="hidden md:flex justify-end mb-2.5 ">
        <NavigationArrows />
      </div>
      <div className="hidden md:block ">
        <Carousel visibleItems={4} autoSlideInterval={10000}>
          {cards.map((card) => (
            <PopularImageCard
              key={card.id}
              path={card.path}
              title={card.title}
            />
          ))}
        </Carousel>
      </div>
      <div className="block md:hidden">
        <PopularJobs />
      </div>
    </div>
  );
}

export default PopularCard;
