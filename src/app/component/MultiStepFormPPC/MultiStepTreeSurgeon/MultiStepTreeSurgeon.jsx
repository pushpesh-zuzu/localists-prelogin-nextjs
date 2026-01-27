"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarLandingPage from "../../common/MultiStepFormPPC/ProgressBarLandingPage";
import FloatingButtonWrapper from "../../common/FloatingButton.jsx/FloatingButtonWrapper";
import PhoneNumberMultiStepForm from "../../common/MultiStepFormPPC/PhoneNumberMultiStepForm";
import OTPVerificationMultiStep from "../../common/MultiStepFormPPC/OTPVerificationMultiStep";
import {
  questionAnswerData,
  setbuyerRequestData,
  setBuyerStep,
} from "@/lib/store/buyerslice/buyerSlice";
import { handleScrollToBottom } from "@/utils/scroll";
import CardLayoutWrapper from "../../NewPPCpage/CardLayoutWrapper";
import LogoIconMultiForm from "../LogoIconMultiForm";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import Footer from "../../Footer/Footer";
import HowItWorkNewPPC from "../../NewPPCpage/HowItWorkNewPPC";
import QuestionAsnwerMultiStepTreeSurgeon2 from "./QuestionAsnwerMultiStepTreeSurgeon2";
import PostCodeSearchTreeSurgeon from "./PostCodeSearchTreeSurgeon";
import QuestionAnswerMultiStepTreeSurgeon from "./QuestionAnswerMultiStepTreeSurgeon";
import NameEmailTreeSurgeon from "./NameEmailMultiStepForm";
import MultiStepDescribeYourRequest from "../../common/MultiStepFormPPC/MultiStepDescribeYourRequest";

