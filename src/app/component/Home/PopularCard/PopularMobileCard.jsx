import React from "react";
import Image from "next/image";
import TreeIcon from "../../common/icons/HomePageIcons/TreeIcon";
import RoofingIcon from "../../common/icons/HomePageIcons/RoofingIcon";
import PainterIcon from "../../common/icons/HomePageIcons/PainterIcon";
import AccountantIcon from "../../common/icons/HomePageIcons/AccountantIcon";
import ArchitectIcon from "../../common/icons/HomePageIcons/ArchitectIcon";

export default function PopularJobs() {
  const jobs = [
    { id: 1, image: <TreeIcon />, title: "Fence & Gate Installation" },
    { id: 2, image: <RoofingIcon />, title: "Patio Layer" },
    { id: 3, image: <PainterIcon />, title: "Landscaping" },
    { id: 4, image: <AccountantIcon />, title: "Roofing" },
    { id: 5, image: <ArchitectIcon />, title: "Driveway Installation" },
    { id: 6, image: <PainterIcon />, title: "Artificial Grass Installation" },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto  bg-white">
      <div className="grid grid-cols-2 gap-4 mb-8">
        {jobs.map((job, index) => (
          <button
            key={index}
            className="bg-[#00AFE3] min-h-[110px] py-2.5 px-0.5 text-white rounded-3xl flex flex-col items-center justify-center hover:bg-cyan-500 transition-colors active:scale-95"
          >
            <div className=" h-[42px] mb-4 relative">
              {/* <Image
                src={job.image}
                alt={job.title}
                fill
                className="object-contain"
              /> */}
              {job.image}
            </div>
            <span className="text-base font-medium text-center leading-tight">
              {job.title}
            </span>
          </button>
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <div className="w-8 h-2 bg-gray-800 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
