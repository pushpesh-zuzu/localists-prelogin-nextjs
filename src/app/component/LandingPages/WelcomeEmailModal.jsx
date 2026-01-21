import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkEmailIdApi } from "@/lib/store/findjobslice";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import LogoIcon from "@/app/component/LandingPages/LogoIcon";
import { ArrowRight } from "lucide-react";
import { getBarkToken } from "@/utils/CookiesHelper";

const WelcomeEmailModal = ({
    onClose,
    nextStep,
    setShowConfirmModal,
    resetTrigger,
    welcomModalTitle = "",
    welcomModalButtonText = "",
}) => {
    const dispatch = useDispatch();
    const userToken = getBarkToken()
    const { registerLoader } = useSelector((state) => state.findJobs);

    const { buyerRequest } = useSelector((state) => state.buyer);

    const [email, setEmail] = useState(buyerRequest?.email || "");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [errors, setErrors] = useState({ email: false });

    useEffect(() => {
        if (buyerRequest?.email) {
            setEmail(buyerRequest.email);
        }
    }, [buyerRequest?.email]);

    const handleCloseClick = () => {
        if (!userToken?.remember_tokens) {
            dispatch(setbuyerRequestData({ email }));
            setShowConfirmModal(true);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        if (resetTrigger) {
            setEmail("");
            setErrors({ email: false });
            setEmailErrorMessage("");
        }
    }, [resetTrigger]);

    return (
        <div
            className="
        relative
        flex items-center justify-center
        w-[629px] max-w-[629px]
        max-[768px]:w-full
      "
        >
            <div
                className="
          relative
          bg-white
          w-full
          text-center
          rounded-[10px]
          shadow-[0_0_10px_0_rgba(0,0,0,0.06)]
          px-[4px] py-[38px]
          max-[768px]:w-[450px]
          max-[480px]:w-[95%]
          max-[480px]:py-[32px]
        "
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={handleCloseClick}
                    disabled={registerLoader}
                    className="
            absolute top-1 right-[10px]
            text-[24px]
            font-[Arial]
            tracking-[-0.03em]
            leading-[24px]
            text-[#253238]
            cursor-pointer
            max-[1024px]:top-[5px] max-[1024px]:right-[10px]
          "
                >
                    &times;
                </button>

                {/* Logo */}
                <div className="flex justify-center pt-[6px] pb-[35px]">
                    <LogoIcon className="h-[48px] w-[211px]" />
                </div>

                {/* Desktop text */}
                <div
                    className="
            text-[#253238]
            font-[Arial]
            font-bold
        text-[20px]       
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]
            leading-[30px]
            tracking-[0.26px]
            pb-[28px]
            max-[540px]:hidden
          "
                >
                    <p>Answer A Few Quick Questions & We’ll Match You</p>
                    <p>With The Best Local {welcomModalTitle}</p>
                    <p>For Your Needs</p>
                </div>

                {/* Mobile text */}
                <div
                    className="
            hidden
                font-[Arial]
                    text-[20px] font-bold
            leading-[30px]
            tracking-[0.26px]
            text-[#253238]
            pb-[28px]
            max-[540px]:block
            px-[10px]
          "
                >
                    <p>
                        Answer A Few Quick Questions & We’ll Match You With The Best Local{" "}
                        {welcomModalTitle} For Your Needs
                    </p>
                </div>

                {/* Button */}
                <div className="flex justify-center">
                    <button
                        onClick={nextStep}
                        className="
              flex items-center justify-center gap-[11px]
              bg-[rgba(255,116,31,1)]
              hover:bg-[rgba(255,100,20,1)]
              text-white
              font-bold
              text-[18px]
              px-[16px] py-[6.9px]
              rounded-[10px]
              shadow-[0_0_2px_0.5px_rgba(0,0,0,0.1)]
              cursor-pointer
              max-[480px]:text-[14px]
              max-[480px]:gap-[4px]
              max-[320px]:px-[4px]
              font-[Arial]
                tracking-[-0.03em]
                leading-[24px]

            "
                    >
                        Find {welcomModalButtonText}
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomeEmailModal;
