import React from 'react';

const PatioPricingTable = () => {
  return (
    <div className="w-full mx-auto">
      {/* Pricing Table */}
        <table className="w-full border-collapse">
          <tbody>
            {/* First Row */}
            <tr>
              <td 
                rowSpan="2" 
                className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em] w-[30%]"
              >
                <div className="flex flex-col justify-between h-full min-h-[200px]">
                  <span>The average cost of</span>
                  <span >Get real quotes now</span>
                </div>
              </td>
              <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                The average cost of a gravel patio in the UK is £50 per m²
              </td>
              <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                The average cost of a sandstone patio is £110 per m²
              </td>
            </tr>

            {/* Second Row */}
            <tr>
              <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                The average cost of a concrete patio is £80 per m²
              </td>
              <td className="border border-[#253238] p-4 font-[Arial] text-[16px] leading-[20px] md:text-[16px] md:leading-[22px] lg:text-[20px] lg:leading-[24px] text-[#253238] tracking-[0em]">
                The average cost of a porcelain patio is £125 per m²
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  );
};

export default PatioPricingTable;