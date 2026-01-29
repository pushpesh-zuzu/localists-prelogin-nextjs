"use client";

import Image from "next/image";
import React from "react";
import H3 from "../UI/Typography/H3";
import Button from "../UI/Typography/Button";

function NearmeMember({ description = "" }) {
  return (
    <div className="w-full max-w-[283px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-[1200px] mx-auto pt-10 pb-10  md:py-[0px] md:pb-10 lg:pb-0 xl:pt-[72px] xl:pb-[72px]">
      <div className="hidden md:flex w-fit rounded-[15px] md:rounded-[33px] overflow-hidden mx-auto ">
        <div className=" w-[340] md:h-[270px] lg:h-[512px] lg:w-[690px] bg-[#00AFE3] rounded-l-[15px] md:rounded-l-[33px] flex flex-col justify-start px-[34px] pt-[19px] lg:pt-[37px] pb-8 lg:px-[63px] ">
          <>
            <h3
              style={{ textShadow: "0px 1.95px 1.95px #0000000D" }}
              className="font-Inter font-black
                  tracking-[-0.03em]
                  text-[24px] leading-[28px]
                  md:text-[18px] md:leading-[22px]
                  lg:text-[35px] lg:leading-[30px] xl:text-[38px] xl:leading-[38px] hidden md:block text-white font-bold font-[Arial] leading-9 xl:leading-[42px] lg:pr-6"
            >
              {description}
            </h3>

            <div className="hidden md:block mt-0 lg:mt-3">
              <p className="  text-white font-bold text-xs md:text-base lg:text-[20px] mt-[9px] lg:mt-[18px]" >
                Localists Professional, Chris
              </p>
              {/* <p className=" text-white text-xs lg:text-[16px] font-normal">
                CH Joinery
              </p> */}
            </div>
            <Button className="hidden md:inline-flex bg-[#253238] mt-3 lg:mt-9 md:py-1.5 md:px-3.5 lg:py-[13px] lg:px-[21px] text-white rounded-full max-w-fit">
              Become a member
            </Button>
          </>
        </div>

        <div className=" relative rounded-r-[15px] md:rounded-r-[33px] overflow-hidden">
          <Image
            src="/nearme/treeSurgeonMember.webp"
            alt="Professional using phone"
            priority
            fetchPriority="high"
            loading="eager"
            height={512}
            width={521}
            className="w-[273px] h-[350px] md:h-[270px] lg:w-[521px] lg:h-[512px]"
          />
        </div>
      </div>

      <div className="md:hidden rounded-[15px] md:rounded-[33px] overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full  relative">
          <Image
            src="/nearme/treeSurgeonMemberMobile.webp"
            alt="Professional using phone"
            height={300}
            width={250}
            priority
            className="h-[220] w-xl"
            fetchPriority="high"
            loading="eager"
          />
        </div>

        <div className="bg-[#00AFE3] p-6">
          <div className="flex flex-col gap-3">
            <h3
              className="font-[Arial] text-[20px] 
                tracking-[-0.03em] text-white font-bold leading-[22px]"
              style={{ textShadow: "0px 1.95px 1.95px #0000000D" }}
            >
              {description}
            </h3>

            <div className="mt-2">
              <p className="  text-white font-bold text-[12px] leading-4">
                Localists Professional, Chris
              </p>
              {/* <p className="text-white text-[12px] leading-[15px]">
                CH Joinery
              </p> */}
            </div>

            <button className="text-base font-bold py-1.5 px-4 max-w-fit mx-auto bg-[#253238] hover:bg-[#1a2328] text-white rounded-full transition-all duration-300 mt-4 w-full">
              Become a member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NearmeMember;
