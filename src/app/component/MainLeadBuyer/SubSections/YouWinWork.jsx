import React from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import Paragraph from "../../UI/Typography/Paragraph";
import Button from "../../UI/Typography/Button";
// import WrapperBGWidth from "../components/WrapperBGWidth";
// import Paragraph from "../UI/Typography/Paragraph";
// import Button from "../UI/Button";

/**
 * Props:
 *  backgroundImage  - collage / banner image
 *  onCreateProfile  - handler for "Create Free Profile" CTA
 *  onCallNow        - handler for "Call Now" CTA
 */
function YouWinWork({
  backgroundImage = "/mainLeadBuyer/youWin.webp",
  onCreateProfile,
  onCallNow,
}) {
  return (
    <WrapperBGWidth>
      <div className="px-0 md:px-16 xl:px-[120px]">
        <div
          className="relative pt-[71px] pb-12 md:pt-0 md:pb-0 md:py-0 w-full md:rounded-2xl overflow-hidden md:min-h-[350px] lg:min-h-[489px] flex items-center justify-center"
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            backgroundColor: backgroundImage ? "transparent" : "#253238",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center text-center md:mt-11 xl:mt-24 mx-auto">
            <h2 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5 lg:mb-8 xl:mb-12">
              You win the work
            </h2>

            <Paragraph
              bold="font-thin"
              className="text-white max-w-[90%] md:max-w-[65%] tracking-[0]!"
            >
              You win the work, and take your business to the next level. Sound
              good to you? Click below to create your free profile — or why not
              speak to an advisor by calling.
            </Paragraph>

            <div className="flex flex-wrap items-center justify-center gap-4 mt-8 md:mt-12">
              <Button
                variant="primary"
                onClick={onCreateProfile}
                className="cursor-pointer rounded-full min-w-[148px] md:min-w-[200px] bg-[#10C87B] hover:bg-[#00aef3] text-white px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
              >
                Create Free Profile
              </Button>

              <Button
                variant="primary"
                onClick={onCallNow}
                className="cursor-pointer min-w-[148px] md:min-w-[200px] rounded-full bg-[#00AFE3] hover:bg-[#0099cc] text-white px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
              >
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default YouWinWork;
