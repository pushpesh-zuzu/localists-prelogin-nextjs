import {  Star, Phone, Mail } from "lucide-react";
import { useState } from "react";
import GalleryIcon from "../../../../../public/ReactIcons/GalleryIcon";
import LocationMapIcon from "../../common/icons/SellerRegistration/LocationMapIcon";
import RequestCallbackModal from "../RequestCallbackModal";
import Button1 from "../../UI/Typography/Button1";

export default function FeatureCard({index, featured = false }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={`relative w-full z-20 rounded-[30px] bg-white py-[17px] px-[15px] md:p-6 ${index ===0 ?'mt-[70px] md:mt-[84px]' : ''}   ${
          featured
            ? `border-[#10C87B] ring-2 ring-[#10C87B] border-5 mt-[35px]  
          md:before:content-[''] 
          md:before:absolute 
          md:before:-top-[2.5px]
          md:before:w-[18px] 
          
          lg:before:-top-[2px]
          md:before:-left-[7px] 
          lg:before:w-[14px] 
          md:before:h-10 
          md:before:border-t-8 
          md:before:border-l-7 
         md:before:border-[#10C87B]
          md:before:rounded-[3px]
          `
            : ""
        }`}
      >
       {featured && (
  <div
    className="absolute z-40 -top-9.5 lg:-top-12.5 md:-left-[7px] 
    left-1/2 -translate-x-1/2 md:translate-x-0
    rounded-tl-[20px] rounded-tr-[20px] font-[Arial] font-black 
    tracking-[-0.03em]
    text-[14px]
    md:text-[16px]
    lg:text-[25px] bg-[#10C87B] text-white px-8 py-1.5 md:px-4.5 lg:px-8"
  >
    FEATURED
  </div>
)}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex items-start max-[768px]:justify-between md:gap-4">
            <GalleryIcon className="h-22 w-22 md:h-24 md:w-24" />

            <div className="my-auto flex flex-col gap-1">
              <h5 className="text-[18.8px] leading-[21.7px]
        md:text-[25px] md:leading-[25px]
        lg:text-[25px] lg:leading-[25px]  font-Inter font-black
        tracking-[-0.03em]">D.Roberts & Son</h5>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex text-emerald-500">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={24} fill="currentColor" className="h-[21px] w-[21px]" />
                  ))}
                </div>
                <span className="text-[14.46px] md:text-[20px] tracking-[-0.03em] font-[Arial] text-[#253238]">
                  36 Reviews
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                {/* <MapPin size={24} className="text-emerald-500" /> */}
                                <LocationMapIcon background="#10C87B"  className="text-emerald-500 h-[18px] w-[15px] md:h-6 md:w-6" />

                <span className="text-sm md:text-[20px] tracking-[-0.03em] font-[Arial] text-[#253238]">
                  Chester
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col gap-3 min-w-fit">
         
          <Button1
            onClick={() => {
              setShowModal(true);
            }}
            className="flex items-center ml-auto justify-center gap-2 w-fit"
          >
            <Phone color="white" size={24} /> Request a Callback
          </Button1>
        </div>
        <div className="max-w-full md:max-w-[69%] flex flex-col gap-y-[30px] md:gap-y-0 md:flex-row gap-x-6">
          <div className="mt-4 flex  items-center flex-wrap gap-[13px]">
            {[
              "Roof Repair",
              "Flashing",
              "Waterproofing",
              "Roof Replacement",
              "Shingle replacement",
              "Leadworks installation",
            ].map((service) => (
              <span
                key={service}
                className="tracking-[-0.03em] font-bold font-[Arial] rounded-full border-[2.5px] h-fit border-[#B9B9C2] py-[5.35px] px-1.5 md:px-2 md:py-1 text-[11px] leading-[11px] md:leading-[17px] md:text-base text-[#B9B9C2]"
              >
                {service}
              </span>
            ))}
          </div>
            <div className="flex md:hidden flex-col gap-3 min-w-fit">
          <Button1
            onClick={() => {
              setShowModal(true);
            }}
            className="  text-sm!
                        md:text-[16px]
                        lg:text-[18px] flex items-center mx-auto justify-center gap-2 w-fit"
          >
            <Mail color="white" size={24} /> Request a Callback
            
          </Button1>
        </div>
        </div>
      </div>
      {showModal && (
        <RequestCallbackModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log("Callback Data:", data);
          }}
        />
      )}
    </>
  );
}
