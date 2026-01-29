"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";

const QuestionAnswerMultiStepFence = ({
  questions = [],
  onNext,
  onBack,
  getProgressPercentage,
  setIsComingFromStep4,
  isComingFromStep4,
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

  const removeQuestionsAfter = (questionIndex) => {
    const updatedAnswers =
      buyerRequest?.questions?.slice(0, questionIndex + 1) || [];

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));
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
      dispatch(setbuyerRequestData({ questions: [] }));
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
    <CardLayoutWrapper
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
    >
      <div className="flex flex-col gap-3 mb-4 max-h-[45vh] overflow-auto">
        {formattedQuestions[currentQuestion]?.parsedAnswers.map(
          (opt, index) => {
            const isSelected = selectedOption.includes(opt.option);
            return (
              <label
                key={index}
                className={`
                  flex items-start gap-3 
                  border-2 ${isSelected ? "border-[#0096c4] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.15)]" : "border-[#e1e5e9]"} 
                  rounded px-4 py-3 
                  cursor-pointer 
                  text-[16px] font-medium 
                  text-gray-900 
                  transition-all duration-300 ease-in-out 
                  text-left 
                  hover:border-[#0096c4] hover:bg-[#f8fdff]
                  md:text-[15px] md:py-[14px]
                  sm:text-[14px] sm:py-3 sm:gap-2.5
                `}
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
                  onClick={(e) => {
                    const isSingle =
                      formattedQuestions[currentQuestion]?.option_type ===
                      "single";
                    if (isSingle && selectedOption.includes(opt.option)) {
                      onNext();
                    }
                  }}
                  className="mt-1 flex-shrink-0 h-[14px] w-[14px]"
                />
                <span className="inline-block break-words leading-[1.4]">
                  {opt.option}
                </span>
              </label>
            );
          },
        )}

        {formattedQuestions[currentQuestion]?.answer?.includes(
          "Something else (please describe)",
        ) &&
          selectedOption.includes("Something else (please describe)") && (
            <input
              type="text"
              placeholder="Please enter..."
              className="
                w-full px-3 py-3 
                text-[16px] 
                border border-[#d9d9d9] 
                h-[44px] 
                rounded 
                mt-2
                focus:outline-none 
                focus:border-[#0096c4] 
                placeholder:text-[#959595] 
                placeholder:font-normal
                md:text-[15px] md:h-[44px]
                sm:w-full sm:py-[10.5px] sm:px-3 sm:text-[16px] sm:h-auto sm:mt-3
              "
              value={otherText}
              onChange={(e) => setOtherText(e.target.value)}
            />
          )}
      </div>

      {error && (
        <p className="text-[#ff4d4f] text-[14px] text-left mt-2">{error}</p>
      )}
    </CardLayoutWrapper>
  );
};

export default QuestionAnswerMultiStepFence;
