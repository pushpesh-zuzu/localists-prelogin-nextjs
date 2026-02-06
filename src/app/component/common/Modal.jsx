// Modal.jsx - Updated Version
import React from "react";
import { X } from "lucide-react";
import Button1 from "../UI/Typography/Button1";
import H4 from "../UI/Typography/H4";
import LoaderIndicator from "./Loader/LoaderIndicatore";

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
  titleClassName = "",
  showButtons = true,
  padding = "p-3 md:px-7.5 md:py-6",
  zIndex = "z-50",
  showClosIcon = true,
  radius = "rounded-none",
  nextButtonClassName = "",
  disabled = false,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 to-5% ${zIndex} flex items-center justify-center bg-[#00000080]`}
      // onClick={onClose}
    >
      <div
        className={`relative w-full ${maxWidth} ${maxHeight} py-4 bg-white shadow-2xl flex flex-col ${radius} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {showClosIcon && (
          <button
            onClick={onClose}
            className="absolute top-[1.5%] md:top-[3%] right-3 z-10  font-bold text-[#253238] cursor-pointer rounded-full transition-all"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        )}

        {/* Title - Fixed */}
        {title && (
          <div className={` pt-6 px-3 pb-0 flex-shrink-0`}>
            <H4 className={`text-center max-w-[90%] mx-auto ${titleClassName}`}>
              {title}
            </H4>
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
                <Button1
                  disabled={disabled}
                  variant="primary"
                  onClick={onNext}
                  className={nextButtonClassName}
                >
                  {disabled ? (
                    <div className="min-w-16">
                      <LoaderIndicator background="white" size="small" />
                    </div>
                  ) : (
                    nextButtonText
                  )}
                </Button1>
              </div>
            ) : onNext ? (
              <div className="flex justify-center cursor-pointer">
                <Button1
                  disabled={disabled}
                  variant="primary"
                  onClick={onNext}
                  className={nextButtonClassName}
                >
                  {disabled ? (
                    <div className="min-w-[80px]">
                      <LoaderIndicator background="white" size="small" />
                    </div>
                  ) : (
                    nextButtonText
                  )}
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
