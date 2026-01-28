"use client";

import { useState } from "react";

export default function CookiesConsentPreference({ onClose, onSave }) {
    const [essential] = useState(true);
    const [nonEssential, setNonEssential] = useState(false);

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/55 p-4">
            {/* Modal */}
            <div className="w-full max-w-[520px] max-h-[80vh] overflow-y-auto rounded-xl bg-white p-6 shadow-[0_6px_30px_rgba(0,0,0,0.2)] sm:p-6">
                {/* Title */}
                <h2 className="font-Inter text-[#253238]
        tracking-[-0.03em] mb-3 text-[20px] leading-[24px] font-semibold">
                    Manage Cookie Preferences
                </h2>

                {/* Description */}
                <p className="font-[Arial] tracking-[-0.03em] text-[14px] md:text-[15px] lg:text-[15px] leading-[1.4] mb-[22px] text-[#666]">
                    Cookies are widely used in order to make websites work more effectively
                    by storing and retrieving information from browsers. This information
                    might be about the visitor, their preferences or their device and does
                    not generally identify an individual person but includes a unique
                    identifier for the visitor’s browser. Rejecting cookies may negatively
                    affect the website experience.
                </p>

                {/* Essential Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[16px] font-semibold">Essential</span>

                        {/* Toggle */}
                        <label className="relative inline-block h-6 w-[44px]">
                            <input
                                type="checkbox"
                                checked={essential}
                                readOnly
                                className="peer sr-only"
                            />
                            {/* Track */}
                            <span className="absolute inset-0 rounded-full bg-[#c2c0c0]" />

                            {/* Thumb */}
                            <span className="absolute left-[3px] top-[3px] h-[18px] w-[18px] translate-x-[20px] rounded-full bg-white" />
                        </label>
                    </div>

                    <p className="font-[Arial] tracking-[-0.03em] text-[14px] md:text-[15px] lg:text-[15px] leading-[1.4] mt-1.5 text-[#666]">
                        Essential cookies are required for the website to operate, for
                        example, to identify users as being logged into the website and to
                        help in detecting bugs or other defects in the experience.
                    </p>
                </div>

                {/* Non-Essential Section */}
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <span className="text-[16px] font-semibold">Non-Essential</span>

                        {/* Toggle */}
                        <label className="relative inline-block h-6 w-[44px]">
                            <input
                                type="checkbox"
                                checked={nonEssential}
                                onChange={() => setNonEssential(!nonEssential)}
                                className="peer sr-only"
                            />
                            {/* Track */}
                            <span className="absolute inset-0 rounded-full bg-[#c3baba] transition peer-checked:bg-[#2c2c2c]" />

                            {/* Thumb */}
                            <span className="absolute left-[3px] top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-transform duration-300 peer-checked:translate-x-[20px]" />
                        </label>
                    </div>

                    <p className="font-[Arial] tracking-[-0.03em] text-[14px] md:text-[15px] lg:text-[15px] leading-[1.4] mt-1.5 text-[#666]">
                        Non-essential cookies include cookies used by Localists and third
                        parties, such as ad networks and advertising partners, to make
                        advertising more relevant. Some of these cookies collect information
                        about a visitor’s activity across different devices and third-party
                        websites.
                    </p>
                </div>

                {/* Buttons */}
                <div className="mt-5 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="font-[Arial]
                 tracking-[-0.03em] cursor-pointer bg-transparent px-4 py-[10px] text-[14px]
                        text-[#253238]"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => onSave({ essential, nonEssential })}
                        className="font-[Arial]
                 tracking-[-0.03em] cursor-pointer rounded-[10px] bg-[#253238] hover:bg-[#333333] px-[18px] py-[10px] text-[14px] text-white sm:text-[14px]"
                    >
                        Save Preferences
                    </button>
                </div>
            </div>
        </div >
    );
}
