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
  getAddressListFromPostcode,
  setAddressList
} from "@/lib/store/buyerslice/buyerSlice";
import { useParams } from "next/navigation";
import { getBarkToken } from "@/utils/CookiesHelper";
import { megaMenu } from "../MegaMenu";
import { searchService, setService } from "@/lib/store/findjobslice";
import { showToast } from "@/utils/toaster";
import Select from "react-select";

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

  const [errors, setErrors] = useState({ service: "", pincode: "", house: "", street: "" });
  const [loading, setLoading] = useState(false);
  const [checkingPostcode, setCheckingPostcode] = useState(false);

  const [house, setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [hasFetchedAddress, setHasFetchedAddress] = useState(false);

  const { slug } = useParams();
  const { searchServiceLoader, service, registerData } = useSelector(
    (state) => state.findJobs
  );
  const { citySerach, addressList, addressLoader } = useSelector((state) => state.buyer);
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

        if (newResponse?.data?.valid) {
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
    let newErrors = { service: "", pincode: "", house: "", street: "" };


    let houseValue = house;
    let streetValue = street;

    if (selectedAddressId !== "" && (!houseValue || !streetValue)) {
      const selected = addressList[selectedAddressId];
      if (selected) {
        houseValue = selected.house_name || "";
        streetValue = selected.street_address || "";
      }
    }
    if (!selectedService?.id) newErrors.service = "Please select a service!";
    if (!pincode) newErrors.pincode = "Postcode is required!";

    if (!houseValue?.trim()) {
      newErrors.house = "House name is required!";
    }

    if (!streetValue?.trim()) {
      newErrors.street = "Street address is required!";
    }

    setErrors(newErrors);
    if (newErrors.service || newErrors.pincode || newErrors.house || newErrors.street) return;

    setErrors({ service: "", pincode: "", house: "", street: "" });

    // Save to Redux and go next
    dispatch(
      setbuyerRequestData({
        house: houseValue,
        street: streetValue,
        address: `${houseValue}, ${streetValue}`,
      }),
    );

    setLoading(true);
    try {
      const response = await dispatch(getCityName({ postcode: pincode }));
      const newResponse = response?.payload || response;

      if (newResponse?.data?.valid) {
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
    house,
    street,
    selectedAddressId,
    addressList
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
      setSelectedAddressId("");
      setHouse("");
      setStreet("");
      dispatch(setAddressList([]));
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

  useEffect(() => {
    if (postalCodeValidate && pincode) {
      dispatch(getAddressListFromPostcode({ postcode: pincode }))
        .then(() => setHasFetchedAddress(true));
    }
  }, [postalCodeValidate, pincode, dispatch]);

  useEffect(() => {
    if (!pincode) {
      setSelectedAddressId("");
      setHouse("");
      setStreet("");

      dispatch(setAddressList([]));
      setHasFetchedAddress(false);
    }
  }, [pincode, dispatch]);

  return (
    <div className="px-7.5 py-6">
      <Modal
        isOpen={true}
        title="What service do you need?"
        onNext={handleContinue}
        nextButtonText={loading ? "Validating..." : "Continue"}
        disableNext={loading || !selectedService || !postalCodeValidate || !(house?.trim() && street?.trim() || selectedAddressId !== "")}
        maxWidth="max-w-[90%] md:max-w-[550px]"
        onClose={() => { handleCloseClick() }}
        padding="px-3 py-4 md:px-7.5 md:pt-3 pb-6"
        radius="rounded-[20px]"
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
            <div className="absolute top-[60%] right-2 h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#00aeef]"></div>
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

        <div className="mt-4">
          <label className="text-[20px] leading-[100%] tracking-[-0.03em] font-bold font-[Arial] text-[#253238] mb-3 block">
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
          {hasFetchedAddress && !addressLoader && addressList.length === 0 && postalCodeValidate && (
            <p className="text-sm text-orange-700 mt-1">
              No address found? Please enter below
            </p>
          )}
        </div>

        <div className="mt-4">
          <InputField
            label="Building or House Number / Name"
            value={house}
            placeholder="e.g. 221B or Rose Villa"
            onChange={(e) => {
              setHouse(e.target.value);
              setSelectedAddressId("");
              setErrors((prev) => ({ ...prev, house: "" }));
            }} error={errors.house}
          />
        </div>

        <div className="mt-4">
          <InputField
            label="Street Address"
            value={street}
            placeholder="e.g. Baker Street"
            onChange={(e) => {
              setStreet(e.target.value);
              setSelectedAddressId("");
              setErrors((prev) => ({ ...prev, street: "" }));
            }} error={errors.street}
          />
        </div>
      </Modal>
    </div>
  );
};

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "41.6px",
    height: "41.6px",
    borderRadius: "4px",
    borderColor: state.isFocused ? "#00aeef" : "#d1d5db",
    boxShadow: state.isFocused
      ? "0 0 0 0.2px #000000"
      : "none",
    "&:hover": {
      borderColor: "#000000",
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

export default ServiceAndPostCodeModal;
