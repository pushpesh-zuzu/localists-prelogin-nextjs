import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToBottom } from "@/utils/scroll";
import BannerImagesQuestion from "../../common/MultiStepFormPPC/BannerImagesQuestion";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";
import NewBuyerRequestQuestionOptionsBox from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestQuestionOptionsBox";
import H4 from "../../UI/Typography/H4";
import NewBuyerRequestProgressBarQuotesRequest from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestProgressBarQuotesRequest";
import NewMultiPPCCardLayoutWrapper from "../../common/MultiStepFormPPC/NewMultiStepFormDesingPPC/NewMultiPPCCardLayoutWrapper";

const NewDrivewayQA2MultiPPC = ({
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
  progressPercentage = 0,
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

  // useEffect(() => {
  //   if (isComingFromStep3 && buyerRequest?.questions?.length > 0) {
  //     setCurrentQuestion(4);
  //     setTotalQuestionsAnswered(5);
  //   }
  // }, [isComingFromStep3]);

  useEffect(() => {
    if (!isComingFromStep3 || buyerRequest?.questions?.length === 0) return;

    const lastQuestionIndex = questionHistory?.[questionHistory.length - 1];

    if (
      Number.isInteger(lastQuestionIndex) &&
      formattedQuestions[lastQuestionIndex]
    ) {
      setCurrentQuestion(lastQuestionIndex);
      setTotalQuestionsAnswered(Math.max(1, questionHistory.length));
    }
  }, [
    isComingFromStep3,
    buyerRequest?.questions?.length,
    questionHistory,
    formattedQuestions,
  ]);

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
    } else if (nextQ && questionIndexMap[nextQ] !== undefined) {
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

  const removeQuestionsAfter = (questionIndex) => {
    const questionText = formattedQuestions[questionIndex]?.questions;

    const indexInAnswers = buyerRequest?.questions?.findIndex(
      (q) => q?.ques === questionText,
    );

    if (indexInAnswers !== -1) {
      const updatedAnswers = buyerRequest.questions.slice(0, indexInAnswers);

      dispatch(setbuyerRequestData({ questions: updatedAnswers }));
    }
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
    <NewMultiPPCCardLayoutWrapper
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
            className={`mt-7.5 md:mt-10 mb-7.5 md:mb-10 text-left font-Inter font-black tracking-[-0.03em] text-[24px] leading-[25px]
                    md:text-[24px] md:leading-[25px] lg:text-[30px] lg:leading-[30px]`}
          >
            {formattedQuestions[currentQuestion]?.questions}
          </h4>
          <NewBuyerRequestProgressBarQuotesRequest value={progressPercentage} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[45vh] overflow-auto">
        {formattedQuestions[currentQuestion]?.parsedAnswers.map(
          (opt, index, arr) => {
            const optionType = formattedQuestions[currentQuestion]?.option_type;

            const isSingle = optionType === "single";

            const isSelected = selectedOption.includes(opt.option);

            const handleSelect = () => {
              if (isSingle) {
                setSelectedOption([opt.option]);
                setError("");
                handleNext([opt.option]);
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
    </NewMultiPPCCardLayoutWrapper>
  );
};

export default NewDrivewayQA2MultiPPC;
