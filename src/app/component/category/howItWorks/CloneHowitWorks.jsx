import { handleScrollToBottom } from "@/utils/scroll";
import Image from "next/image";
import H2 from "../../UI/Typography/H2";
import H3 from "../../UI/Typography/H3";
import Paragraph1 from "../../UI/Typography/Paragraph1";
import Button from "../../UI/Typography/Button";


const CloneHowitWorks = ({ ctaText, howItWorksData }) => {
  return (
    <div
      className="
        text-center flex flex-col items-center justify-center
        gap-[40px]
        bg-[#00afe3]
        py-[30px] px-[5%]
        max-[920px]:gap-[30px]
        max-[667px]:gap-[70px]
        max-[480px]:px-[20px] max-[480px]:py-[26px]
      "
    >
      <H2
        className="text-white text-center">
        How
        <span className="text-black"> Localists </span>
        Works
      </H2>

      <div
        className="
          flex gap-[20px]
          mt-[58px] mx-auto
          max-[920px]:mt-[52px]
          max-[768px]:mt-[45px]
          max-[667px]:flex-col max-[667px]:items-center
          max-[667px]:m-0 max-[667px]:gap-[70px]
        "
      >
        {howItWorksData.map((item, index) => (
          <div
            key={index}
            className="
              w-full
              relative
              bg-white text-left
              px-[28px] pb-[28px]
              shadow-[0_4px_10px_rgba(0,0,0,0.2)]
              max-[920px]:px-[20px] max-[920px]:pb-[20px]
              max-[667px]:w-[90%]
              max-[667px]:flex max-[667px]:flex-col max-[667px]:items-center
            "
          >
            
            <div
              className="
                flex items-center justify-center
                w-[132px] h-[132px]
                rounded-full bg-black
                mx-auto mb-[22px]
                mt-[-58px]
                max-[920px]:mt-[-52px]
                max-[768px]:w-[102px] max-[768px]:h-[102px]
                max-[667px]:w-[100px] max-[667px]:h-[100px]
                max-[667px]:mt-[-50px] max-[667px]:mb-[20px]
              "
            >
              <Image
                src={item.image}
                alt={item.title}
                width={78}
                height={78}
                className="
                  max-[768px]:w-[48px] max-[768px]:h-[48px]
                "
              />
            </div>

            <div>
              <H3
                className="text-black mb-[20px] text-left"
              >
                {item.heading1}
                <span className="text-[#00afe3]">
                  {" "}
                  {item.heading2}
                </span>
                <span> {item?.heading3}</span>

                <br className="block max-[667px]:hidden" />
                {item?.break && (
                  <br className="block max-[667px]:hidden" />
                )}
                {
                  item.break && (
                    <br className="hidden lg:block" />
                  )
                }

              </H3>
              <Paragraph1
                className="text-black"
              >
                {item.description}
              </Paragraph1>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button onClick={handleScrollToBottom} className="bg-[#253238] px-4.5 py-1 md:px-9 md:py-2 xl:py-3.5 xl:px-[66px] cursor-pointer text-white rounded-full">
          Get Quotes From {ctaText} Near You
        </Button>
      </div>
    </div>
  )
}

export default CloneHowitWorks;