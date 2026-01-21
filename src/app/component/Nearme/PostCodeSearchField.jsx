"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, CheckIcon, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCityName, setbuyerRequestData, setBuyerStep, setcitySerach } from "@/lib/store/buyerslice/buyerSlice";
import BuyerRegistration from "../common/BuyerRegistration/BuyerRegistration";
import { setSelectedServiceId } from "@/lib/store/findjobslice";

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

        if (newResponse?.data?.city) {
          setIsValid(true);
          setCity(newResponse.data.city);
          dispatch(setcitySerach(newResponse.data.city));
          setError("");
          setShow(true);

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
    debugger
    if (!postcode.trim()) {
      setError("Please enter a postcode");
      return;
    }

    if (!isValid) {
      setError("Please wait for validation");
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
        className={`relative max-w-[260px] md:max-w-[246px] lg:max-w-[404px] ${
          margin ? "mt-5 md:mt-6 xl:mt-[40px]" : ""
        }`}
      >
        <div
          className="flex items-center bg-white rounded-full overflow-hidden "
          style={{
            boxShadow: "0px 23.2px 38.66px 0px #005974E5",
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
              className={`w-full font-bold px-4 py-2.5 md:pl-6 md:py-2.5 xl:pl-[43px] xl:py-4 
                        !text-[#B3B3B3] 
                        placeholder:!text-[#B3B3B3] 
                        focus:outline-none 
                        text-base xl:!text-[25px] 
                        placeholder:text-base xl:placeholder:!text-[25px]`}
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
            
            className={` ${buttonBg} cursor-pointer min-w-[62px] md:min-w-[100px] font-bold pl-3.5 pr-5 py-[11px]  xl:pl-[22px] xl:pr-6 xl:py-4 text-white focus:outline-none text-base xl:text-[25px]!`}
          >
            {buttonText}
          </button>
        </div>

      {error && (
        <p className="text-left text-red-500 text-sm mt-2 max-w-[254px] md:max-w-[246px] lg:max-w-[404px]">
          {error}
        </p>
      )}
      </div>
      {show && (
        <BuyerRegistration
        closeModal={handleClose}
          service_Id={112}
          postcode={postcode}
          serviceName="Tree Surgery"
          service_Name="Tree Surgery"
        />
      )}
    </>
  );
}

export default PostCodeSearchField;
