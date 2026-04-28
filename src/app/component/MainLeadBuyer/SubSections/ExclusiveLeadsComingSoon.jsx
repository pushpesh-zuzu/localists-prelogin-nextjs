import React from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import Paragraph from "../../UI/Typography/Paragraph";
import Button from "../../UI/Typography/Button";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

/**
 * Props:
 *  backgroundImage - dark background/workshop image
 *  onGetStarted    - handler for "Get Started Now" CTA
 */
function ExclusiveLeadsComingSoon({
  backgroundImage = "/mainLeadBuyer/exclusiveLead/exlusiveLead.webp",
}) {
  return (
    <WrapperBGWidth className="">
      <div className="px-0 md:px-16 xl:px-[120px] ">
        <div
          className="relative w-full md:rounded-[48px] overflow-hidden md:min-h-[418px] flex items-center justify-center "
          style={{
            backgroundImage: backgroundImage
              ? `url(${backgroundImage})`
              : "none",
            // backgroundColor: backgroundImage ? "transparent" : "#1a2a35",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="relative z-10 flex flex-col items-center text-center px-6 py-12 mx-auto">
            <NearmeH2Heading
              headdingblue={`Exclusive Leads - Coming Soon!`}
              className="mb-7.5 md:mb-12"
            />
            <Paragraph
              variant="primarySmall"
              className=" text-white max-w-[98%] md:max-w-[83%]"
            >
              You'll be able to purchase leads exclusive to you. That means no
              competition and a higher chance of winning business. Sound good?
              Create your own free account below and we'll let you know when you
              can buy exclusive leads.
            </Paragraph>
            <div className="mt-8 md:mt-12">
              <Button
                variant="primary"
                onClick={() => {
                  handleScrollToBottom();
                }}
                className="cursor-pointer min-w-[171px] md:min-w-[189px] rounded-full bg-[#10C87B] hover:bg-[#00aef3] text-white px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!"
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default ExclusiveLeadsComingSoon;
