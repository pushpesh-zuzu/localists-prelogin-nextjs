"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckVerifiedIcon from "../../common/icons/LandingPPCIcon/CheckVerifiedIcon";
import {
  getCityName,
  setbuyerRequestData,
  setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import LocationMapIcon from "../../common/icons/SellerRegistration/LocationMapIcon";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";

const PostcodeSearchLandscapingMultiform = ({
   onNext,
  title = "What is your postcode",
  prevStep,
  getProgressPercentage,
  setBackButtonTriggered,
  returPercentage,
  titleHeading="landscaping"
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { buyerRequest, citySerach } = useSelector((state) => state.buyer);
  const [pincode, setPincode] = useState(buyerRequest?.postal_code || "");
  const [city, setCity] = useState(citySerach || "");
  const [postalCodeValidate, setPostalCodeValidate] = useState(
    !!buyerRequest?.postal_code
  );
  const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);
  const [error, setError] = useState("");

  const firstStepProgress = (2 / 3) * 100;
  const remainingProgressPerStep = (100 - firstStepProgress) / 2;

  const showToast = (type, content) => message[type](content);

  const handlePincodeChange = async (e) => {
    const value = e.target.value.slice(0, 10);
    setPincode(value);
    setPostalCodeValidate(false);
    if (!value.trim()) {
      setError("");
      setCity("");
      setPostalCodeValidate(false);
      return;
    }
    if (value.length < 3) {
      setPostalCodeValidate(false);
      return;
    }

    setIsCheckingPostcode(true);

    try {
      const response = await dispatch(getCityName({ postcode: value }));
      const newResponse = response?.unwrap ? await response.unwrap() : response;

      if (newResponse?.data?.valid) {
        const validPostcode = newResponse.data.postcode;
        setPostalCodeValidate(true);
        setCity(newResponse.data.city);
        dispatch(setcitySerach(newResponse.data.city));
        dispatch(setbuyerRequestData({ postal_code: validPostcode }));
        setError("");
        handleNext(true);
      } else {
        setPostalCodeValidate(false);
        setError("Please enter a valid postcode!");
      }
    } catch (error) {
      setPostalCodeValidate(false);
      setError("Please enter a valid postcode!");
    } finally {
      setIsCheckingPostcode(false);
    }
  };

  const handleNext = (isValid = postalCodeValidate) => {
    if (!isValid) {
      showToast("error", "Please enter a valid postcode.");
      return;
    }

    getProgressPercentage(remainingProgressPerStep - 5);
    if (onNext) {
      onNext();
      setBackButtonTriggered(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNext();
  };
  const handleBack = () => {
    getProgressPercentage(-returPercentage);

    prevStep();
  };
  return (
    <div>
      <h1 className="font-extrabold max-w-[592px] mx-auto text-2xl md:text-[35px] leading-8 md:leading-[48px] text-center mt-5 text-black">
        Get quotes from verified {titleHeading} you can trust
      </h1>
      <div style={{ maxWidth: "592px", margin: "auto" }}>
        <CardLayoutWrapper
          title={title}
          onButtonClick={handleNext}
          buttonText="Next"
          disableNextButton={!postalCodeValidate}
          showBackButton
          onBackClick={handleBack}
          titlePrimary={true}
        >
          <p className="bg-[#e9f8ff] max-w-fit font-normal rounded-md text-base py-1 px-2.5 mx-auto mb-6">
            This is to match you with the closest verified specialists
          </p>
          <div className="relative flex items-center">
            <input
              className={`w-full border border-[#e1e5e9] rounded-lg px-7 py-3 text-base font-medium text-gray-800 transition-all duration-300 focus:outline-none focus:border-[#0096c4] focus:ring-3 focus:ring-[#0096c4]/10 ${
                error ? "border-red-500" : ""
              }`}
              placeholder="Enter Postcode (No Spaces)"
              ref={inputRef}
              value={pincode}
              onChange={handlePincodeChange}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
              <LocationMapIcon background="#00afe3" className="h-3.5 w-3.5" />
            </div>
            {isCheckingPostcode ? (
              <div className="absolute right-3">
                <LoaderIndicator size="small" />
              </div>
            ) : postalCodeValidate ? (
              <div className="h-4 w-4">
                <CheckVerifiedIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5" />
              </div>
            ) : null}
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1 text-left">{error}</p>
          )}
        </CardLayoutWrapper>
      </div>
    </div>
  );
};

export default PostcodeSearchLandscapingMultiform;
