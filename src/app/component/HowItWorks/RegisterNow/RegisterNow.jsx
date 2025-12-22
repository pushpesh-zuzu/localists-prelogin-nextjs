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

            <div className='max-w-[320px] md:max-w-[400px] lg:max-w-[100%]  flex flex-col items-start lg:flex-row lg:items-center gap-[20px] w-full lg:w-auto px-[30px] lg:px-auto'>
                <div className='flex justify-center items-center gap-[7px]'>
                    <div className='flex justify-center items-center rounded-full bg-[#00AFE3] w-[35px] h-[35px]'>
                        <UserCircleIcon />
                    </div>

                    <p className='font-[Arial] font-bold text-[14px]  md:text-[16px] xl:text-[20px]'>Create your account in minutes</p>
                </div>

                <div className='flex justify-center items-center gap-[7px]'>
                    <div className='flex justify-center items-center rounded-full bg-[#00AFE3] w-[35px] h-[35px]'>
                        <BadgeIcon />
                    </div>

                    <p className='font-[Arial] font-bold text-[14px] md:text-[16px] xl:text-[20px]'>Start receiving leads today</p>
                </div>


                <div className='flex justify-center items-center gap-[7px]'>
                    <div className='flex justify-center items-center rounded-full bg-[#00AFE3] w-[35px] h-[35px]'>
                        <CancelIcon  />
                    </div>

                    <p className='font-[Arial] font-bold text-[14px] md:text-[16px] xl:text-[20px]'>No commission or hidden fees</p>
                </div>

            </div>
        </section>
    )
}

export default RegisterNow
