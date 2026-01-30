import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToBottom } from "@/utils/scroll";
import BannerImagesQuestion from "../../common/MultiStepFormPPC/BannerImagesQuestion";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import { setbuyerRequestData, setQuestionsForProgress } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";

const QuestionAnserMultiStepRoofingNew2 = ({
  questions = [],
  onNext,
  onBack,
  isComingFromStep3 = false,
  setQuestionHistory,
  questionHistory,
  setIsComingFromStep3,
  loading = true,
  serviceName = "Driveway Installers",
  isQuestionWithImage = false,
  removeQuestionByNumber,
}) => {
  const dispatch = useDispatch();
  const { buyerRequest, questionsForProgress } = useSelector(
    (state) => state.buyer
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState([]);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(1);
  const totalQuestions = questions?.length || 1;
  const formattedQuestions = questions.map((q) => ({
    ...q,
    parsedAnswers: Array.isArray(q.answer)
      ? q?.answer
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
    if (isComingFromStep3 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(5);
      setTotalQuestionsAnswered(5);
      const lastQuestion =
        questionsForProgress[questionsForProgress.length - 1];
      const lastQuestionNo = lastQuestion.number;
      removeQuestionByNumber(lastQuestionNo);
    }
  }, [isComingFromStep3]);

  useEffect(() => {
    if (questions.length > 0 && buyerRequest?.questions?.length > 0) {
      const currentQuestionNo =
        formattedQuestions[currentQuestion]?.question_no;

      const savedAnswerObj = buyerRequest.questions.find(
        (item) => item.question_no === currentQuestionNo
      );

      const savedAnswer = savedAnswerObj?.ans || [];

      const savedArray =
        typeof savedAnswer === "string"
          ? savedAnswer.split(",").map((a) => a.trim())
          : savedAnswer;

      setSelectedOption(savedArray);

      const otherVal = savedArray.find((ans) => {
        const lowerAns = ans.toLowerCase();
        return (
          lowerAns !== "yes" &&
          lowerAns !== "no" &&
          lowerAns !== "maybe" &&
          !lowerAns.includes("something else")
        );
      });

      setOtherText(otherVal || "");
    } else {
      setSelectedOption([]);
      setOtherText("");
    }
    handleScrollToBottom();
  }, [currentQuestion, buyerRequest, questions]);

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
      if (value !== "Something else (please describe)") {
        setTimeout(() => {
          handleNext(newSelected);
        }, 150);
      }
    } else {
      const newSelected = checked
        ? [...selectedOption, value]
        : selectedOption.filter((opt) => opt !== value);

      setSelectedOption(newSelected);
      setError("");
    }
  };

  const validateAndProceed = (selected) => {
    if (selected.length === 0) {
      setError("Please select at least one option.");
      return false;
    }

    if (
      selected.includes("Something else (please describe)") &&
      (!otherText.trim() ||
        otherText.trim().toLowerCase() === "something else (please describe)")
    ) {
      setError("Please enter a value for 'Other' option.");
      return false;
    }

    return true;
  };
  const saveAnswerToStore = (selected) => {
    const finalAnswer = selected.map((opt) =>
      opt.toLowerCase() === "something else (please describe)" ? otherText : opt
    );

    const updatedAnswer = {
      ques: formattedQuestions[currentQuestion]?.questions,
      ans: finalAnswer.join(", "),
      question_no: formattedQuestions[currentQuestion]?.question_no,
    };

    const previousAnswers = buyerRequest?.questions || [];

    const existingIndex = previousAnswers.findIndex(
      (item) => item.question_no === updatedAnswer.question_no
    );

    let updatedAnswers;

    if (existingIndex !== -1) {
      const oldAnswer = previousAnswers[existingIndex].ans;
      const newAnswer = updatedAnswer.ans;

      if (oldAnswer !== newAnswer) {
        const selectedObj = formattedQuestions[
          currentQuestion
        ]?.parsedAnswers.find((a) => a.option === selected[0]);
        const oldSelectedObj = formattedQuestions[
          currentQuestion
        ]?.parsedAnswers.find((a) => a.option === oldAnswer);

        const oldNextQ = oldSelectedObj?.next_question;
        const newNextQ = selectedObj?.next_question;

        if (oldNextQ !== newNextQ) {
          updatedAnswers = [...previousAnswers];
          updatedAnswers[existingIndex] = updatedAnswer;

          const oldNextIndex = updatedAnswers.findIndex(
            (item) => item.question_no === oldNextQ
          );
          if (oldNextIndex !== -1) {
            updatedAnswers.splice(oldNextIndex, 1);
          }
        } else {
          updatedAnswers = [...previousAnswers];
          updatedAnswers[existingIndex] = updatedAnswer;
        }
      } else {
        updatedAnswers = [...previousAnswers];
        updatedAnswers[existingIndex] = updatedAnswer;
      }
    } else {
      updatedAnswers = [...previousAnswers, updatedAnswer];
    }

    const answersWithoutQno = updatedAnswers.map(
      ({ question_no, ...rest }) => rest
    );

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));
    // dispatch(setBuyerRequestInternalQuestion({ questions: updatedAnswers }));

    return { updatedAnswer, finalAnswer };
  };
  const getNextQuestionIndex = (selected) => {
    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selected[0]
    );

    const nextQ = selectedObj?.next_question;
    let nextIndex = null;

    if (nextQ === "7" || nextQ === "last") {
      return "last";
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
      nextIndex = questionIndexMap[nextQ];
    } else if (currentQuestion < totalQuestions - 1) {
      nextIndex = currentQuestion + 1;
    }

    return nextIndex;
  };

  const handleNextCheckBox = () => {
    if (!validateAndProceed(selectedOption)) {
      return;
    }

    const { updatedAnswer } = saveAnswerToStore(selectedOption);

    const selectedObj = formattedQuestions[currentQuestion]?.parsedAnswers.find(
      (a) => a.option === selectedOption[0]
    );
    const nextQ = selectedObj?.next_question;

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));

    const UpdateQuestionWithNumber = {
      ...updatedAnswer,
      number: formattedQuestions[currentQuestion]?.question_no,
    };

    dispatch(
      setQuestionsForProgress([
        ...questionsForProgress,
        UpdateQuestionWithNumber,
      ])
    );

    const nextIndex = getNextQuestionIndex(selectedOption);

    if (nextIndex === "last") {
      onNext();
      return;
    } else if (nextIndex !== null) {
      setQuestionHistory((prev) => [...prev, nextIndex]);
      setCurrentQuestion(nextIndex);
    } else {
      onNext();
    }
  };

  const handleNext = (selected) => {
    if (!validateAndProceed(selected)) {
      return;
    }

    const { updatedAnswer } = saveAnswerToStore(selected);

    setTotalQuestionsAnswered((prev) => Math.min(prev + 1, 7));
    const UpdateQuestionWithNumber = {
      ...updatedAnswer,
      number: formattedQuestions[currentQuestion]?.question_no, // Use current question number
    };

    dispatch(
      setQuestionsForProgress([
        ...questionsForProgress,
        UpdateQuestionWithNumber,
      ])
    );

    const nextIndex = getNextQuestionIndex(selected);

    if (nextIndex === "last") {
      onNext();
      return;
    } else if (nextIndex !== null) {
      if (!questionHistory.includes(nextIndex)) {
        setQuestionHistory((prev) => [...prev, nextIndex]);
      }
      setCurrentQuestion(nextIndex);
    } else {
      onNext();
    }
  };

  const removeQuestionsAfter = (questionNo) => {    // added
    const updatedAnswers = buyerRequest.questions.filter(
      (q) => q.question_no <= questionNo
    );

    dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const updatedProgress = questionsForProgress.filter(
      (q) => q.number <= questionNo
    );

    dispatch(setQuestionsForProgress(updatedProgress));
  };

  const handleBack = () => {
    setIsComingFromStep3(false);

    if (questionHistory.length > 1) {
      // if (questionsForProgress.length > 0) {
      //   const lastQuestion =
      //     questionsForProgress[questionsForProgress.length - 1];
      //   const lastQuestionNo = lastQuestion.number;
      //   removeQuestionByNumber(lastQuestionNo);
      // }

      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      const prevQuestionNo =
        formattedQuestions[prevIndex]?.question_no;

      removeQuestionsAfter(prevQuestionNo);

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
      setTotalQuestionsAnswered((prev) => Math.max(1, prev - 1));
    } else {
      // if (questionsForProgress.length > 0) {
      //   const firstQuestion = questionsForProgress[0];
      //   const firstQuestionNo = firstQuestion.number;
      //   removeQuestionByNumber(firstQuestionNo);
      // }

      dispatch(setbuyerRequestData({ questions: [] }));
      dispatch(setQuestionsForProgress([]));

      setQuestionHistory([0]);
      setCurrentQuestion(0);
      setTotalQuestionsAnswered(1);
      setSelectedOption([]);
      setOtherText("");

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
            ? "To find the ideal roofing companies for your project, simply complete the quick form below."
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

export default QuestionAnserMultiStepRoofingNew2;
