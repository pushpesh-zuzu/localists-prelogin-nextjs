import React from "react";

function UserIcon({className=""}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M11.9979 15C8.82782 15 6.0087 16.5306 4.21389 18.906C3.8276 19.4172 3.63446 19.6728 3.64078 20.0183C3.64566 20.2852 3.81326 20.6219 4.02326 20.7867C4.29508 21 4.67177 21 5.42513 21H18.5707C19.324 21 19.7007 21 19.9725 20.7867C20.1825 20.6219 20.3501 20.2852 20.355 20.0183C20.3613 19.6728 20.1682 19.4172 19.7819 18.906C17.9871 16.5306 15.168 15 11.9979 15Z"
        stroke="#253238"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M11.9979 12C14.4832 12 16.4979 9.98528 16.4979 7.5C16.4979 5.01472 14.4832 3 11.9979 3C9.51262 3 7.4979 5.01472 7.4979 7.5C7.4979 9.98528 9.51262 12 11.9979 12Z"
        stroke="#253238"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}

export default UserIcon;
