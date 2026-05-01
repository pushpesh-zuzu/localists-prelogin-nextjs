"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import CheckVerifiedIcon from "../../common/icons/LandingPPCIcon/CheckVerifiedIcon";
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
import { CheckIcon } from "lucide-react";
import NewMultiPPCCardLayoutWrapper from "../../common/MultiStepFormPPC/NewMultiStepFormDesingPPC/NewMultiPPCCardLayoutWrapper";
import RequestInputField from "../../common/ReqBuyerRegistration/UI/RequestInputField";


const NewPostcodeSearchRoofing = ({
  onNext,
  title = "What is your postcode",
  prevStep,
  setPercetangForPost,
  titleHeading = "landscaping specialists",
  progressPercentage
}) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { buyerRequest, citySerach, addressList, addressLoader } = useSelector((state) => state.buyer);
  const [pincode, setPincode] = useState(buyerRequest?.postal_code || "");
  const [city, setCity] = useState(citySerach || "");
  const [postalCodeValidate, setPostalCodeValidate] = useState(
    !!buyerRequest?.postal_code,
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

  const showToast = (type, content) => message[type](content);

  const normalizePostcode = (postcode) => {
    return postcode.replace(/\s+/g, "").toUpperCase();
  };

  const isValidUKPostcode = (postcode) => {
    const regex = /^([A-Z]{1,2}\d[A-Z\d]?)(\s?\d[A-Z]{2})$/i;
    return regex.test(postcode.trim());
  };

  const isFullPostcode = (postcode) => {
    const cleaned = normalizePostcode(postcode);
    return cleaned.length >= 5 && cleaned.length <= 7;
  };

  const handlePincodeChange = async (e) => {
    const value = e.target.value.toUpperCase().slice(0, 10);
    setPincode(value);
    setPostalCodeValidate(false);

    const cleaned = normalizePostcode(value);


    if (!value.trim()) {
      setError("");
      setCity("");
      setSelectedAddress(null);
      setHouse("");
      setStreet("");
      setFieldErrors({
        house: "",
        street: "",
      });
      dispatch(
        setbuyerRequestData({
          postal_code: "",
          house: "",
          street: "",
          address: "",
        })
      );
      setPostalCodeValidate(false);
      return;
    }

    // if (value.length < 3) {
    //   setPostalCodeValidate(false);
    //   return;
    // }

    // Partial → no API
    if (!isFullPostcode(cleaned)) {
      setCity("");
      setPostalCodeValidate(false);
      return;
    }

    // Full but invalid
    if (!isValidUKPostcode(value)) {
      setPostalCodeValidate(false);
      setError("Please enter a valid postcode!");
      return;
    }

    setIsCheckingPostcode(true);

    try {
      const response = await dispatch(getCityName({ postcode: cleaned }));
      const newResponse = response?.unwrap ? await response.unwrap() : response;

      if (newResponse?.data?.valid) {
        const validPostcode = newResponse.data.postcode;
        setPostalCodeValidate(true);
        setCity(newResponse.data.city);
        dispatch(setcitySerach(newResponse.data.city));
        dispatch(setbuyerRequestData({ postal_code: validPostcode }));
        dispatch(getAddressListFromPostcode({ postcode: cleaned }));
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

    if (onNext) {
      onNext();
      setPercetangForPost(5);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleNext();
  };

  const handleBack = () => {
    prevStep();
  };

  const addressOptions = addressList.map((addr, index) => ({
    value: index,
    label: `${addr.house_name}, ${addr.street_address}`,
  }));

  useEffect(() => {
    if (!postalCodeValidate || addressList.length === 0) {
      return;
    }

    if (!buyerRequest?.address) {
      setSelectedAddress(null);
      return;
    }

    const selectedIndex = addressList.findIndex((addr) => {
      const addressLabel = `${addr.house_name || ""}, ${addr.street_address || ""}`;
      return addressLabel === buyerRequest.address;
    });

    if (selectedIndex >= 0) {
      setSelectedAddress({
        value: selectedIndex,
        label: `${addressList[selectedIndex].house_name}, ${addressList[selectedIndex].street_address}`,
      });
      return;
    }

    setSelectedAddress(null);
  }, [addressList, buyerRequest?.address, postalCodeValidate]);

  return (
    <div style={{ maxWidth: "592px", margin: "auto" }}>
      <NewMultiPPCCardLayoutWrapper
        title={`Get quotes from verified ${titleHeading} you can trust`}
        onButtonClick={handleNext}
        buttonText="Next"
        disableNextButton={
          !postalCodeValidate || !house?.trim() || !street?.trim()
        }
        showBackButton
        onBackClick={handleBack}
        titlePrimary={true}
        progressPercentage={progressPercentage}
        subtitle={
          "We only use your address to match you with local professionals"
        }
      >
        <div className="relative w-full">
          <RequestInputField
            error={error}
            label="Postcode"
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="Enter Postcode (No Spaces)"
          />

          {isCheckingPostcode ? (
            <div className="absolute right-3 top-[70%] -translate-y-1/2">
              <LoaderIndicator size="small" />
            </div>
          ) : postalCodeValidate ? (
            <div className="absolute right-3 top-[70%] -translate-y-1/2">
              <CheckIcon className="w-5 text-white h-5 bg-green-500 rounded-full" />
            </div>
          ) : null}
        </div>

        {postalCodeValidate && (
          <div className="text-start">
            <label className="block text-left text-base md:text-[20px] font-bold leading-[100%] tracking-[-0.03em] font-[Arial] text-[#253238] mb-[10px]">
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
                    }),
                  );
                }
              }}
              placeholder="Please select..."
              isSearchable={false}
              styles={selectStyles}
              menuPlacement="auto"
              menuPosition="fixed"
            />

            {!addressLoader && addressList.length === 0 && (
              <p className="text-sm text-orange-700 mt-1">
                No address found? Please enter below
              </p>
            )}
          </div>
        )}

        <div className="text-start">
          <RequestInputField
            error={fieldErrors.house}
            className="mt-5"
            value={house}
            label={"Building or House Number / Name"}
            onChange={(e) => {
              const value = e.target.value;
              setHouse(value);
              setSelectedAddress(null);
              setFieldErrors((prev) => ({ ...prev, house: "" }));
              if (!value.trim()) {
                dispatch(
                  setbuyerRequestData({
                    house: "",
                    street: "",
                    address: "",
                  }),
                );
              }
            }}
            placeholder="e.g. 221B or Rose Villa"
          />
        </div>

        <div className="text-start">
          <RequestInputField
            error={fieldErrors.street}
            label="Street Address"
            value={street}
            onChange={(e) => {
              const value = e.target.value;
              setStreet(value);
              setSelectedAddress(null);
              setFieldErrors((prev) => ({ ...prev, street: "" }));
              if (!value.trim()) {
                dispatch(
                  setbuyerRequestData({
                    house: "",
                    street: "",
                    address: "",
                  }),
                );
              }
            }}
            placeholder="e.g. Baker Street or Park Lane"
          />
        </div>
      </NewMultiPPCCardLayoutWrapper>
    </div>
  );
};

