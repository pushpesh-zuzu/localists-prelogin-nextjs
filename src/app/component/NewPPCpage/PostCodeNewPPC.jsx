"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LocationPinIcon from "../../../../public/ReactIcons/LocationPinIcon";
import GreenCheckIcon from "../common/icons/GreenCheckIcon";
import CardLayoutWrapper from "./CardLayoutWrapper";
import {
    setbuyerRequestData,
    setcitySerach,
    getCityName,
} from "@/lib/store/buyerslice/buyerSlice";
import Paragraph2 from "../UI/Typography/Paragraph2";
import LoaderIndicator from "../common/Loader/LoaderIndicatore";

const PostCodeNewPPC = ({
    onNext,
    title = "What is your postcode",
    prevStep,
    setBackButtonTriggered,
    titleHeading = "fencing companies",
}) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const { buyerRequest } = useSelector((state) => state.buyer);

    const [pincode, setPincode] = useState(buyerRequest?.postal_code || "");
    const [postalCodeValidate, setPostalCodeValidate] = useState(
        !!buyerRequest?.postal_code
    );
    const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);
    const [error, setError] = useState("");

    const handlePincodeChange = async (e) => {
        const value = e.target.value.slice(0, 10);
        setPincode(value);
        setError("");
        setPostalCodeValidate(false);

        if (!value.trim()) return;
        if (value.length < 3) return;

        setIsCheckingPostcode(true);

        try {
            const response = await dispatch(getCityName({ postcode: value }));
            const data = response?.unwrap
                ? await response.unwrap()
                : response;

            if (data?.data?.valid) {
                setPostalCodeValidate(true);
                dispatch(setcitySerach(data.data.city));
                dispatch(
                    setbuyerRequestData({ postal_code: data.data.postcode })
                );
                setError("");
                handleNext(true);
            } else {
                setPostalCodeValidate(false);
                setError("Please enter a valid postcode!");
            }
        } catch {
            setPostalCodeValidate(false);
            setError("Please enter a valid postcode!");
        } finally {
            setIsCheckingPostcode(false);
        }
    };

    const handleNext = (isValid = postalCodeValidate) => {
        if (!pincode.trim()) {
            setError("Please enter a postcode!");
            return;
        }

        if (!isValid) {
            setError("Please enter a valid postcode!");
            return;
        }

        if (onNext) {
            onNext();
            setBackButtonTriggered(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleNext();
    };

    return (
        <div className="max-w-[600px] mx-auto">
            <CardLayoutWrapper
                buttonWrapperClassName="px-[28px] pb-[24px] max-[768px]:px-[16px] max-[768px]:pb-[20px]"
                title={title}
                onButtonClick={handleNext}
                buttonText="Next"
                disableNextButton={!postalCodeValidate}
                showBackButton
                onBackClick={prevStep}
                titlePrimary
                titleHeading={`Get quotes from verified ${titleHeading} you can trust`}
            >
                {/* Sub text */}
                <Paragraph2 className="bg-[#E9F8FF] w-fit mx-auto mb-[25px] px-[10px] py-[5px] rounded-[5px] text-center max-[768px]:mx-[16px]">
                    This is to match you with the closest verified specialists
                </Paragraph2>

                <div className="w-[90%] max-w-[720px] mx-auto">
                    <div className="relative">
                        <input
                            ref={inputRef}
                            value={pincode}
                            onChange={handlePincodeChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Enter Postcode (No Spaces)"
                            className={`
        w-full
        rounded-[8px]
        border
        px-[28px] py-[12px]
        pl-[38px]
        pr-[38px]
        text-[16px] font-medium
        font-[Arial]
        tracking-[-0.03em]
        transition-all duration-300
        placeholder:text-[#959595]
        focus:outline-none
        focus:border-[#00afe3]
        focus:ring-[3px] focus:ring-[rgba(0,150,196,0.1)]
        ${error ? "border-red-500" : "border-[#E1E5E9]"}
        max-[768px]:h-[52px] max-[768px]:text-[15px]
        max-[480px]:h-[48px] max-[480px]:text-[14px]
      `} />

                        {/* Location icon */}
                        <div className="absolute left-[12px] top-1/2 -translate-y-1/2 pointer-events-none">
                            <LocationPinIcon className="h-[16px] w-[16.5px] text-[#00afe3]" />
                        </div>

                        {/* Right icon */}
                        {isCheckingPostcode ? (
                            <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
                                <LoaderIndicator size="small" />
                            </div>
                        ) : postalCodeValidate ? (
                            <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
                                <GreenCheckIcon className="h-[20px] w-[20px]" />
                            </div>
                        ) : null}
                    </div>

                    {error && (
                        <p
                            className="
        mt-[4px]
        text-left
        font-[Arial]
        tracking-[-0.03em]
        text-[12px]
        text-red-500
      ">
                            {error}
                        </p>
                    )}
                </div>
            </CardLayoutWrapper>
        </div>
    );
};

export default PostCodeNewPPC;
