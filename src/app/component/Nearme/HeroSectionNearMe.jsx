"use client";
import React, { useEffect, useState } from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import TrustpioletIcon from "../common/icons/HomePageIcons/TrustpioletIcon";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";

import Image from "next/image";
import ChevroliteDoubleDownIcon from "../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";
import dynamic from "next/dynamic";
const PostCodeSearchField = dynamic(() => import("./PostCodeSearchField"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>,
});

function HeroSectionNearMe({
  heading1 = "Find Tree Surgeons",
  heading2 = "Near You.",
  description = `Find the best tree surgeons for your job, just enter your postcode
              and a few details for instant quotes.`,
  bannerImage = "/nearme/treeSurgeon.webp",
  bannerImageMobile = "/nearme/treeSurgeon1.webp",
  altText = "Tree Surgeon",
}) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <>
      <WrapperBGWidth className="relative">
        <div className="absolute inset-0 md:h-[450px] lg:h-[560px] max-h-[560px]  hidden md:block">
          <Image
            src={bannerImage}
            alt=""
            fill
            priority={true}
            fetchPriority="high"
            quality={75}
            sizes="100vw"
            className="h-10 w-10 md:h-[540px] xl:h-[560px] md:max-w-[1536px]"
            onLoad={() => <div>loading</div>}
          />
        </div>
        <div className="absolute inset-0 z-0 md:hidden">
          <Image
            src={bannerImageMobile}
            alt={altText}
            priority
            fetchPriority="high"
            quality={55}
            height={492}
            width={768}
            className="object-cover w-full h-full max-h-[500px] max-w-2xl sm:max-w-[768px]"
          />
        </div>
        <section
          className="flex flex-col max-h-[492px] max-[353px]:max-h-[490px] md:max-h-full  md:flex-row px-[34px] pt-10 md:px-[87px] md:pb-[72px] xl:pb-[100px] md:pt-[38px] xl:px-[163px] xl:pt-12 relative"
          role="banner"
          aria-label="Hero section"
        >
          <div className="w-full md:w-2/3 flex flex-col xl:ml-[43px] relative z-10">
            <TrustpioletIcon className="max-w-[184px] md:max-w-[177px] lg:max-w-[330px] lg:mb-7 max-h-12" />
            <H1 className="text-white block text-shadow-[0_2.03px_2.03px_0_#0000001A]">
              <p>
                {heading1}
                <span className="text-[#253238] block">{heading2}</span>
              </p>
            </H1>
            <Paragraph1
              style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
              className="md:max-w-[80%] sm:max-w-[60%] max-w-full text-white pt-[18px] md:pt-2 lg:pt-[20px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              {description}
            </Paragraph1>
            <PostCodeSearchField />
          </div>
          <div className="flex justify-center mb-3.5 mt-[30px] md:hidden relative z-1">
            <ChevroliteDoubleDownIcon />
          </div>
        </section>
      </WrapperBGWidth>
    </>
  );
}

export default HeroSectionNearMe;
