"use client";

import React from "react";

const NewBuyerRequestQuestionOptionsBox = ({
    label,
    isSelected,
    onSelect,
}) => {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`
        relative
        w-full
        md:px-4 px-3
        md:h-[80px] h-[54px] flex
        items-center
        justify-center
        text-center
        rounded-[20px]
        border border-2
        text-[16px] leading-[16px]
        md:text-[18px] md:leading-[20px]
        lg:text-[18px] lg:leading-[20px]
        font-[Arial]
        font-bold
        tracking-[-0.03em]
        transition-all
        duration-200
        cursor-pointer
        focus:outline-none
        flex items-center justify-center
        ${isSelected
                    ? "border-2 border-[#00afe3] bg-[#e9f8ff] text-[#00aef3] drop-shadow-[0px_4px_0px_rgba(0,0,0,0.1)]"
                    : "border-[#d9d9d9] hover:border-2 bg-white hover:border-[#00afe3] hover:bg-[#f7fdff]"
                }
      `}
        >
            {/* Label */}
            <span>{label}</span>
        </button>
    );
};

export default NewBuyerRequestQuestionOptionsBox;