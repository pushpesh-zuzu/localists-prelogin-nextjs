import React from "react";
import GetQuote from "../common/GetQuotes/GetQuote";
import H2 from "../UI/Typography/H2";
import Paragraph from "../UI/Typography/Paragraph";
import NearmeH2Heading from "./NearmeH2Heading";

export default function DynamicPricingTable({
    title,
    prices = [],
    disclaimer,
    calculatorLink,
    calculatorText = "Roofing Calculator",
    heading = '',
    classNameLeft ="justify-between"
}) {
    return (
        <div className="flex items-center justify-center lg:pb-[72px] pb-[30px] md:pb-9 pt-2 md:pt-3 lg:pt-[47px]">
            <div className="w-full max-w-[1000px]">
                {heading && <NearmeH2Heading
                    headdingblue={heading}
                    className={`mb-5 mt-[7px] md:mt-0 md:mb-[25px]`}
                />}
                <div
                    className="w-full rounded-[30px] h-full md:rounded-[25px]"
                    style={{ backgroundColor: "#8BFFCF" }}
                >
                    <div className="flex flex-col min-h-full lg:flex-row lg:gap-6 items-stretch">

                        {/* Left Section */}
                        <div className={`flex flex-col h-auto flex-1 ${classNameLeft}  px-2.5 pt-[30px] lg:pl-[38px] lg:pt-[54px] lg:pb-[52px] lg:max-w-[50%] lg:min-w-[386px] xl:min-w-[386px] xl:max-w-[50%]`}>
                            <H2 variant="optional" className="text-center min-[460px]:mx-auto md:mx-0 md:max-w-full lg:text-left ">
                                {title}
                            </H2>

                            <div className="hidden lg:flex mt-6 lg:mt-0 justify-center lg:justify-start">
                                <GetQuote classGetQuote="py-[7px] xl:py-3 xl:px-[30px]" text="Get a real quote" />
                            </div>
                        </div>

                        {/* Price Grid */}
                        <div className="xl:max-w-[57%] xl:min-w-[50%] grid grid-cols-2 lg:grid-cols-2 gap-x-[14px] gap-y-5 lg:gap-x-5 px-[10px] min-[450px]:px-20 lg:px-0 pt-[23px] pb-[38px] lg:py-16 lg:pr-7">

                            {prices.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col h-full justify-between">
                                        <Paragraph
                                            variant="optional"
                                            className="md:mx-auto tracking-[-0.03em]! text-left min-[450px]:text-center min-[450px]:mx-auto md:text-center md:max-w-[220px] lg:max-w-[90%]"
                                        >
                                            {item.text}
                                        </Paragraph>

                                        {item?.price && <p className="text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] font-black text-center text-[#253238] mt-3 md:mt-3 lg:mt-3">
                                            {item.price}
                                        </p>}
                                    </div>

                                    {index === 1 && (
                                        <div className="col-span-2 border-t-[3.84px] border-[#253237]"></div>
                                    )}
                                </React.Fragment>
                            ))}

                            <div className="flex lg:hidden col-span-2 mt-5 md:mt-2.5 justify-center">
                                <GetQuote variant="primary" text="Get a real quote" />
                            </div>

                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-2.5 text-left">
                    <p className="text-[12px] leading-[12px] lg:text-[20px] lg:leading-[24px] font-[Arial] tracking-[0em]! font-bold">
                        {disclaimer}{" "}
                        {calculatorLink ? (
                            <>
                                <a href={calculatorLink} className="underline text-[#00AFE3] font-bold">
                                    {calculatorText}
                                </a>
                                .
                            </>
                        ) : (
                            <>
                                <span className="underline text-[#00AFE3] font-bold cursor-default">
                                    {calculatorText}
                                </span>
                                .
                            </>
                        )}
                    </p>
                </div>

            </div>
        </div>
    );
}