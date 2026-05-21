"use client";

import Button from "../UI/Typography/Button";
import { handleScrollToBottom } from "@/utils/scroll";

export default function HowItWorkCTA({
  text = "Get Started",
  marginTop = "mt-[30px] lg:mt-[47px]",
  enableScroll = true,
}) {
  return (
    <div className="flex justify-center">
      <Button
        variant="tertiary"
        onClick={() => {
          if (enableScroll) {
            handleScrollToBottom();
          }
        }}
        className={`${marginTop} cursor-pointer rounded-full max-w-fit bg-[#10C87B] hover:bg-[#00aef3] text-white px-[15px] md:px-[18px] py-2 xl:py-[16px] xl:px-8 leading-normal!`}
      >
        {text}
      </Button>
    </div>
  );
}
