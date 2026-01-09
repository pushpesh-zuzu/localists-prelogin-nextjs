import React from "react";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import TrustpioletIcon from "../common/icons/HomePageIcons/TrustpioletIcon";
import Paragraph1 from "../UI/Typography/Paragraph1";
import Paragraph from "../UI/Typography/Paragraph";
import H1 from "../UI/Typography/H1";
import PostCodeSearchField from "./PostCodeSearchField";
import Image from "next/image";
import Breadcrumb from "../common/BreadCrum/BreadCrum";
import PaddingWrapper from "./PaddingWrapper";

function HeroSectionNearMe() {
  return (
    <>
      <WrapperBGWidth background={"#00aeef"}>
        <section
          className="flex flex-col lg:flex-row   bg-[#00AEEF] px-[31px] pt-10 md:px-[87px] md:pt-[38px]  xl:px-[163px] xl:pt-12"
          role="banner"
          aria-label="Hero section"
        >
          <div className="w-full lg:w-2/3  flex flex-col xl:ml-[43px]">
            <TrustpioletIcon className="max-w-[184px] md:max-w-[177px] lg:max-w-[330px] lg:mb-7 max-h-12" />

            <H1 className="text-white block  text-shadow-[0_2.03px_2.03px_0_#0000001A]">
              <p className="">
                Find Tree Surgeons
                <span className="text-[#253238] block">Near You</span>
              </p>
              {/* <div className="hidden md:block lg:hidden ">
      Find Local{" "}
      <div className="flex">
        <span className="block">Services.</span>
        &nbsp;<span className="text-[#253238] block">Fast.</span>
      </div>
    </div> */}
            </H1>
            <Paragraph1
              style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
              className="md:max-w-[600px] max-w-full text-white pt-[18px] md:pt-2 lg:pt-[18px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              Find the best tree surgeons for your job, just enter your postcode
              and a few details for instant quotes.
            </Paragraph1>
            {/* <HeroSectionSearch /> */}
            <PostCodeSearchField />
          </div>

          <div className="w-full lg:w-1/3 h-[300px] lg:h-[550px] relative overflow-hidden">
            <Image
              src="/nearme/treeSurgeon.webp"
              alt="Tree Surgeon"
              fill
              priority
              fetchPriority="high"
              decoding="async"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center"
            />
          </div>
        </section>
      </WrapperBGWidth>
    </>
  );
}

export default HeroSectionNearMe;
