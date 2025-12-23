"use client";
import Image from "next/image";
import ArrowSolidBalckSelect from "../common/icons/HomePageIcons/ArrowSolidBalckSelect";

export default function CountryDropdown() {
  return (
    <div className="w-[160px] xl:w-[210px] relative flex justify-end">
      {/* Accessibility label */}
      <label htmlFor="country-select" className="sr-only">
        Selected Country
      </label>

      <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center">
        <Image
          width={22}
          height={13}
          src={"/UKFlag.png"}
          alt="UK Flag"
          className="h-[13px] w-[22px]"
        />
      </div>

      <select
        id="country-select"
        disabled
        className="
          w-full
          bg-[#eaeaea] text-[#253238]
          pl-10 pr-8 py-2
          text-[10px] md:text-[12px] xl:text-base
          rounded cursor-none appearance-none
          focus:outline-none
        "
      >
        <option value="UK">United Kingdom</option>
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#253238]">
        <ArrowSolidBalckSelect className="h-[8px] w-[8px] xl:h-[15px] xl:w-[15px]" />
      </div>
    </div>
  );
}
