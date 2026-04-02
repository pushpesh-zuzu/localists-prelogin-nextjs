"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import Modal from "../Modal";
import {
  createRequestData,
  resendOtp,
  verifyPhoneNumberData,
} from "@/lib/store/buyerslice/buyerSlice";
import { showToast } from "@/utils/toaster";
import { formatUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import BackButtonOTP from "../../common/icons/Registration/BackButtonOTP";
import Paragraph from "../../UI/Typography/Paragraph";

const OtpVerificationModal = ({
  open,
  nextStep,
  isThankuPageOnlyShow = true,
  setReEnterMobile,
  serviceId,
  progressPercent
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const {
    buyerStep,
    buyerRequest = {},
    citySerach = "",
    requestLoader = false,
    requestId = "",
    requestUserPhone = "",
    resendOtpLoader = false,
    verifyPhoneNumberLoader = false,
    requestUserId = null,
  } = useSelector((state) => state.buyer || {});

  // Get last segment from pathname
  const pathSegments = pathname?.split("/").filter(Boolean) || [];
  const lastSegment = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // if (!open) return null;

  const handleChange = (index, value) => {
    // Only allow digits
    if (!/^\d*$/.test(value)) return;

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
    const pasteData = e.clipboardData.getData("text/plain").slice(0, 4);
    const newOtp = [...otp];

    pasteData.split("").forEach((char, i) => {
      if (i < 4 && /^\d$/.test(char)) {
        newOtp[i] = char;
      }
    });

    setOtp(newOtp);

    const lastFilledIndex = pasteData.length - 1;
    if (lastFilledIndex < 3) {
      inputRefs.current[lastFilledIndex + 1]?.focus();
    } else {
      inputRefs.current[3]?.focus();
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");

    if (enteredOtp.length < 4) {
      showToast("error", "Please enter a valid 4-digit OTP.");
      return;
    }

    const data = {
      user_id: requestUserId,
      otp: enteredOtp,
      request_id: requestId,
    };

    dispatch(verifyPhoneNumberData(data)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);

        const formData = new FormData();
        formData.append("service_id", serviceId || buyerRequest?.service_id || "");
        formData.append("postcode", buyerRequest?.postcode || "");
        formData.append("city", citySerach || "");
        formData.append("phone", buyerRequest?.phone || "");

        formData.append(
          "questions",
          JSON.stringify(buyerRequest?.questions || [])
        );
        formData.append("form_status", "1");
        formData.append("request_id", requestId);
        formData.append("user_id", requestUserId);
        formData.append("quote_type", "req call back");
        formData.append("address", buyerRequest?.address || "") 

        dispatch(createRequestData(formData)).then((res) => {
          if (res?.success) {
            showToast("success", res?.message);
            const localePattern = /^[a-z]{2}$/i;
            if (isThankuPageOnlyShow) {
              const modalData = {
                shouldOpen: true,
                step: 7,
                buyerRequest: buyerRequest,
                city: citySerach,
                serviceId: serviceId || buyerRequest?.service_id,
                baseRedirectPath: localePattern.test(lastSegment) ? "root" : lastSegment

              };

              // LocalStorage will be used later
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "pendingBuyerModal",
                  JSON.stringify(modalData)
                );
              }
              nextStep();
            } else {
              nextStep();
            }
          } else {
            showToast("error", res?.message || "Failed to create request");
          }
        });
      } else {
        showToast("error", result?.message || "OTP verification failed");
      }
    });
  };

  const handleResendOtp = () => {
    const data = {
      user_id: requestUserId,
      phone: requestUserPhone,
    };

    dispatch(resendOtp(data)).then((res) => {
      if (res?.success) {
        showToast("success", res?.message || "OTP resent successfully!");
        setOtp(["", "", "", ""]);
        setTimer(60);
        inputRefs.current[0]?.focus();
      } else {
        showToast("error", res?.message || "Failed to resend OTP");
      }
    });
  };

  return (
    <Modal
      padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
      showButtons={false}
      isOpen={true}
      title="OTP Verification"
      maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
      showClosIcon={false}
      titleClassName="text-center"
      buyerStep={buyerStep}
      showProgressBar={true}
      progressPercent={progressPercent}


    >
      <div className="mx-auto text-center max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
        {/* Instruction */}
        <Paragraph className="mb-6 text-[#828282] font-black">
          We've sent a code to{" "}
          <span className="text-[#253238]">
            {formatUKPhoneNumber(requestUserPhone)}.
          </span>
          {" "}Please enter it below
        </Paragraph>

        {/* Phone verification notice */}
        <span className="tracking-[-0.03em]
        text-[12px] leading-[18px] font-[Arial] font-bold
        md:text-[14px] md:leading-[16px]
        lg:text-[16px] lg:leading-[24px] mx-auto mb-5 bg-[#F5F5F5]">
          **Please check the above number is correct**
        </span>

        {/* OTP Inputs */}
        <div className="mb-5 flex justify-center gap-2 lg:gap-3 mt-4">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="h-[60px] lg:w-[80px] md:w-[73px] w-[67px]
        rounded-[15px]
        border border-[#CFCFCF]
        bg-white
        text-center
        text-2xl
        font-bold
        text-[#253238]
        focus:outline-none
        focus:border-[#00ADD8]
        transition-all
        duration-200"
              value={otp[index]}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {/* Resend OTP */}
        <div className="mb-4 text-sm font-bold leading-[14px] text-[#969696] font-[Arial] tracking-[-0.03em]">
          Didn&apos;t receive the OTP code? Click here to{" "}
          {timer > 0 ? (
            <span className="font-[Arial] tracking-[-0.03em] mt-4 text-sm font-bold text-[#828282]">
              Resend OTP in <strong>{timer}</strong>s
            </span>
          ) : (
            <span
              className="ml-0.5 inline-block font-[Arial] tracking-[-0.03em] cursor-pointer text-sm font-bold text-[#00ADD8] hover:underline"
              onClick={handleResendOtp}
            >
              {resendOtpLoader ? "Resending..." : "Resend OTP"}
            </span>
          )}
        </div>

        {/* Verify Button */}
        <button
          className="mt-[18px] w-[200px] rounded-[30px] bg-[#00ADD8] cursor-pointer px-[23px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0096c4] disabled:opacity-50"
          disabled={requestLoader || verifyPhoneNumberLoader}
          onClick={handleSubmit}
        >
          {requestLoader || verifyPhoneNumberLoader ? "Verifying..." : "Verify"}
        </button>

        {/* Go Back */}
        <p className="mb-[5px] mt-[26px] text-[#969696] tracking-[-0.03em]
        text-[12px] leading-[18px] font-[Arial] font-bold
        md:text-[14px] md:leading-4
        lg:text-[16px] lg:leading-6">
          Want to update your above number?
        </p>
        <div
          className="flex items-center mx-auto mb-4 w-fit cursor-pointer"
          onClick={() => {
            if (setReEnterMobile) {
              setReEnterMobile(1);
            }
          }}
        >
          <span className="mr-[5px] text-sm font-bold font-[Arial] tracking-[-0.03em] text-[#00ADD8]">
            Go Back
          </span>
          <BackButtonOTP />
        </div>
      </div>
    </Modal>
  );
};

export default OtpVerificationModal;
