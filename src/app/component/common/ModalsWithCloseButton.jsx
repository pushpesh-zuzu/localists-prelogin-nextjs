"use client";

import { X } from "lucide-react";
export default function ModalsWithCloseButton({
  isOpen = true,
  onClose,
  children,
  className = "mt-[50px] md:mt-[90px]",
  className2 = "max-w-[590px]",
}) {
  if (!isOpen) return null;

  return (
    <div
      className={`${className} fixed inset-0 z-49 flex items-center rounded-[100px] justify-center`}
      // onClick={onClose}
    >
      <div
        className={`relative ${className2} rounded-[55px] z-49  p-4`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute right-10 top-8 flex h-8 w-8 items-center justify-center rounded-lg text-zinc-400 transition-all  hover:text-zinc-600 cursor-pointer"
            aria-label="Close modal"
          >
            <X strokeWidth={4} />
          </button>
        )}
        {/* Children */}
        {children}
      </div>
    </div>
  );
}
