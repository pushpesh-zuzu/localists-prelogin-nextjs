"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Modal from "../Modal";
import InputField from "../UI/InputField";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { getBarkToken } from "@/utils/CookiesHelper";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";

function PhoneNumber({
    onClose,
    nextStep,
    setShowConfirmModal,
    progressPercent,
    previousStep,
}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { buyerStep, buyerRequest, requestLoader } = useSelector(
        (state) => state.buyer,
    );

    const [phone, setPhone] = useState(buyerRequest?.phone || "");
    const inputType = "text";
    const [errors, setErrors] = useState({
        phone: false,
    });

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 11) {
            setPhone(value);
            setErrors((prev) => ({ ...prev, phone: "" }));
            dispatch(
                setbuyerRequestData({
                    ...buyerRequest,
                    phone: value,
                }),
            );
        }
    };

    const handleSubmit = () => {
        const canContinue = checkAuthenticatedUser(router);
        if (!canContinue) return;

        const newErrors = {
            phone: !phone || !/^\d{11}$/.test(phone),
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((error) => error);
        if (hasError) return;

        if (!validateUKPhoneNumber(phone)) {
            return;
        }

        dispatch(
            setbuyerRequestData({
                ...buyerRequest,
                phone,
            }),
        );
        nextStep();
    };

    const handleCloseClick = () => {
        dispatch(setbuyerRequestData({ ...buyerRequest, phone }));

        if (!getBarkToken()) {
            setShowConfirmModal?.(true);
        } else {
            onClose?.();
        }
    };

    return (
        <Modal
            onClose={handleCloseClick}
            isOpen={true}
            title="Your Phone Number"
            onNext={handleSubmit}
            maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
            maxHeight="max-h-[90vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
            disabled={requestLoader}
            buyerStep={buyerStep}
            fixedHeight={true}
            showProgressBar={true}
            titleClassName="text-left"
            buttongroup="lg:mx-[75.4px] md:mx-[63px] mx-[18px]"
            progressPercent={progressPercent}
            marginTop="lg:mt-[10vh] mt-[5vh]"
            onBack={previousStep}
        >
            <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                <InputField
                    label="Phone"
                    type={inputType}
                    value={phone}
                    onChange={handlePhoneChange}
                    error={errors.phone && "Please enter a valid 11-digit phone number"}
                    placeholder="Phone Number"
                    labelClass="text-base text-[20px] mb-3"
                />
            </div>
        </Modal>
    );
}

export default PhoneNumber;
