import React, { useEffect } from "react";
import H3 from "../UI/Typography/H3";
import Paragraph2 from "../UI/Typography/Paragraph2";

const leadData = [
    { label: "What is your gender?", value: "Female" },
    { label: "What is your age?", value: "60 or older" },
    {
        label: "Do you have a preference for the gender of the trainer?",
        value: "It doesn't matter",
    },
    {
        label: "How frequently do you want your sessions?",
        value: "I'm not sure yet",
    },
    {
        label: "How would you describe your current exercise regime?",
        value: "I am unable due to my knees",
    },
    { label: "What are your goals?", value: "Get my body strength up again" },
    { label: "Which location(s) would you consider?", value: "Home" },
    { label: "Do you have any day preference(s)?", value: "Any day" },
    {
        label: "Do you have any time preference(s)?",
        value: "Morning (9am-noon), Early afternoon (noon-3pm)",
    },
];

const LeadInfoModal = ({ visible, onClose }) => {
    useEffect(() => {
        if (visible) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => document.body.classList.remove("overflow-hidden");
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40
        transition-opacity duration-300 ease-out">
            <div
                className="
          bg-white w-[90%] max-w-[600px]
          rounded-[10px]
          p-[30px]
          max-h-[90vh] overflow-y-auto
          shadow-[0px_4px_20px_rgba(0,0,0,0.2)]
          relative transform transition-all duration-300 ease-out
        scale-100 opacity-100 translate-y-0
        "
            >
                <div className="flex items-center justify-between border-b border-[#eee]
                 pb-[30px] mb-[20px] max-[480px]:pb-[20px]">
                    <h3 className="font-Inter font-black
        tracking-[-0.03em]
        text-[16px] leading-[18px]
        md:text-[18px] md:leading-[16px]
        lg:text-[25px] lg:leading-[20px] xl:text-[30px] xl:leading-[30px]">
                        An example lead on Localists for a Personal Trainer
                    </h3>

                    <button
                        onClick={onClose}
                        className="text-[24px] text-[#666] cursor-pointer"
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>

                <div className="flex flex-col gap-[16px]">
                    {leadData.map((item, index) => (
                        <div
                            key={index}
                            className="
                px-[10px] py-[10px]
                bg-[#C8C8C820]
                border-b border-[#f0f0f0]
                rounded-[5px]
              "
                        >
                            <p className="text-[#999] font-[Arial]
        tracking-[-0.03em]
        leading-[20px]
        text-[16px]       
        max-[768px]:text-[14px]
        max-[480px]:text-[12px] mb-1">
                                {item.label}
                            </p>
                            <p className="text-[#253238]
                            tracking-[-0.03em]
        leading-[19px] font-[Arial]
        text-[16px]       
        max-[768px]:text-[14px]
        max-[480px]:text-[12px] font-bold">
                                {item.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LeadInfoModal;
