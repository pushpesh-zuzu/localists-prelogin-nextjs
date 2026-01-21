import React from "react";
import MatchesCheckIcon from "@/app/component/LandingPages/MatchesCheckIcon";
import H2 from "../UI/Typography/H2";

const NumberVerifiedModal = ({ open, onClose, nextStep, previousStep }) => {
    if (!open) return null;

    const handleSubmit = () => {
        nextStep();
    };

    return (
        <div
            className="
        fixed inset-0 z-[1000]
        flex items-center justify-center
        bg-black/50
      "
        >
            <div
                className="
          bg-white w-full max-w-[500px]
          shadow-[0_0_20px_rgba(0,0,0,0.2)]
          relative
          max-[480px]:mx-[10px]
          max-[480px]:px-[20px]
        "
            >
                <div className="text-center">
                    <div
                        className="
              bg-[#E3F6FC]
              px-[40px] pt-[58px] pb-[32px]
              max-[768px]:px-[30px] max-[768px]:pt-[40px] max-[768px]:pb-[25px]
              max-[480px]:px-[20px] max-[480px]:pt-[30px] max-[480px]:pb-[20px]
            "
                    >
                        {/* Custom Check Icon */}
                        <div
                            className="
                w-[64px] h-[64px]
                mx-auto
                rounded-full
                bg-[#00afe3]
                flex items-center justify-center
                max-[480px]:w-[50px] max-[480px]:h-[50px]
              "
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                className="
                  w-[32px] h-[32px]
                  stroke-white stroke-[3]
                  max-[480px]:w-[24px] max-[480px]:h-[24px]
                "
                            >
                                <path
                                    d="M5 13l4 4L19 7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <H2
                            className="
                mt-[16px]
             text-[#253238]
            max-[480px]:mt-[12px]
              "
                        >
                            Thank You! Your number has been verified.
                        </H2>
                    </div>

                    {/* ===== BUTTON ===== */}
                    <div
                        className="
              mt-[34px]
              flex justify-center items-center
              px-[31px]
              max-[768px]:px-[20px] max-[768px]:mt-[25px]
              max-[480px]:px-[15px] max-[480px]:mt-[20px]
            "
                    >
                        <button
                            onClick={handleSubmit}
                            className="
                bg-[#00afe3]
                text-white
                px-[29px] py-[8px]
                rounded-[20px]
                flex items-center gap-[10px]
                cursor-pointer
            font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[20px]
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]
              " >
                            <MatchesCheckIcon />
                            View your matches now.
                        </button>
                    </div>

                    <p
                        className="
              mt-[32px]
              text-[#828282]
              text-[10px] font-medium
              leading-[18px]
              text-left font-[Arial]
                tracking-[-0.03em]
              px-[21px] pb-[31px]
              max-[480px]:text-[9px]
              max-[480px]:px-[15px] max-[480px]:pb-[20px]
              max-[480px]:mt-[20px]
            "
                    >
                        Localists may share your information with up to five relevant
                        service providers, who may contact you by phone, text or email to
                        discuss your request. By submitting this form, you agree that
                        professionals can contact you via phone, text or email to offer
                        their services. Your consent to be contacted is not a condition for
                        purchasing or receiving any services. All data will be handled in
                        accordance with our Privacy Policy.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NumberVerifiedModal;
