import React from "react";
import ServicesImageCard from "../../common/ServicesImageCard";
import DiscoverCarousel from "../../common/DiscoverCarousel";
import DiscoverMobileCarouse from "../../common/DiscoverMobileCarouse";
import H2 from "../../UI/Typography/H2";
import NavigationArrows from "../../common/CarouselLeftRightIcon";
const servicesImages = [
  { id: 1, path: "/fenceandgate.webp", title: "Fence & Gate Installation" },
  { id: 2, path: "/treesurgery.webp", title: "Tree Surgery" },
  {
    id: 3,
    path: "/artificialgrassinstallation.webp",
    title: "Artificial Grass Installation",
  },
  {
    id: 4,
    path: "/drivewaysinstallation.webp",
    title: "Driveway Installation",
  },
  { id: 5, path: "/patiolayer.webp", title: "Patio Laying" },
  { id: 6, path: "/artificialgrassinstallation.webp", title: "Landscaping" },
  { id: 7, path: "/roofing.webp", title: "Roofing" },
];
const servicesImages3 = [
  { id: 1, path: "/homepage/image8.webp", title: "Wedding Photography" },
  { id: 2, path: "/homepage/image13.webp", title: "DJ" },
  {
    id: 3,
    path: "/homepage/image14.webp",
    title: "Magicial",
  },
  {
    id: 4,
    path: "/homepage/image10.webp",
    title: "Decoration",
  },
];
const servicesImages2 = [
  { id: 1, path: "/homepage/image5.webp", title: "Web Desing" },
  { id: 2, path: "/homepage/image6.webp", title: "Business Consultant" },
  {
    id: 3,
    path: "/homepage/image7.webp",
    title: "Accoutant",
  },
  {
    id: 4,
    path: "/homepage/image6.webp",
    title: "Account Mananging",
  },
];
function DiscoverServices() {
  return (
    <div className="md:block px-2.5 py-5 sm:px-10 xl:px-[88px] pt-12 pb-[72px]">
      {/* <h2 className="hidden md:block text-center font-bold md:pb-7 xl:pb-[43px] md:text-[34px] xl:text-[75px] text-[#00afe3]">
        Discover <span className="text-black">services.</span>{" "}
      </h2> */}
      <H2 className="text-[#00afe3] pb-4 xl:pb-10 text-center">
        Discover <span className="text-black">services.</span>{" "}
      </H2>
      <div>
        <div className="hidden md:flex justify-end mb-2.5">
          <NavigationArrows />
        </div>
        <div className="flex md:hidden justify-between py-5 xl:pb-10">
          <h2 className="text-[#00AFE3] font-bold text-2xl leading-[18px]">
            Home & Garden
          </h2>{" "}
          <button className="font-bold">See All</button>
        </div>
        <div className="hidden sm:flex items-start">
          <DiscoverCarousel
            visibleItems={3}
            autoSlideInterval={5000}
            showControls={true}
            showDots={true}
            centerItems={true}
          >
            {servicesImages.map((service) => (
              <div key={service.id} className="px-2">
                <ServicesImageCard path={service.path} title={service.title} />
              </div>
            ))}
          </DiscoverCarousel>
        </div>
        <div className="flex sm:hidden items-start">
          <DiscoverMobileCarouse
            visibleItems={1}
            autoSlideInterval={5000}
            showControls={true}
            showDots={true}
            centerItems={true}
          >
            {servicesImages.map((service) => (
              <div key={service.id}>
                <ServicesImageCard path={service.path} title={service.title} />
              </div>
            ))}
          </DiscoverMobileCarouse>
        </div>
      </div>

      {/* second */}
      <div>
        <div className="hidden md:flex justify-end mb-2.5">
          <NavigationArrows />
        </div>
        <div className="flex md:hidden justify-between py-5 xl:pb-10">
          <h2 className="text-[#00AFE3] font-bold text-2xl leading-[18px]">
            Business Services
          </h2>{" "}
          <button className="font-bold">See All</button>
        </div>
        <div className="hidden sm:flex items-start">
          <DiscoverCarousel
            visibleItems={3}
            autoSlideInterval={5000}
            showControls={true}
            showDots={true}
            centerItems={true}
            businessName="Business Services"
          >
            {servicesImages2.map((service) => (
              <div key={service.id} className="px-2">
                <ServicesImageCard path={service.path} title={service.title} />
              </div>
            ))}
          </DiscoverCarousel>
        </div>
        <div className="flex sm:hidden items-start">
          <DiscoverMobileCarouse
            visibleItems={1}
            autoSlideInterval={5000}
            showControls={true}
            showDots={true}
            centerItems={true}
            businessName="Business Services"
          >
            {servicesImages.map((service) => (
              <div key={service.id}>
                <ServicesImageCard path={service.path} title={service.title} />
              </div>
            ))}
          </DiscoverMobileCarouse>
        </div>
      </div>

      {/* third  */}
      <div>
        <div className="hidden md:flex justify-end mb-2.5">
          <NavigationArrows />
        </div>
        <div className="flex md:hidden justify-between py-5 xl:pb-10">
          <h2 className="text-[#00AFE3] font-bold text-2xl leading-[18px]">
            Weddings & Events
          </h2>{" "}
          <button className="font-bold">See All</button>
        </div>
        <div className="hidden sm:flex items-start">
          <DiscoverCarousel
            visibleItems={3}
            autoSlideInterval={5000}
            showControls={true}
            showDots={true}
            centerItems={true}
            businessName={"Weddings & Events"}
          >
            {servicesImages3.map((service) => (
              <div key={service.id} className="px-2">
                <ServicesImageCard path={service.path} title={service.title} />
              </div>
            ))}
          </DiscoverCarousel>
        </div>
        <div className="flex sm:hidden items-start">
          <DiscoverMobileCarouse
            visibleItems={1}
            autoSlideInterval={5000}
            showControls={true}
            showDots={true}
            centerItems={true}
          >
            {servicesImages.map((service) => (
              <div key={service.id}>
                <ServicesImageCard path={service.path} title={service.title} />
              </div>
            ))}
          </DiscoverMobileCarouse>
        </div>
      </div>
    </div>
  );
}

export default DiscoverServices;
