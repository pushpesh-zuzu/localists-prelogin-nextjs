import React from "react";
import SellerFormCardWrappper from "./SellerFormCardWrappper";
import Paragraph from "../UI/Typography/Paragraph";
import Button1 from "../UI/Typography/Button1";
import Button from "../UI/Typography/Button";
import InputLabel from "../UI/InputLabel/InputLabel";
import LocationMapIcon from "../common/icons/SellerRegistration/LocationMapIcon";

function OtherServiceStep({
  prevStep,
  handleInputChange,
  formData,
  setFormData,
}) {
  return (
    <SellerFormCardWrappper
      heading="Add any additional services you can provide"
      description="Get even more great leads."
      maxWidth="max-w-2xl"
    >
      <div className="flex flex-col sm:flex-row gap-3 items-center mb-10">
        <Paragraph variant="primary" className="">
          You've asked for leads for:
        </Paragraph>
        <span className="px-5 py-2 text-[18px] font-medium bg-[#e3f6fc] text-[#00afe3] rounded-[3px]">
          Driveway Installation
        </span>
      </div>
      <Paragraph variant="primary" className="mb-2.5">
        We will also show you leads from
      </Paragraph>
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="py-1.5 px-2.5 leading-6 text-xs font-semibold text-white bg-[#00afe3] rounded-[3px]">
          Landscaping
          <span className="mx-3 ">✕</span>
        </span>
        <span className="py-1.5 px-2.5 leading-6 text-xs font-semibold text-white bg-[#00afe3] rounded-[3px]">
          Fence & Gate Installation
          <span className="mx-3">✕</span>
        </span>
        <span className="py-1.5 px-2.5 leading-6 text-xs font-semibold text-white bg-[#00afe3] rounded-[3px]">
          Artificial Grass Installation
          <span className="mx-3">✕</span>
        </span>
      </div>
      <label className="flex items-center gap-[5px] mt-[18px] mb-[20px] cursor-pointer">
        <input
          type="checkbox"
          name="auto_bid"
          // checked={formData?.auto_bid === 1}
          onChange={handleInputChange}
          className="
      w-4 h-4 lg:w-6 lg:h-6 
      border border-[#d9d9d9]
      shadow-[0px_0px_2px_0.5px_rgba(0,0,0,0.1)]
      cursor-pointer
    "
        />
        <span className="font-semibold text-[14px] text-black">Auto Bid</span>
      </label>

      <InputLabel label="What areas do you provide these additional services in?">
        <div className="flex flex-col md:flex-row gap-4 md:gap-5 mb-6">
          <div className="w-full md:w-1/2">
            <InputLabel inputId="Miles">
              <div className="relative">
                <select
                  className={`w-full px-4 py-2 border rounded-sm appearance-none bg-white 
                   
                    focus:outline-1 focus:ring-1
                    text-gray-700 cursor-pointer`}
                  name="miles1"
                  value={formData?.miles1 || ""}
                  onChange={handleInputChange}
                >
                  <option value="">Select miles</option>
                  <option value="1">1 mile</option>
                  <option value="2">2 miles</option>
                  <option value="5">5 miles</option>
                  <option value="10">10 miles</option>
                  <option value="20">20 miles</option>
                  <option value="30">30 miles</option>
                  <option value="50">50 miles</option>
                  <option value="100">100 miles</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </InputLabel>
          </div>

          {/* Postcode Input */}
          <div className="w-full md:w-1/2">
            <InputLabel inputId="From">
              <div className="relative">
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
                  <LocationMapIcon className="h-3.5 w-3.5" />
                </div>
                <input
                  type="text"
                  placeholder="Enter Postcode (No Spaces)"
                  style={{ boxShadow: "0 0 2px .5px #0000001a" }}
                  className={`
            relative w-full px-6 py-2 rounded-sm
            text-gray-900 text-base
            border border-[#ccc]
            transition-all duration-200
            placeholder:text-gray-400
            focus:outline-1 focus:ring-1
            disabled:bg-gray-100 
            
          `}
                  name="postcode"
                  value={formData?.postcode || ""}
                  onChange={() => {}}
                  // disabled={isLoading}
                />

                {/* {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                </div>
              )} */}

                {/* {!isLoading && isValidPostCode && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )} */}
              </div>
            </InputLabel>
          </div>
        </div>
      </InputLabel>
      <Button className="bg-[#00afe3] text-white py-1.5 px-3 rounded-[3px] text-[20px]!">
        Expand Radius
      </Button>
      <div className="py-2.5 px-9 bg-[#e3f6fc] my-6">
        <p className="text-[32px] font-bold text-[#00afe3] ">617</p>
        <span className="font-[Arial]"> current available leads</span>
      </div>
      <div className="flex justify-between ">
        <Button1 variant="secondary" onClick={prevStep}>
          Back
        </Button1>
        <Button1 variant="primary">Next</Button1>
      </div>
    </SellerFormCardWrappper>
  );
}

export default OtherServiceStep;
