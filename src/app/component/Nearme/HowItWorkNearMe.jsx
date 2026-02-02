'use client'
import { handleScrollToBottom } from "@/utils/scroll";
import HowItWorksCard from "../common/HowItWorkCard";
import HowItWorkCompareIcon from "../common/icons/HomePageIcons/HowItWorkCompareIcon";
import HowItWorkIconPencingIcon from "../common/icons/HomePageIcons/HowItWorkIconPencingIcon";
import HowItWorkUserIcon from "../common/icons/HomePageIcons/HowItWorkUserIcon";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import Button from "../UI/Typography/Button";
import H2 from "../UI/Typography/H2";

function HowItWorkNearMe() {
  return (
    <WrapperBGWidth background={"white"}>
      <section className="bg-white h-auto px-[30px] pt-12 pb-[30px] sm:px-10 md:px-16 md:pb-10 md:pt-0 xl:px-[145px] xl:pb-[72px]">
        <H2 className="text-[#00afe3] pb-[30px] md:pb-[35px] xl:pb-[47.89px]">
          How it <span className="text-[#253238]">Works.</span>{" "}
        </H2>
        <div className="flex flex-col md:flex-row justify-items-start gap-5 xl:gap-[50px]">
          <HowItWorksCard
            iconSrc={
              <HowItWorkIconPencingIcon className="h-15 w-15 md:h-13 md:w-20 lg:h-24 lg:w-[120px]" />
            }
            title="Search"
            description="Fill in your details for your project"
            mw={"xs:w-full md:w-[175px]  lg:w-[250px] xl:w-[310px]"}
          />

          <HowItWorksCard
            iconSrc={
              <HowItWorkUserIcon className="h-15 w-15 md:h-13 md:w-20 lg:h-24 lg:w-[120px]" />
            }
            title="Connect"
            description="Receive quotes from Professionals"
            mw={"xs:w-full md:w-[140px] lg:w-[239px] xl:w-[275px]"}
          />

          <HowItWorksCard
            iconSrc={
              <HowItWorkCompareIcon className="h-15 w-15 md:h-13 md:w-20 lg:h-24 lg:w-[120px] " />
            }
            title="Hire"
            description="Compare your quotes and enjoy great savings"
            mw={"xs:w-full"}
          />
        </div>
        <div className="flex justify-center">
          <Button variant="primary" onClick={() => { handleScrollToBottom() }} className="cursor-pointer rounded-full max-w-fit bg-[#10C87B] hover:bg-[#00aef3] text-white mt-[30px] lg:mt-[47px] px-[15px] py-2 xl:py-[15px] xl:px-7 leading-normal!">
            Get Started
          </Button>
        </div>
      </section>
    </WrapperBGWidth>
  );
}

export default HowItWorkNearMe;
