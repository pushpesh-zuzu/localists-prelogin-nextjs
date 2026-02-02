"use client";
import React from "react";
import PopularImageCard from "../../common/PopularImageCard";
import PopularJobs from "./PopularMobileCard";
import H2 from "../../UI/Typography/H2";
import HomeGardenCarousel from "../../Carousel/HomeCarousel";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import PaddingWrapper from "../../common/WrapperBGWidth/PaddingWrapper";
import PopularCardCarousel from "../../Carousel/PopularCardCarousel";

function PopularCard() {
  const PopularData = [
    {
      id: 1,
      image: "/homepage/image16.webp",
      title: "Tree surgeon",
      path: "/en/gb/tree-surgeon-near-me",
    },
    {
      id: 2,
      image: "/homepage/image17.webp",
      title: "Landscapers",
      path: "/en/gb/landscape-gardeners-near-me",
    },
    {
      id: 3,
      image: "/homepage/image18.webp",
      title: "Personal Trainer",
    },
    {
      id: 4,
      image: "/homepage/drivewayPopular.webp",
      title: "Driveways",
      path: "/en/gb/driveway-installers-near-me",
    },
    // {
    //   id: 5,
    //   image: "/fenceinstallation.webp",
    //   title: "Fence & Gate Installation",
    // },
    // {
    //   id: 6,
    //   image: "/artificialinstallation.webp",
    //   title: "Artificial Grass Installation",
    // },

    // {
    //   id: 6,
    //   image: "/homepage/patiolayer.webp",
    //   title: "Patio Layer",
    //   path: "/en/gb/patio-layers-near-me",
    // },
    {
      id: 7,
      image: "/homepage/guttercleaning.webp",
      title: "Gutter Cleaning",
      path: "/en/gb/gutter-cleaning-near-me",
    },
  ];
  return (
    <WrapperBGWidth>
      <PaddingWrapper className="h-full lg:min-h-[587px] xl:min-h-[657px] py-10 md:pt-6 md:pb-6 xl:pt-12 xl:pb-[78px]">
        <H2 className="text-[#00afe3] pb-10 lg:pb-7">
          Popular <span className="text-[#253238]">jobs.</span>
        </H2>

        <div className="hidden md:block select-none">
          <PopularCardCarousel
            data={PopularData}
            renderCard={(card) => <PopularImageCard card={card} />}
            showSpecial={false}
          />
        </div>
        <div className="block md:hidden select-none">
          <PopularJobs />
        </div>
      </PaddingWrapper>
    </WrapperBGWidth>
  );
}

export default PopularCard;
