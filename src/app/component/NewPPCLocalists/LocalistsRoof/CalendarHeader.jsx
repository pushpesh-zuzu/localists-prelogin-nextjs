"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function CalendarHeader({
  currentMonth,
  currentYear,
  isPrevDisabled,
  isNextDisabled,
  onPrevMonth,
  onNextMonth,
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <button
        onClick={onPrevMonth}
        disabled={isPrevDisabled}
        className={`
                    h-9 w-9 rounded-full flex items-center justify-center transition
                    ${
                      isPrevDisabled
                        ? "text-gray-300 cursor-not-allowed"
                        : "hover:bg-gray-100 text-[#253238] cursor-pointer"
                    }
                `}
      >
        <ChevronLeft size={20} />
      </button>

      <span className="font-bold font-[Arial] text-[16px] md:text-[18px] tracking-[-0.03em] text-[#253238]">
        {MONTHS[currentMonth]} {currentYear}
      </span>

      <button
        onClick={onNextMonth}
        disabled={isNextDisabled}
        className={`
                    h-9 w-9 rounded-full flex items-center justify-center transition
                    ${
                      isNextDisabled
                        ? "bg-[#EBF9F3] text-gray-300 cursor-not-allowed"
                        : "bg-[#EBF9F3] cursor-pointer hover:bg-[#00AEEF] hover:text-white text-[#00AEEF]"
                    }
                `}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
