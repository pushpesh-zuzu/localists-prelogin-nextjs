import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToBottom } from "@/utils/scroll";
import BannerImagesQuestion from "../../common/MultiStepFormPPC/BannerImagesQuestion";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import { setbuyerRequestData, setQuestionsForProgress } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";
import NewMultiPPCCardLayoutWrapper from "../../common/MultiStepFormPPC/NewMultiStepFormDesingPPC/NewMultiPPCCardLayoutWrapper";
import NewBuyerRequestProgressBarQuotesRequest from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestProgressBarQuotesRequest";
import NewBuyerRequestQuestionOptionsBox from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestQuestionOptionsBox";
import useQuestionOptionScrollTop from "@/hooks/useQuestionOptionScrollTop";

const NewRoofingQA2MultiPPC = ({
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
  progressPercentage
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
      const gridRef = useQuestionOptionScrollTop(currentQuestion);

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
    // const updatedAnswers = buyerRequest.questions.filter(
    //   (q) => q.question_no <= questionNo
    // );

    // dispatch(setbuyerRequestData({ questions: updatedAnswers }));

    const questionText = formattedQuestions[questionNo]?.questions;

    const indexInAnswers = buyerRequest?.questions?.findIndex(
      (q) => q?.ques === questionText
    );

    if (indexInAnswers !== -1) {
      const updatedAnswers = buyerRequest.questions.slice(0, indexInAnswers);

      dispatch(setbuyerRequestData({ questions: updatedAnswers }));
    }

    const updatedProgress = questionsForProgress.filter(
      (q) => q.number <= questionNo
    );

    dispatch(setQuestionsForProgress(updatedProgress));
  };

  const handleBack = () => {
    setIsComingFromStep3(false);

    if (questionHistory.length > 1) {
      if (questionsForProgress.length > 0) {
        const lastQuestion =
          questionsForProgress[questionsForProgress.length - 1];
        const lastQuestionNo = lastQuestion.number;
        removeQuestionByNumber(lastQuestionNo);
      }

      const newHistory = [...questionHistory];
      newHistory.pop();
      const prevIndex = newHistory[newHistory.length - 1];
      // const prevQuestionNo =
      //   formattedQuestions[prevIndex]?.question_no;

      removeQuestionsAfter(prevIndex);

      setQuestionHistory(newHistory);
      setCurrentQuestion(prevIndex);
      setTotalQuestionsAnswered((prev) => Math.max(1, prev - 1));
    } else {
      if (questionsForProgress.length > 0) {
        const firstQuestion = questionsForProgress[0];
        const firstQuestionNo = firstQuestion.number;
        removeQuestionByNumber(firstQuestionNo);
      }

      // dispatch(setbuyerRequestData({ questions: [] }));
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
              ? ""
              : ""
            : formattedQuestions[currentQuestion]?.questions
        }
        onButtonClick={handleNextCheckBox}
        onBackClick={handleBack}
        showBackButton={true}
        disabledBack={currentQuestion === 0 ? true : false}
        buttonText="Next"
        headingCenter={currentQuestion === 0 ? false : true}
        subtitle={currentQuestion === 0 ? (!isQuestionWithImage ? "" : "") : ""}
        progressPercentage={currentQuestion !== 0 ? progressPercentage : 0}
      >
        {currentQuestion === 0 && isQuestionWithImage && (
          <BannerImagesQuestion serviceName={serviceName} />
        )}
  
        {currentQuestion === 0 && (
          <div className="mb-7.5 md:mb-10">
            <h4
              style={{
                textAlign: isQuestionWithImage ? "left" : "left",
              }}
              className={`${isQuestionWithImage ? "mt-7.5 md:mt-10" :""} mb-7.5 md:mb-10 text-left font-Inter font-black tracking-[-0.03em] text-[24px] leading-[25px]
                      md:text-[24px] md:leading-[25px] lg:text-[30px] lg:leading-[30px]`}
            >
              {formattedQuestions[currentQuestion]?.questions}
            </h4>
            <NewBuyerRequestProgressBarQuotesRequest value={progressPercentage} />
          </div>
        )}
  
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
                <div key={index}>
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
      </CardLayoutWrapper>
    );
};

export default NewRoofingQA2MultiPPC;
