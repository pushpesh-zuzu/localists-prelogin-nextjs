"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
    setbuyerRequestData,
    updateMobile,
} from "@/lib/store/buyerslice/buyerSlice";
import { showToast } from "@/utils";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import FormWrapper from "./FormWrapper";
import Paragraph from "../UI/Typography/Paragraph2";
import H3 from "../UI/Typography/H3";

const ReEnterMobileNumberNewPPC = ({ onClose, setReEnterMobile }) => {
    const dispatch = useDispatch();
    const { requestLoader, buyerRequest, requestUserId } = useSelector(
        (state) => state.buyer
    );

    const [email, setEmail] = useState(buyerRequest?.email || "");
    const [name, setName] = useState(buyerRequest?.name || "");
    const [phone, setPhone] = useState(buyerRequest?.phone || "");

    const [errors, setErrors] = useState({
        email: false,
        name: false,
        phone: false,
    });

    const handlePhoneChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 11) {
            setPhone(value);
            setErrors((prev) => ({ ...prev, phone: false }));
        }
    };

    const handleSubmit = () => {
        const newErrors = {
            email: !email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email),
            name: !name.trim(),
            phone: !phone || !/^\d{11}$/.test(phone),
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(Boolean)) return;
        if (!validateUKPhoneNumber(phone)) return;

        dispatch(setbuyerRequestData({ name, email, phone }));

        const formData = new FormData();
        formData.append("phone", phone);
        formData.append("user_id", requestUserId);

        dispatch(updateMobile(formData)).then((res) => {
            if (res?.success) {
                showToast("success", res?.message || "Phone updated successfully");
                setReEnterMobile(2);
            }
        });
    };

    return (
        <FormWrapper>
            <div
                className="
          relative w-[550px] bg-white rounded-[20px]
          overflow-hidden
          max-lg:w-full max-lg:max-w-[550px] mx-auto
        " >
                {/* Close */}
                <button
                    onClick={onClose}
                    className="
            absolute top-[6px] right-[16px] cursor-pointer
         font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[#253238]
        text-[20px]       
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]
          " >
                    &times;
                </button>

                {/* Header */}
                <div className="px-[27px] py-[24px] text-center">
                    <H3 className="text-[#00afe3] font-black">
                        You are one step away from comparing free quotes
                    </H3>

                    <Paragraph className="mt-[8px] max-w-[70%] mx-auto">
                        Fill out the form and receive quotes from local professionals
                    </Paragraph>
                </div>

                {/* Form */}
                <div className="px-[27px] pb-[27px] mt-[-10px] flex flex-col">
                    <label className="font-bold font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[#253238]
        text-[20px]
        max-[768px]:text-[18px]
        max-[480px]:text-[16px] mt-[14px] mb-[10px]">
                        Full Name *
                    </label>
                    <input
                        value={name}
                        disabled
                        className="px-[16px] py-[14px] border border-[#d9d9d9] rounded-[5px]
                        font-[Arial] text-[16px]
      leading-[18px] tracking-[-0.03px]
        placeholder:!text-[#d9d9d9]
      placeholder:!opacity-100
      placeholder:font-[Arial]
      placeholder:text-[16px]
      placeholder:leading-[18px]
      placeholder:tracking-[-0.03px] text-[#253238]
          disabled:bg-[#f5f5f5]
    disabled:text-[#9ca3af]
    disabled:border-[#d9d9d9]
    disabled:cursor-not-allowed"
                    />

                    <label className="font-bold font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[#253238]
        text-[20px]
        max-[768px]:text-[18px]
        max-[480px]:text-[16px] mt-[14px] mb-[10px]">
                        Email *
                    </label>
                    <input
                        value={email}
                        disabled
                        className="px-[16px] py-[14px] border border-[#d9d9d9]
                        font-[Arial] text-[16px]
         leading-[18px] tracking-[-0.03px]
        placeholder:!text-[#d9d9d9]
      placeholder:!opacity-100
      placeholder:font-[Arial]
      placeholder:text-[16px]
      placeholder:leading-[18px]
      placeholder:tracking-[-0.03px] rounded-[5px] text-[#253238]
    disabled:bg-[#f5f5f5]
    disabled:text-[#9ca3af]
    disabled:border-[#d9d9d9]
    disabled:cursor-not-allowed"
                    />

                    <label className="font-bold font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[#253238]
        text-[20px]
        max-[768px]:text-[18px]
        max-[480px]:text-[16px] mt-[14px] mb-[10px]">
                        Phone Number *
                    </label>
                    <input
                        value={phone}
                        onChange={handlePhoneChange}
                        maxLength={11}
                        placeholder="Enter phone number"
                        className={`
              px-[16px] py-[14px] rounded-[5px]
              border font-[Arial] text-[16px]
      leading-[18px] tracking-[-0.03px]
        placeholder:!text-[#d9d9d9]
      placeholder:!opacity-100
      placeholder:font-[Arial]
      placeholder:text-[16px]
      placeholder:leading-[18px]
      placeholder:tracking-[-0.03px]
              ${errors.phone ? "border-[#FF4D4F]" : "border-[#d9d9d9]"}
            `} />
                    {errors.phone && (
                        <span className="text-red-500 text-[12px] mt-[4px]">
                            Please enter a valid 11-digit phone number
                        </span>
                    )}

                    <button
                        onClick={handleSubmit}
                        disabled={requestLoader}
                        className="
              mt-[27px] py-[12px]
              bg-[#00afe3] text-white
              rounded-[20px] font-bold
              cursor-pointer
              disabled:opacity-60
              hover:bg-[#0096c4]
              transition-colors
              font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]
            "
                    >
                        {requestLoader ? (
                            <Spin indicator={<LoadingOutlined spin />} />
                        ) : (
                            "Continue"
                        )}
                    </button>
                </div>
            </div>
        </FormWrapper>
    );
};

export default ReEnterMobileNumberNewPPC;
