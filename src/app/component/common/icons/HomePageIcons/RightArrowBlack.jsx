import React from "react";

function RightArrowBlack({ className = "", color = "#253238" }) {
  return (
    <svg
      width="15"
      height="26"
      viewBox="0 0 15 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M1.75 23.4167L12.5833 12.5833L1.75 1.75"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default RightArrowBlack;
