"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../Modal";
import InputField from "../../UI/Inputs/InputField";
import Paragraph from "../../UI/Typography/Paragraph";
import { clearSetbuyerRequestData, createRequestData } from "@/lib/store/buyerslice/buyerSlice";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import { formatUKPhoneNumber, validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { getBarkUserData } from "@/utils/CookiesHelper";
import { showToast } from "@/utils/toaster";
import LoaderIndicator from "../Loader/LoaderIndicatore";

const ViewYourMatches = ({
  onClose,
  nextStep,
  previousStep,
  setShowConfirmModal,
}) => {
  const dispatch = useDispatch();
  
  const {
    buyerRequest,
    requestLoader,
    citySerach,
    requestDataList,
    createRequestToken,
  } = useSelector((state) => state.buyer);
  
  // const { userToken } = useSelector((state) => state.auth);
const userToken = getBarkUserData()
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (requestDataList?.phone) {
      setPhoneNumber(formatUKPhoneNumber(requestDataList?.phone));
    } else if (userToken?.phone) {
      setPhoneNumber(formatUKPhoneNumber(userToken?.phone));
    }
  }, [requestDataList?.phone, userToken?.phone]);

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, "");

    if (value.startsWith("44")) {
      value = value.slice(2);
    }

    // Prevent starting with 0
    if (value.length === 1 && value === "0") {
      showToast("error", "Please enter phone number without '0'.");
      return;
    }

    // Max 10 digits
    if (value.length <= 10) {
      setPhoneNumber(value);
    }

    setError("");
  };

  const handleSubmit = () => {
    // Validate phone number length (11 digits)
    if (phoneNumber.length !== 11) {
      setError("Please enter a valid 11-digit phone number.");
      return;
    }

    // Validate UK phone number format
    if (!validateUKPhoneNumber(phoneNumber)) {
      return;
    }

    // Create FormData
    const formData = new FormData();
    formData.append("service_id", buyerRequest?.service_id);
    formData.append("postcode", buyerRequest?.postcode);
    formData.append("city", citySerach);
    formData.append("questions", JSON.stringify(buyerRequest?.questions));
    formData.append("phone", phoneNumber);
    formData.append("recevive_online", consent ? 1 : 0);
    formData.append("form_status", 1);

    // Dispatch createRequestData action
    dispatch(createRequestData(formData)).then((result) => {
      if (result?.success) {
        showToast("success", result?.message);
        nextStep();
      }
    });
  };

  const handleCloseClick = () => {
    onClose();
    dispatch(clearSetbuyerRequestData());
    dispatch(clearBuyerRegisterFormData());
  };


  return (
    <Modal
      onClose={handleCloseClick}
      isOpen={true}
      title="View your matches now!"
      onNext={handleSubmit}
      onBack={previousStep}
      nextButtonText={requestLoader ? <LoaderIndicator size="small" /> : "View Matches"}
      BackButtonText="Back"
      maxWidth="w-[90%] sm:max-w-[600px] mx-2"
      maxHeight="max-h-[80vh] lg:max-h-[90vh]"
      padding="px-3 py-4 md:px-7.5 md:pt-3 pb-6"
      showClosIcon={!requestLoader}
    >
      {/* Phone Input Field */}
      <InputField
        label="Please enter your phone numbers"
        type="text"
        value={phoneNumber}
        onChange={handlePhoneChange}
        error={error}
        placeholder="Phone Number"
        maxLength={14}
        disabled={requestLoader}
      />

      {/* Checkbox Section */}
      <div className="flex items-center gap-[10px] mt-4 max-[350px]:gap-[3px]">
        <input
          type="checkbox"
          id="consent"
          className="h-6 w-6 border border-[#d9d9d9] shadow-sm max-[768px]:h-5 max-[768px]:w-5 cursor-pointer"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          disabled={requestLoader}
        />
        <label
          htmlFor="consent"
          className="text-sm font-medium text-[#828282] max-[768px]:text-[10px] cursor-pointer"
        >
          I'm happy to receive this online or remotely.
        </label>
      </div>

      {/* Disclaimer */}
      <Paragraph variant="medium" className="text-left text-[10px] font-medium text-[#666] mt-4">
        Localists will provide your information to up to 5 professionals who may
        contact you about your project in accordance with our privacy policy. By
        submitting this form, you consent that such professionals may call or
        text you on the phone number you provided to offer their services (these
        calls may be made using automated phone technology). Consent is not a
        condition of purchasing or receiving any of the services.
      </Paragraph>
    </Modal>
  );
};

export default ViewYourMatches;