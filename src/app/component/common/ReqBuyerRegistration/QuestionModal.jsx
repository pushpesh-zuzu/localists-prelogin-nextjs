"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setbuyerRequestData,
    clearSetbuyerRequestData,
    questionAnswerData,
} from "@/lib/store/buyerslice/buyerSlice";
import InputField from "../../UI/Inputs/InputField";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { getBarkToken } from "@/utils/CookiesHelper";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import Modal from "./Modal/Modal";
import QuestionOptionsBox from "./QuestionOptionsBox";

const QuestionModal = ({
    questions = [],
    serviceName,
    serviceId,
    onClose,
    nextStep,
    previousStep,
    loading = false,
    setShowConfirmModal,
    isStartWithQuestionModal = false,
    onQuestionChange,
    initialQuestionIndex = 0,
    progressPercent,
}) => {
    const dispatch = useDispatch();
    const { buyerStep, buyerRequest, citySerach, questionanswerData } =
        useSelector((state) => state.buyer);
    const { service } = useSelector((state) => state.findJobs);

    const hasFetchedQuestions = useRef(false);

    const formattedQuestions = useMemo(() => questions.map((q) => ({
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
    })), [questions]);

    const getQuestionHistoryFromAnswers = () => {
        const savedQuestions = buyerRequest?.questions || [];
        const savedHistory = savedQuestions
            .map((answer) =>
                formattedQuestions.findIndex(
                    (question) => question?.questions === answer?.ques
                )
            )
            .filter((index) => index !== -1);

        if (savedHistory.length > 0) {
            return savedHistory;
        }

        return [initialQuestionIndex];
    };

    const initialHistory = getQuestionHistoryFromAnswers();
    const [currentQuestion, setCurrentQuestion] = useState(
        initialHistory[initialHistory.length - 1] ?? initialQuestionIndex
    );
    const [selectedOption, setSelectedOption] = useState([]);
    const [otherText, setOtherText] = useState("");
    const [error, setError] = useState("");
    const [questionHistory, setQuestionHistory] = useState(initialHistory);

    useEffect(() => {
        if (onQuestionChange) {
            onQuestionChange(currentQuestion);
        }
    }, [currentQuestion, onQuestionChange]);

    useEffect(() => {
        if (questions.length > 0) {
            const questionText = formattedQuestions[currentQuestion]?.questions;
            const savedAnswerData = buyerRequest?.questions?.find(
                (question) => question?.ques === questionText
            );
            const savedAnswer = savedAnswerData?.ans || [];

        const savedArray =
            typeof savedAnswer === "string"
                ? savedAnswer.split(",").map((a) => a.trim())
                : savedAnswer;

        const options =
            formattedQuestions[currentQuestion]?.parsedAnswers || [];

        const isOnlyOther =
            options.length === 1 &&
            options[0].option === "Something else (please describe)";

        // 🔥 CASE 1: No saved answer
        if (savedArray.length === 0) {
            const timer = setTimeout(() => {
                if (isOnlyOther) {
                    setSelectedOption(["Something else (please describe)"]);
                } else {
                    setSelectedOption([]);
                }
                setOtherText("");
            }, 0);

            return () => clearTimeout(timer);
        }

        // 🔥 CASE 2: Saved answer exists (BACK case fix)
        const otherVal = savedArray.find(
            (ans) =>
                ans.toLowerCase() !== "yes" &&
                ans.toLowerCase() !== "no" &&
                ans.toLowerCase() !== "maybe"
        );

        const timer = setTimeout(() => {
            if (isOnlyOther) {
                // force select "Something else"
                setSelectedOption(["Something else (please describe)"]);
                setOtherText(otherVal || "");
            } else {
                setSelectedOption(savedArray);
                setOtherText(
                    savedArray.includes("Something else (please describe)")
                        ? otherVal || ""
                        : ""
                );
            }
        }, 0);

        return () => clearTimeout(timer);
    }
}, [currentQuestion, buyerRequest, formattedQuestions, questions]);

    const totalQuestions = questions?.length;

    const questionIndexMap = {};
    formattedQuestions.forEach((q, index) => {
        questionIndexMap[q.question_no] = index;
    });

    const handleNext = (directValue = null) => {
        const finalSelection = directValue ? [directValue] : selectedOption;

        if (finalSelection.length === 0) {
            setError("Please select at least one option.");
            return;
        }

        if (
            finalSelection.includes("Something else (please describe)") &&
            (!otherText.trim() ||
                otherText.trim().toLowerCase() ===
                "something else (please describe)")
        ) {
            setError("Please enter a value for 'Other' option.");
            return;
        }

        const finalAnswer = finalSelection.map((opt) =>
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

        let updatedAnswers;
        if (existingIndex !== -1) {
            updatedAnswers = [...previousAnswers];
            updatedAnswers[existingIndex] = updatedAnswer;
        } else {
            updatedAnswers = [...previousAnswers, updatedAnswer];
        }

        dispatch(setbuyerRequestData({ questions: updatedAnswers }));

        const selectedObj =
            formattedQuestions[currentQuestion]?.parsedAnswers.find(
                (a) => a.option === finalSelection[0]
            );

        const nextQ = selectedObj?.next_question;

        if (nextQ === "last") {
            if (isStartWithQuestionModal) {
                dispatch(
                    setbuyerRequestData({
                        service_id: serviceId || service?.id || buyerRequest?.service_id,
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
                nextStep();
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
            //     buyerRequest?.questions?.slice(0, prevIndex) || [];

            // dispatch(setbuyerRequestData({ questions: trimmedAnswers }));

            const questionText = formattedQuestions[prevIndex]?.questions;

            const indexInAnswers = buyerRequest?.questions?.findIndex(
                (q) => q?.ques === questionText
            );

            if (indexInAnswers !== -1) {
                const updatedAnswers = buyerRequest.questions.slice(0, indexInAnswers + 1);

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
            onClose?.();
            dispatch(clearSetbuyerRequestData());
            dispatch(clearBuyerRegisterFormData());
        } else {
            if (!getBarkToken()) {
                setShowConfirmModal(true);
            } else {
                onClose?.();
                dispatch(clearSetbuyerRequestData());
                dispatch(clearBuyerRegisterFormData());
            }
        }
    };

    useEffect(() => {
        if (hasFetchedQuestions.current) return;
        if (questionanswerData?.length > 0) return;

        if (serviceId) {
            dispatch(questionAnswerData({ service_id: serviceId }));
            hasFetchedQuestions.current = true;
        }
    }, [dispatch, questionanswerData?.length, serviceId]);
   

    return (
        <Modal
            onClose={() => {
                handleCloseClick();
            }}
            isOpen={true}
            title={formattedQuestions[currentQuestion]?.questions}
            onNext={() => handleNext()}
            onBack={handleBack}
            maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
            maxHeight="max-h-[87vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
            buyerStep={buyerStep}
            fixedHeight={true}
            showProgressBar={true}
            titleClassName="text-center"
            showButtons={true}
            buttongroup="lg:mx-[76px] md:mx-[60.4px] mx-4.5"
            progressPercent={progressPercent}
            marginTop="lg:mt-[12vh] mt-[5vh]"
        >
            <div className="border border-[#D9D9D9] rounded-[30px] mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-4">
                        <LoaderIndicator size="large" />
                    </div>
                ) : questions.length > 0 ? (
                    <>
                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-[20px] md:p-[40px]">
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
                                                    : [...prev, opt.option]
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
                                            <QuestionOptionsBox
                                                label={opt.option}
                                                isSelected={isSelected}
                                                onSelect={handleSelect}
                                            />
                                            {/* </div> */}
                                        </div>
                                    );
                                }
                            )}
                        </div>

                        {/* Other Input */}
                        {formattedQuestions[currentQuestion]?.parsedAnswers.some(
                            (opt) => opt.option === "Something else (please describe)"
                        ) &&
                            selectedOption.includes(
                                "Something else (please describe)"
                            ) && (
                                <div className="px-5 md:px-9.5 mb-5 md:mb-10">
                                    <InputField
                                        placeholder="Please Enter..."
                                        value={otherText}
                                        onChange={(e) => {setOtherText(e.target.value);setError(""); }}
                                    />
                        {error && (
                            <p className="text-sm text-red-600  pt-2">
                                {error}
                            </p>)}
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
        </Modal>
    );
};

export default QuestionModal;
