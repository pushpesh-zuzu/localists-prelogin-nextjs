import React from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";

const JobButton = ({ title }) => (
  <button
    className="font-[Arial] border xl:border-2 border-white font-bold text-[12px] -tracking-[3%] lg:text-[20px] 
               px-1.5 py-[5px] xl:px-5 xl:py-[11px] rounded-full text-white 
               whitespace-nowrap focus:outline-none"
    aria-label={`Search for ${title}`}
  >
    {title}
  </button>
);

export default function HireRelatedToService() {
  const jobLinks = [
    "Electricians in London",
    "Roofers in Edinburgh",
    "Maths Tutor in Manchester",
    "Plumbers in Birmingham",
    "Gardeners in Wolverhampton",
    "Plumbers in Birmingham",
    "Roofers in Norwich",
    "Garden Designers Cardiff",
    "Electricians in London",
    "Roofers in Edinburgh",
    "Patio Layers in Manchester",
    "Plumbers in Birmingham"
  ];

  return (
    <div className="bg-[#00AFE3] md:px-[46px] px-2.5 py-10 md:py-[38px] lg:px-[120px] lg:py-[72px] w-full h-full">
      <header className="mb-12">
        <div className="flex flex-wrap sm:flex-nowrap  items-center gap-12">
          {/* <h2 className="text-white text-3xl sm:text-[29.5px] lg:text-5xl xl:text-6xl font-bold">
            Hire with <span className="text-[#023047]">confidence.</span>
          </h2> */}
          <H2 className="text-white ">
            Hire with <span className="text-[#023047]">confidence.</span>
          </H2>
          <nav className="flex gap-[17px] sm:gap-4 xl:gap-7 items-center flex-wrap">
            <Button className="text-white px-0 py-[11px]">Popular Jobs</Button>

            <Button className="bg-[#253238] text-white  px-4 rounded-full py-[11px]">
              Find Professionals
            </Button>

            <Button className="text-white px-0 py-[11px]">
              Advice & Insight
            </Button>
          </nav>
        </div>
      </header>
      <div className="flex flex-wrap gap-4 lg:gap-[23px] max-w-[90%] md:max-w-full">
        {jobLinks.map((title, i) => (
          <JobButton key={i} title={title} />
        ))}
      </div>
    </div>
  );
}
