import React, { useState, useEffect } from "react";

const LoaderWithTextMultiStepForm = ({
  loadingTexts = [
    "Evaluating your requirements",
    "Sorting best local matches",
    "Curating top matches",
  ],
  intervalTime = 1000,
  totalLoadingTime = 3000,
  setIsInitialLoading,
  setIsBannerText,
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsInitialLoading(false);
      setIsBannerText(true);
    }, totalLoadingTime);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, [setIsInitialLoading, setIsBannerText, totalLoadingTime]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prevIndex) =>
        prevIndex < loadingTexts.length - 1 ? prevIndex + 1 : prevIndex,
      );
    }, intervalTime);

    const timer = setTimeout(() => {
      clearInterval(textInterval);
    }, totalLoadingTime);

    return () => {
      clearInterval(textInterval);
      clearTimeout(timer);
    };
  }, [loadingTexts, intervalTime, totalLoadingTime]);

  return (
    <div className="flex flex-col items-center justify-center p-5 text-center min-h-[200px]">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin mb-5"></div>
      <p className="text-lg font-semibold text-black mb-4 min-h-[30px] transition-opacity duration-300">
        {loadingTexts[currentTextIndex]}
      </p>
    </div>
  );
};

export default LoaderWithTextMultiStepForm;
