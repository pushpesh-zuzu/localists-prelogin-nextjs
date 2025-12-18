import React from "react";
import FiveStarYelloIcon from "../../common/icons/HomePageIcons/FiveStarYelloIcon";

function UserFeedbackCard({ item }) {
  return (
    <div className="w-full flex justify-center">
      <div
        key={item.id}
        className="w-[198px] h-[287px]
                   md:w-[120px]
                   md:sm:w-[158px] md:sm:h-[233px]
                   md:lg:w-[238px] md:lg:h-[352px]
                   md:xl:w-[282px] md:xl:h-[366px]
                   px-[13.32px] py-5
                   md:px-[10.5px] md:py-4
                   md:lg:px-4.5 md:lg:py-6
                   md:xl:px-[18px] md:xl:py-7
                   rounded-[20px]
                   md:lg:rounded-4xl md:xl:rounded-[40px]
                   bg-[#D0F7EB80]"
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2.5">
            <FiveStarYelloIcon
              className="w-[89px] h-4
                         md:w-auto md:h-auto
                         md:sm:h-6 md:sm:w-[100px]
                         md:lg:w-[159px]
                         md:xl:h-[31px]"
            />

            <p
              className="font-bold text-[15px] leading-5
                          md:font-[Arial] md:font-bold md:tracking-[-0.03em]
                          md:text-[18px] md:leading-[18px]
                          md:sm:text-base md:sm:leading-[18px]
                          md:lg:text-[20px] md:lg:leading-6
                          md:leading-5 md:xl:leading-7"
            >
              {item.text}
            </p>
          </div>
          <p
            className="self-end mt-2 font-bold text-black text-[21px]
                        md:text-[14px] md:tracking-[-0.03em]
                        md:lg:text-[20px]
                        md:xl:text-[28px]"
          >
            {item.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserFeedbackCard;
