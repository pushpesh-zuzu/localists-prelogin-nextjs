"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyerStep } from "@/lib/store/buyerslice/buyerSlice";
import Callender from "../../common/Callender/Callender";
import NameEmailPhoneModal from "../../common/BuyerRegistration/NameEmailPhoneModal";
import ServiceAndPostCodeModal from "../../common/BuyerRegistration/ServiceAndPostCodeModal";
import QuestionModal from "../../common/BuyerRegistration/QuestionsModal";
import OtpVerification from "../../common/BuyerRegistration/OTPVerification";
import ViewYourMatches from "../../common/BuyerRegistration/ViewYourMatches";
import DescribeYourRequest from "../../common/BuyerRegistration/DescribeYourRequest";
import ConfirmationModal from "../../common/BuyerRegistration/ConfirmationModal";
import ReEnterMobileNumber from "../../../../../public/questions/ReEnterMobileNumber";
import { getBarkToken } from "@/utils/CookiesHelper";

function BuyerRegistrationLocationPage({
  closeModal,
  postcode,
  city,
  postalCodeValidate,
  cancelHeading,
  cancelPara,
  setSelectedService = () => {},
  setFromImageModal = () => {},
  service_Id,
  service_Name,
  serviceName,
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const questionModalRef = useRef();

  const [resetEmailFormTrigger, setResetEmailFormTrigger] = useState(false);
  const [resetServiceFormTrigger, setResetServiceFormTrigger] = useState(false);
  const [resetQaFormTrigger, setResetQasFormTrigger] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [getServiceState, setGetServiceState] = useState(null);
  const [email, setEmails] = useState("");
  const [reEnterMobile, setReEnterMobile] = useState(2);

  const dispatch = useDispatch();

  const { buyerStep, questionanswerData, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer || {});

  const isAdminOrRemembered = getBarkToken();

  const stepFlow = isAdminOrRemembered ? [2, 3, 5, 7, 8] : [1, 2, 3, 4, 5, 7];

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
  const getService = (service) => {
    setGetServiceState(service);
  };
  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (pendingModal?.shouldOpen) {
      localStorage.removeItem("pendingBuyerModal");
    } else {
      // const initialStep = isAdminOrRemembered ? 2 : 1;
      const initialStep = 1;

      // dispatch(setBuyerStep(initialStep));
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
    setResetEmailFormTrigger(true);
    setResetServiceFormTrigger(true);
    setResetQasFormTrigger(true);
    closeModal();
  };
  const handleClose = () => {
    if (typeof setSelectedService === "function") setSelectedService(null);
    if (typeof setFromImageModal === "function") setFromImageModal(false);
    if (typeof closeModal === "function") closeModal();
  };
  return (
    <>
      {buyerStep === 1 && (
        <NameEmailPhoneModal
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          formData={buyerRequest}
          setEmails={setEmails}
          setShowConfirmModal={setShowConfirmModal}
          resetTrigger={resetEmailFormTrigger}
        />
      )}
      {buyerStep === 2 && (
        <ServiceAndPostCodeModal
          nextStep={nextStep}
          formData={buyerRequest}
          serviceId={getServiceState?.id || service_Id}
          serviceName={getServiceState?.name || service_Name || serviceName}
          onClose={handleClose}
          pincodes={postcode}
          setShowConfirmModal={setShowConfirmModal}
          postalCodeIsValidate={postalCodeValidate}
          resetServiceTrigger={resetServiceFormTrigger}
          getService={getService}
        />
      )}
      {buyerStep === 3 && (
        <QuestionModal
          ref={questionModalRef}
          questions={questionanswerData}
          serviceName={getServiceState?.name || service_Name}
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          loading={questionLoader}
          setShowConfirmModal={setShowConfirmModal}
          formData={buyerRequest}
          resetQaTrigger={resetQaFormTrigger}
          setResetQasFormTrigger={setResetQasFormTrigger}
          isStartWithQuestionModal
        />
      )}
      {buyerStep === 4 && (
        <Callender
          handleClose={handleClose}
          nextStep={nextStep}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
      {reEnterMobile === 1 && (
        <ReEnterMobileNumber
          setReEnterMobile={setReEnterMobile}
          onClose={() => setReEnterMobile(2)}
        />
      )}
      {buyerStep === 5 && reEnterMobile === 2 && (
        <OtpVerification
          nextStep={nextStep}
          previousStep={previousStep}
          formData={buyerRequest}
          open={true}
          city={city}
          isThankuPageOnlyShow={true}
          setReEnterMobile={setReEnterMobile}
        />
      )}
      {buyerStep === 6 && (
        <ViewYourMatches
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
        />
      )}
      {buyerStep === 7 && (
        <DescribeYourRequest
          nextStep={nextStep}
          onClose={handleClose}
          setShowConfirmModal={setShowConfirmModal}
        />
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

export default BuyerRegistrationLocationPage;
