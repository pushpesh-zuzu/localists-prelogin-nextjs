import React from "react";
import H2 from "../UI/Typography/H2";

function NearmeH2Heading({
  headdingblue = "",
  headingblack = "",
  className = "",
}) {
  return (
    <H2 className={`text-[#00AFE3] ${className}`}>
      {headdingblue}{" "}
      {headingblack && <span className="text-[#253238]">{headingblack}</span>}
    </H2>
  );
}

export default NearmeH2Heading;
