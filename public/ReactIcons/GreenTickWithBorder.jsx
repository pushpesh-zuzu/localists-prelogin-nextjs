import React from "react";

function GreenTickWithBorder({className=""}) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12.5703 24.6406C19.2366 24.6406 24.6406 19.2366 24.6406 12.5703C24.6406 5.90406 19.2366 0.5 12.5703 0.5C5.90406 0.5 0.5 5.90406 0.5 12.5703C0.5 19.2366 5.90406 24.6406 12.5703 24.6406Z"
        fill="#00BF74"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5703 22.5703C18.0932 22.5703 22.5703 18.0932 22.5703 12.5703C22.5703 7.04746 18.0932 2.57031 12.5703 2.57031C7.04746 2.57031 2.57031 7.04746 2.57031 12.5703C2.57031 18.0932 7.04746 22.5703 12.5703 22.5703Z"
        fill="#00BF74"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.07031 12.5703L11.0703 15.5703L17.0703 9.57031"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default GreenTickWithBorder;
