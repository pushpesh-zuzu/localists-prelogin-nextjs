"use client"

import React from "react";
import Button from "../../UI/Typography/Button";
import H3 from "../../UI/Typography/H3";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";


function GetQuote({ text = "Get Quotes", ctaText, needSString = true }) {
  return (
    <div className="flex flex-col items-center justify-center">
        <Button onClick={() => {handleScrollToBottom()}} className="max-w-fit xl:text-[38px] px-4.5 py-1 xl:px-7 cursor-pointer rounded-full bg-[#00afe3] text-white hover:bg-[#0096c4]">
          {text}
        </Button>


      {ctaText && (
        <H3
          className="
        mt-[15px] !leading-[100%]
              max-[520px]:mt-[8px]
        text-black
        text-center
      "
        >
          From {ctaText}
          {needSString ? "s" : ""} Service Providers Today
        </H3>
      )}
    </div>
  );
}

export default GetQuote;
