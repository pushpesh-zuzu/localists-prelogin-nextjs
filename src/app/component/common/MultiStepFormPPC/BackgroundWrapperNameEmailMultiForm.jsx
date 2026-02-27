import React from "react";

const BackgroundWrapperNameEmailMultiForm = ({
  children,
  backgroundImage = "/images/MultiStepFormPPC/nameEmailBanner.webp",
  className="bg-cover bg-center bg-no-repeat md:mx-auto md:max-w-[80%] min-h-[70vh] flex  p-5 md:min-h-[100vh]"
}) => {
  const wrapperStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div
      style={wrapperStyle}
      className={className}
    >
      {children}
    </div>
  );
};

export default BackgroundWrapperNameEmailMultiForm;
