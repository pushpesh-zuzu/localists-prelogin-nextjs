import React from "react";

const ProgressBarQuoteRequest = ({ value = 0 }) => {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  console.log("aaaaaaaaaa", value)

  return (
    <div className="w-full h-4 bg-gray-200 overflow-hidden">
      <div
        className="h-full transition-all duration-500 ease-in-out bg-[#16E32A]"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};

export default ProgressBarQuoteRequest;