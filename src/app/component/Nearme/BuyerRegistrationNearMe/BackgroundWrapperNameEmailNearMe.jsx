import React from "react";

const BackgroundWrapperNameEmailNearMe = ({
  children,
  backgroundImage = "/images/MultiStepFormPPC/nameEmailBanner.webp",
  className = "md:max-w-[80%] min-h-[70vh]  md:min-h-[100vh]",
}) => {
  const wrapperStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div
      style={wrapperStyle}
      className={`bg-cover bg-center bg-no-repeat md:mx-auto  ${className} flex  p-5`}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapperNameEmailNearMe;
