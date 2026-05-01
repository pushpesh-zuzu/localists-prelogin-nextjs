import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleScrollToBottom } from "@/utils/scroll";
import BannerImagesQuestion from "../../common/MultiStepFormPPC/BannerImagesQuestion";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import { getProgressPercentageAPI, setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";
import NewMultiPPCCardLayoutWrapper from "../../common/MultiStepFormPPC/NewMultiStepFormDesingPPC/NewMultiPPCCardLayoutWrapper";
import NewBuyerRequestProgressBarQuotesRequest from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestProgressBarQuotesRequest";
import NewBuyerRequestQuestionOptionsBox from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestQuestionOptionsBox";
import useQuestionOptionScrollTop from "@/hooks/useQuestionOptionScrollTop";

const NewTreeSurgeonQA2MultiPPC = ({
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
  setQuestion2History,
  question2History,
  setSelectedOption,
  selectedOption,
  progressPercentage
}) => {
  const dispatch = useDispatch();
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [specialFlowPercentage, SpecialFlowPercentage] = useState(70);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [otherText, setOtherText] = useState("");
  const [error, setError] = useState("");
  const [totalQuestionsAnswered, setTotalQuestionsAnswered] = useState(1);
  const gridRef = useQuestionOptionScrollTop(currentQuestion);

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
    if (isComingFromStep3 && buyerRequest?.questions?.length > 0) {
      setCurrentQuestion(question2History.at(-1));
      setTotalQuestionsAnswered(5);
      setQuestionHistory(question2History);
    }
  }, [isComingFromStep3]);

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
    handleScrollToBottom();
  }, [currentQuestion, buyerRequest, questions]);
  useEffect(() => {
    if (buyerRequest && Array.isArray(buyerRequest.questions)) {
      const hasSpecialAnswer = buyerRequest.questions.some(
        (q) =>
          q?.ans === "Replace the current driveway" ||
          q?.ans === "Business or Commercial Premises"
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
        checked ? [...prev, value] : prev.filter((opt) => opt !== value)
      );
      setError("");
    }
  };

  const handleNextCheckBox = async () => {
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
    if (nextQ === "6") {
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
    if (nextQ === "6") {
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
    // const updatedQuestions =
    //   buyerRequest?.questions?.slice(0, questionIndex + 1) || [];

    // dispatch(setbuyerRequestData({ questions: updatedQuestions }));

    const questionText = formattedQuestions[questionIndex]?.questions;

    const indexInAnswers = buyerRequest?.questions?.findIndex(
      (q) => q?.ques === questionText
    );

    if (indexInAnswers !== -1) {
      const updatedAnswers = buyerRequest.questions.slice(0, indexInAnswers);

      dispatch(setbuyerRequestData({ questions: updatedAnswers }));

      try {
        const formData = new FormData();
        formData.append("questions", JSON.stringify(updatedAnswers));
        formData.append("service_id", buyerRequest?.service_id);
        const response = await dispatch(getProgressPercentageAPI(formData));
        setProgressPercentage(response?.percentage);
      } catch (err) {
        console.error("Progress update failed:", err);
      }
    }
  };

  const handleBack = async () => {
    setIsComingFromStep3(false);

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

export default NewTreeSurgeonQA2MultiPPC;
