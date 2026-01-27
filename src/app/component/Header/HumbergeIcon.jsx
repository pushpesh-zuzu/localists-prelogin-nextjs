import React, { useState } from "react";

function HamburgerIcon() {
  return (
    <div className="flex flex-col gap-[5px] ml-auto p-[10px] z-[1001] cursor-pointer">
      {/* Top Bar */}
      <div
        className={`w-[25px] h-[3px] bg-[#333] rounded transition-all duration-300 `}
      />

      {/* Middle Bar */}
      <div
        className={`w-[25px] h-[3px] bg-[#333] rounded transition-all duration-300 `}
      />

      {/* Bottom Bar */}
      <div
        className={`w-[25px] h-[3px] bg-[#333] rounded transition-all duration-300 `}
      />
    </div>
  );
}

export default HamburgerIcon;
