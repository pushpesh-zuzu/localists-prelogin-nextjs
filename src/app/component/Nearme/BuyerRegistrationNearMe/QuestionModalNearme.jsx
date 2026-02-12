import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToBottom } from "@/utils/scroll";
import BannerImagesQuestion from "../../common/MultiStepFormPPC/BannerImagesQuestion";
import { getProgressPercentageAPI, setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";
import CardLayoutWrapperNearme from "./CardLayoutWrapperNearme";

const QuestionModalNearme = ({
  questions = [],
  onNext,
  onBack,
  isComingFromStep2 = false,
  setQuestionHistory,
  questionHistory,
  setIsComingFromStep2,
  setProgressPercentage,
  progressPercentage,
  loading = true,
  serviceName = "Driveway Installers",
  isQuestionWithImage = false,
  setQuestion2History,
  question2History,
  setSelectedOption,
  selectedOption,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(1);
  // const [progressPercentage, setProgressPercentage] = useState(0);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");

  const questionContainerRef = useRef(null);

  const totalQuestions = questions?.length || 1;

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
    if (isComingFromStep2 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(question2History.at(-1));
      setTotalQuestionsAnswered(5);
      setQuestionHistory(question2History);
    }
  }, [isComingFromStep2]);

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const savedAnswer = buyerRequest.questions[currentQuestion]?.ans || [];
      const savedArray =
        typeof savedAnswer === "string"
          ? savedAnswer.split(",").map((a) => a.trim())
          : savedAnswer;
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

    questionContainerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    handleScrollToBottom();
  }, [currentQuestion, buyerRequest, questions]);
  //   useEffect(() => {
  //     if (buyerRequest && Array.isArray(buyerRequest.questions)) {
  //       const hasSpecialAnswer = buyerRequest.questions.some(
  //         (q) =>
  //           q?.ans === "Replace the current driveway" ||
  //           q?.ans === "Business or Commercial Premises"
  //       );

  //       if (hasSpecialAnswer) {
  //         SpecialFlowPercentage(70);
  //       } else {
  //         SpecialFlowPercentage(90);
  //       }
  //     }
  //   }, [buyerRequest]);

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

  const handleNextCheckBox = async () => {
    if (selectedOption.length === 0) {
      setError("Please select at least one option.");
      // questionContainerRef.current?.scrollIntoView({
      //   behavior: 'smooth',
      //   block: 'end'
      // });
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
    try {
      const formData = new FormData();
      formData.append("questions", JSON.stringify(updatedAnswers));
      formData.append("service_id", buyerRequest?.service_id);
      const respone = await dispatch(getProgressPercentageAPI(formData));
      setProgressPercentage(respone?.percentage);
    } catch (error) {
      console.log(error, "progressPercent");
    }
    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );

    const nextQ = selectedObj?.next_question;

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    let nextIndex = null;
    if (nextQ === "last") {
      onNext();
      return;
    } else if (nextQ === "last") {
      onNext();
      return;
    } else if (nextQ && questionIndexMap[nextQ]) {
      nextIndex = questionIndexMap[nextQ];
    } else if (currentQuestion < totalQuestions - 1) {
      nextIndex = currentQuestion + 1;
    }

    if (nextIndex !== null) {
      if (!questionHistory.includes(nextIndex)) {
        setQuestionHistory((prev) => [...prev, nextIndex]);
        setQuestion2History((prev) => [...prev, questionIndexMap[nextQ]]);
      }
      setCurrentQuestion(nextIndex);
    } else {
      onNext();
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
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }
    try {
      const formData = new FormData();
      formData.append("questions", JSON.stringify(updatedAnswers));
      formData.append("service_id", buyerRequest?.service_id);
      const respone = await dispatch(getProgressPercentageAPI(formData));
      setProgressPercentage(respone?.percentage);
    } catch (error) {
      console.log(error, "progressPercent");
    }
    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    let nextIndex = null;
    if (nextQ === "last") {
      onNext();
      return;
    } else if (nextQ === "last") {
      onNext();
      return;
    } else if (nextQ && questionIndexMap[nextQ]) {
      nextIndex = questionIndexMap[nextQ];
    } else if (currentQuestion < totalQuestions - 1) {
      nextIndex = currentQuestion + 1;
    }

    if (nextIndex !== null) {
      if (!questionHistory.includes(nextIndex)) {
        setQuestionHistory((prev) => [...prev, nextIndex]);
        setQuestion2History((prev) => [...prev, questionIndexMap[nextQ]]);
      }
      setCurrentQuestion(nextIndex);
    } else {
      onNext();
    }
    setSelectedOption([]);
  };


  const removeQuestionsAfterIndex = async (questionIndex) => {
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
    setIsComingFromStep2(false);

    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      const newHistory2 = [...question2History];

      newHistory.pop();
      newHistory2.pop();

      const prevIndex = newHistory[newHistory.length - 1];

      await removeQuestionsAfterIndex(prevIndex);

      setQuestionHistory(newHistory);
      setQuestion2History(newHistory2);
      setCurrentQuestion(prevIndex);

      setTotalQuestionsAnswered((prev) => Math.max(1, prev - 1));
    } else {
      dispatch(setbuyerRequestData({ questions: [] }));
      onBack();
    }

    const lastQuestionsArray = buyerRequest.questions;

    if (lastQuestionsArray.length > 0) {
      const lastAnswer = lastQuestionsArray[lastQuestionsArray.length - 1].ans;

      setSelectedOption([lastAnswer]);

      const updatedBuyerRequest = {
        ...buyerRequest,
        questions: lastQuestionsArray.slice(0, -1), // remove last
      };

      dispatch(setbuyerRequestData(updatedBuyerRequest));

      try {
        const formData = new FormData();
        formData.append(
          "questions",
          JSON.stringify(updatedBuyerRequest.questions)
        );
        formData.append("service_id", updatedBuyerRequest.service_id);
        const response = await dispatch(getProgressPercentageAPI(formData));
        setProgressPercentage(response.percentage);
      } catch (err) {
        console.error("Error updating progress on back:", err);
      }
    } else {
      console.log("No questions left to go back to.");
    }
  };

  useEffect(() => {
    setOtherText("");
    setError("");
  }, [currentQuestion]);




  return loading ? (
    <Loader />
  ) : (
    <div className="border-2 border-[#BEBEBE] rounded-[50px] overflow-hidden">

      <CardLayoutWrapperNearme
        title={
          currentQuestion === 0
            ? !isQuestionWithImage
              ? "Welcome to Localists!"
              : ""
            : formattedQuestions[currentQuestion]?.questions
        }
        onButtonClick={handleNextCheckBox}
        onBackClick={handleBack}
        showBackButton={currentQuestion === 0 ? false : true}
        buttonText="Next"
        headingCenter={currentQuestion === 0 ? false : true}
        subtitle={
          currentQuestion === 0
            ? !isQuestionWithImage
              ? `To find the ideal ${serviceName} for your project, simply complete the quick form below.`
              : ""
            : ""
        }
        question1={currentQuestion===0 ? formattedQuestions[currentQuestion]?.questions :''}
        showProgressBar
        value={progressPercentage}
        fixedHeight={true}
        className1="py-7.5 px-5 md:py-7.5 md:px-12"
      >
        {currentQuestion === 0 && isQuestionWithImage && (
          <BannerImagesQuestion serviceName={serviceName} />
        )}

        <div ref={questionContainerRef} className="flex flex-col gap-3 mb-4">
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
                      if (
                        isSingle &&
                        selectedOption.includes(opt.option) &&
                        opt.option !== "Something else (please describe)"
                      ) {
                        handleNext([e.target.value]);
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
                placeholder="Please enter...."
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
                onChange={(e) => {
                  setOtherText(e.target.value);
                }}
              />
            )}
        </div>

        {error && (
          <p className="text-[#ff4d4f] text-[14px] text-left mt-2">{error}</p>
        )}
      </CardLayoutWrapperNearme>
    </div>
  );
};

export default QuestionModalNearme;
