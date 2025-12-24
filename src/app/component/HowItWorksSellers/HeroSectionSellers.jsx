"use client";

import React from 'react'
import { useState } from "react";
import { showToast } from "@/utils/toastify";
import Image from "next/image";

const HeroSectionSellers = () => {
    const [selectedService, setSelectedService] = useState(null);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (service) {
    //             dispatch(searchService({ search: service }));
    //         }
    //     }, 500);

    //     return () => clearTimeout(timer);
    // }, [service, dispatch])

    const handleContinue = () => {
        if (!selectedService) {
            showToast("error", "Please select a service from the suggestions.");
            return;
        }
    }

    return (
        <section className="relative flex flex-col items-center justify-center h-auto px-[208px] py-[65.5px] max-[1280px]:px-[100px] max-[980px]:px-[50px] max-[480px]:px-[10px] max-[480px]:py-[20px] lg:min-h-[633px]">
            <Image
                src="/images/HowItWorks/howitworkseller.webp"
                alt="How it works for sellers"
                fill
                priority
                quality={95}
                sizes="100vw"
                className="object-cover object-[80%_center] sm:object-center"
            />

            <div className="relative flex flex-col items-center justify-center">
                <div className="flex flex-col items-center w-full">
                    <h1 className="font-black text-black text-[46px] md:text-[60px] lg:text-[81px] leading-[48px]  md:leading-[55px] lg:leading-[75px] tracking-[-0.03em] font-inter text-center">
                        How It Works – <span className="text-[#00AFE3]">Localists</span> for Professionals
                    </h1>
                    <div className="w-full xl:w-[1024px] bg-white/90 rounded-[10px] px-[30px] py-[32px] flex flex-col justify-center items-center mt-[20px] lg:mt-10px lg:mt-[22px]">

                        <p className="font-[Arial] font-bold text-[24px] leading-[24px] text-[#00afe3] text-center">
                            5,000+ UK professionals trust Localists to grow. Get new jobs every day, select only the ones you want, and connect instantly with clients.
                        </p>

                        <form role="search" className="flex flex-col justify-between  mt-[30px] w-full">
                            <div className="flex flex-col items-center">
                                <div className="flex flex-col lg:flex-row gap-[18px] w-full">
                                    <div className="flex flex-col items-center flex-1 text-left relative">
                                        <label htmlFor="service" className="font-bold text-[20px] leading-[22px] tracking-[-0.03em] text-black font-[Arial] mb-[7px] text-center">
                                            What service do you provide?
                                        </label>

                                        <input
                                            id="service"
                                            type="text"
                                            className="font-[Arial] font-bold !text-black border border-[#D9D9D9] rounded-[5px] pl-[12px] md:pl-[16px] pr-[22px] pt-[13px] pb-[13px] w-full shadow-[0_0_2px_0.5px_rgba(0,0,0,0.10)] max-w-[690px]"
                                            placeholder="Architects, Landscaping, ..."
                                        />
                                    </div>
                                </div>

                                <button type="button" aria-haspopup="dialog" className="py-[13px] px-[33px] gap-[9.49px] rounded-[94.94px] bg-[#253238] text-white text-[16px] lg:text-[18px] font-[Arial] font-bold tracking-[-0.03em] shadow-[0px_1.9px_1.9px_rgba(0,0,0,0.1)] mt-[30px] cursor-pointer"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSectionSellers
