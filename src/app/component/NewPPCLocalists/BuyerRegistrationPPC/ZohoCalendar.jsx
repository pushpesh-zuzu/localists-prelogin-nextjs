"use client";

import { useRef } from "react";
import Script from "next/script";
import { getBarkUserData } from "@/utils/CookiesHelper";

export default function ZohoCalendar({ serviceId = "254145000000051037" }) {
  const containerRef = useRef(null);
  const userData = getBarkUserData();

  const customerName = userData?.name || "";
  const customerEmail = userData?.email || "";
  const customerPhone = userData?.phone || "";

  const bookingUrl =
    `https://localists.zohobookings.eu/portal-embed#/${serviceId}?` +
    "Name=" +
    encodeURIComponent(customerName) +
    "&Email=" +
    encodeURIComponent(customerEmail) +
    "&Contact Number=" +
    encodeURIComponent(customerPhone) +
    "&redirection_type=top";

  const handleScriptLoad = () => {
    if (window.Bookings) {
      window.Bookings.inlineEmbed({
        url: bookingUrl,
        parent: "#inline-container",
        height: "600px",
      });

      setTimeout(() => {
        const iframe = document.querySelector("#inline-container iframe");
        if (iframe) {
          iframe.style.width = "100%";
          iframe.style.height = "600px";
          iframe.style.border = "none";
        }
      }, 800);
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
        className="w-full max-w-full mx-auto rounded-2xl overflow-hidden shadow-sm"
        style={{ minHeight: "500px" }}
      />
    </>
  );
}
