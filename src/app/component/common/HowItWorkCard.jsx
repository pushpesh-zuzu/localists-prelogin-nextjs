"use client";

import Image from "next/image";
import H3 from "../UI/Typography/H3";

export default function HowItWorksCard({
  iconSrc,
  title = "Title",
  description = "Description",
  mw,
}) {
  return (
    <div className="rounded-2xl md:rounded-[21px] lg:rounded-[40px] md:h-[180px] xl:h-[338px] py-1 md:pt-4 xl:pt-7 xl:pb-[61px] w-full md:max-w-[230px] lg:max-w-[300px] xl:max-w-[360px] 2xl:max-w-[380px] border-4 border-[#DBDFE4] flex flex-col items-center ">
      <div className="flex w-full flex-row gap-1 md:gap-4 lg:gap-5 xl:gap-[30px] md:flex-col items-center font-bold">
        {iconSrc}
        <p
          className={`font-black tracking-tight3 text-[20px] xl:text-[38px] leading-6 xl:leading-[38px] text-left md:text-center -tracking-[3%]! ${mw} `}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
