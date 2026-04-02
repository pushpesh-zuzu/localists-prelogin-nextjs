"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "./FormWrapper";
import H4 from "../UI/Typography/H4";
import {
    getAddressListFromPostcode,
    setAddressList,
    setbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import Select from "react-select";
import LoaderIndicator from "../common/Loader/LoaderIndicatore";



function AddressFormNewPPC({ nextStep }) {
    const dispatch = useDispatch();

    const { addressLoader, buyerRequest, addressList } = useSelector(
        (state) => state.buyer
    );

    const postcode = buyerRequest?.postcode;

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [house, setHouse] = useState("");
    const [street, setStreet] = useState("");
    const [errors, setErrors] = useState({});

    const [btnLoader, setBtnLoader] = useState(false);

    useEffect(() => {
        if (postcode && postcode.length >= 3) {
            dispatch(getAddressListFromPostcode({ postcode }));
        }
    }, [postcode, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        let newErrors = {};

        if (!house?.trim()) newErrors.house = "House name is required";
        if (!street?.trim()) newErrors.street = "Street address is required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) return;
        setBtnLoader(true);

        try {
            // Save to Redux and go next
            dispatch(
                setbuyerRequestData({
                    house: house,
                    street: street,
                    address: `${house}, ${street}`,
                }),
            );

            nextStep && nextStep();
        } finally {
            setBtnLoader(false);
        }
    };

    const addressOptions = addressList.map((addr, index) => ({
        value: index,
        label: `${addr.house_name || ""}, ${addr.street_address || ""}`,
    }));

    return (
        <FormWrapper>
            <div className="py-[10px] text-center">
                <H4 className="text-[#00afe3]">
                    We only use your address to match you with local professionals
                </H4>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col px-[27px] pb-[27px] max-[1024px]:px-[20px]"
            >
                <Label>Select an address *</Label>
                <Select
                    options={addressOptions}
                    value={selectedAddress}
                    onChange={(option) => {
                        setSelectedAddress(option);
                        const selected = addressList[option.value];
                        if (selected) {
                            setHouse(selected.house_name || "");
                            setStreet(selected.street_address || "");
                            setErrors((prev) => ({
                                ...prev,
                                house: "",
                                street: "",
                            }));
                        }
                    }}
                    isSearchable={false}
                    isClearable={false}
                    placeholder="Please select..."
                    styles={customStyles(errors.house || errors.street)}
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuPosition="fixed"
                />
                {!addressLoader && postcode && addressList?.length === 0 && (
                    <p className="text-sm text-orange-700 mt-1">
                        No address found? Please enter below
                    </p>
                )}
                <Label>Building or House Number / Name *</Label>
                <Input
                    name="house"
                    value={house}
                    onChange={(e) => {
                        setHouse(e.target.value);
                        setSelectedAddress(null);
                        setErrors((prev) => ({ ...prev, house: "" }));
                    }}
                    error={errors.house}
                    placeholder="e.g. 221B or Rose Villa"
                />
                <Error>{errors.house}</Error>

                <Label>Street Address *</Label>
                <Input
                    name="street"
                    value={street}
                    onChange={(e) => {
                        setStreet(e.target.value);
                        setSelectedAddress(null); // reset dropdown
                        setErrors((prev) => ({ ...prev, street: "" }));
                    }}
                    error={errors.street}
                    placeholder="e.g. Baker Street"
                />
                <Error>{errors.street}</Error>

                <button
                    type="submit"
                    disabled={btnLoader || addressLoader}
                    className="
            mt-[27px] w-full
            bg-[#00afe3] text-white
            px-[20px] py-[12px]
            rounded-full cursor-pointer
            flex items-center justify-center gap-[5px]
            disabled:opacity-60 hover:bg-[#4096ff]
         font-[Arial] font-bold
        tracking-[-0.03em]
        leading-[24px]
        text-[20px]       
        max-[768px]:text-[18px]
        max-[480px]:text-[16px]
          " >
                    {btnLoader ? (
                        <LoaderIndicator />
                    ) : (
                        "Continue"
                    )}
                </button>
            </form>
        </FormWrapper>
    );
}

export default AddressFormNewPPC;

const Label = ({ children }) => (
    <label className="mt-[14px] mb-[8px] font-[Arial]
        tracking-[-0.03em]
        leading-[20px]
        text-[#253238]
        text-[16px] font-bold
        max-[768px]:text-[16px]
        max-[480px]:text-[16px]">
        {children}
    </label>
);

const Input = ({ error, ...props }) => (
    <input
        {...props}
        className={`
      w-full box-border
      px-[16px] py-[14px] bg-[#ffffff]
      rounded-[5px]
      font-[Arial] text-[16px]
      leading-[18px] tracking-[-0.03px]
        placeholder:!text-[#d9d9d9]
      placeholder:!opacity-100
      placeholder:font-[Arial]
      placeholder:text-[16px]
      placeholder:leading-[18px]
      placeholder:tracking-[-0.03px]
      border ${error ? "border-[#FF4D4F]" : "border-[#D9D9D9]"}
    `}
    />
);

const Error = ({ children }) => (
    <span className="block min-h-[2px] text-[12px] text-[#FF4D4F]">
        {children}
    </span>
);

const customStyles = (error) => ({
    control: (base) => ({
        ...base,
        padding: "6px 16px",
        minHeight: "48px",
        borderRadius: "3px",
        borderColor: error ? "#ff4d4f" : "#d9d9d9",
        boxShadow: "none",
        fontFamily: "Arial",
        cursor: "pointer"
    }),

    menu: (base) => ({
        ...base,
        zIndex: 9999,
    }),

    menuList: (base) => ({
        ...base,
        maxHeight: "180px",
        overflowY: "auto",
        paddingTop: 0,
        paddingBottom: 0,
    }),

    option: (base, state) => ({
        ...base,
        fontSize: "14px",
        padding: "10px 14px",
        cursor: "pointer",
        backgroundColor: state.isFocused ? "#f5f5f5" : "#fff",
        color: "#253238",
    }),
});