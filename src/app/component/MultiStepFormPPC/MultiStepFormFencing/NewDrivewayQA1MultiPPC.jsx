"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import NewBuyerRequestQuestionOptionsBox from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestQuestionOptionsBox";
import NewMultiPPCCardLayoutWrapper from "../../common/MultiStepFormPPC/NewMultiStepFormDesingPPC/NewMultiPPCCardLayoutWrapper";
import useQuestionOptionScrollTop from "@/hooks/useQuestionOptionScrollTop";

const NewDrivewayQA1MultiPPC = ({
  questions = [],
  onNext,
  onBack,
  getProgressPercentage,
  setIsComingFromStep4,
  isComingFromStep4,
  progressPercentage
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);
  const firstStepProgress = (2 / 3) * 100;
  const remainingProgressPerStep = (100 - firstStepProgress) / 3;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
    const gridRef = useQuestionOptionScrollTop(currentQuestion);

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

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionText =
        formattedQuestions[currentQuestion]?.questions;

      const savedQuestion = buyerRequest.questions.find(
        (q) => q?.ques === currentQuestionText,
      );

      if (savedQuestion) {
        const savedAnswer = savedQuestion.ans || "";
        const savedArray =
          typeof savedAnswer === "string"
            ? savedAnswer.split(",").map((a) => a.trim())
            : [savedAnswer];

        setSelectedOption(savedArray);

        if (savedArray.includes("Something else (please describe)")) {
          const otherVal = savedArray.find(
            (val) => val !== "Something else (please describe)",
          );
          setOtherText(otherVal || "");
        } else {
          setOtherText("");
        }
      } else {
        setSelectedOption([]);
        setOtherText("");
      }
    }
  }, [currentQuestion, questions]);

  useEffect(() => {
    setOtherText("");
    setError("");
  }, [currentQuestion]);

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
        checked ? [...prev, value] : prev.filter((opt) => opt !== value),
      );
      setError("");
    }
  };

  const handleNextCheckBox = () => {
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

    const finalAnswer = selectedOption.map((opt) =>
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
      (a) => a.option === selectedOption[0],
    );

    const nextQ = selectedObj?.next_question;

    if (nextQ === Number(nextQ)) {
      onNext();
    } else if (nextQ === "last") {
      onNext();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      setQuestionHistory((prev) => {
        if (prev[prev.length - 1] !== questionIndexMap[nextQ]) {
          return [...prev, questionIndexMap[nextQ]];
        }
        return prev;
      });
      setCurrentQuestion(questionIndexMap[nextQ]);
      getProgressPercentage(remainingProgressPerStep);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => {
          if (prev[prev.length - 1] !== currentQuestion + 1) {
            return [...prev, currentQuestion + 1];
          }
          return prev;
        });
        getProgressPercentage(remainingProgressPerStep);

        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNext();
      }
    }
  };

  const handleNext = (selected) => {
    if (selected.length === 0) {
      setError("Please select at least one option.");
      return;
    }

    if (
      selected.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return;
    }

    const finalAnswer = selected.map((opt) =>
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
      (a) => a.option === selected[0],
    );

    const nextQ = selectedObj?.next_question;
    if (nextQ === Number(nextQ)) {
      onNext();
    } else if (nextQ === "last") {
      onNext();
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      setQuestionHistory((prev) => {
        if (prev[prev.length - 1] !== questionIndexMap[nextQ]) {
          return [...prev, questionIndexMap[nextQ]];
        }
        return prev;
      });
      setCurrentQuestion(questionIndexMap[nextQ]);
      getProgressPercentage(remainingProgressPerStep);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => {
          if (prev[prev.length - 1] !== currentQuestion + 1) {
            return [...prev, currentQuestion + 1];
          }
          return prev;
        });
        setCurrentQuestion(currentQuestion + 1);
        getProgressPercentage(remainingProgressPerStep);
      } else {
        onNext();
      }
    }
  };

  // const removeQuestionsAfter = (questionIndex) => {
  //   const updatedAnswers =
  //     buyerRequest?.questions?.slice(0, questionIndex + 1) || [];

  //   dispatch(setbuyerRequestData({ questions: updatedAnswers }));
  // };

  const removeQuestionsAfter = (questionIndex) => {
    const questionText = formattedQuestions[questionIndex]?.questions;

    const indexInAnswers = buyerRequest?.questions?.findIndex(
      (q) => q?.ques === questionText
    );

    if (indexInAnswers !== -1) {
      const updatedAnswers = buyerRequest.questions.slice(0, indexInAnswers);

      dispatch(setbuyerRequestData({ questions: updatedAnswers }));
    }
  };

  const handleBack = () => {
    setIsComingFromStep4(false);
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      removeQuestionsAfter(prevIndex);

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
      getProgressPercentage(-remainingProgressPerStep);
    } else {
      // dispatch(setbuyerRequestData({ questions: [] }));
      onBack();
      getProgressPercentage(-remainingProgressPerStep);
    }
  };

  if (questions.length === 0) {
    return (
      <div className={styles.noQuestions}>
        <h2>No questions available</h2>
      </div>
    );
  }
  useEffect(() => {
    if (isComingFromStep4 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(1);
      setQuestionHistory([0, 1]);
    }
  }, [isComingFromStep4]);

  return (
  <NewMultiPPCCardLayoutWrapper
        title={formattedQuestions[currentQuestion]?.questions}
        onButtonClick={handleNextCheckBox}
        onBackClick={handleBack}
        disableNextButton={
          formattedQuestions[currentQuestion]?.option_type === "single" &&
          !buyerRequest?.questions?.some(
            (q) => q?.ques === formattedQuestions[currentQuestion]?.questions,
          ) &&
          !selectedOption.includes("Something else (please describe)")
        }
        buttonText="Next"
        showBackButton={true}
        progressPercentage={progressPercentage}
        
      >
               <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[45vh] overflow-auto pr-2 pb-2">

                {formattedQuestions[currentQuestion]?.parsedAnswers.map(
                  (opt, index, arr) => {
                    const optionType = formattedQuestions[currentQuestion]?.option_type;
        
                    const isSingle = optionType === "single";
        
                    const isSelected = selectedOption.includes(opt.option);
        
                    const handleSelect = () => {
                      if (isSingle) {
                        setSelectedOption([opt.option]);
                        setError("");
                        if (opt.option !== "Something else (please describe)") {
                  handleNext([opt.option]);
                }
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
              {formattedQuestions[currentQuestion]?.answer?.includes(
                "Something else (please describe)",
              ) &&
                selectedOption.includes("Something else (please describe)") && (
                  <textarea
                    rows={3}
                    placeholder="Please enter...."
                    style={{ boxShadow: "0 0 7px .5px #0000001a" }}
                    className={`
                                                    relative w-full px-3 py-3 rounded-[16px] my-4
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
                    value={otherText}
                    onChange={(e) => {
                      setOtherText(e.target.value);
                      setError("");
                    }}
                  />
                )}
        
              {error && (
                <p className="text-[#ff4d4f] text-[14px] text-left mt-2">{error}</p>
              )}
      </NewMultiPPCCardLayoutWrapper>
  );
};

export default NewDrivewayQA1MultiPPC;
