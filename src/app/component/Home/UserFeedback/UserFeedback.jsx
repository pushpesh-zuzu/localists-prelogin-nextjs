"use client";
import React from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import UserFeedbackCard from "./UserFeedbackCard";
import WithoutSpecialCardCarousel from "../../Carousel/WithoutSpecialCardCarousel";

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
    <WrapperBGWidth background={"#edfcf8"}>
      <div className="h-auto min-h-[400px] lg:min-h-[687px] px-2.5 py-12 sm:px-10 xl:px-[120px] lg:py-[72px] bg-[#EDFCF8]">
        <H2 className="text-[#00afe3] pb-10">
          Rated <span className="text-black">excellent.</span>
        </H2>
        <div className="flex flex-wrap justify-between select-none">
          <WithoutSpecialCardCarousel
            data={feedbackData}
            renderCard={(card) => <UserFeedbackCard item={card} />}
            showArrowAndDots={false}
          />
        </div>
        <div className="flex justify-center">
          <Button className="px-4 py-2 xl:py-[15px] xl:px-7 mt-8 xl:mt-12 rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            Get your Quote
          </Button>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default UserFeedback;
