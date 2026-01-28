"use client";

import { useEffect, useState } from "react";
import CookiesConsentPreference from "./CookiesConsentPreference";
import { getCookie, setCookie } from "@/utils/CookiesHelper";

const CookieConsent = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;

        const userConsent = getCookie("user-consent");

        if (!userConsent) {
            setTimeout(() => setShowBanner(true), 6000);
        }

        window.uetq = window.uetq || [];
        window.uetq.push("consent", "default", { ad_storage: "denied" });
    }, []);

    const handleAcceptAll = () => {
        setCookie("user-consent", "granted", 365);

        window.uetq.push("consent", "update", {
            ad_storage: "granted",
        });

        setShowBanner(false);
        setShowPreferences(false);
    };

    const handleSavePreferences = ({ essential, nonEssential }) => {
        if (typeof window === "undefined") return;

        const finalValue = nonEssential ? "granted" : "denied";

        setCookie("user-consent", finalValue, 365);

        window.uetq = window.uetq || [];
        window.uetq.push("consent", "update", {
            ad_storage: finalValue,
        });

        setShowPreferences(false);
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-opacity duration-300">
                <div className="py-[10px] md:py-6 lg:py-7 px-3 md:px-[50px] lg:px-[150px]">
                    <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-8">
                        {/* Left */}
                        <div className="flex-1 md:w-2/3 md:px-4 lg:px-5">
                            <h3
                                className="
                                    text-[16px] md:text-[18px] lg:text-[20px]
                                    leading-[20px] md:leading-[22px] lg:leading-[24px]
                                 text-[#253238]
                                     font-Inter
                                     font-black
                                    tracking-[-0.03em]
                                    mb-1 md:mb-3 lg:mb-4" >
                                Tailor my experience with cookies
                            </h3>

                            <p className="font-[Arial] tracking-[-0.03em] text-[12px] md:text-[15px] lg:text-[15px] leading-[1.4] text-[#888888]">
                                Localists uses cookies and similar technologies to personalise my
                                experience, serve me relevant content, and improve Localists
                                products and services. By clicking ‘Accept’ I agree to this, as
                                further described in the Localists Cookie Policy. I can reject
                                non-essential cookies by clicking ‘Manage Preferences’.
                            </p>
                        </div>

                        {/* Right */}
                        <div className="w-full md:w-[30%] flex flex-col items-center md:items-end justify-center gap-2 md:gap-[10px] lg:gap-3 md:px-4 lg:px-5">
                            <button
                                onClick={handleAcceptAll}
                                className="font-[Arial]
                  tracking-[-0.03em]
                  w-full
                  max-w-full
                  sm:max-w-[250px]
                  md:max-w-[265px]
                  px-4
                  py-2
                  md:py-[11px]
                  lg:py-3
                  text-[12px]
                  md:text-[14px]
                  leading-[18px]
                  md:leading-[20px]
                  font-medium
                  text-white
                  bg-[#253238]
                  rounded-[10px]
                  hover:bg-[#333333]
                  transition cursor-pointer
                "
                            >
                                Accept All Cookies
                            </button>

                            <button
                                onClick={() => setShowPreferences(true)}
                                className="font-[Arial]
                 tracking-[-0.03em]
                  w-full
                  max-w-[250px]
                  md:max-w-[265px]
                  px-4
                  py-1
                  md:py-[11px]
                  text-[13px]
                  md:text-[14px]
                  leading-[18px]
                  md:leading-[20px]
                  font-medium
                  text-[#253238]
                  bg-white
                  rounded
                  transition
                  cursor-pointer
                "
                            >
                                Manage Preferences
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showPreferences && (
                <CookiesConsentPreference
                    onClose={() => setShowPreferences(false)}
                    onSave={handleSavePreferences}
                />
            )}
        </>
    );
};

export default CookieConsent;
