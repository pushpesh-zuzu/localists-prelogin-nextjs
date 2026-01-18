"use client";

import GetQuotesIcon from "../../../../../public/ReactIcons/GetQuotesIcon";
import { handleScrollToBottom } from "@/utils/scroll";

export default function FloatingButton() {
  return (
    <button
      onClick={handleScrollToBottom}
      className="
        inline-flex items-center justify-center
        rounded-full
        text-[20px]
        px-[20px] py-[10px]
        bg-[#00afe3]
        border-2 border-white
        text-white
        font-black
        tracking-[-0.03em]
        cursor-pointer
        font-inter
      "
      aria-label="Get Free Quotes"
    >
      Get Free Quotes Now
      <GetQuotesIcon className="ml-[5px]" color="white" />
    </button>
  );
}
