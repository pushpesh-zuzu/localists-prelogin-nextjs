"use client";

import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProgressPercentageAPI, setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";

const QuestionAnswerMultiStepTreeSurgeon = ({
  questions = [],
  onNext,
  onBack,
  serviceName = "Tree Surgeon",
  setIsComingFromStep4,
  isComingFromStep4,
  setProgressPercentage,
  setSelectedOption,
  selectedOption,
  isStepFrom4,
  setIsStepFrom4,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);
  const { service, registerData } = useSelector((state) => state.findJobs);
  const { userToken, adminToken } = useSelector((state) => state.auth);


  const [currentQuestion, setCurrentQuestion] = useState(0);
  // const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isFirstQuestionAnswered, setIsFirstQuestionAnswered] = useState(false);

  const showToast = (type, content) => message[type](content);

  const totalQuestions = questions?.length;

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

  const questionIndexMap = useMemo(() => {
    const map = {};
    formattedQuestions.forEach((q, index) => {
      map[q.question_no] = index;
    });
    return map;
  }, [formattedQuestions]);

  //FIXED: Simplified saved answers loading
  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionText =
        formattedQuestions[currentQuestion]?.questions;

      // Find saved answer for CURRENT question
      const savedQuestion = buyerRequest.questions.find(
        (q) => q?.ques === currentQuestionText
      );

      if (savedQuestion) {
        const savedAnswer = savedQuestion.ans || "";
        const savedArray =
          typeof savedAnswer === "string"
            ? savedAnswer.split(",").map((a) => a.trim())
            : [savedAnswer];

        setSelectedOption(savedArray);

        // Simple "Something else" handling
        if (savedArray.includes("Something else (please describe)")) {
          const otherVal = savedArray.find(
            (val) => val !== "Something else (please describe)"
          );
          setOtherText(otherVal || "");
        } else {
          setOtherText("");
        }
      } else {
        // setSelectedOption([]);
        setOtherText("");
      }
    }
  }, [currentQuestion]); // ✅ Removed unnecessary dependencies

  useEffect(() => {
    setError("");
  }, [currentQuestion]);

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    const isSingle = questions[currentQuestion]?.option_type === "single";

    if (isSingle) {
      setSelectedOption([value]);
      setError("");

      // ✅ If option is NOT "Something else", move to next after short delay
      if (value !== "Something else (please describe)") {
        setTimeout(() => {
          handleNext([value]);
        }, 150);
      }
    } else {
      // ✅ For checkboxes
      setSelectedOption((prev) =>
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
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
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: questions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
    };

    // Copy previous answers
    const previousAnswers = buyerRequest?.questions || [];

    // Check if question already exists
    const questionIndex = previousAnswers?.findIndex(
      (q) => q?.ques === updatedAnswer?.ques
    );

    let updatedAnswers;
    if (questionIndex !== -1) {
      // Replace only if question already exists
      updatedAnswers = [...previousAnswers];
      updatedAnswers[questionIndex] = updatedAnswer;
    } else {
      // Append new answer
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;
    if (!isFirstQuestionAnswered) {
      setIsFirstQuestionAnswered(true);
      // setProgressPercentage(95);
    }
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
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => {
          if (prev[prev.length - 1] !== currentQuestion + 1) {
            return [...prev, currentQuestion + 1];
          }
          return prev;
        });
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNext();
      }
    }
    setSelectedOption([]);
  };

  const handleNext = async (selected) => {
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
      // Update existing question
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      // Add new question
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;
    if (nextQ !== "last") {
      try {
        const formData = new FormData();
        formData.append("questions", JSON.stringify(updatedAnswers));
        formData.append("service_id", buyerRequest?.service_id);
        const respone = await dispatch(getProgressPercentageAPI(formData));
        setProgressPercentage(respone?.percentage);
      } catch (error) {
        console.log(error, "error progressPercent");
      }
    }
    if (!isFirstQuestionAnswered) {
      setIsFirstQuestionAnswered(true);
    }
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
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => {
          if (prev[prev.length - 1] !== currentQuestion + 1) {
            return [...prev, currentQuestion + 1];
          }
          return prev;
        });
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onNext();
      }
    }
    setSelectedOption([]);
  };

  const removeAnswersAfterIndex = async (questionIndex) => {
    const updatedQuestions =
      buyerRequest?.questions?.slice(0, questionIndex + 1) || [];

    dispatch(setbuyerRequestData({ questions: updatedQuestions }));

    try {
      const formData = new FormData();
      formData.append("questions", JSON.stringify(updatedQuestions));
      formData.append("service_id", buyerRequest?.service_id);
      const response = await dispatch(getProgressPercentageAPI(formData));
      setProgressPercentage(response?.percentage);
    } catch (err) {
      console.error("Progress update failed:", err);
    }
  };

  const handleBack = async () => {
    setIsComingFromStep4(false);

    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];

      await removeAnswersAfterIndex(prevIndex);

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);

      // ✅ When going back to first question
      const lastQuestionsArray = buyerRequest.questions;

      // Check if array is not empty
      if (lastQuestionsArray.length > 0) {
        const lastAnswer =
          lastQuestionsArray[lastQuestionsArray.length - 1].ans;

        // Array format me set karna
        setSelectedOption(
          typeof lastAnswer === "string"
            ? lastAnswer.split(",").map((a) => a.trim())
            : [lastAnswer]
        );
      }
      // const updatedBuyerRequest = {
      //   ...buyerRequest,
      //   questions: [...buyerRequest.questions].slice(0, -1), // remove last
      // };

      // dispatch(setbuyerRequestData(updatedBuyerRequest));

      // // ✅ Send updated questions to API for progress calculation
      // try {
      //   const formData = new FormData();
      //   formData.append(
      //     "questions",
      //     JSON.stringify(updatedBuyerRequest.questions)
      //   );
      //   formData.append("service_id", updatedBuyerRequest.service_id);
      //   if (prevIndex === 0) {
      //     const response = await dispatch(getProgressPercentageAPI(formData));
      //     setProgressPercentage(response.percentage);
      //   }
      // } catch (err) {
      //   console.error("Error updating progress on back:", err);
      // }
    } else {
      onBack();
      setIsStepFrom4(false);
      // const updatedBuyerRequest = {
      //   ...buyerRequest,
      //   questions: [...buyerRequest.questions].slice(0, -1), // remove last
      // };

      // dispatch(setbuyerRequestData(updatedBuyerRequest));

      // // ✅ Send updated questions to API for progress calculation
      // try {
      //   const formData = new FormData();
      //   formData.append(
      //     "questions",
      //     JSON.stringify(updatedBuyerRequest.questions)
      //   );
      //   formData.append("service_id", updatedBuyerRequest.service_id);
      //   const response = await dispatch(getProgressPercentageAPI(formData));
      //   setProgressPercentage(response.percentage);
      // } catch (err) {
      //   console.error("Error updating progress on back:", err);
      // }
    }
  };
  const handleBack2 = async () => {
    setIsComingFromStep4(false);

    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop(); // remove current question index
      const prevIndex = newHistory[newHistory.length - 1]; // previous question index

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);

      // ✅ Find the question text of the previous question
      const prevQuestionText = formattedQuestions[prevIndex]?.questions;

      // ✅ Find saved answer for that question (if any)
      const prevSaved = buyerRequest?.questions?.find(
        (q) => q.ques === prevQuestionText
      );

      if (prevSaved?.ans) {
        // Split string answers into array
        const prevAnsArray =
          typeof prevSaved.ans === "string"
            ? prevSaved.ans.split(",").map((a) => a.trim())
            : [prevSaved.ans];

        setSelectedOption(prevAnsArray);
      } else {
        // No answer saved for previous question → clear selection
        setSelectedOption([]);
      }

      // ✅ Remove current (last) question from buyerRequest in Redux
      const updatedBuyerRequest = {
        ...buyerRequest,
        questions: buyerRequest.questions.slice(0, -1),
      };

      dispatch(setbuyerRequestData(updatedBuyerRequest));

      // ✅ Update progress if needed
      try {
        const formData = new FormData();
        formData.append(
          "questions",
          JSON.stringify(updatedBuyerRequest.questions)
        );
        formData.append("service_id", updatedBuyerRequest.service_id);

        if (prevIndex === 0) {
          const response = await dispatch(getProgressPercentageAPI(formData));
          setProgressPercentage(response.percentage);
        }
      } catch (err) {
        console.error("Error updating progress on back:", err);
      }
    } else {
      setProgressPercentage((pre) => pre - 10);
      onBack();
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
    return () => {
      // Cleanup function - runs when component unmounts
    };
  }, []);

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

export default QuestionAnswerMultiStepTreeSurgeon;
