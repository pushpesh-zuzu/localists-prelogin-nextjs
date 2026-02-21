import SearchIcon from "../../common/icons/HomePageIcons/SearchIcon";

export function FetureSearchBox() {
  return (
    <div className="md:max-w-[210px] md:ml-auto max-[768px]:flex max-[768px]:flex-row max-[768px]:justify-between">
      {/* Find Tree Surgeons */}
     <div>
       <p
        style={{
          textShadow: "0px 4px 4px rgba(0,0,0,0.1)",
        }}
        className="font-black text-[15px] leading-[15px] md:text-[20px] md:leading-[20px] tracking-[-0.03em] text-[#00AFE3]"
      >
        Find Tree Surgeons
      </p>

      {/* Near you. */}
      <p
        className="font-black text-[15px] leading-[15px] md:text-[20px] md:leading-[20px] tracking-[-0.03em] text-[#253238]"
        style={{
          textShadow: "0px 4px 4px rgba(0,0,0,0.1)",
        }}
      >
        Near you.
      </p>
     </div>

      {/* Search box */}
      <div
        className="
       relative md:mt-4 max-w-[50%] md:max-w-full md:w-[200px] items-center rounded-full bg-white px-4 py-2
        shadow-[0px_11.93px_19.89px_0px_#29292980]
      "
      >
        <input
          placeholder="Enter Postcode"
          className="text-left text-sm w-[80%] md:w-[80%] text-[#253238] outline-none placeholder:text-gray-400"
        />
        <SearchIcon className="h-4 w-4 absolute top-[35%] right-4" />
      </div>
    </div>
  );
}
