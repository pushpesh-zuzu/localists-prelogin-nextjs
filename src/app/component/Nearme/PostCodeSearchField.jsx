"use client";
import React, { useState, useEffect } from "react";
import { CheckIcon, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCityName, setbuyerRequestData, setBuyerStep, setcitySerach } from "@/lib/store/buyerslice/buyerSlice";
import { setSelectedServiceId } from "@/lib/store/findjobslice";
import BuyerRegistrationNearMe from "./BuyerRegistrationNearMe/BuyerRegistrationNearMe";
// import BuyerRegistrationNearMe1 from "./BuyerRegistrationNearMe1";

function PostCodeSearchField({
  placeholder = "Enter Postcode",
  buttonText = "Go",
  debounceMs = 500,
  className = "",
  disabled = false,
  onValidationSuccess,
  onValidationError,
  onSubmit,
  margin = true,
  buttonBg = "bg-[#7DD5F1]",
  serviceId = 112,
  serviceName = "Tree Surgery"
}) {
  const [postcode, setPostcode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  // Debounced API validation
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
    if (!postcode.trim()) {
      setError("Please enter a valid postcode!");
      return;
    }

    if (!isValid) {
      setError("Please enter a valid postcode!");
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
    setShow(true);

  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleClose = () => {
    setShow(false);
    setPostcode("")
  };

  useEffect(() => {
    const pendingModal = JSON.parse(localStorage.getItem("pendingBuyerModal"));
    if (pendingModal?.shouldOpen) {
      setSelectedServiceId({
        id: pendingModal.serviceId,
        name: pendingModal.serviceName,
      });
      dispatch(setbuyerRequestData(pendingModal.buyerRequest));
      dispatch(setcitySerach(pendingModal.city));
      setShow(true);
      dispatch(setBuyerStep(7));
    }
  }, [dispatch]);
  return (
    <>
      <div
        className={`relative max-w-[260px] md:max-w-[280px] lg:max-w-[416px] ${margin ? "mt-5 md:mt-6 lg:mt-[40px]" : ""
          }`}
      >
        <div
          className="flex items-center bg-white rounded-full overflow-hidden "
          style={{
            boxShadow: "0px 12.56px 20.94px 0px #005974E5",
          }}
        >
          {/* Input Field */}
          <div className="flex-1 flex-col relative">
            <input
              type="text"
              value={postcode}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              className={`w-full font-bold px-4 py-2.5 md:pl-6 md:py-2.5 lg:pl-[43px] lg:py-4 
                        !text-[#B3B3B3] 
                        placeholder:!text-[#B3B3B3] 
                        focus:outline-none 
                        text-base lg:!text-[25px] 
                        placeholder:text-base lg:placeholder:!text-[25px]`}
            />

            {/* Validation Icons */}
            {postcode && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {isValidating ? (
                  <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
                ) : isValid ? (
                  <CheckIcon className="w-5 text-white h-5 bg-green-500 rounded-full" />
                ) : null}
              </div>
            )}
          </div>

          {/* Go Button */}
          <button
            type="button"
            onClick={handleSubmit}

            className={` ${buttonBg} cursor-pointer min-w-[62px] lg:min-w-[100px] font-bold pl-3.5 pr-5 py-[11px] hover:bg-[#00aef3]  lg:pl-[22px] lg:pr-6 lg:py-4 text-white focus:outline-none text-base lg:text-[25px]!`}
          >
            {buttonText}
          </button>
        </div>

      {error && (
          <p className="ml-[5%] absolute text-left text-red-600 text-base mt-2 max-w-[254px] md:max-w-[246px] lg:max-w-[404px]">
          {error}
        </p>
        )}
      </div>    
      {show && (
        <BuyerRegistrationNearMe
          closeModal={handleClose}
          service_Id={serviceId}
          postcode={postcode}
          serviceName={serviceName}
          service_Name={serviceName}
        />
      )}
      {/* {show && (
        <BuyerRegistrationNearMe1
          closeModal={handleClose}
          service_Id={serviceId}
          postcode={postcode}
          serviceName={serviceName}
          service_Name={serviceName}
        />
      )} */}
    </>
  );
}

export default PostCodeSearchField;
