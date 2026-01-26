"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import GetQuotesIcon from "../../../../public/ReactIcons/GetQuotesIcon";
import FormWrapper from "./FormWrapper";

import {
    questionAnswerData,
    setbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import { searchService } from "@/lib/store/findjobslice";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
import { useEmailCheck } from "@/hooks/emailExist";
import { handleScrollToBottom } from "@/utils/handleScrollToBottom"
import LoaderIndicator from "../common/Loader/LoaderIndicatore";
import H4 from "../UI/Typography/H4";

const AsyncSelect = dynamic(
    () => import("react-select/async"),
    { ssr: false }
);

function NewPPCForm({ nextStep, serviceId }) {
    const dispatch = useDispatch();
    const { buyerRequest, questionLoader } = useSelector((s) => s.buyer);
    const { searchServiceLoader, service } = useSelector((s) => s.findJobs);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        service_name: null,
        service_id: "",
    });

    const [errors, setErrors] = useState({});
    const [serviceOptions, setServiceOptions] = useState([]);
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [initialServiceLoaded, setInitialServiceLoaded] = useState(false);

    const searchTimeout = useRef(null);
    const lastSearchValue = useRef("");

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
                    handleServiceChange(autoService, true);
                    setInitialServiceLoaded(true);
                }
            }
        }
    }, [service, serviceId, initialServiceLoaded]);

    const loadOptions = useCallback(
        (inputValue, callback) => {
            if (searchTimeout.current) clearTimeout(searchTimeout.current);

            if (lastSearchValue.current === inputValue) {
                callback(serviceOptions);
                return;
            }

            lastSearchValue.current = inputValue;

            searchTimeout.current = setTimeout(() => {
                dispatch(searchService({ search: inputValue || "" }));
                setTimeout(() => callback(serviceOptions), 100);
            }, 300);
        },
        [dispatch, serviceOptions]
    );


    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormData((p) => ({ ...p, [name]: value }));
        dispatch(setbuyerRequestData({ ...buyerRequest, [name]: value }));

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

        if (!formData.service_id) {
            newErrors.service = "Please select a service!";
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        if (!validateUKPhoneNumber(formData.phone)) return;

        dispatch(
            setbuyerRequestData({
                name: formData.name,
                phone: formData.phone,
                service_id: formData.service_id,
                service_name: formData.service_name.label,
            })
        );
        nextStep();
    };

    useEffect(() => {
        if (!isEmailAvailable) {
            dispatch(setbuyerRequestData({ ...buyerRequest, email: "" }));
            handleScrollToBottom();
        }
    }, [isEmailAvailable]);

    return (
        <FormWrapper>
            <div className="py-[16px] text-center">
                <H4 className="text-[#00afe3]">Get Free Customised Quotes</H4>
                <Paragraph className="mt-[8px] font-bold mx-auto max-w-[70%] max-[640px]:max-w-[98%]">
                    Fill out the form to get free estimates from trusted and verified local professionals
                </Paragraph>
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
                    placeholder="Enter your full name"
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
                    placeholder="Enter your phone number"
                />
                <Error>{errors.phone}</Error>

                {/* SERVICE */}
                <Label>What Service Do You Need? *</Label>
                <AsyncSelect
                    instanceId="service-select"
                    inputId="service-select-input"

                    cacheOptions={false}
                    loadOptions={loadOptions}
                    defaultOptions={serviceOptions}
                    options={serviceOptions}
                    onChange={handleServiceChange}
                    value={formData.service_name}
                    placeholder="Search for a service..."
                    isLoading={searchServiceLoader}
                    styles={customStyles(errors.service)}
                    isClearable
                    menuIsOpen={menuIsOpen}
                    onMenuOpen={() => setMenuIsOpen(true)}
                    onMenuClose={() => setMenuIsOpen(false)}
                />
                <Error>{errors.service}</Error>

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
                            Continue <GetQuotesIcon color="#fff" />
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

export default NewPPCForm;


const Label = ({ children }) => (
    <label className="mt-[14px] mb-[8px] font-[Arial]
        tracking-[-0.03em]
        leading-[24px]
        text-[#253238]
        text-[20px] font-bold
        max-[768px]:text-[18px]
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
});
