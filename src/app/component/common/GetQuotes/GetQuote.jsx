import React from "react";
import Button from "../../UI/Typography/Button";
import Paragraph1 from "../../UI/Typography/Paragraph1";
import H2 from "../../UI/Typography/H2";
import H3 from "../../UI/Typography/H3";

function GetQuote({ text = "Get Quotes", ctaText, needSString = true }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button className="max-w-fit xl:text-[38px] px-4.5 py-1 xl:px-7 cursor-pointer rounded-full bg-[#00afe3] text-white hover:bg-[#0096c4]">
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
