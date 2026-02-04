"use client";
import React from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import UserFeedbackCard from "./UserFeedbackCard";
import WithoutSpecialCardCarousel from "../../Carousel/WithoutSpecialCardCarousel";
import { handleScrollToBottom } from "@/utils/scroll";

function UserFeedback({ feedbackData = [] }) {
  return (
    <WrapperBGWidth background={"#edfcf8"}>
      <div className="h-auto min-h-[400px] lg:min-h-[687px] px-[30px] py-12 sm:px-10 md:px-16 md:py-[38px] xl:px-[120px] lg:py-[72px] bg-[#EDFCF8]">
        <H2 className="text-[#00afe3] pb-10">
          Rated <span className="text-[#253238]">excellent.</span>
        </H2>
        <div className="flex flex-wrap justify-between select-none">
          <WithoutSpecialCardCarousel
            data={feedbackData}
            renderCard={(card) => <UserFeedbackCard item={card} />}
            showArrowAndDots={false}
            mobileArrowSpacing={0}
          />
        </div>
        <div className="flex justify-center">
          <Button
            onClick={() => {
              handleScrollToBottom();
            }}
            className="hover:bg-[#00afe3] cursor-pointer px-[15px] py-2 xl:py-[15px] xl:px-7 mt-8 xl:mt-[47.47px] rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]"
          >
            Get your Quote
          </Button>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default UserFeedback;
