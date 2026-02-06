import { useState } from "react";
import ComingSoonIcon from "../../common/icons/HomePageIcons/ComingSoonIcon";
import TooltipIcon from "../../common/icons/HomePageIcons/TooltipIcon";

export default function PopularJobs({ jobs, setActiveTooltip, activeTooltip }) {
  const [showToolTip, setShowToolTip] = useState(false);
  return (
    <div
      onClick={(e) => {
        {
          e.stopPropagation();
          setActiveTooltip(null);
          setShowToolTip(false);
        }
      }}
      className="w-full max-w-[430px] mx-auto bg-white"
    >
      <div className="grid grid-cols-2 gap-5 mb-5 place-items-center">
        {jobs.map((job, index) =>
          job?.path ? (
            <a
              href={job?.path}
              key={job.id}
              className="bg-[#00AFE3] w-full min-h-[114px] py-2.5 flex flex-col justify-around text-center text-white rounded-3xl hover:bg-cyan-500 transition-colors"
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
              key={job.id}
              className="relative bg-[#00AFE3] w-full min-h-[114px] py-2.5 flex flex-col justify-around text-center text-white rounded-3xl hover:bg-cyan-500 transition-colors active:scale-95"
            >
              {activeTooltip !== job.id && (
                <TooltipIcon
                  onClick={(e) => {
                    {
                      e.stopPropagation();
                      setShowToolTip(true);
                      setActiveTooltip(job.id);
                    }
                  }}
                  className="absolute right-4 top-4"
                />
              )}
              {showToolTip && activeTooltip === job.id && (
                <ComingSoonIcon className="absolute right-2 top-4 " />
              )}
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
    </div>
  );
}
