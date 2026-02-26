"use client";
import React from "react";
import Image from "next/image";
import H1 from "../UI/Typography/H1";

function BlogHeroSection({
  bannerImage = "",
  bannerImageMobile = "",
  altText = "Tree Surgery",
  category = "Tree Surgery",
  title = "A guide to Tree Preservation Orders",
  author = "Localists",
  reviewer = "Richard",
  publishedDate = "24.08.24",
  updatedDate = "28.10.25",
}) {
  return (
    <div className="relative w-full h-[520px] md:h-[520px] xl:h-[600px] overflow-hidden">
      
      {/* Desktop Image */}
      <div className="absolute inset-0 hidden md:block">
        <Image
          src={bannerImage}
          alt={altText}
          fill
          priority
          className="object-cover"
          sizes="(min-width: 768px) 100vw, 0px"
        />
      </div>

      {/* Mobile Image */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src={bannerImageMobile}
          alt={altText}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Gradient Overlay */}

      {/* Content */}
      <div className="relative z-[2] max-w-[1536px] mx-auto h-full px-[30px] md:px-[60px] xl:px-[116px] flex items-end pb-7.5 md:pb-[53px]">
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="max-w-[809px] text-white">
            
            {/* Category pill */}
            <span className="inline-block font-semibold text-[20px] bg-white/40  text-white text-sm  px-4 py-2 md:py-[11px] rounded-full mb-[18px] md:mb-6">
              {category}
            </span>

            {/* Title */}
            <H1 className="text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)] ">
              {title}
            </H1>
          </div>

          {/* RIGHT CONTENT */}
          <div className=" text-white text-sm md:text-base min-h-full min-w-[260px]">
            
            {/* Author */}
            <div className="flex flex-row gap-4">
              {/* <div className="w-12 h-12 rounded-full bg-white/40" /> */}
            <div className="flex flex-col justify-between ">
                <div className="flex items-center gap-3 mb-5 md:mb-12">
              <div>
                <p className="font-bold text-xs md:text-[18px] drop-shadow-[0px_3.65px_3.65px_rgba(0,0,0,0.15)] leading-7.5">
                  Author: {" "}
                  <span className="underline drop-shadow-[0px_3.65px_3.65px_rgba(0,0,0,0.15)]">
                    {author}
                  </span>
                </p>
                {/* <p className="font-bold text-xs md:text-[18px] drop-shadow-[0px_3.65px_3.65px_rgba(0,0,0,0.15)]">
                  Reviewed by{" "}
                  <span className="underline drop-shadow-[0px_3.65px_3.65px_rgba(0,0,0,0.15)]">
                    {reviewer}
                  </span>
                </p> */}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-1 opacity-90">
              <p className="text-[10px] md:text-base font-bold">Published: {publishedDate}</p>
              <p className="text-[10px] md:text-base font-bold">Updated: {updatedDate}</p>
            </div>
            </div>
            </div>
            
          </div>

        </div>
      </div>
    </div>
  );
}

export default BlogHeroSection;