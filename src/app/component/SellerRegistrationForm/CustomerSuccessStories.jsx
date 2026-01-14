import Image from "next/image";
import { CustomerSuccessStoriesData } from "@/constants/severalPanel";
import H2 from "../UI/Typography/H2";
import Paragraph2 from "../UI/Typography/Paragraph2";

export default function CustomerSuccessStories() {
    return (
        <section className="text-center max-w-[1200px] mx-auto w-full
      px-[40px] pt-[20px] pb-[50px]
      max-[1020px]:px-0
      max-[680px]:px-[16px]
        max-[680px]:pt-[12px]
        max-[680px]:pb-[30px]

        max-[480px]:pt-[8px]
        max-[480px]:pb-[25px]"
        >
            <H2 className="mb-[14px]" >
                What successful professionals on{" "}
                <span className="font-bold text-[#00AFE3]
        font-Inter
        tracking-[-0.03em]
        text-[30px] leading-[32px]
        md:text-[35px] md:leading-[35px]
        lg:text-[50px] lg:leading-[55px]
        ">
                    Localists
                </span>{" "}
                have to say
            </H2>

            <Paragraph2 className=" mb-[30px]
    max-[680px]:mb-[20px]
    max-[480px]:mb-[15px]"
            >
                See what other small businesses have to say about Localists
            </Paragraph2>

            {/* Cards */}
            <div className="flex flex-col gap-[20px] items-center">
                {CustomerSuccessStoriesData.map((story) => (
                    <div
                        key={story.id}
                        className="flex items-center bg-white
              border-[2px] border-[#f9f9fa]
              shadow-[0px_0px_10.8px_0px_#0000001A]
              rounded-[10px]
              p-[20px]
              w-full max-w-[1026px]
              max-[680px]:flex-col
              max-[680px]:gap-[26px]"
                    >
                        {/* Image */}
                        <Image
                            src={story.image}
                            alt={story.name}
                            width={262}
                            height={150}
                            className="
                object-cover
                mr-[84px]
                max-[1020px]:mr-[40px]
                max-[767px]:mr-[26px] max-[767px]:w-[180px]
                max-[680px]:mr-0 max-[680px]:w-full max-[680px]:h-auto
              " />
                        <div className="text-left w-full">
                            <Paragraph2 className="mb-[10px] relative
                pb-[10px]
                max-[480px]:pb-0"
                            >
                                {story.description}
                                <span
                                    className="
                    block h-[1.15px] bg-[#00AFE3]
                    mt-[22.6px] w-[295px]
                    max-[480px]:w-[235px] max-[480px]:mt-[14.6px]
                  " />
                            </Paragraph2>

                            <Paragraph2 className="!text-[#00AFE3] font-bold">
                                {story.name}
                            </Paragraph2>

                            <p className="font-[Arial]
        tracking-[-0.03em]
        leading-[22px]
        text-[#253238]
        text-[18px]       
        max-[768px]:text-[16px]
        max-[480px]:text-[14px]">
                                {story.company}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
