"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
    setbuyerRequestData,
    clearSetbuyerRequestData,
    registerQuoteCustomer,
    questionAnswerData,
} from "@/lib/store/buyerslice/buyerSlice";
import useUserInfo from "@/utils/getUserIp";
import InputField from "../../UI/Inputs/InputField";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { getBarkToken } from "@/utils/CookiesHelper";
import { extractAllParams } from "@/utils/decodeURLParams";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import Modal from "../Modal";
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
    progressPercent,
}) => {
    const dispatch = useDispatch();
    const { buyerStep, buyerRequest, requestLoader, citySerach, questionanswerData } =
        useSelector((state) => state.buyer);
    const { service, registerData } = useSelector((state) => state.findJobs);

    const hasFetchedQuestions = useRef(false);

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
        if (onQuestionChange) {
            onQuestionChange(currentQuestion);
        }
    }, [currentQuestion]);

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

    // const handleOptionChange = (e) => {
    //     const { value, checked } = e.target;
    //     const isSingle = questions[currentQuestion]?.option_type === "single";

    //     if (isSingle) {
    //         setSelectedOption([value]);
    //         setError("");
    //     } else {
    //         setSelectedOption((prev) =>
    //             checked ? [...prev, value] : prev.filter((opt) => opt !== value)
    //         );
    //         setError("");
    //     }
    // };

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
                const formData = new FormData();
                formData.append("name", buyerRequest?.name);
                formData.append("email", buyerRequest?.email);
                formData.append("phone", buyerRequest?.phone);
                formData.append("questions", JSON.stringify(updatedAnswers));
                formData.append("service_id", serviceId || buyerRequest?.service_id);
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

            const trimmedAnswers =
                buyerRequest?.questions?.slice(0, prevIndex) || [];

            dispatch(setbuyerRequestData({ questions: trimmedAnswers }));

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

    useEffect(() => {
        if (hasFetchedQuestions.current) return;

        if (serviceId) {
            dispatch(questionAnswerData({ service_id: serviceId }));
            hasFetchedQuestions.current = true;
        }
    }, [dispatch, serviceId]);

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
            maxHeight="max-h-[80vh] lg:max-h-[90vh]"
            padding="pb-[20px] md:pb-[30px] lg:pb-[40px]"
            buyerStep={buyerStep}
            fixedHeight={true}
            showProgressBar={true}
            titleClassName="text-center"
            showButtons={true}
            buttongroup="lg:mx-[76px] md:mx-[60.4px] mx-4.5"
            progressPercent={progressPercent}
        >
            <div className="border border-[#D9D9D9] rounded-[5px] mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
                {loading ? (
                    <div className="flex-1 flex items-center justify-center py-3">
                        <LoaderIndicator size="large" />
                    </div>
                ) : questions.length > 0 ? (
                    <>
                        {/* Options Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-[20px] md:p-[40px]">
                            {formattedQuestions[currentQuestion]?.parsedAnswers.map(
                                (opt, index) => {
                                    const isSingle =
                                        formattedQuestions[currentQuestion]?.option_type === "single";

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

                                    return (
                                        <QuestionOptionsBox
                                            key={index}
                                            label={opt.option}
                                            isSelected={isSelected}
                                            onSelect={handleSelect}
                                            isMulti={!isSingle}
                                        />
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
                                <div className="px-5 md:px-9.5">
                                    <InputField
                                        placeholder="Please Enter..."
                                        value={otherText}
                                        onChange={(e) => setOtherText(e.target.value)}
                                    />
                                </div>
                            )}

                        {/* Error */}
                        {error && (
                            <p className="text-sm text-red-600 px-9 pt-2 pb-4">
                                {error}
                            </p>)}
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
