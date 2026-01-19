import React from "react";

const ProgressBarLandingPage = ({ value = 10, buyerStep }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className="relative w-full h-4 bg-gray-200">
      <div 
        className="absolute top-0 left-0 h-full transition-all duration-300 ease-in-out"
        style={{ 
          width: `${safeValue}%`,
          backgroundColor: buyerStep <= 3 ? 'rgba(22, 227, 42, 1)' : '' 
        }}
      />
    </div>
  );
};

export default ProgressBarLandingPage;