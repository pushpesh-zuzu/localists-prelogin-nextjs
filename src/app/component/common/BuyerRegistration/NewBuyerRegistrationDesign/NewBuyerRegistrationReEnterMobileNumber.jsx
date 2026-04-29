"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  updateMobile,
} from "@/lib/store/buyerslice/buyerSlice";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { showToast } from "@/utils/toaster";
import RequestBuyerModal from "@/app/component/common/ReqBuyerRegistration/Modal/RequestBuyerModal";
import RequestInputField from "@/app/component/common/ReqBuyerRegistration/UI/RequestInputField";

function NewBuyerRegistrationReEnterMobileNumber({ onClose, setReEnterMobile }) {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader, requestUserId } = useSelector(
    (state) => state.buyer,
  );

  const [name, setName] = useState(buyerRequest?.name || "");
  const [email, setEmail] = useState(buyerRequest?.email || "");
  const [phone, setPhone] = useState(buyerRequest?.phone || "");

  const [inputType, setInputType] = useState("text");
  const [errors, setErrors] = useState({
    email: false,
    name: false,
    phone: false,
  });

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
        setbuyerRequestData({
          ...buyerRequest,
          name,
          email,
          phone: value,
        }),
      );
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      email: !email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
      name: !name.trim(),
      phone: !phone || !/^\d{11}$/.test(phone),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError) {
      if (newErrors.phone) {
        showToast("error", "Please enter a valid 11-digit phone number.");
      }
      return;
    }

    if (!validateUKPhoneNumber(phone)) {
      showToast("error", "Please enter a valid UK phone number.");
      return;
    }

    dispatch(setbuyerRequestData({ name, email, phone }));

    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("user_id", requestUserId);

    dispatch(updateMobile(formData)).then((result) => {
      if (result?.success) {
        showToast(
          "success",
          result?.message || "Phone number updated successfully",
        );
        if (setReEnterMobile) {
          setReEnterMobile(2);
        }
        if (onClose) {
          onClose();
        }
      } else {
        showToast("error", result?.message || "Failed to update phone number");
      }
    });
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    }
  };

  const SimpleSpinner = () => (
    <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
  );

  useEffect(() => {
    dispatch(setbuyerRequestData({ name, email, phone }));
  }, []);

  return (
    <RequestBuyerModal
      onClose={() => {
        handleCloseClick();
      }}
      isOpen={true}
      title="Your Details"
      onNext={handleSubmit}
      minHeight="min-h-[300px] md:min-h-[400px]"
      radius="rounded-[20px]"
      // subHeading="Your phone number and email are safe with us."
      // description="We'll only use them to help you connect with trusted, verified professionals."
      marginTop="lg:mt-[10vh] mt-[5vh]"
      onBack={handleCloseClick}
    >
      {/* <Paragraph bold={"font-black"} className="text-center">
        Your phone number and email are safe with us.
      </Paragraph>
      <Paragraph className="text-center">
        We'll only use them to help you connect with trusted, verified
        professionals.
      </Paragraph> */}

      {/* EXACTLY SAME Input Fields */}
      <RequestInputField
        label="Name"
        value={name}
        onChange={handleNameChange}
        error={errors.name && "Name is required"}
        placeholder="Your Name"
        type={inputType}
        disabled={true}
      />

      <RequestInputField
        label="Email"
        type={inputType}
        value={email}
        onChange={handleEmailChange}
        error={errors.email && "Please enter a valid email address."}
        placeholder="Your Email"
        disabled={true}
      />

      <RequestInputField
        label="Phone"
        type={inputType}
        value={phone}
        onChange={handlePhoneChange}
        error={errors.phone && "Please enter a valid 11-digit phone number."}
        placeholder="Phone Number"
      />

      {/* NO EXTRA CONTENT - Exactly like NameEmailPhoneModal */}
    </RequestBuyerModal>
  );
}

export default NewBuyerRegistrationReEnterMobileNumber;
