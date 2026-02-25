"use client";

import { useState, useRef, useEffect } from "react";
import FeatureCard from "./FeatureCard";
import { FetureSearchBox } from "./FetureSearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getFetchSellerListData } from "@/lib/store/buyerslice/buyerSlice";

export default function FetureCardList({
  serviceId,
  serviceName,
  serviceProfessionName,
  cityName = "Chester",
}) {
  const { getSellerData } = useSelector((state) => state.buyer);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!serviceId) return;

    dispatch(
      getFetchSellerListData({
        service_id: serviceId,
        city: cityName,
      }),
    );
  }, [serviceId, dispatch]);

  const sellers = getSellerData?.sellers || [];
  const popularServices = getSellerData?.popular_services
    ? getSellerData.popular_services.split(",").map((s) => s.trim())
    : [];

  const STEP = getSellerData?.recommended_count || 5;

  const [visibleCount, setVisibleCount] = useState(STEP);
  const [enableInnerScroll, setEnableInnerScroll] = useState(false);
  const [activeFeture, setActiveFeture] = useState(0);
  const newItemRef = useRef(null);

  useEffect(() => {
    setVisibleCount(STEP);
  }, [STEP]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + STEP);

    if (!enableInnerScroll) {
      setEnableInnerScroll(true);
    }

    setTimeout(() => {
      newItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const visibleSellers = sellers.slice(0, visibleCount);

  return (
    <div className="mx-auto max-w-[1115px] px-[30px] py-[40px] md:py-[50px] md:px-16  xl:px-[120px] lg:py-[72px]">
      <FetureSearchBox
        serviceProfessionName={serviceProfessionName}
        serviceId={serviceId}
        serviceName={serviceName}
      />

      {/* Card Container */}
      <div
        className={`
          ${enableInnerScroll ? "max-h-[1205px] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full overflow-y-auto px-1 pb-0.5 md:pb-[5px] mt-[34px] md:mt-[46px]" : "mt-[34px] md:mt-[46px]"}
        `}
      >
        <div className="flex flex-col gap-4 md:gap-12">
          {visibleSellers.map((seller, index) => (
            <div
              key={`${seller.id}-${index}`}
              ref={index === visibleCount - STEP ? newItemRef : null}
            >
              <FeatureCard
                index={index}
                featured={index === activeFeture}
                setActiveFeture={setActiveFeture}
                seller={seller}
                popularServices={popularServices}
                cityName={getSellerData?.city}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Show More */}
      <div className="flex justify-center pt-10 md:pt-[50px]">
        <button
          className="hover:bg-[#00afe3]  bg-black text-white
                              text-base
                              md:text-[16px]
                              lg:text-[18px]
                              px-[15px] py-2  xl:py-[15px] xl:px-7 h-fit rounded-full
                              shadow-[0_0_4px_rgba(0,0,0,0.1)
                              cursor-pointer disabled:opacity-70
                              inline-flex items-center justify-center
                              rounded-full
                              font-[Arial] font-bold
                              tracking-[-0.03em]
                              text-center align-middle
                              disabled:opacity-70
                              "
          disabled={visibleCount >= sellers.length}
          title={visibleCount >= sellers.length ? "No more data to show" : ""}
          onClick={handleShowMore}
        >
          Show more
        </button>
      </div>
    </div>
  );
}
