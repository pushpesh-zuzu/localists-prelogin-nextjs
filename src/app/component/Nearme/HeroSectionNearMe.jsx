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
// const PostCodeSearchField = dynamic(() => import("./PostCodeSearchField"), {
//   ssr: false,
//   loading: () => <div className="hidden">Loading...</div>,
// });

function HeroSectionNearMe({
  heading1 = "Find Tree Surgeons",
  heading2 = "Near You.",
  description = `Find the best tree surgeons for your job, just enter your postcode
              and a few details for instant quotes.`,
  bannerImage = "/nearme/treeSurgeon.webp",
  bannerImageMobile = "/nearme/treeSurgeon1.webp",
  altText = "Tree Surgeon",
}) {
  return (
    <>
      <WrapperBGWidth secondaryClass="md:h-[450px] lg:h-[690px] max-h-[690px]" className="relative md:h-[450px] lg:h-[690px] max-h-[690px]" background={'#00afe3'}>
        <div className="absolute inset-0 md:h-[450px] lg:h-[690px] max-h-[690px]  hidden md:block">
          <Image
            src={bannerImage}
            alt={altText}
            fill
            priority={true}
            fetchPriority="high"
            quality={75}
            className="h-10 w-10 md:h-[540px] min-[900px]:h-[400px] lg:h-[690px] md:max-w-[1536px] mx-auto"
            sizes="(min-width: 768px) 100vw, 0px"
          />
        </div>
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src={bannerImageMobile}
            alt={altText}
            priority
            fetchPriority="high"
            width={768}
            height={492}
            quality={50}
            sizes="100vw"
            className="object-cover w-full h-full max-h-[550px] max-w-2xl sm:max-w-[768px]"
          />
        </div>
        <section
          className="flex flex-col max-h-[550px] max-[353px]:max-h-[550px] md:max-h-full  md:flex-row px-[34px] pt-10 md:px-[60px] lg:pb-[72px] xl:pb-[100px] md:pt-[38px] xl:px-[120px] xl:pt-[72px] relative"
          role="banner"
          aria-label="Hero section"
        >
          <div
            className="w-full md:w-4/5
           flex flex-col  relative z-10"
          >
            <TrustpioletIcon className="max-w-[184px] md:max-w-[177px] lg:max-w-[330px]  lg:mb-7 max-h-12" />
            <H1 className="text-white block text-shadow-[0_2.03px_2.03px_0_#0000001A]">
              <span>
                {heading1}
                <span className="text-[#253238] block">{heading2}</span>
              </span>
            </H1>
            <Paragraph1
              style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
              className="md:max-w-[60%] sm:max-w-[60%] max-w-full text-white pt-[18px] md:pt-2 lg:pt-[20px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
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