export default NewPostcodeSearchRoofing;

const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: state.isFocused ? "2px solid #00AFE3" : "2px solid #92999C4D",
    borderRadius: 0,
    boxShadow: "none",
    minHeight: "auto",
    height: "auto",
    paddingTop: "14px",
    paddingBottom: "13px",
    paddingLeft: 0,
    paddingRight: 0,
    cursor: "pointer",
    transition: "border-color 0.2s ease",
    "&:hover": {
      borderBottom: "2px solid #00AFE3",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),

  input: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Arial",
    color: "#253238",
  }),

  singleValue: (base) => ({
    ...base,
    fontSize: "16px",
    fontWeight: "bold",
    fontFamily: "Arial",
    color: "#253238",
    margin: 0,
  }),

  placeholder: (base) => ({
    ...base,
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: "Arial",
    color: "#C5C7C8",
    margin: 0,
  }),

  indicatorsContainer: (base) => ({
    ...base,
    padding: 0,
  }),

  dropdownIndicator: (base) => ({
    ...base,
    padding: "0 4px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),

  menu: (base) => ({
    ...base,
    zIndex: 9999,
    borderRadius: "8px",
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "250px",
    overflowY: "auto",
    paddingBottom: "8px",
  }),

  option: (base, state) => ({
    ...base,
    cursor: "pointer",
    fontSize: "16px",
    fontFamily: "Arial",
    backgroundColor: state.isFocused ? "#f5f5f5" : "#fff", // no blue
    color: "#253238",
  }),
};
