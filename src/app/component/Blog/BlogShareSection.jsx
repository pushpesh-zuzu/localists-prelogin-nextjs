import React from "react";
import XWithArrowIcon from "../../../../public/ReactIcons/XWithArrowIcon";
import FacebookWithArrowIcon from "../../../../public/ReactIcons/FacebookWithArrowIcon";
import AttachFileWithArrowIcon from "../../../../public/ReactIcons/AttachFileWithArrowIcon";
import LinkeInWithArrowIcon from "../../../../public/ReactIcons/LinkeInWithArrowIcon";

function BlogShareSection() {
  return (
    <div>
      <p className="text-base font-bold mb-2.5 md:mb-4">Share</p>
      <div className="flex flex-row gap-3">
        <LinkeInWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]"/>
        <XWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]" />
        <FacebookWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]"/>
        <AttachFileWithArrowIcon className="h-6 w-14 md:h-9 md:w-[90px]" />
      </div>
      <div className="flex md:justify-end my-5">
        <span className="text-base font-bold">10 mins read time</span>
      </div>
    </div>
  );
}

export default BlogShareSection;
