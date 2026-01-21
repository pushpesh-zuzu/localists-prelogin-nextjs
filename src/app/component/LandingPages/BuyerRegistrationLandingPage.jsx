import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  questionAnswerData,
  setBuyerStep,
} from "@/lib/store/buyerslice/buyerSlice";

import ViewYourMatches from "../common/BuyerRegistration/ViewYourMatches";
import BidsList from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/BidsList/BidsList";
import ConfirmationModal from "../../common/ConfirmationModal/ConfirmationModal";
import NumberVerifiedModal from "../../buyerPanel/PlaceNewRequest/BuyerRegistration/NumberVerified/NumberVerified";
import WhatServiceDoYouNeedPage from "../../BuyerRegistrationPages/WhatServiceDoYouNeedPage/WhatServiceDoYouNeedPage";
import OTPVerificationPage from "../../BuyerRegistrationPages/OTPVerificationPage/OTPVerificationPage";
import DescribeYourRequestPage from "../../BuyerRegistrationPages/DescribeYourRequestPage/DescribeYourRequestPage";
import QuestionAnswerPage from "../../BuyerRegistrationPages/QuestionAnswerPage/QuestionAnswerPage";
import EmailMatchPage from "../../BuyerRegistrationPages/EmailMatchPage/EmailMatchPage";
import ReEnterMobileNumber from "../../common/ReEnterMobileNumber/ReEnterMobileNumber";
import { handleScrollToBottom } from "../../../utils/scroll";

const BuyerRegistrationForLandscapingPPC = ({
  closeModal,
  serviceId = 43,
  serviceName = "",
  postcode,
  postalCodeValidate,
  cancelHeading,
  cancelPara,
  setSelectedService = () => {},
  setFromImageModal = () => {},
}) => {
  const dispatch = useDispatch();
  const questionModalRef = useRef();

  const {
    questionanswerData,
    buyerStep,
    questionLoader,
    buyerRequest,
  } = useSelector((state) => state.buyer);

  const { userToken } = useSelector((state) => state.auth);
  const { authToken } = useSelector((state) => state.findJobs);

  const isAdminOrRemembered = authToken || userToken?.remember_tokens;

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [resetEmailFormTrigger, setResetEmailFormTrigger] = useState(false);
  const [resetServiceFormTrigger, setResetServiceFormTrigger] = useState(false);
  const [resetQaFormTrigger, setResetQasFormTrigger] = useState(false);
  const [shouldClose, setShouldClose] = useState(false);
  const [reEnterMobile, setReEnterMobile] = useState(2);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  const stepFlow = isAdminOrRemembered
    ? [2, 3, 6, 7, 8]
    : [1, 2, 3, 4, 5, 7, 8];

  const nextStep = () => {
    handleScrollToBottom();
    const index = stepFlow.indexOf(buyerStep);
    if (index < stepFlow.length - 1) {
      dispatch(setBuyerStep(stepFlow[index + 1]));
    }
  };

  const previousStep = () => {
    const index = stepFlow.indexOf(buyerStep);
    if (index > 0) {
      dispatch(setBuyerStep(stepFlow[index - 1]));
      handleScrollToBottom();
    }
  };

  const handleClose = () => {
    setSelectedService(null);
    setFromImageModal(false);
    closeModal?.();
  };

  const confirmClose = () => {
    setShowConfirmModal(false);
    setShouldClose(true);
    setResetEmailFormTrigger(true);
    setResetServiceFormTrigger(true);
    setResetQasFormTrigger(true);
  };

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: serviceId }));
  }, [dispatch, serviceId]);

  useEffect(() => {
    if (questionanswerData.length > 0) {
      setIsLoadingQuestions(false);
    }
  }, [questionanswerData]);

  useEffect(() => {
    if (shouldClose) dispatch(setBuyerStep(1));
  }, [shouldClose, dispatch]);

  return (
    <div
      className="
        bg-white text-center
        shadow-[0px_0px_10px_0px_#0000000f]
        h-fit max-w-[500px]
        ml-auto
        max-[820px]:mx-auto
        max-[480px]:w-[88%] max-[480px]:max-w-[88%]
      "
    >
      {buyerStep === 1 && (
        <QuestionAnswerPage
          ref={questionModalRef}
          questions={questionanswerData}
          serviceName={serviceName}
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          setShowConfirmModal={setShowConfirmModal}
          formData={buyerRequest}
          resetQaTrigger={resetQaFormTrigger}
          setResetQasFormTrigger={setResetQasFormTrigger}
          isStartWithQuestionModal
          loading={questionLoader || isLoadingQuestions}
        />
      )}

      {buyerStep === 2 && (
        <WhatServiceDoYouNeedPage
          nextStep={nextStep}
          formData={buyerRequest}
          serviceId={serviceId}
          serviceName={serviceName}
          onClose={handleClose}
          pincodes={postcode}
          setShowConfirmModal={setShowConfirmModal}
          postalCodeIsValidate={postalCodeValidate}
          resetServiceTrigger={resetServiceFormTrigger}
          isStartWithQuestionModal
        />
      )}

      {buyerStep === 3 && (
        <EmailMatchPage
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
          formData={buyerRequest}
          setShowConfirmModal={setShowConfirmModal}
          resetTrigger={resetEmailFormTrigger}
          isPPCPages={false}
          hideCloseButton
          isStartWithQuestionModal
        />
      )}

      {buyerStep === 4 && reEnterMobile === 2 && (
        <OTPVerificationPage
          nextStep={nextStep}
          previousStep={previousStep}
          formData={buyerRequest}
          open
          isThankuPageOnlyShow
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
          open
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
        <DescribeYourRequestPage
          nextStep={nextStep}
          onClose={handleClose}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}

      {buyerStep === 8 && (
        <BidsList
          nextStep={nextStep}
          previousStep={previousStep}
          onClose={handleClose}
        />
      )}

      {showConfirmModal && (
        <ConfirmationModal
          cancelHeading={cancelHeading}
          cancelPara={cancelPara}
          onConfirm={confirmClose}
          onCancel={() => setShowConfirmModal(false)}
          setShowConfirmModal={setShowConfirmModal}
        />
      )}
    </div>
  );
};

export default BuyerRegistrationForLandscapingPPC;
