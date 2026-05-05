import React from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import H3 from "../../UI/Typography/H3";
import Paragraph from "../../UI/Typography/Paragraph";
import Image from "next/image";

function HowItWorksleadBuyer({
  stepOneImage = "/mainLeadBuyer/howWeWork/laptop.webp",
  stepTwoImage = "/mainLeadBuyer/howWeWork/services.webp",
  stepThreeImage = "/mainLeadBuyer/howWeWork/mobile1.webp",
}) {
  return (
    <WrapperBGWidth>
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px] py-12 md:py-15 xl:py-[72px]">
        {/* Section heading */}
        <HeadingWrapperMainLeadBuyer
          headdingblue="How It"
          headingblack="works"
        />

        <div className="mt-10 flex flex-col gap-12 xl:gap-16">
          {/* Step 1 — image left, text right */}
          <div className="flex flex-col md:flex-row items-center gap-7.5  md:gap-14 lg:gap-[121px]">
            <div className="flex-1 w-full rounded-2xl overflow-hidden max-w-[453px]">
              <Image
                src={stepOneImage}
                height={320}
                width={453}
                alt="Customers come to us with their need"
                className="w-full h-64 lg:h-[320px] lg:w-[453px] object-cover rounded-2xl"
              />
            </div>
            <div className="flex-1 w-full">
              <H3 className="text-[#253238]">
                Customers come to us with their need
              </H3>
              <Paragraph
                bold="font-normal"
                variant="primarySmall"
                className="mt-3 text-[#253238]"
              >
                Customers will come onto our platform to explain what kind of
                work they require, answering between 5 and 15 questions about
                the job to give you as much detail about it as possible.
              </Paragraph>
            </div>
          </div>

          {/* Step 2 — text left, image right */}
          <div className="flex flex-col-reverse md:flex-row items-center gap-7.5 md:gap-8 lg:gap-14">
            <div className="flex-1 w-full">
              <H3 className="text-[#253238]">We match them with you</H3>
              <Paragraph
                bold="font-normal"
                variant="primarySmall"
                className="mt-3 text-[#253238]"
              >
                We'll match them with local professionals who meet their needs,
                giving them the option to request you personally.
              </Paragraph>
            </div>
            <div className="relative flex-1 h-[178px] md:h-64 lg:h-[370px] w-full min-h-[178px] rounded-2xl overflow-hidden">
              <Image
                fill
                src={stepTwoImage}
                alt="We match them with you"
                className="object-contain rounded-2xl"
              />
            </div>
          </div>

          {/* Step 3 — image left, text right */}
          <div className="flex flex-col md:flex-row items-center gap-7.5 md:gap-14 lg:gap-[131px]">
            <div className="flex-1 w-full rounded-2xl overflow-hidden max-w-[453px]">
              <Image
                src={stepThreeImage}
                height={320}
                width={453}
                alt="Customers come to us with their need"
                className="w-full h-64 lg:h-[320px] lg:w-[453px] object-cover rounded-2xl"
              />
            </div>
            <div className="flex-1 w-full">
              <H3 className="text-[#253238]">You purchase the lead</H3>
              <Paragraph
                bold="font-normal"
                variant="primarySmall"
                className="mt-3 text-[#253238]"
              >
                If the user hasn't selected anyone for a callback and just wants
                quotes from anyone, the lead will go live on our database for
                you to purchase, and we'll give you the full job details
                including 
              </Paragraph>
            </div>
          </div>
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default HowItWorksleadBuyer;
