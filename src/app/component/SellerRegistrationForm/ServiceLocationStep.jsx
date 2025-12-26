"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setCity,
  setCountry,
  setPostalCode,
  setSelectedServiceFormData,
} from "@/lib/store/findjobslice";
import { showToast } from "@/utils/toaster";
import { getCityName } from "@/lib/store/buyerslice/buyerSlice";
import { CheckIcon, Map, MapPin } from "lucide-react";
import Button1 from "../UI/Typography/Button1";
import H2 from "../UI/Typography/H2";
import H4 from "../UI/Typography/H4";
import H3 from "../UI/Typography/H3";
import Paragraph from "../UI/Typography/Paragraph";
import SellerFormCardWrappper from "./SellerFormCardWrappper";
import InputLabel from "../UI/InputLabel/InputLabel";
import LocationMapIcon from "../common/icons/SellerRegistration/LocationMapIcon";
import IIconSVG from "../common/icons/SellerRegistration/IIconSVG";
// import LocationIconSVG from "../common/icons/SellerRegistration/LocationIconSVG";

const ServiceLocationStep = ({
  nextStep,
  handleInputChange,
  formData = {},
  setFormData,
  errors = {},
}) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimer = useRef(null);
  const [isValidPostCode, setIsValidPostCode] = useState(false);

  const handlePostcodeChange = (e) => {
    const { name, value } = e.target;

    dispatch(
      setSelectedServiceFormData({
        [name]: value,
      })
    );

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (value && value.length >= 3) {
        fetchCityFromPostcode(value);
      }
    }, 800);
  };

  const fetchCityFromPostcode = async (postcode) => {
    if (!postcode || postcode.length < 3) return;

    setIsLoading(true);

    try {
      const response = await dispatch(getCityName({ postcode }));
      const newResponse = response?.unwrap ? await response.unwrap() : response;
      if (response?.success) {
        setIsValidPostCode(true);
        const cityName = response.data?.city;
        const postcodeFromApi = response.data?.postcode;

        dispatch(
          setFormData({
            postcode: postcodeFromApi,
            zipcode: postcodeFromApi,
            postcode_old: postcodeFromApi,
            zipcode_old: postcodeFromApi,
            city: cityName,
            cities: cityName || "",
            city_old: cityName || "",
            country: "UK",
            country_old: "UK",
            coordinates: {},
            validPostCode: true,
            validPostCode2: isValidPostCode,
            postcode2: postcodeFromApi,
          })
        );

        dispatch(setPostalCode({ postalcode: postcodeFromApi }));
        dispatch(setCountry({ country: newResponse.data?.country }));
      }
    } catch (error) {
      console.error("Error fetching city:", error);
      // 🔥 setCity function call fix किया
      dispatch(
        setFormData({
          city: "",
          validPostCode: false,
        })
      );
      setIsValidPostCode(false);
      showToast("error", "No PIN code found! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndProceed = () => {
    if (
      !formData?.postcode ||
      (formData.postcode.length < 3 && formData.city)
    ) {
      showToast("error", "Please enter a valid postcode");
      return;
    }
    if (!formData?.validPostCode) {
      showToast("error", "Please enter a valid postcode");
      return;
    } else {
      nextStep();
    }
  };
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <SellerFormCardWrappper
      heading="Tell us where you want to find new customers!"
      description="Share the areas you cover, and we'll match you with leads right
            in your location."
      title="I serve customers within"
      maxWidth="max-w-4xl"
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-6">
        <div className="w-full md:w-1/2">
          <InputLabel inputId="Miles" label="Miles" error={errors?.miles1}>
            <div className="relative">
              <select
                className={`w-full px-4 py-2 border rounded-sm appearance-none bg-white 
                    ${
                      errors?.miles1
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-300"
                    } 
                    focus:outline-1 focus:ring-1
                    text-gray-700 cursor-pointer`}
                name="miles1"
                value={formData?.miles1 || ""}
                onChange={handleInputChange}
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

        {/* Postcode Input */}
        <div className="w-full md:w-1/2">
          <InputLabel inputId="From" label="From" error={errors.postcode}>
            <div className="relative">
              <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                <LocationMapIcon className="h-3.5 w-3.5" />
              </div>
              <input
                type="text"
                placeholder="Enter Postcode (No Spaces)"
                style={{ boxShadow: "0 0 2px .5px #0000001a" }}
                className={`
            relative w-full px-6 py-2 rounded-sm
            text-gray-900 text-base
            border border-[#ccc]
            transition-all duration-200
            placeholder:text-gray-400
            focus:outline-1 focus:ring-1
            disabled:bg-gray-100 
            ${
              errors.postcode
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "focus:ring-black"
            }
          `}
                name="postcode"
                value={formData?.postcode || ""}
                onChange={handlePostcodeChange}
                disabled={isLoading}
              />

              {isLoading && (
                <div className="absolute top-[25%] right-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#00aeef]"></div>
              )}

              {!isLoading && isValidPostCode && (
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

      {/* Checkboxes and Toggle Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-start gap-4 sm:gap-16 mb-2">
        {/* Nationwide Checkbox */}
        <label className="flex items-center space-x-1 cursor-pointer">
          <input
            type="checkbox"
            name="nation_wide"
            checked={formData?.nation_wide === 1}
            onChange={handleInputChange}
            className="h-4.5 w-4.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm font-semibold text-gray-700">
            Nationwide
          </span>
        </label>

        {/* Online/Remote Toggle */}
        <div className="flex items-center space-x-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="is_online"
              checked={formData?.is_online === 1}
              onChange={handleInputChange}
              className="sr-only peer"
            />

            <div
              className="
        relative
        w-[36px] h-[18px]
        bg-gray-300
        rounded-full
        transition-colors
        peer-checked:bg-[#00afe3]

        after:content-['']
        after:absolute
        after:top-[2px]
        after:left-[2px]
        after:w-[14px]
        after:h-[14px]
        after:bg-white
        after:rounded-full
        after:transition-transform
        peer-checked:after:translate-x-[18px]
      "
            ></div>
          </label>

          <span className="text-sm font-semibold text-gray-700">
            Online/Remote Lead
          </span>
        </div>
      </div>

      {/* Footer Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Info Text */}
        <div className="flex items-center text-sm text-gray-600">
          <IIconSVG />
          <span className="font-bold text-sm font-[Arial] ml-2">
            You can change your location at any time
          </span>
        </div>

        <Button1
          className="max-w-fit max-[640]:mx-auto md:ml-auto"
          disabled={isLoading}
          variant="secondary"
          onClick={validateAndProceed}
        >
          Next
        </Button1>
      </div>
    </SellerFormCardWrappper>
  );
};

export default ServiceLocationStep;
