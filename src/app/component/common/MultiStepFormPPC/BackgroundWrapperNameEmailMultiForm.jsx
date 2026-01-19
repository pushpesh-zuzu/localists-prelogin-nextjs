import React from "react";

const BackgroundWrapperNameEmailMultiForm = ({
  children,
  backgroundImage = "/images/MultiStepFormPPC/nameEmailBanner.webp",
}) => {
  const wrapperStyle = {
    backgroundImage: `url(${backgroundImage})`,
  };

  return (
    <div
      style={wrapperStyle}
      className="bg-cover bg-center bg-no-repeat md:mx-auto md:max-w-[80%] min-h-[70vh] flex  p-5 md:min-h-[100vh]"
    >
      {children}
    </div>
  );
};

export default BackgroundWrapperNameEmailMultiForm;
