'use client'

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Script from "next/script";

function Conversion() {
  const router = useRouter();
  const { requestId } = useParams();

  useEffect(() => {
    if (!requestId) return;

    const timer = setTimeout(() => {
      router.replace(`/bids-list/${requestId}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [router, requestId]);

// useEffect(() => {
//     if (typeof window !== 'undefined' && window.gtag) {
//       window.gtag('event', 'conversion', {
//         'send_to': 'AW-17528251553/iVB9CJjZsZMbEKHJj6ZB',
//         'value': 1.0,
//         'currency': 'GBP'
//       });
//     }
//   }, []);

  return (
    <>
      {/* Bing UET Tracking */}
      <Script
        id="bing-uet-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function (w, d, t, r, u) {
              var f, n, i;
              (w[u] = w[u] || []),
              (f = function () {
                var o = { ti: "97207664", enableAutoSpaTracking: true };
                (o.q = w[u]), (w[u] = new UET(o)), w[u].push("pageLoad");
              }),
              (n = d.createElement(t)),
              (n.src = r),
              (n.async = 1),
              (n.onload = n.onreadystatechange = function () {
                var s = this.readyState;
                (s && s !== "loaded" && s !== "complete") ||
                  (f(), (n.onload = n.onreadystatechange = null));
              }),
              (i = d.getElementsByTagName(t)[0]),
              i.parentNode.insertBefore(n, i);
            })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
          `
        }}
      />

      {/* Bing Consent - Default */}
      {/* <Script
        id="bing-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.uetq = window.uetq || [];
            window.uetq.push("consent", "default", {
              ad_storage: "denied",
            });
          `
        }}
      /> */}

      {/* Bing Consent - Update */}
      {/* <Script
        id="bing-consent-update"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.uetq = window.uetq || [];
            window.uetq.push("consent", "update", {
              ad_storage: "granted",
            });
          `
        }}
      /> */}
    </>
  )
}

export default Conversion;
