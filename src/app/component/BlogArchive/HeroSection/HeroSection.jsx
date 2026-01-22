"use client";
import { memo, useState } from "react";
import dynamic from "next/dynamic";
import H1 from "../../UI/Typography/H1";
import Paragraph from "../../UI/Typography/Paragraph";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import ChevroliteDoubleDownIcon from "../../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import Paragraph1 from "../../UI/Typography/Paragraph1";
import HeroSectionSearch from "./HeroSectionSearch";

const SearchResults = dynamic(() => import("../../common/SearchResult"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>,
});

const HeroSection = memo(function HeroSection() {
  const services = [
    "All",
    "Cost Guides",
    "Expert Advice",
    "Case Studies",
    "Ideas",
    "News",
    "How to guides",
  ];

  const [showAllServices, setShowAllServices] = useState(false);
  const displayedServices = showAllServices ? services : services.slice(0, 5);
  const displayedServicesMediusScreen = showAllServices
    ? services
    : services.slice(0, 9);

  return (
    <WrapperBGWidth background={"#00aeef"}>
      <section
        className="flex flex-col lg:flex-row items-center gap-[30px] lg:gap-[116px] min-h-[543px] sm:min-h-[356px] xl:min-h-[330px] bg-[#00AEEF] px-[31px] pt-10 pb-5 md:px-[87px] md:pt-[38px] md:pb-6 xl:px-[153px] xl:py-[30px] xl:pb-[62px]"
        role="banner"
        aria-label="Hero section"
      >
        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center xl:ml-[43px] xl:pb-3">
          <H1 className="text-white block text-shadow-[0_2.03px_2.03px_0_#0000001A]">
            <p className="md:hidden lg:block">
              Advice & <span className="text-[#253238] block">insight.</span>
            </p>
            <div className="hidden md:block lg:hidden">
              Advice &
              <div className="flex">
                &nbsp;<span className="text-[#253238] block">Insight.</span>
              </div>
            </div>
          </H1>

          <Paragraph1
            style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
            className="max-w-[204px] sm:max-w-full text-white pt-[18px] md:pt-2 lg:pt-[18px]"
          >
            Get the latest advice, insight and news from
            <span className="lg:block">
              localists with our dedicated blog
            </span>
          </Paragraph1>

        </div>

        {/* RIGHT CONTENT */}
       <div className="w-full lg:w-1/2 flex flex-col justify-center items-start -mt-[30px] lg:mt-0">
          <HeroSectionSearch />

          {/* SPACE BETWEEN SEARCH & SERVICES */}
          <Paragraph1 className="text-white -tracking-[3%] mt-6 md:mt-8 lg:mt-15 pb-4 md:pb-4 lg:pb-[30px] text-shadow-[0px_0px_4px_0px_#00000040]">
            Browse Categories
          </Paragraph1>

          {/* DESKTOP */}
          <div className="hidden lg:flex flex-wrap gap-2 xl:gap-3">
            {services.map((service) => (
              <button
                key={service}
                className="border xl:border-2 border-white hover:border-[#B4EEFF] family-55 px-1.5 py-[5px] xl:px-3.5 xl:py-[7px] rounded-full text-white hover:bg-[#B4EEFF] hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none"
                aria-label={`Search for ${service}`}
              >
                <Paragraph>{service}</Paragraph>
              </button>
            ))}
          </div>

          {/* MOBILE */}
          <div className="md:hidden w-full">
            <div className="flex flex-wrap gap-2">
              {displayedServices.map((service) => (
                <button
                  key={service}
                  className="border-2 border-white px-3 py-0.5 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none"
                  aria-label={`Search for ${service}`}
                >
                  <p className="text-base sm:text-[18px] font-bold tracking-[-0.03em]">
                    {service}
                  </p>
                </button>
              ))}
            </div>

            {services.length > 5 && (
              <div className="flex justify-center mt-5">
                <button
                  className="font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                  onClick={() => setShowAllServices(!showAllServices)}
                >
                  <ChevroliteDoubleDownIcon />
                </button>
              </div>
            )}
          </div>

          {/* TABLET */}
          <div className="hidden md:block lg:hidden w-full">
            <div className="flex flex-wrap gap-2">
              {displayedServicesMediusScreen.map((service) => (
                <button
                  key={service}
                  className="border-2 border-white px-3 py-0.5 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none"
                  aria-label={`Search for ${service}`}
                >
                  <p className="text-base sm:text-[18px] font-bold tracking-[-0.03em]">
                    {service}
                  </p>
                </button>
              ))}
            </div>

            {services.length > 5 && (
              <div className="flex justify-center mt-5">
                <button
                  className="font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                  onClick={() => setShowAllServices(!showAllServices)}
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
