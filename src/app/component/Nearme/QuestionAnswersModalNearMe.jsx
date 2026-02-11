"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setbuyerRequestData,
    clearSetbuyerRequestData,
    setQuestionsForProgress
} from "@/lib/store/buyerslice/buyerSlice";
import InputField from "../UI/Inputs/InputField";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { getBarkToken } from "@/utils/CookiesHelper";
import { X } from "lucide-react";
import Button1 from "../UI/Typography/Button1";
import QuestionModalBanner from "../common/BuyerRegistration/QuestionModalBanner";


const QuestionAnswersModalNearMe = ({
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
    const { buyerRequest, requestLoader, citySerach, questionanswerData, questionsForProgress = [] } =
        useSelector((state) => state.buyer);
    const { service } = useSelector((state) => state.findJobs);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);
    const [otherText, setOtherText] = useState("");
    const [error, setError] = useState("");
    const [questionHistory, setQuestionHistory] = useState([0]);

    const restoredRef = React.useRef(false);

    const formattedQuestions = useMemo(() => {
        return questions.map((q) => ({
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
    }, [questions]);


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

    const totalQuestions = questions?.length;

    const questionIndexMap = {};
    formattedQuestions.forEach((q, index) => {
        questionIndexMap[q.question_no] = index;
    });

    const progressPercentage = totalQuestions
        ? Math.round((questionsForProgress.length / totalQuestions) * 100)
        : 0;

    useEffect(() => {
        if (
            restoredRef.current ||
            !buyerRequest?.questions?.length ||
            !formattedQuestions.length
        ) return;

        const answeredIndexes = buyerRequest.questions
            .map(q =>
                formattedQuestions.findIndex(fq => fq.questions === q.ques)
            )
            .filter(i => i !== -1);

        if (answeredIndexes.length) {
            const lastIndex = answeredIndexes[answeredIndexes.length - 1];
            setQuestionHistory(answeredIndexes);
            setCurrentQuestion(lastIndex);
        }

        restoredRef.current = true;
    }, []);

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        const isSingle =
            formattedQuestions[currentQuestion]?.option_type === "single";

        if (value === "Something else (please describe)") {
            setOtherText("");
        }

        if (isSingle) {
            const newSelected = [value];
            setSelectedOption(newSelected);
            setError("");

            // ✅ AUTO NEXT FOR RADIO QUESTIONS
            if (value !== "Something else (please describe)") {
                setTimeout(() => {
                    handleNext(newSelected);
                }, 150); // small delay to allow state update
            }
        } else {

            const newSelected = checked
                ? [...selectedOption, value]
                : selectedOption.filter((opt) => opt !== value);

            setSelectedOption(newSelected);
            setError("");
        }
    };

    const handleNext = (overrideSelected) => {
        let effectiveSelected = Array.isArray(overrideSelected)
            ? overrideSelected
            : selectedOption;

        if (!Array.isArray(effectiveSelected) || effectiveSelected.length === 0) {
            setError("Please select at least one option.");
            return;
        }

        if (
            effectiveSelected.includes("Something else (please describe)") &&
            (!otherText.trim() ||
                otherText.trim().toLowerCase() === "something else (please describe)")
        ) {
            setError("Please enter a value for 'Other' option.");
            return;
        }

        const finalAnswer = effectiveSelected.map((opt) =>
            opt.toLowerCase() === "something else (please describe)"
                ? otherText
                : opt
        );

        const updatedAnswer = {
            ques: questions[currentQuestion]?.questions,
            ans: finalAnswer.join(", "),
        };

        const previousAnswers = buyerRequest?.questions || [];
        const existingIndex = previousAnswers.findIndex(
            (item) => item?.ques === updatedAnswer.ques
        );

        const updatedAnswers =
            existingIndex !== -1
                ? previousAnswers.map((a, i) =>
                    i === existingIndex ? updatedAnswer : a
                )
                : [...previousAnswers, updatedAnswer];

        dispatch(setbuyerRequestData({ questions: updatedAnswers }));

        const progressItem = {
            ...updatedAnswer,
            number: formattedQuestions[currentQuestion]?.question_no,
        };

        const filteredProgress = questionsForProgress.filter(
            (q) => q.number !== progressItem.number
        );

        dispatch(setQuestionsForProgress([...filteredProgress, progressItem]));

        const isSingle =
            formattedQuestions[currentQuestion]?.option_type === "single";

        let nextQ = null;

        if (isSingle) {
            const selectedObj =
                formattedQuestions[currentQuestion]?.parsedAnswers.find(
                    (a) => a.option === effectiveSelected[0]
                );
            nextQ = selectedObj?.next_question;
        }

        //LAST QUESTION
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
            }
            nextStep();
            return;
        }

        // JUMP TO SPECIFIC QUESTION
        if (nextQ && questionIndexMap[nextQ] !== undefined) {
            setQuestionHistory((prev) =>
                prev[prev.length - 1] === questionIndexMap[nextQ]
                    ? prev
                    : [...prev, questionIndexMap[nextQ]]
            );
            setCurrentQuestion(questionIndexMap[nextQ]);
            return;
        }

        // NORMAL NEXT QUESTION (checkbox & default)
        if (currentQuestion < totalQuestions - 1) {
            setQuestionHistory((prev) =>
                prev[prev.length - 1] === currentQuestion + 1
                    ? prev
                    : [...prev, currentQuestion + 1]
            );
            setCurrentQuestion(currentQuestion + 1);
            return;
        }

        nextStep();
    };


    const handleBack = () => {
        if (questionHistory.length > 1) {
            // Update question history
            const newHistory = [...questionHistory];
            newHistory.pop();
            const prevIndex = newHistory[newHistory.length - 1];

            setQuestionHistory(newHistory);
            setCurrentQuestion(prevIndex);

            // Remove last progress item (IMPORTANT)
            const newProgress = [...questionsForProgress];
            newProgress.pop();

            dispatch(setQuestionsForProgress(newProgress));
        } else {
            // First question
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
                                    progressPercent={progressPercentage}
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
                                {questionHistory.length > 0 && (
                                    <Button1
                                        variant="secondary"
                                        onClick={handleBack}
                                    >
                                        Back
                                    </Button1>
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

export default QuestionAnswersModalNearMe;
