"use client"

import { useEffect, useState } from "react";

// import CloseBrowserAbandon from "../common/CloseBrowserAbandon/CloseBrowserAbandon";
import NavigationDetectorDesktop from "../common/NavigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../common/NavigationDetected/NavigationDetectorWithConfirmations";

function LandingLandscapingPPC() {
  const [isClient, setIsClient] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);


  useEffect(() => {
    setIsClient(true);
    setIsDesktop(window.innerWidth > 768);

    // Window resize
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  return (
    <>
      {/* <CloseBrowserAbandon /> */}
      {isClient && (
        <div>
          {isDesktop ? (
            <NavigationDetectorDesktop />
          ) : (
            <NavigationDetectorWithConfirmations />
          )}
        </div>
      )}
      <div>LandscapingPPC</div>
    </>
  )
}

export default LandingLandscapingPPC