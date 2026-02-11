import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createRequestData,
  verifyPhoneNumberData,
  resendOtp,
} from "@/lib/store/buyerslice/buyerSlice";
import { usePathname, useRouter } from "next/navigation";
import { showToast } from "@/utils";
import BackButtonOTP from "../icons/Registration/BackButtonOTP";
import { formatUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { clearSpecificCookie, getCookie } from "@/utils/CookiesHelper";

const OTPVerificationMultiStep = ({
  open,
  nextStep,
  isThankuPageOnlyShow = false,
  setUpdateNumberStep,
  onBack,
}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const userId = getCookie("userId")
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
  // const pathSegments = pathname?.split("/") || [];
  // const lastSegment = pathSegments[pathSegments.length - 1];
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
      request_id: requestId? requestId : userId,
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
          JSON.stringify(buyerRequest?.questions || []),
        );
        formData.append("form_status", "1");
        formData.append("request_id", requestId);
        formData.append("user_id", requestUserId);

        dispatch(createRequestData(formData)).then((res) => {
          if (res?.success) {
            showToast("success", res?.message);
            clearSpecificCookie("userId")
            const localePattern = /^[a-z]{2}$/i;
            if (isThankuPageOnlyShow) {
              const modalData = {
                shouldOpen: true,
                step: 7,
                buyerRequest: buyerRequest,
                city: citySerach,
                serviceId: buyerRequest?.service_id,
                // baseRedirectPath: lastSegment ? lastSegment : "root",
                baseRedirectPath : localePattern.test(lastSegment) ? "root" : lastSegment
              };

              // LocalStorage will be used later
              if (typeof window !== "undefined") {
                localStorage.setItem(
                  "pendingBuyerModal",
                  JSON.stringify(modalData),
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
    <div className="p-6 ">
      <h2 className="font-extrabold text-lg md:text-lg sm:text-lg text-center text-black mb-5">
        OTP Verification
      </h2>

      <p className="font-medium text-center text-[#828282] mb-[13px] md:mb-5 sm:mb-[13px] text-base md:text-base text-[10px]">
        Enter the OTP sent to{" "}
        <span className="text-black">
          {formatUKPhoneNumber(requestUserPhone)}
        </span>
      </p>

      <p className="font-medium text-center bg-[#f5f5f5] py-1.5 px-2 mx-auto max-w-fit text-black mb-5 md:mb-5 sm:mb-[19px] text-[10px] md:text-base ">
        **Please check the above number is correct**
      </p>

      <div className="flex justify-center gap-3 md:gap-4 mb-5 md:mb-[20px] sm:mb-6">
        {[0, 1, 2, 3].map((index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            className="w-10 h-10 md:w-10 md:h-10  text-2xl text-black! md:text-xl sm:text-lg text-center border-0 border-b border-[#bcbcbc] focus:outline-none "
            value={otp[index]}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={handlePaste}
            ref={(el) => (inputRefs.current[index] = el)}
            autoFocus={index === 0}
          />
        ))}
      </div>

      <div className="font-medium md:text-sm text-[10px] text-center text-[#969696] md:mb-[26px]">
        Didn't you receive the OTP?{" "}
        {timer > 0 ? (
          <p className="text-[#828282] font-medium mt-4 md:mt-4 sm:mt-4 md:text-sm text-[10px]">
            Resend OTP in <strong>{timer}</strong>s
          </p>
        ) : (
          <button
            className="inline-block bg-white text-[#00afe3] cursor-pointer font-medium text-sm md:text-sm sm:text-[10px] ml-1 hover:text-[#0096c4]"
            onClick={handleResendOtp}
            disabled={resendOtpLoader}
          >
            {resendOtpLoader ? "Resending..." : "Resend OTP"}
          </button>
        )}
      </div>

      <button
        className="shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)] bg-[#00afe3] rounded text-white py-2 px-6 border-none cursor-pointer font-semibold text-sm md:text-sm sm:text-sm w-48 md:w-48 sm:w-[70%] mx-auto block mt-[8px] md:mt-5 sm:mt-[10px] hover:bg-[#0096c4] disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={requestLoader || verifyPhoneNumberLoader}
        onClick={handleSubmit}
      >
        Verify
      </button>

      <p className="font-medium md:text-sm text-[10px] text-center text-[#969696] mb-1.5 mt-6 md:mt-6 sm:mt-[14px]">
        Want to update your above number?
      </p>

      <div
        className="cursor-pointer max-w-fit mx-auto mb-4 relative flex align-middle"
        onClick={() => {
          setUpdateNumberStep(1);
          onBack();
        }}
      >
        <span className="font-medium  md:text-sm text-[10px] text-center text-[#00afe3] mr-1.5 hover:text-[#0096c4] ">
          Go Back
        </span>
        <BackButtonOTP className="h-2.5 w-2.5 md:h-[17px] md:w-[17px]" />
      </div>

      <div className="bg-[#f5f5f5] mx-auto p-1.5 rounded max-w-[450px]">
        <p className="mx-auto text-black font-semibold text-[10px] md:text-base text-center">
          WE CAN ONLY SEND A PASSCODE TO A MOBILE NUMBER NOT TO A LANDLINE.
        </p>
      </div>

      <p className="mx-auto mt-4 md:mt-4 sm:mt-4 mb-0 text-[#a3a3a3] font-semibold text-[10px] md:text-base  text-center">
        We cannot verify your account without a mobile number
      </p>
    </div>
  );
};

export default OTPVerificationMultiStep;
