"use client";

import Image from "next/image";
import H1 from "../../UI/Typography/H1";

const BannerWrapper = ({
  image,
  imageAlt,
  children,
  headingText = "",
}) => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full h-[clamp(250px,40vw,500px)] overflow-hidden">

        {/* Background Image with alt */}
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          className="object-cover"
        />

        <div className="relative z-[1] flex flex-col items-center justify-center px-[49px] h-full max-md:px-0">
          {headingText && (
            <H1 className="text-white text-center px-[20px]">
              {headingText}
            </H1>
          )}

          {children && (
            <div className="w-[72%] max-md:w-[92%]">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BannerWrapper;
