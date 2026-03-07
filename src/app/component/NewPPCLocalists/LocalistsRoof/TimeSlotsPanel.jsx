"use client";
import { Clock } from "lucide-react";

const TIME_SLOTS = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
  "05:00 PM",
  "05:30 PM",
];

export default function TimeSlotsPanel({
  selectedTime,
  showMobileSlots,
  onTimeSelect,
}) {
  return (
    <div
      className={`transition-all duration-300 w-full lg:w-[240px] md:w-[130px] ${showMobileSlots ? "block" : "hidden md:block"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-2 md:mb-2 mb-3.5 lg:mb-4">
        <Clock size={16} className="text-[#00AEEF]" />
        <span className="text-[14px] font-bold text-[#6B7280] tracking-[-0.03em] font-[Arial]">
          Available Times
        </span>
      </div>

      {/* Slot buttons */}
      <div
        className="flex flex-row flex-wrap pb-1 md:flex-col gap-2 max-h-[340px] md:max-h-[360px] overflow-y-auto pr-1 cursor-pointer
                    [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-4
                    [&::-webkit-scrollbar-track]:bg-gray-100
                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                    [&::-webkit-scrollbar-thumb]:rounded-full"
      >
        {TIME_SLOTS.map((time) => (
          <button
            key={time}
            onClick={() => onTimeSelect(time)}
            className={`
                            min-w-[110px] md:w-full py-2.5 px-4 rounded-xl border-2
                            text-[14px] font-bold font-[Arial] cursor-pointer
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
