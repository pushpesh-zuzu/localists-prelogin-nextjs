"use client";

import Button from "./Button";

const GetCTAButton = ({
  text = "Get Free Quotes Now",
  onClick,
  variant = "warning",
  buttonClassName = "",
}) => {
  return (
    <div
      className="
        mt-[48px]
        flex justify-center
        max-[640px]:mt-[40px]
      "
    >
      <Button
        onClick={onClick}
        variant={variant}
        className={`
          flex items-center gap-[5px]
          hover:bg-[#00afe3]
          leading-[20px] sm:leading-normal
          ${buttonClassName}
        `}
      >
        {text}
      </Button>
    </div>
  );
};

export default GetCTAButton;
