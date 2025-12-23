"use client";

import React from 'react'

import { handleScrollToBottom } from "@/utils/scroll";
import CancelIcon from '../../common/icons/HomItWorksIcons/CancelIcon';
import UserCircleIcon from '../../common/icons/HomItWorksIcons/UserCircleIcon';
import BadgeIcon from '../../common/icons/HomItWorksIcons/BadgeIcon';


const RegisterNow = () => {
    return (
        <section aria-label="Register now benefits" className='flex flex-col gap-[30px] items-center py-25px mt-[30px] md:mt-[40px] lg:mt-[62px] mb-[60px] md:mb-[70px] lg:mb-[94px]'>
            <button type="button" aria-label="Register now" onClick={() => handleScrollToBottom()} className="text-[22px] md:text-[38px] py-[13px] px-[23px] gap-[9.49px] rounded-[10px] bg-[#00AFE3] text-white font-black tracking-[-0.03em] mt-[30px] cursor-pointer"
            >
                Register now
            </button>

            <div className="max-w-[320px] w-full md:max-w-full lg:w-[1094px] px-[30px] lg:px-0 flex flex-col gap-[20px] justify-around md:flex-row md:flex-wrap md:justify-between lg:flex-nowrap lg:items-center lg:px-[40px]"
            >
                {/* Item 1 */}
                <div className="flex items-center gap-[7px] lg:w-auto">
                    <div className="flex justify-center items-center rounded-full bg-[#00AFE3] w-[35px] h-[35px]">
                        <UserCircleIcon />
                    </div>
                    <p className="font-[Arial] font-bold text-[14px] md:text-[16px] xl:text-[20px]">
                        Create your account in minutes
                    </p>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-[7px] lg:w-auto">
                    <div className="flex justify-center items-center rounded-full bg-[#00AFE3] w-[35px] h-[35px]">
                        <BadgeIcon />
                    </div>
                    <p className="font-[Arial] font-bold text-[14px] md:text-[16px] xl:text-[20px]">
                        Start receiving leads today
                    </p>
                </div>

                {/* Item 3 – centered on tablet */}
                <div className="flex items-center gap-[7px] md:w-full md:justify-center lg:w-auto">
                    <div className="flex justify-center items-center rounded-full bg-[#00AFE3] w-[35px] h-[35px]">
                        <CancelIcon />
                    </div>
                    <p className="font-[Arial] font-bold text-[14px] md:text-[16px] xl:text-[20px]">
                        No commission or hidden fees
                    </p>
                </div>
            </div>
        </section>
    )
}

export default RegisterNow
