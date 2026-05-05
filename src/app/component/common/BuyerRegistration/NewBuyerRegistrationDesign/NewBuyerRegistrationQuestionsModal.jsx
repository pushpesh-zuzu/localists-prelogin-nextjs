"use client";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
  setbuyerRequestData,
  clearSetbuyerRequestData,
  registerQuoteCustomer,
} from "@/lib/store/buyerslice/buyerSlice";
import useUserInfo from "@/utils/getUserIp";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { getBarkToken } from "@/utils/CookiesHelper";
import { extractAllParams } from "@/utils/decodeURLParams";
import RequestBuyerModal from "../../ReqBuyerRegistration/Modal/RequestBuyerModal";
import LoaderIndicator from "../../Loader/LoaderIndicatore";
import NewBuyerRequestQuestionOptionsBox from "../../ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestQuestionOptionsBox";

const NewBuyerRegistrationQuestionsModal = ({
  questions = [],
  serviceName,
  onClose,
  nextStep,
  previousStep,
  loading = false,
  setShowConfirmModal,
  isStartWithQuestionModal = false,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, requestLoader, citySerach, questionanswerData } =
    useSelector((state) => state.buyer);
  const { service, registerData } = useSelector((state) => state.findJobs);

  const { ip, url } = useUserInfo();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);

  // Get URL params
  const { search } = useSearchParams();
  const allParams =
    typeof window !== "undefined" &&
    extractAllParams(search || window.location.search);
  const campaignid = allParams.campaign_id || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const msclkid = allParams.msclkid || "";
  const adgroup_id = allParams.adgroup_id;
  const platform_source = allParams.source || "";
  const campaign = allParams.campaign || "";
  const adgroup = allParams.adgroup || "";
  const matchtype = allParams.matchtype || "";
  const device = allParams.device || "";
  const loc_physical_ms = allParams.loc_physical_ms || "";
  const utm_search_term = allParams.utm_search_term || "";

  useEffect(() => {
    if (questions.length > 0 && currentQuestion === -1) {
      setCurrentQuestion(0);
    }
  }, [questions, currentQuestion]);

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const savedAnswer = buyerRequest.questions[currentQuestion]?.ans || [];

      const savedArray =
        typeof savedAnswer === "string"
          ? savedAnswer.split(",").map((a) => a.trim())
          : savedAnswer;

      setSelectedOption(savedArray);
      const otherVal = savedArray.find(
        (ans) =>
          ans.toLowerCase() !== "yes" &&
          ans.toLowerCase() !== "no" &&
          ans.toLowerCase() !== "maybe",
      );
      setOtherText(
        savedArray.includes("Something else (please describe)")
          ? otherVal || ""
          : "",
      );
    }
  }, [currentQuestion, buyerRequest, questions]);

  // useEffect(() => {
  //   setSelectedOption([]);
  //   setOtherText("");
  // }, [currentQuestion]);
  useEffect(() => {
    const currentQ = formattedQuestions[currentQuestion];

    if (!currentQ) return;

    const options = currentQ.parsedAnswers || [];

    // Check if only one option and it's "Something else"
    if (
      options.length === 1 &&
      options[0].option === "Something else (please describe)"
    ) {
      setSelectedOption(["Something else (please describe)"]);
    } else {
      setSelectedOption([]);
    }

    setOtherText("");
  }, [currentQuestion]);

  const totalQuestions = questions?.length;
  const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;

  const formattedQuestions = questions.map((q) => ({
    ...q,
    parsedAnswers: Array.isArray(q.answer)
      ? q.answer
      : (() => {
          try {
            return JSON.parse(q.answer);
          } catch (e) {
            return [];
          }
        })(),
  }));

  const questionIndexMap = {};
  formattedQuestions.forEach((q, index) => {
    questionIndexMap[q.question_no] = index;
  });

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle = questions[currentQuestion]?.option_type === "single";

    if (isSingle) {
      setSelectedOption([value]);
      setError("");
    } else {
      setSelectedOption((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value),
      );
      setError("");
    }
  };

  const handleNext = (directValue = null) => {
    const finalSelection = directValue ? [directValue] : selectedOption;

    if (finalSelection.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      finalSelection.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return;
    }

    const finalAnswer = finalSelection.map((opt) =>
      opt.toLowerCase() === "something else (please describe)"
        ? otherText
        : opt,
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    const previousAnswers = buyerRequest?.questions || [];

    const existingIndex = previousAnswers.findIndex(
      (item) => item?.ques === updatedAnswer.ques,
    );

    let updatedAnswers;
    if (existingIndex !== -1) {
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === finalSelection[0],
    );

    const nextQ = selectedObj?.next_question;

    if (nextQ === "last") {
      if (isStartWithQuestionModal) {
        dispatch(
          setbuyerRequestData({
            service_id: service?.id || buyerRequest?.service_id,
            serviceName: serviceName || buyerRequest?.serviceName,
            postcode: buyerRequest?.postcode,
            city: citySerach,
            questions: updatedAnswers,
          }),
        );
        nextStep();
      } else if (getBarkToken()) {
        nextStep();
      } else {
        const formData = new FormData();
        formData.append("name", buyerRequest?.name);
        formData.append("email", buyerRequest?.email);
        formData.append("phone", buyerRequest?.phone);
        formData.append("questions", JSON.stringify(updatedAnswers));
        formData.append("service_id", buyerRequest?.service_id);
        formData?.append("city", citySerach);
        formData.append("postcode", buyerRequest?.postcode);
        formData.append("form_status", "1");
        formData.append("campaignid", campaignid || "");
        formData.append("gclid", gclid || "");
        formData.append("campaign", campaign || "");
        formData.append("adgroup", adgroup || "");
        formData.append("msclickid", msclkid || "");
        formData.append("adgroup_id", adgroup_id || "");
        formData.append("matchtype", matchtype || "");
        formData.append("device", device || "");
        formData.append("loc_physical_ms", loc_physical_ms || "");
        formData.append("utm_search_term", utm_search_term || "");
        formData.append("platform_source", platform_source);
        formData.append("keyword", keyword || "");

        formData.append("entry_url", url);
        formData.append("user_ip_address", ip);

        dispatch(registerQuoteCustomer(formData)).then((result) => {
          if (result) {
            nextStep();
          }
        });
      }
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        nextStep();
      }
    }

    setSelectedOption([]);
    setOtherText("");
    setError("");
  };

  const handleBack = () => {
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];

      // const trimmedAnswers =
      //   buyerRequest?.questions?.slice(0, prevIndex) || [];

      // dispatch(setbuyerRequestData({ questions: trimmedAnswers }));

      const questionText = formattedQuestions[prevIndex]?.questions;

      const indexInAnswers = buyerRequest?.questions?.findIndex(
        (q) => q?.ques === questionText,
      );

      if (indexInAnswers !== -1) {
        const updatedAnswers = buyerRequest.questions.slice(0, indexInAnswers);

        dispatch(setbuyerRequestData({ questions: updatedAnswers }));
      }

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
    } else {
      previousStep();
    }
  };

  const handleCloseClick = () => {
    if (questionanswerData?.length === 0) {
      onClose();
      dispatch(clearSetbuyerRequestData());
      dispatch(clearBuyerRegisterFormData());
    } else {
      if (!getBarkToken()) {
        setShowConfirmModal(true);
      } else {
        onClose();
        dispatch(clearSetbuyerRequestData());
        dispatch(clearBuyerRegisterFormData());
      }
    }
  };

  const currentOptions =
    formattedQuestions[currentQuestion]?.parsedAnswers || [];

  const isOnlyOther =
    currentOptions.length === 1 &&
    currentOptions[0].option === "Something else (please describe)";
  console.log(error, "error");
  useEffect(() => {
    setError("");
  }, [selectedOption, currentQuestion]);
  return (
    <RequestBuyerModal
      onClose={() => {
        handleCloseClick();
      }}
      isOpen={true}
      title={formattedQuestions[currentQuestion]?.questions}
      onNext={() => handleNext()}
      onBack={handleBack}
      fixedHeight={true}
      showProgressBar={false}
      titleClassName="text-left"
      showButtons={true}
      progressPercent={progressPercent}
      marginTop="lg:mt-[12vh] mt-[5vh]"
      minHeight="min-h-[300px]  md:min-h-[460px]"
      errorMessage={error}
    >
      <div
        className={`${isOnlyOther ? "" : ""} rounded-[30px] max-h-[300px] md:max-h-[286px] overflow-auto py-2 `}
      >
        {loading ? (
          <div className="flex-1 flex items-center justify-center py-4">
            <LoaderIndicator size="large" />
          </div>
        ) : questions.length > 0 ? (
          <>
            {/* Options Grid */}
            {!isOnlyOther && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formattedQuestions[currentQuestion]?.parsedAnswers.map(
                  (opt, index, arr) => {
                    const optionType =
                      formattedQuestions[currentQuestion]?.option_type;

                    const isSingle = optionType === "single";

                    const isSelected = selectedOption.includes(opt.option);

                    const handleSelect = () => {
                      if (isSingle) {
                        setSelectedOption([opt.option]);
                        setError("");
                        handleNext(opt.option);
                      } else {
                        // Multi toggle
                        setSelectedOption((prev) =>
                          prev.includes(opt.option)
                            ? prev.filter((o) => o !== opt.option)
                            : [...prev, opt.option],
                        );
                        setError("");
                      }
                    };
                    // const isLastSingle =
                    //     arr.length % 2 !== 0 && index === arr.length - 1;

                    return (
                      <div
                        key={index}
                        // className={isLastSingle ? "sm:col-span-2 sm:flex sm:justify-center" : ""}>
                        // <div className={isLastSingle ? "w-full sm:w-1/2" : "w-full"}
                      >
                        <NewBuyerRequestQuestionOptionsBox
                          label={opt.option}
                          isSelected={isSelected}
                          onSelect={handleSelect}
                        />
                        {/* </div> */}
                      </div>
                    );
                  },
                )}
              </div>
            )}

            {/* Other Input */}
            {formattedQuestions[currentQuestion]?.parsedAnswers.some(
              (opt) => opt.option === "Something else (please describe)",
            ) &&
              selectedOption.includes("Something else (please describe)") &&
              !isOnlyOther && (
                <div className="mt-4 mb-5 md:mb-10">
                  {/* <InputField
                                            placeholder="Please Enter..."
                                            value={otherText}
                                            onChange={(e) => {setOtherText(e.target.value);setError(""); }}
                                        /> */}
                  <textarea
                    rows={3}
                    type="textarea"
                    placeholder="Please write text"
                    onChange={(e) => {
                      setOtherText(e.target.value);
                      setError("");
                    }}
                    value={otherText}
                    style={{ boxShadow: "0 0 7px .5px #0000001a" }}
                    className={`
                                                relative w-full px-3 py-3 rounded-[16px]
                                                text-gray-900 text-base
                                                border border-[#00aef3]
                                                transition-all duration-200
                                              placeholder:text-[#959595]
                                                focus:ring-0 focus:outline-0
                                                disabled:bg-gray-100 
                                                custom-placeholder
                                                ${
                                                  error
                                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                    : ""
                                                }
        
                                            `}
                  />

                  {/* {error && (
                    <p className="text-sm text-red-600  pt-2">{error}</p>
                  )} */}
                </div>
              )}
            {formattedQuestions[currentQuestion]?.parsedAnswers.some(
              (opt) => opt.option === "Something else (please describe)",
            ) &&
              selectedOption.includes("Something else (please describe)") &&
              isOnlyOther && (
                <div className=" my-5 md:my-10">
                  {/* <InputField
                                            placeholder="Please Enter..."
                                            value={otherText}
                                            onChange={(e) => {setOtherText(e.target.value);setError(""); }}
                                        /> */}
                  <textarea
                    rows={3}
                    type="textarea"
                    placeholder="Please write text"
                    onChange={(e) => {
                      setOtherText(e.target.value);
                      setError("");
                    }}
                    value={otherText}
                    style={{ boxShadow: "0 0 8px .5px #0000001a" }}
                    className={`
                                                relative w-full px-3 py-2 rounded-[16px]
                                                text-gray-900 text-base
                                                border border-[#00aef3]
                                                transition-all duration-200
                                            placeholder:text-[#959595]
                                                focus:outline-0 outline-[#fff] focus:ring-0
                                                disabled:bg-gray-100 
                                                custom-placeholder
                                                ${
                                                  error
                                                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                                                    : "focus:ring-black"
                                                }
        
                                            `}
                  />
                  {/* {error && (
                    <p className="text-sm text-red-600  pt-2">{error}</p>
                  )} */}
                </div>
              )}

            {/* Error */}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-base text-black">
            <h2>No questions available</h2>
          </div>
        )}
      </div>
    </RequestBuyerModal>
  );
};

export default NewBuyerRegistrationQuestionsModal;
