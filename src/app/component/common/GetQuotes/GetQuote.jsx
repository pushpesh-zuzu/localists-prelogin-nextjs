'use client'
import React from "react";
import Button from "../../UI/Typography/Button";
import { handleScrollToBottom } from "@/utils/scroll";

function GetQuote({ text = "Get Quotes", ctaText, needSString = true }) {
  return (
    <Button onClick={()=>{handleScrollToBottom()}} variant="secondary" className="cursor-pointer max-w-fit px-[13px] py-[7px] hover:bg-[#00afe3] xl:py-4 xl:px-[30px] rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      {text}
    </Button>
  );
}

export default GetQuote;
