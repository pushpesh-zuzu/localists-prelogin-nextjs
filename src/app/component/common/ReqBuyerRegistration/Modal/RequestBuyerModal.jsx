// RequestBuyerModal.jsx
"use client";

import React from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import ProgressBarQuoteRequest from "../ProgressBarQuoteRequest/ProgressBarQuoteRequest";
import Link from "next/link";
import MenCircle from "../../../../../../public/ReactIcons/MenCircle";
import BackButtonOTP from "../../icons/Registration/BackButtonOTP";
import NewBuyerRequestProgressBarQuotesRequest from "../NewRequestModalSteps/NewBuyerRequestProgressBarQuotesRequest";
import Paragraph from "@/app/component/UI/Typography/Paragraph";

const RequestBuyerModal = ({
  isOpen,
  onClose,
  children,
  title,
  nextButtonText = "Next",
  BackButtonText = "Back",
  onNext,
  onBack,
  onBackDisable = false,
  titleClassName = "",
  showButtons = true,
  padding = "",
  zIndex = "z-50",
  showClosIcon = true,
  radius = "rounded-[36px]",
  nextButtonClassName = "",
  disabled = false,
  usePortal = false,
  insetBG = "bg-[#00000080]",
  buyerStep,
  fixedHeight,
  showProgressBar = false,
  buttongroup = "",
  viewMatches = false,
  progressPercent,
  viewMatchesIcon,
  marginTop = "",
  minHeight = "min-h-[300px]  md:min-h-[572px]",
  subHeading = "",
  description = "",
  errorMessage = "",
  childrenMaxHeight="max-h-[350px] md:max-h-[450px]"
}) => {
  if (!isOpen) return null;

  const modalContent = (
    <div
      className={`fixed inset-0 ${zIndex}  flex items-center justify-center ${insetBG}`}
    >
      <div
        className={`relative min-w-[300px] w-[90%] ${marginTop} md:max-w-[700px] md:w-[700px] ${minHeight} bg-white shadow-2xl flex flex-col ${radius} overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col flex-1 overflow-hidden px-5 py-7.5 md:px-12 md:py-7.5">
          {/* Title */}
          <div className="flex items-start md:items-start justify-between  mb-7.5 md:mb-10">
            {title && (
              <div className="mr-4">
                <h4
                  className={`font-Inter font-black tracking-[-0.03em] text-[24px] leading-[25px]
                    md:text-[24px] md:leading-[25px] lg:text-[30px] lg:leading-[30px] ${titleClassName}`}
                >
                  {title}
                </h4>
              </div>
            )}

            <button
              onClick={onClose}
              className={`${showClosIcon ? "" : "hidden"} ml-auto text-[white] bg-[#00afe3] max-h-9 min-h-9 min-w-9 rounded-full cursor-pointer p-1.5 transition-all`}
              aria-label="Close modal"
            >
              <X size={20} className="m-auto" />
            </button>
          </div>

          {/* Progress Bar */}
          {showProgressBar && (
            <div
              className={`${fixedHeight ? "flex-shrink-0" : ""} mb-7.5 md:mb-10`}
            >
              <NewBuyerRequestProgressBarQuotesRequest
                value={progressPercent}
                buyerStep={buyerStep}
              />
            </div>
          )}
          {subHeading && (
            <Paragraph className="text-center">{subHeading}</Paragraph>
          )}
          {description && (
            <Paragraph
              bold={"font-medium"}
              className="text-center mt-1 sm:mt-0 mb-4"
            >
              {description}
            </Paragraph>
          )}

          {/* Content */}
          <div
            className={`flex-1 pb-[10px] ${childrenMaxHeight} overflow-y-auto`}
          >
            {children}
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600  py-2">{errorMessage}</p>
          )}

          {/* Buttons */}
          {showButtons && (onBack || onNext) && (
            <div
              className={`
                ${!viewMatches ? padding : ""} ${buttongroup} pt-[20px]
                flex items-center gap-[12px]
                flex-shrink-0 justify-center 
                lg:w-[608px]
                max-[768px]:pt-[20px] text-center
                max-[768px]:gap-[10px]
                max-[480px]:pt-[20px]
                max-[480px]:gap-[8px]
                cursor-pointer
              `}
            >
              {/* Back Button */}
              {true && (
                <button
                  onClick={onBack}
                  disabled={onBackDisable}
                  className={`
                    disabled:bg-[#DBDFE4]
                    disabled:cursor-none
                    w-[80px] h-[50px]
                    bg-[#7DD6F1] text-white
                    rounded-full cursor-pointer
                    flex items-center justify-center gap-[5px]
                    transition-all duration-300
                    active:translate-y-[1px] min-w-[95px]  md:min-w-[214px]
                   
                    max-[768px]:w-[52px]
                    max-[768px]:h-[52px]
                    max-[480px]:w-[70px]
                    max-[480px]:h-[48px]
                  `}
                >
                  <BackButtonOTP color="white" className="h-3.5 w-4.5" />
                  <span className="text-[14px] font-medium">
                    {BackButtonText}
                  </span>
                </button>
              )}

              {/* Next Button */}
              {onNext && (
                <button
                  onClick={onNext}
                  disabled={disabled}
                  className={`
                    flex-1 h-[50px]
                    bg-[#00AFE3] text-white
                    rounded-full hover:bg-[#0096C4]
                    font-bold
                    transition-colors duration-300
                    cursor-pointer
                    active:translate-y-[1px]
                    disabled:opacity-60
                    font-[Arial]
                    tracking-[-0.03em]
                    leading-[24px]
                    text-[20px]
                    max-[768px]:text-[18px]
                    max-[480px]:text-[16px]
                    max-[768px]:h-[52px]
                    max-[480px]:h-[48px]
                    ${nextButtonClassName}
                  `}
                >
                  {viewMatchesIcon && <MenCircle className="w-5 h-5" />}
                  {nextButtonText}
                </button>
              )}
            </div>
          )}

          {/* Privacy Policy */}
          {viewMatches && (
            <div className="flex justify-center pt-[10px] pb-[20px]">
              <p className="text-[#838383] font-medium text-xs text-center">
                Your information is protected by our{" "}
                <Link
                  href="/en/gb/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="privacyLink text-[#00afe3] hover:underline"
                >
                  privacy policy
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return usePortal ? createPortal(modalContent, document.body) : modalContent;
};

export default RequestBuyerModal;
