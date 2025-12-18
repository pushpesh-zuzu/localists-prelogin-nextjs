"use client";
import Image from "next/image";
import ArrowSolidBalckSelect from "../common/icons/HomePageIcons/ArrowSolidBalckSelect";

export default function CountryDropdown() {
  return (
    <div className="w-[160px] xl:w-[210px] relative flex justify-end">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
        <Image
          width={22}
          height={13}
          src={"/UKFlag.png"}
          alt="UK Flag"
          className="h-[13px] w-[22px] "
        />
      </div>

      <select
        className="
                    w-full
                    bg-[#eaeaea] text-black border-none
                    pl-10 pr-8 py-2
                    text-[10px] md:text-[12px]! xl:text-base
                    rounded cursor-pointer appearance-none
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                  "
      >
        <option value="UK">United Kingdom</option>
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black">
        <ArrowSolidBalckSelect className="h-[8px] w-[8px] xl:h-[15px] xl:w-[15px]" />
      </div>
    </div>
  );
}
