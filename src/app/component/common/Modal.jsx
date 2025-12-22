// Modal.jsx - Updated Version
import React from "react";
import { X } from "lucide-react";
import Button1 from "../UI/Typography/Button1";

const Modal = ({
  isOpen,
  onClose,
  children,
  maxWidth = "max-w-2xl",
  maxHeight = "max-h-[90vh]",
  title,
  nextButtonText = "Continue",
  BackButtonText = "Back",
  onNext,
  onBack,
  showButtons = true,
  padding = "px-7.5 py-6",
  zIndex = "z-50",
  showClosIcon = true,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 to-5% ${zIndex} flex items-center justify-center bg-[#00000080]`}
      // onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidth} ${maxHeight} bg-white shadow-2xl flex flex-col`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showClosIcon && (
          <button
            onClick={onClose}
            className="absolute top-0 right-1 z-10 p-2 font-bold text-black cursor-pointer rounded-full transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        )}

        {/* Title - Fixed */}
        {title && (
          <div className={`${padding} pb-0 flex-shrink-0`}>
            <h2 className="text-2xl font-bold text-center text-black mb-4">
              {title}
            </h2>
          </div>
        )}

        {/* Modal Content - Flexible, can scroll internally */}
        <div className={`flex-1 ${padding} overflow-y-auto `}>{children}</div>

        {/* Buttons - Fixed at bottom */}
        {showButtons && (
          <div className={`${padding} pt-0 flex-shrink-0`}>
            {onBack && onNext ? (
              <div className="flex justify-between items-center">
                <Button1 variant="secondary" onClick={onBack}>
                  {BackButtonText}
                </Button1>
                <Button1 variant="primary" onClick={onNext}>
                  {nextButtonText}
                </Button1>
              </div>
            ) : onNext ? (
              <div className="flex justify-center">
                <Button1 variant="primary" onClick={onNext}>
                  {nextButtonText}
                </Button1>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
