import React from "react";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";
import HeadingWrapperMainLeadBuyer from "../HeadingWrapperMainLeadBuyer";
import Paragraph from "../../UI/Typography/Paragraph";
import ZigzagCheckIcon from "../../../../../public/mainLeadBuyer/ZigzagCheckIcon";
// import WrapperBGWidth from "../components/WrapperBGWidth";
// import HeadingWrapperMainLeadBuyer from "../components/HeadingWrapperMainLeadBuyer";
// import Paragraph from "../UI/Typography/Paragraph";

const bulletPoints = [
  "100% genuine contact number",
  "No Full address details",
  "Ready for quotes",
];

function RealNumbers({ image='/mainLeadBuyer/realNumber.webp' }) {
  return (
    <WrapperBGWidth >
      <div className="px-7.5 sm:px-10 md:px-16 xl:px-[120px] py-12 md:py-15 xl:py-[72px] flex flex-col md:flex-row items-center md:gap-10 lg:gap-[130px]">
          
         <img
            src={image}
            height={535}
            width={535}
            alt="Real Numbers Guaranteed"
            className="md:hidden w-full h-full object-cover max-h-[535px] max-w-[535px] mb-7.5"
          />
        {/* Left Content */}
        <div className="flex-1 w-full max-w-[542px]">
          <HeadingWrapperMainLeadBuyer
            headdingblue="Real Numbers."
            headingblack="Guaranteed"
          />

          <Paragraph variant="primarySmall" bold="font-normal" className="text-[#253238] max-w-[467px]">
            With Localists, every lead on our database has a genuine contact
            number. Gone are the days of monthly subscriptions with fake numbers
            or purchasing a lead which has the number of the local taxi rank
            instead. With all of our leads we send a one time password to their
            mobile that they need to enter on our website before their query
            goes live. Ensuring every lead you purchase is genuine.
          </Paragraph>

          {/* Bullet Points */}
          <ul className="mt-6 xl:mt-12 flex flex-col gap-5">
            {bulletPoints.map((point) => (
              <li key={point} className="flex items-center gap-3">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                 
                >
                 <ZigzagCheckIcon/>
                </span>
                <Paragraph className="!mt-0 text-[#253238] font-bold">
                  {point}
                </Paragraph>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Image */}
        <div className="hidden md:flex flex-1 w-full rounded-[20px] md:rounded-[37px] overflow-hidden max-w-[535px]">
          <img
            src={image}
            height={535}
            width={535}
            alt="Real Numbers Guaranteed"
            className="w-full h-full object-cover max-h-[535px] max-w-[535px]"
          />
        </div>
      </div>
    </WrapperBGWidth>
  );
}

export default RealNumbers;