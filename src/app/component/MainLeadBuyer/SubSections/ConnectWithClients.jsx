"use client";
import React, { useState } from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import H3 from "../../UI/Typography/H3";
import Paragraph from "../../UI/Typography/Paragraph";
import Button from "../../UI/Typography/Button";
import Image from "next/image";
import LandscapIcon from "../../../../../public/ReactIcons/LandscapIcon";
import DrivewaysInstallIcon from "../../../../../public/ReactIcons/DrivewayInstallIcon";
import FencyGateIcon from "../../../../../public/ReactIcons/FencyGateIcon";
import RoofIcon from "../../../../../public/ReactIcons/RoofIcon";
import TreeSurgeryIcon from "../../../../../public/ReactIcons/TreeSurgeruIcon";
import ArtGrassIcon from "../../../../../public/ReactIcons/ArtGrassIcon";
import PatioIcon from "../../../../../public/ReactIcons/PatioIcon";
import H4 from "../../UI/Typography/H4";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import PainterAndDecoratorIcon from "../../../../../public/ReactIcons/PainterAndDecoratorIcon";

const popularServices = [
  "Roofing",
  "Driveway Installation",
  "Patio Laying",
  "Artificial Grass Installation",
  "Landscaping",
  "Fence & Gate Installation",
  "Tree Surgery",
  "Painter and Decorator",
];
const CATEGORY_ICON_MAP = {
  Landscaping: LandscapIcon,
  "Driveway Installation": DrivewaysInstallIcon,
  "Fence & Gate Installation": FencyGateIcon,
  Roofing: RoofIcon,
  "Tree Surgery": TreeSurgeryIcon,
  "Artificial Grass Installation": ArtGrassIcon,
  "Patio Laying": PatioIcon,
  "Painter and Decorator": PainterAndDecoratorIcon,
};
/**
 * Props:
 *  image          - right side image
 *  onGetStarted   - handler for Get Started button (receives service string)
 */
function ConnectWithClients({
  image = "/mainLeadBuyer/connectClient.webp",
  mobileImage = "/mainLeadBuyer/connectClientMobile.webp",
  onGetStarted,
}) {
  const [service, setService] = useState("");

  const handleGetStarted = () => {
    if (onGetStarted) onGetStarted(service);
  };

  return (
    <WrapperBGWidth>
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px] py-12 md:py-15 xl:py-[72px] flex flex-col lg:flex-row items-start md:gap-10 lg:gap-17">
        {/* Left — Content */}
        <div className="flex-1 w-full">
          <Image
            src={mobileImage}
            alt="Connect with clients"
            className="lg:hidden w-full h-full object-cover rounded-2xl max-w-[500px] max-h-[609px] mb-7.5"
            width={500}
            height={609}
          />
          <NearmeH2Heading
            headdingblue=" Connect with Clients Who"
            headingblack="Need You Now"
            className="mb-5 md:mb-8 lg:mb-12"
          />

          <Paragraph
            variant="primarySmall"
            className=" font-normal text-[#253238]"
          >
            Get matched with 1000s of local customers who need your services
          </Paragraph>

          <div
            className="flex items-center bg-white rounded-full p-1 border mt-5 md:mt-8 lg:mt-12 border-[#DBDFE4] overflow-hidden"
            style={{ boxShadow: "0px 3.65px 3.65px 0px #DBDFE4" }}
          >
            <input
              type="text"
              placeholder="Enter your service"
              className="hidden md:flex flex-1 min-w-0 px-2 text-[#A5B8E0]! font-bold placeholder:font-bold placeholder:text-[#A5B8E0]! outline-none text-base"
            />
            <div className="relative md:hidden flex-1">
              <input
                type="text"
                className="px-4 w-full bg-transparent outline-none text-[#A5B8E0]! text-base placeholder-transparent"
                onInput={(e) => {
                  const el = e.currentTarget.nextSibling;
                  if (e.currentTarget.value) {
                    el.style.display = "none";
                  } else {
                    el.style.display = "block";
                  }
                }}
              />

              {/* Fake 2-line Placeholder */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A5B8E0] text-xs md:text-[18px] font-bold leading-4 pointer-events-none">
                Enter your service
              </span>
            </div>
            <button className="bg-[#00AFE3] flex md:min-w-[169px] justify-center items-center gap-0 max-[360px]:gap-1 md:gap-2 hover:bg-[#0099cc] text-white p-2 text-xs md:text-[18px]  font-extrabold md:px-4.25  md:py-3.5 lg:py-5 rounded-full">
              {/* <TilledArrow /> */}
              Get Started
            </button>
          </div>

          {/* Popular Services */}
          <div
            style={{ boxShadow: "0px 3.65px 3.65px 0px #DBDFE4" }}
            className="mt-7.5 md:mt-10 lg:mt-12 p-7.5 md:p-9 border rounded-[15px] border-[#DBDFE4]"
          >
            <H4 className="text-[#00AFE3] mb-3">Popular services</H4>
            <ul className="grid grid-col-1 md:grid-cols-2 gap-y-[16px] gap-x-6">
              {popularServices.map((s) => {
                const Icon = CATEGORY_ICON_MAP[s]; // component nikalo

                return (
                  <li
                    key={s}
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setService(s)}
                  >
                    {Icon && <Icon />} {/* yaha render karo */}
                    <Paragraph
                      variant="primarySmall"
                      className="!mt-0 font-normal text-[#253238] hover:text-[#00AFE3] transition-colors"
                    >
                      {s}
                    </Paragraph>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Right — Image */}
        <div className="flex-1 w-full rounded-2xl overflow-hidden max-w-[500px]">
          <Image
            src={image}
            alt="Connect with clients"
            className="hidden lg:block w-full h-full object-cover rounded-2xl max-w-[500px] max-h-[609px]"
            width={500}
            height={609}
          />
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default ConnectWithClients;
