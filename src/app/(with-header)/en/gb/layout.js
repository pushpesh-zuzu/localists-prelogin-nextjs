// import CookieConsent from "@/app/component/common/CookieConsent/CookieConsent";
import CookiesWrapper from "@/app/component/common/CookieConsent/CookiesWrapper";
import Header from "@/app/component/Header/Header";
import React from "react";

function layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <CookiesWrapper />
    </div>
  );
}

export default layout;
