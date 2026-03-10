import { Star, Phone, Mail } from "lucide-react";
import { useState } from "react";
import GalleryIcon from "../../../../../public/ReactIcons/GalleryIcon";
import LocationMapIcon from "../../common/icons/SellerRegistration/LocationMapIcon";
import Button1 from "../../UI/Typography/Button1";
import StarIconFeature from "../../../../../public/ReactIcons/StarIconFeature";
import HalfStarIconFeature from "../../../../../public/ReactIcons/HalfStarIconFeature";
import Image from "next/image";
import { BASE_IMAGE } from "@/utils";
import RequestARegistration from "../RequestAQuoteRegistration/RequestARegistration";

export default function FeatureCard({
  index,
  featured = false,
  setActiveFeture,
  seller = {},
  popularServices = [],
  cityName = "",
  serviceId,
  serviceName,
}) {
  const [showModal, setShowModal] = useState(false);
  const [imgError, setImgError] = useState(false);
  const businessName = seller?.business_profile_name || "";
  const totalReviews = seller?.total_reviews ?? 0;
  const location = cityName;
  const avgRating = parseFloat(seller?.avg_rating) || 0;

 const fullStars = Math.floor(avgRating);
const decimal = avgRating - fullStars;
const showHalf = decimal >= 0.5;
const emptyStars = 5 - fullStars - (showHalf ? 1 : 0);
  return (
    <div className="relative">
      {featured && (
          <div
            className="absolute z-0 -top-8.5 md:-top-9.5 lg:-top-12.5 md:-left-[5px] xl:-left-[4.7px]
    left-1/2 -translate-x-1/2 md:translate-x-0
    rounded-tl-[10px] rounded-tr-[10px] md:rounded-tl-[20px] md:rounded-tr-[20px] font-[Arial] font-black 
    tracking-[-0.03em]
    text-[14px]
    md:text-[16px]
    lg:text-[25px] bg-[#10C87B] text-white px-8 py-1.5 md:px-4.5 lg:px-8 pb-10"
          >
            FEATURED
          </div>
        )}
      <div
        onClick={() => {
          setActiveFeture(index);
        }}
        className={`relative w-full z-20 rounded-[30px] bg-white py-[17px] px-[15px] md:p-6 ${featured ? "mt-[38px] lg:mt-[50px]" : ""}   
          ${featured
            ? `border-[#fff] ring-2 ring-[#10C87B] md:ring-5 mt-[35px]  
          
          `
            : "ring-2 ring-[#fff] border-white md:ring-5"
          }`}
      >

       
        <div className="z-50 relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex items-start max-[768px]:justify-between md:gap-4 lg:gap-6">
            {seller.company_logo && !imgError ? (
              <Image
                height={96}
                width={96}
                src={`${BASE_IMAGE}users/${seller.company_logo}`}
                alt={businessName}
                className="rounded-[20px] h-20 w-20 md:h-24 md:w-24 lg:h-30 lg:w-30"
                unoptimized
                loading={featured ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={featured ? "high" : "low"}
                onError={() => setImgError(true)}
              />
            ) : (
              <GalleryIcon className="h-20 w-20 md:h-24 md:w-24 lg:h-30 lg:w-30" />
            )}

            <div className="max-w-[63%] min-w-[63%] md:max-w-full my-auto flex flex-col gap-1 lg:gap-3">
              <h5
                className="text-[18px] leading-[18px]
        md:text-[25px] md:leading-[25px]
        lg:text-[28px] lg:leading-[28px]  font-Inter font-black
        tracking-[-0.03em]"
              >
                {businessName}
              </h5>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex text-emerald-500">
                  {[...Array(fullStars)].map((_, i) => (
                    <StarIconFeature
                      key={`full-${i}`}
                      className="h-[18px] w-[18px] md:h-[30px] md:w-[30px]"
                    />
                  ))}

                  {/* HALF STAR */}
                  {showHalf && (
                    <HalfStarIconFeature className="h-[18px] w-[18px] md:h-[30px] md:w-[30px] lg:h-" />
                  )}

                  {/* EMPTY STARS */}
                  {
                    [...Array(emptyStars)].map((_, i) => (
                      <StarIconFeature
                        background1="#dfdfe8"
                        background2="#dfdfe8"
                        key={`empty-${i}`}
                        className="h-[18px] w-[18px] md:h-[30px] md:w-[30px] text-gray-300"
                      />
                    ))}
                </div>
                <span className="text-[14.46px] md:text-[20px] tracking-[-0.03em] font-[Arial] text-[#253238]">
                  {totalReviews ? totalReviews : "No"} Reviews
                </span>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <LocationMapIcon
                  background="#10C87B"
                  className="text-emerald-500 h-[18px] w-[15px] md:h-6 md:w-6"
                />
                <span className="text-sm md:text-[20px] tracking-[-0.03em] font-[Arial] text-[#253238]">
                  Operates in {location}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden md:flex md:gap-3 z-50 lg:gap-0 flex-col min-w-fit lg:bottom-[40px] lg:relative">
          <Button1
            onClick={() => {
              setShowModal(true);
            }}
            className="flex items-center ml-auto justify-center gap-2 w-fit"
          >
            <Phone color="white" size={24} /> Request a Callback
          </Button1>
        </div>

        <div className="max-w-full md:max-w-[69%] lg:max-w-[80%] flex flex-col gap-y-[30px] md:gap-y-0 md:flex-row gap-x-6">
          <div className="mt-4 flex items-center flex-wrap gap-[13px]">
            {seller?.services && seller?.services.map((service) => (
              <span
                key={service?.service_id}
                className="tracking-[-0.03em] font-bold font-[Arial] rounded-full border-[2.5px] h-fit border-[#B9B9C2] py-[5.35px] px-1.5 md:px-2 lg:px-4 lg:py-2 md:py-1 text-[11px] leading-[11px] md:leading-[17px] md:text-base lg:text-[18px] lg:leading-[18px] text-[#B9B9C2]"
              >
                {service?.name}
              </span>
            ))}
          </div>
          <div className="flex md:hidden flex-col gap-3 min-w-fit">
            <Button1
              onClick={() => {
                setShowModal(true);
              }}
              className="text-sm!
                        md:text-[16px]
                        lg:text-[18px] flex items-center mx-auto justify-center gap-2 w-fit"
            >
              <Mail color="white" size={24} /> Request a Callback
            </Button1>
          </div>
        </div>
      </div>
      {/* {showModal && (
        <RequestCallbackModal
          onClose={() => setShowModal(false)}
          onSubmit={(data) => {
            console.log("Callback Data:", data);
          }}
        />
      )} */}

      {showModal && (
        <RequestARegistration
          onClose={() => setShowModal(false)}
          serviceId={serviceId}
          serviceName={serviceName}
        />
      )}
    </div>
  );
}
