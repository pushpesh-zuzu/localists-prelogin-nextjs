import React from "react";

function WrapperBGWidth({ children, background }) {
  return (
    <div className="w-full mx-auto" style={{ background }}>
      <div className="max-w-[1536px] mx-auto">{children}</div>
    </div>
  );
}

export default WrapperBGWidth;
