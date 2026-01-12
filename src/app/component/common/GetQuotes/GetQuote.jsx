import React from "react";
import Button from "../../UI/Typography/Button";

function GetQuote({ text = "Get your Quote" }) {
  return (
    <Button className="max-w-fit px-3.5 py-2 xl:py-3 xl:px-7  rounded-full bg-[#253238] text-white shadow-[0_0_4px_rgba(0,0,0,0.1)]">
      {text}
    </Button>
  );
}

export default GetQuote;
