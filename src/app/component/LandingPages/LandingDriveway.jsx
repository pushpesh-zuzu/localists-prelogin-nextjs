"use client"

import { useEffect, useState } from "react";

import CloseBrowserAbandon from "../common/CloseBrowserAbandon/CloseBrowserAbandon";
import NavigationDetectorDesktop from "../common/NavigationDetected/NavigationDetectorDesktop";
import NavigationDetectorWithConfirmations from "../common/NavigationDetected/NavigationDetectorWithConfirmations";
import FindDetailAndBannerWrapper from "./FindDetailAndBannerWrapper";
import LandingHowItWork from "./LandingHowItWork";
import {
  CANCEL_POPUP_DATA,
  LANDING_DETAIL_BANNERS,
  LANDING_DETAIL_DATA,
  LANDING_HOW_IT_WORK,
  LANDING_SERVICES,
  LANDING_TITLES_AND_META,
  LANDING_WELCOM_MODAL_BUTTON_TITLE,
  LANDING_WELCOM_MODAL_TITLE,
  ServiceId,
} from "./LandingPageData"

function LandingDriveway() {
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
      <CloseBrowserAbandon />
      {isClient && (
        <div>
          {isDesktop ? (
            <NavigationDetectorDesktop />
          ) : (
            <NavigationDetectorWithConfirmations />
          )}
        </div>
      )}
      <FindDetailAndBannerWrapper
        title={LANDING_TITLES_AND_META["driveways_ppc"]?.title}
        paragraphs={LANDING_DETAIL_DATA["driveways_ppc"].paragraphs}
        defaultService={LANDING_SERVICES["driveways_ppc"]}
        bannerImage={LANDING_DETAIL_BANNERS["driveways_ppc"]?.banner}
        cancelHeading={CANCEL_POPUP_DATA.cancelHeading}
        cancelPara={CANCEL_POPUP_DATA.cancelPara}
        serviceId={ServiceId.driveways_ppc}
        welcomModalTitle={LANDING_WELCOM_MODAL_TITLE["driveways_ppc"]}
        welcomModalButtonText={
          LANDING_WELCOM_MODAL_BUTTON_TITLE["driveways_ppc"]
        }
      />

      <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
    </>
  )
}

export default LandingDriveway