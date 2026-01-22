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

function LandingBlockPavingDriveway() {
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
                title={LANDING_TITLES_AND_META["block_paving_driveways_ppc"]?.title}
                paragraphs={
                    LANDING_DETAIL_DATA["block_paving_driveways_ppc"]?.paragraphs
                }
                defaultService={LANDING_SERVICES["driveways_ppc"]}
                isNeedS={false}
                bannerImage={
                    LANDING_DETAIL_BANNERS["block_paving_driveways_ppc"]?.banner
                }
                cancelHeading={CANCEL_POPUP_DATA.cancelHeading}
                cancelPara={CANCEL_POPUP_DATA.cancelPara}
                serviceId={ServiceId.driveways_ppc}
                welcomModalTitle={
                    LANDING_WELCOM_MODAL_TITLE["block_paving_driveways_ppc"]
                }
                welcomModalButtonText={
                    LANDING_WELCOM_MODAL_BUTTON_TITLE["block_paving_driveways_ppc"]
                }
            />

            <LandingHowItWork WORK_STEPS={LANDING_HOW_IT_WORK["landscaping_ppc"]} />
        </>
    )
}

export default LandingBlockPavingDriveway