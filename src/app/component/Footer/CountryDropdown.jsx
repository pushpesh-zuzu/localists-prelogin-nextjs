"use client";
import Image from "next/image";

export default function CountryDropdown() {
  return (
    <div className="w-[210px] relative flex justify-end">
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
        aria-label="Select country"
        defaultValue="UK"
        className=" w-full
          bg-[#eaeaea] text-black border-none 
          pl-10 pr-8 py-2 sm:text-[10px] xl:text-base rounded 
          cursor-pointer appearance-none
          focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        <option value="UK">United Kingdom</option>
      </select>

      {/* Custom Arrow */}
      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-black">
         <Image
          width={15}
          height={15}
          src={"/icons/arrowblackSelect.svg"}
          alt="UK Flag"
          className="h-[15px] w-[15px]"
        />
      </div>
    </div>
  );
}
