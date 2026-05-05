"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "../../common/icons/HomePageIcons/SearchIcon";
import { searchService } from "@/lib/store/searchSlice";
import {
  setbuyerRequestData,
  setBuyerStep,
  setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import { setSelectedServiceId } from "@/lib/store/findjobslice";
import { showToast } from "@/utils/toaster";
import usePendingBuyerRedirect from "@/hooks/usePendingBuyerRedirect";
import NewBuyerRegistrationForm from "../../common/BuyerRegistration/NewBuyerRegistrationDesign/NewBuyerRegistrationForm";
const SearchResults = dynamic(() => import("../../common/SearchResult"), {
  ssr: false,
  loading: () => <div className="hidden">Loading...</div>,
});
const BuyerRegistration = dynamic(
  () => import("../../common/BuyerRegistration/BuyerRegistration"),
  {
    ssr: false,
    loading: () => <div className="hidden">Loading...</div>,
  },
);
function HeroSectionSearch() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  usePendingBuyerRedirect();
  const [selectedService, setSelectedService] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
  };
  const { selectedSearchService } = useSelector((state) => state.search);

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

  const handleSubmit = () => {
    if (!selectedService) {
      showToast("error", "Please select a service from the suggestions.");
      return;
    }
    setShow(true);
    setSearchQuery("");
    setSelectedService("");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Auto resize function
  const autoResize = (el) => {
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  useEffect(() => {
  if (inputRef.current) {
    autoResize(inputRef.current);
  }
}, [searchQuery]);

  return (
    <>
      <div className="relative max-w-full md:max-w-[350px]  lg:max-w-[404px]">
        <textarea
          ref={inputRef}
          placeholder="Search for a service"
          id="search Attribute"
          rows={1} // default 1 row
          className="text-[#B3B3B3] font-bold pl-4 pr-12 py-3.5 shadow-[0px_20px_40px_0px_rgba(0,0,0,0.5)] md:pl-6 md:pr-12 md:py-3.5 lg:pl-[43px] lg:pr-[72px] lg:py-[20px] mt-7.5 md:mt-6 xl:mt-[46px] text-base xl:text-[18px]! placeholder:text-base xl:placeholder:text-[18px]! bg-white rounded-[100px] w-full focus:outline-none resize-none overflow-hidden leading-snug"
          aria-label="Search for a service"
          value={searchQuery || ""}
          onChange={(e) => {
            const search = e.target.value;
            autoResize(e.target); // har change par resize
            setSearchQuery(search);
            if (search.trim() !== "") {
              dispatch(searchService({ search }));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />
        {searchQuery.length ? (
          <SearchResults
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setShow={setShow}
            setSelectedService={setSelectedService}
          />
        ) : (
          ""
        )}
        <div
          onClick={() => {
            handleSubmit();
          }}
          className="absolute inset-y-0 top-3 md:top-0 xl:-top-6 right-[19px] xl:right-10 flex items-center "
        >
          <SearchIcon className="cursor-pointer w-6 h-6 md:w-5 md:h-5 lg:w-8 lg:h-8 mt-3 md:mt-4 xl:mt-16" />
        </div>
      </div>
      {/* {show && (
        <BuyerRegistration
          closeModal={handleClose}
          service_Id={selectedSearchService?.id}
          serviceName={selectedSearchService?.service || ""}
          service_Name={selectedSearchService?.service || ""}
          // postcode={pincode}
          // postalCodeValidate={postalCodeValidate}
        />
      )} */}

      {show && (
        <NewBuyerRegistrationForm
          closeModal={handleClose}
          service_Id={selectedSearchService?.id}
          serviceName={selectedSearchService?.service || ""}
          service_Name={selectedSearchService?.service || ""}
          // postcode={pincode}
          // postalCodeValidate={postalCodeValidate}
        />
      )}
    </>
  );
}

export default HeroSectionSearch;
