import CookieConsent from "@/app/component/common/CookieConsent/CookieConsent";
import React from "react";

function LayoutNoHeader({ children }) {
  return <div>
    {children}
    <CookieConsent />
  </div>;
}

export default LayoutNoHeader;
