"use client";

import React, { useEffect, useRef, useState, useMemo, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyerStep, getAutoBid, setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";
// import ConfirmationModal from "./ConfirmationModal";
import NewBuyerRequestNameEmail from "./NewBuyerRequestNameEmail";
import NewBuyerRequestQuestionModal from "./NewBuyerRequestQuestionModal";
import NewBuyerRequestAddressField from "./NewBuyerRequestAddressField";
import NewBuyerRequestBuyerOtpVerificationModal from "./NewBuyerRequestBuyerOtpVerificationModal";
import NewBuyerRequestDescribeYourRequestModal from "./NewBuyerRequestDescribeYourRequestModal";
import NewBuyerRequestSeeMyMatchesModal from "./NewBuyerRequestSeeMyMatchesModal";
import NewRequestBuyerReEnterMobileNumberModal from "./NewRequestBuyerReEnterMobileNumberModal";
import NewRequestBuyerPhoneNumber from "./NewRequestBuyerPhoneNumber";
import ConfirmationModal from "../ConfirmationModal";
import NewBuyerRegistrationConfirmModal from "../../BuyerRegistration/NewBuyerRegistrationDesign/NewBuyerRegistrationConfirmModal";

function NewBuyerRequestRestrationForm({
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
    // console.log("sellers", sellers)

    const isAdminOrRemembered = getBarkToken();

    const stepFlow = useMemo(() => {
        if (isAdminOrRemembered) {
            return hasSellers ? [2, 3, 4, 5, 6, 7] : [2, 3, 4, 5, 6];
        } else {
            return hasSellers ? [1, 2, 3, 4, 5, 6, 7] : [1, 2, 3, 4, 5, 6];
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
            const previousBuyerStep = stepFlow[currentIndex - 1];

            if (previousBuyerStep === 1) {
                setQuestionIndex(0);
                dispatch(setbuyerRequestData({ questions: [] }));
            }

            dispatch(setBuyerStep(previousBuyerStep));
        }
    };
    // const getService = (service) => {
    //     setGetServiceState(service);
    // };
    useEffect(() => {
        if (typeof window === "undefined") return;

        const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
      if (pendingModal?.step) {
            dispatch(setBuyerStep(pendingModal.step));
        }
        if (pendingModal?.buyerRequest) {
            dispatch(setbuyerRequestData(pendingModal.buyerRequest));
        }
        localStorage.removeItem("pendingBuyerModal");
    }, [dispatch]);

    useEffect(() => {
        if (shouldClose) {
            dispatch(setBuyerStep(1));
            onClose?.();
        }
    }, [dispatch, onClose, shouldClose]);

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

    if (buyerStep === 1) {
        progressPercent = 10;
    }

    if (stepFlow.indexOf(buyerStep) === stepFlow.length - 1) {
        progressPercent = 100;
    }
    // console.log(buyerRequest, 'progressPercent')
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

    if (!buyerStep) return null;

    return (
        <>
            {
                buyerStep === 1 && (
                    <NewBuyerRequestNameEmail
                        nextStep={nextStep}
                        onClose={handleClose}
                        formData={buyerRequest}
                        setEmails={setEmails}
                        setShowConfirmModal={setShowConfirmModal}
                        progressPercent={progressPercent}
                    />
                )
            }

            {buyerStep === 2 && (
                <NewBuyerRequestQuestionModal
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
                    initialQuestionIndex={questionIndex}
                    progressPercent={progressPercent}
                />
                
            )}

            {
                buyerStep === 3 && (
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

            {buyerStep === 4 && (
                <NewBuyerRequestAddressField
                    nextStep={nextStep}
                    previousStep={previousStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                    serviceId={service_Id}
                />
            )}

            {buyerStep === 5 && reEnterMobile === 2 && (
                <NewBuyerRequestBuyerOtpVerificationModal
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
                <NewRequestBuyerReEnterMobileNumberModal
                    setReEnterMobile={setReEnterMobile}
                    onClose={() => setReEnterMobile(2)}
                    progressPercent={progressPercent}
                />
            )}
             {/* {
                buyerStep === 6 && (
                    <VerificationCompleteModal onNext={nextStep} progressPercent={progressPercent}/>
                )
            } */}

            {buyerStep === 6 && (
                <NewBuyerRequestDescribeYourRequestModal
                    nextStep={nextStep}
                    onClose={handleClose}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                    sellers={sellers}
                />
            )}
           

            {buyerStep === 7 && hasSellers && (
                <NewBuyerRequestSeeMyMatchesModal
                    onClose={handleClose}
                    nextStep={nextStep}
                    setShowConfirmModal={setShowConfirmModal}
                    progressPercent={progressPercent}
                />
            )}

            {showConfirmModal && (
                // <ConfirmationModal
                //     isOpen={showConfirmModal}
                //     cancelHeading={cancelHeading}
                //     cancelPara={cancelPara}
                //     onConfirm={confirmClose}
                //     serviceId={service_Id}
                //     onClose={() => setShowConfirmModal(false)}
                // />
                <NewBuyerRegistrationConfirmModal 
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

export default NewBuyerRequestRestrationForm;
