"use client";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import { checkEmailIdApi } from "@/lib/store/findjobslice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "@/utils/validateEmail";
import { useEmailCheck } from "@/hooks/emailExist";
import LoaderWithTextMultiStepForm from "../../common/MultiStepFormPPC/LoaderWithTextMultiStepForm";
import CardLayoutWrapperNearme from "./CardLayoutWrapperNearme";
import BackgroundWrapperNameEmailNearMe from "./BackgroundWrapperNameEmailNearMe";

const NameEmailNearMe = ({
  nextStep,
  isPPCPages = false,
  onBack,
  setIsStepFrom2,
}) => {
  const dispatch = useDispatch();
  const { errorMessage, searchServiceLoader } = useSelector(
    (state) => state.findJobs
  );
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [email, setEmail] = useState(buyerRequest?.email);
  const [name, setName] = useState(buyerRequest?.name);

  const [isEmailValid, setIsEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable } = useEmailCheck(email);

  const [errors, setErrors] = useState({
    email: false,
    name: false,
  });
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isBannerText, setIsBannerText] = useState(false);

  const [inputType, setInputType] = useState("text"); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        email: e.target.value,
      })
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name: e.target.value,
      })
    );
  };

  const handleEmailFocus = () => {
    setInputType("email");
  };
  const handleEmailBlur = () => {
    if (!email) {
      setInputType("text");
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      email: !isPPCPages && (!email || !validateEmail(email)),
      name: !name.trim(),
    };

    if (!isPPCPages && newErrors.email && !emailErrorMessage) {
      setEmailErrorMessage("Please enter a valid email address.");
    }

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((e) => e);
    if (hasError || (!isPPCPages && !isEmailValid)) return;

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;
    const res = await dispatch(checkEmailIdApi({ email }));
    if (res.success) {
      dispatch(setbuyerRequestData({ name, email: finalEmail }));
      nextStep();
    } else {
      return;
    }
  };

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 9000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleBackClick = async () => {
    onBack();
    setIsStepFrom2(true);
  };
  const handleBannerText = () => {
    setIsBannerText(false);
  };
  useEffect(() => {
    if (!isEmailAvailable) {
      setEmail("");
      dispatch(
        setbuyerRequestData({
          ...buyerRequest,
          name,
          email: "",
        })
      );
    }
  }, [isEmailAvailable]);

  return (
    <BackgroundWrapperNameEmailNearMe className="md:max-w-[100%] min-h-[70vh] md:min-h-[70vh] rounded-[50px] border-2 border-gray-300">
      <CardLayoutWrapperNearme
        title={
          isBannerText
            ? ""
            : `You're nearly done! Just enter a few details to get your custom quotes.`
        }
        onButtonClick={isBannerText ? handleBannerText : handleSubmit}
        onBackClick={handleBackClick}
        buttonText="Next"
        showBackButton={true}
        disableNextButton={searchServiceLoader || isInitialLoading}
        loader={searchServiceLoader}
        NameEmailContainer={true}
        className1={false}
      >
        {isInitialLoading ? (
          <LoaderWithTextMultiStepForm
            setIsInitialLoading={setIsInitialLoading}
            setIsBannerText={setIsBannerText}
          />
        ) : isBannerText && !isInitialLoading ? (
          <div className="flex flex-col gap-[10px] -mb-5">
            <img
              className="h-20 w-20 mx-auto max-[768px]:h-[60px] max-[768px]:w-[60px]"
              src={"/images/MultiStepFormPPC/CheckStartCircle.png"}
              alt="CheckIcon"
            />
            <h3 className="text-2xl font-semibold text-black leading-[26px] max-w-[90%] mx-auto max-[768px]:text-xl">
              Perfect! We've found you some great local matches
            </h3>
            <p className="text-lg font-medium text-black leading-6 max-[768px]:text-base">
              One more thing, we need your details just to send you quotes only
            </p>
          </div>
        ) : (
          <div className="mb-2 flex flex-col max-[480px]:mb-0">
            {/* Hidden trap fields for auto-fill prevention */}
            <input
              type="text"
              name="username"
              style={{ display: "none", position: "absolute", left: "-9999px" }}
              autoComplete="new-password"
              tabIndex="-1"
            />
            <input
              type="password"
              name="password"
              style={{ display: "none", position: "absolute", left: "-9999px" }}
              autoComplete="new-password"
              tabIndex="-1"
            />

            {!isPPCPages && (
              <div style={{ marginBottom: "10px" }}>
                <input
                  type={inputType}
                  placeholder="Email"
                  className={`flex justify-start shadow-[0px_0px_2px_0.5px_#0000001a] border border-[#d9d9d9] w-full p-3 text-[#828282] rounded-[5px] focus:outline-none focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(0,150,196,0.1)] max-[768px]:text-sm max-[768px]:p-[10px] max-[480px]:text-sm max-[480px]:p-[10px] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#000] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[caret-color:#000] ${
                    errors?.email ? "!border-red-500" : ""
                  }`}
                  value={email}
                  onChange={handleEmailChange}
                  onFocus={handleEmailFocus}
                  onBlur={handleEmailBlur}
                  autoComplete="new-password"
                  name="user_email_address"
                  id="user_email_address"
                />
                {errors?.email && (
                  <span className="text-red-500 text-xs block text-left mt-[5px]">
                    Please enter a valid email address.
                  </span>
                )}
              </div>
            )}
            <input
              style={{ marginTop: "5px" }}
              type="text"
              placeholder="Full Name"
              className={`flex justify-start shadow-[0px_0px_2px_0.5px_#0000001a] border border-[#d9d9d9] w-full p-3 text-[#828282] rounded-[5px] focus:outline-none focus:border-[var(--primary-color)] focus:shadow-[0_0_0_3px_rgba(0,150,196,0.1)] max-[768px]:text-sm max-[768px]:p-[10px] max-[480px]:text-sm max-[480px]:p-[10px] [&:-webkit-autofill]:[-webkit-box-shadow:0_0_0_1000px_white_inset] [&:-webkit-autofill]:[-webkit-text-fill-color:#000] [&:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s] [&:-webkit-autofill]:[caret-color:#000] ${
                errors?.name ? "!border-red-500" : ""
              }`}
              value={name}
              autoComplete="new-password"
              name="user_full_name"
              id="user_full_name"
              onChange={handleNameChange}
            />
            {errors?.name && (
              <span className="text-red-500 text-xs block text-left mt-[5px]">
                Full name is required.
              </span>
            )}

            <p className="bg-[rgba(233,248,255,1)] max-w-fit font-normal rounded-[5px] text-base px-[10px] py-[5px] mx-auto mt-[33px]">
              We only use this to match you with trusted professionals.
            </p>
          </div>
        )}
      </CardLayoutWrapperNearme>
    </BackgroundWrapperNameEmailNearMe>
  );
};

export default NameEmailNearMe;
