import SearchIcon from "../common/icons/HomePageIcons/SearchIcon";

export function FetureSearchBox() {
  return (
    <div className="max-w-[210px] ml-auto">
      {/* Find Tree Surgeons */}
      <p
        style={{
          textShadow: "0px 4px 4px rgba(0,0,0,0.1)",
        }}
        className="font-black text-[20px] leading-[20px] tracking-[-0.03em] text-[#00AFE3]"
      >
        Find Tree Surgeons
      </p>

      {/* Near you. */}
      <p
        className="font-black text-[20px] leading-[20px] tracking-[-0.03em] text-[#253238]"
        style={{
          textShadow: "0px 4px 4px rgba(0,0,0,0.1)",
        }}
      >
        Near you.
      </p>

      {/* Search box */}
      <div
        className="
       relative mt-4 flex w-[200px] items-center rounded-full bg-white px-4 py-2
        shadow-[0px_11.93px_19.89px_0px_#29292980]
      "
      >
        <input
          placeholder="Enter Postcode"
          className="  flex-1 text-left text-sm text-[#253238] outline-none placeholder:text-gray-400"
        />
        <SearchIcon className="h-4 w-4 absolute right-4" />
      </div>
    </div>
  );
}
