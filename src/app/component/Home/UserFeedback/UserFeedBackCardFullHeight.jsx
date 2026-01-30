import React from "react";
import FiveStarYelloIcon from "../../common/icons/HomePageIcons/FiveStarYelloIcon";

function UserFeedBackCardFullHeight({ item, mobileWidth = "w-[198px]" }) {
  return (
    <div className="w-full flex justify-center min-h-[287px] md:md:min-h-[250.89px] lg:lg:min-h-[366px] h-full">
      <div
        key={item.id}
        className={` ${mobileWidth} h-full
                    rounded-[20px]
                    px-[13.32px] py-5
                    bg-[#D0F7EB]

                    md:w-[200px] md:h-full
                    md:rounded-[20.25px]
                    md:px-[10.5px] md:py-4

                    lg:w-[300px] lg:h-full
                    lg:rounded-[38px]
                    lg:px-[18px] lg:py-7`}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2.5 gap-[18.99px]">
            <FiveStarYelloIcon
              className="w-[111px] h-[22px]
                         md:w-[88px] md:h-[17px]
                         lg:lg:w-[159px]
                         md:xl:h-[31px]"
            />

            <p
              className=" font-bold text-[15px] leading-5
                          md:font-[Arial]
                          md:tracking-[-0.03em]
                          md:text-[14px]
                          md:leading-[18px]
                          lg:text-[20px]
                          lg:leading-6
                          xl:leading-7"
            >
              {item.text}
            </p>
          </div>
          <p
            className="self-end mt-2 font-bold text-[#253238] text-[21px]
                        md:text-[16px] md:tracking-[-0.03em]
                        md:lg:text-[20px]
                        md:xl:text-[28px]"
          >
            {item.name}
          </p>
          {item?.location && (
            <p
              className="self-end mt-2 font-bold text-[#253238] text-[21px]
                        md:text-[16px] md:tracking-[-0.03em]
                        md:lg:text-[20px]
                        md:xl:text-[28px]"
            >
              {item?.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserFeedBackCardFullHeight;
