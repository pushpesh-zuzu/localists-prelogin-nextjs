"use client";
// import Image from "next/image";
import { memo, useState } from "react";
// import { searchService } from "@/lib/store/searchSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import H1 from "../../UI/Typography/H1";
import Paragraph from "../../UI/Typography/Paragraph";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
// import SearchIcon from "../../common/icons/HomePageIcons/SearchIcon";
import ChevroliteDoubleDownIcon from "../../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import Paragraph1 from "../../UI/Typography/Paragraph1";
import TrustpioletIcon from "../../common/icons/HomePageIcons/TrustpioletIcon";
import HeroSectionSearch from "./HeroSectionSearch";
import Link from "next/link";

const HeroSection = memo(function HeroSection() {
  const services = [
    {
      title: "Landscapers",
      slug: "/en/gb/landscape-gardeners-near-me",
    },
    {
      title: "Patio Layers",
      slug: "/en/gb/patio-layers-near-me",
    },
    {
      title: "Fence & Gate Installers",
      slug: "/en/gb/fencing-contractors-near-me",
    },
     {
      title: "Tree Surgeons",
      slug: "/en/gb/tree-surgeon-near-me",
    },
    {
      title: "Private Tutors",
    },
    {
      title: "Personal Trainers",
    },
    {
      title: "Painter Decorators",
    },
    
    {
      title: "Architects",
    },
    {
      title: "Airport Transfers",
    },
    {
      title: "Physics and Maths Tutors",
    },
  ];

  const [showAllServices, setShowAllServices] = useState(false);
  const displayedServices = showAllServices ? services : services.slice(0, 5);
  const displayedServicesMediusScreen = showAllServices
    ? services
    : services.slice(0, 9);

  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  const [Show, setShow] = useState(false);

  return (
    <WrapperBGWidth background={"#00aeef"}>
      <section
        className="flex flex-col lg:flex-row gap-[40px] lg:gap-[72px] min-h-[543px] sm:min-h-[376px] xl:min-h-[670px] bg-[#00AEEF] px-[30px] pt-10 pb-5 md:px-[60px] md:pt-[38px] md:pb-6 xl:px-[120px] xl:py-[72px]"
        role="banner"
        aria-label="Hero section"
      >
        <div className="w-full lg:w-1/2 flex flex-col">
                        <TrustpioletIcon className="lg:min-h-[54px] max-h-[28px] max-w-[184px] md:max-w-[177px] lg:max-w-[360px] mb-[16.54px] md:mb-3 lg:mb-[30px] lg:max-h-12" />
  

          <h1 className="font-Inter font-black
        tracking-[-0.03em]
        text-[62px] leading-[62px]
        md:text-[60px] md:leading-[55px]
        lg:text-[81px] lg:leading-[75px] text-white block  text-shadow-[0_2.03px_2.03px_0_#0000001A]">
            <p className="md:hidden lg:block">
              Find Local <span className="block whitespace-nowrap">Services. <span className="hidden md:inline-block text-[#253238]">Fast.</span></span>
              <span className="block md:hidden text-[#253238]">Fast.</span>
            </p>
            <div className="hidden md:block lg:hidden ">
              Find Local{" "}
              <div className="flex">
                <span className="block">Services.</span>
                &nbsp;<span className="text-[#253238] block">Fast.</span>
              </div>
            </div>
          </h1>
          <p
            className="font-[Arial] font-bold tracking-[-0.03em] text-[28px] leading-[28px]
                      sm:text-[28px] sm:leading-[28px]
                      lg:text-[28px] lg:leading-[28px] max-w-full sm:max-w-full text-white pt-[20px] md:pt-2 lg:pt-[18px] text-shadow-[0px 0px 4px 0px #00000040]
                      md:text-shadow-[0px 4px 4px 0px #00000026] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
          >
            Get instant quotes from local professionals.
          </p>
          <HeroSectionSearch />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
          <Paragraph1 className="text-white -tracking-[3%] pb-4 md:pb-4 lg:pb-[30px] text-shadow-[0px_0px_4px_0px_#00000040]">
            Popular Services:
          </Paragraph1>

          <div className="hidden lg:flex flex-wrap gap-2 xl:gap-3">
            {services.map((service) =>
              service?.slug ? (
                <a
                  key={service.title}
                  href={service.slug}
                  className="border xl:border-2 border-white family-55  px-1.5 py-[5px] xl:px-3.5 xl:py-[7px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none"
                  aria-label={`Search for ${service.title}`}
                >
                  <Paragraph>{service.title}</Paragraph>
                </a>
              ) : (
                <button
                  key={service.title}
                  href={service.slug}
                  className="border xl:border-2 border-white family-55  px-1.5 py-[5px] xl:px-3.5 xl:py-[7px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none"
                  aria-label={`Search for ${service.title}`}
                >
                  <Paragraph>{service.title}</Paragraph>
                </button>
              ),
            )}
          </div>

          <div className="md:hidden w-full">
            <div className="flex flex-wrap gap-2">
              {displayedServices?.map((service) =>
                service?.slug ? (
                  <a
                    key={service.title}
                    href={service.slug}
                    className="border-2 border-white px-3 py-0.5 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none "
                    aria-label={`Search for ${service.title}`}
                  >
                    <p className="text-base md:text-sm sm:text-[18px] font-[Arial] font-bold tracking-[-0.03em] ">
                      {service.title}
                    </p>
                  </a>
                ) : (
                  <button
                    key={service.title}
                    href={service.slug}
                    className="border-2 border-white px-3 py-0.5 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none "
                    aria-label={`Search for ${service.title}`}
                  >
                    <p className="text-base md:text-sm sm:text-[18px] font-[Arial] font-bold tracking-[-0.03em] ">
                      {service.title}
                    </p>
                  </button>
                ),
              )}
            </div>

            {services.length > 5 && (
              <div className="flex justify-center mt-5">
                <button
                  className=" font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                  onClick={() => setShowAllServices(!showAllServices)}
                  aria-label={
                    showAllServices
                      ? "Show less services"
                      : "Show more services"
                  }
                >
                  <ChevroliteDoubleDownIcon />
                </button>
              </div>
            )}
          </div>
          <div className="hidden md:block lg:hidden w-full">
            <div className="flex flex-wrap gap-2">
              {displayedServicesMediusScreen.map((service) =>
                service?.slug ? (
                  <a
                    key={service.title}
                    href={service?.slug}
                    className="border-2 border-white px-3 py-0.5 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none "
                    aria-label={`Search for ${service.title}`}
                  >
                    <p className="text-base md:text-sm sm:text-[18px] font-[Arial] font-bold tracking-[-0.03em] ">
                      {service.title}
                    </p>
                  </a>
                ) : (
                  <button
                    key={service.title}
                    className="border-2 border-white px-3 py-0.5 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none "
                    aria-label={`Search for ${service.title}`}
                  >
                    <p className="text-base md:text-sm sm:text-[18px] font-[Arial] font-bold tracking-[-0.03em] ">
                      {service.title}
                    </p>
                  </button>
                ),
              )}
            </div>

            {services.length > 5 && (
              <div className="flex justify-center mt-5">
                <button
                  className=" font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                  onClick={() => setShowAllServices(!showAllServices)}
                  aria-label={
                    showAllServices
                      ? "Show less services"
                      : "Show more services"
                  }
                >
                  <ChevroliteDoubleDownIcon />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </WrapperBGWidth>
  );
});

export default HeroSection;
