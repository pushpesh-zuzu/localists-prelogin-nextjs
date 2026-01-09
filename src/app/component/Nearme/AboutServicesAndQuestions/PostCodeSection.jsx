import React from "react";
import PostCodeSearchField from "../PostCodeSearchField";

function PostCodeSection() {
  return (
    <div
      className="
        rounded-[27px] bg-[#7ED5F1] px-9 py-16
        flex flex-col gap-6
        md:flex-row md:items-center md:justify-between
      "
    >
      {/* Left – Search */}
      <div className="w-full md:w-auto max-w-[343px]">
        <PostCodeSearchField buttonBg="bg-[#02D07B]" margin={false}/>
      </div>

      {/* Right – Text */}
      <p
        className="
          font-Inter font-black text-white
          tracking-[-0.03em]
          text-[25px] leading-[28px]
          md:text-[30px] md:leading-[35px]
          lg:text-[40px] lg:leading-[55px]
          md:text-right
        "
      >
        Free quotes. Zero obligation.
      </p>
    </div>
  );
}

export default PostCodeSection;
