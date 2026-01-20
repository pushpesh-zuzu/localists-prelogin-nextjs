"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
    addDetailsRequestData,
    addImageSubmittedData,
    clearSetbuyerRequestData,
    setQualityData,
    textQualityData,
} from "@/lib/store/buyerslice/buyerSlice";
import { showToast } from "@/utils";
import { useRouter } from "next/navigation";
import PlusIcon from "../../../../public/icons/PlusIcon.svg";
import CheckIcon from "../../../../public/icons/CheckIcon.svg";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import H5 from "../UI/Typography/H5";

const DescribeYourRequestNewPPC = () => {
    const [text, setText] = useState("");
    const [files, setFiles] = useState([]);
    const [professionalLetin, setProfessionalLetin] = useState(false);
    const [textError, setTextError] = useState(false);
    const [fileError, setFileError] = useState(false);

    const { requestId, qualityData, addDetailLoader } = useSelector(
        (state) => state.buyer
    );

    const dispatch = useDispatch();
    const router = useRouter();

    /* 🔹 Quality debounce */
    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim()) dispatch(textQualityData({ text }));
        }, 500);
        return () => clearTimeout(timer);
    }, [text, dispatch]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        if (!selectedFiles.length) {
            setFileError(true);
            return;
        }

        setFiles(selectedFiles);
        setFileError(false);

        const formData = new FormData();
        formData.append("request_id", requestId);
        selectedFiles.forEach((file) => formData.append("image_file", file));

        dispatch(addImageSubmittedData(formData));
    };

    const handleSubmit = () => {
        const payload = {
            request_id: requestId,
            details: text,
            professional_letin: professionalLetin ? 1 : 0,
        };

        dispatch(addDetailsRequestData(payload, router, requestId)).then((res) => {
            if (res?.success) {
                showToast("success", res?.message || "Request submitted successfully");
                localStorage.setItem("isRegistrationComplete", "true");
                dispatch(clearSetbuyerRequestData());
                dispatch(clearBuyerRegisterFormData());
                dispatch(setQualityData());
                localStorage.removeItem("pendingBuyerModal");
            }
        });
    };

    return (
        <div className="relative p-[24px] max-w-[500px] mx-auto bg-white">
            {/* Success */}
            <div className="flex items-center justify-center gap-[6px] font-[Arial]
        tracking-[-0.03em] text-[#00afe3] text-[16px] leading-[18px] font-medium mb-[10px] max-sm:text-[13px]">
                <Image src={CheckIcon} alt="success" width={20} height={20} />
                <span>Your request has been submitted</span>
            </div>

            {/* Header */}
            <div className="text-center mb-[6px]">
                <H5 className="text-[#253238] font-bold">
                    Tell us more about what you need for better responses
                </H5>
            </div>

            <p className="text-center text-[#828282] font-[Arial]
        tracking-[-0.03em] text-[16px] leading-[18px] font-medium max-sm:text-[14px]">
                The more information you provide, the quicker and more accurately
                professionals can respond
            </p>

            {/* Textarea */}
            <textarea
                value={text}
                onChange={(e) => {
                    setText(e.target.value);
                    setTextError(false);
                }}
                placeholder="What should the professional know to better understand your request?"
                className={`
          w-full mt-[10px] p-[14px]
          border rounded-[5px]
          font-[Arial]
        tracking-[-0.03em] leading-[18px]
          text-[14px] resize-none
          ${textError ? "border-red-500" : "border-[#d9d9d9]"}
          placeholder:font-[Arial]
          max-sm:text-[12px] max-sm:h-[80px]
        `}
            />

            {textError && (
                <span className="text-red-500 text-[14px] font-[Arial]
        tracking-[-0.03em] block mt-[4px] leading-[16px]">
                    Please fill this input field.
                </span>
            )}

            {/* Upload */}
            <label
                className={`
          mt-[11px] flex items-center justify-center gap-[8px]
          bg-[#e6f7ff] text-[#00afe3]
          px-[12px] py-[8px]
          font-[Arial]
        tracking-[-0.03em] leading-[16px]
          cursor-pointer text-[12px] font-medium
          ${fileError ? "border border-red-500" : ""}
          hover:bg-[#d4ebff]
        `}
            >
                <Image src={PlusIcon} alt="upload" width={16} height={16} />
                <span>Upload photos or files (optional)</span>
                <input
                    type="file"
                    multiple
                    hidden
                    accept="image/png,image/jpg,image/jpeg"
                    onChange={handleFileChange}
                />
            </label>

            <p className="text-[12px] font-[Arial]
        tracking-[-0.03em] leading-[16px] text-[#d9d9d9] text-left mt-[4px]">
                Image (jpeg, jpg, png) file can be uploaded
            </p>

            {/* Files */}
            {files.length > 0 && (
                <ul className="mt-[10px] space-y-[5px]">
                    {files.map((file, i) => (
                        <li
                            key={i}
                            className="bg-[#f3f3f3] px-[6px] py-[4px] font-[Arial]
        tracking-[-0.03em] leading-[16px] rounded text-[14px]"
                        >
                            {file.name}
                        </li>
                    ))}
                </ul>
            )}

            {/* Progress */}
            <div className="mt-[16px]">
                <span className="text-[#828282] font-[Arial]
        tracking-[-0.03em] leading-[18px] text-[16px] font-medium max-sm:text-[12px]">
                    Request quality
                </span>
                <div className="w-full h-[6px] bg-[#eee] rounded mt-[5px] overflow-hidden">
                    <div
                        className="h-full bg-[#00afe3] transition-all"
                        style={{ width: `${qualityData || 0}%` }}
                    />
                </div>
            </div>

            <p className="mt-[16px] text-[#828282] font-[Arial]
        tracking-[-0.03em] leading-[20px] text-[16px] font-medium text-left max-sm:text-[12px]">
                Quality score increases as you add more detail
            </p>

            {/* Checkbox */}
            <label className="mt-[16px] flex items-start gap-[8px] p-[16px] bg-gradient-to-r from-[#8ed5ec] to-[#00afe3] text-white cursor-pointer">
                <input
                    type="checkbox"
                    checked={professionalLetin}
                    onChange={(e) => setProfessionalLetin(e.target.checked)}
                    className="appearance-none w-[24px] h-[24px] bg-white rounded border shadow relative
          checked:bg-[#00afe3] checked:border-[#00afe3]
          checked:after:content-[''] checked:after:absolute
          checked:after:left-[7px] checked:after:top-[3px]
          checked:after:w-[5px] checked:after:h-[10px]
          checked:after:border-white checked:after:border-r-2 checked:after:border-b-2
          checked:after:rotate-45 font-[Arial]
        tracking-[-0.03em]"
                />
                <div>
                    <span className="font-semibold block font-[Arial]
        tracking-[-0.03em] text-[14px] leading-[16px]">
                        Tick if you'd like to hear back quickly
                    </span>
                    <span className="italic text-[14px] font-[Arial]
        tracking-[-0.03em] leading-[16px]">
                        I’m happy to be contacted as soon as possible
                    </span>
                </div>
            </label>

            {/* Button */}
            <div className="flex justify-center mt-[30px] max-sm:mt-[10px]">
                <button
                    onClick={handleSubmit}
                    className="bg-[#00afe3] text-white px-[29px] py-[9px] cursor-pointer rounded font-medium hover:bg-[#007bbd]"
                >
                    {addDetailLoader ? (
                        <Spin indicator={<LoadingOutlined spin style={{ color: "white" }} />} />
                    ) : (
                        "See My Matches"
                    )}
                </button>
            </div>

            {/* Privacy */}
            <p className="mt-[10px] text-center text-[#838383] text-[10px] font-medium">
                Your information is protected by our{" "}
                <span className="font-bold text-black">privacy policy</span>
            </p>
        </div>
    );
};

export default DescribeYourRequestNewPPC;
