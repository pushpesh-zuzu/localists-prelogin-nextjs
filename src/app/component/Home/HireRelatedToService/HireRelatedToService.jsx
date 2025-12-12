'use client'
import React, { useState } from "react";
import H2 from "../../UI/Typography/H2";
import Button from "../../UI/Typography/Button";

const JobButton = ({ title }) => (
  <button
    className="font-[Arial] border xl:border-2 border-white font-bold text-[12px] -tracking-[3%] lg:text-[20px] 
               px-1.5 py-[5px] xl:px-5 xl:py-1 rounded-full text-white 
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
const [currentTab, setcurrentTab ] = useState('professionals')
  const handleClick =(activtab)=>{
setcurrentTab(activtab)
  }
  return (
    <div className="bg-[#00AFE3] md:px-[46px] px-2.5 py-10 md:py-[38px] lg:px-[120px] lg:py-[72px] w-full h-full">
      <header className="mb-12">
        <div className="flex flex-wrap sm:flex-nowrap justify-between  items-center gap-12">
          <H2 className="text-white ">
            Hire with <span className="text-[#023047]">confidence.</span>
          </H2>
          <nav className="flex gap-[17px] sm:gap-4 xl:gap-7 items-center flex-wrap">
            <Button onClick={()=>handleClick('popular')} className={`${currentTab ==='popular'?'bg-[#253238] px-4 rounded-full transition-all duration-700 ease-in-out':''} text-white px-0 py-[11px] cursor-pointer`}>Popular Jobs</Button>

            <Button onClick={()=>handleClick('professionals')} className={`${currentTab ==='professionals'?'bg-[#253238] px-4 rounded-full transition-all duration-700 ease-in-out':''} text-white py-[11px] cursor-pointer`}>
              Find Professionals
            </Button>

            <Button onClick={()=>handleClick('insight')} className={`${currentTab ==='insight'?'bg-[#253238] px-4 rounded-full transition-all duration-700 ease-in-out':''} text-white px-0 py-[11px] cursor-pointer`}>
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
