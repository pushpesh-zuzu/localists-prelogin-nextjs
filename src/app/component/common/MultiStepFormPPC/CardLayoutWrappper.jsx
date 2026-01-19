import { Loader2 } from "lucide-react";

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
}) => {
  return (
    <div
      className={`flex justify-center items-center bg-white rounded-[10px] w-full ${
        NameEmailContainer ? "max-w-[85%] mx-auto h-fit" : ""
      } max-[480px]:items-start ${
        NameEmailContainer ? "max-[480px]:w-[82%]" : ""
      }`}
    >
      <div className="bg-white rounded-xl p-5 text-center w-full">
        {title && (
          <h2
            style={{ color: titlePrimary ? "#00afe3" : "#000" }}
            className={`font-extrabold text-[20px] md:text-[26px] leading-8 max-w-[530px] ${
              headingCenter
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
            className="font-normal text-base leading-[22px] text-center max-[768px]:text-[15px] max-[768px]:mb-8 max-[480px]:text-sm max-[480px]:mb-7"
          >
            {subtitle}
          </p>
        )}

        {children}

        {showButton && (
          <div className="flex gap-3 items-center mt-10 max-[768px]:mt-8 max-[768px]:gap-[10px] max-[480px]:mt-7 max-[480px]:gap-2">
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

export default CardLayoutWrapper;
