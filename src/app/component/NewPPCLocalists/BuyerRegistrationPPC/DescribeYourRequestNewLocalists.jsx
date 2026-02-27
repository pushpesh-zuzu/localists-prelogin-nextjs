"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  
    addDetailsRequestDataForLocalistLanding,
  addImageSubmittedData,
  clearSetbuyerRequestData,
  setBuyerStep,
  setQualityData,
  textQualityData,
} from "@/lib/store/buyerslice/buyerSlice"; 
import { showToast } from "@/utils/toaster"; 
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
// import Modal from "../../common/Modal";
import H4 from "../../UI/Typography/H4";
import Paragraph from "../../UI/Typography/Paragraph";
import { getCookie } from "@/utils/CookiesHelper";
import FormWrapper from "../FormWrapper";
import UserIconWhite from "../../../../../public/ReactIcons/UserIconWhite";

const DescribeYourRequestNewLocalists = ({
  onClose,
  setShowConfirmModal,
  onNext 
}) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [professionalContact, setProfessionalContact] = useState(false);
  const [textError, setTextError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Get all required data from Redux store
  const {
    requestId,
    qualityData: qualityScore = 0,
    addDetailLoader: isLoading = false,
    buyerStep,
    // Add other required states as needed
  } = useSelector((state) => state.buyer || {});

  // Check if step 10 (complete state)
  const isComplete = buyerStep === 10;

  // Text quality debounce effect
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

  const handleSubmit = async () => {
    // Validation
    let hasError = false;

    if (hasError) return;

    // Prepare data for submission
        const reqId = getCookie('requestId') || requestId
    console.log(reqId,'reqIdreqIdreqId')

    const detailsData = {
      request_id: reqId,
      details: text,
      professional_letin: professionalContact ? 1 : 0,
    };

    // Dispatch to Redux
    dispatch(addDetailsRequestDataForLocalistLanding(detailsData, requestId)).then(
      (result) => {
        debugger
        if (result?.success) {
          const successMessage =
            result?.payload?.message ||
            result?.message ||
            "Create Request successfully!";
          showToast("success", successMessage);
          debugger;
          onNext()

          // Clear states
          dispatch(clearSetbuyerRequestData());
          dispatch(clearBuyerRegisterFormData());
          dispatch(setQualityData());

          // Close modal if exists
          if (setShowConfirmModal) {
            setShowConfirmModal(false);
          }

          // Navigate to step 10
          dispatch(setBuyerStep(7));
        }
      }
    );
  };

  const handleCloseClick = () => {
    // if (onClose) {
    //   onClose();
    // }
    dispatch(clearSetbuyerRequestData());
    dispatch(clearBuyerRegisterFormData());
  };

  // Loading/Complete state
  if (isComplete) {
    return (
      <div className="fixed left-1/2 top-[60%] flex w-[90%] max-w-[500px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-auto bg-white px-5 py-4 text-center max-[480px]:h-[80vh] max-[350px]:w-[80%] max-[350px]:px-4 max-[350px]:py-3">
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#00afe3]" aria-label="loader"></div>
        </div>
      </div>
    );
  }

  return (
    // <Modal
    //   showButtons={false}
    //   padding="p-3 md:px-7.5"
    //   isOpen={true}
    //   maxWidth="max-w-[90%] md:max-w-[480px] mt-[10%] border-2 rounded-[24px]" 
    //   maxHeight="max-h-[90vh]"
    //   radius="rounded-[10px]"
    //   insetBG="#fff"
    // >
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
        <Paragraph bold="font-normal">Your request has been submitted</Paragraph>
      </div>

      {/* Header */}
      <div className="max-[480px]:text-lg">
        <H4 className="mb-0 text-center align-middle text-2xl font-bold text-[#253238] max-[480px]:mb-2 max-[480px]:text-xl md:mt-4 md:mb-2.5">
          Tell us your availability for someone to visit and provide you with your free quote
        </H4>
      </div>


      {/* Textarea */}
      <span className="max-[480px]:h-fit">
        <textarea
          className={`mt-[10px] w-full resize-none rounded-[14px] border-2 placeholder:text-gray-400! placeholder:font-medium px-[14px] py-[14px] text-sm shadow-sm ${
            textError ? "border-red-500" : "border-[#253238]"
          } max-[480px]:h-20 max-[480px]:px-[10px] max-[480px]:py-[10px] max-[480px]:text-xs max-[400px]:h-[100px] max-[350px]:h-20`}
          value={text}
          onChange={handleChange}
          placeholder="Let the professional know your availability for a free estimate "
          rows={2}
        />
        {textError && (
          <span className="font-[Arial] mb-[10px] block text-left text-sm text-red-500">
            Please fill this input field.
          </span>
        )}
      </span>

      {/* File Upload */}
      <label
        className={`mt-[11px] border-2 border-gray-300 flex w-full cursor-pointer items-center justify-center gap-2 bg-[#e6f7ff] px-3 py-2 text-xs font-medium text-[#00afe3] transition-all duration-300 hover:bg-[#d4ebff] ${
          fileError ? "border border-red-500" : ""
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

      {/* Progress Container */}
      <div className="mt-4 text-left ">
        <Paragraph className="text-base ">
          Quality Score
        </Paragraph>
      </div>

      {/* Add More Detail */}
      <div>
        <Paragraph variant="small" className="mt-[16.5px] text-left">
          Your Quality score increases as you add more detail to your quote
        </Paragraph>
      </div>
      <div className="mt-3 md:mt-4 h-6 w-full overflow-hidden rounded-[3px] bg-[#eee]">
          <div
            className="h-full bg-[#02D07B] transition-all duration-300 ease-in-out"
            style={{ width: qualityScore > 0 ? `${qualityScore}%` : "0%" }}
          ></div>
        </div>
      {/* Checkbox Container */}
      {/* <label className="mt-4 flex cursor-pointer items-center bg-gradient-to-r from-[#8ed5ec] to-[#00afe3] px-[18px] py-[16.35px] text-left text-sm font-medium text-white transition-all duration-300 ease-in-out max-[768px]:px-[14px] max-[768px]:py-[14px] max-[768px]:text-[13px] max-[480px]:px-3 max-[480px]:py-3 max-[480px]:text-[10px] max-[400px]:text-[10px] max-[350px]:text-[10px]">
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
      </label> */}

      {/* Button */}
      <div className="mt-[30.44px] max-[480px]:mt-[20px] flex justify-center">
        <button
          className="flex gap-2 cursor-pointer rounded-full rounded border-none bg-[#00afe3] px-4 py-[12px] text-center align-middle text-[15px] font-medium text-white disabled:opacity-50 max-[768px]:px-4 max-[768px]:py-2 max-[768px]:text-sm max-[480px]:px-4 max-[480px]:py-2 max-[480px]:text-[13px] hover:bg-[#008cc0]"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          <UserIconWhite/>
          {isLoading ? (
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          ) : (
            "See My Matches"
          )}
        </button>
      </div>
      

      {/* Privacy Wrapper */}
      {/* <div className="flex justify-center text-left">
        <p className="font-[Arial] mt-[10px] text-[10px] font-medium text-[#838383] max-[768px]:text-xs max-[480px]:text-[10px]">
          Your information is protected by our{" "}
          <Link
            href="/en/gb/privacy-policy"
            className="text-[#00afe3] hover:underline"
          >
            privacy policy
          </Link>
        </p>
      </div> */}
      </div>
      </FormWrapper>
    // </Modal>
  );
};

export default DescribeYourRequestNewLocalists;
