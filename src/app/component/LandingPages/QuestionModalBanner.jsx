import React from "react";

// ✅ Import all banners
import LandscapingBanner from "../common/LandingPagesBannerAndIcons/landscapingandgardeningBanner.webp";
import PatioServices from "../common/LandingPagesBannerAndIcons/PatioServices.webp";
import ArtificialGrass from "../common/LandingPagesBannerAndIcons/ArtificialGrass.webp";
import Fence from "../common/LandingPagesBannerAndIcons/Fence.webp";
import Driveways from "../common/LandingPagesBannerAndIcons/Driveways.webp";
import Gate from "../common/LandingPagesBannerAndIcons/Gate.webp";
import ResinDriveway from "../common/LandingPagesBannerAndIcons/ResinDriveway.webp";
import BlockPaving from "../common/LandingPagesBannerAndIcons/BlockPaving.webp";
import TarmacDriveway from "../common/LandingPagesBannerAndIcons/TarmacDriveway.webp";
import ImprintedConcrete from "../common/LandingPagesBannerAndIcons/ImprintedConcrete.webp";

const BANNER_MAP = {
  Landscaping: LandscapingBanner,
  Gardening: LandscapingBanner,
  "Home and Garden": LandscapingBanner,

  "Patio Laying": PatioServices,
  "Artificial Grass Installation": ArtificialGrass,
  "Fence & Gate Installation": Fence,
  "Gate Installation": Gate,

  "Driveway Installation": Driveways,
  "Resin Driveway": ResinDriveway,
  "Block Paving": BlockPaving,
  "Tarmac Driveway": TarmacDriveway,
  "Imprinted Concrete": ImprintedConcrete,
};

function QuestionModalBanner({
  serviceName = "",
  progressPercent = 0,
  question,
}) {
  const bannerImage =
    BANNER_MAP[serviceName] || LandscapingBanner; // ✅ fallback

  return (
    <div
      className="
        bg-cover bg-center
        px-5
        text-white
        min-h-[158px]
        flex justify-center items-center flex-col
        max-[768px]:py-10 max-[768px]:px-[15px]
        max-[480px]:min-h-[120px]
      "
      style={{
        backgroundImage: `url(${bannerImage.src})`,
      }}
    >
      <h5
        className="
          font-Inter font-black
          tracking-[-0.03em]
          text-[20px] leading-7
          md:text-[25px]
          lg:text-[25px]
          max-w-[95%]
          text-center
          bg-black/50
          px-2 py-1
          max-[480px]:w-full
        "
      >
        {question}
      </h5>

      {/* Progress bar */}
      <div className="mt-2 h-[3px] w-full overflow-hidden bg-[#EDEDED]">
        <div
          className="h-full bg-[#00AFE3] transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}

export default QuestionModalBanner;
