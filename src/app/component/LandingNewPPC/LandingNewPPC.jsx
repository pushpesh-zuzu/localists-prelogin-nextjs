import { tabData } from "@/constants/homepageData";
import Head from "next/head";
import Image from "next/image";
import HireRelatedToService from "../Home/HireRelatedToService/HireRelatedToService";
import WrapperBGWidth from "../common/WrapperBGWidth/WrapperBGWidth";
import PaddingWrapper from "../Nearme/PaddingWrapper";
import H2 from "../UI/Typography/H2";
import H3 from "../UI/Typography/H3";
import H4 from "../UI/Typography/H4";
import CheckRightCircleIcon from "../common/icons/LandingPPCIcon/CheckRightCircleIcon";
import Paragraph from "../UI/Typography/Paragraph";
import VerifiedIcon from "../common/icons/LandingPPCIcon/VerifiedIcon";
import AllUserIcon from "../common/icons/LandingPPCIcon/AllUserIcon";
import BuyerRegistrationLandingNewPPC from "./BuyerRegistrationLandingNewPPC";

const LandingNewPPC = ({
  title = "",
  subHeading = "",
  serviceId,
  serviceName = "",
}) => {
  // useEffect(() => {
  //   // dispatch logic will be added later
  //   console.log('Service ID:', serviceId);
  // }, [serviceId]);

  return (
    <>
      <WrapperBGWidth background={"#F3FFF1"}>
        <div className="grid grid-cols-1 md:grid-cols-[45%_55%] justify-center bg-[#F3FFF1] px-2.5 md:px-5 md:py-20 gap-5">
          {/* Left Column - 45% */}
          <div className="bg-transparent max-w-[500px] ml-auto rounded-lg">
            <BuyerRegistrationLandingNewPPC />
          </div>

          <div className="bg-[#F3FFF1] px-3 md:py-5 md:px-10 ">
            <div className="block md:hidden relative bg-[#45a834] text-white rounded-xl p-3 mt-2 mb-8">
              <Image
                src="/topBigArrow.png"
                alt="Arrow"
                width={105}
                height={105}
                className="absolute left-[35%] bottom-[84px]"
              />
              <p className="text-[22px] font-semibold leading-8 text-center m-0">
                Complete the form now to find the ideal local professional for
                your requirements
              </p>
            </div>

            <H4 className="mb-2 font-bold">
              Looking for Landscaping in your area?
            </H4>
            <Paragraph
              bold="font-normal"
              className="mb-2.5 md:mb-[30px] text-[18px]!"
              variant="small"
            >
              Find a local landscaping pro on Localists in second
            </Paragraph>
            <div className="flex flex-col gap-[22px] items-start">
              <div className="flex items-center gap-2">
                <CheckRightCircleIcon />
                <Paragraph
                  className="text-[18px]!"
                  bold="font-normal"
                  variant="secondary"
                >
                  We only use verified and vetted professional
                </Paragraph>
              </div>
              <div className="flex items-center gap-2">
                <CheckRightCircleIcon />{" "}
                <Paragraph
                  className="text-[18px]!"
                  bold="font-normal"
                  variant="secondary"
                >
                  Compare prices from multiple professionalsl
                </Paragraph>
              </div>
              <div className="flex items-center gap-2">
                <CheckRightCircleIcon />{" "}
                <Paragraph
                  className="text-[18px]!"
                  bold="font-normal"
                  variant="secondary"
                >
                  Hire the one thats right for youl
                </Paragraph>
              </div>
            </div>
            <div className="hidden md:block relative bg-[#45a834] text-white rounded-xl p-3 mt-[30px] max-w-[500px]">
              <Image
                src="/icon.png"
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
          <div className="flex items-center jus bg-[#45a834] text-white font-semibold text-sm px-6 py-1 rounded-full gap-4 w-[230px] whitespace-nowrap">
            {/* <VerifiedIcon size={50} /> */}
            <div>
              <p className="text-left m-0">250,000 projects</p>
              <p className="m-0">completed and counting</p>
            </div>
          </div>

          {/* Stat Box 2 */}
          <div className="flex items-center bg-[#45a834] text-white font-semibold text-sm px-6 py-1 rounded-full gap-4 w-[230px] whitespace-nowrap">
            {/* <AllUserIcon /> */}
            <div>
              <p className="text-left m-0">10,000 customers</p>
              <p className="m-0">connected to pros everyday</p>
            </div>
          </div>
        </div>
      </WrapperBGWidth>
    </>
  );
};

export default LandingNewPPC;
