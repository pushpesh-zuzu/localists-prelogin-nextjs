"use client";

import { useEffect, useState, Suspense, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setBuyerStep,
  questionAnswerData,
  setbuyerRequestData,
  addDetailsRequestData,
  clearSetbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import { getBarkToken, getCookie } from "@/utils/CookiesHelper";
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
// import DescribeYourRequest from "./BuyerRegistrationPPC/DescribeYourRequest";
import ZohoCalendar from "./BuyerRegistrationPPC/ZohoCalendar";
import DescribeYourRequestNewLocalists from "./BuyerRegistrationPPC/DescribeYourRequestNewLocalists";
import H2 from "../UI/Typography/H2";
import CalenderQuestions from "./CalenderQuestions";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { useRouter } from "next/navigation";
// import CalenderQuestions from "./CalenderQuestions";

function HeroSection({
  title = "",
  heading = "",
  description = "",
  bannerImage = "",
  altText = "",
  serviceId,
  serviceName,
  questionDescription = "",
  OptionsIconsData,
}) {
  usePendingBuyerRedirect();
  const dispatch = useDispatch();
  const userToken = getBarkToken();
  const authToken = useSelector((state) => state.findJobs.authToken);
  const router = useRouter();

  const {
    requestId,
    qualityData: qualityScore = 0,
    addDetailLoader: isLoading = false,
    questionanswerData,
    questionLoader,
    buyerRequest,
    buyerStep,
  } = useSelector((state) => state.buyer);
  const [inputText, setInputText] = useState("");
  const [files, setFiles] = useState([]);

  const [localRequestId, setLocalRequestId] = useState(null);
  const [updateNumberStep, setUpdateNumberStep] = useState(2);
  const [backButtonTriggered, setBackButtonTriggered] = useState(false);

  const stepFlow = [1, 2, 3, 4, 5, 6, 7];
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

  //   useEffect(() => {
  //     const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
  //     dispatch(setBuyerStep(pendingModal?.shouldOpen ? 6 : 1));
  //   }, [dispatch, isAdminOrRemembered]);

  useEffect(() => {
    handleScrollToBottom();
  }, [buyerStep]);

  useEffect(() => {
    dispatch(questionAnswerData({ service_id: serviceId }));
    dispatch(setbuyerRequestData({ service_id: serviceId }));
  }, []);

  // const onSelect = () => {
  //     console.log("calling")
  // }
  const featureRef = useRef(null);

  useEffect(() => {
    const element = featureRef?.current;
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 230; // 80px upar
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, [buyerStep]);

  const handleSubmit = async () => {
    let hasError = false;

    if (hasError) return;

    // Prepare data for submission
    const reqId = getCookie("requestId") || requestId;

    const detailsData = {
      request_id: reqId,
      details: inputText,
      professional_letin: 0,
      slots: JSON.stringify("data"),
    };

    // Dispatch to Redux
    dispatch(addDetailsRequestData(detailsData, router, reqId)).then(
      (result) => {
        if (result?.success) {
          const successMessage =
            result?.payload?.message ||
            result?.message ||
            "Create Request successfully!";
          showToast("success", successMessage);
          onNext();

          // Clear states
          dispatch(clearSetbuyerRequestData());
          dispatch(clearBuyerRegisterFormData());
          localStorage.removeItem("pendingBuyerModal");
        }
      },
    );
  };
  console.log(buyerStep, "bbbbbbbbb");
  return (
    <section className="relative min-h-[100vh] w-full overflow-hidden px-[30px] md:px-[120px]">
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
      <div className="relative z-10 w-full text-center pt-[20px] md:pt-[40px] pb-[20px] md:pb-[100px]">
        {buyerStep === 7 ? (
          <>
            <H2 className="max-w-full md:max-w-[90%] mx-auto text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
              Hold on! You’re not booked in just yet.
            </H2>

            <p
              className="font-[Arial] font-bold tracking-[-0.03em] text-[25.2px] leading-[25.2px]
                      lg:text-[28px] lg:leading-[28px] text-white pt-[20px] md:pt-2 lg:pt-[18px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              Next step: Choose a time for your free property visit using the
              calendar below.
            </p>
            <p
              className="font-[Arial] font-bold tracking-[-0.03em] text-[25.2px] leading-[25.2px]
                      lg:text-[28px] lg:leading-[28px] text-white pt-2 text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              Once your booking is confirmed, you’ll receive a confirmation
              email and text message.
            </p>
          </>
        ) : (
          <>
            <H1 className="text-white drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
              {heading}
            </H1>

            <p
              className="font-[Arial] font-bold tracking-[-0.03em] text-[25.2px] leading-[25.2px]
                      lg:text-[28px] lg:leading-[28px] text-white pt-[20px] md:pt-2 lg:pt-[18px] text-shadow-[0_0_4px_rgba(0,0,0,0.25)]"
            >
              {description}
            </p>
          </>
        )}
        <div
          ref={featureRef}
          className="pt-[20px] md:pt-[40px] pb-0 flex justify-center"
        >
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
                OptionsIconsData={OptionsIconsData}
                featureRef={featureRef}
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

          {/* {buyerStep === 4 && (
                        <CalenderQuestions
                            nextStep={nextStep}
                            onBack={prevStep}
                            // onSelect={onSelect}
                        />
                       
                    )} */}

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
                isThankuPageOnlyShow={false}
                setUpdateNumberStep={setUpdateNumberStep}
              />
            </CardLayoutWrapper>
          )}
          {buyerStep === 6 && (
            <CardLayoutWrapper showBackButton={false} showButton={false}>
              <DescribeYourRequestNewLocalists
                onNext={nextStep}
                setInputText={setInputText}
                inputText={inputText}
                files={files}
                setFiles={setFiles}
              />
            </CardLayoutWrapper>
          )}
          {buyerStep === 7 && (
            //  <ZohoCalendar/>
            <CalenderQuestions
              onBack={prevStep}
              // onSelect={onSelect}
              nextStep={handleSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
