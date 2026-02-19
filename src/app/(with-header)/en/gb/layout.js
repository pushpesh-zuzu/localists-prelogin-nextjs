import CookieConsent from "@/app/component/common/CookieConsent/CookieConsent";
import Header from "@/app/component/Header/Header";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <CookieConsent />
    </div>
  );
}

export default layout;
