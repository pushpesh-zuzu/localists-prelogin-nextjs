"use client";
import React, { useState } from "react";
import PopularImageCard from "../../common/PopularImageCard";
import PopularJobs from "./PopularMobileCard";
import H2 from "../../UI/Typography/H2";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import PopularCardCarousel from "../../Carousel/PopularCardCarousel";
import PopularJobsCarousel from "../../Carousel/PopularJobsCarousel";
import TreeIcon from "../../common/icons/HomePageIcons/TreeIcon";
import FenceAndGateInstallationIcon from "../../common/icons/HomePageIcons/FenceAndGateInstallationIcon";
import DrivewayIcon from "../../common/icons/HomePageIcons/DrivewayIcon";
import PatioLayingIcon from "../../common/icons/HomePageIcons/PatioLayingIcon";
import LandscapingPopularJobsIcon from "../../common/icons/HomePageIcons/LandscapingPopularJobsIcon";
import ArtificialGrassIcon from "../../common/icons/HomePageIcons/ArtificialGrassIcon";
import RoofingIcon from "../../common/icons/HomePageIcons/RoofingIcon";
import PainterIcon from "../../common/icons/HomePageIcons/PainterIcon";
import GutterCleaningIcon from "../../common/icons/HomePageIcons/GutterCleaningIcon";
import WebDesingIcon from "../../common/icons/HomePageIcons/WebDesingIcon";
import AccountingIcon from "../../common/icons/HomePageIcons/AccountingIcon";
import ArchitectIcon from "../../common/icons/HomePageIcons/ArchitectIcon";
import BusinessConsultantIcon from "../../common/icons/HomePageIcons/BusinessConsultantIcon";
import TutoringIcon from "../../common/icons/HomePageIcons/TutoringIcon";
import AirportTransportIcon from "../../common/icons/HomePageIcons/AirportTransportIcon";
import WeddingAndPhotoIcon from "../../common/icons/HomePageIcons/WeddingAndPhotoIcon";
import PainterAndDecoratorIcon from "../../common/icons/HomePageIcons/PainterAndDecoratorIcon";
import DJIcon from "../../common/icons/HomePageIcons/DJIcon";
import BookKeepingServiceIcon from "../../common/icons/HomePageIcons/BookKeepingServiceIcon";

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
      image: "/homepage/patiolayer.webp",
      title: "Patio Laying",
      path: "/en/gb/patio-layers-near-me",
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

  const mobileCarouselData = [
    {
      id: 1,
      jobs: [
        {
          id: 1,
          image: <TreeIcon />,
          title: "Tree surgeon",
          path: "/en/gb/tree-surgeon-near-me",
          margin: "mx-4",
        },
        {
          id: 2,
          image: <FenceAndGateInstallationIcon />,
          title: "Fence & Gates Installation",
          path: "/en/gb/fencing-contractors-near-me",
          margin: "mx-2.5",
        },
        {
          id: 3,
          image: <DrivewayIcon />,
          title: "Driveway Installation",
          margin: "mx-2.5",
          path: "/en/gb/driveway-installers-near-me",
        },
        {
          id: 4,
          image: <PatioLayingIcon />,
          title: "Patio Laying",
          margin: "mx-2.5",
          path: "/en/gb/patio-layers-near-me",
        },
        {
          id: 5,
          image: <LandscapingPopularJobsIcon />,
          title: "Landscaping",
          margin: "mx-2.5",
          path: "/en/gb/landscape-gardeners-near-me",
        },
        {
          id: 6,
          image: <ArtificialGrassIcon />,
          title: "Artificial Grass Installation",
          margin: "mx-0",
          path: "/en/gb/artificial-grass-installers-near-me",
        },
      ],
    },
    {
      id: 2,
      jobs: [
        {
          id: 7,
          image: <RoofingIcon />,
          title: "Roofing",
          path: "/en/gb/roofers-near-me",
          margin: "mx-4",
        },
        {
          id: 8,
          image: <GutterCleaningIcon />,
          title: "Gutter Cleaning",
          path: "/en/gb/gutter-cleaning-near-me",
          margin: "mx-4",
        },
        {
          id: 9,
          image: <WebDesingIcon />,
          title: "Web Design",
          margin: "mx-4",
        },
        {
          id: 10,
          image: <AccountingIcon />,
          title: "Accounting",
          margin: "mx-4",
        },
        {
          id: 11,
          image: <ArchitectIcon />,
          title: "Architects & Planning",
          margin: "mx-2.5",
        },
        {
          id: 12,
          image: <BusinessConsultantIcon />,
          title: "Business Consulting",
          margin: "mx-2.5",
        },
      ],
    },
    {
      id: 3,
      jobs: [
        {
          id: 13,
          image: <BookKeepingServiceIcon />,
          title: "Bookkeeping Services",
          margin: "mx-4",
        },

        {
          id: 14,
          image: <DJIcon />,
          title: "DJ",
          margin: "mx-4",
        },

        {
          id: 15,
          image: <PainterAndDecoratorIcon />,
          title: "Wedding Photography",
          margin: "mx-4",
        },
        {
          id: 16,
          image: <WeddingAndPhotoIcon />,
          title: "Wedding Decorations",
          margin: "mx-4",
        },
        {
          id: 17,
          image: <AirportTransportIcon />,
          title: "Airport Transfer",
          margin: "mx-2.5",
        },
        {
          id: 18,
          image: <TutoringIcon />,
          title: "Tutoring",
          margin: "mx-2.5",
        },
      ],
    },
  ];
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
            data={PopularData}
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
