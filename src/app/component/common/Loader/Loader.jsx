import React from "react";
import LoaderIndicator from "./LoaderIndicatore";

function Loader({ size = "large" }) {
  return (
    <div className="flex items-center justify-center min-h-80 min-w-[300px] w-[300px] mx-auto">
      <LoaderIndicator size={size} />
    </div>
  );
}

export default Loader;
