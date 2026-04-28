"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import { validateEmail } from "@/utils/validateEmail";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useEmailCheck } from "@/hooks/emailExist";
import { getBarkToken } from "@/utils/CookiesHelper";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import RequestInputField from "../UI/RequestInputField";
import RequestBuyerModal from "../Modal/RequestBuyerModal";

function NewBuyerRequestNameEmail({
  onClose,
  nextStep,
  setEmails,
  setShowConfirmModal,
  isPPCPages = false,
  progressPercent,
  previousStep,
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { buyerStep, buyerRequest } = useSelector((state) => state.buyer);
  const emailCooldownRef = useRef(false);
  const unavailableEmailClearedRef = useRef(false);

  const [name, setName] = useState(buyerRequest?.name || "");
  const [email, setEmail] = useState(buyerRequest?.email || "");
  const [isRejectedEmail, setIsRejectedEmail] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable, isChecking } = useEmailCheck(email);
  const inputType = "text";
  const [errors, setErrors] = useState({
    email: false,
    name: false,
  });

  useEffect(() => {
    if (isEmailAvailable) {
      unavailableEmailClearedRef.current = false;
      return;
    }

    if (
      unavailableEmailClearedRef.current ||
      (!email && !buyerRequest?.email)
    ) {
      return;
    }

    unavailableEmailClearedRef.current = true;
    const timer = setTimeout(() => {
      setEmail("");
      setIsRejectedEmail(true);
      setErrors((prev) => ({ ...prev, email: true }));
    }, 0);

    dispatch(setbuyerRequestData({ ...buyerRequest, email: "" }));

    return () => clearTimeout(timer);
  }, [buyerRequest, dispatch, email, isEmailAvailable]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: "" }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name: e.target.value,
        email,
      }),
    );
  };

  const handleEmailChange = (e) => {
    if (emailCooldownRef.current) return;

    const canContinue = checkAuthenticatedUser(router);

    if (!canContinue) {
      emailCooldownRef.current = true;
      setTimeout(() => {
        emailCooldownRef.current = false;
      }, 2000);
      return;
    }

    setEmail(e.target.value);
    setIsRejectedEmail(false);
    setErrors((prev) => ({ ...prev, email: "" }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name,
        email: e.target.value,
      }),
    );
  };

  const handleSubmit = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    const newErrors = {
      email:
        !isPPCPages &&
        (!email ||
          !validateEmail(email) ||
          isRejectedEmail ||
          !isEmailAvailable),
      name: !name.trim(),
    };

    if (!isPPCPages && newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((error) => error);
    if (hasError) return;

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;

    if (!isPPCPages && setEmails) {
      setEmails(finalEmail);
    }

    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name,
        email: finalEmail,
      }),
    );
    nextStep();
  };

  const handleCloseClick = () => {
    dispatch(setbuyerRequestData({ ...buyerRequest, name, email }));

    if (!getBarkToken()) {
      setShowConfirmModal?.(true);
    } else {
      onClose?.();
    }
  };

  return (
    <RequestBuyerModal
      onClose={handleCloseClick}
      isOpen={true}
      title="Your Details"
      onNext={handleSubmit}
      disabled={isChecking}
      buyerStep={buyerStep}
      fixedHeight={true}
      showProgressBar={true}
      titleClassName="text-left"
      progressPercent={progressPercent}
      marginTop="lg:mt-[10vh] mt-[5vh]"
      // onBack={previousStep}
      minHeight="min-h-[300px]  md:min-h-[300px]"
      onBackDisable
    >
      <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
        <RequestInputField
          label="Full Name"
          value={name}
          onChange={handleNameChange}
          error={errors.name && "Please enter a name"}
          placeholder="Your Name"
          type={inputType}
          labelClass="text-base text-[20px] mb-3"
        />
        {!isPPCPages && (
          <RequestInputField
            label="Email"
            type={inputType}
            value={email}
            onChange={handleEmailChange}
            error={errors.email && "Please enter a valid email address"}
            placeholder="Your Email"
          />
        )}
      </div>
    </RequestBuyerModal>
  );
}

export default NewBuyerRequestNameEmail;
