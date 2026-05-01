import { Loader2 } from "lucide-react";
import BackButtonOTP from "../../icons/Registration/BackButtonOTP";
import NewBuyerRequestProgressBarQuotesRequest from "../../ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestProgressBarQuotesRequest";

const NewMultiPPCCardLayoutWrapper = ({
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
  titleWidth = "max-w-[592px]",
  progressPercentage = 0,
  disabledBack=false
}) => {
  return (
    <div
      className={`flex justify-center items-center bg-white rounded-[36px] w-full ${
        NameEmailContainer ? "md:max-w-[85%] mx-auto h-fit" : ""
      } max-[480px]:items-start ${
        NameEmailContainer ? "max-[480px]:w-[100%]" : ""
      }`}
    >
      <div className="bg-white  rounded-[36px] px-5 py-7.5 md:px-12 md:py-7.5 text-center w-full">
        {/* {title && (
          <h2
            style={{ color: titlePrimary ? "#00afe3" : "#000" }}
            className={`font-extrabold text-[20px] md:text-[26px] leading-8 ${titleWidth} ${
              headingCenter
                ? "text-center mb-7 mx-auto"
                : "text-left mb-[15px] mr-auto"
            } max-[768px]:text-xl max-[768px]:mb-[14px]`}
          >
            {title}
          </h2>
        )} */}
        { title || subtitle || progressPercentage ?<div className="mb-7.5 md:mb-10">
          {title && (
            <div
              className={`${subtitle ? "mb-[15px]" : "mb-7.5 md:mb-10"}
           `}
            >
              <h4
                className={`text-left font-Inter font-black tracking-[-0.03em] text-[24px] leading-[25px]
                    md:text-[24px] md:leading-[25px] lg:text-[30px] lg:leading-[30px]`}
              >
                {title}
              </h4>
            </div>
          )}

          {subtitle && (
            <p
              style={{
                textAlign: headingCenter ? "left" : "left",
              }}
              className={`mb-7.5 md:mb-10 font-normal text-base leading-[22px] text-center max-[768px]:text-[15px] max-[768px]:mb-8 max-[480px]:text-sm max-[480px]:mb-7`}
            >
              {subtitle}
            </p>
          )}
          <div>
            {progressPercentage ? (
              <div className="mb-7.5 md:mb-10">
                <NewBuyerRequestProgressBarQuotesRequest
                  value={progressPercentage}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div> :""}

        {children}

        {showButton && (
          <div className="flex gap-3 items-center mt-10 max-[768px]:mt-8 max-[768px]:gap-[10px] max-[480px]:mt-7 max-[480px]:gap-2">
            {showBackButton && (
              <button
              disabled={disabledBack}
                onClick={onBackClick}
                className={`
                    disabled:bg-[#DBDFE4]
                    disabled:cursor-none
                    w-[80px] h-[50px]
                    bg-[#7DD6F1] text-white
                    rounded-full cursor-pointer
                    hover:bg-[#0096C4]
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
                <span className="text-[14px] font-medium">Back</span>
              </button>
            )}
            {/* <button
              className="flex-1 h-[50px] bg-[#008cc0] text-white border-none rounded-lg text-xl font-semibold cursor-pointer shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#008cc0] active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center max-[768px]:h-[52px] max-[768px]:text-[17px] max-[480px]:h-12 max-[480px]:text-base"
              onClick={onButtonClick}
              disabled={disableNextButton}
            >
              {loader ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                buttonText
              )}
            </button> */}
            <button
              onClick={onButtonClick}
              disabled={disableNextButton}
              className={`
                flex justify-center items-center
                    flex-1 h-[50px]
                    bg-[#00AFE3] text-white
                    rounded-full hover:bg-[#0096C4]
                    font-bold
                    transition-colors duration-300
                    cursor-pointer
                    disabled:opacity-70
                    active:translate-y-[1px]
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
              {" "}
              {loader ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                buttonText
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewMultiPPCCardLayoutWrapper;
