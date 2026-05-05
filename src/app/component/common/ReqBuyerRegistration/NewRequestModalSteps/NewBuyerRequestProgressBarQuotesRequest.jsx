import React from "react";

const NewBuyerRequestProgressBarQuotesRequest = ({ value = 0 }) => {
  const safeValue = Math.min(Math.max(Number(value) || 0, 0), 100);

  return (
    <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
      <div
        className="h-full transition-all duration-500 ease-in-out bg-[#00afe3]"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
};

export default NewBuyerRequestProgressBarQuotesRequest;