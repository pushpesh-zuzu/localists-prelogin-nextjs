"use client";

import React, { useState } from "react";
import { validateEmail } from "@/utils/validateEmail";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import Paragraph from "../UI/Typography/Paragraph";
import InputField from "../UI/Inputs/InputField";
import Modal from "../common/Modal";

function RequestCallbackModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    phone: false,
  });

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      setPhone(value);
      setErrors((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {
      name: !name.trim(),
      email: !email || !validateEmail(email),
      phone: !phone || !/^\d{11}$/.test(phone),
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some(Boolean);
    if (hasError) return;

    if (!validateUKPhoneNumber(phone)) return;

    // send data to parent
    onSubmit?.({
      name,
      email,
      phone,
    });
  };

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      onNext={handleSubmit}
      title="REQUEST A CALLBACK"
      maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
      maxHeight="max-h-[80vh] lg:max-h-[90vh]"
      padding="px-3 py-4 md:px-7.5 md:pt-3 pb-6"
      usePortal={true}
      insetBG="bg-black/20"
    >
      <Paragraph className="text-center">
        Leave your details and we’ll call you back shortly.
      </Paragraph>

      <Paragraph bold={"font-medium"} className="text-center mt-1">
        Your information is safe and will only be used for contact purposes.
      </Paragraph>

      {/* <InputField
        label="Name"
        value={name}
        onChange={handleNameChange}
        error={errors.name && "Name is required"}
        placeholder="Your Name"
        type="text"
      />

      <InputField
        label="Email"
        value={email}
        onChange={handleEmailChange}
        error={errors.email && "Please enter a valid email"}
        placeholder="Your Email"
        type="text"
      />

      <InputField
        label="Phone"
        value={phone}
        onChange={handlePhoneChange}
        error={errors.phone && "Please enter a valid 11-digit phone number"}
        placeholder="Phone Number"
        type="text"
      /> */}
    </Modal>
  );
}

export default RequestCallbackModal;
