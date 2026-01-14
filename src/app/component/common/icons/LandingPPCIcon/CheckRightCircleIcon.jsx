import React from "react";

function CheckRightCircleIcon({className=""}) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="13.5" cy="13.5" r="13.5" fill="#45A834" />
      <path
        d="M7.5 13L11.5 17L19.5 9"
        stroke="white"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default CheckRightCircleIcon;
