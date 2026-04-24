import React from "react";

function TilledArrow({ className = "" }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_741_518)">
        <path
          d="M6.01002 18.7383L18.7379 6.01041M18.7379 6.01041V18.0312M18.7379 6.01041H6.71713"
          stroke="white"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_741_518">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

export default TilledArrow;
