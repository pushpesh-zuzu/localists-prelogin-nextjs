'use client'
import Image from "next/image";
import React, { useState } from "react";
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

function HeroSectionServices() {
      const [showAllServices, setShowAllServices] = useState(false);
      const displayedServices = showAllServices ? services : services.slice(0, 5);

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-start">
      <p className="family-55 font-normal md:font-bold text-white pb-4 text-xl xl:text-xl">
        Popular Services
      </p>

      {/* Desktop/Tablet - All Services */}
      <div className="hidden md:flex flex-wrap gap-2 xl:gap-4">
        {services.map((service) => (
          <button
            key={service}
            className="border xl:border-[2.5px] border-white family-55 text-[12px] xl:text-[22px] px-1.5 py-[5px] xl:px-2.5 xl:py-3 rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white"
            aria-label={`Search for ${service}`}
          >
            {service}
          </button>
        ))}
      </div>

      {/* Mobile - 5 Services + Arrow */}
      <div className="md:hidden w-full">
        <div className="flex flex-wrap gap-2">
          {displayedServices.map((service) => (
            <button
              key={service}
              className="border border-white font-bold text-[12px] px-1.5 py-[5px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-white"
              aria-label={`Search for ${service}`}
            >
              {service}
            </button>
          ))}
        </div>

        {services.length > 5 && (
          <div className="flex justify-center mt-5">
            <button
              className="font-bold text-[12px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 flex items-center justify-center"
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
  );
}

export default HeroSectionServices;
