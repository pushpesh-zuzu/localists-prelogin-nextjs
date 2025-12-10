import Image from "next/image";
import React from "react";
import H5 from "../UI/Typography/H5";

function ServicesImageCard({path,title}) {
  return (
    <>
      <div className="w-[244px] h-[213px] md:w-[180px] md:h-[132px] lg:w-[200px] lg:h-[180px] xl:w-[281px] xl:h-[235px] rounded-[20px] xl:rounded-[28px] overflow-hidden relative">
        <div className="relative w-full h-full">
          <Image
            src={path}
            alt={title}
            fill
            className="w-[244px] h-[213px] md:w-[180px] md:h-[132px] xl:w-[297px] xl:h-[248px]"
            sizes="(max-width: 768px) 90px,
           (max-width: 1024px) 133px,
           (max-width: 1280px) 195px,
           297px"
            priority
          />

          {/* Centered Text */}
          {/* <p className="whitespace-nowrap absolute bottom-5 left-1/2 -translate-x-1/2 text-white font-bold text-[14px] xl:text-xl drop-shadow-lg">
            {title}
          </p> */}
           <div className="absolute inset-0 bg-black/40"></div>
          <H5 className="text-white text-center w-[90%] absolute bottom-5 left-1/2 -translate-x-1/2">
            {title}
          </H5>
        </div>
      </div>
    </>
  );
}

export default ServicesImageCard;
