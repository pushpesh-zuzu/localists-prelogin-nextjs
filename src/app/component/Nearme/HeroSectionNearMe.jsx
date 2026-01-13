"use client";
import React, { useEffect, useState } from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import TrustpioletIcon from "../common/icons/HomePageIcons/TrustpioletIcon";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";
import PostCodeSearchField from "./PostCodeSearchField";
import Image from "next/image";
import ChevroliteDoubleDownIcon from "../common/icons/HomePageIcons/ChevroliteDoubleDownIcon";

function HeroSectionNearMe({
  heading1 = "Find Tree Surgeons",
  heading2 = "Near You.",
  description = `Find the best tree surgeons for your job, just enter your postcode
              and a few details for instant quotes.`,
  bannerImage = "/nearme/treeSurgeon.webp",
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
      <WrapperBGWidth background={"#00aeef"}>
        <section
          className="flex flex-col md:flex-row px-[34px] pt-10 md:px-[87px] md:pt-[38px] xl:px-[163px] xl:pt-12 relative"
          role="banner"
          aria-label="Hero section"
        >
          {/* Mobile background image - preloaded */}
          {isMobile && (
            <div className="absolute inset-0 z-0 md:hidden">
              <Image
                src={bannerImage}
                alt=""
                fill
                priority
                fetchPriority="high"
                quality={55}
                sizes="100vw"
                className="object-cover"
                style={{
                  mixBlendMode: "multiply",
                  opacity: 0.95,
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(rgba(0, 175, 227, 0.95), rgba(176, 229, 245, 0.95))",
                }}
              />
            </div>
          )}

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
              className="md:max-w-[80%] max-w-full text-white pt-[18px] md:pt-2 lg:pt-[20px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              {description}
            </Paragraph1>
            <PostCodeSearchField />
          </div>

          <div className="hidden md:block w-full md:w-1/3 h-[400px] lg:h-[550px] relative overflow-hidden">
            <Image
              src={bannerImage}
              alt={altText}
              fill
              priority
              fetchPriority="high"
              quality={55}
              sizes="(max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center max-w-[95%]"
            />
          </div>
          <div className="flex justify-center mb-3.5 mt-[30px] md:hidden relative z-10">
            <ChevroliteDoubleDownIcon />
          </div>
        </section>
      </WrapperBGWidth>
    </>
  );
}

export default HeroSectionNearMe;
