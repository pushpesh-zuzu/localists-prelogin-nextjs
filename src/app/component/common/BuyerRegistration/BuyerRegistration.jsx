"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyerStep } from "@/lib/store/buyerslice/buyerSlice";
import NameEmailPhoneModal from "./NameEmailPhoneModal";
import ServiceAndPostCodeModal from "./ServiceAndPostCodeModal";
import QuestionModal from "./QuestionsModal";
import OtpVerification from "./OTPVerification";
import ViewYourMatches from "./ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest";
import { getBarkToken } from "@/utils/CookiesHelper";
import ConfirmationModal from "./ConfirmationModal";
import ReEnterMobileNumber from "../../../../../public/questions/ReEnterMobileNumber";

function BuyerRegistration({
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

  // ✅ Destructure multiple states from buyer slice
  const { buyerStep, questionanswerData, questionLoader, buyerRequest } =
    useSelector(
      (state) => state.buyer || {} // replace 'buyer' with 'buyers' if store key is buyers
    );

  const isAdminOrRemembered = getBarkToken();

  const stepFlow = isAdminOrRemembered
    ? [2, 3, 6, 7, 8]
    : [1, 2, 3, 4, 5, 7, 8];

  // console.log(buyerRequest, "buyerRequest");
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

  // const onNext = (step) => {
  //   dispatch(setBuyerStep(step));
  // };

  useEffect(() => {
    if (shouldClose) {
      dispatch(setBuyerStep(1));
      closeModal();
    }
  }, [shouldClose]);

  // console.log(buyerStep, "bss");
  if (!buyerStep) return null; // Prevent crash if state is undefined
  // console.log(questionanswerData, "questionanswerData");

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
  console.log(showConfirmModal, "showConfirmModalshowConfirmModal");
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
          n
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
        />
      )}
      {reEnterMobile === 1 && (
        <ReEnterMobileNumber
          setReEnterMobile={setReEnterMobile}
          onClose={() => setReEnterMobile(2)}
        />
      )}
      {buyerStep === 4 && reEnterMobile === 2 && (
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
      {buyerStep === 5 && (
        <ViewYourMatches
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          formData={buyerRequest}
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

export default BuyerRegistration;
