"use client";

import { useState } from "react";
import axiosInstance from "@/lib/store/axios";
import { showToast } from "@/utils/toaster";
import { validateUKPhoneNumber } from "@/utils/formatUKPhoneNumber";
// import SEO from "../common/SEO";
import {
    contactUsBanner,
    contactUsMap,
} from "../../../../public/images/MainBanners";
import H1 from "../UI/Typography/H1";
import BannerWrapper from "../common/bannerWrapper/BannerWrapper";
import H2 from "../UI/Typography/H2";

const ContactUs = () => {
    const [loading, setLoading] = useState(false);
    const [customerType, setCustomerType] = useState("customer");

    const [formData, setFormData] = useState({
        fullName: "",
        phoneNumber: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    //   const onSubmit = async (e) => {
    //     e.preventDefault();

    //     if (!validateUKPhoneNumber(formData.phoneNumber)) return;

    //     try {
    //       setLoading(true);

    //       const payload = {
    //         full_name: formData.fullName,
    //         phone: formData.phoneNumber,
    //         email: formData.email,
    //         user_type: customerType === "customer" ? 1 : 2,
    //         message: formData.message,
    //       };

    //       const response = await axiosInstance.post("contact-us", payload);

    //       if (response.data.success) {
    //         showToast("success", "Thank You, We'll get back to you soon!");
    //         setFormData({
    //           fullName: "",
    //           phoneNumber: "",
    //           email: "",
    //           message: "",
    //         });
    //       } else {
    //         showToast("error", response.data.message);
    //       }
    //     } catch {
    //       showToast("error", "Please try again after some time");
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    return (
        <>
            {/* <SEO bannerImage={contactUsBanner} /> */}
            <div
                className="relative w-full flex items-center justify-center
                   h-[clamp(250px,40vw,400px)]
                   bg-cover bg-center"
                style={{ backgroundImage: `url(${contactUsBanner.src})` }}
            >
                <div className="absolute inset-0 bg-black/40" />
                <H1 className="relative z-10 text-white px-[20px]">
                    Contact Us
                </H1>
            </div>

            {/* Form Section */}
            <div
                className="w-full flex flex-col items-center
                   bg-[#00afe3]
                   rounded-[20px]
                   mt-[clamp(50px,6vw,83px)]
                   mb-[clamp(50px,6vw,89px)]
                   px-[clamp(20px,4vw,32px)]
                   py-[clamp(20px,4vw,32px)]
                   gap-[clamp(20px,4vw,35px)]
                   max-w-[85%] mx-auto
                   min-h-[570px]
                   max-xl:max-w-[90%]
                   max-sm:max-w-[95%]"
            >
                <H2 className="text-white text-center
                       text-[clamp(24px,5vw,32px)]">
                    Get in touch with our Team
                </H2>

                {/* <style jsx>{`
                                input::placeholder {
                                color: #959595;
                                opacity: 1; }`}</style> */}

                <form className="w-full flex flex-col gap-4">

                    <div className="flex flex-col md:flex-row gap-[clamp(12px,2vw,20px)]">
                        <div className="flex-1 flex flex-col gap-[8px]">
                            <label className="text-[19px] leading-[100%] tracking-[-0.03em] text-black font-[Arial] mb-[7px]">
                                Full Name
                                <span className="text-red-500 ml-[2px]">*</span>
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                placeholder={"Enter Full Name"}
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="px-[16px] py-[12px] rounded-[10px] bg-white
                           text-black outline-none"
                            />
                        </div>

                        <div className="flex-1 flex flex-col gap-[8px]">
                            <label className="text-[19px] leading-[100%] tracking-[-0.03em] text-black font-[Arial] mb-[8px]">
                                Phone Number
                                <span className="text-red-500 ml-[2px]">*</span>
                            </label>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder={"Enter Phone Number"}
                                maxLength={11}
                                value={formData.phoneNumber}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        phoneNumber: e.target.value.replace(/\D/g, "").slice(0, 11),
                                    }))
                                }
                                required
                                className="px-[16px] py-[12px] rounded-[10px] bg-white
                           text-black outline-none"
                            />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-col md:flex-row gap-[clamp(12px,2vw,20px)]">
                        <div className="flex-1 flex flex-col gap-[8px]">
                            <label className="text-[19px] leading-[100%] tracking-[-0.03em] text-black font-[Arial] mb-[8px]">
                                Email
                                <span className="text-red-500 ml-[2px]">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder={"Enter Email"}
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="px-[16px] py-[12px] rounded-[10px] bg-white
                           text-black outline-none"
                            />
                        </div>

                        {/* Customer Type */}
                        <div className="flex-1 max-w-[300px] flex flex-col gap-[8px]">
                            <label className="text-[19px] tracking-[-0.03em] text-black font-[Arial] max-md:hidden">
                                &nbsp;
                            </label>

                            <div className="relative flex justify-start h-[44.52px] bg-white rounded-full overflow-hidden">
                                <div
                                    className={`absolute top-[3.06px] left-[3.54px]
                              h-[38.41px] w-1/2 rounded-full
                              bg-[#00AFE3]
                              transition-transform duration-300
                              ${customerType === "professional"
                                            ? "translate-x-[calc(100%-7.08px)]"
                                            : ""
                                        }`}
                                />
                                {["customer", "professional"].map((type) => (
                                    <button
                                        key={type}
                                        type="button"
                                        onClick={() => setCustomerType(type)}
                                        className={`relative z-10 cursor-pointer flex-1 text-[19px] leading-[100%] tracking-[-0.03em] font-[500] font-[Arial]
                                ${customerType === type
                                                ? "text-white"
                                                : "text-black "
                                            }`}
                                    >
                                        {type.charAt(0).toUpperCase() + type.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-[8px]">
                        <label className="text-[19px] leading-[100%] tracking-[-0.03em] text-black font-[Arial] mb-[8px]">
                            Message
                            <span className="text-red-500 ml-[2px]">*</span>
                        </label>
                        <textarea
                            name="message"
                            placeholder={"Enter Message"}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            className="min-h-[120px] px-[16px] py-[12px]
                         rounded-[10px] bg-white text-black
                         outline-none resize-y"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="mx-auto mt-4 w-[92px] h-[50px]
                       bg-black text-white rounded-[10px]
                       text-[19px] font-medium cursor-pointer
                       hover:bg-black/80 transition"
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Map */}
            {/* <div
                className="w-full h-[clamp(200px,40vw,405px)]
                   bg-cover bg-center rounded-[8px]
                   border-t border-[#ddd]
                   mb-[clamp(32px,5vw,63px)]
                   max-sm:h-[100px]"
                style={{ backgroundImage: `url(${contactUsMap.src})` }}
            /> */}
        </>
    );
};

export default ContactUs;
