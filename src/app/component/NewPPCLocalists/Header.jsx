import React from "react";
import Image from "next/image";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function Header() {
    return (
        <header>
            <div
                className="w-full top-0 left-0 border-b border-[#DEDEDE] bg-white z-50"
                role="banner">
                <WrapperBGWidth>
                    <div className="flex flex-col md:flex-row items-center md:items-center justify-between md:px-[70px] lg:px-12 xl:px-61.5 pt-1 pb-2 md:pt-2.5 md:pb-2.5 xl:pt-[10px] xl:pb-3">

                        {/* Left Logo */}
                        <div className="flex items-center">
                            <Image
                                src="/newppc/rooflogo.svg"
                                alt="First Response Localists Roofing"
                                width={200}
                                height={101}
                                priority
                                className="h-auto w-auto max-h-[75px] md:max-h-[93px] xl:max-h-[100px]"
                            />
                        </div>

                        {/* Right Ratings */}
                        <div className="flex items-center justify-center gap-3 md:gap-5 mt-1 md:mt-0">
                            <div className="relative w-[160px] md:w-[170px] h-[65px] md:h-[70px] xl:h-[70px]">
                                <Image
                                    src="/newppc/checkimage.webp"
                                    alt="Localists Checkatrade Rating"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 160px, 170px"
                                    className="rounded-[5px] md:shadow-[2px_2px_5px_0_#707070] shadow-[0_1px_5px_#0003]"
                                />
                            </div>
                            <div className="relative w-[160px] md:w-[170px] h-[65px] md:h-[70px] xl:h-[70px]">
                                <Image
                                    src="/newppc/googlestar.webp"
                                    alt="Localists Google Rating"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 160px, 170px"
                                    className="rounded-[5px] md:shadow-[2px_2px_5px_0_#707070] shadow-[0_1px_5px_#0003]"
                                />
                            </div>
                        </div>
                    </div>

                </WrapperBGWidth>
            </div>
        </header>
    );
}

export default Header;