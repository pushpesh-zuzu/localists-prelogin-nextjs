"use client";
import React from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import TrustpioletIcon from "../common/icons/HomePageIcons/TrustpioletIcon";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";
import Image from "next/image";
import ChevroliteDoubleDownIcon from "../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import PostCodeSearchField from "./PostCodeSearchField";
import TrustpioletIconLocation from "../common/icons/HomePageIcons/TrustpioletIconLocation";
import ChevroliteDoubleDownIconWithoutWrapper from "../common/icons/HomePageIcons/ChevroliteDoubleDownIconWithoutWrapper";

function HeroSectionLandscapingNearMe({
  heading1 = "Find Tree Surgeons",
  heading2 = "Near You.",
  description = `Find the best tree surgeons for your job, just enter your postcode
              and a few details for instant quotes.`,
  bannerImage = "",
  bannerImageMobile = "",
  altText = "Tree Surgeon",
  serviceId = 112,
  serviceName = "Tree Surgery",
  containerHight = "relative w-full h-[550px] max-h-[550px] md:h-[375px] lg:h-[550px] xl:h-[570px] xl:max-h-[570px]",
  desktopImageClass = "object-cover h-10 w-10 md:h-[375px] min-[900px]:h-[400px] lg:h-[550px] xl:h-[570px]",
}) {
  return (
    <>
      <div className={`${containerHight}`}>
        <div className="absolute inset-0 hidden md:block z-0 w-full h-full">
          <Image
            src={bannerImage}
            alt={altText}
            fill
            priority={true}
            fetchPriority="high"
            quality={90}
            className={desktopImageClass}
            sizes="(min-width: 768px) 100vw, 0px"
          />
        </div>

        {/* Mobile Image */}
        <div className="absolute inset-0 md:hidden mx-auto md:h-full w-full z-0">
          <Image
            src={bannerImageMobile}
            alt={altText}
            priority
            fetchPriority="high"
            fill
            quality={90}
            sizes="100vw"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="relative z-10 max-w-[1536px] mx-auto h-full">
          <section
            className="flex flex-col  justify-around h-[550px] max-h-[550px] max-[353px]:max-h-[550px] md:max-h-full md:flex-row px-[30px] pt-8 pb-[31.33px] md:px-[60px] lg:pb-[64px] xl:pb-[100px] md:pt-5 lg:pt-8 xl:px-[120px] xl:pt-[73.88px] relative z-10"
            role="banner"
            aria-label="Hero section"
          >
           <div className={`w-full flex flex-col relative z-10 mb-[50px] mt-auto md:m-0 md:mt-0`}>
              <TrustpioletIconLocation className=" md:hidden lg:min-h-[54px] max-h-[23px] max-w-[184px] md:max-w-[177px] lg:max-w-[360px] mb-[15px] md:mb-3 lg:mb-[30px] lg:max-h-12" />

              <TrustpioletIcon className="hidden md:block lg:min-h-[54px] max-h-[23px] max-w-[154px] md:max-w-[177px] lg:max-w-[360px] mb-[15px] md:mb-3 lg:mb-[30px] lg:max-h-12" />

              <H1 className="text-white block drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                <span>
                  {heading1}
                  <span className="text-[#253238] block">{heading2}</span>
                </span>
              </H1>
               <p className="font-[Arial] font-bold  text-[18px] leading-[18px]
                      sm:text-base sm:leading-[18px]
                      lg:text-[20px] lg:leading-[22px] tracking-[0em]! text-shadow-[0px 0px 4px 0px #00000040] md:text-shadow-[0px 4px 4px 0px #00000026] md:max-w-[80%] sm:max-w-[60%] md:max-w-[450px] lg:max-w-[590px] text-white pt-[11px] md:pt-4 lg:pt-[20px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]">
                {description}
              </p>
              <PostCodeSearchField
                serviceId={serviceId}
                serviceName={serviceName}
              />
            </div>
            {/* <div className="flex h-[12px] ml-auto mr-auto justify-center mb-3.5 mt-[30px] md:hidden relative z-1"> */}
              <ChevroliteDoubleDownIconWithoutWrapper className="mx-auto md:hidden"/>
            {/* </div> */}
          </section>
        </div>
      </div>
    </>
  );
}

export default HeroSectionLandscapingNearMe;
