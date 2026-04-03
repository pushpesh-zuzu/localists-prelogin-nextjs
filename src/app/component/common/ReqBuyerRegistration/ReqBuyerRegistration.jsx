"use client";

import React, { useEffect, useRef, useState, useMemo, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyerStep, getAutoBid, setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import QuestionModal from "./QuestionModal";
import { getBarkToken } from "@/utils/CookiesHelper";
import NameEmailPhone from "./NameEmailPhone";
import ConfirmationModal from "./ConfirmationModal";
import OtpVerificationModal from "./OtpVerificationModal";
import ReEnterMobileNumberModal from "./ReEnterMobileNumberModal";
import DescribeYourRequestModal from "./DescribeYourRequestModal";
import SeeMyMatchesModal from "./SeeMyMatchesModal";
import AddressFields from "./AddressFields";

function ReqBuyerRegistration({
    onClose,
    cancelHeading,
    cancelPara,
    postcode,
    setSelectedService = () => { },
    setFromImageModal = () => { },
    service_Id,
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

    // const stepFlow = isAdminOrRemembered ? [2, 3, 4, 5] : [1, 2, 3, 4, 5];

    const stepFlow = useMemo(() => {
        if (isAdminOrRemembered) {
            return hasSellers ? [2, 3, 4, 5, 6] : [2, 3, 4, 5];
        } else {
            return hasSellers ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
        }
    }, [isAdminOrRemembered, hasSellers]);

    const nextStep = () => {
        const currentIndex = stepFlow.indexOf(buyerStep);
        if (currentIndex < stepFlow.length - 1) {
            dispatch(setBuyerStep(stepFlow[currentIndex + 1]));
        }
    };

    useEffect(() => {
        if (!service_Id) return;

        if (buyerRequest?.service_id !== service_Id) {
            dispatch(
                setbuyerRequestData({ service_id: service_Id })
            );
        }
    }, [service_Id, buyerRequest?.service_id, dispatch]);

    const previousStep = () => {
        const currentIndex = stepFlow.indexOf(buyerStep);
        if (currentIndex > 0) {
            dispatch(setBuyerStep(stepFlow[currentIndex - 1]));
        }
    };
    // const getService = (service) => {
    //     setGetServiceState(service);
    // };
    useEffect(() => {
        if (typeof window === "undefined") return;

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
            onClose?.();
        }
    }, [shouldClose]);

    if (!buyerStep) return null;

    useEffect(() => {
        if (buyerStep === 2 && questionModalRef.current) {
            questionModalRef.current.resetQuestions?.();
        }
    }, [buyerStep]);

    const confirmClose = () => {
        setShowConfirmModal(false);
        setShouldClose(true);
        setResetEmailFormTrigger(true);
        setResetServiceFormTrigger(true);
        setResetQasFormTrigger(true);
        onClose?.();
    };
    const handleClose = () => {
        if (typeof setSelectedService === "function") setSelectedService(null);
        if (typeof setFromImageModal === "function") setFromImageModal(false);
        if (typeof onClose === "function") onClose?.();
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

    if (buyerStep === 3 && totalQuestions > 0) {
        const baseIndex = stepFlow.indexOf(3);
        currentPosition = baseIndex + questionIndex + 1;
    } else {
        const stepIndex = stepFlow.indexOf(buyerStep);

        if (totalQuestions > 0 && stepIndex > stepFlow.indexOf(3)) {
            // After questions, shift position forward by (questionCount - 1)
            currentPosition =
                stepIndex + totalQuestions;
        } else {
            currentPosition = stepIndex + 1;
        }
    }

    // let progressPercent = progressPercent = Math.round(
    //     (currentPosition / totalSteps) * 100
    // );
    let progressPercent = 0
    if (buyerStep === 1) {
    progressPercent = 10;
    }
    else if (buyerStep === 2) {
        progressPercent = 20;
    }
    else {
     progressPercent = Math.round(
        (currentPosition / totalSteps) * 100
    );
    }

    if (stepFlow.indexOf(buyerStep) === stepFlow.length - 1) {
        progressPercent = 100;
    }
 console.log(buyerRequest,'progressPercent')
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
         {buyerStep === 1 && (
                <AddressFields
                    nextStep={nextStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                />
            )}
            {buyerStep === 2 && (
                <NameEmailPhone
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    formData={buyerRequest}
                    setEmails={setEmails}
                    setShowConfirmModal={setShowConfirmModal}
                    serviceId={service_Id}
                    progressPercent={progressPercent}
                    
                />
            )}
            {buyerStep === 3 && (
                <QuestionModal
                    ref={questionModalRef}
                    questions={questionanswerData}
                    serviceName={serviceName}
                    serviceId={service_Id}
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

            {buyerStep === 4 && reEnterMobile === 2 && (
                <OtpVerificationModal
                    nextStep={nextStep}
                    previousStep={previousStep}
                    formData={buyerRequest}
                    open={true}
                    isThankuPageOnlyShow={true}
                    setReEnterMobile={setReEnterMobile}
                    serviceId={service_Id}
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

            {buyerStep === 5 && (
                <DescribeYourRequestModal
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                    sellers={sellers}
                />
            )}

            {buyerStep === 6 && hasSellers && (
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
                    serviceId={service_Id}
                    onClose={() => setShowConfirmModal(false)}
                />
            )}
        </>
    );
}

export default ReqBuyerRegistration;