'use client'
import React from "react";
import Button from "../../UI/Typography/Button";
import { handleScrollToBottom } from "@/utils/scroll";

function GetQuote({ text = "Get your Quote" }) {
  return (
    <Button onClick={()=>{handleScrollToBottom()}} variant="secondary" className="cursor-pointer max-w-fit px-[13px] py-[7px] xl:py-4 xl:px-[30px] rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      {text}
    </Button>
  );
}

export default GetQuote;
