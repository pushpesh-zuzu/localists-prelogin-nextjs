import { Loader2 } from "lucide-react";
import ProgressBarLandingPage from "../../common/MultiStepFormPPC/ProgressBarLandingPage";

const CardLayoutWrapperNearme = ({
  children,
  title = "",
  subtitle = "",
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
  showProgressBar = false,
  value = 0,
  buyerStep = 1,
  className1 = "",
  fixedHeight = false,
  scrollRef,
  isQuestionWithImage = false,
  question1=''
}) => {
  return (
    <div
      ref={scrollRef}
      className={`flex justify-center items-center ${className1 ? "" : ""} bg-white rounded-[10px] w-full ${NameEmailContainer ? "max-w-[92%] m-auto h-fit " : ""
        } max-[480px]:items-start ${NameEmailContainer ? "min-[480px]:w-[82%]" : ""
        }`}
    >
      <div
        className={`bg-white ${className1 ? className1 : "p-5"} rounded-xl  text-center w-full ${fixedHeight ? "flex flex-col h-[560px] md:h-[580px]" : ""
          }`}
      >
        {showProgressBar && (
          <div className={`mt-8 mb-8 md:mt-8 md:mb-8 pr-1 md:pr-4 ${fixedHeight ? "flex-shrink-0" : ""}`}>
            <ProgressBarLandingPage value={value} buyerStep={buyerStep} />
          </div>
        )}

        {title && (
          <h2
            style={{ color: titlePrimary ? "#00afe3" : "#000" }}
            className={`font-extrabold text-[20px] leading-7 md:text-[26px] md:leading-8 max-w-[530px] ${fixedHeight ? "flex-shrink-0" : ""
              } ${headingCenter
                ? "text-center mb-7 mx-auto"
                : "text-left mb-[15px] mr-auto"
              } max-[768px]:text-xl max-[768px]:mb-[14px]`}
          >
            {title}
          </h2>
        )}

        {subtitle && (
          <p
            style={{
              textAlign: headingCenter ? "center" : "left",
              marginBottom: "20px",
            }}
            className={`font-normal text-base leading-[22px] text-center max-[768px]:text-[15px] max-[768px]:mb-8 max-[480px]:text-sm max-[480px]:mb-7 ${fixedHeight ? "flex-shrink-0" : ""
              }`}
          >
            {subtitle}
          </p>
        )}

        {question1 && <h2
          style={{
            textAlign: isQuestionWithImage ? "center" : "left",
            maxWidth: "88%",
            marginLeft: isQuestionWithImage ? "auto" : "",
            marginRight: isQuestionWithImage ? "auto" : "",
            marginBottom: isQuestionWithImage ? "auto" : "",
            marginBottom: "15px",
          }}
          className="font-extrabold text-[20px] leading-7 md:text-[26px] md:leading-8 mb-[10px] max-w-[544px] "
        >
          {question1}
        </h2>}
        {/* fixedHeight=true → scroll wala div, false → seedha children */}
        {fixedHeight ? (
          <div className="flex-1 overflow-y-auto min-h-0">{children}</div>
        ) : (
          children
        )}

        {showButton && (
          <div className={`flex gap-3 items-center mt-10 max-[768px]:mt-8 max-[768px]:gap-[10px] max-[480px]:mt-7 max-[480px]:gap-2 ${fixedHeight ? "flex-shrink-0" : ""}`}>
            {showBackButton && (
              <button
                className="w-[71px] h-[50px] bg-[#f5f5f5] text-[#333] border-2 border-[#e1e5e9] rounded-lg text-xl font-semibold cursor-pointer transition-all duration-300 flex items-center justify-center hover:bg-[#e9e9e9] hover:border-[#ccc] active:translate-y-[1px] max-[768px]:w-[52px] max-[768px]:h-[52px] max-[768px]:text-lg max-[480px]:w-12 max-[480px]:h-12 max-[480px]:text-base"
                onClick={onBackClick}
              >
                <svg
                  className="h-3 w-1.5"
                  viewBox="0 0 6 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1L1 6L5 11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
            <button
              className="flex-1 h-[50px] bg-[#008cc0] text-white border-none rounded-lg text-xl font-semibold cursor-pointer shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-[#008cc0] active:translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center max-[768px]:h-[52px] max-[768px]:text-[17px] max-[480px]:h-12 max-[480px]:text-base"
              onClick={onButtonClick}
              disabled={disableNextButton}
            >
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

export default CardLayoutWrapperNearme;