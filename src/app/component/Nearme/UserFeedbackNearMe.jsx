"use client";
import React from "react";
import H2 from "../UI/Typography/H2";
import WithoutSpecialCardCarousel from "../Carousel/WithoutSpecialCardCarousel";
import UserFeedbackCard from "../Home/UserFeedback/UserFeedbackCard";
import Button from "../UI/Typography/Button";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function UserFeedbackNearMe({feedbackData=[]}) {

  return (
    <WrapperBGWidth background={"#edfcf8"}>
      <div className="h-auto min-h-[400px] lg:min-h-[687px] px-2.5 py-[30px] sm:px-10 md:px-16 md:py-[38px] xl:px-[120px] lg:py-[72px] bg-[#EDFCF8]">
        <H2 className="text-[#00afe3] pb-10">
          Rated <span className="text-[#253238]">excellent.</span>
        </H2>
        <div className="flex flex-wrap justify-between select-none">
          <WithoutSpecialCardCarousel
            data={feedbackData}
            renderCard={(card) => <UserFeedbackCard item={card} />}
            showArrowAndDots={false}
          />
        </div>
        <div className="flex justify-center">
          <Button className="px-4.5 py-2 xl:py-3 xl:px-7 mt-8 xl:mt-12 rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            Get your Quote
          </Button>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default UserFeedbackNearMe;
