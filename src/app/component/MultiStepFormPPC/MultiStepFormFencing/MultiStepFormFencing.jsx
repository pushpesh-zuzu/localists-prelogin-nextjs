"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarLandingPage from "../../common/MultiStepFormPPC/ProgressBarLandingPage";
import FloatingButtonWrapper from "../../common/FloatingButton.jsx/FloatingButtonWrapper";
import NameEmailMultiStepForm from "../../common/MultiStepFormPPC/NameEmailMultiStepForm";
import PhoneNumberMultiStepForm from "../../common/MultiStepFormPPC/PhoneNumberMultiStepForm";
import OTPVerificationMultiStep from "../../common/MultiStepFormPPC/OTPVerificationMultiStep";
import MultiStepDescribeYourRequest from "../../common/MultiStepFormPPC/MultiStepDescribeYourRequest";
import {
  questionAnswerData,
  setbuyerRequestData,
  setBuyerStep,
} from "@/lib/store/buyerslice/buyerSlice";
import { handleScrollToBottom } from "@/utils/scroll";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import Footer from "../../Footer/Footer";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import QuestionAnswerMultiStepFence2 from "./QuestionAnswerMultiStepFence2";
import QuestionAnswerMultiStepFence from "./QuestionAnswerMultiStepFence";
import PostSearchMultiStepFence from "./PostSearchMultiStepFence";
import HowItWorkNewPPC from "../../NewPPCpage/HowItWorkNewPPC";
import Logo from "../../../../../public/ReactIcons/Logo";

const MultiStepFormFencing = ({ isQuestionWithImage = false }) => {
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  const [animationDirection, setAnimationDirection] = useState("");
  const [actualSteps, setActualSteps] = useState(1);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const { userToken } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.findJobs);
  const [backButtonTriggered, setBackButtonTriggered] = useState(false);
  const [isComingFromStep3, setIsComingFromStep3] = useState(false); // ⭐ YE ADD KARO
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [setstepText, setStepText] = useState("What");
  const [updateNumberStep, setUpdateNumberStep] = useState(2);
  const [isComingFromStep4, setIsComingFromStep4] = useState(false);
  const [localRequestId, setLocalRequestId] = useState(null);
  const [isDesktop, setIsDesktop] = useState(false);

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
  const getProgressPercentage = (per) => {
    setProgressPercentage((pre) => pre + per);
  };

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
    }
  }, [buyerStep]);

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));

    if (pendingModal?.shouldOpen) {
      dispatch(setBuyerStep(7));
    } else {
      dispatch(setBuyerStep(1));
    }
  }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: 49 }));
  }, []);

  const firstQuestions = questionanswerData?.slice(0, -2) || [];
  const lastQuestion = questionanswerData?.slice(-2) || [];

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
      dispatch(setbuyerRequestData({ service_id: 49 }));
    }
  }, [questionanswerData]);

  useEffect(() => {
    if (firstQuestions?.length > 0) {
      const initialProgress = (100 * 2) / (firstQuestions.length * 3);
      setProgressPercentage(initialProgress);
    }
  }, [questionanswerData]);
  const [hasMountedDetector, setHasMountedDetector] = useState(false);
  useEffect(() => {
    if (!hasMountedDetector && buyerRequest?.questions?.length > 0) {
      setHasMountedDetector(true);
    }
  }, [hasMountedDetector]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setIsDesktop(window.innerWidth > 768);
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <>
      {!localRequestId && <CloseBrowserAbandon />}
      <div className="bg-[#00afe3] h-11 w-full text-center flex justify-center items-center">
        <span className="text-white font-semibold text-base text-center">
          {buyerStep <= 3 ? `${setstepText} - ${actualSteps}/3` : ""}
        </span>
      </div>

      <ProgressBarLandingPage
        value={progressPercentage}
        buyerStep={buyerStep}
      />

      <FloatingButtonWrapper>
        {(heroRef, sectionsStartRef) => (
          <>
           <div className="h-9 w-48 mt-6 ml-[2%] lg:h-7 lg:w-32 md:h-5 md:w-[120px] xl:w-[195px] xl:h-[38px] md:mt-6">
              <Logo className="w-[120px] h-[20px]  md:w-[125px] md:h-[28px] lg:w-[195px] lg:h-[38px]" />
            </div>

            <div
              className="w-[90%] mx-auto my-5 lg:w-3/5 md:w-4/5 md:my-2.5 sm:w-[90%] sm:my-2.5"
              ref={heroRef}
            >
              <div className="rounded-lg overflow-hidden relative">
                <div
                  className={`relative w-full transition-transform duration-300 ease-in-out ${animationDirection}`}
                >
                  {buyerStep === 1 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAnswerMultiStepFence2
                        questions={firstQuestions}
                        onNext={nextStep}
                        onBack={prevStep}
                        loading={isLoadingQuestions}
                        getProgressPercentage={getProgressPercentage}
                        isComingFromStep3={isComingFromStep3}
                        setQuestionHistory={setQuestionHistory}
                        questionHistory={questionHistory}
                        setIsComingFromStep3={setIsComingFromStep3}
                        setProgressPercentage={setProgressPercentage}
                        isQuestionWithImage={isQuestionWithImage}
                        serviceName="Fence & Gate Installation"
                      />
                    </div>
                  )}

                  {buyerStep === 2 && (
                    <div className="" style={{ margin: "auto" }}>
                      <PostSearchMultiStepFence
                        getProgressPercentage={getProgressPercentage}
                        prevStep={prevStep}
                        onNext={nextStep}
                        backButtonTriggered={backButtonTriggered}
                        setBackButtonTriggered={setBackButtonTriggered}
                        returPercentage={
                          (100 * 2) / (firstQuestions?.length * 3)
                        }
                      />
                    </div>
                  )}

                  {buyerStep === 3 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAnswerMultiStepFence
                        questions={lastQuestion}
                        onNext={nextStep}
                        onBack={prevStep}
                        loading={questionLoader}
                        setIsComingFromStep4={setIsComingFromStep4}
                        getProgressPercentage={getProgressPercentage}
                        isComingFromStep4={isComingFromStep4}
                      />
                    </div>
                  )}

                  {buyerStep === 4 && (
                    <NameEmailMultiStepForm
                      nextStep={nextStep}
                      onBack={prevStep}
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

            <div ref={sectionsStartRef}>
              <HowItWorkNewPPC />
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

export default MultiStepFormFencing;
