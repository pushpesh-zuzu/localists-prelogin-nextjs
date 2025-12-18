"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import NavigationArrows from "../common/CarouselLeftRightIcon";
import LeftArrowBlack from "../common/icons/HomePageIcons/LeftArrowBlack";
import RightArrowBlack from "../common/icons/HomePageIcons/RightArrowBlack";

export default function HomeGardenCarousel({
  data,
  renderCard,
  showSpecial = true,
  specialCard = null,
  mobileImageWidth = 72,
  mobileArrowSpacing = 15,
}) {
  const scrollableCards = data.filter((card) => !card.isSpecial);
  const MIN_SLIDES_FOR_LOOP = 6;

  const loopableCards =
    scrollableCards.length === 0
      ? []
      : scrollableCards.length >= MIN_SLIDES_FOR_LOOP
      ? scrollableCards
      : Array.from({
          length: Math.ceil(MIN_SLIDES_FOR_LOOP / scrollableCards.length),
        }).flatMap(() => scrollableCards);

  const specialCardData = data.find((card) => card.isSpecial);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    containScroll: "trimSnaps",
    dragFree: false,
    loop: true,
  });

  const [emblaRefMd, emblaApiMd] = useEmblaCarousel({
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
  const [selectedIndexMd, setSelectedIndexMd] = useState(0);
  const [selectedIndexMobile, setSelectedIndexMobile] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(true);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [scrollSnapsMobile, setScrollSnapsMobile] = useState([]);
  const originalSlideCount = scrollableCards.length;

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollPrevMd = useCallback(() => {
    if (emblaApiMd) emblaApiMd.scrollPrev();
  }, [emblaApiMd]);

  const scrollNextMd = useCallback(() => {
    if (emblaApiMd) emblaApiMd.scrollNext();
  }, [emblaApiMd]);

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

  const onSelectMd = useCallback(() => {
    if (!emblaApiMd) return;

    const rawIndex = emblaApiMd.selectedScrollSnap();
    const normalizedIndex = rawIndex % originalSlideCount;

    setSelectedIndexMd(normalizedIndex);
  }, [emblaApiMd, originalSlideCount]);

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
    if (!emblaApiMd) return;
    onSelectMd();
    emblaApiMd.on("select", onSelectMd);
    return () => {
      emblaApiMd.off("select", onSelectMd);
    };
  }, [emblaApiMd, onSelectMd]);

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
        <div className="relative max-w-full md:max-w-[90%] lg:max-w-full mx-auto">
          {/* Navigation Arrows */}
          <div className="hidden lg:flex justify-end items-end mb-3.5 mr-[1%]">
            <NavigationArrows
              onPrev={scrollPrev}
              onNext={scrollNext}
              canScrollPrev={canScrollPrev}
              canScrollNext={canScrollNext}
            />
          </div>

          {/* sm/md screens - Only 3 cards, no special card */}
          <div className="lg:hidden overflow-hidden ">
            <div ref={emblaRefMd} className="overflow-hidden">
              <div className="flex gap-6">
                {loopableCards.map((card, index) => (
                  <div
                    key={`${card.id}-${index}`}
                    className="shrink-0 w-[calc((100%-48px)/3)]"
                  >
                    {renderCard(card, index)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* lg+ screens - Special card + carousel */}
          {showSpecial && specialCardData ? (
            <>
              <div className="hidden lg:grid grid-cols-4 gap-6">
                <div>{specialCard || renderCard(specialCardData, -1)}</div>

                <div className="col-span-3 overflow-hidden">
                  <div ref={emblaRef} className="overflow-hidden">
                    <div className="flex gap-6">
                      {loopableCards.map((card, index) => (
                        <div
                          key={`${card.id}-${index}`}
                          className="shrink-0 w-[calc((100%-48px)/3)]"
                        >
                          {renderCard(card, index)}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={scrollPrevMd}
                style={{ left: "-5%" }}
                className="lg:hidden absolute top-[40%] -translate-y-1/2 bg-transparent text-gray-800 rounded-full z-10 hover:bg-gray-100"
              >
                {/* <svg
                  width="20"
                  height="32"
                  viewBox="0 0 16 16"
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
                </svg> */}
                <LeftArrowBlack className="h-5 w-2.5"/>
              </button>
              <button
                onClick={scrollNextMd}
                style={{ right: `-5%` }}
                className="lg:hidden absolute top-[40%] -translate-y-1/2 bg-transparent text-gray-800  rounded-full z-10 hover:bg-gray-100"
              >
                {/* <svg
                  width="20"
                  height="32"
                  viewBox="0 0 16 16"
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
                </svg> */}
                <RightArrowBlack className="h-5 w-2.5"/>
              </button>
            </>
          ) : (
            <div className="hidden lg:block overflow-hidden">
              <div ref={emblaRef} className="overflow-hidden">
                <div className="flex gap-6">
                  {loopableCards.map((card, index) => (
                    <div
                      key={`${card.id}-${index}`}
                      className="shrink-0 w-[calc((100%-52px)/4)] 2xl:w-[calc((100%-40px)/4)]"
                    >
                      {renderCard(card, index)}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 lg:gap-[11px] mt-6">
            {Array.from({ length: originalSlideCount }).map((_, index) => {
              const isMd =
                typeof window !== "undefined" && window.innerWidth < 1024;

              const activeIndex = isMd ? selectedIndexMd : selectedIndex;

              return (
                <button
                  key={index}
                  onClick={() =>
                    isMd
                      ? emblaApiMd?.scrollTo(index)
                      : emblaApi?.scrollTo(index)
                  }
                  className={`${
                    index === activeIndex
                      ? "w-3 md:w-[47px] xl:w-[89px]"
                      : "w-3 md:w-3 xl:w-[22px]"
                  } h-3 md:h-3 xl:h-[22px] rounded-full transition-all duration-700 ease-in-out bg-black`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
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
          style={{ left: `${mobileArrowSpacing - 1}px` }}
          className="absolute top-[40%] -translate-y-1/2 bg-transparent text-gray-800 rounded-full z-10 hover:bg-gray-100"
        >
          {/* <svg
            width="20"
            height="32"
            viewBox="0 0 16 16"
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
          </svg> */}
          <LeftArrowBlack className="h-5 w-2.5"/>
        </button>
        <button
          onClick={scrollNextMobile}
          style={{ right: `${mobileArrowSpacing}px` }}
          className="absolute top-[40%]  -translate-y-1/2 bg-transparent text-gray-800  rounded-full z-10 hover:bg-gray-100"
        >
          {/* <svg
            width="20"
            height="32"
            viewBox="0 0 16 16"
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
          </svg> */}
          <RightArrowBlack className="h-5 w-2.5"/>
        </button>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: originalSlideCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApiMobile?.scrollTo(index)}
              className={`${
                index === selectedIndexMobile ? "w-[51px] h-[13px]" : "w-[11.59px] h-[11.59px]"
              } rounded-full transition-all duration-700 ease-in-out bg-black`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
