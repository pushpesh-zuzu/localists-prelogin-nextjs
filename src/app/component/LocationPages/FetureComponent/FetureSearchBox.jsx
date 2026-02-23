"use client";

import React, { useState, useEffect } from "react";
import SearchIcon from "../../common/icons/HomePageIcons/SearchIcon";
import { CheckIcon, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import {
  getCityName,
  setbuyerRequestData,
  setBuyerStep,
  setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import { setSelectedServiceId } from "@/lib/store/findjobslice";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { useRouter } from "next/navigation";
import BuyerRegistration from "../../common/BuyerRegistration/BuyerRegistration";

export function FetureSearchBox({
  serviceId = 112,
  serviceName = "Tree Surgery",
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [postcode, setPostcode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  /* =========================
     Debounce Validation
  ========================= */
  useEffect(() => {
    if (!postcode.trim() || postcode.length < 3) {
      setIsValid(false);
      setCity("");
      setError("");
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
          dispatch(
            setbuyerRequestData({
              postcode: newResponse?.data?.postcode,
            }),
          );

          setError("");
        } else {
          setIsValid(false);
          setCity("");
          setError("Please enter a valid postcode!");
        }
      } catch {
        setIsValid(false);
        setCity("");
        setError("Please enter a valid postcode!");
      } finally {
        setIsValidating(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [postcode, dispatch]);

  /* =========================
     Input Change
  ========================= */
  const handleChange = (e) => {
    const value = e.target.value.trim().toUpperCase().slice(0, 10);
    setPostcode(value);
    setError("");
  };

  /* =========================
     Submit
  ========================= */
  const handleSubmit = () => {
    const canContinue = checkAuthenticatedUser(router);
    if (!canContinue) return;

    if (!postcode.trim() || !isValid) {
      setError("Please enter a valid postcode!");
      return;
    }

    if (!serviceId) {
      setError("Coming soon!");
      return;
    }

    setShow(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const handleClose = () => {
    setShow(false);
    setPostcode("");
  };

  /* =========================
     Pending Modal Restore
  ========================= */
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
      <div className="md:max-w-[210px] md:ml-auto max-[768px]:flex max-[768px]:flex-row max-[768px]:justify-between">
        {/* TEXT */}
        <div>
          <p
            style={{
              textShadow: "0px 4px 4px rgba(0,0,0,0.1)",
            }}
            className="font-black text-[15px] leading-[15px] md:text-[20px] md:leading-[20px] tracking-[-0.03em] text-[#00AFE3]"
          >
            Find Roofers
          </p>

          {/* Near you. */}
          <p
            className="font-black text-[15px] leading-[15px] md:text-[20px] md:leading-[20px] tracking-[-0.03em] text-[#253238]"
            style={{
              textShadow: "0px 4px 4px rgba(0,0,0,0.1)",
            }}
          >
            Near you.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="relative md:mt-4 max-w-[50%] md:max-w-full md:w-[200px] flex items-center rounded-full bg-white px-4 py-2 shadow-[0px_11.93px_19.89px_0px_#29292980]">
          <input
            value={postcode}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            placeholder="Enter Postcode"
            autoComplete="off"
            className="flex-1 text-sm max-w-[80%] text-[#253238] outline-none placeholder:text-gray-400"
          />

          {/* Validation Icons */}
          <div className="absolute right-4 top-[35%]">
            {isValidating ? (
              <Loader2 className="absolute top-[35%] right-5 w-4 h-4 animate-spin text-gray-400" />
            ) : isValid ? (
              <CheckIcon className="absolute top-[35%] right-5 w-4 h-4 text-white bg-green-500 rounded-full" />
            ) : (
              ""
            )}
          </div>

          {/* <SearchIcon
                  onClick={handleSubmit}
                  className="h-4 w-4 cursor-pointer"
                /> */}
          <SearchIcon
            onClick={handleSubmit}
            className="cursor-pointer h-4 w-4 absolute top-[35%] right-4"
          />
        </div>

        {/* ERROR */}
        {error && <p className="absolute text-red-500 text-xs mt-1">{error}</p>}
      </div>

      {/* MODAL */}
      {show && (
        <BuyerRegistration
          closeModal={handleClose}
          service_Id={serviceId}
          postcode={postcode}
          serviceName={serviceName}
          service_Name={serviceName}
        />
      )}
    </>
  );
}
