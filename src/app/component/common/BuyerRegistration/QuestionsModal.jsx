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
import QuestionModalBanner from "./QuestionModalBanner";
import InputField from "../../UI/Inputs/InputField";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { getBarkToken } from "@/utils/CookiesHelper";
import { X } from "lucide-react";
import Button1 from "../../UI/Typography/Button1";
import { extractAllParams } from "@/utils/decodeURLParams";

const QuestionModal = ({
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
          ans.toLowerCase() !== "maybe"
      );
      setOtherText(
        savedArray.includes("Something else (please describe)")
          ? otherVal || ""
          : ""
      );
    }
  }, [currentQuestion, buyerRequest, questions]);

  useEffect(() => {
    setSelectedOption([]);
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
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
      );
      setError("");
    }
  };

  const handleNext = () => {
    if (selectedOption.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      selectedOption.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return;
    }

    const finalAnswer = selectedOption?.map((opt) =>
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    const previousAnswers = buyerRequest?.questions || [];

    const existingIndex = previousAnswers.findIndex(
      (item) => item?.ques === updatedAnswer.ques
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
      (a) => a.option === selectedOption[0]
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
          })
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
    } else if (nextQ && questionIndexMap[nextQ]) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000080]"
      onClick={() => setShowConfirmModal(true)}
    >
      <div
        className="relative w-full mt-[5%] max-w-[500px] max-h-[80vh] mx-4 bg-white shadow-2xl flex flex-col rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => handleCloseClick()}
          className="absolute top-[5%] right-[7%] max-[360px]:right-[10%] sm:top-[6%] sm:right-[6%] z-10 p-1 font-bold bg-white cursor-pointer rounded-full transition-all"
          aria-label="Close modal"
        >
          <X size={18} strokeWidth={5} className="font-black" color="#0aaeff" />
        </button>

        {/* Modal Content */}
        <div className="flex flex-col h-full p-6 overflow-hidden">
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-[#00ADD8]"></div>
            </div>
          ) : questions.length > 0 ? (
            <>
              {/* Fixed Banner */}
              <div className="flex-shrink-0 mb-4">
                <QuestionModalBanner
                  serviceName={serviceName}
                  progressPercent={progressPercent}
                  question={questions[currentQuestion]?.questions}
                />
              </div>

              {/* Options Container - Fixed Height with Scroll */}
              <div
                className="overflow-y-auto"
                style={{
                  maxHeight: "300px",
                  minHeight: "200px",
                }}
              >
                <div className="flex flex-col gap-[7px]">
                  {formattedQuestions[currentQuestion]?.parsedAnswers.map(
                    (opt, index) => (
                      <label
                        key={index}
                        className="flex cursor-pointer items-center gap-2 rounded-[3px] border border-[#dedede] px-[10px] py-[10px] text-left text-sm font-medium text-black hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type={
                            formattedQuestions[currentQuestion]?.option_type ===
                            "single"
                              ? "radio"
                              : "checkbox"
                          }
                          name="surveyOption"
                          value={opt.option}
                          checked={selectedOption.includes(opt.option)}
                          onChange={handleOptionChange}
                          className="flex-shrink-0"
                        />
                        <span className="font-[Arial] font-medium tracking-[-0.03em] inline-block wrap-break-word text-black">
                          {opt.option}
                        </span>
                      </label>
                    )
                  )}

                  {/* Other Input */}
                  {formattedQuestions[currentQuestion]?.parsedAnswers.some(
                    (opt) => opt.option === "Something else (please describe)"
                  ) &&
                    selectedOption.includes(
                      "Something else (please describe)"
                    ) && (
                      <div className="mt-2">
                        <InputField
                          placeholder="Please Enter..."
                          value={otherText}
                          onChange={(e) => setOtherText(e.target.value)}
                          error={error && error}
                        />
                      </div>
                    )}
                </div>
              </div>

              {!selectedOption.includes("Something else (please describe)") &&
                error && <p className="text-xs text-red-600 flex items-start mt-1.5">{error}</p>}
              {/* Fixed Buttons - Always visible */}
              <div className="flex-shrink-0 mt-6 flex justify-between">
                {currentQuestion > 0 ? (
                  <Button1
                    variant="secondary"
                    onClick={handleBack}
                    className="cursor-pointer  border-none disabled:opacity-50"
                  >
                    Back
                  </Button1>
                ) : (
                  <div className="w-20"></div>
                )}

                <Button1
                  variant="primary"
                  onClick={handleNext}
                  disabled={requestLoader}
                  className="cursor-pointer  border-none disabled:opacity-50"
                >
                  {requestLoader ? (
                    <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                  ) : (
                    "Next"
                  )}
                </Button1>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-base text-black">
              <h2>No questions available</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
