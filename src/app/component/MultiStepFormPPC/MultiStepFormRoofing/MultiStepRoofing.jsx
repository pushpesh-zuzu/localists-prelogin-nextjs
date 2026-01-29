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
import HowItWorkNewPPC from "../../NewPPCpage/HowItWorkNewPPC";
import Logo from "../../../../../public/ReactIcons/Logo";
import { useProgress } from "@/hooks/useProgress";
import QuestionAnserMultiStepRoofingNew2 from "./QuestionAnserMultiStepRoofingNew2";
import PostcodeSearchRoofing from "./PostcodeSearchRoofing";
import QuestionAnswerMultiStepRoofingNew from "./QuestionAnswerMultiStepRoofingNew";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";

const MultiStepRoofing = ({
  isQuestionWithImage = false,
  serviceId = 51,
  serviceName = "Driveway Installers",
}) => {
  const dispatch = useDispatch();
  usePendingBuyerRedirect()
  const { questionanswerData, buyerStep } = useSelector((state) => state.buyer);
  const { progressPercentage, removeQuestionByNumber, setProgressPercentage } =
    useProgress(serviceId);
 
  const [animationDirection, setAnimationDirection] = useState("");
  const [actualSteps, setActualSteps] = useState(1);
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
  const [percetangForPost, setPercetangForPost] = useState(0);
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
        if (stepFlow[currentIndex - 1] === 1) {
          setIsComingFromStep3(true);
          removeQuestionByNumber(7);
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
    dispatch(questionAnswerData({ service_id: serviceId }));
  }, []);
  let firstQuestions = [];
  let lastQuestion = [];
  if (Array.isArray(questionanswerData)) {
    questionanswerData.forEach((q) => {
      try {
        const answers = JSON.parse(q.answer);
        const hasLast = answers.some((a) => a.next_question === "last");
        if (hasLast) {
          lastQuestion.push(q);
        } else {
          firstQuestions.push(q);
        }
      } catch (err) {
        firstQuestions.push(q);
      }
    });
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
        value={progressPercentage + 5 + percetangForPost}
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
                      <QuestionAnserMultiStepRoofingNew2
                        questions={firstQuestions}
                        onNext={nextStep}
                        onBack={prevStep}
                        loading={isLoadingQuestions}
                        isComingFromStep3={isComingFromStep3}
                        setQuestionHistory={setQuestionHistory}
                        questionHistory={questionHistory}
                        setIsComingFromStep3={setIsComingFromStep3}
                        isQuestionWithImage={isQuestionWithImage}
                        serviceName={serviceName}
                        removeQuestionByNumber={removeQuestionByNumber}
                      />
                    </div>
                  )}

                  {buyerStep === 2 && (
                    <div className="" style={{ margin: "auto" }}>
                      <PostcodeSearchRoofing
                        prevStep={prevStep}
                        onNext={nextStep}
                        titleHeading="roofing companies"
                        setPercetangForPost={setPercetangForPost}
                      />
                    </div>
                  )}

                  {buyerStep === 3 && (
                    <div style={{ maxWidth: "592px", margin: "auto" }}>
                      <QuestionAnswerMultiStepRoofingNew
                         questions={lastQuestion}
                        onNext={nextStep}
                        onBack={prevStep}
                        setIsComingFromStep4={setIsComingFromStep4}
                        isComingFromStep4={isComingFromStep4}
                        setPercetangForPost={setPercetangForPost}
                      />
                    </div>
                  )}

                  {buyerStep === 4 && (
                    <NameEmailMultiStepForm
                      nextStep={nextStep}
                      onBack={prevStep}
                      isStartWithQuestionModal={true}
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

export default MultiStepRoofing;
