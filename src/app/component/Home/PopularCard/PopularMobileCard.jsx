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
import { useRouter } from "next/navigation";
import DrivewayIcon from "../../common/icons/HomePageIcons/DrivewayIcon";
import PatioLayingIcon from "../../common/icons/HomePageIcons/PatioLayingIcon";
import LandscapingPopularJobsIcon from "../../common/icons/HomePageIcons/LandscapingPopularJobsIcon";
import ArtificialGrassIcon from "../../common/icons/HomePageIcons/ArtificialGrassIcon";

export default function PopularJobs() {
  const jobs = [
    {
      id: 1,
      image: <TreeIcon />,
      title: "Tree surgeon",
      path: "/en/gb/tree-surgeon-near-me",
      margin: "mx-4",
    },
    {
      id: 6,
      image: <FenceAndGateInstallationIcon />,
      title: "Fence & Gates Installation",
      path: "/en/gb/fencing-contractors-near-me",
      margin: "mx-2.5",
      path:'/en/gb/fencing-contractors-near-me'
    },
    {
      id: 4,
      image: <DrivewayIcon />,
      title: "Driveway Installation",
      margin: "mx-2.5",
      path: "/en/gb/driveway-installers-near-me"
    },
    {
      id: 5,
      image: <PatioLayingIcon />,
      title: "Patio Laying",
      margin: "mx-2.5",
      path: "/en/gb/patio-layers-near-me",
    },
    {
      id: 2,
      image: <LandscapingPopularJobsIcon />,
      title: "Landscaping",
      margin: "mx-2.5",
      path: "/en/gb/landscape-gardeners-near-me"
    },
    {
      id: 3,
      image: <ArtificialGrassIcon />,
      title: "Artificial Grass Installation",
      margin: "mx-0",
      path:"/en/gb/artificial-grass-installers-near-me"
      
    },
  ];

  return (
    <div className="w-full max-w-[430px] mx-auto bg-white">
      <div className="grid grid-cols-2 gap-5 mb-5 place-items-center">
        {jobs.map((job, index) =>
          job?.path ? (
            <a
              href={job?.path}
              key={index}
              className="bg-[#00AFE3] w-full max-w-[140px] min-h-[114px] py-2.5 flex flex-col justify-around text-center text-white rounded-3xl  hover:bg-cyan-500 transition-colors active:scale-95"
            >
              <div className="flex justify-center pb-0.5">{job.image}</div>
              <span
                style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
                className={`${job?.margin} flex justify-center font-bold text-[18px] leading-[18px]`}
              >
                {job.title}
              </span>
            </a>
          ) : (
            <div
              key={index}
              className="bg-[#00AFE3] w-full max-w-[140px] min-h-[114px] py-2.5 flex flex-col justify-around text-center text-white rounded-3xl  hover:bg-cyan-500 transition-colors active:scale-95"
            >
              <div className="flex justify-center pb-0.5">{job.image}</div>
              <span
                style={{ textShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)" }}
                className={`${job?.margin} flex justify-center font-bold text-[18px] leading-[18px]`}
              >
                {job.title}
              </span>
            </div>
          ),
        )}
      </div>

      <div className="flex justify-center gap-1">
        <div className="w-[51px] h-[13px] bg-[#253238] rounded-full"></div>
        <div className="w-[11.59px] h-[11.59px] bg-[#253238] rounded-full"></div>
        <div className="w-[11.59px] h-[11.59px] bg-[#253238] rounded-full"></div>
        <div className="w-[11.59px] h-[11.59px] bg-[#253238] rounded-full"></div>
      </div>
    </div>
  );
}
