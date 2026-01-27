"use client";
import React from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import TrustpioletIcon from "../common/icons/HomePageIcons/TrustpioletIcon";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";

import Image from "next/image";
import ChevroliteDoubleDownIcon from "../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import dynamic from "next/dynamic";
import PostCodeSearchField from "./PostCodeSearchField";

function HeroSectionNearMe({
  heading1 = "Find Tree Surgeons",
  heading2 = "Near You.",
  description = `Find the best tree surgeons for your job, just enter your postcode
              and a few details for instant quotes.`,
  bannerImage = "",
  bannerImageMobile = "",
  altText = "Tree Surgeon",
}) {
  return (
    <>
      <WrapperBGWidth
        secondaryClass="md:h-[340px] lg:h-[513px] xl:h-[570px] max-h-[570px]"
        className="relative md:h-[340px] lg:h-[513px] xl:h-[570px] max-h-[570px]"
        background={" #00afe3"}
      >
        {/* Desktop Image */}
        <div className="absolute inset-0 md:h-[340px] lg:h-[513px] xl:h-[570px] max-h-[570px] hidden md:block z-0">
          <Image
            src={bannerImage}
            alt={altText}
            fill
            priority={true}
            fetchPriority="high"
            quality={50}
            className="h-10 w-10 md:h-[340px] min-[900px]:h-[400px] lg:h-[513px] xl:h-[570px] md:max-w-[1536px] mx-auto"
            sizes="(min-width: 768px) 100vw, 0px"
          />
        </div>

        {/* Mobile Image */}
        <div className="absolute inset-0 md:hidden h-full w-full z-0">
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

        <section
          className="flex flex-col max-h-[550px] max-[353px]:max-h-[550px] md:max-h-full md:flex-row px-[34px] pt-10 md:px-[60px] lg:pb-[64px] xl:pb-[100px] md:pt-5 lg:pt-8 xl:px-[120px] xl:pt-[73.88px] relative z-10"
          role="banner"
          aria-label="Hero section"
        >
          <div className="w-full flex flex-col relative z-10">
            <TrustpioletIcon className="lg:min-h-[54px] max-h-[28px] max-w-[184px] md:max-w-[177px] lg:max-w-[360px] mb-[16.54px] md:mb-3 lg:mb-[30px] lg:max-h-12" />
            <H1 className="text-white block drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
              <span>
                {heading1}
                <span className="text-[#253238] block">{heading2}</span>
              </span>
            </H1>
            <Paragraph1 className="text-shadow-[0px 0px 4px 0px #00000040] md:text-shadow-[0px 4px 4px 0px #00000026] md:max-w-[80%] sm:max-w-[60%] md:max-w-[450px] lg:max-w-[590px] text-white pt-[18px] md:pt-4 lg:pt-[20px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]">
              {description}
            </Paragraph1>
            <PostCodeSearchField />
          </div>
          <div className="flex h-[52px] w-[52px] ml-auto mr-auto justify-center mb-3.5 mt-[30px] md:hidden relative z-1">
            <ChevroliteDoubleDownIcon />
          </div>
        </section>
      </WrapperBGWidth>
    </>
  );
}

export default HeroSectionNearMe;
