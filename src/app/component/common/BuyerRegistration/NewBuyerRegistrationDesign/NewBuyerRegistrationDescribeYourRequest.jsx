"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addDetailsRequestData,
  addImageSubmittedData,
  clearSetbuyerRequestData,
  setBuyerStep,
  setQualityData,
  textQualityData,
} from "@/lib/store/buyerslice/buyerSlice"; // Adjust path as needed
import { showToast } from "@/utils/toaster"; // Adjust path as needed
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
// import Paragraph from "../../UI/Typography/Paragraph";
import { getCookie } from "@/utils/CookiesHelper";
import RequestBuyerModal from "../../ReqBuyerRegistration/Modal/RequestBuyerModal";
import Paragraph from "@/app/component/UI/Typography/Paragraph";
import VerifyIcon from "../../../../../../public/ReactIcons/VerifyIcon";
// import VerifyIcon from "../../../../../public/ReactIcons/VerifyIcon";
// import RequestBuyerModal from "../ReqBuyerRegistration/Modal/RequestBuyerModal";

const NewBuyerRegistrationDescribeYourRequest = ({
  onClose,
  setShowConfirmModal, // Added this from old version
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
  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     if (text.trim() !== "") {
  //       dispatch(textQualityData({ text }));
  //     }
  //   }, 500);

  //   return () => clearTimeout(delayDebounce);
  // }, [text, dispatch]);

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
    const req = getCookie("requestId") || requestId;
    // Prepare data for submission
    const detailsData = {
      request_id: req,
      details: text,
      professional_letin: professionalContact ? 1 : 0,
    };

    // Dispatch to Redux
    dispatch(addDetailsRequestData(detailsData, router, req)).then((result) => {
      if (result?.success) {
        const successMessage =
          result?.payload?.message ||
          result?.message ||
          "Create Request successfully!";
        showToast("success", successMessage);

        // Clear states
        dispatch(clearSetbuyerRequestData());
        dispatch(clearBuyerRegisterFormData());
        dispatch(setQualityData());

        // Close modal if exists
        if (setShowConfirmModal) {
          setShowConfirmModal(false);
        }

        // Navigate to step 10
        dispatch(setBuyerStep(10));
      }
    });
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
          <div
            className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#00afe3]"
            aria-label="loaders"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <RequestBuyerModal
      title="Tell us more about what you need for better responses"
      isOpen={true}
      showClosIcon={false}
      onNext={handleSubmit}
      showProgressBar={false}
      showButtons={true}
      nextButtonText="See my matches"
      marginTop="lg:mt-[12vh] mt-[6vh]"
      onBackDisable
      minHeight="min-h-[300px] min-h-[400px]"
    >
      <div className=" ">
        {buyerStep === 10 ? (
          <div className="flex justify-center items-center py-10">
            <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
          </div>
        ) : (
          <>
            <div className=" pb-[16px] flex-shrink-0 text-center">
              <h6 className="flex  items-center justify-center gap-1.5 font-[Arial] tracking-[-0.03em] max-w-[90%] md:max-w-[80%] lg:max-w-[608px] lg:mx-[68.4px] mx-auto text-[#00afe3]">
                <VerifyIcon className="w-4 h-4 inline-block" />
                <span className="max-w-[300px] md:max-w-[100%]">
                  Your request has been submitted
                </span>
              </h6>
            </div>
            <div className="max-[480px]:text-lg">
              <Paragraph className="mb-6 md:mb-7.5 text-center">
                Tell us more about what you need for better responses
              </Paragraph>
            </div>

            <textarea
              className={`w-full custom-textarea rounded-[20px] border-2 border-[#00aef3] custom-placeholder shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)] p-3.5 resize-none md:text-sm font-['Arial'] font-bold ${
                textError ? "border-red-500" : "border-[#00afe3]"
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
              className={`flex justify-center rounded-full border-2 border-[#00aef3] items-center gap-2 text-[#253238] px-6 py-3 md:px-3 md:py-[21px] text-xs font-medium cursor-pointer transition-colors hover:bg-[#d4ebff] w-full mt-3 ${
                fileError ? "border border-red-500" : ""
              }`}
            >
              <svg
                className="h-4 w-4 min-w-4 bg-[#00afe3] rounded-full"
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
          </>
        )}
      </div>
    </RequestBuyerModal>
  );
};

export default NewBuyerRegistrationDescribeYourRequest;
