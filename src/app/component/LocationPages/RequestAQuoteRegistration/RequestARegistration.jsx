"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyerStep } from "@/lib/store/buyerslice/buyerSlice";
import QuestionModal from "./QuestionModal";
import ConfirmationModal from "./ConfirmationModal";
import { getBarkToken } from "@/utils/CookiesHelper";
import NameEmailPostCodePhone from "./NameEmailPostCodePhone";
import OtpVerificationModal from "./OtpverificationModal";
import ReEnterMobileNumberModal from "./ReEnterMobileNumberModal";
import DescribeYourRequestModal from "./DescribeYourRequestModal";
import SeeMyMatchesModal from "./SeeMyMatchesModal";

function RequestARegistration({
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

    const [resetEmailFormTrigger, setResetEmailFormTrigger] = useState(false);
    const [resetServiceFormTrigger, setResetServiceFormTrigger] = useState(false);
    const [resetQaFormTrigger, setResetQasFormTrigger] = useState(false);
    const [shouldClose, setShouldClose] = useState(false);
    // const [getServiceState, setGetServiceState] = useState(null);
    const [email, setEmails] = useState("");
    const [reEnterMobile, setReEnterMobile] = useState(2);
    const [questionIndex, setQuestionIndex] = useState(0);


    const dispatch = useDispatch();

    const { buyerStep, questionanswerData, questionLoader, buyerRequest } =
        useSelector((state) => state.buyer || {});

    const isAdminOrRemembered = getBarkToken();

    const stepFlow = isAdminOrRemembered ? [2, 3, 4, 5] : [1, 2, 3, 4, 5];

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
    // const getService = (service) => {
    //     setGetServiceState(service);
    // };
    // useEffect(() => {
    //     const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    //     if (pendingModal?.shouldOpen) {
    //         localStorage.removeItem("pendingBuyerModal");
    //     } else {
    //         // const initialStep = isAdminOrRemembered ? 2 : 1;
    //         const initialStep = 1;

    //         // dispatch(setBuyerStep(initialStep));
    //     }
    // }, [dispatch]);

    useEffect(() => {
        if (shouldClose) {
            dispatch(setBuyerStep(1));
            onClose();
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

    if (buyerStep === 2 && totalQuestions > 0) {
        const baseIndex = stepFlow.indexOf(2);
        currentPosition = baseIndex + questionIndex + 1;
    } else {
        const stepIndex = stepFlow.indexOf(buyerStep);

        if (totalQuestions > 0 && stepIndex > stepFlow.indexOf(2)) {
            // After questions, shift position forward by (questionCount - 1)
            currentPosition =
                stepIndex + totalQuestions;
        } else {
            currentPosition = stepIndex + 1;
        }
    }

    let progressPercent = Math.round(
        (currentPosition / totalSteps) * 100
    );

    if (stepFlow.indexOf(buyerStep) === stepFlow.length - 1) {
        progressPercent = 100;
    }

    return (
        <>
            {buyerStep === 1 && (
                <NameEmailPostCodePhone
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    formData={buyerRequest}
                    setEmails={setEmails}
                    setShowConfirmModal={setShowConfirmModal}
                    serviceId={serviceId}
                    progressPercent={progressPercent}
                />
            )}
            {buyerStep === 2 && (
                <QuestionModal
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

            {buyerStep === 3 && reEnterMobile === 2 && (
                <OtpVerificationModal
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
                <ReEnterMobileNumberModal
                    setReEnterMobile={setReEnterMobile}
                    onClose={() => setReEnterMobile(2)}
                    progressPercent={progressPercent}
                />
            )}

            {buyerStep === 4 && (
                <DescribeYourRequestModal
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}

                />
            )}

            {buyerStep === 5 && (
                <SeeMyMatchesModal
                    onClose={handleClose}
                    nextStep={nextStep}
                    previousStep={previousStep}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}

                />
            )}
            {showConfirmModal && (
                <ConfirmationModal
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

export default RequestARegistration;
