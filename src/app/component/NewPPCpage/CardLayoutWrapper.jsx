"use client";

import LoaderIndicator from "../common/Loader/LoaderIndicatore";
import Image from "next/image";
import leftNormalArrow from "../../../../public/icons/leftNormalArrow.svg";
import H5 from "../UI/Typography/H5";
import H4 from "../UI/Typography/H4";

const CardLayoutWrapper = ({
  children,
  title,
  subtitle,
  buttonText = "Next",
  onButtonClick,
  onBackClick,
  showButton = true,
  showBackButton = false,
  disableNextButton,
  loader = false,
  headingCenter = true,
  titlePrimary = false,
  NameEmailContainer = false,
  titleHeading = "",
  buttonWrapperClassName = "",
}) => {
  return (
    <div
      className={`
        flex justify-center items-center bg-white rounded-[10px] w-full
        ${NameEmailContainer ? "w-[85%] mx-auto h-fit" : ""}
        max-[480px]:items-start
        ${NameEmailContainer ? "max-[480px]:w-[82%]" : ""}
      `}
    >

      <div className="bg-white rounded-[20px] mt-[20px] w-full">
        {titleHeading && (
          <H4 className="mb-[20px] leading-[26px] md:leading-[16px] lg:leading-[30px] max-[768px]:mb-[15px] text-[#253238] text-center">
            {titleHeading}
          </H4>
        )}

        {/* TITLE */}
        {title && (
          <H5
            className={`
              mx-auto text-center
              ${titlePrimary ? "text-[#00afe3]" : "text-[#253238]"}
              mb-[20px]
            `}
          >
            {title}
          </H5>
        )}

        {/* SUBTITLE */}
        {subtitle && (
          <p
            className={`
              font-normal text-[16px] leading-[22px]
              ${headingCenter ? "text-center" : "text-left"}
              mb-[20px]
              text-[#253238]
                   font-[Arial]
                  tracking-[-0.03em]
              max-[768px]:text-[15px]
              max-[768px]:mb-[32px]

              max-[480px]:text-[14px]
              max-[480px]:mb-[28px]
            `}
          >
            {subtitle}
          </p>
        )}

        {/* CONTENT */}
        {children}

        {/* BUTTONS */}
        {showButton && (
          <div
            className={`
              flex items-center gap-[12px] mt-[40px]
               ${buttonWrapperClassName}
              max-[768px]:mt-[32px]
              max-[768px]:gap-[10px]

              max-[480px]:mt-[28px]
              max-[480px]:gap-[8px]
            `}
          >
            {/* BACK BUTTON */}
            {showBackButton && (
              <button
                onClick={onBackClick}
                className={`
                  w-[71px] h-[50px]
                  bg-[#f5f5f5]
                  border-2 border-[#e1e5e9]
                  rounded-[10px] cursor-pointer
                  flex items-center justify-center
                  transition-all duration-300
                  active:translate-y-[1px]

                  hover:bg-[#e9e9e9]
                  hover:border-[#ccc]

                  max-[768px]:w-[52px]
                  max-[768px]:h-[52px]

                  max-[480px]:w-[48px]
                  max-[480px]:h-[48px]
                `}
              >
                <Image
                  src={leftNormalArrow}
                  alt="back"
                  width={6}
                  height={12}
                />
              </button>
            )}

            {/* NEXT BUTTON */}
            <button
              onClick={onButtonClick}
              disabled={disableNextButton}
              className={`
                flex-1 h-[50px]
                bg-[#00afe3] text-white
                rounded-[20px] hover:bg-[#0096C4] font-bold
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
              `}
            >
              {loader ? <LoaderIndicator size="small" /> : buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardLayoutWrapper;
