import React from "react";

function XWithArrowIcon({ className = "" }) {
  return (
    <svg
      width="90"
      height="36"
      viewBox="0 0 90 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="90" height="36" rx="18" fill="#7DD6F1" />
      <path
        d="M34.1469 8.01172H37.3674L30.3324 16.0727L38.6094 27.0437H32.1294L27.0504 20.3912L21.2454 27.0437H18.0219L25.5459 18.4187L17.6094 8.01322H24.2544L28.8384 14.0927L34.1469 8.01172ZM33.0144 25.1117H34.7994L23.2794 9.84322H21.3654L33.0144 25.1117Z"
        fill="#343434"
      />
      <path
        d="M56.3828 25.5273L72.3828 9.52734M72.3828 9.52734L56.3828 9.52734M72.3828 9.52734L72.3828 25.5273"
        stroke="#343434"
        stroke-width="3.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default XWithArrowIcon;
