"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addImageSubmittedData,
} from "@/lib/store/buyerslice/buyerSlice";
import H4 from "../../UI/Typography/H4";
import Paragraph from "../../UI/Typography/Paragraph";
import FormWrapper from "../FormWrapper";
import UserIconWhite from "../../../../../public/ReactIcons/UserIconWhite";

const DescribeYourRequestNewLocalists = ({
  setInputText,
  inputText,
  files,
  setFiles,
  onNext,
}) => {
  const [textError, setTextError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const dispatch = useDispatch();

  const { buyerStep, requestId } = useSelector((state) => state.buyer);

  const isComplete = buyerStep === 10;

  const handleChange = (e) => {
    setInputText(e.target.value);
    setTextError(false);
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) {
      setFileError(true);
      return;
    }

    setFiles(selectedFiles);
    setFileError(false);
    // Dispatch image upload to Redux

    const formData = new FormData();
    formData.append("request_id", requestId);
    selectedFiles.forEach((file) => {
      formData.append("image_file", file);
    });

    dispatch(addImageSubmittedData(formData));
  };

  // Loading/Complete state
  if (isComplete) {
    return (
      <div className="fixed left-1/2 top-[60%] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-auto bg-white px-5 py-4 text-center max-[480px]:h-[80vh] max-[350px]:w-[80%] max-[350px]:px-4 max-[350px]:py-3">
        <div className="flex items-center justify-center">
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#00afe3]"
            aria-label="loader"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <FormWrapper>
      <div className="max-w-[90%] md:max-w-[480px] mx-auto p-3 md:px-7.5 md:py-7">
        {/* Success Message */}
        <div className="mb-[10px] mt-3 flex items-center justify-center gap-[6.18px] text-base font-medium text-[#00afe3] max-[480px]:items-start max-[480px]:text-left max-[480px]:text-[13px] max-[480px]:font-semibold">
          <svg
            className="h-5 w-5 max-[480px]:mt-0 max-w-fit"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <Paragraph bold="font-normal">
            Your request has been submitted
          </Paragraph>
        </div>

        {/* Header */}
        <div className="max-[480px]:text-lg">
          <H4 className="mb-0 text-center align-middle text-2xl font-bold text-[#253238] max-[480px]:mb-2 max-[480px]:text-xl md:mt-4 md:mb-2.5">
            Tell us more about what you need for better responses
          </H4>
        </div>

        {/* Textarea */}
        <span className="max-[480px]:h-fit">
          <textarea
            className={`mt-[10px] flex items-center w-full resize-none rounded-[14px] border-2 placeholder:text-gray-400! placeholder:font-medium px-[14px] py-[14px] text-sm shadow-sm ${textError ? "border-red-500" : "border-[#253238]"
              } max-[480px]:h-20 max-[480px]:px-[10px] max-[480px]:py-[5px] max-[480px]:text-xs max-[400px]:h-[100px] max-[350px]:h-20`}
            value={inputText}
            onChange={handleChange}
            placeholder="What should the professional know to better understand your request? (Provide any relevant details here.)"
            rows={3}
          />
          {textError && (
            <span className="font-[Arial] mb-[10px] block text-left text-sm text-red-500">
              Please fill this input field.
            </span>
          )}
        </span>

        {/* File Upload */}
        <label
          className={`mt-[11px] border-2 border-gray-300 flex w-full cursor-pointer items-center justify-center gap-2 bg-[#e6f7ff] px-3 py-2 text-xs font-medium text-[#00afe3] transition-all duration-300 hover:bg-[#d4ebff] ${fileError ? "border border-red-500" : ""
            } max-[768px]:px-[10px] max-[768px]:py-[10px] max-[768px]:text-sm max-[480px]:px-2 max-[480px]:py-2 max-[480px]:text-xs`}
        >
          <svg
            className="h-4 w-4 bg-[#00afe3] rounded-full"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span>Upload photos or files (optional)</span>
          <input
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            accept="image/png, image/jpg, image/jpeg"
          />
        </label>

        <p className="text-left text-xs text-[#d9d9d9]">
          Image (jpeg, jpg, png) file can be uploaded
        </p>

        {fileError && (
          <span className="text-sm text-red-500">Please upload a file.</span>
        )}

        {/* File List */}
        {files.length > 0 && (
          <ul className="mt-[10px] list-none p-0">
            {files.map((file, index) => (
              <li
                key={index}
                className="mb-[5px] rounded-[3px] bg-[#f3f3f3] p-[5px] text-sm"
              >
                {file.name}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-[30.44px] max-[480px]:mt-[20px] flex justify-center">
          <button
            className="flex gap-2 cursor-pointer min-w-[158px] md:min-w-[174px] rounded-full rounded border-none bg-[#00afe3] px-4 py-[12px] text-center align-middle text-[15px] font-medium text-white disabled:opacity-50 max-[768px]:px-4 max-[768px]:py-2 max-[768px]:text-sm max-[480px]:px-4 max-[480px]:py-2 max-[480px]:text-[13px] hover:bg-[#008cc0]"
            onClick={() => {
              onNext();
            }}
          >
            <UserIconWhite className="h-5 w-5" /> See My Matches
          </button>
        </div>
      </div>
    </FormWrapper>
  );
};

export default DescribeYourRequestNewLocalists;
