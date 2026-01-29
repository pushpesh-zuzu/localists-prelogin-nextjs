"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
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
  //  const [selectedServiceId, setSelectedServiceId] = useState({
  //     id: null,
  //     name: "",
  //   });
  usePendingBuyerRedirect()
  const [selectedService, setSelectedService] = useState('')
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

  return (
    <>
      <div className="relative max-w-[254px] md:max-w-[246px]  lg:max-w-[404px]">
        <input
          type="text"
          placeholder="Search for a service"
          id="search Attribute"
          className="text-[#B3B3B3] font-bold px-4 py-2.5  shadow-[0px_20px_40px_0px_rgba(0,0,0,0.5)] md:px-6 md:py-2.5 xl:px-[43px] xl:py-4 mt-5 md:mt-6 xl:mt-[46px] text-base xl:text-[20px]! placeholder:text-base xl:placeholder:text-[20px]! bg-white border-[1.5px] border-gray-300 rounded-[100px] w-full focus:outline-none"
          aria-label="Search for a service"
          value={searchQuery || ""}
          onChange={(e) => {
            const search = e.target.value;
            setSearchQuery(search);
            if (search.trim() !== "") {
              dispatch(searchService({ search }));
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
          className="absolute inset-y-0 top-0 xl:-top-4 right-[19px] xl:right-10 flex items-center "
        >
          <SearchIcon className="cursor-pointer w-6 h-6 md:w-5 md:h-5 lg:w-8 lg:h-8 mt-5 xl:mt-16" />
        </div>
      </div>
      {show && (
        <BuyerRegistration
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
