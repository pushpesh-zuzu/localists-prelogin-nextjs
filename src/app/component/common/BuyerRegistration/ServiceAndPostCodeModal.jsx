import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Modal from "../Modal";
import InputField from "../../UI/Inputs/InputField";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, CheckIcon, CircleX, Search } from "lucide-react";
import {
  getCityName,
  setbuyerRequestData,
  setcitySerach,
  questionAnswerData,
} from "@/lib/store/buyerslice/buyerSlice";
import { useParams } from "next/navigation";
import { getBarkToken } from "@/utils/CookiesHelper";
import { megaMenu } from "../MegaMenu";
import { searchService, setService } from "@/lib/store/findjobslice";
import { showToast } from "@/utils/toaster";

function getNameFromSlug(slug, categoryList) {
  if (typeof slug !== "string" || !slug || !Array.isArray(categoryList))
    return null;
  const match = categoryList.find((item) => item?.path === slug);
  return match ? match.name ?? null : null;
}

const ServiceAndPostCodeModal = ({
  nextStep,
  serviceId,
  serviceName,
  onClose,
  pincodes,
  setShowConfirmModal,
  postalCodeIsValidate,
  resetServiceTrigger,
  getService,
}) => {
  const [input, setInput] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [postalCodeValidate, setPostalCodeValidate] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [errors, setErrors] = useState({ service: "", pincode: "" });
  const [loading, setLoading] = useState(false);
  const [checkingPostcode, setCheckingPostcode] = useState(false);

  const { slug } = useParams();
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { citySerach } = useSelector((state) => state.buyer);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  const nameValue = useMemo(
    () => getNameFromSlug(slug, megaMenu[0].subcategory),
    [slug]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-select service from URL slug
  useEffect(() => {
    if (nameValue) {
      dispatch(searchService({ search: nameValue }));
    }
  }, [dispatch, nameValue]);

  useEffect(() => {
    if (nameValue && service?.length === 1) {
      setSelectedService(service[0]);
      setInput(service[0].name);
      setIsDropdownOpen(false);
    }
  }, [nameValue, service]);

  // Debounced service search
  useEffect(() => {
    if (isDropdownOpen && input.trim() !== "" && input !== serviceName) {
      const delayDebounce = setTimeout(() => {
        dispatch(searchService({ search: input }));
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [input, dispatch, isDropdownOpen, serviceName]);

  // Initialize with pre-filled data
  useEffect(() => {
    if (serviceName) {
      setInput(serviceName);
      setIsDropdownOpen(true);
      dispatch(searchService({ search: serviceName }));
    }

    if (pincodes) {
      setPincode(pincodes);
    }
  }, [serviceName, pincodes, dispatch]);

  // Set postal code validation
  useEffect(() => {
    if (pincodes && postalCodeIsValidate) {
      setPincode(pincodes);
      setPostalCodeValidate(true);
      setErrors((prev) => ({ ...prev, pincode: "" }));
    }
  }, [pincodes, postalCodeIsValidate]);

  // Match service from search results
  useEffect(() => {
    if (serviceName && service?.length > 0) {
      const match = service.find(
        (s) => s.name.trim().toLowerCase() === serviceName.trim().toLowerCase()
      );

      if (match) {
        setSelectedService(match);
        setIsDropdownOpen(false);
      } else {
        setSelectedService(null);
      }
    }
  }, [serviceName, service]);

  const handleSelectService = useCallback(
    (item) => {
      setInput(item.name);
      setSelectedService(item);
      setIsDropdownOpen(false);
      setErrors((prev) => ({ ...prev, service: "" }));
      setTimeout(() => dispatch(setService([])), 100);
    },
    [dispatch]
  );

  const validatePostcode = useCallback(
    async (value) => {
      if (!value) {
        setPostalCodeValidate(false);
        setCity("");
        return;
      }

      setCheckingPostcode(true);
      try {
        const response = await dispatch(getCityName({ postcode: value }));
        const newResponse = response?.payload || response;

        if (newResponse?.data?.city) {
          setPostalCodeValidate(true);
          setCity(newResponse.data.city);
          dispatch(setcitySerach(newResponse.data.city));
          setErrors((prev) => ({ ...prev, pincode: "" }));
        } else {
          setPostalCodeValidate(false);
          setCity("");
          setErrors((prev) => ({
            ...prev,
            pincode: "Please enter a valid postcode!",
          }));
        }
      } catch (error) {
        setPostalCodeValidate(false);
        setCity("");
        setErrors((prev) => ({
          ...prev,
          pincode: "Please enter a valid postcode!",
        }));
      } finally {
        setCheckingPostcode(false);
      }
    },
    [dispatch]
  );

  // Validate postcode while typing (debounced)
  useEffect(() => {
    if (pincode.trim().length >= 3) {
      const delay = setTimeout(() => validatePostcode(pincode), 600);
      return () => clearTimeout(delay);
    } else {
      setPostalCodeValidate(false);
      setCity("");
    }
  }, [pincode, validatePostcode]);

  const handlePincodeChange = (e) => {
    const value = e.target.value.trim().slice(0, 10);
    setPincode(value);
  };

  const handleContinue = useCallback(async () => {
    let newErrors = { service: "", pincode: "" };

    if (!selectedService?.id) newErrors.service = "Please select a service!";
    if (!pincode) newErrors.pincode = "Postcode is required!";

    setErrors(newErrors);
    if (newErrors.service || newErrors.pincode) return;

    setLoading(true);
    try {
      const response = await dispatch(getCityName({ postcode: pincode }));
      const newResponse = response?.payload || response;

      if (newResponse?.data?.city) {
        setPostalCodeValidate(true);
        setCity(newResponse.data.city);
        dispatch(setcitySerach(newResponse.data.city));

        dispatch(
          setbuyerRequestData({
            service_id: selectedService?.id || serviceId,
          })
        );

        dispatch(
          questionAnswerData({
            service_id: selectedService?.id || serviceId || service?.[0]?.id,
          })
        );

        nextStep();
        if (selectedService && getService) getService(selectedService);
      } else {
        showToast("error", "Please enter a valid postcode!");
      }
    } catch (error) {
      console.error("Error validating postcode:", error);
      showToast("error", "Please enter a valid postcode!");
    } finally {
      setLoading(false);
    }
  }, [
    selectedService,
    pincode,
    dispatch,
    serviceId,
    nextStep,
    getService,
    service,
  ]);

  const handleCloseClick = () => {
    if (!getBarkToken()) {
      setShowConfirmModal(true);
      dispatch(
        setbuyerRequestData({
          service_id: selectedService?.id || serviceId,
        })
      );
    } else {
      setInput("");
      setSelectedService(null);
      setPincode("");
      setCity("");
      onClose();
    }
  };

  // Save service to Redux
  useEffect(() => {
    if (selectedService?.id) {
      dispatch(
        setbuyerRequestData({
          service_id: selectedService.id || serviceId,
        })
      );
    }
  }, [selectedService, dispatch, serviceId]);

  const handleInputFocus = () => {
    if (input.trim() && service?.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setIsDropdownOpen(true);
    setSelectedService(null);
    setErrors((prev) => ({ ...prev, service: "" }));
  };

  return (
    <div className="px-7.5 py-6">
      <Modal
        isOpen={true}
        title="What service do you need?"
        onNext={handleContinue}
        nextButtonText={loading ? "Validating..." : "Continue"}
        disableNext={loading || !selectedService || !postalCodeValidate}
        maxWidth="max-w-[90%] md:max-w-[550px]"
        onClose={()=>{handleCloseClick()}}
        padding="px-3 py-4 md:px-7.5 md:pt-3 pb-6"
      >
        {/* Service Input */}
        <div className="relative" ref={dropdownRef}>
          <InputField
            label="What service do you need?"
            placeholder="e.g. Landscaping, Driveway Installation"
            value={input}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            error={errors.service}
            icon={<Search className="w-4 h-4 text-gray-400" />}
            disabled
          />

          {isDropdownOpen && service?.length > 0 && (
            <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto mt-1">
              {searchServiceLoader ? (
                <div className="p-2 text-center text-gray-500">
                  <div className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
                  <span className="ml-2">Searching...</span>
                </div>
              ) : (
                service.map((item) => (
                  <div
                    key={item.id}
                    className="p-2 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-b-0"
                    onClick={() => handleSelectService(item)}
                  >
                    <div className="flex items-center">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      {selectedService?.id === item.id && (
                        <CheckIcon className="ml-auto w-4 h-4 text-[green]" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Postcode Input */}
        <div className="mt-4 relative">
          <InputField
            label="Where do you need it?"
            placeholder="Enter Postcode (No Spaces)"
            value={pincode}
            onChange={handlePincodeChange}
            error={errors.pincode}
          />
          {checkingPostcode ? (
            <div className="absolute top-[55%] right-2 h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#00aeef]"></div>
          ) : postalCodeValidate && city ? (
            <CheckIcon
              size={24}
              color="white"
              className="absolute p-1 bg-green-500 rounded-full top-[55%] right-2"
            />
          ) : (
            ""
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ServiceAndPostCodeModal;
