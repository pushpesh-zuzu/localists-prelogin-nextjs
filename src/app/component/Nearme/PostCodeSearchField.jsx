"use client";
import React, { useState, useEffect } from "react";
import { CheckCircle, CheckIcon, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getCityName, setcitySerach } from "@/lib/store/buyerslice/buyerSlice";

function PostCodeSearchField({
  placeholder = "Enter Postcode",
  buttonText = "Go",
  debounceMs = 500,
  className = "",
  disabled = false,
  onValidationSuccess,
  onValidationError,
  onSubmit,
  margin=true,
  buttonBg='bg-[#7DD5F1]'
}) {
  const [postcode, setPostcode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

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
  return (
    <>
      <div className={`relative max-w-[254px] md:max-w-[246px] lg:max-w-[404px] ${margin ?'mt-5 md:mt-6 xl:mt-[46px]': ''}`}>
        <div
          className="flex items-center bg-white rounded-full overflow-hidden "
          style={{
            boxShadow: "0px 23.2px 38.66px 0px #005974E5",
          }}
        >
          {/* Input Field */}
          <div className="flex-1 relative">
            <input
              type="text"
              value={postcode}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete="off"
              className={`w-full font-bold px-4 py-2.5 md:px-6 md:py-2.5 xl:px-[43px] xl:py-4 
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
            disabled={disabled || !isValid || isValidating}
            className={` ${buttonBg} font-bold px-4 py-2.5 md:px-6 md:py-2.5 xl:px-[23px] xl:py-4 text-white focus:outline-none text-base xl:text-[25px]!`}
          >
            {buttonText}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-left text-red-500 text-sm mt-2 max-w-[254px] md:max-w-[246px] lg:max-w-[404px]">
          {error}
        </p>
      )}
    </>
  );
}

export default PostCodeSearchField;
