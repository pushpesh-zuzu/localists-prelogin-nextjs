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
import BackButtonOTP from "../icons/Registration/BackButtonOTP";

const OtpVerification = ({
  open,
  nextStep,
  isThankuPageOnlyShow = true,
  setReEnterMobile,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const {
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
  const pathSegments = pathname?.split("/") || [];
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
        formData.append("service_id", buyerRequest?.service_id || "");
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

        dispatch(createRequestData(formData)).then((res) => {
          if (res?.success) {
            showToast("success", res?.message);

            if (isThankuPageOnlyShow) {
              const modalData = {
                shouldOpen: true,
                step: 7,
                buyerRequest: buyerRequest,
                city: citySerach,
                serviceId: buyerRequest?.service_id,
                baseRedirectPath: lastSegment ? lastSegment : "root",
              };

              // LocalStorage will be used later
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "pendingBuyerModal",
                  JSON.stringify(modalData)
                );
              }

              router.push("/thank-you");
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
      padding="p-0"
      showButtons={false}
      isOpen={true}
      maxWidth="max-w-[90%] md:max-w-[500px] mt-[5%]"
      showClosIcon={false}
    >
      <div className="w-full max-w-[500px] bg-white px-2  md:px-8 py-11 text-center shadow-sm sm:px-[31px] sm:py-[45px]">
        {/* Title */}
        <h2 className="mb-5 text-lg font-bold leading-none text-black">
          OTP Verification
        </h2>

        {/* Instruction */}
        <p className="mb-6 text-base font-medium leading-6 text-[#828282] sm:text-base">
          Enter the OTP sent to{" "}
          <span className="text-black">
            {formatUKPhoneNumber(requestUserPhone)}
          </span>
        </p>

        {/* Phone verification notice */}
        <p className="mx-auto mb-5 w-fit bg-[#F5F5F5] px-[7px] py-[6px] text-xs font-medium text-black sm:text-base">
          **Please check the above number is correct**
        </p>

        {/* OTP Inputs */}
        <div className="mb-5 flex justify-center gap-6">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              className="h-7 w-7 border-b border-[#BCBCBC] border-t-0 border-r-0 border-l-0 text-center text-2xl focus:outline-none sm:h-7 sm:w-7"
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
        <div className="mb-4 text-sm font-medium leading-[14px] text-[#969696]">
          Didn't you receive the OTP?{" "}
          {timer > 0 ? (
            <p className="mt-4 text-sm font-medium text-[#828282]">
              Resend OTP in <strong>{timer}</strong>s
            </p>
          ) : (
            <span
              className="ml-0.5 inline-block cursor-pointer text-sm font-medium text-[#00ADD8] hover:underline"
              onClick={handleResendOtp}
            >
              {resendOtpLoader ? "Resending..." : "Resend OTP"}
            </span>
          )}
        </div>

        {/* Verify Button */}
        <button
          className="mt-[18px] w-[200px] rounded-[3px] bg-[#00ADD8] px-[23px] py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#0096c4] disabled:opacity-50"
          disabled={requestLoader || verifyPhoneNumberLoader}
          onClick={handleSubmit}
        >
          {requestLoader || verifyPhoneNumberLoader ? "Verifying..." : "Verify"}
        </button>

        {/* Go Back */}
        <p className="mb-[5px] mt-[26px] text-sm font-medium leading-[14px] text-[#969696]">
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
          <span className="mr-[5px] text-sm font-medium text-[#00ADD8]">
            Go Back
          </span>
          <BackButtonOTP/>
        </div>

        {/* Mobile number notice */}
        <div className="mx-auto rounded-[3px] bg-[#F5F5F5] px-1.5 py-[5px]">
          <p className="mx-auto text-base font-semibold text-black sm:text-base">
            WE CAN ONLY SEND A PASSCODE TO A MOBILE NUMBER NOT TO A LANDLINE.
          </p>
        </div>

        <p className="mx-auto mb-0 mt-4 text-base font-semibold text-[#A3A3A3]">
          We cannot verify your account without a mobile number
        </p>
      </div>
    </Modal>
  );
};

export default OtpVerification;
