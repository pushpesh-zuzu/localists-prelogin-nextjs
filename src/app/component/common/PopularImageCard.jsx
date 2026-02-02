"use client";

import Image from "next/image";
import Paragraph from "../UI/Typography/Paragraph";
import Link from "next/link";

export default function PopularImageCard({ card }) {
  console.log(card, "card");
  return (
    <div
      className="relative h-[180px] w-[126px] md:h-[244px] md:w-48 lg:h-[300px] lg:w-[200px] xl:h-[380px] xl:w-[267px] bg-white rounded-[20px] md:rounded-[22px] lg:rounded-[24px] xl:rounded-[24.93px] overflow-hidden"
      style={{
        background: "#00AFE3",
      }}
    >
      <div
        className="absolute top-10 left-4 md:top-[47px] md:left-[28px] lg:top-[65px] lg:left-6 xl:top-20 xl:left-[38px] h-[120px] w-[90px] md:h-[197px] md:w-[170px] lg:h-[260px] lg:w-[195px] xl:h-[332px] xl:w-[250px]"
        style={{
          borderTopLeftRadius: "20px",
          borderBottomRightRadius: "20px",
        }}
      >
        <div className="relative w-full h-full overflow-hidden rounded-3xl">
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 90px, (max-width: 1024px) 133px, (max-width: 1280px) 195px, 250px"
          />
        </div>
      </div>

      <Paragraph className="leading-4 pl-7 pt-5 xl:pt-8 text-white xl:pl-[35px]">
        {card.title}
      </Paragraph>
      <Link href={card?.path ? card?.path : ""}>
        <button
          className={` ${card?.path ? "cursor-pointer" : ""}
          absolute flex items-center justify-center
          rounded-[175.75px] bg-white
          bottom-3 md:bottom-4 lg:bottom-5 xl:bottom-[39px]
          left-[56%] -translate-x-1/2
          px-2 lg:px-[15px] py-.5 h-6 lg:h-10 -leading-[3px]
        `}
        >
          <Paragraph>Explore</Paragraph>
        </button>
      </Link>
    </div>
  );
}
