'use client'
import React from "react";
import Button from "../../UI/Typography/Button";
import { handleScrollToBottom } from "@/utils/scroll";

function GetQuote({ text = "Get Quotes", variant='secondary', ctaText, needSString = true, classGetQuote ='py-[7px] xl:py-4 xl:px-[30px]' }) {
  return (
    <Button onClick={()=>{handleScrollToBottom()}} variant={variant} className={`${classGetQuote} cursor-pointer max-w-fit px-[13px]  hover:bg-[#00afe3]  rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]`}>
      {text}
    </Button>
  );
}

export default GetQuote;
