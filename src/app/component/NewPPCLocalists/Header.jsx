import React from "react";
import Image from "next/image";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";

function Header() {
    return (
        <header>
            <div
                className="w-full top-0 left-0 border-b border-[#DEDEDE] bg-white z-50"
                role="banner"
            >
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
                        <div className="flex items-center justify-center gap-3.5 md:gap-5 mt-1 md:mt-0">
                            <Image
                                src="/newppc/checkimage.png"
                                alt="Localists Checkatrade Rating"
                                width={193}
                                height={70}
                                priority
                                className="h-auto w-auto max-h-[65px] md:max-h-[70px] xl:max-h-[70px]
               rounded-[5px] md:shadow-[2px_2px_5px_0_#707070] shadow-[0_1px_5px_#0003]"
                            />

                            <Image
                                src="/newppc/googlestar.png"
                                alt="Localists Google Rating"
                                width={193}
                                height={70}
                                priority
                                className="h-auto w-auto max-h-[65px] md:max-h-[70px] xl:max-h-[70px]
               rounded-[5px] md:shadow-[2px_2px_5px_0_#707070] shadow-[0_1px_5px_#0003]"
                            />
                        </div>
                    </div>

                </WrapperBGWidth>
            </div>
        </header>
    );
}

export default Header;