import React from "react";
import Button from "../../UI/Typography/Button";
import Paragraph1 from "../../UI/Typography/Paragraph1";
import H2 from "../../UI/Typography/H2";
import H3 from "../../UI/Typography/H3";

function GetQuote({ text = "Get your Quote", ctaText, needSString = true }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button className="max-w-fit px-4.5 py-2 xl:py-3 xl:px-7 cursor-pointer rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
        {text}
      </Button>

      {ctaText && (
        <H3
          className="
        mt-[20px]
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
