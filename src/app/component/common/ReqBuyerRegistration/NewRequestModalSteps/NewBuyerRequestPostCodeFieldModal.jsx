"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { CheckIcon } from "lucide-react";
// import Modal from "../Modal";
// import InputField from "../UI/InputField";
import {
    getCityName,
    setbuyerRequestData,
    setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import LoaderIndicator from "../../../common/Loader/LoaderIndicatore";
import RequestBuyerModal from "../../../common/ReqBuyerRegistration/Modal/RequestBuyerModal";
import RequestInputField from "../../../common/ReqBuyerRegistration/UI/RequestInputField";

function NewBuyerRequestPostCodeFieldModal({
    onClose,
    nextStep,
    setShowConfirmModal,
    serviceId,
    progressPercent,
    previousStep,
}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { buyerStep, buyerRequest } = useSelector((state) => state.buyer);

    const [postcode, setPostcode] = useState(buyerRequest?.postcode || "");
    const [city, setCity] = useState("");
    const [checkingPostcode, setCheckingPostcode] = useState(false);
    const [postalCodeValidate, setPostalCodeValidate] = useState(
        Boolean(buyerRequest?.postcode),
    );
    const [errors, setErrors] = useState({
        postcode: false,
    });

    const inputType = "text";

    const handlePostcodeChange = async (e) => {
        const value = e.target.value.trim().toUpperCase().slice(0, 10);
        setPostcode(value);
        setPostalCodeValidate(false);

        if (!value) {
            setCity("");
            setErrors((prev) => ({ ...prev, postcode: "" }));
            dispatch(setbuyerRequestData({ ...buyerRequest, postcode: "" }));
            return;
        }

        if (value.length < 3) {
            setErrors((prev) => ({ ...prev, postcode: "" }));
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
                    }),
                );
            } else {
                setPostalCodeValidate(false);
                setErrors((prev) => ({ ...prev, postcode: true }));
                dispatch(setbuyerRequestData({ ...buyerRequest, postcode: "" }));
            }
        } catch (err) {
            setPostalCodeValidate(false);
            setErrors((prev) => ({ ...prev, postcode: true }));
            dispatch(setbuyerRequestData({ ...buyerRequest, postcode: "" }));
        } finally {
            setCheckingPostcode(false);
        }
    };

    const handleSubmit = () => {
        const canContinue = checkAuthenticatedUser(router);
        if (!canContinue) return;

        const newErrors = {
            postcode: !postalCodeValidate,
        };

        setErrors(newErrors);

        if (newErrors.postcode) return;

        dispatch(
            setbuyerRequestData({
                ...buyerRequest,
                postcode,
                service_id: serviceId || buyerRequest?.service_id,
            }),
        );
        nextStep();
    };

    const handleCloseClick = () => {
        if (!getBarkToken()) {
            dispatch(
                setbuyerRequestData({
                    ...buyerRequest,
                    postcode,
                    service_id: serviceId || buyerRequest?.service_id,
                }),
            );
            setShowConfirmModal?.(true);
        } else {
            onClose?.();
        }
    };

    return (
        <RequestBuyerModal
            onClose={handleCloseClick}
            isOpen={true}
            title="Your Postcode"
            onNext={handleSubmit}
            padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
            disabled={checkingPostcode}
            buyerStep={buyerStep}
            fixedHeight={true}
            minHeight="min-h-[300px]"
            showProgressBar={true}
            titleClassName="text-left"
            progressPercent={progressPercent}
            onBack={previousStep}
            onBackDisable
        >
            <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                <div className="relative">
                    <RequestInputField
                        label="Postcode"
                        type={inputType}
                        placeholder="Enter Postcode (No Spaces)"
                        value={postcode}
                        onChange={handlePostcodeChange}
                        error={errors.postcode && "Please enter a valid postcode"}
                        labelClass="text-base text-[20px] mb-3"
                    />
                    {checkingPostcode ? (
                        <div className="absolute top-10.5 right-3">
                            <LoaderIndicator size="small" />
                        </div>
                    ) : postalCodeValidate && postcode ? (
                        <CheckIcon
                            size={22}
                            color="white"
                            className="absolute top-10.5 right-3 p-1 bg-green-500 rounded-full text-white"
                        />
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </RequestBuyerModal>
    );
}

export default NewBuyerRequestPostCodeFieldModal;
