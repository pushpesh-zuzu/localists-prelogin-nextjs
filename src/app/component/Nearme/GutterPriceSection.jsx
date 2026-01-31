import React from 'react';

const GutterPriceSection = () => {
    return (
        <div className="w-full mx-auto mb-[20px] md:mb-[25px] lg:mb-[35px]">
            {/* Pricing Table */}
            <table className="w-full border-collapse">
                <tbody>
                    {/* First Row */}
                    <tr>
                        <td
                            rowSpan="2"
                            className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em] w-[30%]"
                        >
                            <div className="flex flex-col h-full min-h-[200px] justify-start md:justify-between">
                                <span className="mb-[90px] md:mb-0">
                                    Average Cost of gutter cleaning is £150
                                </span>

                                <span className="mt-[50px] md:mt-0">
                                    Get real quotes now
                                </span>
                            </div>
                        </td>
                        <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                            Average cost of gutter cleaning for a small terraced house is £85
                        </td>
                        <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                            Average cost of gutter cleaning for a medium semi-detatched house is £125
                        </td>
                    </tr>

                    {/* Second Row */}
                    <tr>
                        <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                            Average cost of gutter cleaning for a detached 4-bed property is £160
                        </td>
                        <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                            Average cost for a 3 storey townhouse is £240
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GutterPriceSection;