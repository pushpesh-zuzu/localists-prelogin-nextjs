"use client";

import React from "react";

const QuestionOptionsBox = ({
    label,
    isSelected,
    onSelect,
    isMulti,
}) => {
    return (
        <button
            type="button"
            onClick={onSelect}
            className={`
        w-full
        px-4
        py-7
        rounded-[10px]
        border
        text-[16px] leading-[18px]
        md:text-[18px] md:leading-[20px]
        lg:text-[20px] lg:leading-[22px]
        font-[Arial]
        font-bold
        tracking-[-0.03em]
        transition-all
        duration-200
        cursor-pointer
        focus:outline-none
        flex items-center justify-center gap-3
        ${isSelected
                    ? "border-[#00afe3] bg-[#e9f8ff]"
                    : "border-[#d9d9d9] bg-white hover:border-[#00afe3]"
                }
      `}
        >
            <span>{label}</span>

            {/* ✅ Show checkbox only for multi */}
            {isMulti && (
                <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-5 h-5 accent-[#00afe3] pointer-events-none"
                />
            )}
        </button>
    );
};

export default QuestionOptionsBox;