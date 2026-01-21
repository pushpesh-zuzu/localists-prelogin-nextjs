import H3 from "../UI/Typography/H3";
import LandingHowItWorkSteps from "./LandingHowItWorkSteps";
import { handleScrollToBottom } from "@/utils/scroll";

const LandingHowItWork = ({ WORK_STEPS }) => {
  return (
    <section
      className="
        bg-[#00afe3]
        flex flex-col items-center justify-center
        gap-[36px]
        px-[8%] py-[40px]

        max-[1100px]:px-[5%]
        max-[920px]:px-[9%] max-[920px]:gap-[24px]
        max-[768px]:px-[8%]
        max-[468px]:px-[5%] max-[468px]:py-[16px]
        max-[390px]:px-[5.9%]
        max-[360px]:px-[8%]
      "
    >
      {/* Header */}
      <H3
        className="
          text-white text-center m-0
          max-[667px]:mb-[-10px] font-medium
        "
      >
        How <span className="text-[#253238] font-bold">We Work</span>
      </H3>

      {/* Description */}
      <p
        className="
          text-white text-[27px] leading-[39.5px]
          font-normal text-center
          mx-auto font-[Arial]
          max-[920px]:text-[1.3rem] max-[920px]:leading-[35px]
          max-[768px]:text-[18px] tracking-[-0.03em]
          max-[667px]:text-[16px] max-[667px]:leading-[28px]
          max-[667px]:mt-[-6px] max-[667px]:mb-[28px]
          max-[468px]:text-[16px]
        "
      >
        Get competitive home improvement quotes from leading suppliers in{" "}
        <span className="font-bold text-[#253238]">
          3 simple steps!
        </span>
      </p>

      {/* Steps */}
      <div
        className="
          flex items-center justify-center
          gap-[100px] w-full mt-[71px]

          max-[1100px]:gap-[50px]
          max-[920px]:gap-[30px] max-[920px]:mb-[20px]
          max-[768px]:mt-[51px]
          max-[667px]:flex-col max-[667px]:gap-[70px] max-[667px]:mt-0
          max-[390px]:gap-[50px]
        "
      >
        {WORK_STEPS?.map((item) => (
          <LandingHowItWorkSteps key={item.id} step={item} />
        ))}
      </div>

      {/* Footer Button */}
      <div>
        <button
          onClick={handleScrollToBottom}
          className="
            bg-[#253238] text-white
            font-[Arial]
            tracking-[-0.03em]
            px-[39px] py-[13px]
            text-[28px] font-bold
            rounded-[20px]
            cursor-pointer
            hover:bg-black/80
            max-[768px]:px-[21px] max-[768px]:py-[10px]
            max-[768px]:text-[12.14px]
            max-[667px]:px-[12px] max-[667px]:py-[5.5px]
            max-[667px]:text-[12px] max-[667px]:leading-[18px]
          "
        >
          Get a Free Quote
        </button>
      </div>
    </section>
  );
};

export default LandingHowItWork;
