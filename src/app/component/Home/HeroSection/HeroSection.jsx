"use client";

import Image from "next/image";
import { memo, useState } from "react";
import { searchService } from "@/lib/store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import H1 from "../../UI/Typography/H1";
import Paragraph from "../../UI/Typography/Paragraph";
const SearchResults = dynamic(() => import("../../common/SearchResult"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>,
});

const HeroSection = memo(function HeroSection() {
  const services = [
    "Landscapers",
    "Patio Layers",
    "Private Tutors",
    "Fence & Gate Installers",
    "Personal Trainers",
    "Tree Surgeons",
    "Architects",
    "Painter Decorators",
    "Airport Transfers",
    "Physics and Maths Tutors",
  ];

  const [showAllServices, setShowAllServices] = useState(false);
  const displayedServices = showAllServices ? services : services.slice(0, 5);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <section
      className="flex flex-col sm:flex-row gap-5 md:gap-40 min-h-[543px] sm:min-h-[376px] xl:min-h-[458px] bg-[#00AEEF] px-[31px] pt-10 pb-5 md:px-[46px] md:py-[25px] xl:px-[163px] xl:py-[72px]"
      role="banner"
      aria-label="Hero section"
    >
      <div className="w-full md:w-1/2 flex flex-col">
        {/* <Image
          src="/icons/trustpoilet.svg"
          alt="Localists - Local Service Provider Directory"
          width={330}
          height={49}
          className="h-[49px] w-[330px] mb-[27px]"
          priority
          fetchPriority="high"
          loading="eager"
        /> */}
        <H1 className="text-white">
          Find Local <span className="block">Services.</span>
          <span className="text-black block">Fast.</span>
        </H1>
        {/* <p className="family-55 max-w-[80%] md:max-w-full md:w-full text-white text-14px md:text-[17px] xl:text-[26px] pt-5">
          Get instant quotes from local professionals.
        </p> */}
        <Paragraph className="text-white pt-[18px]">
          Get instant quotes from local professionals.
        </Paragraph>
        <div className="relative ">
          <input
            type="text"
            placeholder="Search for a services"
            id="search Attribute"
            className="text-[#B3B3B3] font-bold px-4 py-2.5 md:px-[30px] md:py-[15px] xl:px-[43px] xl:py-[22px] mt-5 xl:mt-[46px] text-base xl:text-[25px]!  xl:placeholder:text-[25px]! bg-white border-[1.5px] border-gray-300 rounded-[100px] w-full focus:outline-none"
            aria-label="Search for a services"
            value={searchQuery || ""}
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);
              if (query.trim() !== "") {
                dispatch(searchService({ query }));
              }
            }}
          />
          {searchQuery.length ? (
            <SearchResults
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          ) : (
            ""
          )}
          <div className="absolute inset-y-0 top-0 xl:-top-4 right-[19px] xl:right-10 flex items-center pointer-events-none">
            <Image
              src="/icons/searchiconherosection.svg"
              alt="search"
              width={22}
              height={22}
              className="w-[22px] h-[22px] mt-5 xl:mt-16"
              priority
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
        <Paragraph className="text-white -tracking-[3%] pb-[30px]">
          Popular Services
        </Paragraph>

        <div className="hidden md:flex flex-wrap gap-2 xl:gap-3">
          {services.map((service) => (
            <button
              key={service}
              className="border xl:border-[2.5px] border-white family-55  px-1.5 py-[5px] xl:px-3.5 xl:py-[7px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none"
              aria-label={`Search for ${service}`}
            >
              <Paragraph>{service}</Paragraph>
            </button>
          ))}
        </div>

        <div className="md:hidden w-full">
          <div className="flex flex-wrap gap-2">
            {displayedServices.map((service) => (
              <button
                key={service}
                className="border border-white font-bold text-[12px] px-1.5 py-[5px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none "
                aria-label={`Search for ${service}`}
              >
                <Paragraph>{service}</Paragraph>
              </button>
            ))}
          </div>

          {services.length > 5 && (
            <div className="flex justify-center mt-5">
              <button
                className=" font-bold text-[12px] rounded-full transition-all duration-200 flex items-center justify-center"
                onClick={() => setShowAllServices(!showAllServices)}
                aria-label={
                  showAllServices ? "Show less services" : "Show more services"
                }
              >
                <Image
                  src="/chevron-right-double.webp"
                  width={52}
                  height={52}
                  alt="expand services"
                  priority={true}
                  className="w-[52px] h-[52px]"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
