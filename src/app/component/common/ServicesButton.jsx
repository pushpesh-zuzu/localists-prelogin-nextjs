import React from "react";
import Paragraph from "../UI/Typography/Paragraph";

function ServicesButton({ service = "", mobileBorder = "border" }) {
  return (
    <button
      key={service}
      className={`${
        mobileBorder === "border" ? "border" : mobileBorder
      } xl:border-2 border-white family-55  px-1.5 py-[5px] xl:px-5 xl:py-[15px] rounded-full text-white hover:bg-white hover:text-[#00AEEF] transition-all duration-200 whitespace-nowrap focus:outline-none`}
      aria-label={`Search for ${service}`}
    >
      <Paragraph variant="secondary">{service}</Paragraph>
    </button>
  );
}

export default ServicesButton;
