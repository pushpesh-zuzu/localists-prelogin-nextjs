import React from "react";
import styles from "./WrapperBGWidth.module.css";

function WrapperBGWidth({
  children,
  background,
  className = "",
  secondaryClass = "",
}) {
  return (
    <div
      className={`w-full mx-auto ${className} ${secondaryClass} ${background ? styles.bgResponsive : ""}`}
      style={background ? { "--wrapper-bg": background } : {}}
    >
      <div className={`max-w-[1536px] mx-auto `}>{children}</div>
    </div>
  );
}

export default WrapperBGWidth;
