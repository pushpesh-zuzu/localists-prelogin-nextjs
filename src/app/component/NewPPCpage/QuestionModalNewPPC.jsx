"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import {
    setbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import { extractAllParams } from "@/utils/decodeURLParams";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";

import FormWrapper from "./FormWrapper";
import CardLayoutWrapper from "./CardLayoutWrapper";
import H5 from "../UI/Typography/H5";

const keyframesCSS = `
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(-30px); }
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes slideOutRight {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(30px); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes fadeOut {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.95); }
}
@keyframes blurIn {
  from { opacity: 0; filter: blur(10px); }
  to { opacity: 1; filter: blur(0); }
}
@keyframes blurOut {
  from { opacity: 1; filter: blur(0); }
  to { opacity: 0; filter: blur(10px); }
}
`;

const CustomSpinner = ({ size = "large" }) => (
    <div
        className={`inline-block rounded-full border-4 border-solid border-gray-200 border-t-blue-500 ${size === "large" ? "h-12 w-12" : "h-8 w-8"
            } animate-spin`}
        role="status"
        aria-label="Loading"
    >
        <span className="sr-only">Loading...</span>
    </div>
);

const QuestionModalNewPPC = ({
    questions = [],
    nextStep,
    loading = true,
    isQuestionWithImage = false,
    backButtonTriggered
}) => {
    const dispatch = useDispatch();
    const { buyerRequest, requestLoader, citySerach, questionLoader } =
        useSelector((state) => state.buyer);
    const searchParams = useSearchParams();
    const allParams =
        typeof window !== "undefined" &&
        extractAllParams(searchParams ? searchParams.toString() : window.location.search);

    const campaignid = allParams.gad_campaignid || "";
    const keyword = allParams.keyword || "";
    const gclid = allParams.gclid || "";
    const campaign = allParams.utm_campaign || "";
    const adGroup = allParams.AgId || "";
    const targetID = allParams.utm_term || "";
    const msclickid = allParams.utm_msclkid || "";
    const utm_source = allParams.utm_source || "";
    const optionsContainerRef = useRef(null);


    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState([]);
    const [otherText, setOtherText] = useState("");
    const [error, setError] = useState("");
    const [questionHistory, setQuestionHistory] = useState([0]);
    const [showDelay, setShowDelay] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [animationDirection, setAnimationDirection] = useState("next");


    useEffect(() => {
        backButtonTriggered && setSelectedOption([''])
    }, [backButtonTriggered])

    const hasInitializedRef = useRef(false);

    useEffect(() => {
        if (questions.length > 0 && currentQuestion === -1) {
            setCurrentQuestion(0);
        }
    }, [questions]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setShowDelay(true);
        }, 2500);
        return () => clearTimeout(timeoutId);
    }, []);

    useEffect(() => {
        if (
            questions.length > 0 &&
            buyerRequest?.questions?.length > 0 &&
            !hasInitializedRef.current
        ) {
            const savedQuestions = buyerRequest.questions;
            const reconstructedHistory = [0];

            savedQuestions.forEach((savedQ, index) => {
                if (index > 0) {
                    const questionIndex = questionIndexMap[savedQ.question_no];
                    if (questionIndex !== undefined) {
                        reconstructedHistory.push(questionIndex);
                    }
                }
            });

            const lastQuestionNo = savedQuestions[savedQuestions.length - 1]?.question_no;
            const lastQuestionIndex = questionIndexMap[lastQuestionNo];

            if (lastQuestionIndex !== undefined) {
                setQuestionHistory(reconstructedHistory);
                setCurrentQuestion(lastQuestionIndex);
            }

            hasInitializedRef.current = true;
        }
    }, [questions, buyerRequest?.questions]);

    useEffect(() => {
        return () => {
            hasInitializedRef.current = false;
        };
    }, []);

    useEffect(() => {
        if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
            const savedAnswer = buyerRequest.questions.find(
                q => q.question_no === formattedQuestions[currentQuestion]?.question_no
            )?.ans || [];
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

    // Animation functions
    // const animateQuestionChange = (direction, callback) => {
    //     if (isAnimating) return;
    //     setIsAnimating(true);
    //     setAnimationDirection(direction);
    //     setTimeout(() => {
    //         if (callback) callback();
    //         setIsAnimating(false);
    //     }, 300);
    // };

    const handleOptionChange = (e) => {
        const { value, checked } = e.target;
        const isSingle = questions[currentQuestion]?.option_type === "single";

        if (isSingle) {
            setSelectedOption([value]);
            setError("");
            if (value !== "Something else (please describe)") {
                setTimeout(() => {
                    handleNext([value]);
                }, 150);
            }
        } else {
            setSelectedOption((prev) =>
                checked ? [...prev, value] : prev.filter((opt) => opt !== value)
            );
            setError("");
        }
    };

    const handleNextCheckBox = () => {
        if (selectedOption.length === 0) {
            setError("Please select at least one option");
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
            question_no: formattedQuestions[currentQuestion]?.question_no,
        };

        const previousAnswers = buyerRequest?.questions || [];

        const existingIndex = previousAnswers.findIndex(
            (item) => item?.question_no === updatedAnswer.question_no
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

        setSelectedOption([]);
        setOtherText("");
        setError("");

        // console.log(nextQ, "nextQnextQ");
        if (nextQ === "last") {
            nextStep();
        } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
            const nextIndex = questionIndexMap[nextQ];

            // Update both states in sequence
            setQuestionHistory(prev => {
                const newHistory = [...prev, nextIndex];
                return newHistory;
            });

            // Use setTimeout to ensure state updates in correct order
            setTimeout(() => {
                setCurrentQuestion(nextIndex);
            }, 0);

        } else {
            if (currentQuestion < totalQuestions - 1) {
                const nextIndex = currentQuestion + 1;

                setQuestionHistory(prev => {
                    const newHistory = [...prev, nextIndex];
                    return newHistory;
                });

                // Use setTimeout to ensure state updates in correct order
                setTimeout(() => {
                    setCurrentQuestion(nextIndex);
                    // animateQuestionChange("next");
                }, 0);
            } else {
                nextStep();
            }
        }
    };

    const handleNext = (selected) => {
        if (selected.length === 0) {
            setError("Please select at least one option");
            return;
        }

        if (
            selected.includes("Something else (please describe)") &&
            (!otherText.trim() ||
                otherText.trim().toLowerCase() === "something else (please describe)")
        ) {
            setError("Please enter a value for 'Other' option");
            return;
        }

        const finalAnswer = selected?.map((opt) =>
            opt.toLowerCase() === "something else (please describe)" ? otherText : opt
        );

        const updatedAnswer = {
            ques: questions[currentQuestion]?.questions,
            ans: finalAnswer.join(", "),
            question_no: formattedQuestions[currentQuestion]?.question_no,
        };

        const previousAnswers = buyerRequest?.questions || [];

        const existingIndex = previousAnswers.findIndex(
            (item) => item?.question_no === updatedAnswer.question_no
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
            (a) => a.option === selected[0]
        );
        const nextQ = selectedObj?.next_question;

        setSelectedOption([]);
        setOtherText("");
        setError("");

        if (nextQ === "last") {
            nextStep();
        } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
            const nextIndex = questionIndexMap[nextQ];

            setQuestionHistory(prev => {
                const newHistory = [...prev, nextIndex];
                return newHistory;
            });

            setTimeout(() => {
                setCurrentQuestion(nextIndex);
            }, 0);

        } else {
            if (currentQuestion < totalQuestions - 1) {
                const nextIndex = currentQuestion + 1;

                setQuestionHistory(prev => {
                    const newHistory = [...prev, nextIndex];
                    return newHistory;
                });

                // Use setTimeout to ensure state updates in correct order
                setTimeout(() => {
                    setCurrentQuestion(nextIndex);
                }, 0);
            } else {
                nextStep();
            }
        }
    };

    const handleBack = () => {
        if (questionHistory.length > 1) {
            const newHistory = [...questionHistory];
            newHistory.pop();
            const prevIndex = newHistory[newHistory.length - 1];
            setQuestionHistory(newHistory);

            setTimeout(() => {
                setCurrentQuestion(prevIndex);
            }, 0);
            setError("");

            const currentQuestionNo = formattedQuestions[currentQuestion]?.question_no;
            const updatedAnswers = buyerRequest?.questions?.filter(
                (q) => q.question_no !== currentQuestionNo
            ) || [];
            dispatch(setbuyerRequestData({ questions: updatedAnswers }));
            setSelectedOption([]);
            setOtherText("");
        } else {
            handleScrollToBottom();
        }
    };

    useEffect(() => {
        setSelectedOption([]);
        setOtherText("");
    }, [currentQuestion]);

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

    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < 768) {
            handleScrollToBottom();
        }
        if (optionsContainerRef.current) {
            optionsContainerRef.current.scrollTop = 0;
        }
    }, [currentQuestion]);


    const modalOverlayClass = "relative top-0 left-0 w-full flex items-center justify-center";
    const modalContentClass = `bg-white px-[20px] py-[24px] w-[440px] text-center text-[#253238] transition-all duration-300 ease-in-out ${isAnimating
        ? animationDirection === "next"
            ? "[animation:slideOutLeft_0.3s_ease-in_forwards]"
            : "[animation:slideOutRight_0.3s_ease-in_forwards]"
        : animationDirection === "next"
            ? "[animation:slideInRight_0.3s_ease-out_forwards]"
            : "[animation:slideInLeft_0.3s_ease-out_forwards]"
        }`;
    const loaderContainerClass = "flex justify-center items-center mx-auto min-h-[320px] max-w-[300px] w-[300px]";
    const noQuestionClass = "flex justify-center items-center h-[200px] text-base text-[#253238]";
    const optionsContainerClass = `flex flex-col mt-3 gap-[12px] overflow-auto max-h-[40vh] transition-all duration-300 ${isAnimating ? "[animation:fadeIn_0.3s_ease-out_forwards]" : ""
        }`;
    const optionClass = "flex items-center gap-[8px] border-2 border-[#e1e5e9] px-[15px] py-[10px] cursor-pointer font-semibold rounded-[3px] text-[#253238] text-start hover:bg-gray-50 transition-colors duration-200 font-[Arial] tracking-[-0.03em] leading-[20px] text-[16px] max-[768px]:text-[16px] max-[480px]:text-[16px]";
    const inputClass = "w-full font-[Arial] tracking-[-0.03em] px-[10.5px] py-[10px] border border-[#d9d9d9] outline-none rounded-[3px] disabled:opacity-50 leading-[20px] text-[16px] max-[768px]:text-[16px] max-[480px]:text-[16px]";
    const errorMessageClass = "text-red-500 text-start text-sm mt-2";
    const question1Class = "w-full mb-[15px] text-[#253238]";

    return (
        <>
            <style jsx global>{keyframesCSS}</style>
            <FormWrapper>
                <div className={modalOverlayClass} onClick={(e) => e.stopPropagation()}>
                    <div className={modalContentClass}>
                        {loading ? (
                            <div className={loaderContainerClass}>
                                <CustomSpinner size="large" />
                            </div>
                        ) : questions.length > 0 ? (
                            <>
                                <CardLayoutWrapper
                                    loader={requestLoader}
                                    title={
                                        currentQuestion === 0
                                            ? !isQuestionWithImage
                                                ? ""
                                                : ""
                                            : (
                                                <div className="max-[768px]:mt-[-30px]">
                                                    {questions[currentQuestion]?.questions}
                                                </div>
                                            )
                                    }
                                    onButtonClick={handleNextCheckBox}
                                    onBackClick={handleBack}
                                    showBackButton={currentQuestion === 0 ? false : true}
                                    buttonText="Next"
                                    headingCenter={currentQuestion === 0 ? false : true}
                                    subtitle={
                                        currentQuestion === 0
                                            ? !isQuestionWithImage
                                                ? ""
                                                : ""
                                            : ""
                                    }
                                >
                                    {currentQuestion === 0 && (
                                        <H5
                                            className={`${question1Class} !leading-[30px] max-[768px]:mt-[-30px] font-bold text-[#253238] ${isQuestionWithImage ? "text-center" : "text-left"
                                                }`}
                                        >
                                            {formattedQuestions[currentQuestion]?.questions}
                                        </H5>
                                    )}
                                    <div ref={optionsContainerRef} className={optionsContainerClass}>
                                        {formattedQuestions[currentQuestion]?.parsedAnswers.map(
                                            (opt, index) => (
                                                <label key={index} className={optionClass}>
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
                                                        disabled={isAnimating || requestLoader}
                                                        className="mt-0 flex-shrink-0 h-4 w-4"
                                                    />
                                                    <span className="break-words">{opt.option}</span>
                                                </label>
                                            )
                                        )}
                                        {formattedQuestions[currentQuestion]?.answer?.includes(
                                            "Something else (please describe)"
                                        ) &&
                                            selectedOption.includes(
                                                "Something else (please describe)"
                                            ) && (
                                                <input
                                                    type="text"
                                                    placeholder="Please Enter..."
                                                    className={inputClass}
                                                    value={otherText}
                                                    onChange={(e) => {
                                                        setOtherText(e.target.value);
                                                        if (error) setError("");
                                                    }} disabled={isAnimating}
                                                />
                                            )}
                                    </div>

                                    {error && <p className={errorMessageClass}>{error}</p>}
                                </CardLayoutWrapper>
                            </>
                        ) : (
                            <div className={noQuestionClass}>
                                <h2>No questions available</h2>
                            </div>
                        )}
                    </div>
                </div>
            </FormWrapper>
        </>
    );
};

export default QuestionModalNewPPC;
