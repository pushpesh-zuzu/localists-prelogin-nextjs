"use client";
import Image from "next/image";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import CheckRightCircleIcon from "../common/icons/LandingPPCIcon/CheckRightCircleIcon";
import Paragraph from "../UI/Typography/Paragraph";
import BuyerRegistrationLandingNewPPC from "./BuyerRegistrationLandingNewPPC";
import CheckVerifiedIcon from "../common/icons/LandingPPCIcon/CheckVerifiedIcon";
import AllUserIcon from "../common/icons/LandingPPCIcon/AllUserIcon";
import { setbuyerRequestData } from "@/lib/store/buyerslice/buyerSlice";
import CloseBrowserAbandon from "../common/CloseBrowserAbandon/CloseBrowserAbandon";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Footer from "../Footer/Footer";

const LandingNewPPC = ({
  title = "",
  subHeading = "",
  serviceId,
  serviceName = "",
}) => {
  const dispatch = useDispatch();
  const [isOtpSent, setIsOtpSent] = useState(false);
  useEffect(() => {
    dispatch(setbuyerRequestData({ service_id: serviceId }));
  }, []);

  return (
    <>
      {!isOtpSent && <CloseBrowserAbandon />}
      <WrapperBGWidth background={"#F3FFF1"}>
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] justify-center bg-[#F3FFF1] px-2.5 py-5 md:px-5 md:py-20 gap-[15px] md:gap-5">
          {/* Left Column - 45% */}
          <div className="bg-transparent max-w-[500px] mr-auto ml-auto  md:ml-auto md:mr-0 rounded-lg">
            <BuyerRegistrationLandingNewPPC
              service_Id={serviceId}
              service_Name={serviceName}
              serviceName={serviceName}
              setIsOtpSent={setIsOtpSent}
            />
          </div>

          <div className="bg-[#F3FFF1] px-3 pt-[30px] pb-5 md:py-5 md:px-10 ">
            <div className="block md:hidden relative bg-[#45a834] text-white rounded-xl p-3 mt-2 mb-8">
              {/* Arrow background */}
              <Image
                src="/topBigArrow.png"
                alt="Arrow"
                width={81}
                height={105}
                className="absolute left-[35%] min-[400px]:left-[40%]  min-[540px]:left-[43%]  min-[700px]:left-[45%] bottom-[66%] min-[373px]:bottom-[60%] min-[473px]:bottom-[45%]  z-10 pointer-events-none"
              />

              {/* Text */}
              <p className="relative z-10 text-[22px] font-semibold leading-8 text-center m-0">
                Complete the form now to find the ideal local professional for
                your requirements
              </p>
            </div>

            <h4
              className="mb-2 font-bold font-Inter 
                        tracking-[-0.03em]
                        text-[20px] leading-[20px]     
                        md:text-[30px] md:leading-[30px]"
            >
              Looking for {title} in your area?
            </h4>
            <Paragraph
              bold="font-normal"
              className="mb-2.5 md:mb-[30px] text-[18px]!"
              variant="small"
            >
              Find a local {subHeading} pro on Localists in second
            </Paragraph>
            <div className="flex flex-col gap-[22px] items-start">
              <div className="flex items-start align-top gap-2">
                <div className="min-h-5">
                  <CheckRightCircleIcon />
                </div>
                <Paragraph
                  className="text-[18px]!"
                  bold="font-normal"
                  variant="secondary"
                >
                 We only use verified and vetted professionals
                </Paragraph>
              </div>
              <div className="flex items-start gap-2">
                <div className="min-h-5">
                  <CheckRightCircleIcon />{" "}
                </div>
                <Paragraph
                  className="text-[18px]!"
                  bold="font-normal"
                  variant="secondary"
                >
                  Compare prices from multiple professionals
                </Paragraph>
              </div>
              <div className="flex items-start gap-2">
                <div className="min-h-5">
                  <CheckRightCircleIcon />{" "}
                </div>
                <Paragraph
                  className="text-[18px]!"
                  bold="font-normal"
                  variant="secondary"
                >
                  Hire the one thats right for you
                </Paragraph>
              </div>
            </div>
            <div className="hidden md:block relative bg-[#45a834] text-white rounded-xl p-3 mt-[30px] max-w-[500px]">
              <Image
                src="/Icon.png"
                alt="Arrow"
                width={50}
                height={42}
                className="absolute -left-14 top-[25%]"
              />
              <p className="text-[22px] font-semibold leading-8 mb-0">
                Complete the form now to find the ideal local professional for
                your requirements
              </p>
            </div>
          </div>
        </div>
      </WrapperBGWidth>
      <WrapperBGWidth>
        <div className="flex flex-col md:flex-row justify-center items-center gap-[30px] py-5">
          {/* Stat Box 1 */}
          <div className="flex items-center jus bg-[#45a834] text-white font-semibold text-sm px-6 py-1 rounded-full gap-4 w-[260px] whitespace-nowrap">
            <div className="min-w-6">
              <CheckVerifiedIcon className="shrink-0" />
            </div>

            <div>
              <p className="text-left m-0">250,000 projects</p>
              <p className="m-0">completed and counting</p>
            </div>
          </div>

          <div className="flex items-center jus bg-[#45a834] text-white font-semibold text-sm px-6 py-1 rounded-full gap-4 w-[260px] whitespace-nowrap">
            <div className="min-w-6">
              <AllUserIcon className="shrink-0" />
            </div>

            <div>
              <p className="text-left m-0">10,000 customers</p>
              <p className="m-0">connected to pros everyday</p>
            </div>
          </div>
        </div>
      </WrapperBGWidth>
      <Footer/>
    </>
  );
};

export default LandingNewPPC;
