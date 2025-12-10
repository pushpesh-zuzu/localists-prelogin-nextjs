"use client";

import { useState, useEffect, useCallback, memo } from "react";

const DiscoverMobileCarouse = memo(function Carousel({
  children,
  visibleItems = 4,
  autoSlideInterval = 100000,
  showControls = true,
  showDots = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const childrenArray = Array.isArray(children) ? children : [children];
  const totalItems = childrenArray.length;

  // Calculate total slides (dots count)
  const totalSlides = Math.ceil(totalItems / visibleItems);

  const nextSlide = useCallback(() => {
    if (totalItems <= visibleItems) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  }, [totalItems, visibleItems, totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalItems <= visibleItems) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  }, [totalItems, visibleItems, totalSlides]);

  // Auto slide effect
  useEffect(() => {
    if (autoSlideInterval > 0 && totalItems > visibleItems) {
      const interval = setInterval(() => {
        nextSlide();
      }, autoSlideInterval);

      return () => clearInterval(interval);
    }
  }, [autoSlideInterval, nextSlide, totalItems, visibleItems]);

  // Get items to display with proper rotation
  const getVisibleChildren = () => {
    const items = [];

    for (let i = 0; i < visibleItems; i++) {
      const itemIndex = (currentIndex * visibleItems + i) % totalItems;
      items.push(
        <div
          key={itemIndex}
          className="shrink-0"
          style={{ width: `${100 / visibleItems}%` }}
        >
          {childrenArray[itemIndex]}
        </div>
      );
    }

    return items;
  };

  return (
    <section className="w-full" aria-label="Carousel">
      <div className="w-full">
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - FIXED ARROW POSITIONING */}
          {/* {showControls && totalItems > visibleItems && (
            <>
              <button
                onClick={prevSlide}
                className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-transparent rounded-full p-3 transition-all duration-200"
                style={{ left: "0px" }} // 50px from left edge
                aria-label="Previous slide"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={nextSlide}
                className="absolute  top-1/2 transform -translate-y-1/2 z-10  rounded-full p-3 transition-all duration-200"
                style={{ right: "0px" }} // 50px from right edge
                aria-label="Next slide"
              >
                <svg
                  className="w-6 h-6 text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )} */}

          {/* Children Container - With proper centering */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out justify-center" // Changed to justify-center
            >
              {getVisibleChildren().map((child, index) => (
                <div
                  key={`${currentIndex}-${index}`}
                  className="flex justify-center" // Center each card
                >
                  {child}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Indicator - Show only when there are multiple slides */}
        {showDots && totalSlides > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`${
                  index === currentIndex
                    ? "w-[51px] md:w-[47px] xl:w-[89px]"
                    : "w-[11px] md:w-3 xl:w-[22px]"
                } h-[11px] md:h-3 xl:h-[22px] rounded-full transition-all duration-200 bg-black`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

export default DiscoverMobileCarouse;
