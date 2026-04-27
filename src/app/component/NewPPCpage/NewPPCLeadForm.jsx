"use client";

// import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import FormWrapper from "./FormWrapper";

import {
    questionAnswerData,
    setbuyerRequestData,
    getCityName,
    setcitySerach,
} from "@/lib/store/buyerslice/buyerSlice";
import { searchService } from "@/lib/store/findjobslice";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useEmailCheck } from "@/hooks/emailExist";
// import { handleScrollToBottom } from "@/utils/handleScrollToBottom"
import LoaderIndicator from "../common/Loader/LoaderIndicatore";
import H4 from "../UI/Typography/H4";
import { checkAuthenticatedUser } from "@/utils/CheckAthenticatedUser";
import { useRouter } from "next/navigation";
import { checkEmailIdApi } from "@/lib/store/findjobslice"
import { validateEmail } from "@/utils/validateEmail"
import LocationPinIcon from "../../../../public/ReactIcons/LocationPinIcon";
import GreenCheckIcon from "../common/icons/GreenCheckIcon";
import Select from "react-select";
// const AsyncSelect = dynamic(
//     () => import("react-select/async"),
//     { ssr: false }
// );

function NewPPCLeadForm({ nextStep, serviceId, }) {
    const dispatch = useDispatch();
    const router = useRouter()
    const { questionLoader } = useSelector((s) => s.buyer);
    const { service } = useSelector((s) => s.findJobs);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        postcode: "",
        service_name: null,
        service_id: "",
        notes: "",
    });

    const [errors, setErrors] = useState({});
    const [serviceOptions, setServiceOptions] = useState([]);
    const [initialServiceLoaded, setInitialServiceLoaded] = useState(false);

    const [isCheckingPostcode, setIsCheckingPostcode] = useState(false);
    const [postcodeValid, setPostcodeValid] = useState(false);
    const [postcodeError, setPostcodeError] = useState("");

    // const [inputValue, setInputValue] = useState("");
    // const [menuKey, setMenuKey] = useState(0);

    const { isEmailAvailable } = useEmailCheck(formData.email);

    useEffect(() => {
        dispatch(searchService({ search: "" }));
    }, [dispatch]);

    useEffect(() => {
        if (Array.isArray(service)) {
            const options = service.map((item) => ({
                value: item.id,
                label: item.name,
            }));
            setServiceOptions(options);

            if (!initialServiceLoaded && serviceId) {
                const autoService = options.find((o) => o.value === serviceId);
                if (autoService) {
                    // handleServiceChange(autoService, true);
                    setFormData((p) => ({
                        ...p,
                        service_name: autoService,
                        service_id: autoService.value,
                    }));

                    dispatch(setbuyerRequestData({
                        service_id: autoService.value,
                        service_name: autoService.label,
                    }));
                    setInitialServiceLoaded(true);
                }
            }
        }
    }, [service, serviceId, initialServiceLoaded]);

    // const loadOptions = useCallback(
    //     (value, callback) => {

    //         if (!value) {
    //             dispatch(searchService({ search: "" }));
    //             callback(serviceOptions); // show all services
    //             return;
    //         }

    //         dispatch(searchService({ search: value }));
    //         callback(serviceOptions);
    //     },
    //     [dispatch, serviceOptions]
    // );

    // const loadOptions = (_, callback) => {
    //     callback(serviceOptions);
    // };


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((p) => ({ ...p, [name]: value }));
        // dispatch(setbuyerRequestData({ ...buyerRequest, [name]: value }));
        dispatch(setbuyerRequestData({ [name]: value }));

        if (errors[name]) {
            setErrors((p) => ({ ...p, [name]: "" }));
        }
    };

    const handleServiceChange = (option, auto = false) => {
        if (!option) {
            setFormData((p) => ({ ...p, service_name: null, service_id: "" }));
            dispatch(setbuyerRequestData({ service_id: "", service_name: "" }));
            return;
        }

        setFormData((p) => ({
            ...p,
            service_name: option,
            service_id: option.value,
        }));

        dispatch(questionAnswerData({ service_id: option.value }));
        dispatch(
            setbuyerRequestData({
                service_id: option.value,
                service_name: option.label,
            })
        );

        if (auto) setInitialServiceLoaded(true);
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Full name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Full name must be at least 2 characters";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[0-9]{11}$/.test(formData.phone)) {
            newErrors.phone = "Please enter a valid 11-digit phone number";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.postcode.trim()) {
            newErrors.postcode = "Postcode is required";
        } else if (!postcodeValid) {
            newErrors.postcode = "Please enter a valid postcode";
        }

        if (!formData.service_id) {
            newErrors.service = "Please select a service!";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const canContinue = checkAuthenticatedUser(router);
        if (!canContinue) return;
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (!validateUKPhoneNumber(formData.phone)) return;

        const email = formData.email;

        const res = await dispatch(checkEmailIdApi({ email }));
        if (!res?.success) return;

        dispatch(
            setbuyerRequestData({
                name: formData.name,
                phone: formData.phone,
                email: email,
                postcode: formData.postcode,
                service_id: formData.service_id,
                service_name: formData.service_name?.label,
                additional_note: formData.notes
            })
        );
        nextStep();
    };

    useEffect(() => {
        if (formData.email && !isEmailAvailable) {
            setErrors((prev) => ({
                ...prev,
                email: "Email already exists",
            }));
        }
    }, [isEmailAvailable]);

    const normalizePostcode = (postcode) => {
        return postcode.replace(/\s+/g, "").toUpperCase();
    };

    const isValidUKPostcode = (postcode) => {
        const regex = /^([A-Z]{1,2}\d[A-Z\d]?)(\s?\d[A-Z]{2})$/i;
        return regex.test(postcode.trim());
    };

    const isFullPostcode = (postcode) => {
        const cleaned = normalizePostcode(postcode);
        return cleaned.length >= 5 && cleaned.length <= 7;
    };

    const handlePostcodeChange = async (e) => {
        const value = e.target.value.toUpperCase().slice(0, 10);

        setFormData((p) => ({ ...p, postcode: value }));
        setPostcodeError("");
        setPostcodeValid(false);

        const cleaned = normalizePostcode(value);

        // if (!value.trim() || value.length < 3) return;

        // Empty
        if (!value) {
            dispatch(setbuyerRequestData({ postcode: "" }));
            return;
        }

        // Don't validate partial
        if (!isFullPostcode(cleaned)) {
            return;
        }

        // Full but invalid → show error
        if (!isValidUKPostcode(value)) {
            setPostcodeValid(false);
            setPostcodeError("Please enter a valid postcode!");
            return;
        }

        setIsCheckingPostcode(true);

        try {
            const response = await dispatch(getCityName({ postcode: cleaned }));
            const data = response?.unwrap
                ? await response.unwrap()
                : response;

            if (data?.data?.valid) {
                setPostcodeValid(true);

                dispatch(setcitySerach(data.data.city));
                dispatch(setbuyerRequestData({ postcode: data.data.postcode }));

                setPostcodeError("");
                setErrors((prev) => ({
                    ...prev,
                    postcode: "",
                }));
            } else {
                setPostcodeValid(false);
                setPostcodeError("Please enter a valid postcode!");
            }
        } catch {
            setPostcodeValid(false);
            setPostcodeError("Please enter a valid postcode!");
        } finally {
            setIsCheckingPostcode(false);
        }
    };

    return (
        <FormWrapper>
            <div className="py-[10px] text-center">
                <H4 className="text-[#00afe3]">Get Free Customised Quotes</H4>
                {/* <Paragraph className="mt-[8px] font-bold mx-auto max-w-[70%] max-[640px]:max-w-[98%]">
                    Fill out the form to get free estimates from trusted and verified local professionals
                </Paragraph> */}
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col px-[27px] pb-[27px] max-[1024px]:px-[20px]"
            >
                {/* NAME */}
                <Label>Full Name *</Label>
                <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    placeholder="Enter Your Full Name"
                />
                <Error>{errors.name}</Error>

                {/* PHONE */}
                <Label>Phone Number *</Label>
                <Input
                    name="phone"
                    type="tel"
                    maxLength={11}
                    value={formData.phone}
                    onChange={(e) =>
                        handleInputChange({
                            target: {
                                name: "phone",
                                value: e.target.value.replace(/\D/g, ""),
                            },
                        })
                    }
                    error={errors.phone}
                    placeholder="Enter Mobile Number (Start With 0)"
                />
                <Error>{errors.phone}</Error>

                {/* EMAIL */}
                <Label>Email *</Label>
                <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    placeholder="Enter Your Email"
                />
                <Error>{errors.email}</Error>

                {/* POSTCODE */}
                <Label>Postcode *</Label>
                <div className="relative">
                    <input
                        name="postcode"
                        value={formData.postcode}
                        onChange={handlePostcodeChange}
                        placeholder="Enter Postcode (No Spaces)"
                        className={`
            w-full
            px-[16px] py-[14px]
            pl-[38px] pr-[38px]
            border rounded-[5px]
            font-[Arial] text-[16px]
            ${postcodeError || (errors.postcode && !postcodeValid)
                                ? "border-red-500"
                                : "border-[#D9D9D9]"
                            }`}
                    />

                    {/* LEFT ICON */}
                    <div className="absolute left-[12px] top-1/2 -translate-y-1/2">
                        <LocationPinIcon className="h-[16px] w-[16px] text-[#00afe3]" />
                    </div>

                    {/* RIGHT ICON */}
                    {isCheckingPostcode ? (
                        <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
                            <LoaderIndicator size="small" />
                        </div>
                    ) : postcodeValid ? (
                        <div className="absolute right-[10px] top-1/2 -translate-y-1/2">
                            <GreenCheckIcon className="h-[20px] w-[20px]" />
                        </div>
                    ) : null}
                </div>

                <span className="text-red-500 text-[12px]">
                    {postcodeError || (errors.postcode && !postcodeValid ? errors.postcode : "")}
                </span>

                {/* SERVICE */}
                <Label>What Service Do You Need? *</Label>
                {/* <AsyncSelect
                    key={menuKey}
                    instanceId="service-select"
                    // inputId="service-select-input"

                    cacheOptions={false}
                    loadOptions={loadOptions}
                    defaultOptions={serviceOptions}
                    // options={serviceOptions}
                    // onChange={handleServiceChange}
                    value={formData.service_name}
                    // inputValue=""
                    isSearchable={false}
                    placeholder="Select a service"
                    isLoading={searchServiceLoader}
                    styles={customStyles(errors.service)}
                    // onInputChange={(value, action) => {
                    //     if (action.action === "input-change") setInputValue(value);
                    // }}
                    onChange={(option, action) => {
                        // if (action.action === "clear") {
                        //     setInputValue("");
                        //     handleServiceChange(null);

                        //     dispatch(searchService({ search: "" }));
                        //     setMenuKey((k) => k + 1);

                        //     return;
                        // }
                        handleServiceChange(option);
                    }}
                    isClearable={false}
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuPosition="fixed"
                    menuShouldScrollIntoView={false}
                /> */}
                <Select
                    options={serviceOptions}
                    value={formData.service_name}
                    onChange={handleServiceChange}
                    isSearchable={false}
                    isClearable={false}
                    placeholder="Select a service"
                    styles={customStyles(errors.service)}
                    menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                    menuPosition="fixed"
                />
                <Error>{errors.service}</Error>

                {/* ADDITIONAL NOTES */}
                <Label>Additional Notes (Optional)</Label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="What should the professional know to better understand your request? (Provide any relevant details here.)"
                    className="
        w-full box-border
        px-[16px] py-[12px]
        bg-[#ffffff]
        rounded-[5px]
        font-[Arial] text-[16px]
        leading-[18px] tracking-[-0.03px]
        border border-[#D9D9D9]
        placeholder:!text-[#d9d9d9]
        resize-none
        md:min-h-[70px] min-h-[80px]
    "
                />

                {/* SUBMIT */}
                <button
                    type="submit"
                    disabled={questionLoader}
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
          "
                >
                    {questionLoader ? (
                        <LoaderIndicator />
                    ) : (
                        <>
                            Continue
                        </>
                    )}
                </button>

                <small className="mt-[16px] text-center text-[#C9C9C9] text-[12px]
                font-[Arial]
        tracking-[-0.03em]
        leading-[12px]
                
                ">
                    By submitting this form you agree to our Privacy Policy and Terms of
                    Service
                </small>
            </form>
        </FormWrapper>
    );
}

export default NewPPCLeadForm;


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
