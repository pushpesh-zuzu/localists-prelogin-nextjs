"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavigationArrows from "../common/CarouselLeftRightIcon";

export default function HomeGardenCarousel({
  data,
  renderCard,
  showSpecial = true,
  specialCard = null,
  mobileImageWidth = 70,
  mobileArrowSpacing = 16,
}) {
  const scrollableCards = data.filter((card) => !card.isSpecial);
  const specialCardData = data.find((card) => card.isSpecial);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: false,
  });

  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({
    align: "center",
    loop: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexMobile, setSelectedIndexMobile] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [scrollSnapsMobile, setScrollSnapsMobile] = useState([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrevMobile = useCallback(() => {
    if (emblaApiMobile) emblaApiMobile.scrollPrev();
  }, [emblaApiMobile]);

  const scrollNextMobile = useCallback(() => {
    if (emblaApiMobile) emblaApiMobile.scrollNext();
  }, [emblaApiMobile]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  const onSelectMobile = useCallback(() => {
    if (!emblaApiMobile) return;
    setSelectedIndexMobile(emblaApiMobile.selectedScrollSnap());
  }, [emblaApiMobile]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

  // ✅ New: Initialize scroll snaps - Mobile
  const onInitMobile = useCallback(() => {
    if (!emblaApiMobile) return;
    setScrollSnapsMobile(emblaApiMobile.scrollSnapList());
  }, [emblaApiMobile]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit();
    onSelect();
    emblaApi.on("init", onInit);
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("init", onInit);
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  useEffect(() => {
    if (!emblaApiMobile) return;
    onInitMobile();
    onSelectMobile();
    emblaApiMobile.on("init", onInitMobile);
    emblaApiMobile.on("select", onSelectMobile);
    return () => {
      emblaApiMobile.off("init", onInitMobile);
      emblaApiMobile.off("select", onSelectMobile);
    };
  }, [emblaApiMobile, onInitMobile, onSelectMobile]);

  return (
    <div className="w-full">
      {/* Desktop/Tablet View */}
      <div className="hidden sm:block">
        <div className="relative">
          {/* Navigation Arrows */}
          <div className="flex justify-end items-end mb-3.5 mr-[1%]">
            <NavigationArrows
              onPrev={scrollPrev}
              onNext={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
            />
          </div>

          {/* Conditional Layout based on showSpecial */}
          {showSpecial && specialCardData ? (
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-6">
              <div>{specialCard || renderCard(specialCardData, -1)}</div>

              <div className="col-span-2 lg:col-span-3 overflow-hidden">
                <div ref={emblaRef} className="overflow-hidden">
                  <div className="flex gap-6">
                    {scrollableCards.map((card, index) => (
                      <div
                        key={card.id || index}
                        className="shrink-0 w-[calc((100%-24px)/2)] lg:w-[calc((100%-48px)/3)]"
                      >
                        {renderCard(card, index)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-6">
                  {scrollableCards.map((card, index) => (
                    <div
                      key={card.id || index}
                      className="shrink-0 w-[calc((100%-48px)/3)] lg:w-[calc((100%-52px)/4)] 2xl:w-[calc((100%-32px)/4)]"
                    >
                      {renderCard(card, index)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`${
                  index === selectedIndex
                    ? "w-3 md:w-[47px] xl:w-[89px]"
                    : "w-3 md:w-3 xl:w-[22px]"
                } h-3 md:h-3 xl:h-[22px] rounded-full transition-all duration-700 ease-in-out bg-black`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden relative">
        <div className="overflow-hidden" ref={emblaRefMobile}>
          <div className="flex">
            {scrollableCards.map((card, index) => (
              <div
                key={card.id || index}
                className="flex-[0_0_100%] flex justify-center px-2"
              >
                <div style={{ width: `${mobileImageWidth}%` }}>
                  {renderCard(card, index)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Arrows */}
        <button
          onClick={scrollPrevMobile}
          style={{ left: `${mobileArrowSpacing}px` }}
          className="absolute top-1/2 -translate-y-1/2 bg-transparent text-gray-800 p-3 rounded-full z-10 hover:bg-gray-100"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Previous slide"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={scrollNextMobile}
          style={{ right: `${mobileArrowSpacing}px` }}
          className="absolute top-1/2 -translate-y-1/2 bg-transparent text-gray-800 p-3 rounded-full z-10 hover:bg-gray-100"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Next slide"
          >
            <path
              d="M9 18L15 12L9 6"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {scrollSnapsMobile.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApiMobile?.scrollTo(index)}
              className={`${
                index === selectedIndexMobile ? "w-[51px]" : "w-[11px]"
              } h-[11px] rounded-full transition-all duration-700 ease-in-out bg-black`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
