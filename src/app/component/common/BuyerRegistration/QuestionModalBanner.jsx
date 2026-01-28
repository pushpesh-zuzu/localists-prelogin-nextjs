import React from "react";
import H4 from "../../UI/Typography/H4";
import H5 from "../../UI/Typography/H5";

function QuestionModalBanner({
  serviceName = "",
  progressPercent = 0,
  question,
}) {
  const getHeaderImageClass = () => {
    const baseClasses =
      "bg-cover bg-center px-5 text-white text-lg font-bold min-h-[158px] flex justify-center items-center flex-col max-[768px]:text-base max-[768px]:py-10 max-[768px]:px-[15px] max-[480px]:min-h-[120px]";

    const imageMap = {
      "Patio Laying": "bg-[url('/questions/PatioServices.webp')]",
      "Artificial Grass Installation":
        "bg-[url('/questions/ArtificialGrass.webp')]",
      "Driveway Installation": "bg-[url('/questions/Driveways.webp')]",
      "Fence & Gate Installation": "bg-[url('/questions/Fence.webp')]",
      Gardening: "bg-[url('/images/banners/Gardening.jpg')]",
      "Home and Garden":
        "bg-[url('/images/banners/landscapingandgardening.webp')]",
      Landscaping: "bg-[url('/questions/landscapingandgardening.webp')]",
      "Gate Installation": "bg-[url('/questions/Gate.webp')]",
      Roofing: "bg-[url('/questions/Roofing.webp')]",
      "Tree Surgery": "bg-[url('/questions/TreeSurgeon.webp')]",
    };

    return `${baseClasses} ${
      imageMap[serviceName] || "bg-[url('/images/banners/default.webp')]"
    }`;
  };
  return (
    <div className={`${getHeaderImageClass()} `}>
      <h5
        className="font-Inter font-black
        tracking-[-0.03em]
        text-[20px] leading-7
        md:text-[25px] 
        lg:text-[25px] 
        mb-0 max-w-[95%] 
        text-center 
        bg-black/50 
        px-2 py-1 text-xl 
        max-[480px]:w-full"
      >
        {question}
      </h5>

      <div className="mt-2 h-[3px] w-full overflow-hidden bg-[#EDEDED]">
        <div
          className="h-full bg-[#00AFE3] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>
    </div>
  );
}

export default QuestionModalBanner;
