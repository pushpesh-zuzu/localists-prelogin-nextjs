"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetailsRequestData,
  addImageSubmittedData,
  clearSetbuyerRequestData,
  setBuyerStep,
  setQualityData,
  textQualityData,
} from "@/lib/store/buyerslice/buyerSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/toaster";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";

const MultiStepDescribeYourRequest = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [professionalContact, setProfessionalContact] = useState(false);

  const [textError, setTextError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const { requestId, qualityData, addDetailLoader, buyerStep } = useSelector(
    (state) => state.buyer,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (text.trim() !== "") {
        dispatch(textQualityData({ text }));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [text, dispatch]);

  const handleChange = (e) => {
    setText(e.target.value);
    setTextError(false);
  };

  const handleCheckboxChange = (e) => {
    setProfessionalContact(e.target.checked);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) {
      setFileError(true);
      return;
    }

    setFiles(selectedFiles);
    setFileError(false);

    const formData = new FormData();
    formData.append("request_id", requestId);
    selectedFiles.forEach((file) => {
      formData.append("image_file", file);
    });

    dispatch(addImageSubmittedData(formData));
  };

  const handleSubmit = () => {
    let hasError = false;
    if (hasError) return;

    const detailsData = {
      request_id: requestId,
      details: text,
      professional_letin: professionalContact ? 1 : 0,
    };

    dispatch(addDetailsRequestData(detailsData, router, requestId)).then(
      (result) => {
        if (result?.success) {
          showToast(
            "success",
            result?.message || "Create Request successfully!",
          );
        }
        dispatch(clearSetbuyerRequestData());
        dispatch(clearBuyerRegisterFormData());
        dispatch(setQualityData());
        dispatch(setBuyerStep(10));
      },
    );
  };

  return (
    <div className="max-w-[500px] relative mx-auto">
      {buyerStep === 10 ? (
        <div className="flex justify-center items-center py-10">
          <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center gap-2 text-base font-medium text-[#00afe3] mb-2.5">
            {/* <Image 
              src={CheckIcon} 
              alt="Success" 
              width={20}
              height={20}
              className="w-5 h-5"
            /> */}
            <span>Your request has been submitted</span>
          </div>

          <div className="header mb-0">
            <h2 className="text-black font-bold text-2xl text-center align-middle mb-0">
              Tell us more about what you need for better responses
            </h2>
          </div>

          <p className="font-medium text-base text-center text-[#828282] mb-2.5">
            The more information you provide, the quicker and more accurately
            professionals can respond
          </p>

          <textarea
            className={`w-full border border-[#d9d9d9] shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)] p-3.5 mt-2.5 resize-none text-sm font-['Poppins'] ${
              textError ? "border-red-500" : ""
            }`}
            value={text}
            onChange={handleChange}
            placeholder="What should the professional know to better understand your request? (Provide any relevant details here.)"
            rows={4}
          />
          {textError && (
            <span className="text-red-500 text-sm block text-left mb-2.5">
              Please fill this input field.
            </span>
          )}

          <label
            className={`flex justify-center items-center gap-2 bg-[#e6f7ff] text-[#00afe3] px-3 py-2 text-xs font-medium cursor-pointer transition-colors hover:bg-[#d4ebff] w-full mt-3 ${
              fileError ? "border border-red-500" : ""
            }`}
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
          <p className="text-[#d9d9d9] text-start text-xs mt-1">
            Image (jpeg, jpg, png) file can be uploaded
          </p>
          {fileError && (
            <span className="text-red-500 text-sm block text-left mb-2.5">
              Please upload a file.
            </span>
          )}

          {files.length > 0 && (
            <ul className="mt-2.5 p-0 list-none">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="bg-[#f3f3f3] p-1.5 mb-1.5 rounded text-sm"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-4 text-left">
            <span className="text-[#828282] font-medium text-base">
              Request quality
            </span>
            <div className="w-full h-1.5 bg-[#eee] rounded-full overflow-hidden mt-1">
              <div
                className="h-full bg-[#00afe3] transition-all duration-300 ease-in-out"
                style={{ width: qualityData > 0 ? `${qualityData}%` : "0%" }}
              ></div>
            </div>
          </div>

          <div className="addMoreDetail mt-4">
            <p className="font-medium text-base text-[#828282] text-left">
              Quality score increases as you add more detail
            </p>
          </div>

          <label className="mt-4 flex cursor-pointer items-center bg-gradient-to-r from-[#8ed5ec] to-[#00afe3] px-[18px] py-[16.35px] text-left text-sm font-medium text-white transition-all duration-300 ease-in-out max-[768px]:px-[14px] max-[768px]:py-[14px] max-[768px]:text-[13px] max-[480px]:px-3 max-[480px]:py-3 max-[480px]:text-[10px] max-[400px]:text-[10px] max-[350px]:text-[10px]">
            <input
              type="checkbox"
              checked={professionalContact}
              onChange={handleCheckboxChange}
              className="relative mr-[10px] h-5 w-5 cursor-pointer appearance-none rounded border-2 border-white bg-white shadow-sm transition-all duration-200 ease-in-out checked:border-[#00afe3] checked:bg-[#00afe3] after:absolute after:left-[7px] after:top-[3px] after:hidden after:h-[10px] after:w-[5px] after:border-white after:border-r-2 after:border-b-2 after:rotate-45 after:border-solid checked:after:block"
            />
            <div className="-ml-1 flex-col">
              <span className="mt-1 font-[Arial] inline-block font-semibold text-white">
                Tick if you'd like to hear back quickly
              </span>
              <br />
              <span className="mt-[2px] font-[Arial] inline-block text-sm text-white max-[480px]:text-xs">
                I'm happy to be contacted as soon as possible
              </span>
            </div>
          </label>

          <div className="mt-[30.44px] max-[480px]:mt-[10.44px] flex justify-center">
            <button
              className="cursor-pointer rounded border-none bg-[#00afe3] px-[29px] py-[9px] text-center align-middle text-[15px] font-medium text-white disabled:opacity-50 max-[768px]:px-6 max-[768px]:py-2 max-[768px]:text-sm max-[480px]:px-5 max-[480px]:py-2 max-[480px]:text-[13px]"
              onClick={handleSubmit}
              disabled={addDetailLoader}
            >
              {addDetailLoader ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                "See My Matches"
              )}
            </button>
          </div>

          <div className="privacyWrapper flex justify-center text-start">
            <p className="privacyText text-[#838383] mt-2.5 font-medium text-xs">
              Your information is protected by our{" "}
              <Link
                href={"/en/gb/privacy-policy"}
                className="privacyLink text-[#00afe3] hover:underline"
              >
                privacy policy
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MultiStepDescribeYourRequest;
