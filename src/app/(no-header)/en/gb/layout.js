import CookieConsent from "@/app/component/common/CookieConsent/CookieConsent";
import CookiesWrapper from "@/app/component/common/CookieConsent/CookiesWrapper";
import React from "react";

function LayoutNoHeader({ children }) {
  return <div>
    {children}
    <CookiesWrapper />
  </div>;
}

export default LayoutNoHeader;
