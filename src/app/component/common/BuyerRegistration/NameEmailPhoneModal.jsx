"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import InputField from "../../UI/Inputs/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import {
  checkEmailIdApi,
  setbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import { validateEmail } from "@/utils/validateEmail";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useEmailCheck } from "@/hooks/emailExist";
import useUserInfo from "@/utils/getUserIp";
import { getBarkToken } from "@/utils/CookiesHelper";
import Paragraph from "../../UI/Typography/Paragraph";
import { extractAllParams } from "@/utils/decodeURLParams";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";

function NameEmailPhoneModal({
  onClose,
  nextStep,
  setEmails,
  setShowConfirmModal,
  resetTrigger,
  isStartWithQuestionModal = false,
  isPPCPages = false,
  hideCloseButton = false,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { buyerRequest, citySerach, requestLoader } = useSelector(
    (state) => state.buyer,
  );
  const { ip, url } = useUserInfo();
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

  const [name, setName] = useState(buyerRequest?.name || "");
  const [email, setEmail] = useState(buyerRequest?.email || "");
  const [phone, setPhone] = useState(buyerRequest?.phone || "");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable, isChecking } = useEmailCheck(email);
  const [inputType, setInputType] = useState("text");

  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });
  useEffect(() => {
    if (!isEmailAvailable) {
      setEmail("");
      dispatch(setbuyerRequestData({ ...buyerRequest, email: "" }));
    }
  }, [isEmailAvailable]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: "" }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name: e.target.value,
        email,
        phone,
      }),
    );
  };

  const handleEmailChange = (e) => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;   
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "" }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name,
        email: e.target.value,
        phone,
      }),
    );
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: "" }));
      dispatch(
        setbuyerRequestData({ ...buyerRequest, name, email, phone: value }),
      );
    }
  };

  const handleEmailBlur = async () => {
    if (!email) {
      setInputType("text");
    }

    if (!email) return;

    try {
      const res = await dispatch(checkEmailIdApi({ email }));
      if (res?.success) {
        setErrors((prev) => ({ ...prev, email: false }));
        setIsEmailValid(true);
        setEmailErrorMessage("");
      } else {
        setEmail("");
        if (setEmails) setEmails("");
        setIsEmailValid(false);
        setEmailErrorMessage("Email is already registered.");
      }
    } catch (err) {
      console.error("Error checking email:", err);
      setErrors((prev) => ({ ...prev, email: false }));
      setIsEmailValid(false);
      setEmailErrorMessage("Something went wrong. Please try again.");
    }
  };

  const handleSubmit = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;
    const newErrors = {
      email: !isPPCPages && (!email || !validateEmail(email)),
      name: !name.trim(),
      phone: !phone || !/^\d{11}$/.test(phone),
    };

    if (!isPPCPages && newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError || (!isPPCPages && !isEmailValid)) return;

    if (!isPPCPages && setEmails) {
      setEmails(email);
    }
    if (!validateUKPhoneNumber(phone)) {
      return;
    }
    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;

    dispatch(setbuyerRequestData({ name, email: finalEmail, phone }));
    const updatedAnswers = buyerRequest?.questions || [];

    if (isStartWithQuestionModal) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", finalEmail);
      formData.append("phone", phone);
      formData.append("questions", JSON.stringify(updatedAnswers));
      formData.append("service_id", buyerRequest?.service_id || "");
      formData.append("city", citySerach || "");
      formData.append("postcode", buyerRequest?.postcode || "");
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
      formData.append("form_status", 1);
      formData.append("entry_url", url);
      formData.append("user_ip_address ", ip);

      dispatch(registerQuoteCustomer(formData)).then((result) => {
        if (result) {
          nextStep();
        }
      });
    } else {
      nextStep();
      setbuyerRequestData({
        ...buyerRequest,
        name: name,
        city: email,
        phone: phone,
      });
    }
  };
  const handleCloseClick = () => {
    if (!getBarkToken()) {
      dispatch(setbuyerRequestData({ name, email, phone }));
      setShowConfirmModal(true);
    } else {
      onClose();
    }
  };

  useEffect(() => {
    dispatch(setbuyerRequestData({ name, email, phone }));
  }, []);
  return (
    <div>
      <Modal
        onClose={() => {
          handleCloseClick();
        }}
        isOpen={true}
        title="YOU ARE ONLY ONE STEP FROM COMPARING FREE QUOTES!"
        onNext={handleSubmit}
        maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
        maxHeight="max-h-[80vh] lg:max-h-[90vh]"
        padding="px-3 py-4 md:px-7.5 md:pt-3 pb-6"
        disabled={isChecking}
      >
        <Paragraph className="text-center">
          Your phone number and email are safe with us.
        </Paragraph>
        <Paragraph bold={"font-medium"} className="text-center mt-1 sm:mt-0">
          We'll only use them to help you connect with trusted, verified
          professionals.
        </Paragraph>
        <InputField
          label="Name"
          value={name}
          onChange={handleNameChange}
          error={errors.name && "Name is required"}
          placeholder="Your Name"
          type={inputType}
        />
        {!isPPCPages && (
          <InputField
            label="Email"
            type={inputType}
            value={email}
            onChange={handleEmailChange}
            // onBlur={handleEmailBlur}
            error={errors.email && "Please enter a valid email address."}
            placeholder="Your Email"
          />
        )}
        <InputField
          label="Phone"
          type={inputType}
          value={phone}
          onChange={handlePhoneChange}
          error={errors.phone && "Please enter a valid 11-digit phone number."}
          placeholder="Phone Number"
        />
      </Modal>
    </div>
  );
}

export default NameEmailPhoneModal;
