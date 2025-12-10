"use client";

import Image from "next/image";
import React from "react";
import H3 from "../../UI/Typography/H3";
import Button from "../../UI/Typography/Button";

function Member() {
  return (
    <div className="w-full max-w-[300px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-[1200px] mx-auto py-[63px]">
      <div className="hidden md:flex rounded-[36px] overflow-hidden h-[512px]">
        <div className="w-[670px] bg-[#00AFE3] rounded-l-[36px] flex flex-col justify-center px-[63px] py-[37px]">
          <div className="flex flex-col gap-3">
           
            <H3 className="hidden md:block text-white font-bold font-[Arial] leading-7 xl:leading-[42px] xl:pr-21">
              " What I like about Localists is the quality of leads I get. I
              spend less money on Localists than I have done on other platforms,
              and I get far more business. It's a win-win"
            </H3>

            <div className="hidden md:block mt-4">
              <p className="  text-white font-bold text[20px] mt-[18px]">
                Localists Professional, Chris
              </p>
              <p className=" text-white text-[16px] font-normal">CH Joinery</p>
            </div>
            <Button className="hidden md:inline-flex bg-[#253238] py-[13px] px-[21px] text-white rounded-full max-w-fit">
              Become a member
            </Button>
          </div>
        </div>

        <div className=" relative rounded-r-[36px] overflow-hidden">
          <Image
            src="/member.webp"
            alt="Professional using phone"
            priority
            fetchPriority="high"
            loading="eager"
            height={512}
            width={521}
            className="w-[521px] h-[512px]"
          />
        </div>
      </div>

      <div className="md:hidden rounded-[36px] overflow-hidden shadow-[0px_0px_10px_rgba(0,0,0,0.25)]">
        <div className="w-full  relative">
          <Image
            src="/member.webp"
            alt="Professional using phone"
            height={300}
            width={250}
            priority
            className="h-[300] w-xl"
            fetchPriority="high"
            loading="eager"
          />
        </div>

        <div className="bg-[#00AFE3] p-8">
          <div className="flex flex-col gap-3">
            <p
              className="text-white font-bold leading-5"
              style={{
                fontFamily: "Helvetica Now Text, Helvetica, Arial, sans-serif",
                fontSize: "20px",
              }}
            >
              " What I like about Localists is the quality of leads I get. I
              spend less money on Localists than I have done on other platforms,
              and I get far more business. It's a win-win"
            </p>

            <div className="mt-3">
              <p className="family-65 text-white font-bold text-[14px] leading-4">
                Localists Professional, Chris
              </p>
              <p className="family-65 text-white text-[13px] leading-[15px]">
                CH Joinery
              </p>
            </div>

            <button
              className="family-65 max-w-fit mx-auto bg-[#253238] hover:bg-[#1a2328] text-white font-semibold rounded-full transition-all duration-300 mt-4 w-full"
              style={{
                fontSize: "12.46px",
                paddingTop: "6.23px",
                paddingRight: "12.24px",
                paddingBottom: "6.23px",
                paddingLeft: "12.24px",
              }}
            >
              Become a member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Member;
