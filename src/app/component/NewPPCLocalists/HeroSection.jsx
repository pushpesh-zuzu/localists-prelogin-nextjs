"use client";

import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    setBuyerStep,
    questionAnswerData,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";
import Paragraph1 from "../UI/Typography/Paragraph1";
import H1 from "../UI/Typography/H1";
import QuestionModal from "./BuyerRegistrationPPC/QuestionModal";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";
import PostcodeSearch from "./BuyerRegistrationPPC/PostcodeSearch";
import NameEmail from "./BuyerRegistrationPPC/NameEmail";
import PhoneNumber from "./BuyerRegistrationPPC/PhoneNumber";
import OTPVerification from "./BuyerRegistrationPPC/OTPVerification";
import CardLayoutWrapper from "./CardLayoutWrapper";
import DescribeYourRequest from "./BuyerRegistrationPPC/DescribeYourRequest";

function HeroSection({
    title = "",
    heading = "",
    description = "",
    bannerImage = "",
    altText = "",
    serviceId,
    serviceName,
    questionDescription = ""
}) {
    usePendingBuyerRedirect()
    const dispatch = useDispatch();
    const userToken = getBarkToken();
    const authToken = useSelector((state) => state.findJobs.authToken);

    const { questionanswerData, questionLoader, buyerRequest, buyerStep } =
        useSelector((state) => state.buyer);

    const [localRequestId, setLocalRequestId] = useState(null);
    const [updateNumberStep, setUpdateNumberStep] = useState(2);
    const [backButtonTriggered, setBackButtonTriggered] = useState(false);


    const stepFlow = [1, 2, 3, 4, 5, 6];
    const isAdminOrRemembered = authToken || userToken?.remember_tokens;

    const nextStep = () => {
        const index = stepFlow.indexOf(buyerStep);
        if (index < stepFlow.length - 1) {
            setBackButtonTriggered(false);
            dispatch(setBuyerStep(stepFlow[index + 1]));
        }
    };

    const prevStep = () => {
        setBackButtonTriggered(true);
        const index = stepFlow.indexOf(buyerStep);
        if (index > 0) dispatch(setBuyerStep(stepFlow[index - 1]));
    };

    useEffect(() => {
        const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
        dispatch(setBuyerStep(pendingModal?.shouldOpen ? 6 : 1));
    }, [dispatch, isAdminOrRemembered]);

    useEffect(() => {
        handleScrollToBottom();
    }, [buyerStep]);

    useEffect(() => {
        dispatch(questionAnswerData({ service_id: serviceId }));
    }, []);

    return (
        <section className="relative w-full overflow-hidden px-[30px] md:px-[120px]">
            {/* Background Layer */}
            {bannerImage && (
                <div
                    className="
            absolute inset-0
            pointer-events-none
            bg-center
            bg-cover
            bg-repeat"
                    style={{
                        backgroundImage: `url(${bannerImage})`,
                    }}
                />
            )}

            <div className="absolute inset-0 bg-black/80" />

            {/* Content */}
            <div className="relative z-10 w-full text-center pt-[40px] pb-[100px]">
                <H1 className="text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                    {heading}
                </H1>

                <Paragraph1
                    className="
            text-white
            pt-[18px] md:pt-4 lg:pt-[20px]
            drop-shadow-[0_0_4px_rgba(0,0,0,0.25)]
          ">
                    {description}
                </Paragraph1>
                <div className="pt-[40px] pb-0 flex justify-center">
                    {buyerStep === 1 && (
                        <Suspense fallback={null}>
                            <QuestionModal
                                title={title}
                                questions={questionanswerData}
                                loading={questionLoader}
                                serviceName={buyerRequest.service_name}
                                nextStep={nextStep}
                                setLocalRequestId={setLocalRequestId}
                                description={questionDescription}
                                backButtonTriggered={backButtonTriggered}
                                prevStep={prevStep}
                            />
                        </Suspense>
                    )}

                    {buyerStep === 2 && (
                        <PostcodeSearch
                            prevStep={prevStep}
                            onNext={nextStep}
                            titleHeading="roofing companies"
                        />
                    )}

                    {buyerStep === 3 && (
                        <NameEmail
                            nextStep={nextStep}
                            onBack={prevStep}
                            isStartWithQuestionModal={true}
                        />
                    )}

                    {buyerStep === 4 && (
                        <PhoneNumber
                            nextStep={nextStep}
                            onBack={prevStep}
                            serviceId={serviceId}
                            setUpdateNumberStep={setUpdateNumberStep}
                            updateNumberStep={updateNumberStep}
                            setLocalRequestId={setLocalRequestId}
                        />
                    )}

                    {buyerStep === 5 && (
                        <CardLayoutWrapper OtpContainer={true} showButton={false}>
                            <OTPVerification
                                open
                                nextStep={nextStep}
                                onBack={prevStep}
                                serviceId={serviceId}
                                isThankuPageOnlyShow
                                setUpdateNumberStep={setUpdateNumberStep}
                            />
                        </CardLayoutWrapper>
                    )}

                    {buyerStep === 6 && (
                        <CardLayoutWrapper
                            showBackButton={false}
                            showButton={false}
                        >
                            <DescribeYourRequest />
                        </CardLayoutWrapper>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HeroSection;