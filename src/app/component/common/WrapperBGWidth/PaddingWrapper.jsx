import React from "react";

function PaddingWrapper({children, className = ""}) {
  return (
    <div className={`px-[38px] md:px-10 xl:px-[120px] ${className} `}>
      {children}
    </div>
  );
}

export default PaddingWrapper;
