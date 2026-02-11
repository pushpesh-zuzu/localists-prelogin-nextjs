"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  questionAnswerData,
  setbuyerRequestData,
  setBuyerStep,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";
import ConfirmationModal from "../../common/BuyerRegistration/ConfirmationModal";
import ViewYourMatches from "../../common/BuyerRegistration/ViewYourMatches";
import QuestionModalNearme from "./QuestionModalNearme";
import ModalsWithCloseButton from "../../common/ModalsWithCloseButton";
import NameEmailNearMe from "./NameEmailNearMe";
import OTPVerificationMultiStep from "../../common/MultiStepFormPPC/OTPVerificationMultiStep";
import MultiStepDescribeYourRequest from "../../common/MultiStepFormPPC/MultiStepDescribeYourRequest";
import CardLayoutWrapperNearme from "./CardLayoutWrapperNearme";
import PhoneNumberNearMe from "./PhoneNumberNearMe";
import DescribeYourRequestNearMe from "./DescribeYourMatchesNearMe";

function BuyerRegistrationNearMe({
  closeModal,
  cancelHeading,
  cancelPara,
  setSelectedService = () => { },
  setFromImageModal = () => { },
  service_Id,
  serviceName,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const questionModalRef = useRef();

  const [shouldClose, setShouldClose] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [questionHistory, setQuestionHistory] = useState([0]);
  const [isComingFromStep2, setIsComingFromStep2] = useState(false);
  const [question2History, setQuestion2History] = useState([0]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);
  const [updateNumberStep, setUpdateNumberStep] = useState(2);
  const [localRequestId, setLocalRequestId] = useState(null);
  const [progressPercentage, setProgressPercentage] = useState(0);

  const dispatch = useDispatch();

  const { buyerStep, questionanswerData } =
    useSelector((state) => state.buyer || {});


  const isAdminOrRemembered = getBarkToken();

  const stepFlow = isAdminOrRemembered
    ? [2, 3, 5, 7, 8]
    : [1, 2, 3, 4, 5, 7, 8];

  const nextStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex < stepFlow.length - 1) {
      dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
    }
  };

  const previousStep = () => {
    const currentIndex = stepFlow.indexOf(buyerStep);
    if (currentIndex > 0) {
      dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
    }
  };

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (pendingModal?.shouldOpen) {
      localStorage.removeItem("pendingBuyerModal");
    }
  }, [dispatch]);

  useEffect(() => {
    if (shouldClose) {
      dispatch(setBuyerStep(1));
      closeModal();
    }
  }, [shouldClose]);

  if (!buyerStep) return null;

  useEffect(() => {
    if (buyerStep === 2) {
      questionModalRef.current?.resetQuestions?.();
    }
  }, [buyerStep]);

  const confirmClose = () => {
    setShowConfirmModal(false);
    setShouldClose(true);
    closeModal();
    handleClose();
  };

  const handleClose = () => {
    if (typeof setSelectedService === "function") setSelectedService(null);
    if (typeof setFromImageModal === "function") setFromImageModal(false);
    if (typeof closeModal === "function") closeModal();
  };

  // ✅ Yeh function confirm modal dikhata hai
  const handleCloseWithConfirm = () => {
    setShowConfirmModal(true);
  };

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
      dispatch(setbuyerRequestData({ service_id: service_Id }));
    }
  }, [questionanswerData]);

  useEffect(() => {
    service_Id && dispatch(questionAnswerData({ service_id: service_Id }));
  }, []);

  return (
    <>
      {buyerStep === 1 && (
        <ModalsWithCloseButton
          className="mt-[50px] md:mt-[140px]"
          onClose={handleCloseWithConfirm}
          className2="max-w-[90%] md:max-w-[590px] md:min-w-[590px]"
        >
          <QuestionModalNearme
            questions={questionanswerData}
            onNext={nextStep}
            onBack={previousStep}
            loading={isLoadingQuestions}
            isComingFromStep2={isComingFromStep2}
            setQuestionHistory={setQuestionHistory}
            questionHistory={questionHistory}
            setIsComingFromStep2={setIsComingFromStep2}
            serviceName={serviceName}
            setQuestion2History={setQuestion2History}
            question2History={question2History}
            setSelectedOption={setSelectedOption}
            selectedOption={selectedOption}
            progressPercentage={progressPercentage}
            setProgressPercentage={setProgressPercentage}
          />
        </ModalsWithCloseButton>
      )}

      {buyerStep === 2 && (
        <ModalsWithCloseButton onClose={handleCloseWithConfirm}>
          <NameEmailNearMe
            nextStep={nextStep}
            onBack={previousStep}
            setIsStepFrom2={setIsComingFromStep2}
            setProgressPercentage={setProgressPercentage}
            setSelectedOption={setSelectedOption}
          />
        </ModalsWithCloseButton>
      )}

      {buyerStep === 3 && (
        <ModalsWithCloseButton onClose={handleCloseWithConfirm} className2="max-w-[90%] md:max-[590px] w-full">
          <div className="py-10 rounded-[55px] border-2 border-gray-300 bg-white">
            <PhoneNumberNearMe
              nextStep={nextStep}
              onBack={previousStep}
              updateNumberStep={updateNumberStep}
              setUpdateNumberStep={setUpdateNumberStep}
              setLocalRequestId={setLocalRequestId}
            />
          </div>
        </ModalsWithCloseButton>
      )}

      {buyerStep === 4 && (
        <ModalsWithCloseButton className2="max-w-[90%] md:max-[590px] w-full">
          <div className="rounded-[55px] border-2 border-gray-300 bg-white overflow-hidden">
            <CardLayoutWrapperNearme showButton={false} className1={false}>
              <OTPVerificationMultiStep
                open
                nextStep={nextStep}
                onBack={previousStep}
                isThankuPageOnlyShow
                setUpdateNumberStep={setUpdateNumberStep}
              />
            </CardLayoutWrapperNearme>
          </div>
        </ModalsWithCloseButton>
      )}

      {buyerStep === 5 && (
        <ViewYourMatches
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleCloseWithConfirm}
        />
      )}

      {buyerStep === 7 && (
        <ModalsWithCloseButton className="mt-[50px] md:mt-[90px]" className2="max-w-[90%] md:max-[590px] w-full">
          <div className="rounded-[55px] border-2 border-gray-300 bg-white overflow-hidden">
            <CardLayoutWrapperNearme
              className1={false}
              showBackButton={false}
              showButton={false}
            >
              {/* <MultiStepDescribeYourRequest /> */}
              <DescribeYourRequestNearMe />
            </CardLayoutWrapperNearme>
          </div>
        </ModalsWithCloseButton>
      )}

      {showConfirmModal && (
        <ConfirmationModal
          isOpen={showConfirmModal}
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          onConfirm={confirmClose}
          onClose={() => setShowConfirmModal(false)}
        />
      )}
    </>
  );
}

export default BuyerRegistrationNearMe;
