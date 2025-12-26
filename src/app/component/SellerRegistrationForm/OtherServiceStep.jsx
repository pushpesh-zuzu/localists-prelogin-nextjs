"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, useParams, useSearchParams } from "next/navigation"; // ✅ Next.js hooks
import SellerFormCardWrappper from "./SellerFormCardWrappper";
import Paragraph from "../UI/Typography/Paragraph";
import Button1 from "../UI/Typography/Button1";
import Button from "../UI/Typography/Button";
import InputLabel from "../UI/InputLabel/InputLabel";
import LocationMapIcon from "../common/icons/SellerRegistration/LocationMapIcon";
import { clearCompanyData } from "@/lib/store/companyJobSlice";
import { getCityName } from "@/lib/store/buyerslice/buyerSlice";
import { showToast } from "@/utils/toaster";
import { extractAllParams } from "@/utils/decodeURLParams";
import {
  pendingLeadData,
  registerUserData,
  searchService,
  setRegisterStep,
  setselectedServices,
  setService,
} from "@/lib/store/findjobslice";
import { CheckIcon } from "lucide-react";

function OtherServiceStep({
  prevStep,
  handleInputChange,
  formData,
  setFormData,
}) {
  const [isPostcodeFromSuggestion, setIsPostcodeFromSuggestion] =
    useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
  const [Input, setInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [randomFallback] = useState(
    () => Math.floor(Math.random() * (45 - 35 + 1)) + 35
  );
  const [isLoading, setIsLoading] = useState(false);
  const [expandedRadius, setExpandedRadius] = useState(0);

  const debounceTimer = useRef(null);
  const debounceRef = useRef(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const search = searchParams.toString() ? `?${searchParams.toString()}` : "";
  const allParams = extractAllParams(search);
  const campaign = allParams.utm_campaign || "";
  const utm_source = allParams.utm_source || "";
  const utm_medium = allParams.utm_medium || "";

  const {
    service,
    registerLoader,
    searchServiceLoader,
    selectedServices,
    pendingLead,
  } = useSelector((state) => state.findJobs);

  const DEBOUNCE_MS = 250;
  const disableWithService = selectedServices?.length > 0;
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (Input.trim() !== "") {
        dispatch(
          searchService({
            search: Input,
            serviceid: formData?.service_id.toString(),
            serviceTitle: params?.serviceTitle || "",
          })
        );
      }
    }, 500);

    return () => {
      clearTimeout(delayDebounce);
      dispatch(setService([]));
    };
  }, [Input, dispatch]);

  const handlePostcode2Change = async (e) => {
    const postcodeValue = e.target.value;

    setFormData((prev) => ({ ...prev, postcode2: postcodeValue }));
    dispatch(
      setFormData({
        validPostCode2: false,
      })
    );

    const { name, value } = e.target;

    if (handleInputChange) handleInputChange(e);
    dispatch(
      setFormData({
        validPostCode2: false,
      })
    );

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value && value.length >= 3) {
        fetchCityFromPostcode(value);
      }
    }, 1000);
  };

  const fetchCityFromPostcode = async (postcode) => {
    if (!postcode || postcode.length < 3) return;

    setIsLoading(true);
    try {
      const result = await dispatch(getCityName({ postcode: postcode }));

      let cityName, postcodeFromApi;
      if (result?.success) {
        cityName = result.data?.city;
        postcodeFromApi = result.data?.postcode;
      }

      if (cityName) {
        dispatch(
          setFormData({
            postcode2: postcodeFromApi || postcode,
            validPostCode2: true,
            coordinates2: {},
          })
        );

        showToast("success", "Location found successfully!");
      } else {
        showToast("error", "No city found for this postcode!");
      }
    } catch (error) {
      console.error("Error fetching city:", error);
      showToast("error", "No PIN code found! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectService = (item) => {
    if (selectedServices?.length >= 5000) {
      showToast("error", "Please add more services in Lead Settings");
      return;
    }

    if (!selectedServices?.some((service) => service.id === item.id)) {
      dispatch(setselectedServices([...selectedServices, item]));
    }

    setInput("");
    dispatch(setService([]));
  };

  const handleRemoveService = (id) => {
    const updated = selectedServices?.filter((service) => service.id !== id);

    dispatch(setselectedServices(updated));

    if (updated.length === 0) {
      setFormData((prev) => ({
        ...prev,
        postcode2: "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (selectedServices.length > 0 && !formData.postcode2) {
      newErrors.postcode2 = "Please enter your postcode.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (selectedServices.length > 0) {
      setErrors((prev) => ({ ...prev, service_id: undefined }));
    }
  }, [selectedServices]);

  useEffect(() => {
    if (show) {
      window.scroll(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  // ✅ Cleanup debounce timer
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const selectedId = selectedServices.map((item) => item.id);
    const serviceId = {
      service_id: [formData?.service_id[0], ...selectedId].join(","),
    };

    dispatch(pendingLeadData(serviceId));
  }, [selectedServices]);

  // ✅ Set validPostCode2 when postcode exists
  useEffect(() => {
    if (formData?.postcode2) {
      dispatch(
        setFormData({
          validPostCode2: true,
        })
      );
    }
  }, [formData?.postcode2]);

  const handleExpandRadius = () => {
    setExpandedRadius((prev) => {
      const newRadius = prev + 20;

      dispatch(setFormData({ expanded_radius: newRadius }));

      return newRadius;
    });
  };

  const triggerSearch = (value) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const trimmed = value.trim();
      dispatch(
        searchService({
          search: trimmed === "" ? "" : trimmed.slice(0, 4),
          serviceTitle: params?.serviceTitle || "",
        })
      );
    }, DEBOUNCE_MS);
  };

  const handleSubmit = () => {
    const postcodeValue = formData?.postcode2?.trim();

    if (!postcodeValue) {
      showToast("error", "Please enter your postcode!");
      return;
    }

    if (!formData?.validPostCode2 && postcodeValue.length < 3) {
      showToast("error", "Please enter a valid postcode!");
      return;
    }

    let apicontion = validateForm();
    const serviceIds = Array.isArray(selectedServices)
      ? selectedServices?.map((service) => service.id).filter(Boolean)
      : [];

    const existingServiceIds = Array.isArray(formData?.service_id)
      ? formData.service_id.filter(Boolean)
      : [];

    const combinedServiceIds = [
      ...new Set([...existingServiceIds, ...serviceIds]),
    ];

    const serviceCategoryData = combinedServiceIds.join(", ");

    const payload = {
      ...formData,
      service_id: serviceCategoryData,
      form_status: 1,
      user_type: 1,
      active_status: 1,
      loggedUser: 1,
      businessname: formData.profile_name,
      nation_wide: formData.nation_wide ? 1 : 0,
      is_online: formData.is_online ? 1 : 0,
      miles2: selectedServices.length > 0 ? formData.miles2 : "",
      postcode2: selectedServices.length > 0 ? formData.postcode2 : "",
      expanded_radius:
        selectedServices.length > 0 ? formData.expanded_radius : "",
    };

    if (utm_source) payload.utm_source = utm_source;
    if (utm_medium) payload.utm_medium = utm_medium;
    if (campaign) payload.campaign = campaign;
    payload.coordinates = JSON.stringify(payload.coordinates);
    delete payload.password;
    delete payload.suite;
    delete payload.is_zipcode;
    delete payload.state;

    if (apicontion) {
      dispatch(registerUserData(payload)).then((result) => {
        if (result?.success) {
          showToast("success", result?.message || "Register successful!");
          router.push("/sellers/leads");
          dispatch(setService());
          dispatch(setRegisterStep(0));
          dispatch(clearCompanyData());
        }
      });
    }
  };

  // ✅ Modal Close Handler
  const handleCloseModal = () => {
    setShow(false);
  };

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) && 
      inputRef.current &&
      !inputRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
      setIsFocused(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <>
      <SellerFormCardWrappper
        heading="Add any additional services you can provide"
        description="Get even more great leads."
        maxWidth="max-w-2xl"
      >
        <div className="flex flex-col sm:flex-row gap-3 items-center mb-10">
          <Paragraph variant="primary">You've asked for leads for:</Paragraph>
          <span className="px-5 py-2 text-[18px] font-medium bg-[#e3f6fc] text-[#00afe3] rounded-[3px]">
            {params?.serviceTitle // ✅ params instead of item
              ?.replace(/-/g, " ")
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </span>
        </div>

        <Paragraph variant="primary" className="mb-2.5">
          We will also show you leads from
        </Paragraph>

        {/* ✅ Selected Services Display */}
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {selectedServices?.length > 0 &&
            selectedServices?.map((service) => (
              <span
                key={service.id}
                className="py-1.5 px-2.5 leading-6 text-xs font-semibold text-white bg-[#00afe3] rounded-[3px] cursor-pointer"
              >
                {service.name}
                <span
                  className="mx-3 cursor-pointer"
                  onClick={() => handleRemoveService(service.id)}
                >
                  ✕
                </span>
              </span>
            ))}
        </div>

        <div className="relative mb-4">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for more services..."
            className="w-full px-4 py-2 border border-[#ccc] rounded-sm focus:outline-1 focus:ring-1"
            style={{ boxShadow: "0 0 2px .5px #0000001a" }}
            onFocus={() => {
              setIsFocused(true);
              setIsDropdownOpen(true);
              if (Input.trim() === "") {
                dispatch(
                  searchService({
                    search: "",
                    serviceTitle: params?.serviceTitle || "", // ✅ params
                  })
                );
              }
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
            onChange={(e) => {
              const value = e.target.value;
              setInput(value);
              setIsDropdownOpen(true);
              setSelectedService(null);
              triggerSearch(value);
              if (!e.target.value) {
                dispatch(setService([]));
              }
            }}
            value={Input}
          />

          {isDropdownOpen && service?.length > 0 && (
            <div ref={dropdownRef} className="absolute z-10 w-full bg-white border border-gray-300 rounded-sm mt-1 max-h-60 overflow-y-auto shadow-lg">
              {searchServiceLoader ? (
                <div className="p-4 text-center">Loading...</div>
              ) : (
                <>
                  {service
                    ?.filter(
                      (s) =>
                        s.name?.toLowerCase() !==
                        params?.serviceTitle?.replace(/-/g, " ")?.toLowerCase() // ✅ params
                    )
                    .map((item) => (
                      <p
                        key={item.id}
                        className="p-3 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSelectService(item)}
                      >
                        {item.name}
                      </p>
                    ))}
                </>
              )}
            </div>
          )}
        </div>

        {/* ✅ Auto Bid Checkbox */}
        <label className="flex items-center gap-[5px] mt-[18px] mb-[20px] cursor-pointer">
          <input
            type="checkbox"
            name="auto_bid"
            checked={formData?.auto_bid === 1}
            onChange={handleInputChange}
            className="w-4 h-4 lg:w-6 lg:h-6 border border-[#d9d9d9] shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)] cursor-pointer"
          />
          <span className="font-semibold text-[14px] text-black">Auto Bid</span>
        </label>

        {/* ✅ Service Area Section */}
        <InputLabel label="What areas do you provide these additional services in?">
          <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-6">
            {/* ✅ Miles Dropdown */}
            <div className="w-full md:w-1/2">
              <InputLabel inputId="Miles">
                <div className="relative">
                  <select
                    className="w-full px-4 py-2 border rounded-sm appearance-none bg-white focus:outline-1 focus:ring-1 text-gray-700"
                    name="miles2"
                    value={formData?.miles2 || ""}
                    onChange={handleInputChange}
                    disabled={!disableWithService}
                  >
                    <option value="">Select miles</option>
                    <option value="1">1 mile</option>
                    <option value="2">2 miles</option>
                    <option value="5">5 miles</option>
                    <option value="10">10 miles</option>
                    <option value="20">20 miles</option>
                    <option value="30">30 miles</option>
                    <option value="50">50 miles</option>
                    <option value="100">100 miles</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </InputLabel>
            </div>

            {/* ✅ Postcode Input */}
            <div className="w-full md:w-1/2">
              <InputLabel inputId="From">
                <div className="relative">
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                    <LocationMapIcon className="h-3.5 w-3.5" />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter Postcode (No Spaces)"
                    style={{ boxShadow: "0 0 2px .5px #0000001a" }}
                    className={`relative w-full px-6 py-2 rounded-sm text-gray-900 text-base border transition-all duration-200 placeholder:text-gray-400 focus:outline-1 focus:ring-1 ${
                      errors.postcode2 ? "border-red-500" : "border-[#ccc]"
                    }`}
                    name="postcode2"
                    value={formData?.postcode2 || ""}
                    onChange={handlePostcode2Change}
                    disabled={!disableWithService || isLoading}
                  />

                  {/* ✅ Loading Spinner */}
                  {isLoading && (
                    <div className="absolute top-[25%] right-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#00aeef]"></div>
                  )}

                  {/* ✅ Valid Checkmark */}
                  {!isLoading && formData?.validPostCode2 && (
                    <CheckIcon
                      size={24}
                      color="white"
                      className="absolute p-1 bg-green-500 rounded-full top-[20%] right-2"
                    />
                  )}
                </div>
              </InputLabel>
            </div>
          </div>
        </InputLabel>

        {/* ✅ Error Message */}
        {errors.postcode2 && (
          <p className="text-red-500 text-sm mb-3">{errors.postcode2}</p>
        )}

        {/* ✅ Expand Radius Button */}
        <Button
          className={`bg-[#00afe3] text-white py-1.5 px-3 rounded-[3px] text-[20px] ${
            disableWithService ? "cursor-pointer" : ""
          }`}
          onClick={handleExpandRadius}
          disabled={!disableWithService}
        >
          Expand Radius
        </Button>

        {/* ✅ Expanded Radius Display */}
        {expandedRadius > 0 && (
          <Paragraph variant="medium" className="p-5 bg-[#e3f6fc] mt-6">
            {expandedRadius} miles added
          </Paragraph>
        )}

        {/* ✅ Lead Count Display */}
        <div className="py-2.5 px-9 bg-[#e3f6fc] my-6">
          <p className="text-[32px] font-bold text-[#00afe3]">
            {pendingLead != 0 ? pendingLead : randomFallback}
          </p>
          <span className="font-[Arial]">current available leads</span>
        </div>

        {/* ✅ Navigation Buttons */}
        <div className="flex justify-between">
          <Button1 variant="secondary" onClick={prevStep}>
            Back
          </Button1>
          <Button1 variant="primary" onClick={handleSubmit}>
            {registerLoader ? "Loading..." : "Continue"}
          </Button1>
        </div>
      </SellerFormCardWrappper>

      {/* ✅ Confirmation Modal */}
      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Are you sure that you want <br /> to Register?
            </h2>

            <div className="flex gap-4 justify-center">
              <Button1
                variant="secondary"
                onClick={handleCloseModal}
                disabled={registerLoader}
              >
                Back
              </Button1>
              <Button1 variant="primary" onClick={handleSubmit}>
                {registerLoader ? "Loading..." : "Continue"}
              </Button1>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OtherServiceStep;
