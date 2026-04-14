"use client";
import { useState, useEffect } from "react";

import Button from "../../UI/Typography/Button";
import H3 from "../../UI/Typography/H3";
import RoundedLogo from "../icons/RoudedLogo";
import BackgroundLogo from "../icons/BackgroundLogo";
import Image from "next/image";
// import BuyerRegistration from "../BuyerRegistration/BuyerRegistration";
import { CheckIcon, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { getCityName, setbuyerRequestData, setcitySerach, setBuyerStep } from "@/lib/store/buyerslice/buyerSlice";
import { setSelectedServiceId } from "@/lib/store/findjobslice";
import ReqBuyerRegistration from "../ReqBuyerRegistration/ReqBuyerRegistration";


export default function QuotesBanner({
  quotesBannerText = "ROOFING QUOTES IN",
  variant = "primary",
  classQuote = "w-full flex justify-center items-center",
  containerWidth = "w-full max-w-6xl",
  buttonClassQuote = "md:py-[8px] md:px-8 px-4 py-2",
  serviceId = 113,
  serviceName = "Roofing",
  onSubmit,
  debounceMs = 500,
  disabled = false,
  onValidationSuccess,
  onValidationError,
  mobileFrame = "/nearme/Roofing/mobileroof.webp",
}) {

  const [postcode, setPostcode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!postcode.trim() || postcode.length < 3) {
      setIsValid(false);
      setCity("");
      setError("");
      if (onValidationError) onValidationError();
      return;
    }

    const timer = setTimeout(async () => {
      setIsValidating(true);
      try {
        const response = await dispatch(getCityName({ postcode: postcode }));
        const newResponse = response?.payload || response;

        if (newResponse?.data?.valid) {
          setIsValid(true);
          setCity(newResponse.data.city);
          dispatch(setcitySerach(newResponse.data.city));
          dispatch(setbuyerRequestData({ postcode: newResponse?.data?.postcode }))
          setError("");

          // Notify parent component - validation success
          if (onValidationSuccess) {
            onValidationSuccess({
              postcode: postcode,
              city: newResponse.data.city,
              isValid: true,
            });
          }
        } else {
          setIsValid(false);
          setCity("");
          setError("Please enter a valid postcode!");

          // Notify parent component - validation failed
          if (onValidationError) {
            onValidationError();
          }
        }
      } catch (err) {
        setIsValid(false);
        setCity("");
        setError("Please enter a valid postcode!");

        // Notify parent component - validation error
        if (onValidationError) {
          onValidationError();
        }
      } finally {
        setIsValidating(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [postcode, dispatch, debounceMs, onValidationSuccess, onValidationError]);

  const handleChange = (e) => {
    const value = e.target.value.trim().toUpperCase().slice(0, 10);
    setPostcode(value);
    setError("");
  };

  const handleSubmit = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    if (!postcode.trim()) {
      setError("Please enter a valid postcode!");
      return;
    }

    if (!isValid) {
      setError("Please enter a valid postcode!");
      return;
    }

    if (!serviceId) {
      setError("Coming soon!");
      return;
    }

    // Call submit callback with postcode and city data
    if (onSubmit) {
      onSubmit({
        postcode,
        city,
        isValid,
      });
    }
    setError("");
    setShow(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setShow(false);
    setPostcode("");
  };

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (pendingModal?.shouldOpen) {
      dispatch(setSelectedServiceId({
        id: pendingModal.serviceId,
        name: pendingModal.serviceName,
      }));
      dispatch(setbuyerRequestData(pendingModal.buyerRequest));
      dispatch(setcitySerach(pendingModal.city));
      setShow(true);
      dispatch(setBuyerStep(7));
    }
  }, [dispatch]);

  return (
    <>
      <style>{`
      .custom-input::placeholder {
        color: #d9d9d9;
        opacity: 1;
      }
    `}</style>
      <div className={classQuote}>
        <div className={`relative ${containerWidth}`}>

          {/* Main Banner */}
          {/* <div className="bg-[#00afe3] rounded-3xl 
px-6 md:px-5 py-10 md:py-3 
flex flex-row items-center justify-between 
relative overflow-hidden md:pr-[170px]"> */}
          <div className="bg-[#00afe3] rounded-3xl max-[360px]:py-4
px-3 md:px-6 lg:px-[44px] py-2 md:py-3
flex flex-row items-center md:items-center justify-between 
relative overflow-hidden">

            {/* LEFT CONTENT */}
            <div className="z-10 flex-1 text-left">
              <H3 className="text-white tracking-wide md:tracking-[-0.03em] md:!text-[22px] md:!leading-[24px]
        lg:!text-[40px] lg:!leading-[45.3px] xl:!text-[45px] xl:!leading-[40px] !text-[15px] !leading-[15px]">{quotesBannerText}
              </H3>

              <div className="mt-3 md:mt-6 relative">
                <div className="flex flex-row items-center lg:gap-4.5 md:gap-4 gap-2">
                  <div className="relative">
                    <input
                      type="text"
                      value={postcode}
                      onChange={handleChange}
                      onKeyDown={handleKeyPress}
                      disabled={disabled}
                      autoComplete="off"
                      placeholder="Postcode"
                      className="custom-input px-4 py-2 md:px-6 md:py-3 lg:py-2.5 text-left md:text-center font-bold rounded-full bg-white text-gray-500 outline-none w-27 md:w-40 lg:w-74 !text-[16px] md:!text-[16px] lg:!text-[28px] placeholder:!text-[16px] md:placeholder:!text-[16px] lg:placeholder:!text-[28px]"
                    />
                    {postcode && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {isValidating ? (
                          <Loader2 className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 text-gray-400 animate-spin" />
                        ) : isValid ? (
                          <CheckIcon className="w-4 h-4 lg:w-6 lg:h-6 text-white bg-green-500 rounded-full" />
                        ) : null}
                      </div>
                    )}
                  </div>
                  <Button
                    variant={variant}
                    onClick={handleSubmit}
                    className={`${buttonClassQuote}
        bg-green-500 hover:bg-green-600 
        border border-3 border-white py-[7px] md:py-[8px] lg:py-2 lg:w-28
        cursor-pointer transition lg:text-[28px]
        rounded-full text-white 
        font-semibold shadow-md`}
                  >
                    Go
                  </Button>
                </div>

                {error && (
                  <span className="absolute left-2 top-full mt-1 text-red-500 text-sm">
                    {error}
                  </span>
                )}
              </div>
            </div>

            {/* RIGHT SIDE (30 SEC CIRCLE) */}
            <div className="max-[360px]:hidden mt-0 relative flex items-center justify-center  md:mr-38 lg:mr-62">
              <div className="relative w-[100px] h-[100px] md:w-[145px] md:h-[145px] lg:w-[194px] lg:h-[194px] flex items-center justify-center">
                {/* Rounded SVG */}
                <RoundedLogo width={194} height={194} className=" md:h-[170px] md:w-[170px] xl:h-[194px] xl:w-[194px]" />
                <div className="absolute inset-0 mt-2 md:mt-[10px] flex flex-col items-center justify-center text-white rotate-[15deg]">
                  <span className="font-Inter tracking-[-0.03em] -[32px] text-[32px]:leading-[40px] text-[50px] leading-[50px] md:text-[80px] font-bold md:leading-[80px] lg:text-[100px] lg:leading-[100px] xl:text-[110px] xl:leading-[110px]">
                    30
                  </span>
                  <span className="font-[Arial] tracking-[-0.03em]  text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] md:-mt-3 -mt-2 lg:-mt-5">
                    Sec
                  </span>
                </div>
              </div>
            </div>

            {/* Background Faded Text */}
            <BackgroundLogo className="w-[280px] md:w-[430px] lg:w-[650px] lg:-ml-21.5 md:-ml-14" />
          </div>
          {/* PHONE IMAGE (Desktop only) */}
          <div className="hidden md:block absolute md:right-6 lg:right-11 top-1/2 transform -translate-y-1/2">
            <Image
              src={mobileFrame}
              alt="phone"
              width={140}
              height={200}
              className="object-contain md:w-[140px] md:h-[200px] 
               lg:w-[186px] lg:h-[375px]"
            />
          </div>


        </div>
      </div>

      {/* {show && (
        <BuyerRegistration
          closeModal={handleClose}
          service_Id={serviceId}
          postcode={postcode}
          serviceName={serviceName}
          service_Name={serviceName}
        />
      )} */}

      {show && (
        <ReqBuyerRegistration
          onClose={handleClose}
          service_Id={serviceId}
          postcode={postcode}
          serviceName={serviceName}
          service_Name={serviceName}
        />
      )}
    </>
  );
}