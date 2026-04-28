"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import {
  createRequestData,
  resendOtp,
  verifyPhoneNumberData,
} from "@/lib/store/buyerslice/buyerSlice";
import { showToast } from "@/utils/toaster";
import { formatUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
// import Paragraph from "../../UI/Typography/Paragraph";
// import RequestBuyerModal from "./Modal/RequestBuyerModal";
import { EditIcon } from "lucide-react";
import RequestBuyerModal from "../Modal/RequestBuyerModal";
import Paragraph from "@/app/component/UI/Typography/Paragraph";
import H5 from "@/app/component/UI/Typography/H5";

const NewBuyerRequestBuyerOtpVerificationModal = ({
  open,
  nextStep,
  isThankuPageOnlyShow = true,
  setReEnterMobile,
  serviceId,
  progressPercent,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [otpError, setOtpError] = useState(false);
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
    setOtpError(false)
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
        formData.append(
          "service_id",
          buyerRequest?.service_id || serviceId || "",
        );
        formData.append("postcode", buyerRequest?.postcode || "");
        formData.append("city", citySerach || "");
        formData.append("phone", buyerRequest?.phone || "");

        formData.append(
          "questions",
          JSON.stringify(buyerRequest?.questions || []),
        );
        formData.append("form_status", "1");
        formData.append("request_id", requestId);
        formData.append("user_id", requestUserId);
        formData.append("address", buyerRequest?.address || "");

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
                baseRedirectPath: localePattern.test(lastSegment)
                  ? "root"
                  : lastSegment,
              };

              // LocalStorage will be used later
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "pendingBuyerModal",
                  JSON.stringify(modalData),
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
        // showToast("error", result?.message || "OTP verification failed");
        setOtpError(true)
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
    <RequestBuyerModal
      // showButtons={false}
      isOpen={true}
      title="OTP Verification"
      showClosIcon={false}
      titleClassName="text-center"
      buyerStep={buyerStep}
      nextButtonText={requestLoader || verifyPhoneNumberLoader ? "Verifying..." : "Verify"}
      showProgressBar={true}
      progressPercent={progressPercent}
      marginTop="lg:mt-[5vh]"
      onNext={handleSubmit}
      onBackDisable
      minHeight="min-h-[300px] md:min-h-[552px]"
    >
      <div className="mx-auto text-center max-w-[100%] md:max-w-[80%] lg:max-w-[608px]">
        {/* Instruction */}
        <H5>Check your SMS Box</H5>
        {/* <Paragraph className="mb-6 text-[#828282] font-black">
          We've sent a code to{" "}
          <span className="text-[#253238]">
            {formatUKPhoneNumber(requestUserPhone)}.
          </span>
          {" "}Please enter it below
        </Paragraph> */}
        <Paragraph variant="medium" bold="font-normal tracking-[0em] mt-4 mb-5" className="text-base! md:text-[18px]!">
          Please enter the four digit verification code we sent to
        </Paragraph>
        {/* Phone verification notice */}
        <div className="flex justify-center mb-[15px] md:mb-5">
          <Paragraph bold="font-black"
            className="
      flex items-center gap-[14px]
      tracking-[0em]
      text-[20px]
    "
          >
            {formatUKPhoneNumber(requestUserPhone)}
            <EditIcon onClick={() => {
            if (setReEnterMobile) {
              setReEnterMobile(1);
            }
          }} size={20} className="cursor-pointer" color="#00afe3" />
          </Paragraph>
        </div>

        {/* OTP Inputs */}
        <div className="mb-2 flex justify-center mt-5 md:mt-10">
          <div
            className={`
      flex items-center rounded-full overflow-hidden
      border-2 transition-colors duration-200
      ${
        otpError
          ? "border-red-500"
          : otp.every((d) => d && !otpError !== "")
            ? "border-[#00afe3]"
            : "border-[#CFCFCF]"
      }
    `}
          >
            {[0, 1, 2, 3].map((index) => (
              <React.Fragment key={index}>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  className={`
            h-[48px] lg:w-[82px] md:w-[73px] md:h-16 w-[50px]
            text-center text-base!  md:text-[28px] md:leading-6 font-bold
            focus:outline-none
            transition-colors duration-200
            ${
              otpError
                ? "bg-transparent text-red-500!"
                : otp.every((d) => d && !otpError !== "")
                  ? "!bg-[#00afe3] !text-white"
                  : "bg-transparent text-[#253238]"
            }
          `}
                  value={otp[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  autoFocus={index === 0}
                />
                {index < 3 && (
                  <div
                    className={`self-stretch py-1.5 md:py-[14px] flex items-stretch flex-shrink-0
      ${otp.every((d) => d !== "") && !otpError ? "bg-[#00afe3]" : "bg-white"}
    `}
                  >
                    <div
                      className={`w-[2.1] md:w-[2.5px] transition-colors duration-200 ${
                        otpError
                          ? "bg-red-500"
                          : otp.every((d) => d !== "")
                            ? "bg-white"
                            : "bg-[#CFCFCF]"
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Error text below inputs */}
        {otpError && (
          <p className="text-sm text-red-500 text-center mt-2 mb-3">
            Incorrect code. Please enter again.
          </p>
        )}

        {/* Resend OTP */}
        <div className="mt-5 md:mt-10 text-sm leading-[14px] font-[Arial] tracking-[-0.03em]">
          Didn&apos;t receive the OTP code?<br className="md:hidden"/> Click here to{" "}
          {timer > 0 ? (
            <span className="font-[Arial] tracking-[-0.03em] mt-4 text-sm">
              <strong>Resend OTP  </strong> in {timer}s
            </span>
          ) : (
            <span
              className="ml-0.5 inline-block font-[Arial] tracking-[-0.03em] cursor-pointer text-sm font-bold  hover:underline"
              onClick={handleResendOtp}
            >
              {resendOtpLoader ? "Resending..." : "Resend OTP"}
            </span>
          )}
        </div>

        {/* Verify Button */}
        {/* <button
          className="mt-[18px] w-[200px] rounded-[30px] bg-[#00ADD8] cursor-pointer px-[23px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0096c4] disabled:opacity-50"
          disabled={requestLoader || verifyPhoneNumberLoader}
          onClick={handleSubmit}
        >
          {requestLoader || verifyPhoneNumberLoader ? "Verifying..." : "Verify"}
        </button> */}
      </div>
    </RequestBuyerModal>
  );
};

export default NewBuyerRequestBuyerOtpVerificationModal;
