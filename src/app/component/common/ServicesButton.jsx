import React from "react";
// import Paragraph from "../UI/Typography/Paragraph";

function ServicesButton({ service = "", mobileBorder = "border", className = "", }) {
  return (
    <button
      key={service}
      className={`${className} ${mobileBorder === "border" ? "border" : mobileBorder
        } xl:border-2 border-white family-55  px-1.5 py-[5px] xl:px-5 xl:py-[15px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none`}
      aria-label={`Search for ${service}`}
    >
      <p className="text-[13px] leading-[13px]
        md:text-[16px] md:leading-[16px]
        lg:text-[20px] lg:leading-[24px] tracking-[-0.03em] font-[Arial] font-bold">{service}</p>
    </button>
  );
}

export default ServicesButton;
