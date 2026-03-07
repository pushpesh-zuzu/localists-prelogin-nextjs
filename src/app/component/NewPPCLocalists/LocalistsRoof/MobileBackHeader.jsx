"use client";
import { ArrowLeft } from "lucide-react";

export default function MobileBackHeader({ formattedDate, onBack }) {
  return (
    <div className="flex items-center gap-3 mb-4 md:hidden">
      <button
        onClick={onBack}
        className="h-9 w-9
                    flex items-center justify-center
                    rounded-full
                    border border-[#D1FAE5]
                    text-[#00AEEF]
                    hover:bg-[#EBF9F3]
                    transition"
        aria-label="Back to calendar"
      >
        <ArrowLeft size={20} strokeWidth={2} />
      </button>
      <span className="font-medium text-[15px] text-[#253238]">
        {formattedDate}
      </span>
    </div>
  );
}
