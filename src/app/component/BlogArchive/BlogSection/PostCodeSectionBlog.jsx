"use client";
import dynamic from "next/dynamic";
import React from "react";
const PostCodeSearchFieldBlog = dynamic(() => import("./PostCodeSearchFieldBlog"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>,
});

function PostCodeSectionBlog({
  classNamePostCode = "mb-[30px] mt-[30px] lg:mt-[60px] lg:mb-[60px]",
  serviceId = 112,
  serviceName = "Tree Surgery",
}) {
  return (
    <div
      className={`${classNamePostCode} rounded-[20px]
        md:rounded-[27.5px] bg-[#7ED5F1] px-9 pt-4 pb-7 lg:px-9 lg:py-[62px] 
        flex flex-col gap-6
        lg:flex-row lg:items-center lg:justify-between
      `}
    >
      <p
        className="block lg:hidden text-center
          font-Inter font-black text-white
          tracking-[-0.03em]
          text-[25px] leading-[28px]
          md:text-[30px] md:leading-[35px]
          lg:text-[40px] lg:leading-[55px]
          lg:text-right drop-shadow-[0_0px_3.67px_rgba(0,0,0,0.25)]
        "
      >
        Free quotes. Zero obligation.
      </p>
      {/* Left – Search */}
      <div className="w-[223px] mx-auto lg:mx-0 md:w-[343px] flex justify-center">
        <PostCodeSearchFieldBlog serviceId={serviceId} serviceName={serviceName} buttonBg="bg-[#02D07B]" margin={false} />
      </div>

      {/* Right – Text */}
      <p
        className="hidden lg:block
          font-Inter font-black text-white
          tracking-[-0.03em]
          text-[25px] leading-[28px]
          md:text-[30px] md:leading-[35px]
          lg:text-[40px] lg:leading-[55px]
          md:text-right
          drop-shadow-[0_0px_3.67px_rgba(0,0,0,0.25)]
        "
      >
        Free quotes. Zero obligation.
      </p>
    </div>
  );
}

export default PostCodeSectionBlog;
