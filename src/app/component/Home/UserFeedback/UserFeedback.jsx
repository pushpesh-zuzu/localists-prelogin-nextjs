"use client";
import Image from "next/image";
import React from "react";
import CarouselForHowItWork from "../../common/CarouselForHowItWork";
import H2 from "../../UI/Typography/H2";
import Paragraph from "../../UI/Typography/Paragraph";
import Button from "../../UI/Typography/Button";

function UserFeedback() {
  const feedbackData = [
    {
      id: 1,
      text: "Within minutes of submitting my request, I heard back from two local companies ready to help. Couldn't have asked for a quicker service.",
      name: "Amelia",
    },
    {
      id: 2,
      text: "Had 3 quotes from local tree surgeons, and got the work done the same day for less than originally quoted! Will definitely use again",
      name: "Robert",
    },
    {
      id: 3,
      text: "Got instant quotes for my driveway -  and had the work done 2 weeks later. Can't fault them, will definitely use Localists again.",
      name: "Alan",
    },
    {
      id: 4,
      text: "Couldn't fault the service, saved me shopping around for a cheaper quote. Will definitely use again!",
      name: "Tracey",
    },
  ];

  return (
    <div className="h-auto min-h-[400px] lg:min-h-[687px] px-2.5 py-10 sm:px-10 xl:px-[120px] lg:py-[72px] bg-[#EDFCF8]">
      {/* <h2 className="font-bold pb-14 text-2xl md:text-[40px] lg:text-[75px] text-[#00afe3]">
        Rated <span className="text-black">excellent.</span>
      </h2> */}
      <H2 className="text-[#00afe3] pb-10">
        Rated <span className="text-black">excellent.</span>
      </H2>
        <div className="hidden sm:flex flex-wrap sm:gap-5 xl:gap-6">
          {feedbackData.map((item) => (
            <div
              key={item.id}
              className=" w-[120px]
              sm:w-[158px] h-[233px] 
              lg:w-[238px] lg:h-[352px]
              xl:w-[282px] xl:h-[366px] 
              px-[10.5px] py-4 
              lg:px-4.5 lg:py-6
              xl:px-[18px] xl:py-7 
              lg:rounded-4xl xl:rounded-[40px] 
              bg-[#D0F7EB80]"
            >
              <div className="flex flex-col justify-between h-full">
                <div className="flex flex-col gap-2.5">
                  <Image
                    src="/icons/stars.svg"
                    alt="five star rating"
                    width={159}
                    height={31}
                    loading="lazy"
                    className="h-[31px]"
                  />
                  {/* <p className="font-bold text-[12px] leading-[14.93px] lg:text-[17px] lg:leading-[22px] xl:text-[22px] xl:leading-7">
                    {item.text}
                  </p> */}
                  <Paragraph className="leading-5 xl:leading-7">{item.text}</Paragraph>
                </div>
                <p className="self-end mt-2 font-bold text-black text-[14px]  tracking-[-0.03em] lg:text-[20px] xl:text-[28px]">
                  {item.name}
                </p>
              </div>
            </div>
          ))}
        </div>
          <div className="hidden md:flex justify-center">
            <Button className="py-[15px] px-7 mt-12 rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">Get your Quote</Button>
          </div>
      <div className="sm:hidden">
        <CarouselForHowItWork
          visibleItems={1}
          autoSlideInterval={5000}
          showControls={true}
          showDots={false}
        >
          {feedbackData.map((item) => (
            <div key={item.id} className="w-full flex justify-center">
              <div className="w-[198px] h-[287px] px-[13.32px] py-5 bg-[#D0F7EB80] rounded-[20px]">
                <div className="flex flex-col justify-between h-full">
                  <div className="flex flex-col gap-2.5">
                    <Image
                      src="/fivestar.webp"
                      alt="five star rating"
                      width={89}
                      height={17}
                      loading="lazy"
                    />
                    <p className="font-bold text-[15px] leading-5">
                      {item.text}
                    </p>
                  </div>
                  <p className="self-end mt-2 font-bold text-black text-[21px]">
                    {item.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CarouselForHowItWork>
      </div>
    </div>
  );
}

export default UserFeedback;
