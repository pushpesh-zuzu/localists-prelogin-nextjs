"use client";

import { useState, useEffect } from "react";
import FeatureCard from "./FeatureCard";
import { FetureSearchBox } from "./FetureSearchBox";
import { useDispatch, useSelector } from "react-redux";
import { getFetchSellerListData } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";
import { useRef } from "react";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";

export default function FetureCardList({
  featureRef,
  serviceProfessionName='Roofers',
  serviceId,
  serviceName,
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

  useEffect(() => {
    setVisibleCount(STEP);
  }, [STEP]);

  const containerRef = useRef(null);
  const newItemRef = useRef(null);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + STEP);
    if (!enableInnerScroll) {
      setEnableInnerScroll(true);
    }

    setTimeout(() => {
      if (newItemRef.current) {
        const containerTop = containerRef.current.getBoundingClientRect().top;
        const itemTop = newItemRef.current.getBoundingClientRect().top;
        const offset = containerRef.current.clientHeight * 0.8;
        containerRef.current.scrollBy({
          top: itemTop - containerTop - offset,
          behavior: "smooth",
        });
        const element = featureRef?.current;
        if (element) {
          const top =
            element.getBoundingClientRect().top + window.scrollY - -400;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    }, 100);
  };
  const visibleSellers = sellers.slice(0, visibleCount);

  return (
    <div
      className="mx-auto max-w-[1520px] px-[30px] pt-[30px] pb-[40px] md:py-[50px] md:px-16 xl:px-[120px] lg:py-[72px]"
      style={{ overflowAnchor: "none" }}
    >
      {/* <FetureSearchBox
        serviceProfessionName={serviceProfessionName}
        serviceId={serviceId}
        serviceName={serviceName}
      /> */}
      <NearmeH2Heading
        headdingblue={`Find ${serviceProfessionName}`}
        headingblack="Near You"
      />

      {/* Card Container */}
      <div
        ref={containerRef}
        className={`
          ${
            enableInnerScroll
              ? "max-h-[1205px] overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full px-1 pb-0.5 md:pb-[5px] mt-[34px] xl:mt-[46px]"
              : "mt-[34px] xl:mt-[46px]"
          }
        `}
        style={{ overflowAnchor: "none" }}
      >
        <div className="flex flex-col gap-4 md:gap-12">
          {visibleSellers.length ? (
            visibleSellers.map((seller, index) => (
              <div
                key={`${seller.id}-${index}`}
                ref={index === visibleCount - STEP ? newItemRef : null}
              >
                <FeatureCard
                  index={index}
                  featured={index === 0}
                  setActiveFeture={setActiveFeture}
                  seller={seller}
                  popularServices={popularServices}
                  cityName={getSellerData?.city}
                  serviceId={serviceId}
                  serviceName={serviceName}
                />
              </div>
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>

      {/* Show More */}
      {visibleCount <= sellers.length && (
        <div className="flex justify-center pt-10 md:pt-[50px]">
          <button
            className="hover:bg-[#00afe3] bg-black text-white
                        text-base md:text-[16px] lg:text-[18px]
                        px-[15px] py-2 xl:py-[15px] xl:px-7 h-fit
                        shadow-[0_0_4px_rgba(0,0,0,0.1)]
                        cursor-pointer disabled:opacity-70
                        inline-flex items-center justify-center
                        rounded-full font-[Arial] font-bold
                        tracking-[-0.03em] text-center align-middle"
            disabled={visibleCount >= sellers.length}
            onClick={handleShowMore}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
