"use client";

import { useRouter } from "next/navigation";
import H1 from "../UI/Typography/H1";
import Paragraph2 from "../UI/Typography/Paragraph2";

const PricingSection = () => {
    const router = useRouter();

    const onSubmitPageChange = () => {
        router.push("/en/gb/sellers/create");
    };

    return (
        <section className="w-full text-center mt-[30px]">
            <H1
                className="mb-[25px]">
                Pricing
            </H1>

            <div
                className="mt-5
          bg-[#E3F6FC]
          px-[36px] py-[44px]
          max-w-[900px]
          mx-auto rounded-[20px]
          max-[768px]:px-[24px] max-[768px]:py-[32px]
          max-[480px]:px-[16px] max-[480px]:py-[24px]
        ">
                <Paragraph2
                    className="mb-[20px] text-center">
                    At Localists, there are no surprises. From the moment you sign up,
                    you’ll start receiving{" "}
                    <Paragraph2 className="!text-[#00AFE3] inline font-bold">
                        leads for free
                    </Paragraph2>
                    . You only pay when you choose to contact a customer that feels right
                    for your business.
                </Paragraph2>

                <button
                    onClick={onSubmitPageChange}
                    className="
            bg-[#00AFE3]
            text-white
            font-bold
            text-[18px] leading-[100%]
            px-[31px] py-[11px]
            rounded-full
            hover:bg-[#0096C4]
            transition-colors duration-300
            cursor-pointer
            max-[768px]:text-[16px] max-[768px]:px-[26px] max-[768px]:py-[10px]
            max-[480px]:text-[15px] max-[480px]:px-[22px] max-[480px]:py-[9px]">
                    Join as a Professional
                </button>
            </div>
        </section>
    );
};

export default PricingSection;
