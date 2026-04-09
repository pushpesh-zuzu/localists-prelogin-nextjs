"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckVerifiedIcon from "../../common/icons/LandingPPCIcon/CheckVerifiedIcon";
import {
  getAddressListFromPostcode,
  getCityName,
  setbuyerRequestData,
  setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import CardLayoutWrapper from "../../common/MultiStepFormPPC/CardLayoutWrappper";
import LocationMapIcon from "../../common/icons/SellerRegistration/LocationMapIcon";
import LoaderIndicator from "../../common/Loader/LoaderIndicatore";
import Select from "react-select";


const PostcodeSearchLandscapingMultiform = ({
  onNext,
  title = "What is your postcode",
  prevStep,
  getProgressPercentage,
  setBackButtonTriggered,
  returPercentage,
  titleHeading = "landscapers"
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { buyerRequest, citySerach, addressList, addressLoader } = useSelector((state) => state.buyer);
  const [pincode, setPincode] = useState(buyerRequest?.postal_code || "");
  const [city, setCity] = useState(citySerach || "");
  const [postalCodeValidate, setPostalCodeValidate] = useState(
    !!buyerRequest?.postal_code
  );
  const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [house, setHouse] = useState(buyerRequest?.house || "");
  const [street, setStreet] = useState(buyerRequest?.street || "");

  const [error, setError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    house: "",
    street: "",
  });

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
        dispatch(getAddressListFromPostcode({ postcode: value }));
        setError("");
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

  const handleNext = () => {
    let errors = {};

    if (!postalCodeValidate) {
      showToast("error", "Please enter a valid postcode.");
      return;
    }

    if (!house?.trim()) {
      errors.house = "House name is required";
    }

    if (!street?.trim()) {
      errors.street = "Street address is required";
    }

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) return;

    // Save to Redux and go next
    dispatch(
      setbuyerRequestData({
        house: house,
        street: street,
        address: `${house}, ${street}`,
      }),
    );

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

  const addressOptions = addressList.map((addr, index) => ({
    value: index,
    label: `${addr.house_name}, ${addr.street_address}`,
  }));

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
          disableNextButton={!postalCodeValidate || !house?.trim() || !street?.trim()}
          showBackButton
          onBackClick={handleBack}
          titlePrimary={true}
        >
          <p className="bg-[#e9f8ff] max-w-fit font-normal rounded-md text-base py-1 px-2.5 mx-auto mb-6">
            {/* This is to match you with the closest verified specialists */}
            We only use your address to match you with local professionals
          </p>
          <label className="block mt-3 mb-2 text-start font-bold text-md text-[#253238]">
            Postcode
          </label>
          <div className="relative w-full">
            <input
              className={`w-full border border-[#e1e5e9] rounded-lg px-10 pr-10 py-3 text-base font-medium text-gray-800 transition-all duration-300 focus:outline-none focus:border-[#0096c4] focus:ring-3 focus:ring-[#0096c4]/10 ${error ? "border-red-500" : ""
                }`}
              placeholder="Enter Postcode (No Spaces)"
              ref={inputRef}
              value={pincode}
              onChange={handlePincodeChange}
              onKeyPress={handleKeyPress}
            />
            <div className="absolute left-3 top-[25px] -translate-y-1/2">
              <LocationMapIcon background="#00afe3" className="h-3.5 w-3.5" />
            </div>
            {isCheckingPostcode ? (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <LoaderIndicator size="small" />
              </div>
            ) : postalCodeValidate ? (
              <div className="h-4 w-4">
                <CheckVerifiedIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5" />
              </div>
            ) : null}
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-1 text-left">{error}</p>
          )}

          <div className="text-start">
            <label className="block mt-3 mb-2 font-bold text-md text-[#253238]">
              Select an address
            </label>
            <Select
              options={addressOptions}
              value={selectedAddress}
              onChange={(option) => {
                setSelectedAddress(option);

                const selected = addressList[option.value];

                if (selected) {
                  const houseVal = selected.house_name || "";
                  const streetVal = selected.street_address || "";

                  setHouse(houseVal);
                  setStreet(streetVal);

                  dispatch(
                    setbuyerRequestData({
                      house: houseVal,
                      street: streetVal,
                      address: `${houseVal}, ${streetVal}`,
                    })
                  );

                  if (onNext) {
                    onNext();
                    getProgressPercentage(remainingProgressPerStep - 5);
                  }
                }
              }}
              placeholder="Please select..."
              isSearchable={false}
              styles={selectStyles}
              menuPlacement="auto"
              menuPosition="fixed"
            />

            {!addressLoader && addressList.length === 0 && postalCodeValidate && (
              <p className="text-sm text-orange-700 mt-1">
                No address found? Please enter below
              </p>
            )}
          </div>

          <div className="text-start">
            <label className="block mt-3 mb-1 font-bold text-md">
              Building or House Number / Name
            </label>

            <input
              value={house}
              onChange={(e) => {
                setHouse(e.target.value);
                setSelectedAddress(null);
                setFieldErrors((prev) => ({ ...prev, house: "" }));
              }}
              className={`w-full border border-[#e1e5e9] rounded-lg px-4 py-3 text-base
  transition-all duration-300
  focus:outline-none focus:border-[#0096c4]
  focus:ring-3 focus:ring-[#0096c4]/10`}
              placeholder="e.g. 221B or Rose Villa"
            />
            {fieldErrors.house && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.house}</p>
            )}
          </div>

          <div className="text-start">
            <label className="block mt-3 mb-1 font-bold text-md">
              Building or House Number / Name
            </label>

            <input
              value={street}
              onChange={(e) => {
                setStreet(e.target.value);
                setSelectedAddress(null);
                setFieldErrors((prev) => ({ ...prev, street: "" }));
              }}
              className={`w-full border border-[#e1e5e9] rounded-lg px-4 py-3 text-base
  transition-all duration-300
  focus:outline-none focus:border-[#0096c4]
  focus:ring-3 focus:ring-[#0096c4]/10`}
              placeholder="e.g. 221B or Rose Villa"
            />
            {fieldErrors.street && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.street}</p>
            )}
          </div>

        </CardLayoutWrapper>
      </div>
    </div>
  );
};

export default PostcodeSearchLandscapingMultiform;

const selectStyles = {
  control: (base, state) => ({
    ...base,
    height: "49.5px",
    minHeight: "49.5px",
    borderRadius: "8px",
    borderColor: state.isFocused ? "#0096c4" : "#e1e5e9",
    boxShadow: state.isFocused
      ? "0 0 0 3px rgba(0,150,196,0.1)"
      : "none",
    cursor: "pointer",
    "&:hover": {
      borderColor: "#0096c4",
    },
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999, //
  }),

  menu: (base) => ({
    ...base,
    maxHeight: "250px",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "250px",
    overflowY: "auto",
  }),

  option: (base, state) => ({
    ...base,
    cursor: "pointer",
  }),
};
