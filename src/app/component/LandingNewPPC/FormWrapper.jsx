// Wrapper.jsx
import React from "react";
import { X } from "lucide-react";
import Button1 from "../UI/Typography/Button1";
import H4 from "../UI/Typography/H4";

const FormWrapper = ({
  children,
  maxWidth = "max-w-2xl",
  maxHeight = "max-h-[90vh]",
  title,
  nextButtonText = "Continue",
  BackButtonText = "Back",
  onNext,
  onBack,
  onClose,
  showButtons = true,
  padding = "p-3 md:px-7.5 md:py-6",
  showCloseIcon = true,
  className = "",
}) => {
  return (
    <div
      className={`relative w-full ${maxWidth} ${maxHeight} py-4 bg-white shadow-2xl flex flex-col ${className}`}
    >
      {/* Close Button */}
      {showCloseIcon && onClose && (
        <button
          onClick={onClose}
          className="absolute top-[1.5%] md:top-[3%] right-3 z-10 font-bold text-[#253238] cursor-pointer rounded-full transition-all"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      )}

      {/* Title - Fixed */}
      {title && (
        <div className="pt-6 px-3 pb-0 flex-shrink-0">
          <H4 className="text-center max-w-[90%] mx-auto">{title}</H4>
        </div>
      )}

      {/* Content - Flexible, can scroll internally */}
      {children && <div className={`flex-1 ${padding} overflow-y-auto`}>{children}</div>}

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
  );
};

export default FormWrapper;