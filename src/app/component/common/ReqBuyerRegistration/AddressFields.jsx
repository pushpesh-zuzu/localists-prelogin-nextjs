"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal/Modal";
import InputField from "./UI/InputField";
import { useRouter } from "next/navigation";
import {
  setbuyerRequestData,
  getAddressListFromPostcode,
  setAddressList,
  clearSetbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { clearBuyerRegisterFormData } from "@/lib/store/findjobslice";
import Select from "react-select";


function AddressFields({
  onClose,
  nextStep,
  // setShowConfirmModal,
  progressPercent,
  previousStep
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { buyerStep, buyerRequest, citySerach, addressList, addressLoader } =
    useSelector((state) => state.buyer);
  const [house, setHouse] = useState(buyerRequest?.house || "");
  const [street, setStreet] = useState(buyerRequest?.street || "");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [hasFetchedAddress, setHasFetchedAddress] = useState(false);
  const [errors, setErrors] = useState({ house: "", street: "" });

  // Fetch address list when buyerRequest.postcode is available
  const lastFetchedPostcode = useRef(null);

  useEffect(() => {
    if (buyerRequest.postcode && buyerRequest.postcode !== lastFetchedPostcode.current) {
      lastFetchedPostcode.current = buyerRequest.postcode;
      dispatch(
        getAddressListFromPostcode({ postcode: buyerRequest.postcode }),
      ).then(() => setHasFetchedAddress(true));
    }
  }, [buyerRequest.postcode]);


  useEffect(() => {
    if (!buyerRequest.postcode) {
      setSelectedAddressId("");
      setHouse("");
      setStreet("");
      dispatch(setAddressList([]));
      setHasFetchedAddress(false);
    }
  }, [buyerRequest.postcode, dispatch]);

  // const handleAddressSelect = (e) => {
  //   const index = Number(e.target.value);
  //   setSelectedAddressId(index);

  //   const selected = addressList[index];
  //   if (selected) {
  //     setHouse((selected.house_name || "").trim());
  //     setStreet((selected.street_address || "").trim());
  //     setErrors({ house: "", street: "" });
  //   }
  // };

  const handleSubmit = () => {
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
    nextStep();
  };

  const handleCloseClick = () => {
    onClose();
    dispatch(clearSetbuyerRequestData());
    dispatch(clearBuyerRegisterFormData());
  };

  const isDisabled =
    !(house?.trim() && street?.trim()) && selectedAddressId === "";

  return (
    <Modal
      onClose={handleCloseClick}
      isOpen={true}
      title="We only use your address to match you with local professionals"
      onNext={handleSubmit}
      maxWidth="max-w-[90%] md:max-w-[80%] lg:max-w-[760px]"
      maxHeight="max-h-[90vh]"
      padding="pb-[20px] md:pb-[30px] lg:pb-[30px]"
      disabled={isDisabled}
      buyerStep={buyerStep}
      fixedHeight={true}
      showProgressBar={true}
      titleClassName="text-left"
      buttongroup="lg:mx-[75.4px] md:mx-[63px] mx-[18px]"
      progressPercent={progressPercent}
      marginTop="lg:mt-[10vh] mt-[5vh]"
      onBack={previousStep}
    >
      <div className="mx-auto max-w-[90%] md:max-w-[80%] lg:max-w-[608px]">
        {/* Select Address Dropdown */}
        <label className="text-[20px] leading-[100%] tracking-[-0.03em] font-bold font-[Arial] text-[#253238]">
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
        <InputField
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
        <InputField
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
    </Modal>
  );
}

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "41.6px",
    height: "41.6px",
    borderRadius: "10px",
    borderColor: state.isFocused ? "#00aeef" : "#d1d5db",
    boxShadow: state.isFocused
      ? "0 0 0 2px rgba(0,174,239,0.2)"
      : "none",
    "&:hover": {
      borderColor: "#00aeef",
    },
    cursor: "pointer",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),

  menu: (base) => ({
    ...base,
    zIndex: 9999,
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
    backgroundColor: state.isFocused ? "#f0f9ff" : "#fff",
    color: "#000",
  }),
};

export default AddressFields;
