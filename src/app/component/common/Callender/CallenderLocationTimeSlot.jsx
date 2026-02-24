import { Clock } from "lucide-react";
import React from "react";

function CallenderLocationTimeSlot({
  TIME_SLOTS = [],
  selectedDate,
  selectedTime,
  setSelectedTime,
}) {
  return (
    <div
      className={`transition-all duration-300 ${
        selectedDate
          ? "opacity-100 w-full md:w-[190px]"
          : "opacity-0 pointer-events-none md:w-[190px]"
      }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-[#00AEEF]" />
        <span className="text-[13px] font-bold text-[#6B7280] font-[Arial]">
          Available Times
        </span>
      </div>
      <div
        className="flex flex-row flex-wrap md:flex-col gap-2 max-h-[360px] overflow-y-auto pr-1
            [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 
            [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {TIME_SLOTS?.map((time) => (
          <button
            key={time}
            onClick={() => setSelectedTime(time)}
            className={`
                  cursor-pointer min-w-[110px] md:w-full py-2.5 px-4 rounded-xl border-2 text-[14px] font-bold font-[Arial]
                  tracking-[-0.02em] transition-all
                  ${
                    selectedTime === time
                      ? "bg-[#00AEEF] border-[#00AEEF] text-white shadow-md"
                      : "border-[#D1FAE5] text-[#00AEEF] hover:border-[#00AEEF] hover:bg-[#EBF9F3]"
                  }
                `}
          >
            {time}
          </button>
        ))}
      </div>
    </div>
  );
}

export default CallenderLocationTimeSlot;
