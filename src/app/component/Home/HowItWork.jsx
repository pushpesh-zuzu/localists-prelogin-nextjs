import HowItWorksCard from "../common/HowItWorkCard";
import Button from "../UI/Typography/Button";
import H2 from "../UI/Typography/H2";

function HowItWork() {
  return (
    <section className="bg-[#F7F7F7] h-auto px-2.5 py-10 sm:px-10 xl:px-[120px] xl:py-12">
      {/* <h2 className="font-bold pb-5 md:pb-14 text-2xl md:text-[40px] lg:text-[75px] text-[#00afe3]">
        How It <span className="text-black">Works</span>.{" "}
      </h2> */}
      <H2 className="text-[#00afe3] pb-12">
        How It <span className="text-black">Works.</span>{" "}
      </H2>
      <div className="flex flex-col md:flex-row justify-items-start  gap-[50px]">
        <HowItWorksCard
          iconSrc={"/icons/Howitworks1.svg"}
          title="Search"
          description="Fill in your details for your project"
                    mw={'xs:w-full lg:w-[250px] xl:w-[310px]'}

        />

        <HowItWorksCard
          iconSrc={"/icons/Howitworks2.svg"}
          title="Connect"
          description="Receive quotes from Professionals"
          mw={'xs:w-full lg:w-[250x] xl:w-[275px]'}
        />

        <HowItWorksCard
          iconSrc={"/icons/Howitworks3.svg"}
          title="Hire"
          description="Compare your quotes and enjoy great savings"
          mw={'xs:w-full'}

        />
      </div>
      <div className="flex justify-center">
        <Button className="rounded-[94px] bg-[#10C87B] text-white  mt-12 py-2 px-4">
          Get Started
        </Button>
      </div>
    </section>
  );
}

export default HowItWork;
