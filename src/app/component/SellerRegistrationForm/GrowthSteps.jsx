"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LeadInfoModal from "./LeadStaticModal";
import { GrowthStepsData } from "@/app/../constants/severalPanel";
import H2 from "../UI/Typography/H2";
import Button from "../UI/Typography/Button";
import Link from "next/link";

const GrowthSteps = () => {
    const router = useRouter();
    const { lang, country } = useParams();
    const currentLang = lang || "en";
    const currentCountry = country || "gb";
    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (item) => {
        if (item?.path) {
            router.push(`/${currentLang}/${currentCountry}${item.path}`);
            return;
        }

        if (item?.id === 2) {
            setShowModal(true);
        }
    };
    return (
        <>
            <section className="w-full">
                {/* HEADING */}
                <div className="text-center mt-[10px] mb-[10px] px-4">
                    <H2>
                        Your next client is already looking for You
                    </H2>
                </div>

                {/* GRID */}
                <div
                    className="
            grid grid-cols-3 gap-[17px]
            px-[88px] py-[20px]
            max-[1200px]:grid-cols-2
            max-[768px]:grid-cols-1
            max-[980px]:px-[40px]
            max-[520px]:px-[26px]
            max-[460px]:px-[16px]
          "
                >
                    {GrowthStepsData.map((item) => (
                        <div
                            key={item.id}
                            className="
                flex flex-col justify-between
                bg-[#00AFE3]
                text-white
                px-[43px] py-[31px]
                shadow-[0px_4px_6px_rgba(0,0,0,0.1)]
                min-h-[85%] rounded-[15px]
                max-[380px]:px-[14px]
              "
                        >
                            {/* TOP */}
                            <div>
                                <div className="flex items-center gap-[10px] mb-[20px]">
                                    <div className="w-[54px] h-[54px] bg-white rounded-full flex items-center justify-center">
                                        <item.icon
                                            className="w-[54px] h-[54px]"
                                            bgColor="transparent"
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="text-[#1e2325] font-Inter font-black
                                                        tracking-[-0.03em]
                                                        text-[20px] leading-[22px]
                                                        md:text-[18px] md:leading-[22px]
                                                        lg:text-[25px] lg:leading-[20px] xl:text-[29px] xl:leading-[32px]">
                                        {item.title1}
                                        <br />
                                        <h3 className="text-[#1e2325] font-Inter font-black
                                                        tracking-[-0.03em]
                                                        text-[20px] leading-[22px]
                                                        md:text-[18px] md:leading-[22px]
                                                        lg:text-[25px] lg:leading-[20px] xl:text-[29px] xl:leading-[32px] text-white">
                                            {item.title2}
                                        </h3>
                                    </h3>
                                </div>

                                <ul className=" list-disc list-outside
    pl-[20px]
    mb-[15px]

    font-[Arial]
    tracking-[-0.03em]
    text-white

    text-[20px]
    leading-[26px]

    max-[768px]:text-[18px]
    max-[768px]:leading-[24px]

    max-[480px]:text-[16px]
    max-[480px]:leading-[22px]

    max-[380px]:pl-[19px]
    space-y-[10px]">
                                    {item.Description1 && <li>{item.Description1}</li>}
                                    {item.Description2 && <li>{item.Description2}</li>}
                                    {item.Description3 && <li>{item.Description3}</li>}
                                </ul>
                            </div>

                            {/* BUTTON */}
                            {item?.path ? (
                                <Link
                                    href={`/${currentLang}/${currentCountry}${item.path}`}
                                    className="
      font-[Arial]
      tracking-[-0.03em]
      mt-[23.69px]
      block
      bg-[#253238] text-white
      text-[18px] font-bold
      px-[15px] py-[15px]
      rounded-full
      text-center
      leading-[100%]
      hover:bg-[#333]
      max-[460px]:text-[16px]
      max-[460px]:py-[12px]
      max-[460px]:mt-0
    " > {item.button} </Link>
                            ) : (
                                <Button
                                    onClick={() => handleCardClick(item)}
                                    className="
      font-[Arial]
      tracking-[-0.03em]
      mt-[23.69px] cursor-pointer
      bg-[#253238] text-white
      text-[18px] font-bold
      px-[15px] py-[15px]
      rounded-full
      text-center
      leading-[100%]
      hover:bg-[#333]
      max-[460px]:text-[16px]
      max-[460px]:py-[12px]
      max-[460px]:mt-0
    "
                                >
                                    {item.button}
                                </Button>
                            )}

                        </div>
                    ))}
                </div>
            </section>
            <LeadInfoModal visible={showModal} onClose={() => setShowModal(false)} />

        </>
    );
};
export default GrowthSteps;
