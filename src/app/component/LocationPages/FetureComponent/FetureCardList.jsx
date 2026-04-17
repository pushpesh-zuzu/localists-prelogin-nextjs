"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import FeatureCard from "./FeatureCard";
import { useDispatch, useSelector } from "react-redux";
import { getFetchSellerListData } from "@/lib/store/buyerslice/buyerSlice";
import Loader from "../../common/Loader/Loader";
import NearmeH2Heading from "../../Nearme/NearmeH2Heading";
import Paragraph from "../../UI/Typography/Paragraph";

export default function FetureCardList({
  featureRef,
  serviceProfessionName = "Roofers",
  serviceId,
  serviceName,
  cityName = "Chester",
  county,
}) {
  const { getSellerData, getSellerDataLoader } = useSelector(
    (state) => state.buyer,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!serviceId) return;
    dispatch(
      getFetchSellerListData({
        service_id: serviceId,
        city: cityName,
        county: county,
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
  const lastTouchY = useRef(0);

  // ✅ Desktop: wheel scroll chaining
  const handleWheel = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollTop, scrollHeight, clientHeight } = el;
    const isAtTop = scrollTop <= 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      window.scrollBy({ top: e.deltaY });
    }
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enableInnerScroll) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [enableInnerScroll, handleWheel]);

  // ✅ iOS Safari: touchmove pe manually window.scrollBy — ye hi real fix hai
  const handleTouchStart = useCallback((e) => {
    lastTouchY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (!enableInnerScroll) return;
      const el = containerRef.current;
      if (!el) return;

      const currentY = e.touches[0].clientY;
      const deltaY = lastTouchY.current - currentY; // positive = niche ja raha hai
      lastTouchY.current = currentY;

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

      const goingDown = deltaY > 0;
      const goingUp = deltaY < 0;

      // Boundary pe hai aur usi direction mein — inner scroll rok ke window scroll karo
      if ((isAtTop && goingUp) || (isAtBottom && goingDown)) {
        e.preventDefault(); // inner scroll band
        window.scrollBy({ top: deltaY }); // window scroll
      }
    },
    [enableInnerScroll],
  );

  // passive: false ZAROORI hai — warna e.preventDefault() iOS pe kaam nahi karta
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !enableInnerScroll) return;

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
    };
  }, [enableInnerScroll, handleTouchStart, handleTouchMove]);

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
            element.getBoundingClientRect().top + window.scrollY + 400;
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
      <NearmeH2Heading
        headdingblue={`Find ${serviceProfessionName}`}
        headingblack="Near You"
      />

      {enableInnerScroll && (
        <style>{`
          .feature-scroll-fix {
            scrollbar-width: none;
          }
          .feature-scroll-fix::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      )}

      {/* Card Container */}
      <div
        ref={containerRef}
        className={`
          ${
            enableInnerScroll
              ? "feature-scroll-fix max-h-[1205px] overflow-y-auto mt-[34px] xl:mt-[46px]"
              : "mt-[34px] xl:mt-[46px]"
          }
        `}
        style={{
          overflowAnchor: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        <div className="flex flex-col gap-4 md:gap-12 px-1">
          {getSellerDataLoader ? (
            <Loader />
          ) : visibleSellers.length ? (
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
            <div className="flex min-h-[150px]">
              <Paragraph className="m-auto">
                No Seller Found in {cityName}
              </Paragraph>
            </div>
          )}
        </div>
      </div>

      {/* Show More */}
      {sellers.length > STEP && visibleCount < sellers.length && (
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