import React from "react";
import H3 from "../UI/Typography/H3";
import Button from "../UI/Typography/Button";

function ServiceNameCard({businessName='Home & Garden'}) {
  return (
    <div className="flex flex-col gap-6 text-center px-3 py-[22px] rounded-2xl xl:px-[51px] xl:py-[43px]  w-[158px] h-[132px] lg:w-[200px] lg:h-[180px] xl:w-[281px] xl:h-[235px] bg-[#7CD6F0] xl:rounded-[28px] font-bold">
      <H3>{businessName}</H3>
      <div className="flex justify-center">
        <button className="rounded-full mb- bg-black text-white px-[18px] xl:px-[35px] text-base xl:text-[20px] -tracking-[3%] mx-auto py-[3px] lg:py-[5px]">
          Veiw All
        </button>
      </div>
    </div>
  );
}

export default ServiceNameCard;
