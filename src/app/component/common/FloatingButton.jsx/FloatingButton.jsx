import React from "react";
import { handleScrollToBottom } from "@/utils/scroll";
import GetQuotesIcon from "../../../../../public/ReactIcons/GetQuotesIcon";

function FloatingButton() {
  return (
    <button
      onClick={() => {
        handleScrollToBottom();
      }}
      className="
        inline-flex 
        items-center 
        justify-center 
        rounded-full 
        font-inter 
        font-black 
        tracking-[-0.03em] 
        text-center 
        align-middle 
        shadow-[0_0_4px_rgba(0,0,0,0.1)] 
        cursor-pointer 
        text-[20px] 
        px-5 
        py-4 
        bg-[#00afe3] 
        border-2 
        border-white 
        text-white 
        hover:bg-[#0096c4] 
        transition-colors 
        duration-200
      "
    >
      Get Free Quotes Now <GetQuotesIcon className="ml-1" color="white" />
    </button>
  );
}

export default FloatingButton;
