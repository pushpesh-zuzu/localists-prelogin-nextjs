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
      <section className="bg-[#F7F7F7] h-auto px-2.5 py-12 sm:px-10 xl:px-[145px] xl:py-12">
        <H2 className="text-[#00afe3] pb-10 xl:pb-12">
          How It <span className="text-black">Works.</span>{" "}
        </H2>
        <div className="flex flex-col md:flex-row justify-items-start gap-5  xl:gap-[50px]">
          <HowItWorksCard
            iconSrc={<HowItWorkIconPencingIcon className="h-20 xl:h-24 " />}
            title="Search"
            description="Fill in your details for your project"
            mw={"xs:w-full lg:w-[250px] xl:w-[310px]"}
          />

          <HowItWorksCard
            iconSrc={<HowItWorkUserIcon className="h-20  xl:h-24" />}
            title="Connect"
            description="Receive quotes from Professionals"
            mw={"xs:w-full lg:w-[250x] xl:w-[275px]"}
          />

          <HowItWorksCard
            iconSrc={
              <HowItWorkCompareIcon className="h-20  xl:h-24 " />
            }
            title="Hire"
            description="Compare your quotes and enjoy great savings"
            mw={"xs:w-full"}
          />
        </div>
        <div className="hidden sm:flex justify-center">
          <Button className="rounded-[94px] bg-[#10C87B] text-white  mt-12 py-2 px-4">
            Get Started
          </Button>
        </div>
      </section>
    </WrapperBGWidth>
  );
}

export default HowItWork;
