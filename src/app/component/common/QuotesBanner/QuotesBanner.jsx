"use client";
import { useState } from "react";

import Button from "../../UI/Typography/Button";
import H3 from "../../UI/Typography/H3";
import RoundedLogo from "../icons/RoudedLogo";
import BackgroundLogo from "../icons/BackgroundLogo";
import Image from "next/image";
import BuyerRegistration from "../BuyerRegistration/BuyerRegistration";

export default function QuotesBanner({
  text = "ROOFING QUOTES IN",
  variant = "secondary",
  classQuote = "w-full flex justify-center items-center",
  containerWidth = "w-full md:w-[100%] lg:w-[74%] max-w-6xl",
  buttonClassQuote = "md:py-[8px] md:px-8 px-10 py-[10px]",
  serviceId = 113,
  serviceName = "Roofing",
}) {

  const [postcode, setPostcode] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!postcode.trim()) {
      setError("Please enter a valid postcode!");
      return;
    }

    setError("");
    setShow(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setShow(false);
    setPostcode("");
  };

  return (
    <>
      <style>{`
      .custom-input::placeholder {
        color: #d9d9d9;
        opacity: 1;
      }
    `}</style>
      <div className={classQuote}>
        <div className={`relative ${containerWidth}`}>

          {/* Main Banner */}
          {/* <div className="bg-[#00afe3] rounded-3xl 
px-6 md:px-5 py-10 md:py-3 
flex flex-row items-center justify-between 
relative overflow-hidden md:pr-[170px]"> */}
          <div className="bg-[#00afe3] rounded-3xl 
px-5 md:px-5 py-2 md:py-3 md:gap-0 gap-1
flex flex-row items-center md:items-center justify-between 
relative overflow-hidden md:pr-[170px]">

            {/* LEFT CONTENT */}
            <div className="z-10 flex-1 text-left">
              <H3 className="text-white tracking-wide md:tracking-[-0.03em] md:!text-[22px] md:!leading-[24px]
        lg:!text-[35px] lg:!leading-[35px] xl:!text-[38px] xl:!leading-[38px] !text-[15px] !leading-[15px]">{text}
              </H3>

              <div className="mt-3 md:mt-6 flex flex-row items-center md:gap-4 gap-2 justify-start">
                <input
                  type="text"
                  value={postcode}
                  onChange={(e) => {
                    setPostcode(e.target.value);
                    if (error) setError("");
                  }}
                  onKeyDown={handleKeyPress}
                  placeholder="Post Code"
                  className="custom-input px-1 py-2 md:px-6 md:py-3 text-center font-bold rounded-full bg-white text-gray-500 outline-none w-23 md:w-40 lg:w-55"
                />

                <Button
                  variant={variant}
                  onClick={handleSubmit}
                  className="
    px-4 py-2 text-sm 
    md:px-8 md:py-[8px] md:text-base
    bg-green-500 hover:bg-green-600 
    border border-3 border-white 
    cursor-pointer transition 
    rounded-full text-white 
    font-semibold shadow-md
  "
                >
                  Start
                </Button>
              </div>
              {error && (
                <div className="text-red-500 mt-2 text-sm text-block">{error}</div>)}
            </div>

            {/* RIGHT SIDE (30 SEC CIRCLE) */}
            <div className="mt-0 relative flex items-center justify-center md:mr-2">
              <div className="relative w-[100px] h-[100px] md:w-[145px] md:h-[145px] flex items-center justify-center">
                {/* Rounded SVG */}
                <RoundedLogo width={150} height={150} />
                <div className="absolute inset-0 mt-2 md:mt-[10px] flex flex-col items-center justify-center text-white rotate-[15deg]">
                  <span className="font-Inter tracking-[-0.03em] text-[50px] leading-[50px] md:text-[80px] font-bold md:leading-[80px]">
                    30
                  </span>
                  <span className="font-[Arial] tracking-[-0.03em] text-[18px] md:text-[22px] md:-mt-3 -mt-2">
                    Sec
                  </span>
                </div>
              </div>
            </div>

            {/* Background Faded Text */}
            <BackgroundLogo className="w-[280px] md:w-[600px]" />
          </div>
          {/* PHONE IMAGE (Desktop only) */}
          <div className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2">
            <Image
              src="/nearme/Roofing/mobileroof.webp"
              alt="phone"
              width={140}
              height={200}
              className="object-contain"
            />
          </div>


        </div>
      </div>

      {show && (
        <BuyerRegistration
          closeModal={handleClose}
          service_Id={serviceId}
          postcode={postcode}
          serviceName={serviceName}
          service_Name={serviceName}
        />
      )}
    </>
  );
}