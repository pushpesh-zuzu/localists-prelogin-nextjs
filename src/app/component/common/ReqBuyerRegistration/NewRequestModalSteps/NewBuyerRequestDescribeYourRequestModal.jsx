"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addDetailsRequestData,
  addImageSubmittedData,
  clearSetbuyerRequestData,
  setBuyerStep,
  setQualityData,
  // textQualityData,
} from "@/lib/store/buyerslice/buyerSlice";
import { useRouter } from "next/navigation";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import RequestBuyerModal from "../Modal/RequestBuyerModal";
import VerifyIcon from "../../../../../../public/ReactIcons/VerifyIcon";
// import RequestBuyerModal from "./Modal/RequestBuyerModal";

const NewBuyerRequestDescribeYourRequestModal = ({
  nextStep,
  progressPercent,
  sellers,
}) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [professionalContact, setProfessionalContact] = useState(false);

  const [textError, setTextError] = useState(false);
  const [fileError, setFileError] = useState(false);

  const { requestId, qualityData, buyerStep } = useSelector(
    (state) => state.buyer,
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setText(e.target.value);
    setTextError(false);
  };

  // const handleCheckboxChange = (e) => {
  //     setProfessionalContact(e.target.checked);
  // };

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

  const handleSubmit = async () => {
    let hasError = false;
    if (hasError) return;

    const detailsData = {
      request_id: requestId,
      details: text,
      professional_letin: professionalContact ? 1 : 0,
    };

    const hasSellers = sellers && sellers.length > 0;
    // If sellers exist → use dummy router
    // If no sellers → use real router
    const selectedRouter = hasSellers ? { push: () => {} } : router;

    // console.log("selectedRouter", sellers, selectedRouter)

    await dispatch(
      addDetailsRequestData(detailsData, selectedRouter, requestId),
    );

    if (hasSellers) {
      //  Stay in modal flow → go to Step 7
      nextStep();
    } else {
      //  No sellers → Clear everything & go to Step 10
      dispatch(clearSetbuyerRequestData());
      dispatch(clearBuyerRegisterFormData());
      dispatch(setQualityData());
      dispatch(setBuyerStep(10));
      localStorage.removeItem("pendingBuyerModal");
    }
  };

  // const handleBack = () => {
  //     previousStep()
  // }

  return (
    <>
      <style>{`
      .custom-textarea::placeholder {
        color: #d9d9d9;
        opacity: 1;
      }
    `}</style>
      <RequestBuyerModal
        title="Tell us more about what you need for better responses"
        isOpen={true}
        // title="Your request has been submitted"
        onNext={handleSubmit}
        // onBack={handleBack}
        buyerStep={buyerStep}
        showProgressBar={true}
        // titleClassName="text-center"
        showClosIcon={false}
        showButtons={true}
        nextButtonText="See my matches"
        // viewMatchesIcon={true}
        // viewMatches={false}
        progressPercent={progressPercent}
        marginTop="lg:mt-[12vh] mt-[6vh]"
        onBackDisable
      >
        <div className=" ">
          {buyerStep === 10 ? (
            <div className="flex justify-center items-center py-10">
              <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
            </div>
          ) : (
            <>
              <div className=" pb-[20px] flex-shrink-0 text-center">
                <h6 className="flex  items-center justify-center gap-1.5 font-[Arial] tracking-[-0.03em] max-w-[90%] md:max-w-[80%] lg:max-w-[608px] lg:mx-[68.4px] mx-auto text-[#00afe3]">
                  <VerifyIcon className="w-4 h-4 inline-block" />
                  <span className="max-w-[300px] md:max-w-[100%]">
                    Your request has been submitted
                  </span>
                </h6>
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

              {/* <div className="addMoreDetail mt-4 text-left">
                                <H5 className="font-bold">
                                    Quality score
                                </H5>
                                <Paragraph className="mt-3">
                                    Your Quality score increases as you add more detail to your quote
                                </Paragraph>
                            </div> */}
              {/* //progressbar */}
              {/* <div className="w-full rounded-[20px] h-5 bg-[#eee] overflow-hidden mt-3">
                                <div
                                    className="h-full bg-[#04d07b] transition-all duration-300 ease-in-out"
                                    style={{ width: qualityData > 0 ? `${qualityData}%` : "0%" }}
                                ></div>
                            </div> */}
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
            </>
          )}
        </div>
      </RequestBuyerModal>
    </>
  );
};

export default NewBuyerRequestDescribeYourRequestModal;
