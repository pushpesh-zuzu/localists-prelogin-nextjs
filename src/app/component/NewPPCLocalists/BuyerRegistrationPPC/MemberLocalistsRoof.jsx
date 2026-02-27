import Image from "next/image";
import React from "react";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";
import Paragraph from "../../UI/Typography/Paragraph";
import GreenTickWithBorder from "../../../../../public/ReactIcons/GreenTickWithBorder";

function MemberLocalistsRoof({ description = "" }) {
  return (
    <div className="w-full max-w-[303px] sm:max-w-xl md:max-w-3xl lg:max-w-5xl xl:max-w-[1200px] mx-auto pb-10 md:py-[0px] md:pb-10 lg:pb-0 xl:pb-[100px]">
      <div className="hidden md:flex w-fit rounded-[15px] md:rounded-[33px] overflow-hidden mx-auto ">
        <div className=" w-[340] md:h-[380px] lg:h-[580px] xl:h-[620px] lg:w-[690px] bg-[#00AFE3] rounded-l-[15px] md:rounded-l-[33px] flex flex-col justify-start px-[34px] pt-[19px] lg:pt-[37px] pb-8 lg:px-[63px] ">
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

            <div className="flex flex-col gap-[12px] items-start mt-3 md:mt-5">
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  2,700+ projects completed locally
                </Paragraph>
              </div>
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  Verified 5 star rating
                </Paragraph>
              </div>
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  Fixed project pricing
                </Paragraph>
              </div>
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  10 year guarantee
                </Paragraph>
              </div>
            </div>
             <button onClick={()=>{handleScrollToBottom()}} className="hidden cursor-pointer min-w-full! md:flex justify-center  font-[Arial] font-bold tracking-[-0.03em] ring-2 ring-[#FF8B20] border-3 border-white bg-[#FF8B20] text-base md:text-[16px] lg:text-[30px] leading-[21px] mt-4 lg:mt-6 md:py-1.5 md:px-3.5 lg:py-[17px] lg:px-[21px] text-white rounded-full max-w-fit">
              Get My Free Quote
            </button>
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
            className="w-[273px] h-[350px] md:h-[380px] lg:w-[521px] lg:h-[580px] xl:h-[620px]"
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

            <div className="flex flex-col gap-[12px] items-start mt-3 md:mt-5">
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  2,700+ projects completed locally
                </Paragraph>
              </div>
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  Verified 5 star rating
                </Paragraph>
              </div>
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  Fixed project pricing
                </Paragraph>
              </div>
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <GreenTickWithBorder />
                </div>
                <Paragraph
                  className="text-[18px]! text-white"
                  bold="font-normal"
                  variant="secondary"
                >
                  10 year guarantee
                </Paragraph>
              </div>
            </div>
             <button onClick={()=>{handleScrollToBottom()}} className="cursor-pointer min-w-full! flex justify-center md:hidden  font-[Arial] font-bold tracking-[-0.03em] ring-2 ring-[#FF8B20] border-3 border-white bg-[#FF8B20] text-base md:text-[16px] lg:text-[30px] leading-[21px] mt-4 lg:mt-6 px-[15px] py-2 text-[16px] md:py-1.5 md:px-3.5 lg:py-[17px] lg:px-[21px] text-white rounded-full max-w-fit">
              Get My Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberLocalistsRoof;
