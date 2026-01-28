"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function MobileSlideInSearch({
    isOpen,
    setIsOpen,
    services,
    dispatch,
    searchService,
    mobileSearchText,
    setMobileSearchText,
}) {
    // route map
    const serviceRouteMap = {
        49: "/fencing-contractors-near-me",
        51: "/driveway-installers-near-me",
        52: "/patio-layers-near-me",
        54: "/artificial-grass-installers-near-me",
        43: "/landscape-gardeners-near-me",
        112: "/tree-surgeon-near-me",
    };

    const [debouncedText, setDebouncedText] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchInputRef = useRef(null);

    const router = useRouter();
    const params = useParams();

    const currentLang = params?.lang || "en";
    const currentCountry = params?.country || "gb";

    const closeSearch = () => {
        setIsOpen(false);
        setMobileSearchText("");
        setShowSuggestions(false);
    };

    const handleServiceClick = (service) => {
        const route = serviceRouteMap[service.id];
        if (route) {
            // router.push(`/${currentLang}/${currentCountry}${route}`);
            closeSearch();
        }
    };

    // 🔁 Debounce input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedText(mobileSearchText);
        }, 300);
        return () => clearTimeout(timer);
    }, [mobileSearchText]);

    // 🔍 Search API call
    useEffect(() => {
        dispatch(
            searchService({
                search: debouncedText.trim() ? debouncedText : "",
            })
        );
    }, [debouncedText, dispatch, searchService]);

    // 🎯 Auto-focus
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            setTimeout(() => searchInputRef.current.focus(), 120);
        }
    }, [isOpen]);

    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
                onClick={closeSearch}
            />

            {/* Slide-in panel */}
            <div
                className={`fixed inset-y-0 right-0 z-[70] w-full bg-white transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Search header */}
                <div className="flex items-center gap-3 border-b border-[#E5E5E5] px-4 py-3">
                    <button
                        onClick={closeSearch}
                        className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F3F3F3]"
                    >
                        <ArrowLeft className="h-5 w-5 text-[#253238]" />
                    </button>

                    <input
                        ref={searchInputRef}
                        type="text"
                        placeholder="Search for a service"
                        value={mobileSearchText}
                        onChange={(e) => {
                            setMobileSearchText(e.target.value);
                            setShowSuggestions(true);
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        className="w-full border-none text-[16px] font-bold outline-none placeholder:text-[#999]"
                    />
                </div>

                {/* Suggestions */}
                {showSuggestions && (
                    <ul className="divide-y divide-[#E6E6E6] border-t border-[#E6E6E6] max-h-[calc(100vh-56px)] overflow-y-auto px-4 py-2">
                        {services?.length ? (
                            services.map((service, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleServiceClick(service)}
                                    className="font-[Arial] tracking-[-0.03em] cursor-pointer rounded-md px-2 py-2 text-[15px] text-[#253238] hover:bg-[#F3F3F3]"
                                >
                                    {service.name}
                                </li>
                            ))
                        ) : (
                            <li className="py-4 text-center text-[14px] text-[#777]">
                                {mobileSearchText
                                    ? "No services found"
                                    : "Start typing to search services. Example: patio, business, home"}
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </>
    );
}
