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
        relative
        w-full
        px-4
        h-[80px] flex
        items-center
        justify-center
        text-center
        rounded-[20px]
        border
        text-[16px] leading-[18px]
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
                    ? "border-[#00afe3] bg-[#e9f8ff]"
                    : "border-[#d9d9d9] bg-white hover:border-[#00afe3]"
                }
      `}
        >
            {/* Label */}
            <span>{label}</span>

            {/* Custom Checkbox */}
            {isMulti && (
                <div
                    className={`
            absolute top-1 right-2
            h-5 w-5
            rounded-[5px]
            border-2
            flex items-center justify-center
            transition-all duration-300
            ${isSelected
                            ? "bg-[#00afe3] border-[#00afe3] scale-100"
                            : "bg-white border-[#d9d9d9] scale-95"
                        }
          `}
                >
                    {/* Check Icon */}
                    <svg
                        className={`h-3.5 w-3.5 text-white transition-opacity duration-200 ${isSelected ? "opacity-100" : "opacity-0"
                            }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            )}
        </button>
    );
};

export default QuestionOptionsBox;