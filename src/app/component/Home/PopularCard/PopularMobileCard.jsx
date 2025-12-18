import React from "react";
import Image from "next/image";
import TreeIcon from "../../common/icons/HomePageIcons/TreeIcon";
import RoofingIcon from "../../common/icons/HomePageIcons/RoofingIcon";
import PainterIcon from "../../common/icons/HomePageIcons/PainterIcon";
import AccountantIcon from "../../common/icons/HomePageIcons/AccountantIcon";
import ArchitectIcon from "../../common/icons/HomePageIcons/ArchitectIcon";
import FenceAndGateInstallationIcon from "../../common/icons/HomePageIcons/FenceAndGateInstallationIcon";
import LandscapingIcon from "../../common/icons/HomePageIcons/LandscapingIcon";
import ArtificialGrassInstallationIcon from "../../common/icons/HomePageIcons/ArtificialGrassInstallationIcon";

export default function PopularJobs() {
  const jobs = [
    { id: 1, image: <TreeIcon />, title: "Tree surgeon" },

    { id: 4, image: <RoofingIcon />, title: "Roofing" },
    { id: 6, image: <PainterIcon />, title: "Painter & Decorator" },
    {
      id: 2,
      image: <AccountantIcon />,
      title: "Accountants",
    },
    { id: 3, image: <ArchitectIcon />, title: "Architects & Planning" },
    {
      id: 5,
      image: <FenceAndGateInstallationIcon />,
      title: "Fence & Gates",
    },
    // { id: 7, image: <PainterIcon />, title: "Artificial Grass Installation" },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto bg-white">
      <div className="grid grid-cols-2 gap-5 mb-5">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="bg-[#00AFE3] max-w-[130px] min-h-[114px] py-2.5 flex flex-col justify-around text-center text-white rounded-3xl  hover:bg-cyan-500 transition-colors active:scale-95"
          >
            <div className="flex justify-center pb-0.5">{job.image}</div>
            <span
              style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
              className=" mx-2.5 flex justify-center text-[18px] leading-[18px] font-medium"
            >
              {job.title}
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <div className="w-[51px] h-[13px] bg-gray-800 rounded-full"></div>
        <div className="w-[11px] h-[11px] bg-gray-300 rounded-full"></div>
        <div className="w-[11px] h-[11px] bg-gray-300 rounded-full"></div>
        <div className="w-[11px] h-[11px] bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
