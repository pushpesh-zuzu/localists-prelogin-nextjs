"use client";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import { checkEmailIdApi } from "@/lib/store/findjobslice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardLayoutWrapper from "./CardLayoutWrappper";
import LoaderWithTextMultiStepForm from "./LoaderWithTextMultiStepForm";
import { validateEmail } from "@/utils/validateEmail";
import { useEmailCheck } from "@/hooks/emailExist";
import BackgroundWrapperNameEmailMultiForm from "./BackgroundWrapperNameEmailMultiForm";

const NameEmailMultiStepForm = ({ nextStep, isPPCPages = false, onBack }) => {
  const dispatch = useDispatch();
  const { searchServiceLoader } = useSelector((state) => state.findJobs);
  const { buyerRequest } = useSelector((state) => state.buyer);
  const [email, setEmail] = useState(buyerRequest?.email);
  const [name, setName] = useState(buyerRequest?.name);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isBannerText, setIsBannerText] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const { isEmailAvailable } = useEmailCheck(email);
  const [inputType, setInputType] = useState("text");

  const [errors, setErrors] = useState({
    email: false,
    name: false,
  });

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: false }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        email: e.target.value,
      }),
    );
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prev) => ({ ...prev, name: false }));
    dispatch(
      setbuyerRequestData({
        ...buyerRequest,
        name: e.target.value,
      }),
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
    if (hasError) return;

    const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;
    const res = await dispatch(checkEmailIdApi({ email }));
    if (res.success) {
      dispatch(setbuyerRequestData({ name, email: finalEmail }));
      nextStep();
    } else {
      return;
    }
  };

  const handleBackClick = () => {
    onBack();
  };

  const handleBannerText = () => {
    setIsBannerText(false);
  };

  useEffect(() => {
    console.log(isEmailAvailable, "sss");
    if (!isEmailAvailable) {
      setEmail("");
      dispatch(
        setbuyerRequestData({
          ...buyerRequest,
          name,
          email: "",
        }),
      );
    }
  }, [isEmailAvailable]);

  return (
    <BackgroundWrapperNameEmailMultiForm>
      <CardLayoutWrapper
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
      </CardLayoutWrapper>
    </BackgroundWrapperNameEmailMultiForm>
  );
};

export default NameEmailMultiStepForm;
