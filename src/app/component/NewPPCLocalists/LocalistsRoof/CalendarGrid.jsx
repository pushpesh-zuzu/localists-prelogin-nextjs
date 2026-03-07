"use client";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarGrid({
  daysInMonth,
  firstDay,
  isDisabled,
  isSelected,
  isToday,
  onDateClick,
}) {
  return (
    <>
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
      <div className="grid grid-cols-7 gap-y-2">
        {/* Empty offset cells */}
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* Day buttons */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const disabled = isDisabled(day);
          const selected = isSelected(day);
          const todayDay = isToday(day);

          return (
            <button
              key={day}
              disabled={disabled}
              onClick={() => onDateClick(day)}
              className={`
                                mx-auto flex items-center justify-center
                                h-6.5 w-6.5 md:h-8.5 md:w-8.5 lg:h-10 lg:w-10 rounded-full
                                text-[13px] md:text-[15px] font-bold font-[Arial] transition-all
                                ${disabled ? "text-[#D1D5DB] cursor-not-allowed" : "cursor-pointer"}
                                ${selected ? "bg-[#00AEEF] text-white shadow-md scale-105" : ""}
                                ${todayDay && !selected ? "ring-2 ring-[#00AEEF] text-[#00AEEF]" : ""}
                                ${!selected && !disabled && !todayDay ? "bg-[#EBF9F3] hover:text-[#253238] text-[#00AEEF]" : ""}
                            `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}
