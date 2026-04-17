import Paragraph from "../Typography/Paragraph";

const RadioCard = ({ label, sublabel, selected, onSelect }) => (
  <button
    type="button"
    onClick={onSelect}
    className={`
      group flex items-center gap-3  rounded-sm border text-left
      transition-all duration-200 cursor-pointer w-full

       relative px-3 py-2
            text-gray-900 text-base
            border border-[#ccc]

          placeholder:text-[#959595]
           
            disabled:bg-gray-100 
            custom-placeholder
      ${selected
        ? "border-[#00afe3] bg-[#e8f8fd]"
        : "border-[#ccc] bg-white hover:border-[#00afe3]/50"
      }
    `}
  >
    <span
      className={`
        w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all
        ${selected ? "border-[#00afe3] bg-[#00afe3]" : "border-[#ccc] group-hover:border-[#00afe3]/60"}
      `}
    >
      {selected && <span className="w-2 h-2 rounded-full bg-white block" />}
    </span>
    <div>
      <span
        className={` font-semibold block ${
          selected ? "text-[#00afe3]" : "text-[#253238]"
        }`}
        bold="font-bold"
      >
        {label}
      </span>
      {/* {sublabel && <Paragraph className="text-xs text-[#959595]" bold="font-normal">{sublabel}</Paragraph>} */}
    </div>
  </button>
);

export default RadioCard;