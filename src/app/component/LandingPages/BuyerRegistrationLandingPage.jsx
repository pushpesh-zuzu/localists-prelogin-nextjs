import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionModal from "./QuestionsModal";
import {
  questionAnswerData,
  setbuyerRequestData,
  setBuyerStep,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";

import ViewYourMatches from "./ViewYourMatches";
import DescribeYourRequest from "./DescribeYourRequest";
import WhatServiceYouNeed from "./WhatServiceYouNeed";
import EmailMatch from "./EmailMatch";
import ConfirmationModal from "./ConfirmationModal";
import OtpVerification from "./OTPVerification";
import NumberVerifiedModal from "./NumberVerifiedModal";
import WelcomeEmailModal from "./WelcomeEmailModal";
import ReEnterMobileNumber from "./ReEnterMobileNumber";

const BuyerRegistrationLandingPage = ({
  closeModal,
  serviceId = 52,
  serviceName,
  postcode,
  postalCodeValidate,
  cancelHeading,
  cancelPara,
  setSelectedService = () => { },
  setFromImageModal = () => { },
  isStartWithQuestionModal,
  welcomModalTitle = "",
  welcomModalButtonText,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const questionModalRef = useRef();
  const [getServiceState, setGetServiceState] = useState(null);
  const [resetEmailFormTrigger, setResetEmailFormTrigger] = useState(false);
  const [resetServiceFormTrigger, setResetServiceFormTrigger] = useState(false);
  const [resetQaFormTrigger, setResetQasFormTrigger] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [email, setEmails] = useState("");
  const [reEnterMobile, setReEnterMobile] = useState(2);
  const dispatch = useDispatch();
  const { questionanswerData, buyerStep, questionLoader, buyerRequest } =
    useSelector((state) => state.buyer);

  const userToken = getBarkToken()
  const { authToken } = useSelector((state) => state.findJobs);
  const isAdminOrRemembered = authToken || userToken?.remember_tokens;

  const stepFlow = isAdminOrRemembered
    ? [2, 3, 6, 7, 8]
    : [0, 1, 2, 3, 4, 5, 7, 8];

  console.log("showConfirmModal", buyerStep)
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
      const initialStep = isAdminOrRemembered
        ? 2
        : isStartWithQuestionModal
          ? 0
          : 1;
      dispatch(setBuyerStep(initialStep));
    }
  }, [dispatch, isAdminOrRemembered]);
  useEffect(() => {
    if (buyerStep) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [buyerStep]);

  useEffect(() => {
    if (shouldClose) {
      dispatch(setBuyerStep(1));
      closeModal();
    }
  }, [shouldClose]);

  const handleClose = () => {
    if (typeof setSelectedService === "function") setSelectedService(null);
    if (typeof setFromImageModal === "function") setFromImageModal(false);
    if (typeof closeModal === "function") closeModal();
  };

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

  useEffect(() => {
    isStartWithQuestionModal &&
      dispatch(questionAnswerData({ service_id: serviceId }));
  }, []);

  useEffect(() => {
    dispatch(setbuyerRequestData({ service_id: serviceId }));
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full bg-[rgba(22,25,41,0.3)] flex items-center justify-center z-[1000] py-[20px] h-[100vh] overflow-auto max-sm:py-[15px] max-[480px]:w-[100%] max-h-[600px]:items-start">
      {!isStartWithQuestionModal ? (
        <div className="bg-white text-center shadow-[0_0_10px_0_rgba(0,0,0,0.06)] relative h-fit">
          {buyerStep === 1 && (
            <EmailMatch
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
              formData={buyerRequest}
              setEmails={setEmails}
              setShowConfirmModal={setShowConfirmModal}
              resetTrigger={resetEmailFormTrigger}
              hideCloseButton
            />
          )}
          {buyerStep === 2 && (
            <WhatServiceYouNeed
              nextStep={nextStep}
              formData={buyerRequest}
              serviceId={serviceId}
              serviceName={serviceName}
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
              serviceName={getServiceState?.name}
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

          {buyerStep === 4 && reEnterMobile === 2 && (
            <OtpVerification
              nextStep={nextStep}
              previousStep={previousStep}
              formData={buyerRequest}
              open={true}
              isThankuPageOnlyShow={true}
              setReEnterMobile={setReEnterMobile}
            />
          )}
          {reEnterMobile === 1 && (
            <ReEnterMobileNumber
              setReEnterMobile={setReEnterMobile}
              onClose={() => setReEnterMobile(2)}
            />
          )}

          {buyerStep === 5 && (
            <NumberVerifiedModal
              nextStep={nextStep}
              previousStep={previousStep}
              open={true}
              setShowConfirmModal={setShowConfirmModal}
            />
          )}
          {buyerStep === 6 && (
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

          {/* {buyerStep === 8 && (
            <BidsList
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
            />
          )} */}

          {showConfirmModal && (
            <ConfirmationModal
              isOpen={showConfirmModal}
              cancelHeading={cancelHeading}
              cancelPara={cancelPara}
              onClose={() => setShowConfirmModal(false)}
              onConfirm={confirmClose}
            />
          )}
        </div>
      ) : (
        <div
          className="bg-white text-center shadow-[0_0_10px_0_rgba(0,0,0,0.06)] relative h-fit"
          style={{
            borderRadius: buyerStep === 0 ? "10px" : "",
            boxShadow:
              buyerStep === 0 ? "10px 10px 10px 0px rgba(0, 0, 0, 0.2)" : "0px 0px 10px 0px rgba(0, 0, 0, 0.06)",
          }}
        >
          {buyerStep === 0 && (
            <WelcomeEmailModal
              nextStep={nextStep}
              onClose={handleClose}
              setShowConfirmModal={setShowConfirmModal}
              resetTrigger={resetEmailFormTrigger}
              welcomModalTitle={welcomModalTitle}
              welcomModalButtonText={welcomModalButtonText}
            />
          )}
          {buyerStep === 1 && (
            <QuestionModal
              ref={questionModalRef}
              questions={questionanswerData}
              serviceName={serviceName}
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
              loading={questionLoader}
              setShowConfirmModal={setShowConfirmModal}
              formData={buyerRequest}
              resetQaTrigger={resetQaFormTrigger}
              setResetQasFormTrigger={setResetQasFormTrigger}
              isStartWithQuestionModal={isStartWithQuestionModal}
            />
          )}
          {buyerStep === 2 && (
            <WhatServiceYouNeed
              nextStep={nextStep}
              formData={buyerRequest}
              serviceId={serviceId}
              serviceName={serviceName}
              onClose={handleClose}
              pincodes={postcode}
              setShowConfirmModal={setShowConfirmModal}
              postalCodeIsValidate={postalCodeValidate}
              resetServiceTrigger={resetServiceFormTrigger}
              isStartWithQuestionModal={isStartWithQuestionModal}
              getService={getService}
            />
          )}

          {buyerStep === 3 && (
            <EmailMatch
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
              formData={buyerRequest}
              setEmails={setEmails}
              setShowConfirmModal={setShowConfirmModal}
              resetTrigger={resetEmailFormTrigger}
              isStartWithQuestionModal={isStartWithQuestionModal}
              isPPCPages={false}
              hideCloseButton
            />
          )}

          {buyerStep === 4 && reEnterMobile === 2 && (
            <OtpVerification
              nextStep={nextStep}
              previousStep={previousStep}
              formData={buyerRequest}
              open={true}
              isThankuPageOnlyShow={true}
              setReEnterMobile={setReEnterMobile}
            />
          )}
          {reEnterMobile === 1 && (
            <ReEnterMobileNumber
              setReEnterMobile={setReEnterMobile}
              onClose={() => setReEnterMobile(2)}
            />
          )}
          {buyerStep === 5 && (
            <NumberVerifiedModal
              nextStep={nextStep}
              previousStep={previousStep}
              open={true}
              setShowConfirmModal={setShowConfirmModal}
            />
          )}
          {buyerStep === 6 && (
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

          {/* {buyerStep === 8 && (
            <BidsList
              nextStep={nextStep}
              previousStep={previousStep}
              onClose={handleClose}
            />
          )} */}

          {showConfirmModal && (
            <ConfirmationModal
              isOpen={showConfirmModal}
              cancelHeading={cancelHeading}
              cancelPara={cancelPara}
              onClose={() => setShowConfirmModal(false)}
              onConfirm={confirmClose}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default BuyerRegistrationLandingPage;
