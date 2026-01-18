"use client";

import H4 from "@/app/component/UI/Typography/H4";
import Paragraph from "@/app/component/UI/Typography/Paragraph2";
import CheckCircleIcon from "../../../../public/ReactIcons/CheckCircleIcon";

function ServiceTypeCard({ data, active, onMouseEnter, onMouseLeave, onClick }) {
    const { icon, title, description, points, inActiveIcon } = data;

    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            className={`
        group cursor-pointer
        rounded-[20px]
        px-[20px] py-[30px]
        transition-all duration-300
        hover:-translate-y-[4px]

        ${active ? "bg-[#00AFE3] text-white" : "bg-white text-[#253238]"}
      `}
        >
            {/* ICON */}
            <div
                className={`
          w-[75px] h-[75px]
          rounded-full
          flex items-center justify-center
          mb-[38px]
          transition-all

          bg-[#00AFE3]
          group-hover:bg-white

          max-[1024px]:w-[48px] max-[1024px]:h-[48px]
          max-[640px]:w-[75px] max-[640px]:h-[75px]

        ${active ? "bg-white" : "bg-[#00AFE3]"}
         `}
            >
                {active ? icon : inActiveIcon}
            </div>

            {/* TITLE */}
            <H4 className={`mb-[12px] ${active ? "text-white" : "text-[#253238]"}`}>
                {title}
            </H4>

            {/* DESCRIPTION */}
            <Paragraph className={`mb-[20px] ${active ? "text-white" : "text-[#253238]"}`}>
                {description}
            </Paragraph>

            {/* POINTS */}
            {points && (
                <div className="flex flex-col gap-[10px]">
                    {points.map((p, i) => (
                        <div
                            key={i}
                            className={`
                flex items-center gap-[10px]
                font-[Arial] font-bold
                tracking-[-0.03em]
                leading-[24px]
                text-[20px]
                max-[768px]:text-[18px]
                max-[480px]:text-[16px]
                
                ${active ? "text-white" : "text-[#253238]"}
              `} >
                            <CheckCircleIcon
                                color={active ? "white" : "#00AFE3"}
                            />
                            <span>{p.text}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ServiceTypeCard;
