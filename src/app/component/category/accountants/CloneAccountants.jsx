"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getPopularServiceList,
    searchService,
    setService,
} from "@/lib/store/findjobslice";
import {
    questionAnswerData,
    setbuyerRequestData,
    setBuyerStep,
    setcitySerach,
    getCityName,
} from "@/lib/store/buyerslice/buyerSlice";
import H1 from "@/app/component/UI/Typography/H1";
import Paragraph1 from "@/app/component/UI/Typography/Paragraph1";
import GreenCheckIcon from "../../common/icons/GreenCheckIcon";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import BuyerRegistration from "../../common/BuyerRegistration/BuyerRegistration";
import { showToast } from "@/utils/toaster";
import Image from "next/image";
import { getBarkToken, getBarkUserData } from "@/utils/CookiesHelper";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import Paragraph from "../../UI/Typography/Paragraph";


const CloneAccountants = ({
    header,
    title,
    panelImage,
    defaultServiceName = "",
    heading2,
    placeholderText,
    doYouNeetTitle = [],
    inputLable1 = "What service do you require?",
    inputLable2 = "Tell us where you need it?",
}) => {
    const dispatch = useDispatch();
    const inputRef = useRef(null);

    const [input, setInput] = useState("");
    const [pincode, setPincode] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [postalCodeValidate, setPostalCodeValidate] = useState(false);
    const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);

    const { service, searchServiceLoader } = useSelector(
        (state) => state.findJobs
    );

    useEffect(() => {
        if (defaultServiceName) {
            setInput(defaultServiceName);
            setIsDropdownOpen(false);
            dispatch(searchService({ search: defaultServiceName }));
        }
    }, [defaultServiceName, dispatch]);


    useEffect(() => {
        if (service?.length) {
            const match = service.find(
                (s) => s.name.trim().toLowerCase() === input.trim().toLowerCase()
            );

            if (match) {
                setSelectedService(match);
                setIsDropdownOpen(false);
            } else {
                setSelectedService(null);
            }
        }
    }, [service, input]);

    const handleClose = () => {
        setShowModal(false);
        setInput("");
        setPincode("");
        setSelectedService(null);
        setPostalCodeValidate(false);
    };

    useEffect(() => {
        dispatch(getPopularServiceList());
        return () => dispatch(setService([]));
    }, [dispatch]);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            if (isDropdownOpen && input.trim()) {
                dispatch(searchService({ search: input }));
            }
        }, 500);
        return () => clearTimeout(delayDebounce);
    }, [input, isDropdownOpen, dispatch]);

    const handleSelectService = useCallback(
        (item) => {
            setInput(item.name);
            setSelectedService(item);
            setIsDropdownOpen(false);
            setTimeout(() => dispatch(setService([])), 100);
        },
        [dispatch]
    );

    useEffect(() => {
        const checkPendingModal = () => {
            const pendingModal = JSON.parse(
                localStorage.getItem("pendingBuyerModal")
            );

            if (pendingModal?.shouldOpen) {
                setSelectedService({
                    id: pendingModal.serviceId,
                    name: pendingModal.serviceName || "Service",
                });

                dispatch(setbuyerRequestData(pendingModal.buyerRequest));
                dispatch(setcitySerach(pendingModal.city));

                setShowModal(true);
                dispatch(setBuyerStep(7));
            }
        };

        checkPendingModal();
    }, [dispatch]);

    const handlePincodeChange = async (e) => {
        const value = e.target.value.trim().slice(0, 10);
        setPincode(value);
        setPostalCodeValidate(false);
        // console.log("sssssssssssss", value)
        // setIsPostcodeSelected(false);
        // setIsPincodeFromDropdown(false);
        // setCity("");

        if (value.length < 3) return;

        setIsCheckingPostcode(true);
        try {
            const response = await dispatch(getCityName({ postcode: value }));
            const res = response?.unwrap ? await response.unwrap() : response;

            if (res?.data?.city) {
                setPostalCodeValidate(true);
                // setIsPostcodeSelected(true);
                // setIsPincodeFromDropdown(true);
                // setCity(res.data.city);

                dispatch(setcitySerach(res.data.city));
                dispatch(
                    setbuyerRequestData({
                        postcode: value.toUpperCase(),
                        city: res.data.city,
                    })
                );
            } else {
                setPostalCodeValidate(false);
                showToast("error", "Please enter a valid postcode!");
            }

        } catch {
            showToast("error", "Please enter a valid postcode!");
        } finally {
            setIsCheckingPostcode(false);
        }
    };

    const handleContinue = () => {
        if (!selectedService)
            return showToast("error", "Please select a service from the suggestions.");

        if (!postalCodeValidate)
            return showToast("error", "Please enter a valid postcode.");

        if (getBarkUserData()?.active_status === 1) {
            showToast("error", "You are not a buyer.");
            return;
        }


        dispatch(questionAnswerData({ service_id: selectedService.id }));
        dispatch(
            setbuyerRequestData({
                postcode: pincode,
                service_id: selectedService.id,
            })
        );
        setShowModal(true);
    };


    return (
        <div
            className="relative bg-cover bg-center bg-no-repeat
    h-auto
    flex flex-col items-center justify-center
    py-[50.5px] px-[208px]
    max-[1280px]:px-[100px]
    max-[980px]:py-[45.5px] max-[980px]:px-[50px]
    max-[480px]:py-[20px] max-[480px]:px-[10px]"
            style={{ backgroundImage: `url(${panelImage?.src})` }}
        >
            <CloseBrowserAbandon />

            <WrapperBGWidth>

                <div className="relative flex flex-col items-center justify-center">
                    <div className="text-center ">
                        <H1 className="text-white">
                            Looking For{" "}
                            <span className="text-[#00afe3]">{header}</span> {heading2 || ""} Near
                            You?
                        </H1>
                    </div>

                    <div className="w-full xl:w-[1024px] bg-white/90 rounded-[20px] px-[30px] py-[35px] flex flex-col justify-center items-center mt-[20px] lg:mt-10px lg:mt-[22px]">
                        <p
                            className=" font-bold text-[24px] leading-[100%] text-[#000] text-center"
                        >
                            {doYouNeetTitle[0]}{" "}
                            <span className="text-[#00afe3]">
                                {doYouNeetTitle[1]?.toLowerCase()}
                            </span>{" "}
                            {doYouNeetTitle[2]}?
                        </p>

                        <form role="search" className="flex flex-col justify-between  mt-[35px] w-full">
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col lg:flex-row gap-[18px] w-full">
                                    <div className="flex flex-col flex-1 text-left relative">
                                        <label htmlFor="service" className="font-bold text-[20px] leading-[100%] tracking-[-0.03em] text-black font-[Arial] mb-[7px]">
                                            {inputLable1}
                                        </label>

                                        <input
                                            type="text"
                                            placeholder={placeholderText}
                                            value={input}
                                            onChange={(e) => {
                                                setInput(e.target.value);
                                                setIsDropdownOpen(!!e.target.value);
                                                setSelectedService(null);
                                            }}
                                            className="font-[Arial] font-bold bg-white !text-black border border-[#D9D9D9] rounded-[10px] pl-[12px] md:pl-[16px] leading-[100%] pr-[22px] pt-[13px] pb-[13px] w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)] placeholder:text-[#959595]"
                                        />

                                        {isDropdownOpen && service?.length > 0 && (
                                            <div className="absolute top-full w-full md:w-[100%] lg:max-w-[410px] bg-white border border-[#ddd] rounded-[4px] max-h-[200px] overflow-y-auto z-10">
                                                {searchServiceLoader ? (
                                                    <div className="flex items-center gap-2 p-2 text-sm text-gray-500">
                                                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#00AFE3] border-t-transparent" />
                                                    </div>
                                                ) : (
                                                    service.map((item) => (
                                                        <p
                                                            key={item.id}
                                                            onClick={() => handleSelectService(item)}
                                                            className="text-black font-bold text-center px-2 py-2 text-[16px] cursor-pointer border-b border-[#eee] hover:bg-[#f0f0f0]"
                                                        >
                                                            {item.name}
                                                        </p>
                                                    ))
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col flex-1 text-left relative">
                                        <label htmlFor="postcode" className="font-bold text-[20px]  leading-[100%] tracking-[-0.03em] text-black font-[Arial] mb-[7px]">
                                            {inputLable2}
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Postcode"
                                            value={pincode}
                                            onChange={handlePincodeChange}
                                            className="font-[Arial] font-bold bg-white !text-black border border-[#D9D9D9] leading-[100%] rounded-[10px] pl-[12px] md:pl-[16px] pr-[22px] pt-[13px] pb-[13px] w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)]  [&::placeholder]:text-[#959595] [&::placeholder]:opacity-100"

                                        />
                                        {isCheckingPostcode ? (
                                            <span
                                                aria-hidden="true"
                                                className="absolute right-[10px] top-[70%] -translate-y-1/2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#00AFE3] border-t-transparent"
                                            />
                                        ) : postalCodeValidate ? (
                                            <div aria-hidden="true" className="absolute right-[10px] top-[51%]">
                                                <GreenCheckIcon />
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>

                                <button type="button" aria-haspopup="dialog" className="py-[13px] px-[33px] gap-[9.49px] rounded-[100px] bg-[#00afe3] text-white text-[16px] lg:text-[18px] leading-[100%] font-[Arial] font-bold tracking-[-0.03em] shadow-[0px_1.9px_1.9px_rgba(0,0,0,0.1)] mt-[30px] cursor-pointer hover:bg-[#0096c4]"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </WrapperBGWidth>
            {showModal &&
                (getBarkUserData()?.active_status === 2 || !getBarkToken()) && (
                    <BuyerRegistration
                        closeModal={handleClose}
                        service_Id={selectedService?.id}
                        service_Name={selectedService?.name}
                        postcode={pincode}
                        postalCodeValidate={postalCodeValidate}
                    />
                )}
        </div>
    );
};

export default CloneAccountants;
