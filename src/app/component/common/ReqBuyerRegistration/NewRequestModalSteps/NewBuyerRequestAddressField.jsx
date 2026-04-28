"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  setbuyerRequestData,
  getAddressListFromPostcode,
  setAddressList,
  clearSetbuyerRequestData,
  registerQuoteCustomer
} from "@/lib/store/buyerslice/buyerSlice";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import Select from "react-select";
import { getBarkToken } from "@/utils/CookiesHelper";
import useUserInfo from "@/utils/getUserIp";
import { extractAllParams } from "@/utils/decodeURLParams";
import { useSearchParams } from "next/navigation";
import RequestBuyerModal from "../Modal/RequestBuyerModal";
import RequestInputField from "../UI/RequestInputField";
// import RequestBuyerModal from "./Modal/RequestBuyerModal";
// import RequestInputField from "./UI/RequestInputField";


function NewBuyerRequestAddressField({
  onClose,
  nextStep,
  setShowConfirmModal,
  progressPercent,
  previousStep,
  serviceId,
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { buyerStep, buyerRequest, citySerach, addressList, addressLoader } =
    useSelector((state) => state.buyer);
  const [house, setHouse] = useState(buyerRequest?.house || "");
  const [street, setStreet] = useState(buyerRequest?.street || "");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [hasFetchedAddress, setHasFetchedAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({ house: "", street: "" });

  // Fetch address list when buyerRequest.postcode is available
  const lastFetchedPostcode = useRef(null);

  const { ip, url } = useUserInfo();

  const { search } = useSearchParams();

  const allParams =
    typeof window !== "undefined" &&
    extractAllParams(search || window.location.search);
  const campaignid = allParams.campaign_id || "";
  const keyword = allParams.keyword || "";
  const gclid = allParams.gclid || "";
  const msclkid = allParams.msclkid || "";
  const adgroup_id = allParams.adgroup_id;
  const platform_source = allParams.source || "";
  const campaign = allParams.campaign || "";
  const adgroup = allParams.adgroup || "";
  const matchtype = allParams.matchtype || "";
  const device = allParams.device || "";
  const loc_physical_ms = allParams.loc_physical_ms || "";
  const utm_search_term = allParams.utm_search_term || "";

  useEffect(() => {
    if (buyerRequest.postcode && buyerRequest.postcode !== lastFetchedPostcode.current) {
      lastFetchedPostcode.current = buyerRequest.postcode;
      dispatch(
        getAddressListFromPostcode({ postcode: buyerRequest.postcode }),
      ).then(() => setHasFetchedAddress(true));
    }
  }, [buyerRequest.postcode, dispatch]);


  useEffect(() => {
    if (!buyerRequest.postcode) {
      const timer = setTimeout(() => {
        setSelectedAddressId("");
        setHouse("");
        setStreet("");
        setHasFetchedAddress(false);
      }, 0);

      dispatch(setAddressList([]));
      return () => clearTimeout(timer);
    }
  }, [buyerRequest.postcode, dispatch]);

  useEffect(() => {
    let nextSelectedAddressId = "";

    if (addressList.length === 0) {
      nextSelectedAddressId = "";
    } else if (buyerRequest?.address) {
      const selectedIndex = addressList.findIndex((addr) => {
        const addressLabel = `${addr.house_name || ""}, ${addr.street_address || ""}`;
        return addressLabel === buyerRequest.address;
      });

      if (selectedIndex >= 0) {
        nextSelectedAddressId = selectedIndex;
      }
    }

    const timer = setTimeout(() => {
      setSelectedAddressId(nextSelectedAddressId);
    }, 0);

    return () => clearTimeout(timer);
  }, [addressList, buyerRequest?.address]);

  const handleSubmit = () => {
    if (isSubmitting) return;

    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    // Resolve final house/street values
    let houseValue = house;
    let streetValue = street;

    if (selectedAddressId !== "" && (!houseValue || !streetValue)) {
      const selected = addressList[selectedAddressId];
      if (selected) {
        houseValue = selected.house_name || "";
        streetValue = selected.street_address || "";
      }
    }
    // Validate
    const newErrors = { house: "", street: "" };
    if (!houseValue?.trim()) newErrors.house = "House name is required!";
    if (!streetValue?.trim()) newErrors.street = "Street address is required!";
    setErrors(newErrors);
    if (newErrors.house || newErrors.street) return;

    // Save to Redux and go next
    dispatch(
      setbuyerRequestData({
        house: houseValue,
        street: streetValue,
        address: `${houseValue}, ${streetValue}`,
      }),
    );

    const formData = new FormData();
    formData.append("name", buyerRequest?.name);
    formData.append("email", buyerRequest?.email);
    formData.append("phone", buyerRequest?.phone);
    formData.append("questions", buyerRequest?.questions ? JSON.stringify(buyerRequest.questions) : "");
    formData.append("service_id", buyerRequest?.service_id || serviceId || "");
    formData?.append("city", citySerach);
    formData.append("postcode", buyerRequest?.postcode);
    formData.append("form_status", "1");
    formData.append("campaignid", campaignid || "");
    formData.append("gclid", gclid || "");
    formData.append("campaign", campaign || "");
    formData.append("adgroup", adgroup || "");
    formData.append("msclickid", msclkid || "");
    formData.append("adgroup_id", adgroup_id || "");
    formData.append("matchtype", matchtype || "");
    formData.append("device", device || "");
    formData.append("loc_physical_ms", loc_physical_ms || "");
    formData.append("utm_search_term", utm_search_term || "");
    formData.append("platform_source", platform_source);
    formData.append("keyword", keyword || "");

    formData.append("entry_url", url);
    formData.append("user_ip_address", ip);

    setIsSubmitting(true);
    dispatch(registerQuoteCustomer(formData))
      .then((result) => {
        if (result) {
          nextStep();
        }
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handleCloseClick = () => {
    if (typeof previousStep === "function") {
      if (!getBarkToken()) {
        setShowConfirmModal?.(true);
        return;
      }
    }

    onClose();
    dispatch(clearSetbuyerRequestData());
    dispatch(clearBuyerRegisterFormData());
  };

  const isDisabled =
    isSubmitting || (!(house?.trim() && street?.trim()) && selectedAddressId === "");

  return (
    <RequestBuyerModal
      onClose={handleCloseClick}
      isOpen={true}
      title="We only use your address to match you with local professionals"
      onNext={handleSubmit}
      disabled={isDisabled}
      buyerStep={buyerStep}
      fixedHeight={true}
      showProgressBar={true}
      titleClassName="text-left"
      progressPercent={progressPercent}
      marginTop="lg:mt-[10vh] mt-[5vh]"
      onBack={typeof previousStep === "function"
        ? () => {
          dispatch(
            setbuyerRequestData({
              house: "",
              street: "",
              address: "",
            })
          );
          previousStep();
        }
        : null} >
      <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
        {/* Select Address Dropdown */}
        <label className="block text-[20px] font-bold mb-[10px] font-[Arial] text-[#253238]">
        Select an address
      </label>

        <Select
          options={addressList.map((addr, index) => ({
            value: index,
            label: `${addr.house_name || ""}, ${addr.street_address || ""}`,
          }))}

          value={
            selectedAddressId !== ""
              ? {
                value: selectedAddressId,
                label: `${addressList[selectedAddressId]?.house_name || ""}, ${addressList[selectedAddressId]?.street_address || ""
                  }`,
              }
              : null
          }

          onChange={(option) => {
            const index = option.value;
            setSelectedAddressId(index);

            const selected = addressList[index];

            if (selected) {
              const houseValue = (selected.house_name || "").trim();
              const streetValue = (selected.street_address || "").trim();

              setHouse(houseValue);
              setStreet(streetValue);

              setErrors((prev) => ({
                ...prev,
                house: "",
                street: "",
              }));
            }
          }}
          className="mb-5"
          placeholder="Please select..."
          isSearchable={false}
          isDisabled={addressList.length === 0}
          menuPlacement="bottom"
          menuPosition="fixed"
          menuPortalTarget={typeof window !== "undefined" ? document.body : null}
          menuShouldScrollIntoView={false}
          styles={selectStyles}
        />

        {!addressLoader && addressList.length === 0 && !(house && street) && (
          <p className="text-sm text-orange-700 mt-1 mb-3">
            No address found. Please enter below.
          </p>
        )}

        {/* House / Building Name */}
        <RequestInputField
          label="Building or House Number / Name"
          value={house}
          placeholder="e.g. 221B or Rose Villa"
          onChange={(e) => {
            setHouse(e.target.value);
            setSelectedAddressId("");
            setErrors((prev) => ({ ...prev, house: "" }));
          }}
          error={errors.house}
          labelClass="text-base text-[20px] mb-3 md:mt-6 mt-3"
        />

        {/* Street Address */}
        <RequestInputField
          label="Street Address"
          value={street}
          placeholder="e.g. Baker Street"
          onChange={(e) => {
            setStreet(e.target.value);
            setSelectedAddressId("");
            setErrors((prev) => ({ ...prev, street: "" }));
          }}
          error={errors.street}
        />
      </div>
    </RequestBuyerModal>
  );
}

const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: state.isFocused
      ? "2px solid #00AFE3"
      : "2px solid #92999C4D",
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

export default NewBuyerRequestAddressField;
