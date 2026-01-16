import { Suspense } from "react";

export const metadata = {
  title: "Privacy Policy – Localists.com | Trusted UK Marketplace",
  description:
    "Read the Privacy Policy of Localists.com, operated by IMG Limited, explaining how your personal data is collected, used and protected when using our UK services.",

  alternates: {
    canonical: "https://www.localists.com/privacy-policy",
    languages: {
      "en-GB": "https://www.localists.com/en/gb/privacy-policy"
    },
  },

  openGraph: {
    title: "Privacy Policy – Localists.com | Trusted UK Marketplace",
    description:
      "Read the Privacy Policy of Localists.com, operated by IMG Limited, explaining how your personal data is collected, used and protected when using our UK services.",
    url: "https://www.localists.com/privacy-policy",
    siteName: "Localists",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Privacy Policy – Localists.com | Trusted UK Marketplace",
    description:
      "Read the Privacy Policy of Localists.com, operated by IMG Limited, explaining how your personal data is collected, used and protected when using our UK services.",
  },
};


export default function LoginLayout({ children }) {
    return (
        <Suspense fallback={null}>
            {children}
        </Suspense>
    );
}
