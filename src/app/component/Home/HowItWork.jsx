import HowItWorksCard from "../common/HowItWorkCard";
import HowItWorkCompareIcon from "../common/icons/HomePageIcons/HowItWorkCompareIcon";
import HowItWorkIconPencingIcon from "../common/icons/HomePageIcons/HowItWorkIconPencingIcon";
import HowItWorkUserIcon from "../common/icons/HomePageIcons/HowItWorkUserIcon";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import Button from "../UI/Typography/Button";
import H2 from "../UI/Typography/H2";

function HowItWork() {
  return (
    <WrapperBGWidth background={"#F7F7F7"}>
      <section className="bg-[#F7F7F7] h-auto px-2.5 py-12 sm:px-10 md:px-16 md:py-10 xl:px-[145px] xl:py-12">
        <H2 className="text-[#00afe3] pb-10 md:pb-6 xl:pb-12">
          How It <span className="text-[#253238]">Works.</span>{" "}
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
        <div className="hidden sm:flex justify-center">
          <Button className="rounded-[94px]  bg-[#10C87B] text-white mt-6 px-8 lg:mt-12 md:py-1.5 md:px-4.5 lg:py-2 lg:px-8 ">
            Get Started
          </Button>
        </div>
      </section>
    </WrapperBGWidth>
  );
}

export default HowItWork;
