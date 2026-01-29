"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProgressBarLandingPage from "../../common/MultiStepFormPPC/ProgressBarLandingPage";
import FloatingButtonWrapper from "../../common/FloatingButton.jsx/FloatingButtonWrapper";
import QuestionAnserMultiStepDriways2 from "./QuestionAnserMultiStepDriways2";
import PostcodeSearchDriveways from "./PostcodeSearchDriveways";
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
import QuestionAnswerMultiStepDriveways from "./QuestionAnswerMultiStepDriveways";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import Footer from "../../Footer/Footer";
import CloseBrowserAbandon from "../../common/CloseBrowserAbandon/CloseBrowserAbandon";
import HowItWorkNewPPC from "../../NewPPCpage/HowItWorkNewPPC";
import Logo from "../../../../../public/ReactIcons/Logo";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";

const MultiStepFormDriveways = ({ isQuestionWithImage = false }) => {
  usePendingBuyerRedirect()
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  const [animationDirection, setAnimationDirection] = useState("");
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
        if (buyerStep === 2) {
          setProgressPercentage(70);
        } else if (buyerStep === 3) {
          setProgressPercentage(80);
        } else if (buyerStep === 4) {
          setProgressPercentage(90);
        } else if (buyerStep === 5) {
          setProgressPercentage(95);
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
    dispatch(questionAnswerData({ service_id: 51 }));
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
        (_, i) => i < lastIndex - 1 || i > lastIndex,
      );
    } else {
      firstQuestions = questionanswerData;
    }
  }

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
      dispatch(setbuyerRequestData({ service_id: 51 }));
    }
  }, [questionanswerData]);

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
              className="w-[90%] mx-auto lg:w-3/5 md:w-4/5 md:my-2.5 sm:w-[90%] sm:my-2.5"
              ref={heroRef}
            >
              <div className="rounded-lg overflow-hidden relative">
                <div
                  className={`relative w-full transition-transform duration-300 ease-in-out ${animationDirection}`}
                >
                  {buyerStep === 1 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAnserMultiStepDriways2
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
                        serviceName="Driveway Installers"
                      />
                    </div>
                  )}

                  {buyerStep === 2 && (
                    <div className="" style={{ margin: "auto" }}>
                      <PostcodeSearchDriveways
                        getProgressPercentage={getProgressPercentage}
                        prevStep={prevStep}
                        onNext={nextStep}
                        setProgressPercentage={setProgressPercentage}
                        backButtonTriggered={backButtonTriggered}
                        setBackButtonTriggered={setBackButtonTriggered}
                        titleHeading="driveway installers"
                      />
                    </div>
                  )}

                  {buyerStep === 3 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAnswerMultiStepDriveways
                        questions={lastQuestion}
                        onNext={nextStep}
                        onBack={prevStep}
                        setIsComingFromStep4={setIsComingFromStep4}
                        isComingFromStep4={isComingFromStep4}
                        setProgressPercentage={setProgressPercentage}
                      />
                    </div>
                  )}

                  {buyerStep === 4 && (
                    <NameEmailMultiStepForm
                      nextStep={nextStep}
                      onBack={prevStep}
                      isStartWithQuestionModal={true}
                      setProgressPercentage={setProgressPercentage}
                    />
                  )}

                  {buyerStep === 5 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <PhoneNumberMultiStepForm
                        nextStep={nextStep}
                        onBack={prevStep}
                        serviceId={51}
                        setProgressPercentage={setProgressPercentage}
                        setUpdateNumberStep={setUpdateNumberStep}
                        updateNumberStep={updateNumberStep}
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
                        setProgressPercentage={setProgressPercentage}
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

export default MultiStepFormDriveways;
