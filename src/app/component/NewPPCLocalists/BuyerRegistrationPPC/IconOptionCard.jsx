"use client";
import React, { useEffect, useState, useMemo } from "react";

const formatLabel = (text = "") => {
  return text
    // space before capital letters
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    // space between word and slash word
    .replace(/\/([a-zA-Z])/g, " / $1")
    // space between letters and numbers (optional)
    .replace(/([a-zA-Z])(\d)/g, "$1 $2")
    .replace(/(\d)([a-zA-Z])/g, "$1 $2");
};

// labels that should NOT be displayed
const HIDE_LABELS = new Set(["1", "2", "3", "4 or more"]);

const shouldHideLabel = (text = "") => {
  return HIDE_LABELS.has(text.trim());
};

const IconOptionCard = ({
  icon: Icon,
  label,
  isSelected = false,
  isSingle = true,
  disabled = false,
  onClick,
}) => {
  const [iconSize, setIconSize] = useState(50);

    const isSpecialLabel = useMemo(
    () => shouldHideLabel(label),
    [label]
  );

  useEffect(() => {
    const handleResize = () => {
      setIconSize(window.innerWidth < 768 ? 35 : 50);
    };

    handleResize(); // initial check
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`
        relative
        flex flex-col items-center justify-center
        lg:px-[20px] px-[10px]
        pb-[15px]
        md:pt-[15px] pt-[20px]
        max-w-[85px] md:max-w-[180px] 
        ${isSpecialLabel ? "md:w-[125px] md:h-[90px] lg:w-[145px] lg:h-[100px]" : "w-full"}
         rounded-[10px]
        text-white
        bg-[#00afe3]
        cursor-pointer
        transition-all duration-200 ease-in-out
        shadow-md
        hover:-translate-y-[3px]
        ${isSelected ? "border border-[#00afe3]" : "border border-transparent"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      {/* Checkbox (only for multi select) */}
      {!isSingle && (
        <div className="absolute top-[2px] md:top-[10px] left-[5px] md:left-[10px]">
          <input
            type="checkbox"
            checked={isSelected}
            readOnly
            className="w-4 h-4 accent-[#00afe3] cursor-pointer"
          />
        </div>
      )}

      {/* Icon */}
      <Icon width={isSpecialLabel ? 65 : iconSize} height={isSpecialLabel ? 65 : iconSize} />

      {/* Label */}
      {
        !isSpecialLabel && (
          <span className="font-[Arial] tracking-[-0.03em] text-[12px] leading-[12px] md:leading-[18px] md:text-[14px] text-center font-bold pt-[10px]">
            {formatLabel(label)}
          </span>
        )
      }
    </button>
  );
};

export default IconOptionCard;