import React from "react";

function PaddingWrapper({children, className = ""}) {
  return (
    <div className={`px-6 sm:px-[38px] md:px-15 xl:px-[120px] ${className} `}>
      {children}
    </div>
  );
}

export default PaddingWrapper;
