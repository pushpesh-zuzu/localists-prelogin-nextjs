"use client";

import { X } from "lucide-react";
import { createPortal } from "react-dom";
// import { useEffect, useState } from "react";

export default function ModalsWithCloseButton({
  isOpen = true,
  onClose,
  children,
  className = "mt-[50px] md:mt-[90px]",
  className2 = "max-w-[590px] w-full",
}) {

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center rounded-[100px] justify-center pb-0 md:pb-10 ">
      <div
        className="absolute inset-0"
      // onClick={onClose}
      />

      <div
        className={`relative z-[1000000] ${className} ${className2}
        rounded-[55px] overflow-hidden shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute cursor-pointer right-6 top-6 z-10 text-zinc-400 hover:text-zinc-600"
            aria-label="Close modal"
          >
            <X strokeWidth={3} />
          </button>
        )}

        {children}
      </div>
    </div>,
    document.body
  );
}
