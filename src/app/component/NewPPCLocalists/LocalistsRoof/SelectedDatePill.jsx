"use client";

export default function SelectedDatePill({ formattedDate }) {
  if (!formattedDate) return null;

  return (
    <div className="mt-4 flex items-center gap-2 bg-[#EBF9F3] rounded-full px-4 py-2 w-fit">
      <span className="text-[#00AEEF] text-[13px] font-bold font-[Arial]">
        {formattedDate}
      </span>
    </div>
  );
}
