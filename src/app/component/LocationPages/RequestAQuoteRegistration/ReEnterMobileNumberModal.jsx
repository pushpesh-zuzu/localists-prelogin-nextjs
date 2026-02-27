"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import InputField from "../UI/InputField";
import {
    setbuyerRequestData,
    updateMobile,
} from "@/lib/store/buyerslice/buyerSlice";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { showToast } from "@/utils/toaster";
import Paragraph from "@/app/component/UI/Typography/Paragraph";
import { CheckIcon } from "lucide-react";

function ReEnterMobileNumber({ onClose, setReEnterMobile, progressPercent }) {
    const dispatch = useDispatch();
    const { buyerRequest, requestLoader, requestUserId, buyerStep } = useSelector(
        (state) => state.buyer
    );

    const [name, setName] = useState(buyerRequest?.name || "");
    const [email, setEmail] = useState(buyerRequest?.email || "");
    const [phone, setPhone] = useState(buyerRequest?.phone || "");
    const [postcode, setPostcode] = useState(buyerRequest?.postcode || "")

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
                postcode,
            })
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
                postcode,
            })
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
                    postcode
                })
            );
        }
    };

    const handlePostcodeChange = () => {
        setPostcode(e.target.value);
        setErrors((prev) => ({ ...prev, postcode: "" }));
        dispatch(
            setbuyerRequestData({
                ...buyerRequest,
                name,
                email,
                phone,
                postcode: e.target.value,
            })
        );
    }

    const handleSubmit = () => {
        const newErrors = {
            email: !email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
            name: !name.trim(),
            phone: !phone || !/^\d{11}$/.test(phone),
            postcode: !postcode,
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

        dispatch(setbuyerRequestData({ name, email, phone, postcode }));

        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("user_id", requestUserId);

        dispatch(updateMobile(formData)).then((result) => {
            if (result?.success) {
                showToast(
                    "success",
                    result?.message || "Phone number updated successfully"
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

    useEffect(() => {
        dispatch(setbuyerRequestData({ name, email, phone, postcode }));
    }, []);

    return (
        <Modal
            onClose={handleCloseClick}
            isOpen={true}
            title=""
            onNext={handleSubmit}
            maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
            maxHeight="max-h-[100vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
            buttongroup="lg:mx-[75.4px] md:mx-[63px] mx-[18px]"
            showProgressBar={true}
            buyerStep={buyerStep}
            progressPercent={progressPercent}
        >
            <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                <div className="lg:pt-[40px] lg:pb-[30px] pt-[20px] pb-[20px] md:pt-[30px] md:pb-[20px] text-center">
                    <Paragraph variant="optional" bold={"font-black"}>
                        Your phone number and email are safe with us.
                    </Paragraph>
                    <Paragraph className="font-medium pt-1">
                        We'll only use them to help you connect with trusted, verified
                        professionals.
                    </Paragraph>
                </div>

                {/* EXACTLY SAME Input Fields */}
                <InputField
                    label="Name"
                    value={name}
                    onChange={handleNameChange}
                    error={errors.name && "Please enter a name"}
                    placeholder="Your Name"
                    type={inputType}
                    disabled={true}
                    labelClass="text-base text-[20px] mb-3"
                />

                <InputField
                    label="Email"
                    type={inputType}
                    value={email}
                    onChange={handleEmailChange}
                    error={errors.email && "Please enter a valid email address"}
                    placeholder="Your Email"
                    disabled={true}
                />

                <InputField
                    label="Phone"
                    type={inputType}
                    value={phone}
                    onChange={handlePhoneChange}
                    error={errors.phone && "Please enter a valid 11-digit phone number"}
                    placeholder="Phone Number"
                />

                <div className="mt-4 relative">
                    <InputField
                        label="Postcode"
                        type={inputType}
                        placeholder="Enter Postcode (No Spaces)"
                        value={postcode}
                        onChange={handlePostcodeChange}
                        error={errors.postcode && "Please enter a valid postcode"}
                        disabled={true}
                    />
                    <CheckIcon
                        size={22}
                        color="white"
                        className="absolute top-10.5 right-3 p-1 bg-green-500 rounded-full text-white"
                    />
                </div>

            </div>
        </Modal>
    );
}

export default ReEnterMobileNumber;
