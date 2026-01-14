"use client";

import { useState, useEffect } from "react";

const ViewYourMatchesLandingNewPPC = ({
  onClose,
  onNext,
  previousStep,
  initialPhoneNumber = "",
  isLoading = false,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialPhoneNumber) {
      setPhoneNumber(formatPhoneNumber(initialPhoneNumber));
    }
  }, [initialPhoneNumber]);

  const formatPhoneNumber = (phone) => {
    // Remove +44 prefix and format
    return phone.replace(/^\+44/, "").replace(/\D/g, "");
  };

  const handleInputChange = (e) => {
    let value = e.target.value;

    // Remove all non-digits
    value = value.replace(/\D/g, "");

    // Remove +44 if starts with 44
    if (value.startsWith("44")) {
      value = value.slice(2);
    }

    // Prevent starting with 0
    if (value.length === 1 && value === "0") {
      return;
    }

    // Max 11 digits
    if (value.length <= 11) {
      setPhoneNumber(value);
    }

    setError(false);
  };

  const handleSubmit = async () => {
    if (phoneNumber.length !== 11) {
      setError(true);
      return;
    }

    const result = await onNext(phoneNumber, consent);
    if (!result.success) {
      console.error(result.message);
    }
  };

  return (
  <FormWrapper
      padding="p-0"
      showButtons={false}
      isOpen={true}
      maxWidth="max-w-[90%] sm:max-w-[500px] mt-[5%]"
      showClosIcon={false}
    >

        {/* Header */}
        <div className="mb-[38px] max-[480px]:mb-5">
          <h2 className="text-center align-middle text-2xl font-bold text-[#253238] max-[768px]:text-xl max-[350px]:text-lg">
            View your matches now!
          </h2>
        </div>

        {/* Info Wrapper */}
        <div>
          {/* Label */}
          <label
            htmlFor="phoneNumber"
            className="mb-[5px] block text-left text-base font-medium text-[#828282] max-[768px]:text-sm"
          >
            Please enter your phone numbers
          </label>

          {/* Phone Input */}
          <div className="flex flex-col items-start">
            <input
              type="text"
              id="phoneNumber"
              placeholder="Phone Number"
              className={`flex w-full min-w-full justify-start border px-3 py-3 text-[#828282] shadow-sm ${
                error ? "border-red-500" : "border-[#ccc]"
              } max-[768px]:px-[10px] max-[768px]:py-[10px] max-[768px]:text-sm max-[480px]:px-[10px] max-[480px]:py-[10px] max-[480px]:text-sm max-[350px]:px-2 max-[350px]:py-2 max-[350px]:text-xs`}
              maxLength={11}
              value={phoneNumber}
              onChange={handleInputChange}
            />

            {error && (
              <span className="mt-[5px] block text-left text-xs text-red-500">
                Please enter a valid 11-digit phone number.
              </span>
            )}
          </div>

          {/* Checkbox */}
          <div className="mb-[49px] mt-[26px] flex items-center gap-[10px] max-[768px]:mb-5 max-[480px]:mb-5 max-[350px]:gap-[3px]">
            <input
              type="checkbox"
              id="consent"
              className="h-6 w-6 border border-[#d9d9d9] p-[10px] shadow-sm max-[768px]:h-5 max-[768px]:w-5"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <label
              htmlFor="consent"
              className="text-sm font-medium text-[#828282] max-[768px]:text-[10px]"
            >
              I'm happy to receive this online or remotely.
            </label>
          </div>

          {/* Buttons */}
          <div className="mb-[47px] flex justify-between gap-[10px] max-[768px]:flex-row max-[480px]:mb-5 max-[768px]:gap-[10px]">
            <button
              className="cursor-pointer rounded border-none bg-black px-[29px] py-2 text-center align-middle text-[15px] font-medium text-white hover:bg-black/80 disabled:opacity-50 max-[768px]:px-5 max-[768px]:py-2 max-[768px]:text-sm max-[480px]:px-[10px] max-[480px]:py-2 max-[480px]:text-sm max-[480px]:font-medium max-[350px]:px-[10px] max-[350px]:py-2 max-[350px]:text-sm max-[350px]:font-medium"
              onClick={previousStep}
              disabled={isLoading}
            >
              Back
            </button>
            <button
              className="cursor-pointer rounded border-none bg-[#00ADD8] px-[29px] py-2 text-center align-middle text-[15px] font-medium text-white hover:bg-[#0096c4] disabled:opacity-50 max-[768px]:px-5 max-[768px]:py-2 max-[768px]:text-sm max-[480px]:px-[10px] max-[480px]:py-2 max-[480px]:text-sm max-[480px]:font-medium max-[350px]:px-[10px] max-[350px]:py-2 max-[350px]:text-sm max-[350px]:font-medium"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
              ) : (
                "View Matches"
              )}
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-left text-[10px] font-medium text-[#666]">
          Localists will provide your information to up to 5 professionals who
          may contact you about your project in accordance with our privacy
          policy. By submitting this form, you consent that such professionals
          may call or text you on the phone number you provided to offer their
          services (these calls may be made using automated phone technology).
          Consent is not a condition of purchasing or receiving any of the
          services.
        </p>
      </FormWrapper>    
  );
};

export default ViewYourMatchesLandingNewPPC;
