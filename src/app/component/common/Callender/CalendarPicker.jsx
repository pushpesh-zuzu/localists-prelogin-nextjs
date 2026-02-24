import { ChevronLeft, ChevronRight } from "lucide-react";
import { DAYS, MONTHS } from "./CallenderLocation";

export default function CalendarPicker({
  currentYear,
  currentMonth,
  selectedDate,
  onPrevMonth,
  onNextMonth,
  onDateClick,
}) {
  const today = new Date();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const isPast = (day) =>
    new Date(currentYear, currentMonth, day) <
    new Date(today.getFullYear(), today.getMonth(), today.getDate());

  const isToday = (day) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const isSelected = (day) =>
    selectedDate?.getDate() === day &&
    selectedDate?.getMonth() === currentMonth &&
    selectedDate?.getFullYear() === currentYear;

  const formatSelected = () =>
    selectedDate?.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="flex-1 bg-white rounded-[24px] md:min-w-[400px] border-2 border-[#E5E7EB] p-5 shadow-sm">
      {/* Month Nav */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onPrevMonth}
          className="h-9 w-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition text-[#253238]"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="font-black font-[Arial] text-[16px] md:text-[18px] tracking-[-0.03em] text-[#253238]">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          onClick={onNextMonth}
          className="h-9 w-9 rounded-full flex items-center justify-center bg-[#EBF9F3] hover:bg-[#00AEEF] hover:text-white transition text-[#00AEEF]"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="text-center text-[11px] md:text-[13px] font-bold text-[#9CA3AF] py-1"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day Cells */}
      <div className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const past = isPast(day);
          const selected = isSelected(day);
          const todayDay = isToday(day);
          return (
            <button
              key={day}
              disabled={past}
              onClick={() =>
                !past && onDateClick(new Date(currentYear, currentMonth, day))
              }
              className={`
                mx-auto flex items-center justify-center
                h-9 w-9 md:h-10 md:w-10 rounded-full
                text-[13px] md:text-[15px] font-bold font-[Arial] transition-all
                ${past ? "text-[#D1D5DB] cursor-not-allowed" : "cursor-pointer"}
                ${selected ? "bg-[#00AEEF] text-white shadow-md scale-105" : ""}
                ${todayDay && !selected ? "ring-2 ring-[#00AEEF] text-[#00AEEF]" : ""}
                ${!selected && !past && !todayDay ? "hover:bg-[#EBF9F3] text-[#253238]" : ""}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Selected date pill */}
      {selectedDate && (
        <div className="mt-4 flex items-center gap-2 bg-[#EBF9F3] rounded-full px-4 py-2 w-fit">
          <span className="text-[#00AEEF] text-[13px] font-bold font-[Arial]">
            {formatSelected()}
          </span>
        </div>
      )}
    </div>
  );
}
