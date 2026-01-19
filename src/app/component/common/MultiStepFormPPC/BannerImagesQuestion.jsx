import drivewaysBanner from "./banner/Driveways.webp";
import fenceBanner from "./banner/Fence.webp";
import landscapingBanner from "./banner/landscapingandgardeningBanner.webp";
import treeSurgeonBanner from "./banner/TreeSurgeonMultiStepBanner.webp";
import roofingBanner from "./banner/Roofing.webp";
import Image from "next/image";

const bannerMap = {
  "Driveway Installers": drivewaysBanner,
  "Fence & Gate Installation": fenceBanner,
  Landscaping: landscapingBanner,
  "Tree Surgeon": treeSurgeonBanner,
  Roofing: roofingBanner,
};

const altTag = {
  "Driveway Installers": "driveway installation",
  "Fence & Gate Installation": "garden fence installation",
  Landscaping: "landscapers near me",
  "Tree Surgeon": "tree surgeons near me",
  Roofing: "Roofers near me",
};

const BannerImagesQuestion = ({ serviceName = "Landscaping" }) => {
  return (
    <div className="">
      <Image
        src={bannerMap[serviceName] || landscapingBanner}
        alt={`${altTag[serviceName]}`}
        className="w-full object-contain sm:object-cover  h-auto md:object-cover rounded-none min-h-[158px] block sm:mb-4  sm:mb-0"
        width={1200}
        height={158}
        priority
      />
    </div>
  );
};

export default BannerImagesQuestion;
