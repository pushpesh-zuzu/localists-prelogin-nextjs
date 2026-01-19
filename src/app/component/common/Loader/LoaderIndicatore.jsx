import React from "react";

const LoaderIndicator = ({ size = "default" }) => {
  const sizeMap = {
    small: "w-3.5 h-3.5",
    default: "w-5 h-5",
    large: "w-8 h-8",
  };

  const dotSizeMap = {
    small: "w-1.5 h-1.5",
    default: "w-2 h-2",
    large: "w-3 h-3",
  };

  return (
    <div className={`${sizeMap[size]} relative inline-block`}>
      <style>{`
        @keyframes antRotate {
          to { transform: rotate(405deg); }
        }
        .ant-spin-dot {
          animation: antRotate 1.2s infinite linear;
        }
        @keyframes antSpinMove {
          0% { opacity: 1; }
          50% { opacity: 0.3; }
          100% { opacity: 1; }
        }
        .ant-spin-dot-item {
          animation: antSpinMove 1s infinite linear alternate;
        }
        .ant-spin-dot-item:nth-child(1) { animation-delay: 0s; }
        .ant-spin-dot-item:nth-child(2) { animation-delay: 0.4s; }
        .ant-spin-dot-item:nth-child(3) { animation-delay: 0.8s; }
        .ant-spin-dot-item:nth-child(4) { animation-delay: 1.2s; }
      `}</style>
      <span className="ant-spin-dot absolute inset-0">
        <i
          className={`ant-spin-dot-item absolute top-0 left-0 ${dotSizeMap[size]} bg-[#00aef3] rounded-full`}
        />
        <i
          className={`ant-spin-dot-item absolute top-0 right-0 ${dotSizeMap[size]} bg-[#00aef3] rounded-full`}
        />
        <i
          className={`ant-spin-dot-item absolute bottom-0 right-0 ${dotSizeMap[size]} bg-[#00aef3] rounded-full`}
        />
        <i
          className={`ant-spin-dot-item absolute bottom-0 left-0 ${dotSizeMap[size]} bg-[#00aef3] rounded-full`}
        />
      </span>
    </div>
  );
};
export default LoaderIndicator;
