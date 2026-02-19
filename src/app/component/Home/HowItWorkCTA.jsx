"use client";

import Button from "../UI/Typography/Button";
import { handleScrollToBottom } from "@/utils/scroll";

export default function HowItWorkCTA() {
    return (
        <div className="flex justify-center">
            <Button variant="primary" onClick={() => { handleScrollToBottom() }} className="cursor-pointer rounded-full max-w-fit bg-[#10C87B] hover:bg-[#00aef3] text-white mt-[30px] lg:mt-[47px] px-[15px] md:px-[18px] py-2 xl:py-[15px] xl:px-8 leading-normal!">
                Get Started
            </Button>
        </div>
    );
}
