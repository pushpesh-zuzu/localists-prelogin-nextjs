
"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { getBarkUserData } from "@/utils/CookiesHelper";

export default function ZohoCalendar({ serviceId = "254145000000051037" }) {
  const containerRef = useRef(null);
  const userData = getBarkUserData();

  const customerName = userData.name || "";
  const customerEmail = userData.email || "";
  const customerPhone = userData.phone || "";

  const bookingUrl =
    `https://localists.zohobookings.eu/portal-embed#/${serviceId}?redirection_type=top` +
    "?Name=" +
    encodeURIComponent(customerName) +
    "&Email=" +
    encodeURIComponent(customerEmail) +
    "&Contact Number=" +
    encodeURIComponent(customerPhone);

  const handleScriptLoad = () => {
    if (window.Bookings) {
      window.Bookings.inlineEmbed({
        url: bookingUrl,
        parent: "#inline-container",
        height: "700px",
      });
    }
  };

  return (
    <>
      <Script
        src="https://bookings.nimbuspop.com/assets/embed.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
      <div
        id="inline-container"
        ref={containerRef}
        style={{ width: "100%", minHeight: "700px" }}
      />
    </>
  );
}
