"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";

import CardLayoutWrapper from "./CardLayoutWrapper";
import {
    registerQuoteCustomer,
    setbuyerRequestData,
} from "@/lib/store/buyerslice/buyerSlice";
import { checkEmailIdApi } from "@/lib/store/findjobslice"
import { validateEmail } from "@/utils/validateEmail"
import { useEmailCheck } from "@/hooks/emailExist"
import { extractAllParams } from "@/utils/decodeURLParams"
import useUserInfo from "@/utils/getUserIp"
import Paragraph2 from "../UI/Typography/Paragraph2";

const EmailNewPPC = ({ nextStep, onBack, isPPCPages = false }) => {
    const { search } = useSearchParams();
    const allParams =
        typeof window !== "undefined" &&
        extractAllParams(search || window.location.search);

    const campaignid = allParams.gad_campaignid || "";
    const keyword = allParams.keyword || "";
    const gclid = allParams.gclid || "";
    const campaign = allParams.utm_campaign || "";
    const adGroup = allParams.AgId || "";
    const targetID = allParams.utm_term || "";
    const msclickid = allParams.utm_msclkid || "";
    const utm_source = allParams.utm_source || "";

    const { ip, url } = useUserInfo();
    const dispatch = useDispatch();

    const { searchServiceLoader } = useSelector((state) => state.findJobs);
    const { buyerRequest } = useSelector((state) => state.buyer);

    const [email, setEmail] = useState(buyerRequest?.email || "");
    const [inputType, setInputType] = useState("text");
    const [errors, setErrors] = useState({ email: false });
    const [emailErrorMessage, setEmailErrorMessage] = useState("");

    const { isEmailAvailable } = useEmailCheck(email);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setErrors({ email: false });
        setEmailErrorMessage("");

        dispatch(
            setbuyerRequestData({
                ...buyerRequest,
                email: e.target.value,
            })
        );
    };

    const handleSubmit = async () => {
        const emailInvalid =
            !isPPCPages && (!email || !validateEmail(email));

        if (emailInvalid) {
            setErrors({ email: true });
            setEmailErrorMessage("Please enter a valid email address.");
            return;
        }

        const finalEmail = isPPCPages ? buyerRequest?.email || "" : email;
        const res = await dispatch(checkEmailIdApi({ email: finalEmail }));

        if (!res?.success) return;

        dispatch(setbuyerRequestData({ email: finalEmail }));

        const answers = buyerRequest.questions?.map((q) => {
            if (!q || typeof q !== "object") return q;
            const { question_no, ...rest } = q;
            return rest;
        });

        const formData = new FormData();
        formData.append("name", buyerRequest?.name);
        formData.append("email", finalEmail);
        formData.append("phone", buyerRequest?.phone);
        formData.append("questions", JSON.stringify(answers));
        formData.append("service_id", buyerRequest?.service_id);
        formData.append("city", buyerRequest?.city);
        formData.append("postcode", buyerRequest?.postcode);
        formData.append("form_status", 1);
        formData.append("campaignid", campaignid);
        formData.append("gclid", gclid);
        formData.append("campaign", campaign);
        formData.append("adgroup", adGroup);
        formData.append("targetid", targetID);
        formData.append("msclickid", msclickid);
        formData.append("utm_source", utm_source);
        formData.append("keyword", keyword);
        formData.append("entry_url", url);
        formData.append("user_ip_address", ip);

        dispatch(registerQuoteCustomer(formData)).then((result) => {
            if (result) nextStep();
        });
    };

    const handleBackClick = () => {
        onBack();
    };

    useEffect(() => {
        if (!isEmailAvailable) {
            setEmail("");
            dispatch(setbuyerRequestData({ ...buyerRequest, email: "" }));
        }
    }, [isEmailAvailable]);


    return (
        <div className="max-w-[600px] mx-auto">
            <CardLayoutWrapper
                buttonWrapperClassName="px-[28px] pb-[24px] max-[768px]:px-[16px] max-[768px]:pb-[20px]"
                titleHeading="You're nearly done! Just enter a few details to get your custom quotes."
                onButtonClick={handleSubmit}
                onBackClick={handleBackClick}
                buttonText="Next"
                showBackButton={true}
                disableNextButton={searchServiceLoader}
                loader={searchServiceLoader}
            >
                <div className="flex flex-col mt-[30px] mb-2 w-[90%] max-w-[720px] mx-auto">
                    {/* Honeypot */}
                    <input
                        type="text"
                        name="username"
                        className="hidden"
                        autoComplete="new-password"
                        tabIndex={-1}
                    />

                    {/* Email input */}
                    <input
                        type={inputType}
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={() => setInputType("email")}
                        onBlur={() => !email && setInputType("text")}
                        placeholder="Email"
                        autoComplete="new-password"
                        name="user_email_address"
                        id="user_email_address"
                        className={`
              w-full rounded-[8px] px-[12px] py-[12px]
              font-[Arial] border
              tracking-[-0.03em] leading-[20px]
              border text-[16px] text-[#253238]
              placeholder:!text-[#828282]
              focus:outline-none
              focus:border-[#00aef0]
              focus:ring-[3px] focus:ring-[rgba(0,150,196,0.1)]
              ${errors.email ? "border-red-500" : "border-[#d9d9d9]"}
                max-[768px]:text-[14px] max-[768px]:px-[10px]
                    max-[768px]:h-[52px] max-[768px]:text-[15px]
                    max-[480px]:h-[48px] max-[480px]:text-[14px]
            `}
                    />

                    {errors.email && (
                        <span className="text-red-500 text-[12px] font-[Arial]
                         tracking-[-0.03em] text-left mt-1">
                            {emailErrorMessage}
                        </span>
                    )}

                    <Paragraph2 className="bg-[rgba(233,248,255,1)]
            w-fit mx-auto mt-[33px]
            px-[10px] py-[5px] text-center
            rounded-[5px] max-[768px]:mx-[16px]
         ">
                        We only use this to match you with trusted professionals.
                    </Paragraph2>
                </div>
            </CardLayoutWrapper>
        </div>
    );
};

export default EmailNewPPC;
