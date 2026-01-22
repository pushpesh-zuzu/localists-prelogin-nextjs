"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../common/Modal";
import InputField from "../UI/Inputs/InputField";
import { useSearchParams } from "next/navigation";
import {
    checkEmailIdApi,
    setbuyerRequestData,
    registerQuoteCustomer
} from "@/lib/store/buyerslice/buyerSlice";
import { validateEmail } from "@/utils/validateEmail";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useEmailCheck } from "@/hooks/emailExist";
import useUserInfo from "@/utils/getUserIp";
import { getBarkToken } from "@/utils/CookiesHelper";
import Paragraph from "../UI/Typography/Paragraph2";

function EmailMatch({
    onClose,
    nextStep,
    setEmails,
    setShowConfirmModal,
    resetTrigger,
    isStartWithQuestionModal = false,
    isPPCPages = false,
    hideCloseButton = false,

}) {
    const dispatch = useDispatch();
    const { buyerRequest, citySerach, requestLoader } = useSelector(
        (state) => state.buyer
    );
    const { search } = useSearchParams();
    const params = new URLSearchParams(search);
    const { ip, url } = useUserInfo();
    const campaignid = params.get("campaignid");
    const keyword = params.get("keyword");
    const gclid = params.get("gclid");
    const campaign = params.get("utm_campaign");
    const adGroup = params.get("AgId");
    const targetID = params.get("utm_term");
    const msclickid = params.get("utm_msclkid");
    const utm_source = params.get("utm_source");

    const [name, setName] = useState(buyerRequest?.name || "");
    const [email, setEmail] = useState(buyerRequest?.email || "");
    const [phone, setPhone] = useState(buyerRequest?.phone || "");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const { isEmailAvailable } = useEmailCheck(email);
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
            })
        );
    };

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            setPhone(value);
            setErrors((prev) => ({ ...prev, phone: "" }));
            dispatch(
                setbuyerRequestData({ ...buyerRequest, name, email, phone: value })
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
            formData.append("adgroup", adGroup || "");
            formData.append("targetid", targetID || "");
            formData.append("msclickid", msclickid || "");
            formData.append("utm_source", utm_source || "");
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
        <div >
            <Modal
                onClose={() => { handleCloseClick() }}
                isOpen={true}
                title="YOU ARE ONLY ONE STEP FROM COMPARING FREE QUOTES!"
                titleClassName="text-[#253238]"
                onNext={handleSubmit}
                maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
                maxHeight="max-h-[80vh] lg:max-h-[90vh]"
                padding="px-3 py-4 md:px-7.5 md:pt-3 pb-6"
                radius="rounded-[10px]"
            >
                <Paragraph className="text-center">
                    Your phone number and email are safe with us.
                </Paragraph>
                <Paragraph bold={'font-medium'} className="text-center mt-1 sm:mt-0">
                    We'll only use them to help you connect with trusted, verified
                    professionals.
                </Paragraph>
                <div className="[&_label]:text-left [&_label]:block">
                    <InputField
                        label="Name"
                        value={name}
                        onChange={handleNameChange}
                        error={errors.name && "Name is required"}
                        placeholder="Your Name"
                        type={inputType}
                    />
                </div>

                {!isPPCPages && (
                    <div className="[&_label]:block [&_label]:text-left">
                        <InputField
                            label="Email"
                            value={email}
                            onChange={handleEmailChange}
                            error={errors.email && "Please enter a valid email address."}
                            placeholder="Your Email"
                        />
                    </div>
                )}
                <div className="[&_label]:block [&_label]:text-left">
                    <InputField
                        label="Phone"
                        value={phone}
                        onChange={handlePhoneChange}
                        error={errors.phone && "Please enter a valid 11-digit phone number."}
                        placeholder="Phone Number"
                    />
                </div>
            </Modal>
        </div>
    );
}

export default EmailMatch;
