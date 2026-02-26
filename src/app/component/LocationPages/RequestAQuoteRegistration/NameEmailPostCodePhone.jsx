"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import InputField from "../UI/InputField";
import { useRouter, useSearchParams } from "next/navigation";
import {
    checkEmailIdApi,
    setbuyerRequestData,
    getCityName,
    setcitySerach,
    registerQuoteCustomer
} from "@/lib/store/buyerslice/buyerSlice";
import { validateEmail } from "@/utils/validateEmail";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useEmailCheck } from "@/hooks/emailExist";
import useUserInfo from "@/utils/getUserIp";
import { getBarkToken } from "@/utils/CookiesHelper";
import { extractAllParams } from "@/utils/decodeURLParams";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { CheckIcon } from "lucide-react";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";

function NameEmailPostCodePhone({
    onClose,
    nextStep,
    setEmails,
    setShowConfirmModal,
    isStartWithQuestionModal = false,
    isPPCPages = false,
    serviceId,
    progressPercent
}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { buyerStep, buyerRequest, citySerach, requestLoader } = useSelector(
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
    const emailCooldownRef = useRef(false);
    const [name, setName] = useState(buyerRequest?.name || "");
    const [email, setEmail] = useState(buyerRequest?.email || "");
    const [phone, setPhone] = useState(buyerRequest?.phone || "");
    const [postcode, setPostode] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const { isEmailAvailable, isChecking } = useEmailCheck(email);
    const [inputType, setInputType] = useState("text");
    const [city, setCity] = useState("");
    const [checkingPostcode, setCheckingPostcode] = useState(false);
    const [postalCodeValidate, setPostalCodeValidate] = useState(false);


    const [errors, setErrors] = useState({
        email: false,
        name: false,
        phone: false,
        postcode: false
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

    const handlePostcodeChange = async (e) => {
        const value = e.target.value.trim().slice(0, 10);
        setPostode(value);
        setPostalCodeValidate(false);

        if (!value) {
            setCity("");
            setErrors((prev) => ({ ...prev, postcode: "" }));
            return;
        }

        if (value.length < 3) {
            setPostalCodeValidate(false);
            return;
        }

        setCheckingPostcode(true);

        try {
            const response = await dispatch(getCityName({ postcode: value }));
            const result = response?.unwrap ? await response.unwrap() : response;

            if (result?.data?.valid) {
                setPostalCodeValidate(true);
                setCity(result.data.city);
                setErrors((prev) => ({ ...prev, postcode: false }));

                dispatch(setcitySerach(result.data.city));
                dispatch(
                    setbuyerRequestData({
                        ...buyerRequest,
                        postcode: result.data.postcode,
                    })
                );
            } else {
                setPostalCodeValidate(false);
                setErrors((prev) => ({ ...prev, postcode: true }));
            }
        } catch (err) {
            setPostalCodeValidate(false);
            setErrors((prev) => ({ ...prev, postcode: true }));
        } finally {
            setCheckingPostcode(false);
        }
    };

    const handleSubmit = () => {
        const canContinue = checkAuthenticatedUser(router);
        if (!canContinue) return;
        const newErrors = {
            email: !isPPCPages && (!email || !validateEmail(email)),
            name: !name.trim(),
            phone: !phone || !/^\d{11}$/.test(phone),
            postcode: !postalCodeValidate,
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

        dispatch(setbuyerRequestData({ name, email: finalEmail, phone, postcode }));
        const updatedAnswers = buyerRequest?.questions || [];

        if (isStartWithQuestionModal) {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", finalEmail);
            formData.append("phone", phone);
            formData.append("questions", JSON.stringify(updatedAnswers));
            formData.append("service_id", serviceId || buyerRequest?.service_id || "");
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
            if (!isPPCPages) {
                formData.append("quote_type", "req call back");
            }
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
                postcode: postcode
            });
        }
    };
    const handleCloseClick = () => {
        if (!getBarkToken()) {
            dispatch(setbuyerRequestData({ name, email, phone, postcode, service_id: serviceId }));
            setShowConfirmModal(true);
        } else {
            onClose();
        }
    };

    useEffect(() => {
        dispatch(setbuyerRequestData({ name, email, phone, postcode }));
    }, []);
    return (
        <Modal
            onClose={() => {
                handleCloseClick();
            }}
            isOpen={true}
            title="Your Details"
            onNext={handleSubmit}
            maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
            maxHeight="max-h-[80vh] lg:max-h-[90vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[40px]"
            disabled={isChecking}
            buyerStep={buyerStep}
            fixedHeight={true}
            showProgressBar={true}
            titleClassName="text-left"
            buttongroup="md:mx-[68.4px] mx-4"
            progressPercent={progressPercent}
        >
            <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                <InputField
                    label="Full Name"
                    value={name}
                    onChange={handleNameChange}
                    error={errors.name && "Please enter a name"}
                    placeholder="Your Name"
                    type={inputType}
                    labelClass="text-base text-[20px] mb-3"
                />
                {!isPPCPages && (
                    <InputField
                        label="Email"
                        type={inputType}
                        value={email}
                        onChange={handleEmailChange}
                        // onBlur={handleEmailBlur}
                        error={errors.email && "Please enter a valid email address"}
                        placeholder="Your Email"
                    />
                )}
                <InputField
                    label="Phone"
                    type={inputType}
                    value={phone}
                    onChange={handlePhoneChange}
                    error={errors.phone && "Please enter a valid 11-digit phone number"}
                    placeholder="Phone Number"
                />
                {/* Postcode Input */}
                <div className="mt-4 relative">
                    <InputField
                        label="Postcode"
                        type={inputType}
                        placeholder="Enter Postcode (No Spaces)"
                        value={postcode}
                        onChange={handlePostcodeChange}
                        error={errors.postcode && "Please enter a valid postcode"}
                    />
                    {checkingPostcode ? (
                        <div className="absolute top-13 right-3">
                            <LoaderIndicator size="small" />
                        </div>
                    ) : postalCodeValidate && city ? (
                        <CheckIcon
                            size={26}
                            color="white"
                            className="absolute top-13 right-3 p-1 bg-green-500 rounded-full text-white"
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </Modal>
    );
}

export default NameEmailPostCodePhone;
