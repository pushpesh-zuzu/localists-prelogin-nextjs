"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import {
    createRequestData,
    resendOtp,
    verifyPhoneNumberData,
} from "@/lib/store/buyerslice/buyerSlice";

import { showToast } from "@/utils/toaster";
import { formatUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import FormWrapper from "./FormWrapper";
import H3 from "../UI/Typography/H3";
import backIcon from "../../../../public/icons/backIcon.svg";

const OTPVerificationNewPPC = ({
    isThankuPageOnlyShow = false,
    setReEnterMobile,
}) => {
    const dispatch = useDispatch();
    const router = useRouter();
    const pathname = usePathname();

    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60);

    const inputRefs = useRef([]);

    const {
        buyerRequest,
        citySerach,
        requestId,
        requestUserId,
        requestUserPhone,
        requestLoader,
        resendOtpLoader,
        verifyPhoneNumberLoader,
    } = useSelector((state) => state.buyer);

    const lastSegment = pathname.split("/").pop();

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((t) => t - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);


    const handleChange = (index, value) => {
        if (!/^\d?$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").slice(0, 4).split("");
        const newOtp = ["", "", "", ""];

        data.forEach((d, i) => {
            newOtp[i] = d;
        });

        setOtp(newOtp);
        inputRefs.current[Math.min(data.length, 3)]?.focus();
    };


    const handleSubmit = () => {
        const enteredOtp = otp.join("");

        if (enteredOtp.length < 4) {
            showToast("error", "Please enter a valid 4-digit OTP.");
            return;
        }

        dispatch(
            verifyPhoneNumberData({
                user_id: requestUserId,
                otp: enteredOtp,
                request_id: requestId,
            })
        ).then((res) => {
            if (!res?.success) {
                showToast("error", res?.message || "OTP verification failed");
                return;
            }

            showToast("success", res.message);

            const formData = new FormData();
            formData.append("service_id", buyerRequest.service_id || "");
            formData.append("postcode", buyerRequest.postcode || "");
            formData.append("city", citySerach || "");
            formData.append("phone", buyerRequest.phone || "");
            formData.append("questions", JSON.stringify(buyerRequest.questions || []));
            formData.append("form_status", 1);
            formData.append("request_id", requestId);
            formData.append("user_id", requestUserId);

            dispatch(createRequestData(formData)).then((r) => {
                if (isThankuPageOnlyShow) {
                    localStorage.setItem(
                        "pendingBuyerModal",
                        JSON.stringify({
                            shouldOpen: true,
                            step: 7,
                            buyerRequest,
                            city: citySerach,
                            serviceId: buyerRequest.service_id,
                            baseRedirectPath: lastSegment,
                        })
                    );
                    router.push("/thank-you");
                }
            });
        });
    };

    const handleResendOtp = () => {
        dispatch(
            resendOtp({
                user_id: requestUserId,
                phone: requestUserPhone,
            })
        ).then((res) => {
            if (res?.success) {
                showToast("success", res.message || "OTP resent");
                setOtp(["", "", "", ""]);
                setTimer(60);
                inputRefs.current[0]?.focus();
            } else {
                showToast("error", res?.message || "Failed to resend OTP");
            }
        });
    };

    return (
        <FormWrapper>
            <div className="px-[31px] py-[35px] max-md:px-[24px] max-sm:px-[16px] text-center">
                <H3 className="text-[#00afe3] font-black mb-[20px]">
                    OTP Verification
                </H3>

                <p className="text-[#828282] font-[Arial]
        tracking-[-0.03em] font-medium text-[16px] leading-[24px] mb-[23px] max-sm:mt-[-10px] max-sm:text-[12px]">
                    Enter the OTP sent to{" "}
                    <span className="text-[#253238] font-medium">
                        {formatUKPhoneNumber(requestUserPhone)}
                    </span>
                </p>

                <p className="bg-[#f5f5f5] font-[Arial] leading-[24px]
        tracking-[-0.03em] text-[#253238] font-bold px-[7px] py-[6px] max-sm:mt-[-15px] text-[16px] mb-[21px] w-fit mx-auto max-sm:text-[12px]">
                    **Please check the above number is correct**
                </p>

                {/* OTP INPUTS */}
                <div className="flex justify-center gap-[24px] mb-[19px] max-sm:gap-[12px]">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            onPaste={handlePaste}
                            autoFocus={index === 0}
                            className="
                w-[28px] h-[28px]
                 text-center
                border-b border-[#bcbcbc]
                outline-none
                max-md:w-[40px] max-md:h-[36px]
                max-sm:w-[36px] max-sm:h-[32px]
                font-[Arial]
                tracking-[-0.03em]
                leading-[24px]
                text-[20px]       
                max-[768px]:text-[18px]
                max-[480px]:text-[16px]
              "
                        />
                    ))}
                </div>

                {/* RESEND */}
                <div className="text-[#969696] font-[Arial]
                tracking-[-0.03em] text-[14px] leading-[20px] max-sm:text-[12px]">
                    Didn’t receive the OTP?{" "}
                    {timer > 0 ? (
                        <span className="block mt-[16px]">
                            Resend OTP in <strong>{timer}</strong>s
                        </span>
                    ) : (
                        <button
                            onClick={handleResendOtp}
                            className="text-[#00afe3] font-medium ml-1 font-[Arial]
                tracking-[-0.03em] cursor-pointer"
                        >
                            {resendOtpLoader ? "Resending..." : "Resend OTP"}
                        </button>
                    )}
                </div>

                {/* VERIFY BUTTON */}
                <button
                    onClick={handleSubmit}
                    disabled={requestLoader || verifyPhoneNumberLoader}
                    className="
            mt-[18px] w-[200px]
            bg-[#00afe3] hover:bg-[#0096c4]
            text-white font-semibold
            py-[8px] rounded-[20px]
            disabled:opacity-60
            max-sm:w-[70%]
            font-[Arial] cursor-pointer
            tracking-[-0.03em]
          "
                >
                    Verify
                </button>

                {/* GO BACK */}
                <p className="mt-[26px] text-[#969696] font-[Arial]
        tracking-[-0.03em] leading-[20px] text-[14px] max-sm:text-[12px] max-sm:mt-[10px]">
                    Want to update your above number?
                </p>

                <div
                    onClick={() => setReEnterMobile(1)}
                    className="relative w-fit mx-auto cursor-pointer mb-[16px]"
                >
                    <span className="text-[#00afe3] font-[Arial]
        tracking-[-0.03em] leading-[20px] text-[14px] max-sm:text-[12px]">
                        Go Back
                    </span>
                    <Image
                        src={backIcon}
                        alt="back"
                        className="absolute right-[-20px] top-1/2 -translate-y-1/2 max-sm:w-[10px]"
                    />
                </div>

                {/* FOOTER NOTE */}
                <div className="bg-[#f5f5f5] px-[6px] py-[5px] rounded-[3px]">
                    <p className="text-[#253238] font-[Arial]
                 tracking-[-0.03em] leading-[20px] text-[16px] max-sm:text-[12px] font-semibold">
                        WE CAN ONLY SEND A PASSCODE TO A MOBILE NUMBER NOT TO A LANDLINE.
                    </p>
                </div>

                <p className="mt-[16px] font-[Arial]
                 tracking-[-0.03em] leading-[20px] text-[#a3a3a3] text-[16px] max-sm:text-[12px]">
                    We cannot verify your account without a mobile number
                </p>
            </div>
        </FormWrapper>
    );
};

export default OTPVerificationNewPPC;
