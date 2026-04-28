"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setbuyerRequestData,
  updateMobile,
} from "@/lib/store/buyerslice/buyerSlice";

import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { showToast } from "@/utils/toaster";
import RequestBuyerModal from "../Modal/RequestBuyerModal";
import RequestInputField from "../UI/RequestInputField";

function NewRequestBuyerReEnterMobileNumberModal({ onClose, setReEnterMobile, progressPercent }) {
  const dispatch = useDispatch();

  const { buyerRequest, requestLoader, requestUserId, buyerStep } = useSelector(
    (state) => state.buyer,
  );

  const [name, setName] = useState(buyerRequest?.name || "");
  const [email, setEmail] = useState(buyerRequest?.email || "");
  const [phone, setPhone] = useState(buyerRequest?.phone || "");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  // -----------------------
  // Handlers
  // -----------------------

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));

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
    setErrors((prev) => ({ ...prev, email: false }));

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
      setErrors((prev) => ({ ...prev, phone: false }));

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

  // -----------------------
  // Submit
  // -----------------------

  const handleSubmit = () => {
    const newErrors = {
      name: !name.trim(),
      email: !email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
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

        if (setReEnterMobile) setReEnterMobile(2);
        if (onClose) onClose();
      } else {
        showToast("error", result?.message || "Failed to update phone number");
      }
    });
  };

  const handleCloseClick = () => {
    onClose?.();
  };

  // -----------------------
  // Sync initial data
  // -----------------------

  useEffect(() => {
    dispatch(setbuyerRequestData({ name, email, phone }));
  }, []);

  // -----------------------
  // UI
  // -----------------------

  return (
    <RequestBuyerModal
      onClose={handleCloseClick}
      isOpen={true}
      title="Your Details"
      onNext={handleSubmit}
      disabled={requestLoader}
      buyerStep={buyerStep}
      fixedHeight={true}
      showProgressBar={true}
      titleClassName="text-left"
      progressPercent={progressPercent}
      marginTop="lg:mt-[10vh] mt-[5vh]"
    >
      <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
        {/* Name */}
        <RequestInputField
          label="Full Name"
          value={name}
          onChange={handleNameChange}
          error={errors.name && "Please enter a name"}
          placeholder="Your Name"
          disabled={true}
          labelClass="text-base text-[20px] mb-3"
        />

        {/* Email */}
        <RequestInputField
          label="Email"
          value={email}
          onChange={handleEmailChange}
          error={errors.email && "Please enter a valid email address"}
          placeholder="Your Email"
          disabled={true}
        />

        {/* Phone */}
        <RequestInputField
          label="Phone"
          value={phone}
          onChange={handlePhoneChange}
          error={errors.phone && "Please enter a valid 11-digit phone number"}
          placeholder="Phone Number"
        />
      </div>
    </RequestBuyerModal>
  );
}

export default NewRequestBuyerReEnterMobileNumberModal;
