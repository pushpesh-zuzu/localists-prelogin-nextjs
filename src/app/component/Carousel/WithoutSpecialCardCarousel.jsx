"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavigationArrows from "../common/CarouselLeftRightIcon";

export default function WithoutSpecialCardCarousel({
  data,
  renderCard,
  mobileImageWidth = 72,
  mobileArrowSpacing = 12,
  showArrowAndDots = true,
}) {
  const MIN_SLIDES_FOR_LOOP = 6;

  const loopableCards =
    data.length === 0
      ? []
      : data.length >= MIN_SLIDES_FOR_LOOP
      ? data
      : Array.from({
          length: Math.ceil(MIN_SLIDES_FOR_LOOP / data.length),
        }).flatMap(() => data);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: false,
    loop: true,
  });

  const [emblaRefMobile, emblaApiMobile] = useEmblaCarousel({
    align: "center",
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedIndexMobile, setSelectedIndexMobile] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [scrollSnapsMobile, setScrollSnapsMobile] = useState([]);
  const originalSlideCount = data.length;

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

    const rawIndex = emblaApi.selectedScrollSnap();
    const normalizedIndex = rawIndex % originalSlideCount;

    setSelectedIndex(normalizedIndex);
  }, [emblaApi, originalSlideCount]);

  const onSelectMobile = useCallback(() => {
    if (!emblaApiMobile) return;
    setSelectedIndexMobile(emblaApiMobile.selectedScrollSnap());
  }, [emblaApiMobile]);

  const onInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi]);

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
          {showArrowAndDots ? (
            <div className="flex justify-end items-end mb-3.5 mr-[1%]">
              <NavigationArrows
                onPrev={scrollPrev}
                onNext={scrollNext}
                canScrollPrev={canScrollPrev}
                canScrollNext={canScrollNext}
              />
            </div>
          ) : (
            ""
          )}

          {/* Carousel - Maximum 4 cards, no cut-off */}
          <div className="overflow-hidden">
            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex gap-4 sm:gap-5 lg:gap-6">
                {loopableCards.map((card, index) => (
                  <div
                    key={`${card.id}-${index}`}
                    // className="flex-[0_0_calc(50%-10px)] 
                    //            sm:flex-[0_0_calc(50%-12.5px)]
                    //            md:flex-[0_0_calc(33.333%-13.33px)]
                    //            lg:flex-[0_0_calc(25%-18px)]
                    //            xl:flex-[0_0_calc(25%-18px)]
                    //            min-w-0"
                      className="flex-[0_0_calc(50%-10px)] 
                                  sm:flex-[0_0_calc(50%-12.5px)]
                                  md:flex-[0_0_calc(25%-15px)]
                                  lg:flex-[0_0_calc(25%-18px)]
                                  xl:flex-[0_0_calc(25%-18px)]
                                  min-w-0"

                  >
                    {renderCard(card, index)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Dot Indicators */}
          {showArrowAndDots ? (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: originalSlideCount }).map((_, index) => (
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
          ) : (
            ""
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden relative">
        <div className="overflow-hidden" ref={emblaRefMobile}>
          <div className="flex">
            {loopableCards.map((card, index) => (
              <div
                key={`${card.id}-${index}`}
                className="flex-[0_0_100%] flex justify-center"
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
          className="absolute top-[40%] -translate-y-1/2 bg-transparent text-gray-800 rounded-full z-10 hover:bg-gray-100"
          aria-label="Previous slide"
        >
          <svg
            width="20"
            height="32"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
          className="absolute top-[40%] -translate-y-1/2 bg-transparent text-gray-800 pr-3 rounded-full z-10 hover:bg-gray-100"
          aria-label="Next slide"
        >
          <svg
            width="20"
            height="32"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
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
        {showArrowAndDots ? (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: originalSlideCount }).map((_, index) => (
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
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
