"use client";

import { useEffect, useState, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";

import H1 from "@/app/component/UI/Typography/H1";
import Logo from "../../../../public/ReactIcons/Logo";
import VettedProffessionIcon from "../../../../public/ReactIcons/VotedProfessionIcon";
import FreeQuoteIcon from "../../../../public/ReactIcons/FreeQuoteIcon";
import FastResponseIcon from "../../../../public/ReactIcons/FastResponseIcon";

import {
    setBuyerStep,
    questionAnswerData,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken } from "@/utils/CookiesHelper";

import NewPPCForm from "./NewPPCForm";
import QuestionModalNewPPC from "./QuestionModalNewPPC";
import OTPVerificationNewPPC from "./OTPVerificationNewPPC";
import ReEnterMobileNumberNewPPC from "./ReEnterMobileNumberNewPPC";
import PostCodeNewPPC from "./PostCodeNewPPC";
import EmailNewPPC from "./EmailNewPPC";
import FormWrapper from "./FormWrapper";
import DescribeYourRequestNewPPC from "./DescribeYourRequestNewPPC";
import NavigationDetectorDesktop from "@/app/component/common/NavigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "@/app/component/common/NavigationDetected/NavigationDetectorWithConfirmations";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";



export default function HeroSectionNewPPC({
    heading0 = "Find Expert",
    heading1 = "Driveway Installation",
    heading2 = "Near You",
    text1 = "Local Vetted Experts",
    text2 = "Free Quotes",
    text3 = "Fast Response",
    quoteText = "Get Free Quotes Now",
    questionDescription = "",
    serviceId,
}) {
    usePendingBuyerRedirect()
    const dispatch = useDispatch();
    const userToken = getBarkToken();
    const authToken = useSelector((state) => state.findJobs.authToken);

    const { questionanswerData, questionLoader, buyerRequest, buyerStep } =
        useSelector((state) => state.buyer);

    const [localRequestId, setLocalRequestId] = useState(null);
    const [reEnterMobile, setReEnterMobile] = useState(2);
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
        <section className="bg-[#E3F6FC]">
            {/* {localRequestId === null && (
                <>
                    {typeof window !== "undefined" && window.innerWidth > 768 ? (
                        <Suspense fallback={null}>
                            <NavigationDetectorDesktop />
                        </Suspense>) : (
                        <Suspense fallback={null}>
                            <NavigationDetectorWithConfirmations />
                        </Suspense>
                    )}
                </>
            )} */}

            {/* CONTAINER */}
            <div
                className="
          max-w-[1300px] mx-auto
          px-[10px] pt-[40px] pb-[72px]
          flex gap-[118px]

          max-[1250px]:px-[56px]
          max-[1250px]:pt-[30px]
          max-[1250px]:pb-[48px]
          max-[1250px]:gap-[20px]

          max-[1024px]:flex-col

          max-[600px]:px-[10px]
        "
            >
                {/* LEFT */}
                <div className="flex-1">
                    <Logo
                        className="
              w-[195px] h-[38px] mb-[24px]
              max-[1250px]:w-[125px]
              max-[1250px]:h-[28px]
              max-[600px]:w-[120px]
              max-[600px]:h-[20px]
              max-[600px]:mb-[15px]
            "/>

                    <H1 className="text-center max-lg:!text-[25px] max-lg:!leading-[30px] lg:text-left lg:leading-[80px]">
                        {heading0}{" "}
                        <span className="text-[#00afe3]">{heading1}</span>{" "}
                        {heading2}
                    </H1>


                    {/* DESKTOP FEATURES */}
                    <div className="block max-[600px]:hidden">
                        <div
                            className="
                flex gap-[20px] mt-[26px]
                font-[Arial] font-bold
                text-[18px] leading-[22px]
                tracking-[-0.03px]
                text-[#253238]
              ">
                            <Feature icon={<VettedProffessionIcon />} text={text1} />
                            <Feature
                                icon={
                                    <div className="">
                                        <FreeQuoteIcon />
                                    </div>
                                }
                                text={text2}
                            />

                            <Feature
                                icon={
                                    <div className="">
                                        <FastResponseIcon />
                                    </div>
                                }
                                text={text3}
                            />
                        </div>
                        <div className="flex gap-[20px] mt-[40px]">
                            <PrimaryButton>{quoteText}</PrimaryButton>
                        </div>

                    </div>

                    {/* Mobile Features */}
                    <div className="hidden max-[600px]:block">
                        <div
                            className="
      flex flex-col items-center
      mt-[10px]
      font-[Arial] font-bold
      text-[14px] leading-[22px]
      tracking-[-0.03px]
      text-[#253238] text-center
    "
                        >
                            {/* First row */}
                            <MobileFeature
                                icon={
                                    <div className="flex items-center justify-center scale-75 origin-center">
                                        <VettedProffessionIcon className="w-[30px] h-[30px]" />
                                    </div>
                                }
                                text={text1}
                            />

                            {/* Second row – icons close */}
                            <div className="flex items-center justify-center gap-[8px] mt-[6px]">
                                <MobileFeature icon={<FreeQuoteIcon />} text={text2} />
                                <MobileFeature icon={<FastResponseIcon />} text={text3} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT FORM */}
                {buyerStep === 1 && (
                    <NewPPCForm nextStep={nextStep} serviceId={serviceId} />
                )}

                {buyerStep === 2 && (
                    <Suspense fallback={null}>
                        <QuestionModalNewPPC
                            questions={questionanswerData}
                            loading={questionLoader}
                            serviceName={buyerRequest.service_name}
                            nextStep={nextStep}
                            setLocalRequestId={setLocalRequestId}
                            description={questionDescription}
                            backButtonTriggered={backButtonTriggered}
                        />
                    </Suspense>
                )}

                {buyerStep === 3 && <PostCodeNewPPC prevStep={prevStep} onNext={nextStep} />}
                {buyerStep === 4 && <EmailNewPPC onBack={prevStep} nextStep={nextStep} />}

                {buyerStep === 5 && reEnterMobile === 2 && (
                    <OTPVerificationNewPPC
                        setReEnterMobile={setReEnterMobile}
                        isThankuPageOnlyShow
                    />
                )}

                {buyerStep === 5 && reEnterMobile === 1 && (
                    <ReEnterMobileNumberNewPPC
                        setReEnterMobile={setReEnterMobile}
                        onClose={() => setReEnterMobile(2)}
                    />
                )}

                {buyerStep === 6 && (
                    <FormWrapper>
                        <DescribeYourRequestNewPPC />
                    </FormWrapper>
                )}

            </div>
        </section>
    );
}


function Feature({ icon, text, full }) {
    return (
        <div className={`flex items-center gap-2 ${full ? "basis-full justify-center" : ""
            }`}>
            <div className="w-[40px] h-[40px] bg-[#00afe3] text-white rounded-full flex items-center justify-center">
                {icon}
            </div>
            <p>{text}</p>
        </div>
    );
}

function MobileFeature({ icon, text }) {
    return (
        <div className="flex items-center gap-[7px]">
            <div className="w-[30px] h-[30px] bg-[#00afe3] text-white rounded-full flex items-center justify-center">
                {icon}
            </div>
            <p>{text}</p>
        </div>
    );
}

function PrimaryButton({ children, className = "", ...props }) {
    return (
        <button
            {...props}
            className={`
        bg-[#FF9933] hover:bg-[#00afe3]
        text-white
        px-[22px] py-[12px]
        rounded-full font-black
        flex items-center gap-[10px]
        font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[20px]       
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]

        ${className}
      `}
        >
            {children}
        </button>
    );
}
