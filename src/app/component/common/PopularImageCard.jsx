"use client";

import Image from "next/image";
import Paragraph from "../UI/Typography/Paragraph";

export default function PopularImageCard({
  path = "/tree-surgeon.webp",
  title,
}) {
  return (
    <div
      className="relative h-[180px] w-[126px] md:h-[220px] md:w-[170px] lg:h-[340px] lg:w-[238px] xl:h-[380px] xl:w-[267px] bg-white rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[24.93px] overflow-hidden"
      style={{
        background: "#00AFE3",
      }}
    >
      <div
        className="absolute top-10 left-4 md:top-[50px] md:left-9 lg:top-[65px] lg:left-6 xl:top-[80px] xl:left-[38px] h-[120px] w-[90px] md:h-[177px] md:w-[133px] lg:h-[260px] lg:w-[195px] xl:h-[332px] xl:w-[250px]"
        style={{
          borderTopLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-3xl">
          <Image
            src={path}
            alt="Service image"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 90px, (max-width: 1024px) 133px, (max-width: 1280px) 195px, 250px"
          />
        </div>
      </div>

      <Paragraph className="leading-4 pt-3 xl:pt-8 text-white pl-6 xl:pl-[35px]">
        {title}
      </Paragraph>

      <button
        className="
          absolute flex items-center justify-center
          rounded-[175.75px] bg-white
          bottom-3 md:bottom-4 lg:bottom-5 xl:bottom-5
          left-1/2 -translate-x-1/2
          px-[15px] py-.5 h-10 -leading-[3px]
        "
      >
        <Paragraph>Explore</Paragraph>
      </button>
    </div>
  );
}
