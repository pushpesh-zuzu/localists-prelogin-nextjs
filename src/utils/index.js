"use client";

import { toast } from "react-toastify";
import DummyImage from "../../public/images/Setting/ProfileWebIcon.svg";

/* ---------------- SLUG ---------------- */
export const generateSlug = (name = "") =>
    name.toLowerCase().replace(/\s+/g, "-");

/* ---------------- TOAST ---------------- */
export const showToast = (type, message) => {
    const options = {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    };

    if (type === "success") toast.success(message, options);
    if (type === "error") toast.error(message, options);
    if (type === "info") toast.info(message, options);
    if (type === "warning") toast.warn(message, options);
};

/* ---------------- BASE URLS ---------------- */

export const BASE_IMAGE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const BASE_URL_IMAGE = `${BASE_IMAGE_URL}storage/app/public/images/category/`;
export const BASE_IMAGE = `${BASE_IMAGE_URL}storage/app/public/images/`;
export const BASE_COMPLETE = `${BASE_IMAGE_URL}`;

/* ---------------- DEFAULT IMAGE ---------------- */
export const DEFAULT_PROFILE_IMAGE = DummyImage;

/* ---------------- GOOGLE PLACES AUTOCOMPLETE ---------------- */
export const loadGooglePlacesAutocomplete = ({
    inputRef,
    setPincode,
    setCity,
    setErrors,
    dispatch,
    setcitySerach,
}) => {
    if (typeof window === "undefined") return;

    const initAutocomplete = () => {
        if (!inputRef?.current || !window.google?.maps) return;

        const autocomplete = new window.google.maps.places.Autocomplete(
            inputRef.current,
            {
                types: ["geocode"],
                componentRestrictions: { country: "UK" },
            }
        );

        autocomplete.addListener("place_changed", () => {
            const place = autocomplete.getPlace();
            if (!place.address_components) return;

            const getComponent = (type) =>
                place.address_components.find((c) =>
                    c.types.includes(type)
                )?.long_name;

            const postalCode = getComponent("postal_code");
            const cityName = getComponent("locality");
            const townName = getComponent("administrative_area_level_3");

            if (postalCode) {
                setPincode(postalCode);
                inputRef.current.value = postalCode;
                setErrors?.((prev) => ({ ...prev, pincode: "" }));
            }

            const finalCity = cityName || townName;
            if (finalCity) {
                setCity(finalCity);
                dispatch?.(setcitySerach(finalCity));
            }

            if (!postalCode && !cityName && !townName) {
                alert("No city or PIN code found! Please try again.");
            }
        });
    };

    const loadGoogleMapsScript = () => {
        if (window.google?.maps) {
            initAutocomplete();
            return;
        }

        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initAutocomplete;
        document.body.appendChild(script);
    };

    loadGoogleMapsScript();
};

/* ---------------- LOCAL STORAGE HELPERS ---------------- */
export const updateLocalStorageValue = (storageKey, targetKey, newValue) => {
    if (typeof window === "undefined") return;

    try {
        const storedData = localStorage.getItem(storageKey);
        if (!storedData) return;

        const parsedData = JSON.parse(storedData);
        parsedData[targetKey] = newValue;
        localStorage.setItem(storageKey, JSON.stringify(parsedData));
    } catch (error) {
        console.error("Error updating localStorage:", error);
    }
};

/* ---------------- CLEAR AUTH DATA ---------------- */
export const clearAuthData = () => {
    if (typeof window === "undefined") return;

    const keysToRemove = [
        "barkToken",
        "barkUserToken",
        "registerDataToken",
        "registerTokens",
        "createRequestToken",
        "createRequest",
    ];

    keysToRemove.forEach((key) => localStorage.removeItem(key));
};
