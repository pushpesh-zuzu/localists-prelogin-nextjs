import React from "react";
import Image from "next/image";
// import LogoIcon from "../common/icons/HomePageIcons/LogoIcon";
import H2 from "../../UI/Typography/H2";
import ServicesButton from "../../common/ServicesButton";
import LogoIcon from "../../common/icons/HomePageIcons/LogoIcon";
import WrapperBGWidth from "../../common/WrapperBGWidth/WrapperBGWidth";

export default function LandScapingGardenPopularJobs({
  services = [],
  popularImage = "",
  altText = "",
  mobileCardClass='w-[235px] min-[440px]:w-[302px] min-[512px]:w-[380px]',
  classNameD='md:max-w-[400px] xl:max-w-full'
}) {
  return (
    <WrapperBGWidth>
      {/* <div className="w-full max-w-[1200px] mx-auto aspect-[1200/590] relative">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/nearme/popularJobs.webp)" }}
      />
      
  
    </div> */}
      <div className="md:block rounded-[20px] md:rounded-none mx-[30px] md:mx-0 mt-2.5 md:mt-0 bg-[#00AFE3] md:bg-white  px-[17.5px] py-[30px]  sm:px-10 md:px-16 lg:px-16 md:pb-10 xl:px-[120px] pt-0 xl:pb-[100px]">
        <div className="rounded-[30px] md:max-w-[520px] min-[900px]:min-w-[670px] lg:max-w-[800px] xl:max-w-[1200px] md:h-[380px] lg:h-[380px] xl:h-[500px] relative overflow-visible">
          {/* 1️⃣ Shape background */}
          <div
            className="rounded-[20px] lg:rounded-[40px] absolute inset-0 bg-[#00AFE3]
            md:[clip-path:polygon(0%_0%,90%_0%,80.66%_100%,0%_100%)]"
          />

          {/* 2️⃣ Normal content layer */}
          <div className="relative z-10 h-full pt-[30px] md:pt-[37px] xl:pt-[0px] md:pb-[24px] xl:pb-0 md:px-8 xl:px-15 flex flex-col md:justify-center max-w-full lg:max-w-[70%]">
            <H2 className="text-white mb-4 md:mb-0 md:pb-4 xl:pb-[35px]">
              Popular Jobs.
            </H2>
            <p
              variant="secondary"
              // style={{ textShadow: "0px 3.65px 3.65px #00000026" }}
              className={`text-[16px] leading-[16px]
                max-w-[60%] lg:max-w-full
                md:text-[14px] md:leading-[16px]
                lg:text-[20px] lg:leading-[24px] font-[Arial] font-bold
                tracking-[0em]! l mb-5 md:mb-0 text-white  md:pb-4 xl:pb-[43px]`}
            >
              Click below to get a quote for the specific job you want
            </p>

            {/* 🔥 Centered Services Section */}
            <div className=" flex md:hidden items-center justify-center">
              <div className={`${mobileCardClass}`}>
                <div className={`flex flex-wrap gap-2 xl:gap-[16px] xl:gap-y-[19px] md:mb-4 xl:mb-4`}>
                  {services.map((service) => (
                    <ServicesButton
                      key={service}
                      service={service}
                      mobileBorder="border-2"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className={`hidden md:flex flex-wrap gap-2 xl:gap-[16px] xl:gap-y-[19px] md:mb-4 xl:mb-4 ${classNameD}`}>
              {services.map((service) => (
                <ServicesButton
                  mobileBorder="border-2"
                  key={service}
                  service={service}
                />
              ))}
            </div>
          </div>

          {/* 3️⃣ Floating Image */}
          <Image
            src={popularImage}
            alt={altText}
            width={400}
            height={600}
            fetchPriority="high"
            className="hidden md:block w-auto h-[382px] lg:h-[380px] xl:h-[500px] xl:w-[400px] absolute md:-right-33 min-[900px]:-right-25! lg:-right-19! xl:-right-14! bottom-0 z-20 pointer-events-none"
          />

          <LogoIcon className="hidden md:block absolute -bottom-1 -right-10 xl:-right-13 w-[100px] h-6 lg:w-[140px] lg:h-8 xl:w-[200px] xl:h-12" />
        </div>
      </div>
    </WrapperBGWidth>
  );
}
