import React from "react";
import H2 from "../UI/Typography/H2";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import Image from "next/image";
import ServicesButton from "../common/ServicesButton";
import Paragraph1 from "../UI/Typography/Paragraph1";
import LogoIcon from "../common/icons/HomePageIcons/LogoIcon";
import Paragraph from "../UI/Typography/Paragraph";

export default function PopularJobNearMe({ services = [] }) {
  return (
    <WrapperBGWidth>
      {/* <div className="w-full max-w-[1200px] mx-auto aspect-[1200/590] relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/nearme/popularJobs.webp)" }}
      />
      
  
    </div> */}
      <div className="md:block rounded-[20px] md:rounded-none mx-2.5 md:mx-0 mt-2.5 md:mt-0 bg-[#00AFE3] md:bg-white  px-2.5 py-[30px] sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-0 xl:pb-[72px]">
        <div className="rounded-[20px] md:max-w-[646px] lg:max-w-[900px] xl:max-w-[1200px] xl:h-[470px] relative overflow-visible">
          {/* 1️⃣ Shape background */}
          <div
            className="rounded-[20px] md:rounded-[40px] absolute inset-0 bg-[#00AFE3]
    md:[clip-path:polygon(0%_0%,90%_0%,80.66%_100%,0%_100%)]"
          />

          {/* 2️⃣ Normal content layer */}
          <div className="relative z-10 h-full pt-[30px] md:px-8 xl:px-15 flex flex-col md:justify-center md:max-w-[70%]">
            <H2 className="text-white mb-4 md:pb-4 xl:pb-9">Popular Jobs.</H2>
            <Paragraph variant="secondary"
              style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
              className=" sm:max-w-full text-white mb-5 pb-4 xl:pb-[42px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              Click below to get a quote for the specific job you want
            </Paragraph>
            <div className=" flex flex-wrap gap-2 xl:gap-5 md:mb-4 md:max-w-[400px] xl:max-w-full">
              {services.map((service) => (
                <ServicesButton mobileBorder="border-2" key={service} service={service} />
              ))}
            </div>
          </div>

          {/* 3️⃣ Floating image */}
          <Image
            src="/nearme/treeSurgeonNearmeRounded.png"
            alt="tree surgeon near me"
            width={400}
            height={600}
            className="hidden md:block w-auto h-[285px] lg:h-[360px] xl:h-[472px] xl:w-[400px] absolute md:-right-11 xl:-right-14 bottom-0 z-20 pointer-events-none"
          />
          <LogoIcon className="hidden md:block absolute bottom-0 -right-12 w-[120px] h-6 lg:w-[140px] lg:h-8 xl:w-[180px] xl:h-11" />
        </div>
      </div>
    </WrapperBGWidth>
  );
}
