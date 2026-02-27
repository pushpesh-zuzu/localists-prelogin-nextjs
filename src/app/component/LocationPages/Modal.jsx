// Modal.jsx
"use client";

import React from "react";
import { X, ArrowLeft } from "lucide-react";
import H4 from "../UI/Typography/H4";
import LoaderIndicator from "../common/Loader/LoaderIndicatore";
import { createPortal } from "react-dom";
import LogoIcon from "../LandingPages/LogoIcon";
import ProgressBarQuoteRequest from "./ProgressBarQuoteRequest";
import Link from "next/link";

const Modal = ({
    isOpen,
    onClose,
    children,
    maxWidth = "max-w-2xl",
    maxHeight = "max-h-[90vh]",
    title,
    nextButtonText = "Next",
    BackButtonText = "Back",
    onNext,
    onBack,
    titleClassName = "",
    showButtons = true,
    padding = "",
    zIndex = "z-50",
    showClosIcon = true,
    radius = "rounded-[30px]",
    nextButtonClassName = "",
    disabled = false,
    usePortal = false,
    insetBG = "bg-[#00000080]",
    buyerStep,
    fixedHeight,
    showProgressBar = false,
    buttongroup = "mx-auto",
    viewMatches = false,
    progressPercent
}) => {
    if (!isOpen) return null;

    // console.log("progressPercent", progressPercent)

    const modalContent = (
        <div
            className={`fixed inset-0 ${zIndex} flex items-center justify-center ${insetBG}`}
        >
            <div
                className={`relative w-full ${maxWidth} ${maxHeight} bg-white shadow-2xl flex flex-col ${radius} overflow-hidden`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Logo */}
                <div className="flex justify-center pt-[20px] pb-[20px]">
                    <LogoIcon className="w-[130px] h-7 md:w-[150px] md:h-7 lg:w-[257px] lg:h-8" />
                </div>

                {/* Close Button */}
                {showClosIcon && (
                    <button
                        onClick={onClose}
                        className="absolute top-[1.5%] md:top-[3%] right-3 z-10 text-[#253238] cursor-pointer rounded-full transition-all"
                        aria-label="Close modal"
                    >
                        <X size={20} />
                    </button>
                )}

                <div className="bg-[#f7f7f7] flex flex-col flex-1 overflow-hidden">
                    {/* Progress bar */}
                    {showProgressBar && (
                        <div className={`${fixedHeight ? "flex-shrink-0" : ""}`}>
                            <ProgressBarQuoteRequest value={progressPercent} buyerStep={buyerStep}
                            />
                        </div>
                    )}

                    {/* Title */}
                    {title && (
                        <div className="lg:pt-[40px] lg:pb-[30px] pt-[30px] pb-[20px] md:pt-[30px] md:pb-[20px] flex-shrink-0">
                            <h4
                                className={`font-Inter font-black tracking-[-0.03em] text-[25px] leading-[25px]
                    md:text-[25px] md:leading-[25px] lg:text-[30px] lg:leading-[30px] max-w-[90%] md:max-w-[80%] lg:max-w-[608px] lg:mx-[68.4px] mx-auto ${titleClassName}`}
                            >
                                {title}
                            </h4>
                        </div>
                    )}

                    {/* Content */}
                    <div className={`flex-1 pb-[10px] overflow-y-auto`}>
                        {children}
                    </div>

                    {/* Buttons (ONLY UI UPDATED) */}
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
              `}
                        >
                            {/* Back Button */}
                            {onBack && (
                                <button
                                    onClick={onBack}
                                    className={`
                    w-[80px] h-[50px]
                    bg-[#f5f5f5]
                    border-2 border-[#e1e5e9]
                    rounded-[20px] cursor-pointer
                    flex items-center justify-center gap-[5px]
                    transition-all duration-300
                    active:translate-y-[1px]

                    hover:bg-[#e9e9e9]
                    hover:border-[#ccc]

                    max-[768px]:w-[52px]
                    max-[768px]:h-[52px]

                    max-[480px]:w-[70px]
                    max-[480px]:h-[48px]
                  `}
                                >
                                    <ArrowLeft size={18} strokeWidth={2} />
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
                    bg-[#00afe3] text-white
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
                  `}>
                                    {!disabled && nextButtonText}
                                </button>
                            )}
                        </div>
                    )}
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

export default Modal;