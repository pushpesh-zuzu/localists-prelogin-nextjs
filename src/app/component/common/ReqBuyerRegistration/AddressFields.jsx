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

        <select
          value={selectedAddressId}
          onChange={(e) => {
            const index = Number(e.target.value);
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
          disabled={addressList.length === 0}
          style={{ boxShadow: "0 0 2px .5px #0000001a" }}
          className={`px-3 py-2.5 max-h-[41.6px] rounded-[10px]
            text-gray-900 text-base border border-[#ccc]
            transition-all duration-200 placeholder:text-[#959595]
            focus:outline-1 focus:ring-1 disabled:bg-gray-100
            custom-placeholder bg-white w-full max-w-full p-2
            overflow-hidden text-ellipsis whitespace-nowrap md:mt-3 mt-2
            ${selectedAddressId !== "" ? "text-black" : "text-[#959595]"}
          `}
        >
          <option value="" disabled hidden>
            Please select...
          </option>
          {addressList.map((addr, index) => (
            <option key={index} value={index}>
              {`${addr.house_name || ""}, ${addr.street_address?.slice(0, 40)}...`}
            </option>
          ))}
        </select>

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

export default AddressFields;
