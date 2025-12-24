import React from "react";
import H3 from "../UI/Typography/H3";
import Paragraph from "../UI/Typography/Paragraph";
import H4 from "../UI/Typography/H4";
import H5 from "../UI/Typography/H5";

function SellerFormCardWrappper({
  children,
  heading = "",
  description = "",
  title = "",
  maxWidth = "max-w-3xl",
}) {
  return (
    <div className="min-h-screen bg-[#f9f9fa] py-12 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-[26px]">
          <H5 variant="secondary" className="mb-3 md:mb-6">
            {heading}
          </H5>
          <Paragraph variant="small" className=" text-gray-600 mx-auto">
            {description}
          </Paragraph>
        </div>

        <div
          className={`${maxWidth} mx-auto bg-white rounded-lg shadow-md p-6 md:p-10`}
        >
          {title !== "" && (
            <Paragraph variant="medium" className=" mb-6">
              {title}
            </Paragraph>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export default SellerFormCardWrappper;
