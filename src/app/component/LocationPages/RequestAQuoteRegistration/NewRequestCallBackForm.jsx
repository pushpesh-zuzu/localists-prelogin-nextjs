"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyerStep, getAutoBid, setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import ConfirmationModal from "./ConfirmationModal";
import { getBarkToken } from "@/utils/CookiesHelper";
import NewBuyerRequestNameEmail from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestNameEmail";
import NewBuyerRequestQuestionModal from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestQuestionModal";
import NewRequestBuyerPhoneNumber from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewRequestBuyerPhoneNumber";
import NewBuyerRequestAddressField from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestAddressField";
import NewBuyerRequestBuyerOtpVerificationModal from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestBuyerOtpVerificationModal";
import NewRequestBuyerReEnterMobileNumberModal from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewRequestBuyerReEnterMobileNumberModal";
import NewBuyerRequestDescribeYourRequestModal from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestDescribeYourRequestModal";
import NewBuyerRequestSeeMyMatchesModal from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestSeeMyMatchesModal";
import NewBuyerRequestPostCodeFieldModal from "../../common/ReqBuyerRegistration/NewRequestModalSteps/NewBuyerRequestPostCodeFieldModal";
import NewBuyerRegistrationConfirmModal from "../../common/BuyerRegistration/NewBuyerRegistrationDesign/NewBuyerRegistrationConfirmModal";

