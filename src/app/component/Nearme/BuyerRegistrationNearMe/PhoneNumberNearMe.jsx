import {
  registerQuoteCustomer,
  setbuyerRequestData,
  updateMobile,
} from "@/lib/store/buyerslice/buyerSlice";
import { showToast } from "@/utils";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserInfo from "@/utils/getUserIp";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useSearchParams } from "next/navigation";
import { extractAllParams } from "@/utils/decodeURLParams";
import CardLayoutWrapperNearme from "./CardLayoutWrapperNearme";

const PhoneNumberNearMe = ({
  nextStep,
  onBack,
  updateNumberStep,
  setUpdateNumberStep,
  setLocalRequestId,
}) => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { buyerRequest, requestUserId, requestLoader } = useSelector(
    (state) => state.buyer,
  );
  const { search } = useSearchParams();
  const allParams =
    typeof window !== "undefined" &&
    extractAllParams(search || window.location.search);
  const campaignid = allParams.campaign_id || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const msclkid = allParams.msclkid || "";
  const adgroup_id = allParams.adgroup_id;
  const platform_source = allParams.source || "";
  const campaign = allParams.campaign || "";
  const adgroup = allParams.adgroup || "";
  const matchtype = allParams.matchtype || "";
  const device = allParams.device || "";
  const loc_physical_ms = allParams.loc_physical_ms || "";
  const utm_search_term = allParams.utm_search_term || "";

  const [phone, setPhone] = useState(buyerRequest?.phone);
  const [errors, setErrors] = useState({
    phone: false,
  });
  const { ip, url } = useUserInfo();
  const [mobileErrorMessage, setMobileErrorMessage] = useState("");

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // remove all non-digits
    if (value.length <= 11) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
      setMobileErrorMessage("");
    }
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        phone: value,
      }),
    );
  };

  const updatedAnswers = Array.isArray(buyerRequest?.questions)
    ? buyerRequest.questions.filter(Boolean) // remove undefined/null items
    : [];

  const hasQuestionNo = updatedAnswers.some(
    (q) => q && typeof q === "object" && "question_no" in q,
  );

  const answersToSend = hasQuestionNo
    ? updatedAnswers.map((q) => {
        if (!q || typeof q !== "object") return q;
        const { question_no, ...rest } = q;
        return rest;
      })
    : updatedAnswers;

  const handleSubmit = () => {
    if (!phone) {
      setMobileErrorMessage("Phone number is required");
      setErrors((prev) => ({ ...prev, phone: true }));
      return;
    }

    const newErrors = {
      phone: !phone || !/^\d{11}$/.test(phone),
    };

    setErrors(newErrors);

    if (newErrors.phone) {
      setMobileErrorMessage("Please enter a valid 11-digit phone number.");
      return;
    }

    if (!validateUKPhoneNumber(phone)) {
      return;
    }
    setIsSubmitting(true);
    if (updateNumberStep === 2) {
      const formData = new FormData();
      formData.append("name", buyerRequest?.name);
      formData.append("email", buyerRequest?.email);
      formData.append("phone", phone);
      formData.append("questions", JSON.stringify(answersToSend));
      formData.append("service_id", buyerRequest?.service_id);
      formData?.append("city", buyerRequest?.city);
      formData.append("postcode", buyerRequest?.postcode);
      formData.append("form_status", 1);
      formData.append("campaignid", campaignid || "");
      formData.append("gclid", gclid || "");
      formData.append("campaign", campaign || "");
      formData.append("adgroup", adgroup || "");
      formData.append("msclickid", msclkid || "");
      formData.append("adgroup_id", adgroup_id || "");
      formData.append("matchtype", matchtype || "");
      formData.append("device", device || "");
      formData.append("loc_physical_ms", loc_physical_ms || "");
      formData.append("utm_search_term", utm_search_term || "");
      formData.append("platform_source", platform_source);
      formData.append("keyword", keyword || "");
      formData.append("entry_url", url);
      formData.append("user_ip_address ", ip);

      dispatch(registerQuoteCustomer(formData))
        .then((result) => {
          if (result) {
            setLocalRequestId(result?.data?.user_id);
            nextStep();
          }
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      const formData = new FormData();
      formData.append("phone", phone);
      formData.append("user_id", requestUserId);
      dispatch(updateMobile(formData))
        .then((result) => {
          if (result) {
            showToast(
              "success",
              result?.message || "Phone Number updated Successfully",
            );
          }
          setUpdateNumberStep(2);
          nextStep();
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }

    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        phone: phone,
      }),
    );
  };

  const handleBackClick = () => {
    onBack();
  };

  return (
    <CardLayoutWrapperNearme
      title="Just one more thing…"
      onButtonClick={handleSubmit}
      onBackClick={handleBackClick}
      buttonText="Compare quotes now"
      showBackButton={true}
      disableNextButton={requestLoader || isSubmitting}
      loader={requestLoader || isSubmitting}
      className1={false}
    >
      <div className="mb-2">
        <div
          className={`flex flex-col items-start w-full ${errors?.phone ? "mb-1" : "mb-4"}`}
        >
          <input
            type="tel"
            placeholder="Phone Number"
            className={`
              w-full px-3 py-3 
              shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)]
              border ${errors?.phone ? "border-red-500" : "border-gray-300"}
              text-gray-500
              rounded-md
              mt-1
              focus:outline-none
              focus:border-[#0096c4]
              focus:ring-3
              focus:ring-[#0096c4]/10
              autofill:bg-transparent
              autofill:shadow-[0_0_0_30px_transparent_inset]
              autofill:text-fill-gray-800
            `}
            value={phone}
            maxLength={11}
            onChange={handlePhoneChange}
            autoComplete="off"
          />
          {errors?.phone && (
            <span className="text-red-500 text-xs block text-left mt-1">
              {mobileErrorMessage}
            </span>
          )}
        </div>

        <p className="mt-7 text-gray-700 text-center">
          We can only send a passcode to a{" "}
          <strong className="font-extrabold">MOBILE NUMBER</strong>, not a{" "}
          <strong className="font-extrabold">LANDLINE</strong>
        </p>

        <p
          className="
          bg-[#e9f8ff]
          max-w-fit
          font-normal
          rounded-md
          text-base
          py-2 px-3
          mx-auto
          mt-7
          text-center
        "
        >
          We only use this to match you with trusted professionals.
        </p>
      </div>
    </CardLayoutWrapperNearme>
  );
};

export default PhoneNumberNearMe;
