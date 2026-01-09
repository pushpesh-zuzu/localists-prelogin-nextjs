import React from "react";

function PaddingWrapper({ children }) {
  return (
    <div className="md:block px-2.5 py-5 sm:px-10 md:px-16 md:py-10 xl:px-[120px] pt-10 xl:pt-12 xl:pb-[72px]">
      {children}
    </div>
  );
}

export default PaddingWrapper;