function NewRequestCallBackForm({
    onClose,
    cancelHeading,
    cancelPara,
    setSelectedService = () => { },
    setFromImageModal = () => { },
    serviceId,
    serviceName,
}) {
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const questionModalRef = useRef();
    const hasFetched = useRef(false);


    const [resetEmailFormTrigger, setResetEmailFormTrigger] = useState(false);
    const [resetServiceFormTrigger, setResetServiceFormTrigger] = useState(false);
    const [resetQaFormTrigger, setResetQasFormTrigger] = useState(false);
    const [shouldClose, setShouldClose] = useState(false);
    // const [getServiceState, setGetServiceState] = useState(null);
    const [email, setEmails] = useState("");
    const [reEnterMobile, setReEnterMobile] = useState(2);
    const [questionIndex, setQuestionIndex] = useState(0);


    const dispatch = useDispatch();

    const { buyerStep, questionanswerData, questionLoader, buyerRequest, requestId,
        requestUserId, autoBidData } =
        useSelector((state) => state.buyer || {});

    const serviceData = autoBidData?.[0];
    const sellers = serviceData?.sellers || [];
    const hasSellers = sellers.length > 0;

    // console.log("buyerRequest", buyerRequest)

    const isAdminOrRemembered = getBarkToken();

    const stepFlow = useMemo(() => {
        if (isAdminOrRemembered) {
            return hasSellers ? [2, 3, 4, 5, 6, 7, 8] : [2, 3, 4, 5, 6, 7];
        } else {
            return hasSellers ? [1, 2, 3, 4, 5, 6, 7, 8] : [1, 2, 3, 4, 5, 6, 7];
        }
    }, [isAdminOrRemembered, hasSellers]);

    const nextStep = () => {
        const currentIndex = stepFlow.indexOf(buyerStep);
        if (currentIndex < stepFlow.length - 1) {
            dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
        }
    };

    useEffect(() => {
        if (!serviceId) return;

        if (buyerRequest?.service_id !== serviceId) {
            dispatch(
                setbuyerRequestData({ service_id: serviceId })
            );
        }
    }, [serviceId, buyerRequest?.service_id, dispatch]);

    const previousStep = () => {
        const currentIndex = stepFlow.indexOf(buyerStep);
        if (currentIndex > 0) {
            const previousBuyerStep = stepFlow[currentIndex - 1];

            if (previousBuyerStep === 2) {
                setQuestionIndex(0);
                dispatch(setbuyerRequestData({ questions: [] }));
            }

            dispatch(setBuyerStep(previousBuyerStep));
        }
    };

    useEffect(() => {
        const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
        if (pendingModal?.shouldOpen) {
            localStorage.removeItem("pendingBuyerModal");
        } else {
            // const initialStep = isAdminOrRemembered ? 2 : 1;
            // const initialStep = 1;

            // dispatch(setBuyerStep(initialStep));
        }
    }, [dispatch]);

    useEffect(() => {
        if (shouldClose) {
            dispatch(setBuyerStep(1));
            onClose();
        }
    }, [shouldClose]);

    if (!buyerStep) return null;

    const confirmClose = () => {
        setShowConfirmModal(false);
        setShouldClose(true);
        setResetEmailFormTrigger(true);
        setResetServiceFormTrigger(true);
        setResetQasFormTrigger(true);
        onClose();
    };
    const handleClose = () => {
        if (typeof setSelectedService === "function") setSelectedService(null);
        if (typeof setFromImageModal === "function") setFromImageModal(false);
        if (typeof onClose === "function") onClose();
    };

    const totalQuestions = questionanswerData?.length || 0;

    // Base steps without question expansion
    const baseSteps = stepFlow.length;

    // If questions exist → replace step 2 with question count
    const totalSteps =
        totalQuestions > 0
            ? baseSteps - 1 + totalQuestions
            : baseSteps;

    // console.log("totalSteps", totalSteps, baseSteps, stepFlow)

    let currentPosition = 0;

    const stepIndex = stepFlow.indexOf(buyerStep);
    const questionStepIndex = stepFlow.indexOf(3);

    if (buyerStep === 3 && totalQuestions > 0) {
        currentPosition = questionStepIndex + questionIndex + 1;
    } else {
        if (totalQuestions > 0 && stepIndex > questionStepIndex) {
            currentPosition = stepIndex + (totalQuestions - 1) + 1;
        } else {
            currentPosition = stepIndex + 1;
        }
    }

    let progressPercent = Math.floor(
        (currentPosition / totalSteps) * 100
    );

    if (stepIndex === stepFlow.length - 1) {
        progressPercent = 100;
    }

    // Call API once
    useEffect(() => {
        if (!hasFetched.current && requestId && requestUserId) {
            dispatch(
                getAutoBid({
                    user_id: requestUserId,
                    lead_id: requestId,
                })
            );
            hasFetched.current = true;
        }
    }, [dispatch, requestId, requestUserId]);

    return (
        <>
            {
                buyerStep === 1 && (
                    <NewBuyerRequestPostCodeFieldModal
                        nextStep={nextStep}
                        onClose={handleClose}
                        formData={buyerRequest}
                        setShowConfirmModal={setShowConfirmModal}
                        serviceId={serviceId}
                        progressPercent={progressPercent}
                    />
                )
            }

            {
                buyerStep === 2 && (
                    <NewBuyerRequestNameEmail
                        nextStep={nextStep}
                        previousStep={previousStep}
                        onClose={handleClose}
                        formData={buyerRequest}
                        setEmails={setEmails}
                        setShowConfirmModal={setShowConfirmModal}
                        progressPercent={progressPercent}
                    />
                )
            }
            {buyerStep === 3 && (
                <NewBuyerRequestQuestionModal
                    ref={questionModalRef}
                    questions={questionanswerData}
                    serviceName={serviceName}
                    serviceId={serviceId}
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    loading={questionLoader}
                    setShowConfirmModal={setShowConfirmModal}
                    formData={buyerRequest}
                    onQuestionChange={setQuestionIndex}
                    progressPercent={progressPercent}
                />
            )}

            {
                buyerStep === 4 && (
                    <NewRequestBuyerPhoneNumber
                        nextStep={nextStep}
                        previousStep={previousStep}
                        onClose={handleClose}
                        formData={buyerRequest}
                        setShowConfirmModal={setShowConfirmModal}
                        progressPercent={progressPercent}
                    />
                )
            }

            {buyerStep === 5 && (
                <NewBuyerRequestAddressField
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                    serviceId={serviceId}
                />
            )}

            {buyerStep === 6 && reEnterMobile === 2 && (
                <NewBuyerRequestBuyerOtpVerificationModal
                    nextStep={nextStep}
                    previousStep={previousStep}
                    formData={buyerRequest}
                    open={true}
                    isThankuPageOnlyShow={true}
                    setReEnterMobile={setReEnterMobile}
                    serviceId={serviceId}
                    progressPercent={progressPercent}

                />
            )}

            {reEnterMobile === 1 && (
                <NewRequestBuyerReEnterMobileNumberModal
                    setReEnterMobile={setReEnterMobile}
                    onClose={() => setReEnterMobile(2)}
                    progressPercent={progressPercent}
                />
            )}

            {buyerStep === 7 && (
                <NewBuyerRequestDescribeYourRequestModal
                    nextStep={nextStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                    sellers={sellers}
                />
            )}

            {buyerStep === 8 && hasSellers && (
                <NewBuyerRequestSeeMyMatchesModal
                    onClose={handleClose}
                    nextStep={nextStep}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                />
            )}


            {showConfirmModal && (
                <NewBuyerRegistrationConfirmModal
                    isOpen={showConfirmModal}
                    cancelHeading={cancelHeading}
                    cancelPara={cancelPara}
                    onConfirm={confirmClose}
                    serviceId={serviceId}
                    onClose={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );
}

export default NewRequestCallBackForm;
