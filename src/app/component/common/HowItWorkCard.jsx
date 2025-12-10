"use client";

import Image from "next/image";
import H3 from "../UI/Typography/H3";

export default function HowItWorksCard({
  iconSrc,
  title = "Title",
  description = "Description",
  mw
}) {
  return (
    <div className="rounded-2xl md:rounded-[21px] lg:rounded-[40px] md:h-[205px] xl:h-[338px] py-8 xl:py-14 w-full lg:max-w-[300px] xl:max-w-[350px] border-4 border-[#DBDFE4] flex flex-col items-center ">
      <div className="flex w-full flex-row gap-1 lg:gap-5 xl:gap-[30px] md:flex-col items-center font-bold">
        <Image
          src={iconSrc}
          alt={title}
          width={127}
          height={127}
          className="object-contain h-[67px] w-[67px] xl:w-[140px] xl:h-[98px]"
          priority
        />
        <p className={`font-black tracking-tight3 text-[20px] xl:text-[38px] leading-6 xl:leading-[38px] text-left md:text-center -tracking-[3%]! ${mw} `}>
          {description}
        </p>
      </div>
    </div>
  );
}
