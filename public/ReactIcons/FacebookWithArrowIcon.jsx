import React from "react";

function FacebookWithArrowIcon({ className = "" }) {
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
        d="M24.9427 20.0593H27.5618L28.6094 15.8689H24.9427V13.7736C24.9427 12.6946 24.9427 11.6784 27.0379 11.6784H28.6094V8.15839C28.2679 8.11334 26.9782 8.01172 25.6163 8.01172C22.772 8.01172 20.7522 9.74762 20.7522 12.9355V15.8689H17.6094V20.0593H20.7522V28.9641H24.9427V20.0593Z"
        fill="#343434"
      />
      <path
        d="M56.3828 26.4883L72.3828 10.4883M72.3828 10.4883L56.3828 10.4883M72.3828 10.4883L72.3828 26.4883"
        stroke="#343434"
        stroke-width="3.2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default FacebookWithArrowIcon;
