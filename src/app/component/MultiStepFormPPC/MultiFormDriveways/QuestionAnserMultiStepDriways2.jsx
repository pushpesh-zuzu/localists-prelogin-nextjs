import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToBottom } from "@/utils/scroll";
import BannerImagesQuestion from "../../common/MultiStepFormPPC/BannerImagesQuestion";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";

const QuestionAnserMultiStepDriways2 = ({
  questions = [],
  onNext,
  onBack,
  isComingFromStep3 = false,
  setQuestionHistory,
  questionHistory,
  setIsComingFromStep3,
  setProgressPercentage,
  loading = true,
  serviceName = "Driveway Installers",
  isQuestionWithImage = false,
}) => {
  const dispatch = useDispatch();

  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const { service } = useSelector((state) => state.findJobs);
  const [specialFlowPercentage, SpecialFlowPercentage] = useState(70);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(1);

  const totalQuestions = questions?.length || 1;

  const calculateProgress = () => {
    const progress = (totalQuestionsAnswered / 7) * specialFlowPercentage;
    return Math.min(progress, specialFlowPercentage);
  };

  const progressPercent = calculateProgress();

  useEffect(() => {
    setProgressPercentage && setProgressPercentage(progressPercent);
  }, [progressPercent, setProgressPercentage]);

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
    questionIndexMap[q?.question_no] = index;
  });

  useEffect(() => {
    if (isComingFromStep3 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(4);
      setTotalQuestionsAnswered(5);
    }
  }, [isComingFromStep3]);
  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionText = questions[currentQuestion]?.questions;

      const savedQuestion = buyerRequest?.questions.find(
        (q) => q?.ques === currentQuestionText,
      );

      const savedAnswer = savedQuestion?.ans || [];
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
    handleScrollToBottom();
  }, [currentQuestion, buyerRequest, questions]);

  useEffect(() => {
    if (buyerRequest && Array.isArray(buyerRequest.questions)) {
      const hasSpecialAnswer = buyerRequest.questions.some(
        (q) =>
          q?.ans === "Replace the current driveway" ||
          q?.ans === "Business or Commercial Premises",
      );

      if (hasSpecialAnswer) {
        SpecialFlowPercentage(70);
      } else {
        SpecialFlowPercentage(90);
      }
    }
  }, [buyerRequest]);

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

    const finalAnswer = selectedOption?.map((opt) =>
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
      (item) => item?.ques === updatedAnswer?.ques,
    );

    let updatedAnswers;
    if (existingIndex !== -1) {
      updatedAnswers = [...previousAnswers];
      updatedAnswers[existingIndex] = updatedAnswer;
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    let nextQ = null;
    for (const option of selectedOption) {
      const selectedObj = formattedQuestions[
        currentQuestion
      ]?.parsedAnswers.find((a) => a.option === option);
      if (selectedObj?.next_question) {
        nextQ = selectedObj.next_question;
        break; // Take first valid next_question
      }
    }

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    // FIX 2: Remove duplicate code and follow original component logic
    if (nextQ === "6") {
      // If isStartWithQuestionModal logic from original component
      dispatch(
        setbuyerRequestData({
          service_id: service?.id || buyerRequest?.service_id,
          postcode: buyerRequest?.postcode,
          city: citySerach,
          questions: updatedAnswers,
        }),
      );
      setProgressPercentage(75);
      onNext();
      return;
    } else if (nextQ && questionIndexMap[nextQ]) {
      setQuestionHistory((prev) => [...prev, questionIndexMap[nextQ]]);
      setCurrentQuestion(questionIndexMap[nextQ]);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        setQuestionHistory((prev) => [...prev, currentQuestion + 1]);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setProgressPercentage(75);
        onNext();
      }
    }

    setSelectedOption([]);
    setOtherText("");
    setError("");
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
    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    // FIX 3: Follow original component logic
    if (nextQ === "6") {
      setProgressPercentage(75);
      onNext();
      return;
    } else if (nextQ && questionIndexMap[nextQ]) {
      const nextIndex = questionIndexMap[nextQ];
      if (!questionHistory.includes(nextIndex)) {
        setQuestionHistory((prev) => [...prev, nextIndex]);
      }
      setCurrentQuestion(nextIndex);
    } else {
      if (currentQuestion < totalQuestions - 1) {
        const nextIndex = currentQuestion + 1;
        if (!questionHistory.includes(nextIndex)) {
          setQuestionHistory((prev) => [...prev, nextIndex]);
        }
        setCurrentQuestion(nextIndex);
      } else {
        setProgressPercentage(75);
        onNext();
      }
    }

    setSelectedOption([]);
    setOtherText("");
    setError("");
  };

  const removeQuestionsAfter = (questionIndex) => {  //added
    const updatedAnswers =
      buyerRequest?.questions?.slice(0, questionIndex + 1) || [];

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));
  };

  const handleBack = () => {
    setIsComingFromStep3(false);
    if (questionHistory.length > 1) {
      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      removeQuestionsAfter(prevIndex);
      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
      setTotalQuestionsAnswered((prev) => Math.max(1, prev - 1));
    } else {
      dispatch(setbuyerRequestData({ questions: [] }));
      onBack();
    }
  };

  useEffect(() => {
    setOtherText("");
    setError("");
  }, [currentQuestion]);

  return loading ? (
    <Loader />
  ) : (
    <CardLayoutWrapper
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
            ? "To find the ideal Driveway Installation specialist for your project, simply complete the quick form below."
            : ""
          : ""
      }
    >
      {currentQuestion === 0 && isQuestionWithImage && (
        <BannerImagesQuestion serviceName={serviceName} />
      )}

      {currentQuestion === 0 && (
        <h2
          style={{
            textAlign: isQuestionWithImage ? "center" : "left",
            maxWidth: "86%",
            margin: isQuestionWithImage ? "auto" : "",
            marginBottom: "10px",
          }}
          className="text-[20px] font-extrabold leading-[32px] mb-[10px] max-w-[544px] md:text-[26px] md:font-bold"
        >
          {formattedQuestions[currentQuestion]?.questions}
        </h2>
      )}

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
    </CardLayoutWrapper>
  );
};

export default QuestionAnserMultiStepDriways2;