const MultiStepTreeSurgeon = ({ isQuestionWithImage = false, serviceId=null }) => {
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

 const [actualSteps, setActualSteps] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { userToken } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.findJobs);
  const [backButtonTriggered, setBackButtonTriggered] = useState(false);
  const [isComingFromStep3, setIsComingFromStep3] = useState(false);
  const [isComingFromStep4, setIsComingFromStep4] = useState(false);
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [setstepText, setStepText] = useState("What");
  const [updateNumberStep, setUpdateNumberStep] = useState(2);
  const [localRequestId, setLocalRequestId] = useState(null);
  const [question2History, setQuestion2History] = useState([0]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [isStepFrom4, setIsStepFrom4] = useState(false);

  const stepFlow = [1, 2, 3, 4, 5, 6, 7];

  useEffect(() => {
    if (buyerStep === 1) {
      setActualSteps(1);
      setStepText("What");
    } else if (buyerStep === 2) {
      setActualSteps(2);
      setStepText("Where");
    } else if (buyerStep === 3) {
      setActualSteps(3);
      setStepText("When");
    }
    handleScrollToBottom();
  }, [buyerStep]);

  const nextStep = () => {
    setBackButtonTriggered(false);
    setIsComingFromStep3(false);
    setIsComingFromStep4(false);

    setTimeout(() => {
      const currentIndex = stepFlow.indexOf(buyerStep);
      if (currentIndex < stepFlow.length - 1) {
        dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
      }
    }, 300);
  };

  const prevStep = () => {
    setBackButtonTriggered(true);
    setTimeout(() => {
      const currentIndex = stepFlow.indexOf(buyerStep);
      if (currentIndex > 0) {
        if (buyerStep === 2) {
        } else if (buyerStep === 3) {
        } else if (buyerStep === 4) {
        } else if (buyerStep === 5) {
        }

        if (stepFlow[currentIndex - 1] === 1) {
          setIsComingFromStep3(true);
        }
        if (stepFlow[currentIndex - 1] === 3) {
          setIsComingFromStep4(true);
        }
        dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
        setBackButtonTriggered(false);
      }
    }, 300);
  };
  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (buyerStep === 7 && pendingModal?.shouldOpen) {
      localStorage.removeItem("pendingBuyerModal");
      console.log("Cleared pendingBuyerModal after reaching step 7");
    }
  }, [buyerStep]);

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (pendingModal?.shouldOpen) {
      console.log("Coming from OTP redirect");
      dispatch(setBuyerStep(7));
    } else {
      dispatch(setBuyerStep(1));
    }
  }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    serviceId && dispatch(questionAnswerData({ service_id: serviceId }));
  }, []);

  let firstQuestions = [];
  let lastQuestion = [];

  if (questionanswerData?.length) {
    const lastIndex = questionanswerData.findIndex((q) => {
      try {
        const answers = JSON.parse(q.answer);
        return answers.some((a) => a.next_question === "last");
      } catch {
        return false;
      }
    });

    if (lastIndex !== -1) {
      lastQuestion = questionanswerData.slice(lastIndex - 1, lastIndex + 1);
      firstQuestions = questionanswerData.filter(
        (_, i) => i < lastIndex - 1 || i > lastIndex
      );
    } else {
      firstQuestions = questionanswerData;
    }
  }

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
      dispatch(setbuyerRequestData({ service_id: serviceId }));
    }
  }, [questionanswerData]);

  return (
    <>
      {!localRequestId && <CloseBrowserAbandon />}
      <div className="bg-[#00afe3] h-11 w-full text-center flex justify-center items-center">
        <span className="text-white font-semibold text-base text-center">
          {buyerStep <= 3 ? `${setstepText} - ${actualSteps}/3` : ""}
        </span>
      </div>

      <ProgressBarLandingPage
        value={5 + progressPercentage}
        buyerStep={buyerStep}
      />

      <FloatingButtonWrapper>
        {(heroRef, sectionsStartRef) => (
          <>
            <div className="h-9 w-48 mt-6 ml-[2%] lg:h-7 lg:w-32 md:h-5 md:w-[120px] xl:w-[195px] xl:h-[38px] md:mt-6">
              <LogoIconMultiForm className="w-[120px] h-[20px]  md:w-[125px] md:h-[28px] lg:w-[195px] lg:h-[38px]" />
            </div> 

            <div
              className="w-[90%] mx-auto my-5 lg:w-3/5 md:w-4/5 md:my-2.5 sm:w-[90%] sm:my-2.5"
              ref={heroRef}
            >
              <div className="rounded-lg overflow-hidden relative">
                <div
                  className={`relative w-full transition-transform duration-300 ease-in-out`}
                >
                  {buyerStep === 1 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAsnwerMultiStepTreeSurgeon2
                        questions={firstQuestions}
                        onNext={nextStep}
                        onBack={prevStep}
                        loading={isLoadingQuestions}
                        isComingFromStep3={isComingFromStep3}
                        setQuestionHistory={setQuestionHistory}
                        questionHistory={questionHistory}
                        setIsComingFromStep3={setIsComingFromStep3}
                        setProgressPercentage={setProgressPercentage}
                        isQuestionWithImage={isQuestionWithImage}
                        serviceName="Tree Surgeon"
                        setQuestion2History={setQuestion2History}
                        question2History={question2History}
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                      />
                    </div>
                  )}

                  {buyerStep === 2 && (
                    <div className="" style={{ margin: "auto" }}>
                      <PostCodeSearchTreeSurgeon
                         prevStep={prevStep}
                        onNext={nextStep}
                        setProgressPercentage={setProgressPercentage}
                        setBackButtonTriggered={setBackButtonTriggered}
                        titleHeading="tree surgeon specialists"
                        setSelectedOption={setSelectedOption}
                      />
                    </div>
                  )}

                  {buyerStep === 3 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAnswerMultiStepTreeSurgeon
                        questions={lastQuestion}
                        onNext={nextStep}
                        onBack={prevStep}
                        loading={questionLoader}
                        setIsComingFromStep4={setIsComingFromStep4}
                        isComingFromStep4={isComingFromStep4}
                        setProgressPercentage={setProgressPercentage}
                        setSelectedOption={setSelectedOption}
                        selectedOption={selectedOption}
                        isStepFrom4={isStepFrom4}
                        setIsStepFrom4={setIsStepFrom4}
                      />
                    </div>
                  )}

                  {buyerStep === 4 && (
                     <NameEmailTreeSurgeon
                      nextStep={nextStep}
                      onBack={prevStep}
                      setIsStepFrom4={setIsStepFrom4}
                    />
                  )}

                  {buyerStep === 5 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <PhoneNumberMultiStepForm
                        nextStep={nextStep}
                        onBack={prevStep}
                        updateNumberStep={updateNumberStep}
                        setUpdateNumberStep={setUpdateNumberStep}
                        setLocalRequestId={setLocalRequestId}
                      />
                    </div>
                  )}

                  {buyerStep === 6 && (
                    <CardLayoutWrapper showButton={false}>
                      <OTPVerificationMultiStep
                        open
                        nextStep={nextStep}
                        onBack={prevStep}
                        isThankuPageOnlyShow
                        setUpdateNumberStep={setUpdateNumberStep}
                      />
                    </CardLayoutWrapper>
                  )}

                  {buyerStep === 7 && (
                    <CardLayoutWrapper
                      showBackButton={false}
                      showButton={false}
                    >
                      <MultiStepDescribeYourRequest />
                    </CardLayoutWrapper>
                  )}
                </div>
              </div>
            </div>

            {/* Commented out sections as requested */}
            <div ref={sectionsStartRef}>
              <HowItWorkNewPPC  />
            </div>
            {/* <CookieConsent /> */}
            <div className="mb-20 sm:mb-20">
              <Footer />
            </div>
          </>
        )}
      </FloatingButtonWrapper>
    </>
  );
};

export default MultiStepTreeSurgeon;
