"use client";

import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import H2 from "../UI/Typography/H2";
import Paragraph2 from "../UI/Typography/Paragraph2";

const faqData = [
    {
        question: "Do I get the customer’s contact details?",
        answer:
            "Yes, once you unlock a lead, you’ll receive the customer’s phone number and email.",
    },
    {
        question: "Do I pay for sending follow-up messages?",
        answer:
            "No. There is no cost associated with follow-up messages. Once you’ve unlocked the lead, you can contact the customer as much as needed to finalise your project details.",
    },
    {
        question: "How long do my credits last?",
        answer: "Your credits are valid up to 12 months from the date of purchase.",
    },
    {
        question: "Will I be charged extra along the way?",
        answer:
            "At Localists, we value transparency. So you can rest assured there are no commissions or surprise fees along the way. You only pay for the credits you use to unlock potential leads.",
    },
];

const PricingFAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const toggleFAQ = (index) => {
        setOpenIndex(index === openIndex ? null : index);
    };

    return (
        <section className="
      mx-auto bg-[#F9F9F9]
      px-[215px] py-[40px]
      max-[1200px]:px-[100px]
      max-[768px]:px-[40px]
      max-[480px]:px-[20px] max-[480px]:py-[30px]
    ">
            <H2 className="
        text-center mb-[2rem]
        max-[480px]:mb-[10px]
      ">
                Frequently asked{" "}
                <H2 className="inline text-[#00AFE3]">questions</H2>
            </H2>

            <div>
                {faqData.map((item, index) => (
                    <div
                        key={index}
                        className="border-b border-black px-[12px] py-[16px]"
                    >
                        <div
                            onClick={() => toggleFAQ(index)}
                            className={`
                flex items-center justify-between cursor-pointer
                font-Inter font-black
        tracking-[-0.03em]
        leading-[25px]
        text-[25px]
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]
                ${openIndex === index ? "text-[#00AFE3]" : "text-[#253238]"}
              `}
                        >
                            <h4>{item.question}</h4>

                            {openIndex === index ? (
                                <UpOutlined className="ml-[10px] max-[480px]:ml-0 max-[480px]:mt-[8px]" />
                            ) : (
                                <DownOutlined className="ml-[10px] max-[480px]:ml-0 max-[480px]:mt-[8px]" />
                            )}
                        </div>

                        {/* Answer */}
                        {openIndex === index && (
                            <Paragraph2 className="
                mt-[16px] mr-[40px]
                transition-all duration-300
                 max-[768px]:mr-[20px]
                 max-[480px]:mr-0 max-[480px]:mt-[8px]
              ">
                                {item.answer}
                            </Paragraph2>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PricingFAQ;
